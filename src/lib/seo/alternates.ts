import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/constants";

export const SITE_URL = "https://parkentplants.uz";

/** "uz" yoki "ru" ga keltiradi (noma'lum qiymat — DEFAULT_LOCALE) */
export function toLocale(locale: string): Locale {
  return (LOCALES as ReadonlyArray<string>).includes(locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;
}

/**
 * Yagona canonical + hreflang manbai.
 * `path` — locale prefiksisiz yo'l: "" (bosh sahifa), "/kontakt", "/kochatlar/olma-kochati".
 *
 * Natija: canonical (joriy til) va languages: `uz`, `ru`, `x-default` (-> uz).
 * Hamma joyda (HTML, sitemap) bir xil kodlar ishlatiladi: `uz` / `ru` / `x-default`.
 * next-intl middleware'ning HTTP `Link` sarlavhasi o'chirilgan (alternateLinks: false),
 * shuning uchun HTML — yagona hreflang manbai.
 */
export function buildAlternates(locale: string, path = "") {
  const lang = toLocale(locale);
  return {
    canonical: `${SITE_URL}/${lang}${path}`,
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
      ),
      "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
    } as Record<string, string>,
  };
}
