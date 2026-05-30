import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { leadSchema } from "@/lib/leads/schema";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { isBitrixConfigured, sendLeadToBitrix } from "@/lib/bitrix";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/leads
 * Body: LeadInput (zod schema)
 * Steps:
 *  1. Validate
 *  2. Honeypot check
 *  3. Insert to Supabase (`leads`)
 *  4. Forward to Bitrix24 (best-effort, lead saved bo'ladi xatto Bitrix yiqilsa ham)
 *  5. Update lead row with bitrix_status / bitrix_lead_id
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

  // 2. Honeypot — bot bo'lsa silently 200 qaytaramiz
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true, skipped: "honeypot" });
  }

  const userAgent = request.headers.get("user-agent") || undefined;
  const referrer = request.headers.get("referer") || undefined;
  const ipCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    undefined;

  // 3. Supabase insert (bo'lsa)
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
        source: "website",
        referrer,
        user_agent: userAgent,
        ip_country: ipCountry,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[leads] supabase insert failed:", error);
      return NextResponse.json(
        { ok: false, error: "STORAGE" },
        { status: 500 },
      );
    }
    leadId = data.id as string;
  } else {
    console.warn(
      "[leads] Supabase not configured — lead won't be persisted:",
      lead.name,
      lead.phone,
    );
  }

  // 4. Bitrix24 forward (await qilamiz — Vercel serverless runtime tugamasin)
  if (isBitrixConfigured()) {
    try {
      const result = await sendLeadToBitrix(lead);
      if (result.ok) {
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
      console.error("[leads] bitrix sync exception:", err);
    }
  } else if (supabase && leadId) {
    // Bitrix sozlanmagan — `skipped` deb belgilaymiz
    await supabase
      .from("leads")
      .update({ bitrix_status: "skipped" })
      .eq("id", leadId);
  }

  // 5. OK — agar hech qaysi tashqi servis sozlanmagan bo'lsa ham frontend muvaffaqiyatli
  // ko'rinadi (dev paytida ishlash uchun). Productionda env to'liq bo'ladi.
  if (!isSupabaseConfigured() && !isBitrixConfigured()) {
    return NextResponse.json({
      ok: true,
      mode: "dev",
      warning: "No backend configured — lead logged to console only",
    });
  }

  return NextResponse.json({ ok: true, id: leadId });
}
