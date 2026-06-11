import type { Metadata } from "next";
import Link from "next/link";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getAllCategories } from "@/lib/categories";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "saplings" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/kochatlar`,
      languages: {
        "uz-UZ": "/uz/kochatlar",
        "ru-UZ": "/ru/kochatlar",
      },
    },
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://parkentplants.uz/${locale}/kochatlar`,
    },
  };
}

export default async function SaplingsHubPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "saplings" });
  const categories = getAllCategories();

  // CollectionPage JSON-LD — Google'ga "bu hub sahifa, 9 ta kategoriya bor"
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://parkentplants.uz/${locale}/kochatlar`,
    name: t("title"),
    description: t("metaDescription"),
    url: `https://parkentplants.uz/${locale}/kochatlar`,
    inLanguage: locale === "uz" ? "uz-UZ" : "ru-RU",
    isPartOf: { "@id": "https://parkentplants.uz#business" },
    hasPart: categories.map((c) => ({
      "@type": "WebPage",
      "@id": `https://parkentplants.uz/${locale}/kochatlar/${c.slug}`,
      name: c.slug,
    })),
  };

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
    ],
  };

  const whyItems = t.raw("whyItems") as string[];

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="pt-28 pb-24 sm:pt-32 lg:pt-40">
        <Container size="default">
          {/* Breadcrumb */}
          <nav className="text-sm text-earth-500">
            <Link href={`/${locale}`} className="hover:text-forest-700">
              {t("breadcrumb.home")}
            </Link>
            <span className="mx-2 text-earth-300">/</span>
            <span className="text-earth-700 font-medium">
              {t("breadcrumb.saplings")}
            </span>
          </nav>

          {/* Hero */}
          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-base text-earth-600 leading-relaxed sm:text-lg">
              {t("subtitle")}
            </p>
          </header>

          {/* Categories grid */}
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("categoriesTitle")}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/kochatlar/${cat.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-earth-200 bg-cream-50 transition-all hover:border-forest-400 hover:shadow-xl"
                >
                  {cat.cover ? (
                    <div className="aspect-[16/9] overflow-hidden bg-earth-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.cover}
                        alt={t(`categories.${cat.slug}.h1`)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-forest-50 to-gold-50">
                      <span className="text-7xl" aria-hidden="true">
                        {cat.icon}
                      </span>
                    </div>
                  )}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif font-bold text-earth-900 group-hover:text-forest-700 transition-colors">
                      {cat.icon} {t(`categories.${cat.slug}.h1`)}
                    </h3>
                    <p className="mt-2 text-sm text-earth-600 leading-relaxed flex-1 line-clamp-3">
                      {t(`categories.${cat.slug}.intro`).slice(0, 140)}…
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 group-hover:text-gold-700">
                      {t("viewCategory")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Why us */}
          <section className="mt-20 rounded-2xl bg-forest-50 p-8 sm:p-12">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("introHeading")}
            </h2>
            <p className="mt-4 text-base text-earth-700 leading-relaxed sm:text-lg max-w-3xl">
              {t("introBody")}
            </p>

            <h3 className="mt-8 text-xl font-serif font-bold text-earth-900">
              {t("whyHeading")}
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {whyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-earth-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-forest-700 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="mt-12 rounded-2xl bg-gradient-to-br from-forest-900 to-forest-700 p-8 sm:p-12 text-cream">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Sparkles className="h-3 w-3" />
              Parkent Plants
            </div>
            <h2 className="mt-4 text-3xl font-serif font-bold sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base text-cream-100/90 leading-relaxed sm:text-lg max-w-2xl">
              {t("ctaBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={`/${locale}#request`}
                variant="secondary"
                size="lg"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <a
                href={`tel:${t("ctaSecondary").replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
              >
                <Phone className="h-4 w-4" />
                {t("ctaSecondary")}
              </a>
            </div>
          </section>
        </Container>
      </article>
    </>
  );
}
