import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { FeaturedLanding } from "@/lib/landings";
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
  pink: {
    card: "border-pink-300/60 hover:border-pink-400",
    chip: "border-pink-200 bg-pink-50 text-pink-900",
  },
  // Gilos — chuqur olcha-qizil (red/pink'dan ajralib turishi uchun to'qroq)
  rose: {
    card: "border-rose-400/70 hover:border-rose-600",
    chip: "border-rose-300 bg-rose-100/60 text-rose-900",
  },
};

/**
 * Nav lendingiga olib boruvchi karta (rasm, nom, qisqa tavsif, chiplar, "Batafsil").
 * `li` elementi — ota `ul` ichida ishlatiladi; kenglik `className` orqali beriladi.
 * Matnlar — `featuredVarieties` namespace'da slug bo'yicha. Server komponent.
 */
export function LandingCard({
  landing,
  className,
}: {
  landing: FeaturedLanding;
  className?: string;
}) {
  const t = useTranslations("featuredVarieties");
  const locale = useLocale();
  const accent = ACCENT_STYLES[landing.accent];
  const chips = t.raw(`items.${landing.slug}.chips`) as string[];

  return (
    <li
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-2xl border bg-cream transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.3)]",
        accent.card,
        className,
      )}
    >
      {/* Kvadrat rasm — ichida logotip/telefon bor, kesilmaydi */}
      <div className="relative aspect-square w-full overflow-hidden bg-forest-50">
        <Image
          src={landing.image}
          alt={t(`items.${landing.slug}.imageAlt`)}
          fill
          sizes="(min-width: 1280px) 230px, (min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 xl:p-4">
        <h3 className="font-serif text-xl font-semibold leading-tight text-earth-900 sm:text-2xl xl:text-xl">
          {t(`items.${landing.slug}.name`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-earth-700 sm:text-base xl:text-sm">
          {t(`items.${landing.slug}.tagline`)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold sm:text-sm xl:rounded-2xl xl:px-2.5 xl:text-xs",
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
}
