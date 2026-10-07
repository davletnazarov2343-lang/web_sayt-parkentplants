import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FEATURED_LANDINGS, type FeaturedLanding } from "@/lib/landings";
import { cn } from "@/lib/utils";

// Accent — kartaning ingichka chegarasi va chip rangi (sayt palitrasidan chiqmaydi)
const ACCENT_STYLES: Record<
  FeaturedLanding["accent"],
  { card: string; chip: string }
> = {
  red: {
    card: "border-red-300/60 hover:border-red-400",
    chip: "border-red-200 bg-red-50 text-red-900",
  },
  green: {
    card: "border-forest-400/40 hover:border-forest-400",
    chip: "border-forest-400/40 bg-forest-50/60 text-forest-900",
  },
  purple: {
    card: "border-purple-300/60 hover:border-purple-400",
    chip: "border-purple-200 bg-purple-50 text-purple-900",
  },
};

/**
 * "Tavsiya etilgan navlar" — nav lending sahifalariga olib boruvchi kartalar
 * (olma, olxo'ri, ...). Kartalar balandligi bir xil (grid stretch + CTA pastda).
 * Ro'yxat — src/lib/landings.ts (FEATURED_LANDINGS), matnlar —
 * `featuredVarieties` namespace'da slug bo'yicha. Server komponent.
 */
export function FeaturedVarieties({
  showAllLink = false,
}: {
  /** Sarlavha yonida "Barcha navlar →" (/varieties) havolasini ko'rsatish */
  showAllLink?: boolean;
}) {
  const t = useTranslations("featuredVarieties");
  const locale = useLocale();

  return (
    <section
      id="featured-varieties"
      aria-labelledby="featured-varieties-title"
      className="bg-forest-50/40 py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
              {t("eyebrow")}
            </p>
            <h2
              id="featured-varieties-title"
              className="mt-3 font-serif text-2xl font-bold leading-tight text-earth-900 sm:text-3xl"
            >
              {t("title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-earth-700">
              {t("text")}
            </p>
          </div>

          {showAllLink && (
            <Link
              href={`/${locale}/varieties`}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
            >
              {t("allLink")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_LANDINGS.map((landing) => {
            const accent = ACCENT_STYLES[landing.accent];
            const chips = t.raw(`items.${landing.slug}.chips`) as string[];
            return (
              <li
                key={landing.slug}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-cream transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.3)]",
                  accent.card,
                )}
              >
                {/* Kvadrat rasm — ichida logotip/telefon bor, kesilmaydi */}
                <div className="relative aspect-square w-full overflow-hidden bg-forest-50">
                  <Image
                    src={landing.image}
                    alt={t(`items.${landing.slug}.imageAlt`)}
                    fill
                    sizes="(min-width: 1280px) 384px, (min-width: 1024px) 31vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-xl font-semibold leading-tight text-earth-900 sm:text-2xl">
                    {t(`items.${landing.slug}.name`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-earth-700 sm:text-base">
                    {t(`items.${landing.slug}.tagline`)}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <li
                        key={chip}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold sm:text-sm",
                          accent.chip,
                        )}
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>

                  {/* Butun karta bosiladi (after: overlay, li `relative`) */}
                  <Link
                    href={`/${locale}${landing.href}`}
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900 focus-visible:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-forest-400"
                  >
                    {t("cta")}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
