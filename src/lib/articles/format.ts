/**
 * Sana formatlash — Intl ishlatilmaydi (server va client'da bir xil natija,
 * hydration mismatch bo'lmaydi). Kirish: "YYYY-MM-DD".
 */

import type { Locale } from "@/lib/constants";

const MONTHS: Record<Locale, readonly string[]> = {
  uz: [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ],
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
};

export function formatArticleDate(iso: string, locale: Locale): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  const monthName = MONTHS[locale][Number(month) - 1];
  if (!monthName) return iso;
  return `${Number(day)} ${monthName} ${year}`;
}
