import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { VarietyLandingConfig } from "@/lib/landings";

const BASE_URL = "https://parkentplants.uz";

/**
 * Nav lending sahifasi uchun metadata: title/description, canonical,
 * hreflang va OpenGraph (hero rasm 1080x1080).
 * `unstable_setRequestLocale(locale)` ni sahifaning o'zi chaqiradi.
 */
export async function generateVarietyLandingMetadata(
  config: VarietyLandingConfig,
  locale: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: config.namespace });
  const path = `/${config.slug}`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        "uz-UZ": `/uz${path}`,
        "ru-UZ": `/ru${path}`,
        "x-default": `/uz${path}`,
      },
    },
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${BASE_URL}/${locale}${path}`,
      images: [
        {
          url: config.images.hero,
          width: 1080,
          height: 1080,
          alt: t("gallery.alt1"),
        },
      ],
    },
  };
}
