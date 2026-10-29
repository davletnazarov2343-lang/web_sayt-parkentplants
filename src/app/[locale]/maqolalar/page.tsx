import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Sprout } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getAuthor } from "@/lib/articles/authors";
import { getAllArticles } from "@/lib/articles";
import type { Locale } from "@/lib/constants";

type Props = {
  params: { locale: string };
};

const toLocale = (locale: string): Locale => (locale === "ru" ? "ru" : "uz");

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const lang = toLocale(locale);
  const t = await getTranslations({ locale: lang, namespace: "articles" });
  const title = t("metaTitle");
  const description = t("subtitle");

  return buildMetadata({
    locale: lang,
    path: "/maqolalar",
    title,
    description,
  });
}

export default async function ArticlesListPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const lang = toLocale(locale);
  const t = await getTranslations({ locale: lang, namespace: "articles" });
  const articles = getAllArticles();
  const authorNames = Array.from(
    new Set(articles.map((a) => getAuthor(a.author).name[lang])),
  ).join(", ");

  return (
    <section className="pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-balance font-serif text-3xl font-bold leading-tight text-earth-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-earth-700 sm:text-lg">
            {t("subtitle")}
          </p>
          {authorNames && (
            <p className="mt-3 text-sm font-semibold text-forest-700">
              {t("byAuthor", { name: authorNames })}
            </p>
          )}
        </header>

        {articles.length === 0 ? (
          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-earth-400/25 bg-cream-100 px-6 py-12 text-center sm:px-10">
            <span
              aria-hidden="true"
              className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest-700/10 text-forest-700"
            >
              <Sprout className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h2 className="mt-5 font-serif text-2xl font-bold text-earth-900">
              {t("emptyTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-earth-700">
              {t("emptyText")}
            </p>
            <div className="mt-7 flex justify-center">
              <LinkButton href={`/${lang}`} variant="outline" size="md">
                {t("emptyHome")}
              </LinkButton>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {articles.map((article, i) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={lang}
                as="h2"
                priority={i < 3}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
