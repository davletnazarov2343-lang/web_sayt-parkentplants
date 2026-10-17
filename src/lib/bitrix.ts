/**
 * Bitrix24 inbound webhook orqali Deal (Сделка) yaratish.
 *
 * Webhook URL formati:
 *   https://YOUR_PORTAL.bitrix24.com/rest/USER_ID/WEBHOOK_TOKEN/
 *
 * Eslatma: Norchontol tarif rejasida Lidlar yopiq, shuning uchun Sdelka
 * (Deal) yaratamiz. Phone va name TITLE da, qolgan tafsilotlar COMMENTS'da.
 *
 * Method: crm.deal.add
 * Docs: https://training.bitrix24.com/rest_help/crm/deals/crm_deal_add.php
 */

import type { LeadInput } from "@/lib/leads/schema";
import { formatUtmLines, isMetaTraffic } from "@/lib/leads/utm";

type BitrixResult =
  | { ok: true; leadId: string }
  | { ok: false; error: string };

const FRUIT_TYPE_LABELS_UZ: Record<string, string> = {
  apple: "Olma",
  peach: "Shaftoli",
  cherry: "Olcha/Gilos",
  apricot: "O'rik",
  pear: "Nok",
  plum: "Olxo'ri",
  quince: "Behi",
  walnut: "Yong'oq",
  other: "Boshqa",
};

const REGION_LABELS_UZ: Record<string, string> = {
  tashkent: "Toshkent",
  andijan: "Andijon",
  fergana: "Farg'ona",
  namangan: "Namangan",
  syrdarya: "Sirdaryo",
  jizzakh: "Jizzax",
  samarkand: "Samarqand",
  bukhara: "Buxoro",
  navoi: "Navoiy",
  kashkadarya: "Qashqadaryo",
  surkhandarya: "Surxondaryo",
  khorezm: "Xorazm",
  karakalpakstan: "Qoraqalpog'iston",
  export: "Eksport (boshqa davlat)",
};

const VOLUME_LABELS_UZ: Record<string, string> = {
  "500-2000": "500 — 2 000 ko'chat",
  "2001-10000": "2 001 — 10 000 ko'chat",
  "10001-50000": "10 001 — 50 000 ko'chat",
  "50000+": "50 000+ ko'chat",
  undecided: "Hali aniq emas",
};

// Bitrix24 so'roviga qo'yiladigan timeout. Funksiya limitidan (maxDuration)
// sezilarli kam bo'lishi kerak — shunda Bitrix osilib qolsa ham, funksiyaning
// o'zi ulgurib toza JSON javob qaytaradi (platforma timeout sahifasi emas).
const BITRIX_FETCH_TIMEOUT_MS = 7000;

/**
 * `AbortSignal.timeout` mavjud bo'lmagan muhitda (masalan eski Node/edge
 * runtime) funksiya yiqilmasligi uchun ehtiyot bilan signal yaratamiz.
 * Topilmasa — signalsiz fetch qilamiz (eski, timeoutsiz xatti-harakat).
 */
function createTimeoutSignal(ms: number): AbortSignal | undefined {
  if (typeof AbortSignal?.timeout === "function") {
    return AbortSignal.timeout(ms);
  }
  return undefined;
}

function buildComments(lead: LeadInput): string {
  const lines: string[] = [];
  if (lead.region) lines.push(`Viloyat: ${REGION_LABELS_UZ[lead.region] ?? lead.region}`);
  if (lead.fruitTypes.length > 0) {
    const types = lead.fruitTypes
      .map((t) => FRUIT_TYPE_LABELS_UZ[t] ?? t)
      .join(", ");
    lines.push(`Meva turlari: ${types}`);
  }
  if (lead.volumePlan) {
    lines.push(`Hajm: ${VOLUME_LABELS_UZ[lead.volumePlan] ?? lead.volumePlan}`);
  }
  if (lead.message) {
    lines.push("");
    lines.push(`Izoh:\n${lead.message}`);
  }
  lines.push("");
  lines.push(
    `Manba: parkentplants.uz (${lead.locale})${lead.source ? ` · ${lead.source}` : ""}`,
  );
  // Reklama manbasi (utm_* / click ID) — operator lid Meta/Telegram/Google
  // reklamasidan kelganini Deal kartasida darhol ko'rsin.
  lines.push(...formatUtmLines(lead.utm));
  return lines.join("\n");
}

/**
 * crm.deal.add uchun so'rov tanasi. Alohida (sof) funksiya — tarmoqsiz
 * tekshirish oson bo'lsin.
 */
export function buildBitrixDealPayload(lead: LeadInput) {
  // Deal'da PHONE alohida maydon yo'q — TITLE'ga qo'shamiz.
  // Meta reklamasidan kelgan lid ro'yxatda darhol ajralib tursin: "[Meta] ".
  const title = [
    "parkentplants.uz",
    lead.name,
    lead.phone,
    lead.company ? `· ${lead.company}` : null,
  ].filter(Boolean).join(" — ");

  const utm = lead.utm;
  const fields: Record<string, string | number> = {
    TITLE: isMetaTraffic(utm) ? `[Meta] ${title}` : title,
    SOURCE_ID: "WEB",
    COMMENTS: buildComments(lead),
    OPENED: "Y",
    ASSIGNED_BY_ID: 1,
    CURRENCY_ID: "UZS",
  };

  // Bitrix24 Deal'ning standart UTM maydonlari — faqat qiymat bo'lsa yuboramiz
  if (utm?.utm_source) fields.UTM_SOURCE = utm.utm_source;
  if (utm?.utm_medium) fields.UTM_MEDIUM = utm.utm_medium;
  if (utm?.utm_campaign) fields.UTM_CAMPAIGN = utm.utm_campaign;
  if (utm?.utm_content) fields.UTM_CONTENT = utm.utm_content;
  if (utm?.utm_term) fields.UTM_TERM = utm.utm_term;

  return {
    fields,
    params: { REGISTER_SONET_EVENT: "Y" },
  };
}

export async function sendLeadToBitrix(
  lead: LeadInput,
): Promise<BitrixResult> {
  const url = process.env.BITRIX_WEBHOOK_URL;
  if (!url) {
    return { ok: false, error: "BITRIX_WEBHOOK_URL not set" };
  }

  // crm.deal.add talab qiladigan format
  const body = buildBitrixDealPayload(lead);

  try {
    // Webhook URL oxirida slash bo'lishi shart
    const endpoint = url.endsWith("/")
      ? `${url}crm.deal.add.json`
      : `${url}/crm.deal.add.json`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: createTimeoutSignal(BITRIX_FETCH_TIMEOUT_MS),
    });

    const json = (await res.json()) as
      | { result: number | string; error_description?: string }
      | { error: string; error_description?: string };

    if (!res.ok || "error" in json) {
      const message =
        ("error_description" in json && json.error_description) ||
        ("error" in json && json.error) ||
        `HTTP ${res.status}`;
      return { ok: false, error: String(message) };
    }
    return { ok: true, leadId: String(json.result) };
  } catch (err) {
    // AbortSignal.timeout tugaganda fetch shu bilan reject bo'ladi
    // (name: "TimeoutError", ba'zi muhitlarda "AbortError"). Mijoz
    // ma'lumotini logga chiqarmasdan, sababni aniq ajratamiz.
    const isTimeout =
      err instanceof Error &&
      (err.name === "TimeoutError" || err.name === "AbortError");
    if (isTimeout) {
      console.error(
        `[bitrix] so'rov ${BITRIX_FETCH_TIMEOUT_MS}ms ichida javob bermadi (timeout)`,
      );
      return { ok: false, error: "BITRIX_TIMEOUT" };
    }

    const message = err instanceof Error ? err.message : "unknown";
    return { ok: false, error: message };
  }
}

export function isBitrixConfigured(): boolean {
  return Boolean(process.env.BITRIX_WEBHOOK_URL);
}
