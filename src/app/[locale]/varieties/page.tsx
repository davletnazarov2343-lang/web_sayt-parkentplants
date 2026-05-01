import type { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { VarietyCard } from "@/components/catalog/VarietyCard";
import { FruitTypeNav } from "@/components/catalog/FruitTypeNav";
import { getAllFruitTypes, getAllVarieties } from "@/sanity/fetch";
import type { Locale } from "@/sanity/types";

export const revalidate = 3600;

type Props = { params: { locale: string } };

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: `${t("listTitle")} — Parkent Plants`,
    description: t("listSubtitle"),
  };
}

export default async function VarietiesIndexPage({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "catalog" });
  const lang = locale as Locale;

  const [fruitTypes, varieties] = await Promise.all([
    getAllFruitTypes(),
    getAllVarieties(),
  ]);

  return (
    <section className="bg-cream py-20 lg:py-28">
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
        </header>

        <div className="mt-10">
          <FruitTypeNav
            fruitTypes={fruitTypes}
            locale={lang}
            hrefBase={`/${locale}/varieties`}
            allLabel={t("filter.all")}
            varietyCountLabel={(n) => t("filter.count", { n })}
          />
        </div>

        {varieties.length === 0 ? (
          <EmptyState locale={lang} />
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

function EmptyState({ locale }: { locale: Locale }) {
  const lines =
    locale === "ru"
      ? [
          "Каталог пока пуст.",
          "Добавьте сорта в Sanity Studio: /studio",
        ]
      : [
          "Katalog hozircha bo'sh.",
          "Sanity Studio orqali nav qo'shing: /studio",
        ];
  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-earth-400/40 bg-cream-100 p-10 text-center">
      <p className="font-serif text-lg text-earth-900">{lines[0]}</p>
      <p className="mt-2 text-sm text-earth-700">{lines[1]}</p>
    </div>
  );
}
