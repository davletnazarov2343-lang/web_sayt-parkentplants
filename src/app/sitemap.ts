import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/constants";
import {
  getAllFruitTypeSlugs,
  getAllVarietySlugs,
} from "@/sanity/fetch";
import { NEWS_ARTICLES } from "@/lib/news";
import { getAllArticles } from "@/lib/articles";
import { FRUIT_CATEGORIES } from "@/lib/categories";
import { buildAlternates } from "@/lib/seo/alternates";
import {
  categoryLastmod,
  DEFAULT_LASTMOD,
  lastmodDate,
  pageLastmod,
} from "@/lib/seo/lastmod";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Bitta URL (bitta til) uchun yozuv. hreflang HTML bilan bir xil manbadan
 * (`buildAlternates`): `uz`, `ru`, `x-default` (-> uz).
 */
function entry(
  locale: string,
  path: string,
  lastModified: Date,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
): Entry {
  const { canonical, languages } = buildAlternates(locale, path);
  return {
    url: canonical,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

/** Eng yangi sana (ISO "YYYY-MM-DD" satrlari) */
const newest = (dates: string[]) =>
  lastmodDate(
    dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : DEFAULT_LASTMOD,
  );

/**
 * Dynamic sitemap.xml — Google'ga barcha sahifalarni ko'rsatadi.
 * Sanity sozlanmagan bo'lsa ham asosiy sahifalar uchun ishlaydi.
 *
 * `lastModified` — build vaqti EMAS: maqola/yangilik uchun o'z sanasi,
 * qolganlari uchun src/lib/seo/lastmod.ts dagi qo'lda yuritiladigan xarita.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = getAllArticles();
  const news = NEWS_ARTICLES.filter((article) => !article.externalUrl);

  // 1. Statik sahifalar
  const staticPaths = [
    "",
    "/varieties",
    "/news",
    "/maqolalar",
    "/kochatlar",
    "/biz-haqimizda",
    "/kontakt",
    "/granny-smith",
    "/devil-gala",
    "/black-splendor",
    "/maxfiylik",
    "/pink-lady",
    "/sweet-aryana",
  ];
  // Ro'yxat sahifalari ichidagi eng yangi elementning sanasini oladi
  const listLastmod: Record<string, Date> = {
    "/news": newest(NEWS_ARTICLES.map((n) => n.publishedAt)),
    "/maqolalar": newest(articles.map((a) => a.publishedAt)),
  };
  const staticEntries = LOCALES.flatMap((locale) =>
    staticPaths.map((path) =>
      entry(
        locale,
        path,
        listLastmod[path] ?? pageLastmod(path),
        path === "" ? "weekly" : "monthly",
        path === "" ? 1.0 : 0.8,
      ),
    ),
  );

  // 2. Dinamik: Sanity'dan fruit type va variety sahifalari
  let fruitTypeEntries: MetadataRoute.Sitemap = [];
  let varietyEntries: MetadataRoute.Sitemap = [];

  try {
    const fruitTypes = await getAllFruitTypeSlugs();
    fruitTypeEntries = LOCALES.flatMap((locale) =>
      fruitTypes.map(({ slug }) =>
        entry(
          locale,
          `/varieties/${slug}`,
          lastmodDate(DEFAULT_LASTMOD),
          "weekly",
          0.7,
        ),
      ),
    );

    const varieties = await getAllVarietySlugs();
    varietyEntries = LOCALES.flatMap((locale) =>
      varieties.map(({ slug, fruitTypeSlug }) =>
        entry(
          locale,
          `/varieties/${fruitTypeSlug}/${slug}`,
          lastmodDate(DEFAULT_LASTMOD),
          "monthly",
          0.6,
        ),
      ),
    );
  } catch {
    // Sanity yo'q — sitemap statik sahifalardan iborat bo'ladi
  }

  // 3. News articles — externalUrl'li yangiliklarning ichki sahifasi yo'q
  // (404), shu sabab sitemap'ga kiritilmaydi
  const newsEntries = LOCALES.flatMap((locale) =>
    news.map((article) =>
      entry(
        locale,
        `/news/${article.slug}`,
        lastmodDate(article.publishedAt),
        "monthly",
        0.7,
      ),
    ),
  );

  // 3b. Maqolalar (/maqolalar/<slug>) — uz/ru/x-default alternates bilan
  const articleEntries = LOCALES.flatMap((locale) =>
    articles.map((article) =>
      entry(
        locale,
        `/maqolalar/${article.slug}`,
        lastmodDate(article.publishedAt),
        "monthly",
        0.7,
      ),
    ),
  );

  // 4. Ko'chat kategoriyalari
  const categoryEntries = LOCALES.flatMap((locale) =>
    FRUIT_CATEGORIES.map((cat) =>
      entry(
        locale,
        `/kochatlar/${cat.slug}`,
        categoryLastmod(cat.slug),
        "weekly",
        0.9, // yuqori - asosiy SEO sahifalar
      ),
    ),
  );

  return [
    ...staticEntries,
    ...fruitTypeEntries,
    ...varietyEntries,
    ...newsEntries,
    ...articleEntries,
    ...categoryEntries,
  ];
}
