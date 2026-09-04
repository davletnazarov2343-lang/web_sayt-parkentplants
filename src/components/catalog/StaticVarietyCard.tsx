import { FRUIT_TYPES, type CatalogVariety } from "@/lib/catalog/varieties";

type Props = {
  variety: CatalogVariety;
  locale: "uz" | "ru";
};

/**
 * Statik katalog kartasi — dizayn tili TopCherries.tsx dagi CherryCard'dan
 * olingan (jonli saytda sinalgan uslub): to'q fon band + katta emoji,
 * badge'lar yuqori chapda, specs ro'yxati, pastda tagline.
 */
export function StaticVarietyCard({ variety, locale }: Props) {
  const fruitMeta = FRUIT_TYPES.find((f) => f.id === variety.fruitType);
  const tagline = locale === "ru" ? variety.taglineRu : variety.taglineUz;
  const ripening = locale === "ru" ? variety.ripeningRu : variety.ripeningUz;
  const visibleBadges = variety.badges.slice(0, 2);
  const visibleSpecs = variety.specs.slice(0, 3);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.25)]">
      {/* Visual band */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-forest-700 via-forest-900 to-earth-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:radial-gradient(circle_at_25%_60%,rgba(201,169,97,0.18),transparent_45%),radial-gradient(circle_at_75%_30%,rgba(82,183,136,0.18),transparent_45%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-3 -top-2 text-[110px] leading-none opacity-30 transition-transform duration-500 group-hover:scale-110"
        >
          {fruitMeta?.emoji ?? "🌱"}
        </div>

        {/* Badges top-left */}
        {visibleBadges.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {visibleBadges.map((badge, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full bg-cream/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-700 backdrop-blur"
              >
                {locale === "ru" ? badge.labelRu : badge.labelUz}
              </span>
            ))}
          </div>
        )}

        {/* Fruit type label bottom-right */}
        {fruitMeta && (
          <div className="absolute bottom-2 right-3 inline-flex items-center gap-1 rounded-md bg-cream/15 px-2 py-1 text-[10px] font-semibold text-cream backdrop-blur-sm">
            {locale === "ru" ? fruitMeta.nameRu : fruitMeta.nameUz}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-tight text-earth-900">
          {variety.name}
        </h3>
        <p className="mt-0.5 text-xs text-earth-700/70">{ripening}</p>

        {/* Specs */}
        {visibleSpecs.length > 0 && (
          <dl className="mt-4 space-y-2 text-xs">
            {visibleSpecs.map((spec, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="shrink-0 text-earth-700/70">
                  {locale === "ru" ? spec.labelRu : spec.labelUz}:
                </span>
                <span className="font-medium text-earth-900">
                  {locale === "ru" ? spec.valueRu : spec.valueUz}
                </span>
              </div>
            ))}
          </dl>
        )}

        {/* Tagline */}
        <p className="mt-4 flex-1 border-t border-earth-400/20 pt-4 text-xs leading-relaxed text-earth-700">
          {tagline}
        </p>
      </div>
    </article>
  );
}
