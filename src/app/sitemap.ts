import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/constants";
import {
  getAllFruitTypeSlugs,
  getAllVarietySlugs,
} from "@/sanity/fetch";

const BASE_URL = "https://parkentplants.uz";

/**
 * Dynamic sitemap.xml — Google'ga barcha sahifalarni ko'rsatadi.
 * Sanity sozlanmagan bo'lsa ham asosiy sahifalar uchun ishlaydi.
 *
 * Har URL uchun hreflang alternates ham qo'shamiz (uz ↔ ru).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Statik sahifalar
  const staticPaths = ["", "/varieties"];
  const staticEntries = LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency:
        path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
        ),
      },
    })),
  );

  // 2. Dinamik: Sanity'dan fruit type va variety sahifalari
  let fruitTypeEntries: MetadataRoute.Sitemap = [];
  let varietyEntries: MetadataRoute.Sitemap = [];

  try {
    const fruitTypes = await getAllFruitTypeSlugs();
    fruitTypeEntries = LOCALES.flatMap((locale) =>
      fruitTypes.map(({ slug }) => ({
        url: `${BASE_URL}/${locale}/varieties/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              `${BASE_URL}/${l}/varieties/${slug}`,
            ]),
          ),
        },
      })),
    );

    const varieties = await getAllVarietySlugs();
    varietyEntries = LOCALES.flatMap((locale) =>
      varieties.map(({ slug, fruitTypeSlug }) => ({
        url: `${BASE_URL}/${locale}/varieties/${fruitTypeSlug}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              `${BASE_URL}/${l}/varieties/${fruitTypeSlug}/${slug}`,
            ]),
          ),
        },
      })),
    );
  } catch {
    // Sanity yo'q — sitemap statik sahifalardan iborat bo'ladi
  }

  return [...staticEntries, ...fruitTypeEntries, ...varietyEntries];
}
