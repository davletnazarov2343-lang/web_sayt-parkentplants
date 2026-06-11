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
  ArrowRight,
  HelpCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import {
  getCategoryBySlug,
  getAllCategories,
  FRUIT_CATEGORIES,
} from "@/lib/categories";
import { JsonLd } from "@/components/seo/JsonLd";
import { getNewsBySlug } from "@/lib/news";

type Props = {
  params: { locale: string; category: string };
};

type CategoryMessages = {
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  buyingGuide: string;
  pricing: string;
  faq: { q: string; a: string }[];
};

export function generateStaticParams() {
  return FRUIT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params: { locale, category },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const cat = getCategoryBySlug(category);
  if (!cat) return {};

  const messages = (await getMessages()) as unknown as {
    saplings: { categories: Record<string, CategoryMessages> };
  };
  const catMessages = messages.saplings?.categories?.[category];
  if (!catMessages) return {};

  return {
    title: catMessages.title,
    description: catMessages.metaDescription,
    keywords: cat.keywords,
    alternates: {
      canonical: `/${locale}/kochatlar/${category}`,
      languages: {
        "uz-UZ": `/uz/kochatlar/${category}`,
        "ru-UZ": `/ru/kochatlar/${category}`,
      },
    },
    openGraph: {
      type: "website",
      title: catMessages.title,
      description: catMessages.metaDescription,
      url: `https://parkentplants.uz/${locale}/kochatlar/${category}`,
      images: cat.cover ? [{ url: cat.cover }] : undefined,
    },
  };
}

export default async function CategoryPage({
  params: { locale, category },
}: Props) {
  unstable_setRequestLocale(locale);
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const t = await getTranslations({ locale, namespace: "saplings" });
  const messages = (await getMessages()) as unknown as {
    saplings: { categories: Record<string, CategoryMessages> };
  };
  const catMessages = messages.saplings?.categories?.[category];
  if (!catMessages) notFound();

  const { h1, intro, buyingGuide, pricing, faq, metaDescription } = catMessages;
  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter((c) => c.slug !== category);

  // FAQPage schema for this category
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: `https://parkentplants.uz/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.saplings"),
        item: `https://parkentplants.uz/${locale}/kochatlar`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: h1,
        item: `https://parkentplants.uz/${locale}/kochatlar/${category}`,
      },
    ],
  };

  // Product schema (category-level)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: h1,
    description: metaDescription,
    brand: { "@type": "Brand", name: "Parkent Plants" },
    category: "Fruit saplings",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "UZS",
      lowPrice: "10000",
      highPrice: "70000",
      offerCount: "10",
      availability: "https://schema.org/InStock",
      seller: { "@id": "https://parkentplants.uz#business" },
    },
  };

  // Related news
  const relatedNewsArticles = (cat.relatedNews ?? [])
    .map((slug) => getNewsBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />

      <article className="pt-28 pb-24 sm:pt-32 lg:pt-40">
        <Container size="narrow">
          {/* Breadcrumb */}
          <nav className="text-sm text-earth-500">
            <Link href={`/${locale}`} className="hover:text-forest-700">
              {t("breadcrumb.home")}
            </Link>
            <span className="mx-2 text-earth-300">/</span>
            <Link href={`/${locale}/kochatlar`} className="hover:text-forest-700">
              {t("breadcrumb.saplings")}
            </Link>
            <span className="mx-2 text-earth-300">/</span>
            <span className="text-earth-700 font-medium">{h1}</span>
          </nav>

          {/* Header */}
          <header className="mt-8 border-b border-earth-200 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight">
              {cat.icon} {h1}
            </h1>
            <p className="mt-6 text-base text-earth-600 leading-relaxed sm:text-lg">
              {metaDescription}
            </p>
          </header>

          {/* Cover image */}
          {cat.cover && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-earth-200 aspect-[16/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.cover}
                alt={h1}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Intro */}
          <div className="mt-10 text-base leading-relaxed text-earth-700 sm:text-lg">
            <p>{intro}</p>
          </div>

          {/* Buying guide */}
          <section className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("categoryPage.buyingGuideTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-earth-700 sm:text-lg">
              {buyingGuide}
            </p>
          </section>

          {/* Pricing */}
          <section className="mt-12 rounded-2xl bg-gold-50 border-2 border-gold-200 p-6 sm:p-8">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              💰 {t("categoryPage.pricingTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-earth-700 sm:text-lg">
              {pricing}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton
                href={`/${locale}#request`}
                variant="primary"
                size="lg"
              >
                {t("categoryPage.orderNow")}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <a
                href="tel:+998781131819"
                className="inline-flex items-center gap-2 rounded-md border border-forest-700 px-6 py-3 text-sm font-semibold text-forest-700 transition-colors hover:bg-forest-700 hover:text-cream"
              >
                <Phone className="h-4 w-4" />
                {t("categoryPage.callUs")}
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("categoryPage.faqTitle")}
            </h2>
            <div className="mt-6 space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-earth-200 bg-cream-50 p-5 transition-colors hover:border-forest-300"
                >
                  <summary className="flex cursor-pointer items-start gap-3 text-base font-semibold text-earth-900 sm:text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-gold-700 mt-1" />
                    <span className="flex-1">{item.q}</span>
                    <span className="text-forest-700 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 pl-8 text-sm text-earth-700 leading-relaxed sm:text-base">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related news */}
          {relatedNewsArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
                {t("categoryPage.relatedTitle")}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedNewsArticles.map((news) =>
                  news ? (
                    <Link
                      key={news.slug}
                      href={`/${locale}/news/${news.slug}`}
                      className="group rounded-2xl border border-earth-200 bg-cream-50 p-5 hover:border-gold-400 hover:shadow-lg transition-all"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-gold-700">
                        📰 Yangilik
                      </p>
                      <h3 className="mt-2 text-lg font-serif font-bold text-earth-900 group-hover:text-forest-700">
                        {t(`articles.${news.slug}.title` as never)}
                      </h3>
                    </Link>
                  ) : null,
                )}
              </div>
            </section>
          )}

          {/* Other categories */}
          <section className="mt-16 border-t border-earth-200 pt-12">
            <h2 className="text-xl font-serif font-bold text-earth-900 sm:text-2xl">
              {t("categoryPage.backToCategories")}
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={`/${locale}/kochatlar`}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-forest-700 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-700 hover:text-cream transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("breadcrumb.saplings")}
              </Link>
              {otherCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/kochatlar/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-earth-300 bg-cream-50 px-4 py-2 text-sm font-semibold text-earth-700 hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                >
                  <span>{c.icon}</span>
                  <span>
                    {(messages.saplings?.categories?.[c.slug]?.h1 as string) ??
                      c.slug}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 rounded-2xl bg-gradient-to-br from-forest-900 to-forest-700 p-8 sm:p-12 text-cream">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Sparkles className="h-3 w-3" />
              Parkent Plants
            </div>
            <h2 className="mt-4 text-2xl font-serif font-bold sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base text-cream-100/90 leading-relaxed">
              {t("ctaBody")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton
                href={`/${locale}#request`}
                variant="secondary"
                size="lg"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <a
                href="tel:+998781131819"
                className="inline-flex items-center gap-2 rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
              >
                <Phone className="h-4 w-4" />
                +998 78 113 18 19
              </a>
            </div>
          </section>
        </Container>
      </article>
    </>
  );
}
