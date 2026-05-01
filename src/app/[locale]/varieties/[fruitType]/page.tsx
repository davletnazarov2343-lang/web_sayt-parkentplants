import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { VarietyCard } from "@/components/catalog/VarietyCard";
import { FruitTypeNav } from "@/components/catalog/FruitTypeNav";
import {
  getAllFruitTypeSlugs,
  getAllFruitTypes,
  getFruitTypeBySlug,
  getVarietiesByFruitType,
} from "@/sanity/fetch";
import { LOCALES } from "@/lib/constants";
import type { Locale } from "@/sanity/types";

export const revalidate = 3600;

type Props = {
  params: { locale: string; fruitType: string };
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllFruitTypeSlugs();
    return LOCALES.flatMap((locale) =>
      slugs.map(({ slug }) => ({ locale, fruitType: slug })),
    );
  } catch {
    // Sanity hali sozlanmagan bo'lsa, build qilinmaydi
    return [];
  }
}

export async function generateMetadata({
  params: { locale, fruitType },
}: Props): Promise<Metadata> {
  const ft = await getFruitTypeBySlug(fruitType);
  if (!ft) return { title: "Parkent Plants" };
  const lang = locale as Locale;
  const name = ft.name[lang];
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: `${name} — ${t("listTitle")} · Parkent Plants`,
    description: t("filterPageDescription", { fruitType: name }),
  };
}

export default async function FruitTypePage({
  params: { locale, fruitType },
}: Props) {
  unstable_setRequestLocale(locale);

  const ft = await getFruitTypeBySlug(fruitType);
  if (!ft) notFound();

  const t = await getTranslations({ locale, namespace: "catalog" });
  const lang = locale as Locale;

  const [allFruitTypes, varieties] = await Promise.all([
    getAllFruitTypes(),
    getVarietiesByFruitType(fruitType),
  ]);

  const fruitTypeName = ft.name[lang];

  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-5xl lg:text-6xl text-balance">
            {ft.emoji ? <span className="mr-3">{ft.emoji}</span> : null}
            {fruitTypeName}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-earth-700 lg:text-lg">
            {t("filterPageDescription", { fruitType: fruitTypeName })}
          </p>
        </header>

        <div className="mt-10">
          <FruitTypeNav
            fruitTypes={allFruitTypes}
            locale={lang}
            hrefBase={`/${locale}/varieties`}
            activeSlug={fruitType}
            allLabel={t("filter.all")}
            varietyCountLabel={(n) => t("filter.count", { n })}
          />
        </div>

        {varieties.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-earth-400/40 bg-cream-100 p-10 text-center">
            <p className="font-serif text-lg text-earth-900">
              {t("emptyFruitType", { fruitType: fruitTypeName })}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {varieties.map((v) => (
              <VarietyCard
                key={v._id}
                variety={v}
                locale={lang}
                hrefBase={`/${locale}/varieties`}
                labels={{
                  ripensIn: t("card.ripensIn"),
                  exportable: t("card.exportable"),
                  viewMore: t("card.viewMore"),
                }}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
