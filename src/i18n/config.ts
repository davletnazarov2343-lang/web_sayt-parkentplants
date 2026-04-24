import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/constants";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = LOCALES.includes(requested as Locale)
    ? (requested as Locale)
    : DEFAULT_LOCALE;

  if (!LOCALES.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
