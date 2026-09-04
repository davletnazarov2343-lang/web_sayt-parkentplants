"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { StaticVarietyCard } from "@/components/catalog/StaticVarietyCard";
import { CATALOG_VARIETIES, type CatalogFruitType } from "@/lib/catalog/varieties";

type FilterId = "all" | CatalogFruitType;

export type FruitTypeFilterOption = {
  id: CatalogFruitType;
  emoji: string;
  nameUz: string;
  nameRu: string;
  /** Serverda oldindan hisoblangan tayyor matn, masalan "(9)" */
  countLabel: string;
};

type Props = {
  locale: "uz" | "ru";
  allLabel: string;
  /** Serverda oldindan hisoblangan tayyor matn, masalan "(28)" */
  allCountLabel: string;
  fruitTypes: FruitTypeFilterOption[];
};

/**
 * Client-side filtr + grid — Sanity ulanmagan holatda statik katalogni
 * meva turi bo'yicha filtrlaydi. Dizayn uslubi FruitTypeNav/TopCherries
 * filtr pill'lariga ergashadi.
 *
 * MUHIM: barcha matnlar (shu jumladan sonli hisoblagichlar) server
 * komponentdan tayyor string sifatida keladi — funksiya emas, chunki
 * Next.js server→client chegarasida funksiya uzatib bo'lmaydi.
 */
export function CatalogBrowser({
  locale,
  allLabel,
  allCountLabel,
  fruitTypes,
}: Props) {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return CATALOG_VARIETIES;
    return CATALOG_VARIETIES.filter((v) => v.fruitType === filter);
  }, [filter]);

  return (
    <div>
      <nav
        aria-label="Meva turi bo'yicha filtr"
        className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible"
      >
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            filter === "all"
              ? "border-forest-700 bg-forest-700 text-cream"
              : "border-earth-400/40 bg-cream-100 text-earth-900 hover:border-forest-400 hover:bg-cream",
          )}
        >
          {allLabel}
          <span
            className={cn(
              "ml-1.5 text-xs",
              filter === "all" ? "text-cream/70" : "text-earth-700",
            )}
          >
            {allCountLabel}
          </span>
        </button>

        {fruitTypes.map((ft) => {
          const active = filter === ft.id;
          return (
            <button
              key={ft.id}
              type="button"
              onClick={() => setFilter(ft.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-forest-700 bg-forest-700 text-cream"
                  : "border-earth-400/40 bg-cream-100 text-earth-900 hover:border-forest-400 hover:bg-cream",
              )}
            >
              <span className="mr-1.5">{ft.emoji}</span>
              <span>{locale === "ru" ? ft.nameRu : ft.nameUz}</span>
              <span
                className={cn(
                  "ml-1.5 text-xs",
                  active ? "text-cream/70" : "text-earth-700",
                )}
              >
                {ft.countLabel}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((v) => (
          <StaticVarietyCard
            key={`${v.fruitType}-${v.slug}`}
            variety={v}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
