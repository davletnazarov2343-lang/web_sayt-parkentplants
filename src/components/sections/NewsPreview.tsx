import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Calendar,
  Download,
  FileText,
  Newspaper,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getFeaturedNews } from "@/lib/news";

type Props = {
  locale: string;
};

export async function NewsPreview({ locale }: Props) {
  const news = getFeaturedNews();
  if (news.length === 0) return null;

  const t = await getTranslations("news");

  return (
    <section id="news" className="bg-cream-50 py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-serif font-bold text-earth-900 sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-earth-600 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/news`}
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 hover:text-gold-700 transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {news.slice(0, 2).map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-earth-200 bg-cream transition-all hover:border-gold-400 hover:shadow-lg"
            >
              {/* Cover image */}
              {article.cover && (
                <Link
                  href={`/${locale}/news/${article.slug}`}
                  className="block aspect-[16/9] overflow-hidden bg-earth-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover}
                    alt={t(`articles.${article.slug}.title`)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
              )}

              <div className="flex flex-col p-6 sm:p-8 flex-1">
                <div className="flex items-center gap-3 text-xs text-earth-500">
                  <Newspaper className="h-4 w-4 text-gold-700" />
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt, locale)}
                    </time>
                  </span>
                  {article.pdf && (
                    <>
                      <span className="text-earth-300">·</span>
                      <span className="inline-flex items-center gap-1.5 text-gold-700 font-semibold">
                        <FileText className="h-3.5 w-3.5" />
                        PDF
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-serif font-bold text-earth-900 transition-colors group-hover:text-forest-700 sm:text-2xl">
                  <Link href={`/${locale}/news/${article.slug}`}>
                    {t(`articles.${article.slug}.title`)}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-earth-600 leading-relaxed sm:text-base flex-1">
                  {t(`articles.${article.slug}.summary`)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/${locale}/news/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-gold-700"
                  >
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  {article.pdf && (
                    <LinkButton
                      href={article.pdf}
                      variant="outline"
                      size="sm"
                      download
                    >
                      <Download className="h-3.5 w-3.5" />
                      {t("downloadPdf")}
                    </LinkButton>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "view all" link */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            href={`/${locale}/news`}
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

function formatDate(iso: string, locale: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
