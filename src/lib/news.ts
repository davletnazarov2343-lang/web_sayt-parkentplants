/**
 * Yangiliklar (News) ma'lumotlar bazasi.
 * Har bir maqola:
 *  - slug — URL identifikatori (/news/[slug])
 *  - publishedAt — ISO sana
 *  - pdf — agar PDF biriktirilgan bo'lsa, public/docs ichidagi yo'l
 *  - cover — kover rasm (public/images ichida)
 *  - i18n keys — uz/ru tarjima bilan src/i18n/messages/{uz,ru}.json'da
 *
 * Yangi maqola qo'shish uchun:
 *   1) Pastdagi massivga slug + sana + pdf + cover qo'shing
 *   2) uz.json va ru.json'da news.articles.<slug> kalitlarini qo'shing
 *   3) (PDF bo'lsa) public/docs/ ichiga faylni qo'ying
 */

export type NewsArticle = {
  slug: string;
  publishedAt: string;
  pdf?: string;
  cover?: string;
  featured?: boolean;
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "gilos-bozori-global-talab-2027",
    publishedAt: "2026-06-11",
    cover: "/images/gilos-bozori-2027.jpg",
    featured: true,
  },
  {
    slug: "bogdorchilik-subsidiyalari-206-qaror",
    publishedAt: "2026-06-11",
    pdf: "/docs/bogdorchilik-subsidiyalari-206-qaror.pdf",
    cover: "/images/hero-nursery.jpg",
    featured: true,
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((n) => n.slug === slug);
}

export function getFeaturedNews(): NewsArticle[] {
  return NEWS_ARTICLES.filter((n) => n.featured).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getAllNews(): NewsArticle[] {
  return [...NEWS_ARTICLES].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
