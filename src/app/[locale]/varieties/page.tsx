import type { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { VarietyCard } from "@/components/catalog/VarietyCard";
import { FruitTypeNav } from "@/components/catalog/FruitTypeNav";
import { TopCherries } from "@/components/sections/TopCherries";
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

  const hasSanityData = fruitTypes.length > 0 || varieties.length > 0;

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
          </header>

          {/* Filter — faqat Sanity'da ma'lumot bo'lganda */}
          {hasSanityData && (
            <div className="mt-10">
              <FruitTypeNav
                fruitTypes={fruitTypes}
                locale={lang}
                hrefBase={`/${locale}/varieties`}
                allLabel={t("filter.all")}
                varietyCountLabel={(n) => t("filter.count", { n })}
              />
            </div>
          )}

          {varieties.length > 0 && (
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

      {/* Sanity bo'sh bo'lsa — gilos navlarini darhol ko'rsataylik */}
      {!hasSanityData && (
        <>
          <TopCherries locale={lang} />
          <section className="bg-cream py-12">
            <Container>
              <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-earth-400/40 bg-cream-100 p-8 text-center">
                <p className="font-serif text-lg text-earth-900">
                  {lang === "ru"
                    ? "Скоро: каталог расширяется"
                    : "Tez orada: katalog kengaymoqda"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-earth-700">
                  {lang === "ru"
                    ? "Сорта яблони, персика, абрикоса и других видов плодов скоро будут добавлены. Сейчас 350+ сортов готовится к загрузке."
                    : "Olma, shaftoli, o'rik va boshqa meva turlarining navlari tez orada qo'shiladi. Hozir 350+ nav yuklash uchun tayyorlanmoqda."}
                </p>
                <a
                  href={`/${locale}/#request`}
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-forest-700 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-900"
                >
                  {lang === "ru" ? "Отправить B2B запрос →" : "B2B so'rov yuborish →"}
                </a>
              </div>
            </Container>
          </section>
        </>
      )}
    </>
  );
}
