import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getAuthor } from "@/lib/articles/authors";
import { getLatestArticles } from "@/lib/articles";
import type { Locale } from "@/lib/constants";

/**
 * Bosh sahifa: "Bog'bonlar uchun foydali maqolalar" — `order` bo'yicha
 * birinchi 3 ta maqola. Maqola bo'lmasa bo'lim umuman chiqmaydi.
 */
export async function ArticlesPreview({ locale }: { locale: Locale }) {
  const articles = getLatestArticles(3);
  if (articles.length === 0) return null;

  const t = await getTranslations({ locale, namespace: "articles" });
  const authorNames = Array.from(
    new Set(articles.map((a) => getAuthor(a.author).name[locale])),
  ).join(", ");

  return (
    <section
      id="articles"
      className="border-b border-earth-400/20 bg-cream py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold text-earth-900 sm:text-4xl lg:text-5xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-4 text-base text-earth-700 sm:text-lg">
              {t("byAuthor", { name: authorNames })}
            </p>
          </div>
          <Link
            href={`/${locale}/maqolalar`}
            className="hidden items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors hover:text-gold-700 lg:inline-flex"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link
            href={`/${locale}/maqolalar`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-gold-700"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
