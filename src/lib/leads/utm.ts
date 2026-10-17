/**
 * Reklama manbasi (UTM + click ID) — lid qayerdan kelganini Bitrix24'gacha
 * yetkazish uchun.
 *
 * Oqim:
 *  1. Saytga kirilganda (UtmCapture komponenti) URL'dagi utm_* / fbclid /
 *     gclid sessionStorage'ga yoziladi — mijoz boshqa sahifaga o'tsa ham
 *     manba yo'qolmaydi (first-touch, bitta brauzer sessiyasi ichida).
 *  2. LeadForm yuborilganda `getAttribution()` joriy URL'dagi qiymatlarni
 *     (bo'lsa) yoki saqlanganini qaytaradi va so'rovga qo'shadi.
 *  3. Server (bitrix.ts) ularni Deal'ning UTM_* maydonlariga va izohga yozadi.
 *
 * Bu fayl ham client, ham server'da import qilinadi — `window` faqat
 * funksiyalar ichida, try/catch bilan ishlatiladi.
 */

export const UTM_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number];
export type UtmParams = Partial<Record<UtmParamKey, string>>;

/** Har bir qiymat uchun maksimal uzunlik (schema ham shunga mos). */
export const UTM_VALUE_MAX = 200;

const STORAGE_KEY = "pp_utm_v1";

/**
 * Qiymatni tozalash: boshqaruv belgilarini olib tashlash, bo'shliqlarni
 * qisqartirish va uzunlikni cheklash. Bo'sh bo'lsa — undefined.
 */
export function sanitizeUtmValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, UTM_VALUE_MAX);
  return cleaned.length > 0 ? cleaned : undefined;
}

/** `?utm_source=...` qatoridan faqat ma'lum kalitlarni ajratib oladi. */
export function parseUtmFromSearch(search: string): UtmParams {
  const result: UtmParams = {};
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return result;
  }
  for (const key of UTM_PARAM_KEYS) {
    const value = sanitizeUtmValue(params.get(key) ?? undefined);
    if (value) result[key] = value;
  }
  return result;
}

export function hasUtm(params: UtmParams | undefined | null): boolean {
  if (!params) return false;
  return UTM_PARAM_KEYS.some((key) => Boolean(params[key]));
}

function readStoredUtm(): UtmParams {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const result: UtmParams = {};
    for (const key of UTM_PARAM_KEYS) {
      const value = sanitizeUtmValue((parsed as Record<string, unknown>)[key]);
      if (value) result[key] = value;
    }
    return result;
  } catch {
    // sessionStorage yopiq (privat rejim, iframe va h.k.) — jim o'tamiz
    return {};
  }
}

function writeStoredUtm(params: UtmParams): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // saqlab bo'lmasa ham sayt ishlashda davom etadi
  }
}

/**
 * Sahifa yuklanganda chaqiriladi. URL'da manba bo'lsa — uni (to'liq
 * to'plam sifatida) saqlaydi, aks holda avval saqlanganini o'zgartirmaydi.
 */
export function captureUtmFromLocation(): void {
  if (typeof window === "undefined") return;
  try {
    const current = parseUtmFromSearch(window.location.search);
    if (hasUtm(current)) writeStoredUtm(current);
  } catch {
    // hech qachon sahifani yiqitmasin
  }
}

/**
 * Lid yuborilayotganda chaqiriladi: joriy URL'dagi manba ustun, bo'lmasa
 * sessiyada saqlangani. Hech narsa bo'lmasa — undefined.
 */
export function getAttribution(): UtmParams | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const current = parseUtmFromSearch(window.location.search);
    if (hasUtm(current)) return current;
    const stored = readStoredUtm();
    return hasUtm(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

const META_SOURCES = new Set([
  "meta",
  "facebook",
  "fb",
  "instagram",
  "ig",
]);

/**
 * Lid Meta (Facebook/Instagram) reklamasidan kelganmi? utm_source bo'yicha;
 * utm_source yo'q, lekin fbclid bor bo'lsa ham Meta deb hisoblaymiz.
 */
export function isMetaTraffic(params: UtmParams | undefined | null): boolean {
  if (!params) return false;
  const source = params.utm_source?.toLowerCase();
  if (source) return META_SOURCES.has(source);
  return Boolean(params.fbclid);
}

/**
 * Bitrix izohi uchun o'qiladigan qatorlar, masalan:
 *   "Reklama manbasi: meta / paid / gs_test_202610 / web_lead"
 *   "Click ID: fbclid"
 */
export function formatUtmLines(params: UtmParams | undefined | null): string[] {
  if (!hasUtm(params) || !params) return [];
  const lines: string[] = [];
  const parts = [
    params.utm_source,
    params.utm_medium,
    params.utm_campaign,
    params.utm_content,
    params.utm_term,
  ].filter((v): v is string => Boolean(v));
  if (parts.length > 0) lines.push(`Reklama manbasi: ${parts.join(" / ")}`);
  const clickIds = (["fbclid", "gclid"] as const).filter((k) => params[k]);
  if (clickIds.length > 0) lines.push(`Click ID: ${clickIds.join(", ")}`);
  return lines;
}
