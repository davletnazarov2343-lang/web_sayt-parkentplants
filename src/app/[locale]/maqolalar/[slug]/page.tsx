import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  Sprout,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { TelegramIcon } from "@/components/ui/SocialIcons";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { ArticleBlocks } from "@/components/articles/ArticleBlocks";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleTocMobile } from "@/components/articles/ArticleTocMobile";
import { ArticleTocSidebar } from "@/components/articles/ArticleTocSidebar";
import { AuthorAvatar } from "@/components/articles/AuthorAvatar";
import { ReadingProgress } from "@/components/articles/ReadingProgress";
import { RelatedSaplings } from "@/components/links/RelatedSaplings";
import {
  buildToc,
  formatArticleDate,
  getAllArticles,
  getArticle,
  getAuthor,
  getRelatedArticles,
  getTopicCover,
  readingMinutes,
} from "@/lib/articles";
import { getArticleRelated } from "@/lib/articles/related";
import { LOCALES, type Locale } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BASE_URL = "https://parkentplants.uz";
const FALLBACK_IMAGE = "/brand/og-image.jpg";

type Props = {
  params: { locale: string; slug: string };
};

const toLocale = (locale: string): Locale => (locale === "ru" ? "ru" : "uz");

// Ro'yxatda yo'q slug — 404 (build'da hammasi oldindan yaratiladi)
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getAllArticles().map((article) => article.slug);
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params: { locale, slug },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) return {};

  const lang = toLocale(locale);
  const content = article[lang];
  const authorName = getAuthor(article.author).name[lang];
  const image =
    article.cover ?? getTopicCover(article.topic) ?? FALLBACK_IMAGE;

  return buildMetadata({
    locale: lang,
    path: `/maqolalar/${slug}`,
    title: content.title,
    description: content.summary,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [authorName],
    image: { url: image },
  });
}

export default async function ArticlePage({
  params: { locale, slug },
}: Props) {
  unstable_setRequestLocale(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const lang = toLocale(locale);
  const t = await getTranslations({ locale: lang, namespace: "articles" });
  const content = article[lang];
  const author = getAuthor(article.author);
  const authorName = author.name[lang];
  const authorBio = author.bio?.[lang];
  const toc = buildToc(content.blocks);
  const hasToc = toc.length >= 2;
  const minutes = readingMinutes(content);
  const related = getRelatedArticles(slug, 3);
  const relatedSaplings = getArticleRelated(slug);
  const image =
    article.cover ?? getTopicCover(article.topic) ?? FALLBACK_IMAGE;

  const pageUrl = `${BASE_URL}/${lang}/maqolalar/${slug}`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(content.title)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.summary,
    inLanguage: lang === "ru" ? "ru-RU" : "uz-UZ",
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: [`${BASE_URL}${image}`],
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Parkent Plants",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/icon-square.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumbHome"),
        item: `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("eyebrow"),
        item: `${BASE_URL}/${lang}/maqolalar`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ReadingProgress targetId="article-body" />

      <div className="pt-28 sm:pt-32 lg:pt-40">
        <Container>
          <div
            className={cn(
              "lg:grid lg:justify-center lg:gap-10 xl:gap-16",
              hasToc
                ? "lg:grid-cols-[minmax(0,720px)_240px]"
                : "lg:grid-cols-[minmax(0,720px)]",
            )}
          >
            <article className="min-w-0">
              {/* Breadcrumb */}
              <nav
                aria-label={t("breadcrumbAria")}
                className="text-sm text-earth-700/80"
              >
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <li>
                    <Link
                      href={`/${lang}`}
                      className="transition-colors hover:text-forest-700"
                    >
                      {t("breadcrumbHome")}
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5 text-earth-400" />
                  </li>
                  <li>
                    <Link
                      href={`/${lang}/maqolalar`}
                      className="transition-colors hover:text-forest-700"
                    >
                      {t("eyebrow")}
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5 text-earth-400" />
                  </li>
                  <li className="min-w-0 max-w-full">
                    <span
                      aria-current="page"
                      className="block max-w-full truncate font-medium text-earth-900"
                    >
                      {content.title}
                    </span>
                  </li>
                </ol>
              </nav>

              {/* Sarlavha bloki */}
              <header className="mt-8 border-b border-earth-400/25 pb-8">
                <span className="inline-flex items-center rounded-full bg-forest-700/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest-700">
                  {t(`topics.${article.topic}`)}
                </span>
                <h1 className="mt-5 text-balance break-words font-serif text-3xl font-bold leading-tight text-earth-900 sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
                  {content.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-earth-700">
                  <ViewTracker
                    eventKey="view_article"
                    params={{ slug, locale: lang }}
                  />
                  <span className="inline-flex items-center gap-2.5">
                    <AuthorAvatar
                      name={authorName}
                      photo={author.photo}
                      size={40}
                    />
                    <span className="font-semibold text-earth-900">
                      {authorName}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar
                      className="h-4 w-4 text-gold-700"
                      aria-hidden="true"
                    />
                    <time dateTime={article.publishedAt}>
                      {formatArticleDate(article.publishedAt, lang)}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock
                      className="h-4 w-4 text-gold-700"
                      aria-hidden="true"
                    />
                    {t("readingTime", { minutes })}
                  </span>
                  {lang === "ru" && (
                    <span className="inline-flex items-center rounded-full bg-gold-100/40 px-2.5 py-1 text-xs font-medium text-gold-700">
                      {t("translatedFromUzbek")}
                    </span>
                  )}
                </div>
              </header>

              {hasToc && <ArticleTocMobile items={toc} title={t("toc")} />}

              {/* Matn */}
              <div id="article-body" className="mt-10">
                <ArticleBlocks
                  blocks={content.blocks}
                  toc={toc}
                  tableLabel={t("tableLabel")}
                  toneLabels={{
                    tip: t("tones.tip"),
                    info: t("tones.info"),
                    warning: t("tones.warning"),
                  }}
                />
              </div>

              {/* Pastki qism: PDF, ulashish, muallif */}
              <footer className="mt-14 border-t border-earth-400/25 pt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {article.pdf && (
                    <LinkButton
                      href={article.pdf}
                      download
                      variant="primary"
                      className="h-auto min-h-11 w-full py-2.5 text-center sm:w-auto"
                    >
                      <Download className="h-4 w-4 shrink-0" />
                      {t("downloadPdf")}
                    </LinkButton>
                  )}
                  <LinkButton
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="h-auto min-h-11 w-full py-2.5 text-center sm:w-auto"
                  >
                    <TelegramIcon size={16} />
                    {t("shareTelegram")}
                  </LinkButton>
                </div>

                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-earth-400/25 bg-cream-100 p-5 sm:p-6">
                  <AuthorAvatar
                    name={authorName}
                    photo={author.photo}
                    size={56}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                      {t("authorLabel")}
                    </p>
                    <p className="mt-1 font-serif text-xl font-bold text-earth-900">
                      {authorName}
                    </p>
                    {authorBio && (
                      <p className="mt-2 text-sm leading-relaxed text-earth-700">
                        {authorBio}
                      </p>
                    )}
                  </div>
                </div>
              </footer>
            </article>

            {/* Desktop: sticky mundarija */}
            {hasToc && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <ArticleTocSidebar items={toc} title={t("toc")} />
                </div>
              </aside>
            )}
          </div>
        </Container>

        {/* Tegishli ko'chatlar — kategoriya + lendinglar (ichki havolalar) */}
        {relatedSaplings && (
          <RelatedSaplings
            categorySlug={relatedSaplings.category}
            landings={relatedSaplings.landings}
          />
        )}

        {/* Boshqa maqolalar */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-earth-400/20 bg-cream-100 py-16 sm:py-20">
            <Container>
              <h2 className="font-serif text-2xl font-bold text-earth-900 sm:text-3xl">
                {t("related")}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {related.map((item) => (
                  <ArticleCard key={item.slug} article={item} locale={lang} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Yumshoq CTA */}
        <section className="py-16 sm:py-20">
          <Container size="narrow">
            <div className="rounded-3xl border border-forest-400/30 bg-forest-50/40 p-7 text-center sm:p-12">
              <span
                aria-hidden="true"
                className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-700 text-cream"
              >
                <Sprout className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-balance font-serif text-2xl font-bold text-earth-900 sm:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-earth-700">
                {t("ctaText")}
              </p>
              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <LinkButton
                  href={`/${lang}/varieties`}
                  variant="primary"
                  size="lg"
                >
                  {t("ctaCatalog")}
                  <ArrowRight className="h-4 w-4" />
                </LinkButton>
                <LinkButton
                  href={`/${lang}#request`}
                  variant="outline"
                  className="h-auto min-h-14 py-2.5 text-center"
                >
                  {t("ctaConsult")}
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
