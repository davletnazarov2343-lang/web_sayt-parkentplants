import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { VarietyLandingConfig } from "@/lib/landings";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * Nav lending sahifasi uchun metadata: title/description, canonical,
 * hreflang (uz/ru/x-default), OpenGraph + Twitter card (hero rasm).
 * `unstable_setRequestLocale(locale)` ni sahifaning o'zi chaqiradi.
 */
export async function generateVarietyLandingMetadata(
  config: VarietyLandingConfig,
  locale: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: config.namespace });
  // Hero rasmining haqiqiy o'lchami (berilmasa — kvadrat 1080x1080)
  const { width, height } = config.ogImage ?? { width: 1080, height: 1080 };
  return buildMetadata({
    locale,
    path: `/${config.slug}`,
    title: t("metaTitle"),
    description: t("metaDescription"),
    image: {
      url: config.images.hero,
      width,
      height,
      alt: t("gallery.alt1"),
    },
  });
}
