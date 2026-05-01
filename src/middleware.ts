import createMiddleware from "next-intl/middleware";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
});

// `studio` — Sanity admin (i18n bilan to'qnashmasligi kerak)
// `api`, `_next`, `_vercel`, statik fayllar — i18n'siz
export const config = {
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
