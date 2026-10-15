import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAuthor } from "@/lib/articles/authors";
import { formatArticleDate } from "@/lib/articles/format";
import { readingMinutes } from "@/lib/articles/reading";
import type { Article } from "@/lib/articles/types";
import type { Locale } from "@/lib/constants";
import { ArticleCover } from "./ArticleCover";

const COVER_SIZES =
  "(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/**
 * Maqola kartochkasi: muqova, mavzu chipi, sarlavha, qisqacha mazmun
 * (3 qator), muallif · o'qish vaqti · sana. Butun karta — bitta havola
 * (sarlavhadagi "stretched link"). Server komponent.
 */
export async function ArticleCard({
  article,
  locale,
  as: Heading = "h3",
  priority = false,
}: {
  article: Article;
  locale: Locale;
  /** Sarlavha darajasi (sahifa ierarxiyasiga moslash uchun) */
  as?: "h2" | "h3";
  priority?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "articles" });
  const content = article[locale];
  const author = getAuthor(article.author);
  const href = `/${locale}/maqolalar/${article.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-[0_12px_40px_-12px_rgba(27,67,50,0.28)]">
      <ArticleCover
        topic={article.topic}
        cover={article.cover}
        topicLabel={t(`topics.${article.topic}`)}
        sizes={COVER_SIZES}
        priority={priority}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Heading className="font-serif text-xl font-bold leading-snug text-earth-900 transition-colors group-hover:text-forest-700">
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-forest-400"
          >
            {content.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-earth-700">
          {content.summary}
        </p>
        <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-xs text-earth-700/80">
          <span className="font-semibold text-earth-900">
            {author.name[locale]}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {t("readingTime", { minutes: readingMinutes(content) })}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt, locale)}
          </time>
        </p>
      </div>
    </article>
  );
}
