import Link from "next/link";
import { cn } from "@/lib/utils";
import type { FruitTypeListItem, Locale } from "@/sanity/types";

type Props = {
  fruitTypes: FruitTypeListItem[];
  locale: Locale;
  hrefBase: string; // `/uz/varieties`
  activeSlug?: string | null;
  allLabel: string;
  varietyCountLabel: (count: number) => string;
};

export function FruitTypeNav({
  fruitTypes,
  locale,
  hrefBase,
  activeSlug,
  allLabel,
  varietyCountLabel,
}: Props) {
  const isAllActive = !activeSlug;

  return (
    <nav
      aria-label="Meva turi bo'yicha filter"
      className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
    >
      <Link
        href={hrefBase}
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          isAllActive
            ? "border-forest-700 bg-forest-700 text-cream"
            : "border-earth-400/40 bg-cream-100 text-earth-900 hover:border-forest-400 hover:bg-cream",
        )}
      >
        {allLabel}
      </Link>

      {fruitTypes.map((ft) => {
        const active = ft.slug === activeSlug;
        return (
          <Link
            key={ft._id}
            href={`${hrefBase}/${ft.slug}`}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "border-forest-700 bg-forest-700 text-cream"
                : "border-earth-400/40 bg-cream-100 text-earth-900 hover:border-forest-400 hover:bg-cream",
            )}
          >
            {ft.emoji ? <span className="mr-1.5">{ft.emoji}</span> : null}
            <span>{ft.name[locale]}</span>
            <span
              className={cn(
                "ml-1.5 text-xs",
                active ? "text-cream/70" : "text-earth-700",
              )}
            >
              {varietyCountLabel(ft.varietyCount)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
