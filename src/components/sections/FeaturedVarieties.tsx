import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllFruitTypes } from "@/sanity/fetch";
import type { Locale } from "@/sanity/types";

/**
 * Bosh sahifadagi 8 meva turi grid'i.
 *
 * Ma'lumot manbasi: Sanity (`fruitType` documents). Sanity sozlanmagan yoki
 * bo'sh bo'lsa — i18n fayllaridagi statik ro'yxatga qaytadi.
 */

const FALLBACK_KEYS = [
  "apple",
  "peach",
  "cherry",
  "apricot",
  "pear",
  "plum",
  "quince",
  "walnut",
] as const;

type FallbackKey = (typeof FALLBACK_KEYS)[number];

const FALLBACK_GLYPHS: Record<FallbackKey, string> = {
  apple: "🍎",
  peach: "🍑",
  cherry: "🍒",
  apricot: "🍊",
  pear: "🍐",
  plum: "🫐",
  quince: "🍋",
  walnut: "🌰",
};

const ACCENT_PALETTE = [
  "from-forest-100 to-forest-200",
  "from-gold-100 to-gold-400/40",
  "from-forest-50 to-forest-100",
  "from-gold-100/80 to-gold-400/30",
  "from-forest-50 to-cream-100",
  "from-forest-200/60 to-forest-100",
  "from-gold-100/70 to-cream-100",
  "from-cream-100 to-earth-400/20",
];

type Card = {
  key: string;
  href: string;
  emoji: string;
  count: string;
  name: string;
  description: string;
};

export async function FeaturedVarieties({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "varieties" });
  const tCard = await getTranslations({ locale, namespace: "varieties.card" });

  // 1. Avval Sanity dan urinib ko'ramiz
  const fruitTypes = await getAllFruitTypes();
  let cards: Card[];

  if (fruitTypes.length > 0) {
    cards = fruitTypes.slice(0, 8).map((ft) => ({
      key: ft._id,
      href: `/${locale}/varieties/${ft.slug}`,
      emoji: ft.emoji ?? "🌱",
      count: t("countLabel", { n: ft.varietyCount }),
      name: ft.name[locale],
      description: ft.shortDescription?.[locale] ?? "",
    }));
  } else {
    // 2. Fallback — hardcoded i18n keys
    cards = FALLBACK_KEYS.map((key) => ({
      key,
      href: `/${locale}/varieties/${key}`,
      emoji: FALLBACK_GLYPHS[key],
      count: t(`items.${key}.count`),
      name: t(`items.${key}.name`),
      description: t(`items.${key}.description`),
    }));
  }

  return (
    <section id="varieties" className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-earth-700">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/varieties`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.25)]"
            >
              <div
                className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${ACCENT_PALETTE[idx % ACCENT_PALETTE.length]}`}
              >
                <span className="text-6xl drop-shadow-sm" aria-hidden="true">
                  {card.emoji}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                  {card.count}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-earth-900">
                  {card.name}
                </h3>
                {card.description && (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-earth-700">
                    {card.description}
                  </p>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-forest-900">
                  {tCard("viewMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
