import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  unstable_setRequestLocale,
  getTranslations,
  getMessages,
} from "next-intl/server";
import {
  ArrowLeft,
  Calendar,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getNewsBySlug, NEWS_ARTICLES } from "@/lib/news";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: { locale: string; slug: string };
};

type ArticleMessages = {
  title: string;
  summary: string;
  intro: string;
  source: string;
  tags: string[];
  sections: { heading: string; body: string }[];
};

export function generateStaticParams() {
  return NEWS_ARTICLES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const article = getNewsBySlug(slug);
  if (!article) return {};

  const t = await getTranslations("news");
  const title = t(`articles.${slug}.title`);
  const summary = t(`articles.${slug}.summary`);

  return {
    title,
    description: summary,
    openGraph: {
      type: "article",
      title,
      description: summary,
      publishedTime: article.publishedAt,
      images: article.cover ? [{ url: article.cover }] : undefined,
    },
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: {
        "uz-UZ": `/uz/news/${slug}`,
        "ru-UZ": `/ru/news/${slug}`,
      },
    },
  };
}

export default async function NewsArticlePage({
  params: { locale, slug },
}: Props) {
  unstable_setRequestLocale(locale);
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations("news");
  const messages = (await getMessages()) as unknown as {
    news: { articles: Record<string, ArticleMessages> };
  };
  const articleMessages = messages.news?.articles?.[slug];
  if (!articleMessages) notFound();

  const { title, summary, intro, source, tags, sections } = articleMessages;

  // NewsArticle JSON-LD
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: summary,
    image: article.cover
      ? [`https://parkentplants.uz${article.cover}`]
      : undefined,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Parkent Plants",
      url: "https://parkentplants.uz",
    },
    publisher: { "@id": "https://parkentplants.uz#business" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://parkentplants.uz/${locale}/news/${slug}`,
    },
  };

  const pdfSize = t("pdfSize");

  return (
    <>
      <JsonLd data={newsSchema} />
      <article className="py-24 sm:py-32 lg:py-40">
        <Container size="narrow">
          {/* Back link */}
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-gold-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToList")}
          </Link>

          {/* Header */}
          <header className="mt-8 border-b border-earth-200 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-3xl font-serif font-bold text-earth-900 sm:text-4xl lg:text-5xl leading-tight">
              {title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-earth-600">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-gold-700" />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt, locale)}
                </time>
              </span>
              {article.pdf && (
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-gold-700" />
                  {pdfSize}
                </span>
              )}
            </div>
          </header>

          {/* PDF Download CTA — top */}
          {article.pdf && (
            <div className="mt-8 rounded-2xl border-2 border-gold-400 bg-gold-50 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gold-700">
                    <FileText className="h-5 w-5" />
                    <span>PDF · {pdfSize}</span>
                  </div>
                  <p className="mt-2 text-sm text-earth-700 max-w-xl">
                    {summary.split(".").slice(0, 1).join(".")}.
                  </p>
                </div>
                <LinkButton
                  href={article.pdf}
                  variant="primary"
                  size="lg"
                  download
                  className="shrink-0"
                >
                  <Download className="h-4 w-4" />
                  {t("downloadPdf")}
                </LinkButton>
              </div>
            </div>
          )}

          {/* Intro */}
          <div className="mt-10 text-base leading-relaxed text-earth-700 sm:text-lg">
            {intro}
          </div>

          {/* Sections */}
          <div className="mt-10 space-y-8">
            {sections.map((sec, i) => (
              <section key={i}>
                <h2 className="text-xl font-serif font-bold text-earth-900 sm:text-2xl">
                  {sec.heading}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-earth-700 sm:text-lg">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-12 border-t border-earth-200 pt-8 space-y-4">
            {source && (
              <p className="text-sm text-earth-600">
                <span className="font-semibold">{t("source")}: </span>
                <a
                  href={`https://${source}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-forest-700 hover:text-gold-700 underline"
                >
                  {source}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* PDF Download — bottom */}
            {article.pdf && (
              <div className="pt-4">
                <LinkButton
                  href={article.pdf}
                  variant="secondary"
                  size="lg"
                  download
                >
                  <Download className="h-4 w-4" />
                  {t("downloadPdf")} ({pdfSize})
                </LinkButton>
              </div>
            )}
          </footer>
        </Container>
      </article>
    </>
  );
}

function formatDate(iso: string, locale: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
