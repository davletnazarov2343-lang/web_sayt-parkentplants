import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import {
  ArrowRight,
  Award,
  Truck,
  Leaf,
  Headphones,
  Quote,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: { locale: string } };

const FEATURES: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "certified", Icon: Award },
  { key: "scale", Icon: Truck },
  { key: "regional", Icon: Leaf },
  { key: "support", Icon: Headphones },
];

const STAT_KEYS = ["experience", "seedlings", "varieties", "nurseries"] as const;
const NURSERY_KEYS = ["parkent", "yuqori_chirchiq"] as const;

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/biz-haqimizda`,
      languages: {
        "uz-UZ": "/uz/biz-haqimizda",
        "ru-UZ": "/ru/biz-haqimizda",
        "x-default": "/uz/biz-haqimizda",
      },
    },
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://parkentplants.uz/${locale}/biz-haqimizda`,
    },
  };
}

export default async function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const tStats = await getTranslations({ locale, namespace: "stats" });
  const tCeo = await getTranslations({ locale, namespace: "ceoQuote" });
  const tNurseries = await getTranslations({ locale, namespace: "nurseries" });
  const homeLabel = locale === "ru" ? "Главная" : "Bosh sahifa";

  // BreadcrumbList — mavjud kochatlar sahifalaridagi uslubda
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `https://parkentplants.uz/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb"),
        item: `https://parkentplants.uz/${locale}/biz-haqimizda`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <article className="pt-28 pb-24 sm:pt-32 lg:pt-40">
        <Container size="default">
          {/* Breadcrumb */}
          <nav className="text-sm text-earth-500">
            <Link href={`/${locale}`} className="hover:text-forest-700">
              {homeLabel}
            </Link>
            <span className="mx-2 text-earth-300">/</span>
            <span className="text-earth-700 font-medium">
              {t("breadcrumb")}
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
              {t("intro")}
            </p>
          </header>

          {/* Stats */}
          <section className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("statsTitle")}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STAT_KEYS.map((key) => (
                <Card key={key} variant="bordered" className="text-center">
                  <p className="font-serif text-3xl font-bold text-forest-700 sm:text-4xl">
                    {tStats(`items.${key}.value`)}
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-earth-900">
                    {tStats(`items.${key}.label`)}
                  </p>
                  <p className="mt-2 text-sm text-earth-600 leading-relaxed">
                    {tStats(`items.${key}.description`)}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* History / founder */}
          <section className="mt-20 rounded-2xl bg-forest-50 p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
              <div className="lg:col-span-5">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)]">
                  <Image
                    src="/team/shuhrat-abrorov.jpg"
                    alt={tCeo("name")}
                    fill
                    sizes="(min-width: 1024px) 384px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 text-center">
                  <p className="font-serif text-lg font-semibold text-earth-900">
                    {tCeo("name")}
                  </p>
                  <p className="mt-1 text-sm text-earth-700">{tCeo("role")}</p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-forest-600">
                  {t("historyTitle")}
                </span>
                <Quote
                  className="mt-6 h-10 w-10 text-gold-400"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <blockquote className="mt-4 font-serif text-2xl font-medium leading-tight text-earth-900 sm:text-3xl">
                  &ldquo;{tCeo("quote")}&rdquo;
                </blockquote>
                <p className="mt-6 text-base leading-relaxed text-earth-700 sm:text-lg">
                  {tCeo("description")}
                </p>
              </div>
            </div>
          </section>

          {/* Why us */}
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("whyTitle")}
            </h2>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-earth-400/25 sm:grid-cols-2">
              {FEATURES.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="flex flex-col gap-4 bg-cream-100 p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-700/10 text-forest-700">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-earth-900">
                      {tAbout(`features.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-earth-700">
                      {tAbout(`features.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nurseries */}
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("nurseriesTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-earth-700 sm:text-lg max-w-3xl">
              {t("nurseriesIntro")}
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {NURSERY_KEYS.map((key) => (
                <Card key={key} variant="bordered">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-forest-700">
                    {tNurseries(`items.${key}.badge`)}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-bold text-earth-900">
                    {tNurseries(`items.${key}.name`)}
                  </h3>
                  <p className="mt-2 inline-flex items-start gap-1.5 text-sm text-earth-700">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forest-700/70" />
                    {tNurseries(`items.${key}.address`)}
                  </p>
                  <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-earth-400/20 pt-5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                        {tNurseries("metrics.area")}
                      </dt>
                      <dd className="mt-1 font-serif text-lg font-semibold text-forest-700">
                        {tNurseries(`items.${key}.area`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                        {tNurseries("metrics.capacity")}
                      </dt>
                      <dd className="mt-1 font-serif text-lg font-semibold text-forest-700">
                        {tNurseries(`items.${key}.capacity`)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                        {tNurseries("metrics.specialty")}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-earth-900">
                        {tNurseries(`items.${key}.specialty`)}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-5 text-sm leading-relaxed text-earth-700">
                    {tNurseries(`items.${key}.description`)}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl bg-gradient-to-br from-forest-900 to-forest-700 p-8 sm:p-12 text-cream">
            <h2 className="text-3xl font-serif font-bold sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base text-cream-100/90 leading-relaxed sm:text-lg max-w-2xl">
              {t("ctaBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={`/${locale}/kontakt`}
                variant="secondary"
                size="lg"
              >
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <Link
                href={`/${locale}/kochatlar`}
                className="inline-flex items-center gap-2 rounded-md border border-cream-100/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
              >
                {t("ctaSecondary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Container>
      </article>
    </>
  );
}
