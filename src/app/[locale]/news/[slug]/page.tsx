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
  Phone,
  Play,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getNewsBySlug, NEWS_ARTICLES } from "@/lib/news";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: { locale: string; slug: string };
};

type Variety = {
  name: string;
  specs: string;
  pollination: string;
  extra: string;
  youtubeUrl: string;
};

type Rootstock = {
  title: string;
  name: string;
  description: string;
  youtubeUrl: string;
};

type Cta = {
  badge: string;
  title: string;
  body: string;
  telegramText: string;
  telegramUrl: string;
  phone1: string;
  phone2: string;
  stat: string;
};

type ArticleMessages = {
  title: string;
  summary: string;
  intro: string;
  source: string;
  tags: string[];
  sections: { heading: string; body: string }[];
  varieties?: Variety[];
  rootstock?: Rootstock;
  cta?: Cta;
};

export function generateStaticParams() {
  // externalUrl bor maqolalar tashqi statik HTML fayl orqali ochiladi —
  // ular uchun ichki [slug] sahifa yaratilmaydi (i18n kontent yo'q).
  return NEWS_ARTICLES.filter((n) => !n.externalUrl).map((n) => ({
    slug: n.slug,
  }));
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const article = getNewsBySlug(slug);
  if (!article || article.externalUrl) return {};

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
  // externalUrl bor maqolalar uchun ichki sahifa yo'q — statik HTML asosiy
  // kirish nuqtasi, shu yerga to'g'ridan-to'g'ri kirish notFound bo'lishi kerak.
  if (!article || article.externalUrl) notFound();

  const t = await getTranslations("news");
  const messages = (await getMessages()) as unknown as {
    news: { articles: Record<string, ArticleMessages> };
  };
  const articleMessages = messages.news?.articles?.[slug];
  if (!articleMessages) notFound();

  const { title, summary, intro, source, tags, sections, varieties, rootstock, cta } =
    articleMessages;

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

          {/* Cover image */}
          {article.cover && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-earth-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.cover}
                alt={title}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          )}

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

          {/* Variety cards */}
          {varieties && varieties.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {varieties.map((v) => (
                <a
                  key={v.name}
                  href={v.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border-2 border-earth-200 bg-cream-50 p-5 transition-all hover:border-gold-400 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-serif font-bold text-earth-900 group-hover:text-forest-700">
                      🍒 {v.name}
                    </h3>
                    <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700 group-hover:bg-red-100">
                      <Play className="h-2.5 w-2.5 fill-current" />
                      YouTube
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-forest-700">
                    {v.specs}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-700">
                    {v.pollination}
                  </p>
                  <p className="mt-2 text-sm text-earth-600 leading-relaxed">
                    {v.extra}
                  </p>
                </a>
              ))}
            </div>
          )}

          {/* Rootstock recommendation */}
          {rootstock && (
            <div className="mt-10 rounded-2xl border-2 border-forest-200 bg-forest-50 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
                <Sparkles className="h-4 w-4" />
                {rootstock.title}
              </div>
              <h3 className="mt-3 text-2xl font-serif font-bold text-earth-900">
                {rootstock.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-earth-700">
                {rootstock.description}
              </p>
              <a
                href={rootstock.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                {rootstock.name} — videoda ko&apos;ring
              </a>
            </div>
          )}

          {/* Pre-order CTA */}
          {cta && (
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-forest-900 to-forest-700 p-6 sm:p-10 text-cream">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
                <Sparkles className="h-3 w-3" />
                {cta.badge}
              </div>
              <h3 className="mt-4 text-2xl font-serif font-bold sm:text-3xl">
                {cta.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-cream-100/90 sm:text-lg">
                {cta.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={cta.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gold-400 px-6 py-3 text-sm font-bold text-earth-900 transition-colors hover:bg-gold-100 sm:text-base"
                >
                  🍒 {cta.telegramText}
                </a>
                <a
                  href={`tel:${cta.phone1.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
                >
                  <Phone className="h-4 w-4" />
                  {cta.phone1}
                </a>
                <a
                  href={`tel:${cta.phone2.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
                >
                  <Phone className="h-4 w-4" />
                  {cta.phone2}
                </a>
              </div>
              <p className="mt-6 text-sm text-cream-100/70 italic">
                ❗️ {cta.stat}
              </p>
            </div>
          )}

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
