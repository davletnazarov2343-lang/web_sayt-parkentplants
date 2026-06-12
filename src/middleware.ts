import createMiddleware from "next-intl/middleware";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants";

/**
 * Til aniqlash strategiyasi:
 * - `localeDetection: false` — Accept-Language sarlavhasi o'qilmaydi.
 *   Sabab: O'zbekistondagi ko'pchilik foydalanuvchining brauzeri
 *   Accept-Language: ru bilan jo'natadi (tarixiy/standart), lekin
 *   asosiy auditoriyamiz o'zbek tilida. Shu sababli yangi mehmonlar
 *   doim DEFAULT_LOCALE ('uz') ga yo'naltiriladi.
 * - NEXT_LOCALE cookie esa hurmatlanadi — agar user LocaleSwitcher
 *   orqali RU ga o'tgan bo'lsa, keyingi tashriflarda RU ko'rsatamiz.
 */
export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  localeDetection: false,
});

// `studio` — Sanity admin (i18n bilan to'qnashmasligi kerak)
// `api`, `_next`, `_vercel`, statik fayllar — i18n'siz
export const config = {
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
