import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllNews } from "@/lib/news";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("news");
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/news`,
      languages: {
        "uz-UZ": "/uz/news",
        "ru-UZ": "/ru/news",
      },
    },
  };
}

export default async function NewsListPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("news");
  const news = getAllNews();

  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <Container size="narrow">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-3xl font-serif font-bold text-earth-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base text-earth-600 sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {news.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/news/${article.slug}`}
              className="group block rounded-2xl border border-earth-200 bg-cream-50 p-6 transition-all hover:border-gold-400 hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center gap-3 text-xs text-earth-500">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt, locale)}
                </time>
                {article.pdf && (
                  <>
                    <span className="text-earth-300">·</span>
                    <span className="inline-flex items-center gap-1.5 text-gold-700">
                      <FileText className="h-3.5 w-3.5" />
                      PDF
                    </span>
                  </>
                )}
              </div>
              <h2 className="mt-3 text-xl font-serif font-bold text-earth-900 transition-colors group-hover:text-forest-700 sm:text-2xl">
                {t(`articles.${article.slug}.title`)}
              </h2>
              <p className="mt-3 text-sm text-earth-600 leading-relaxed sm:text-base">
                {t(`articles.${article.slug}.summary`)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-gold-700">
                {t("readMore")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
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
