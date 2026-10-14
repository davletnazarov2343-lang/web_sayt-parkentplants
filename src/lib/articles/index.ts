/**
 * Maqolalar registri.
 *
 * `src/content/articles/*.json` fayllari avtomatik yig'iladi (webpack
 * `require.context`) — yangi maqola qo'shish uchun faqat shu papkaga
 * `<slug>.json` tashlash kifoya, kodni o'zgartirish shart emas.
 * Har fayl modul yuklanganda `validateArticle` bilan tekshiriladi: noto'g'ri
 * shakl build'ni aniq xabar bilan to'xtatadi.
 *
 * Sxema: ./types.ts. Server tomonda ishlatiladi — client komponentlar bu
 * faylni IMPORT QILMASIN (butun kontent bundle'ga tushadi); ular uchun
 * ./inline, ./toc, ./format kabi yengil modullar bor.
 *
 * Maqola matni 'blocks' massivi sifatida saqlanadi (HTML emas); renderer
 * `src/components/articles/` da.
 */

import { validateArticle } from "./validate";
import type { Article, ArticleContent } from "./types";
import type { Locale } from "@/lib/constants";

export * from "./types";
export { AUTHORS, getAuthor, getInitials } from "./authors";
export type { Author } from "./authors";
export { parseInline, stripInline } from "./inline";
export { buildToc, slugifyHeading, type TocItem } from "./toc";
export { countWords, readingMinutes } from "./reading";
export { formatArticleDate } from "./format";
export { getTopicCover } from "./topics";
export { validateArticle, ArticleValidationError } from "./validate";

function loadArticles(): Article[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const context = require.context("../../content/articles", false, /\.json$/);

  const articles = context.keys().map((key) => {
    const file = key.replace(/^\.\//, "");
    return validateArticle(context(key), file);
  });

  const seen = new Set<string>();
  for (const article of articles) {
    if (seen.has(article.slug)) {
      throw new Error(`[maqola] slug takrorlangan: "${article.slug}"`);
    }
    seen.add(article.slug);
  }

  // order (kichigi tepada) -> yangi sana -> slug (barqaror tartib uchun)
  return articles.sort(
    (a, b) =>
      a.order - b.order ||
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.slug.localeCompare(b.slug),
  );
}

const ARTICLES: ReadonlyArray<Article> = loadArticles();

/** Barcha maqolalar, `order` bo'yicha (kichigi birinchi). */
export function getAllArticles(): Article[] {
  return [...ARTICLES];
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** Bosh sahifa uchun: `order` bo'yicha birinchi `limit` ta. */
export function getLatestArticles(limit: number): Article[] {
  return ARTICLES.slice(0, limit);
}

/**
 * "Boshqa maqolalar": joriy maqoladan tashqari, avval bir mavzudagilar,
 * keyin `order` bo'yicha.
 */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  const others = ARTICLES.filter((article) => article.slug !== slug);
  const sameTopic = others.filter((a) => a.topic === current?.topic);
  const rest = others.filter((a) => a.topic !== current?.topic);
  return [...sameTopic, ...rest].slice(0, limit);
}

export function getArticleContent(
  article: Article,
  locale: Locale,
): ArticleContent {
  return article[locale];
}
