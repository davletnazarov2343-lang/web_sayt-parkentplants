import type { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { FeaturedVarieties } from "@/components/sections/FeaturedVarieties";
import { TOTAL_CATALOG_VARIETIES } from "@/lib/catalog/varieties";

export const revalidate = 3600;

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: `${t("listTitle")} — Parkent Plants`,
    description: t("listSubtitle"),
    alternates: {
      canonical: `/${locale}/varieties`,
      languages: {
        "uz-UZ": "/uz/varieties",
        "ru-UZ": "/ru/varieties",
        "x-default": "/uz/varieties",
      },
    },
  };
}

export default async function VarietiesIndexPage({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "catalog" });

  return (
    <>
      <section className="bg-cream pt-20 lg:pt-28 pb-12">
        <Container>
          <header className="mx-auto max-w-2xl text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              {t("eyebrow")}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-5xl lg:text-6xl text-balance">
              {t("listTitle")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-earth-700 lg:text-lg">
              {t("listSubtitle")}
            </p>
            <p className="mt-3 text-sm font-medium text-forest-700">
              {t("staticNotice", { n: TOTAL_CATALOG_VARIETIES })}
            </p>
          </header>
        </Container>
      </section>

      {/* Bozorbop navlar — lending kartalari */}
      <FeaturedVarieties />

      {/* Qolgan meva turlari uchun so'rov CTA */}
      <section className="bg-cream py-12">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-earth-400/40 bg-cream-100 p-8 text-center">
            <p className="font-serif text-lg text-earth-900">
              {t("otherTypes.title")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-earth-700">
              {t("otherTypes.subtitle")}
            </p>
            <a
              href={`/${locale}/#request`}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-forest-700 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-900"
            >
              {t("otherTypes.cta")}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
