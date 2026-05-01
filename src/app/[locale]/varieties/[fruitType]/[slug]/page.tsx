import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import {
  ArrowLeft,
  Calendar,
  Globe2,
  ShieldCheck,
  TreeDeciduous,
  Sprout,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { urlFor } from "@/sanity/imageUrl";
import {
  getAllVarietySlugs,
  getVariety,
  getVarietiesByFruitType,
} from "@/sanity/fetch";
import { LOCALES } from "@/lib/constants";
import type { Locale } from "@/sanity/types";

export const revalidate = 3600;

type Props = {
  params: { locale: string; fruitType: string; slug: string };
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllVarietySlugs();
    return LOCALES.flatMap((locale) =>
      slugs.map(({ slug, fruitTypeSlug }) => ({
        locale,
        fruitType: fruitTypeSlug,
        slug,
      })),
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params: { locale, fruitType, slug },
}: Props): Promise<Metadata> {
  const variety = await getVariety(fruitType, slug);
  if (!variety) return { title: "Parkent Plants" };
  const lang = locale as Locale;

  const title =
    variety.seoTitle?.[lang] ||
    `${variety.name[lang]} — ${variety.fruitType.name[lang]} | Parkent Plants`;
  const description =
    variety.seoDescription?.[lang] ||
    variety.description?.[lang] ||
    `${variety.name[lang]} navi, sertifikatlangan ko'chat. Parkent Plants.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: variety.coverImage
        ? [urlFor(variety.coverImage).width(1200).height(630).fit("crop").url()]
        : undefined,
    },
  };
}

const TREE_SIZE_LABELS: Record<
  "small" | "medium" | "large",
  Record<Locale, string>
> = {
  small: { uz: "Past bo'yli", ru: "Низкорослое" },
  medium: { uz: "O'rta bo'yli", ru: "Среднерослое" },
  large: { uz: "Yirik", ru: "Крупное" },
};

export default async function VarietyDetailPage({
  params: { locale, fruitType, slug },
}: Props) {
  unstable_setRequestLocale(locale);

  const variety = await getVariety(fruitType, slug);
  if (!variety) notFound();

  const lang = locale as Locale;
  const t = await getTranslations({ locale, namespace: "varietyDetail" });
  const tCatalog = await getTranslations({ locale, namespace: "catalog" });

  const name = variety.name[lang];
  const fruitTypeName = variety.fruitType.name[lang];
  const description = variety.description?.[lang];
  const ripening = variety.ripeningTime?.[lang];
  const origin = variety.origin?.[lang];
  const extra = variety.characteristicsExtra?.[lang];

  const coverUrl = variety.coverImage
    ? urlFor(variety.coverImage).width(1280).height(960).fit("crop").url()
    : null;

  // Related: same fruit type, exclude current
  const related = (await getVarietiesByFruitType(fruitType))
    .filter((v) => v.slug !== slug)
    .slice(0, 3);

  return (
    <article className="bg-cream pt-12 pb-20 lg:pt-16 lg:pb-28">
      <Container>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-earth-700"
        >
          <Link
            href={`/${locale}/varieties`}
            className="inline-flex items-center gap-1.5 hover:text-forest-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            {tCatalog("listTitle")}
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href={`/${locale}/varieties/${fruitType}`}
            className="hover:text-forest-700"
          >
            {fruitTypeName}
          </Link>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.4)]">
              {coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt={variety.coverImage?.alt ?? name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-9xl">
                  {variety.fruitType.emoji ?? "🌱"}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              {fruitTypeName}
            </span>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-5xl text-balance">
              {name}
            </h1>

            {description && (
              <p className="mt-6 text-base leading-relaxed text-earth-700 lg:text-lg">
                {description}
              </p>
            )}

            {/* Spec table */}
            <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-earth-400/25 sm:grid-cols-2">
              {ripening && (
                <SpecRow
                  Icon={Calendar}
                  label={t("ripeningTime")}
                  value={ripening}
                />
              )}
              {variety.treeSize && (
                <SpecRow
                  Icon={TreeDeciduous}
                  label={t("treeSize")}
                  value={TREE_SIZE_LABELS[variety.treeSize][lang]}
                />
              )}
              {typeof variety.yieldKgPerTree === "number" && (
                <SpecRow
                  Icon={Sprout}
                  label={t("yield")}
                  value={`${variety.yieldKgPerTree} ${t("kgPerTree")}`}
                />
              )}
              {origin && (
                <SpecRow Icon={MapPin} label={t("origin")} value={origin} />
              )}
              {variety.exportable && (
                <SpecRow
                  Icon={Globe2}
                  label={t("exportable")}
                  value={t("yes")}
                />
              )}
              {variety.certifications && variety.certifications.length > 0 && (
                <SpecRow
                  Icon={ShieldCheck}
                  label={t("certifications")}
                  value={variety.certifications.join(", ")}
                />
              )}
            </dl>

            <LinkButton
              href={`/${locale}/#contact`}
              variant="primary"
              size="lg"
              className="mt-10"
            >
              {t("requestQuote")}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        {/* Extra description */}
        {extra && (
          <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-earth-400/25 bg-cream-100 p-8 lg:p-10">
            <h2 className="font-serif text-2xl font-semibold text-earth-900">
              {t("expertNote")}
            </h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-earth-700">
              {extra}
            </p>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-earth-900 sm:text-3xl">
              {t("relatedTitle", { fruitType: fruitTypeName })}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <Link
                  key={v._id}
                  href={`/${locale}/varieties/${fruitType}/${v.slug}`}
                  className="group flex flex-col rounded-2xl border border-earth-400/25 bg-cream p-6 transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.2)]"
                >
                  <h3 className="font-serif text-lg font-semibold text-earth-900">
                    {v.name[lang]}
                  </h3>
                  {v.ripeningTime?.[lang] && (
                    <p className="mt-2 text-sm text-earth-700">
                      {tCatalog("card.ripensIn")}: {v.ripeningTime[lang]}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-forest-900">
                    {tCatalog("card.viewMore")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}

function SpecRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 bg-cream-100 p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-700/10 text-forest-700">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
          {label}
        </dt>
        <dd className="mt-1 text-sm font-medium text-earth-900">{value}</dd>
      </div>
    </div>
  );
}
