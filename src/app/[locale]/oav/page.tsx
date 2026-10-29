import type { Metadata } from "next";
import Link from "next/link";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: { locale: string } };

/** Tartib va havolalar — tasdiqlangan OAV maqolalari (matnlar tarjima faylida) */
const PRESS_ITEMS = [
  { key: "kun2021", url: "https://kun.uz/64028730" },
  {
    key: "eastfruit",
    url: "https://east-fruit.com/novosti/tadzhikskie-sadovody-zakupayut-v-uzbekistane-sertifitsirovannye-sazhentsy-dlya-zakladki-intensivnykh-sadov/",
  },
  {
    key: "kun2018",
    url: "https://kun.uz/news/2018/09/01/agro-house-intensiv-bogdorcilik-bujica-bogbonlar-va-fermerlar-ucun-seminar-utkazdi",
  },
  {
    key: "kun2024",
    url: "https://kun.uz/news/2024/12/19/bogdorchilikda-tomchilatib-sugorish-nega-ishlar-surati-sust",
  },
  {
    key: "treefruit",
    url: "https://www.treefruit.com.au/orchard/management/crop-growth-management/665-aussies-host-cherry-grower-from-uzbekistan",
  },
] as const;

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pressPage" });
  return buildMetadata({
    locale,
    path: "/oav",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PressPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pressPage" });
  const homeLabel = locale === "ru" ? "Главная" : "Bosh sahifa";

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
        item: `https://parkentplants.uz/${locale}/oav`,
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
            <h1 className="text-4xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-base text-earth-600 leading-relaxed sm:text-lg">
              <strong className="font-semibold text-earth-900">
                {t("introBrand")}
              </strong>{" "}
              {t("intro")}
            </p>
          </header>

          {/* Maqolalar */}
          <section className="mt-12 grid gap-5 lg:max-w-3xl">
            {PRESS_ITEMS.map(({ key, url }) => (
              <Card key={key} variant="bordered" className="p-6 sm:p-8">
                <h2 className="font-serif text-xl font-bold text-earth-900 sm:text-2xl">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-start gap-2 hover:text-forest-700"
                  >
                    {t(`items.${key}.heading`)}
                    <ExternalLink
                      className="mt-1.5 h-4 w-4 shrink-0 text-forest-700/70"
                      aria-hidden="true"
                    />
                  </a>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-earth-700">
                  {t(`items.${key}.text`)}
                </p>
              </Card>
            ))}
          </section>

          <p className="mt-10 max-w-3xl text-sm italic leading-relaxed text-earth-600">
            {t("note")}
          </p>
        </Container>
      </article>
    </>
  );
}
