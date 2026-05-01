/**
 * Bitrix24 inbound webhook orqali lead yaratish.
 *
 * Webhook URL formati:
 *   https://YOUR_PORTAL.bitrix24.com/rest/USER_ID/WEBHOOK_TOKEN/
 *
 * Method: crm.lead.add
 * Docs: https://training.bitrix24.com/rest_help/crm/leads/crm_lead_add.php
 */

import type { LeadInput } from "@/lib/leads/schema";

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
  lines.push(`Manba: parkentplants.uz (${lead.locale})`);
  return lines.join("\n");
}

export async function sendLeadToBitrix(
  lead: LeadInput,
): Promise<BitrixResult> {
  const url = process.env.BITRIX_WEBHOOK_URL;
  if (!url) {
    return { ok: false, error: "BITRIX_WEBHOOK_URL not set" };
  }

  // crm.lead.add talab qiladigan format
  const body = {
    fields: {
      TITLE: `parkentplants.uz — ${lead.name}${lead.company ? " · " + lead.company : ""}`,
      NAME: lead.name,
      COMPANY_TITLE: lead.company || undefined,
      PHONE: [{ VALUE: lead.phone, VALUE_TYPE: "WORK" }],
      SOURCE_ID: "WEB",
      COMMENTS: buildComments(lead),
      OPENED: "Y",
      ASSIGNED_BY_ID: 1,
    },
    params: { REGISTER_SONET_EVENT: "Y" },
  };

  try {
    // Webhook URL oxirida slash bo'lishi shart
    const endpoint = url.endsWith("/")
      ? `${url}crm.lead.add.json`
      : `${url}/crm.lead.add.json`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
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
    const message = err instanceof Error ? err.message : "unknown";
    return { ok: false, error: message };
  }
}

export function isBitrixConfigured(): boolean {
  return Boolean(process.env.BITRIX_WEBHOOK_URL);
}
