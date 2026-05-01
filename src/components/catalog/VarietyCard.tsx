import Link from "next/link";
import { ArrowRight, Calendar, Globe2 } from "lucide-react";
import { urlFor } from "@/sanity/imageUrl";
import type { Locale, VarietyCard as VarietyCardType } from "@/sanity/types";

type Props = {
  variety: VarietyCardType;
  locale: Locale;
  hrefBase: string; // e.g. `/uz/varieties`
  labels: {
    ripensIn: string;
    exportable: string;
    viewMore: string;
  };
};

export function VarietyCard({ variety, locale, hrefBase, labels }: Props) {
  const fruitTypeSlug = variety.fruitType.slug;
  const href = `${hrefBase}/${fruitTypeSlug}/${variety.slug}`;
  const name = variety.name[locale];
  const fruitTypeName = variety.fruitType.name[locale];

  const imageUrl = variety.coverImage
    ? urlFor(variety.coverImage).width(640).height(480).fit("crop").url()
    : null;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.25)]"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-forest-100 to-forest-200">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={variety.coverImage?.alt ?? name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center text-6xl drop-shadow-sm"
          >
            {variety.fruitType.emoji ?? "🌱"}
          </div>
        )}
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest-700 backdrop-blur">
          {fruitTypeName}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold leading-snug text-earth-900">
          {name}
        </h3>

        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-earth-700">
          {variety.ripeningTime?.[locale] && (
            <div className="inline-flex items-center gap-1.5">
              <Calendar
                className="h-3.5 w-3.5 text-forest-700/70"
                strokeWidth={1.75}
              />
              <span>
                {labels.ripensIn}: {variety.ripeningTime[locale]}
              </span>
            </div>
          )}
          {variety.exportable && (
            <div className="inline-flex items-center gap-1.5">
              <Globe2
                className="h-3.5 w-3.5 text-forest-700/70"
                strokeWidth={1.75}
              />
              <span>{labels.exportable}</span>
            </div>
          )}
        </dl>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-forest-900">
          {labels.viewMore}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
