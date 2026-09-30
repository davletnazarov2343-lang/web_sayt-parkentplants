import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { leadSchema } from "@/lib/leads/schema";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { isBitrixConfigured, sendLeadToBitrix } from "@/lib/bitrix";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Vercel standart limiti (10s) Bitrix timeout'iga (7s) yetarli emas — 503
// javobini yozib ulgurish uchun funksiyaga ko'proq vaqt beramiz.
export const maxDuration = 20;

/**
 * POST /api/leads
 * Body: LeadInput (zod schema)
 * Steps:
 *  1. Validate
 *  2. Rate limit (IP bo'yicha, arzon tekshiruv — validatsiyadan oldin)
 *  3. Honeypot check
 *  4. Insert to Supabase (`leads`)
 *  5. Forward to Bitrix24 (best-effort, lead saved bo'ladi xatto Bitrix yiqilsa ham)
 *  6. Update lead row with bitrix_status / bitrix_lead_id
 */
export async function POST(request: NextRequest) {
  // 1. Parse + validate
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON" },
      { status: 400 },
    );
  }

  // 2. Rate limit — zod validatsiya va honeypotdan oldin, chunki arzon
  // tekshiruv birinchi bo'lishi kerak (ortiqcha CPU sarflamaslik uchun).
  // Locale'ni to'liq validatsiyagacha ehtiyotkorlik bilan o'qiymiz — agar
  // yo'q yoki noto'g'ri bo'lsa, standart "uz" ishlatiladi.
  const rawLocale =
    typeof body === "object" && body !== null && "locale" in body
      ? (body as { locale?: unknown }).locale
      : undefined;
  const locale = rawLocale === "ru" ? "ru" : "uz";

  const ip = getClientIp(request.headers);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.ok) {
    const message =
      locale === "ru"
        ? "Слишком много заявок с вашего адреса. Пожалуйста, попробуйте позже."
        : "Sizning manzilingizdan juda ko'p so'rov yuborildi. Iltimos, birozdan so'ng qayta urinib ko'ring.";

    return NextResponse.json(
      { ok: false, error: "RATE_LIMITED", message },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let lead;
  try {
    lead = leadSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION",
          details: err.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }
    return NextResponse.json(
      { ok: false, error: "VALIDATION" },
      { status: 422 },
    );
  }

  // 3. Honeypot — bot bo'lsa silently 200 qaytaramiz
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true, skipped: "honeypot" });
  }

  const userAgent = request.headers.get("user-agent") || undefined;
  const referrer = request.headers.get("referer") || undefined;
  const ipCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    undefined;

  // 4. Supabase insert (bo'lsa)
  let leadId: string | null = null;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: lead.name,
        phone: lead.phone,
        company: lead.company || null,
        region: lead.region || null,
        fruit_types: lead.fruitTypes,
        volume_plan: lead.volumePlan || null,
        message: lead.message || null,
        locale: lead.locale,
        source: lead.source || "website",
        referrer,
        user_agent: userAgent,
        ip_country: ipCountry,
      })
      .select("id")
      .single();

    if (error) {
      // Faqat message/code — to'liq error obyektini log qilmaymiz, chunki
      // Postgres constraint xatolarida "details" maydonida mijozning
      // telefon qiymati oshkor bo'lib qolishi mumkin.
      console.error("[leads] supabase insert failed:", {
        message: error.message,
        code: error.code,
      });
      // ERTA QAYTMAYMIZ — Supabase yiqilgan bo'lsa ham pastdagi Bitrix24
      // bloki baribir ishlashi kerak (lid Bitrix orqali saqlanib qolsin).
      // leadId shu holatda null qoladi, oxiridagi `persisted` tekshiruvi
      // Bitrix natijasiga qarab mijozga to'g'ri javob beradi.
    } else {
      leadId = data.id as string;
    }
  } else {
    // Mijoz ma'lumotini (ism/telefon) oshkor qilmasdan — faqat sabab va
    // xavfsiz kontekstni yozamiz.
    console.warn("[leads] Supabase not configured — lead won't be persisted", {
      locale: lead.locale,
      region: lead.region ?? null,
      bitrixConfigured: isBitrixConfigured(),
    });
  }

  // 5. Bitrix24 forward (await qilamiz — Vercel serverless runtime tugamasin)
  let bitrixOk = false;
  if (isBitrixConfigured()) {
    try {
      const result = await sendLeadToBitrix(lead);
      if (result.ok) {
        bitrixOk = true;
        console.log("[leads] bitrix sync ok, dealId:", result.leadId);
        if (supabase && leadId) {
          await supabase
            .from("leads")
            .update({
              bitrix_status: "synced",
              bitrix_lead_id: result.leadId,
              bitrix_synced_at: new Date().toISOString(),
            })
            .eq("id", leadId);
        }
      } else {
        console.error("[leads] bitrix sync failed:", result.error);
        if (supabase && leadId) {
          await supabase
            .from("leads")
            .update({
              bitrix_status: "failed",
              bitrix_error: result.error,
            })
            .eq("id", leadId);
        }
      }
    } catch (err) {
      // Faqat message — to'liq exception obyektini log qilmaymiz (ehtiyot
      // chorasi: kutilmagan xato ichida so'rov tafsilotlari bo'lib qolmasin).
      console.error(
        "[leads] bitrix sync exception:",
        err instanceof Error ? err.message : String(err),
      );
    }
  } else if (supabase && leadId) {
    // Bitrix sozlanmagan — `skipped` deb belgilaymiz
    await supabase
      .from("leads")
      .update({ bitrix_status: "skipped" })
      .eq("id", leadId);
  }

  // 6. Lid hech qayerga (Supabase ham, Bitrix ham) saqlanmadimi — mijozga
  // YOLG'ON "muvaffaqiyatli" ko'rsatmaymiz, aks holda lid jimgina yo'qoladi.
  const persisted = leadId !== null || bitrixOk;
  if (!persisted) {
    // Vercel loglarida darhol ko'rinadigan aniq belgi — mijoz ma'lumotini
    // (ism/telefon) oshkor qilmasdan, faqat sabab va kontekstni yozamiz.
    console.error("[leads] CRITICAL: lid hech qayerga saqlanmadi", {
      locale: lead.locale,
      region: lead.region ?? null,
      supabaseConfigured: isSupabaseConfigured(),
      bitrixConfigured: isBitrixConfigured(),
    });

    // Faqat mahalliy dev muhitida (NODE_ENV !== "production") env sozlanmagan
    // bo'lsa UI'ni sinash uchun "muvaffaqiyatli" javob beramiz. Productionda
    // (Vercel, jonli sayt) bu holat HECH QACHON yuz bermasligi kerak — agar
    // yuz bersa, mijozga rostgo'y xabar qaytariladi.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        ok: true,
        mode: "dev",
        warning: "No backend configured — lead logged to console only",
      });
    }

    const fallbackMessage =
      lead.locale === "ru"
        ? "Извините, на сервере техническая неполадка и заявка не сохранилась. Пожалуйста, позвоните нам напрямую: +998 78 113 18 19."
        : "Kechirasiz, serverda texnik nosozlik yuz berdi va so'rovingiz saqlanmadi. Iltimos, bevosita qo'ng'iroq qiling: +998 78 113 18 19.";

    return NextResponse.json(
      { ok: false, error: "STORAGE_UNAVAILABLE", message: fallbackMessage },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, id: leadId });
}
