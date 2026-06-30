import { Sparkles, Calendar, Package, Tag, CheckCircle } from "lucide-react";
import { getTranslations, getMessages } from "next-intl/server";
import {
  GRAPE_VARIETIES,
  formatUzs,
  type GrapeVariety,
} from "@/lib/grapes/featured-varieties";

const TELEGRAM_ORDER_URL = "https://t.me/+998995573800";

type VarietyMessages = {
  name: string;
  nameCyrillic: string;
  ripening: string;
  description: string;
};

type FeaturedVarietiesMessages = {
  title: string;
  subtitle: string;
  labels: {
    ripening: string;
    yield: string;
    price: string;
    perPiece: string;
    tonsPerHa: string;
    currency: string;
    availableNow: string;
    orderTelegram: string;
    regional: string;
    limited: string;
    seedless: string;
  };
  highlights: Record<NonNullable<GrapeVariety["highlight"]>, string>;
  varieties: Record<string, VarietyMessages>;
};

type Props = {
  locale: string;
};

export async function GrapeVarietyCards({ locale }: Props) {
  const t = await getTranslations({
    locale,
    namespace: "saplings.featuredVarieties",
  });
  const messages = (await getMessages({ locale })) as unknown as {
    saplings: { featuredVarieties: FeaturedVarietiesMessages };
  };
  const featured = messages.saplings?.featuredVarieties;
  if (!featured) return null;

  return (
    <section className="mt-12">
      {/* Section heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
            🍇 {t("title")}
          </h2>
          <p className="mt-2 text-sm text-earth-600 sm:text-base">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Variety cards grid */}
      <div className="mt-8 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {GRAPE_VARIETIES.map((variety) => {
          const v = featured.varieties[variety.slug];
          if (!v) return null;
          return (
            <article
              key={variety.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-earth-200 bg-cream transition-all hover:border-gold-400 hover:shadow-xl"
            >
              {/* Poster image (square aspect — posterlar 1:1 yoki 3:4 dizayn qilingan) */}
              <div className="relative overflow-hidden bg-forest-900 aspect-[3/4]">
                {/* Highlight badge */}
                {variety.highlight && (
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-earth-900 shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    {featured.highlights[variety.highlight]}
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={variety.image}
                  alt={`${v.nameCyrillic} (${v.name}) — ${featured.labels.seedless}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Info block */}
              <div className="flex flex-col p-5 flex-1">
                <header>
                  <h3 className="text-xl font-serif font-bold text-earth-900">
                    🍇 {v.nameCyrillic}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-earth-500">
                    {v.name} ·{" "}
                    <span className="text-gold-700">
                      {featured.labels.seedless}
                    </span>
                  </p>
                </header>

                <p className="mt-3 text-sm text-earth-700 leading-relaxed">
                  {v.description}
                </p>

                {/* Specs list */}
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="h-4 w-4 text-forest-700 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <dt className="text-earth-500">
                        {featured.labels.ripening}
                      </dt>
                      <dd className="font-semibold text-earth-900">
                        {v.ripening}{" "}
                        <span className="text-xs font-normal text-earth-500">
                          {featured.labels.regional}
                        </span>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Package className="h-4 w-4 text-forest-700 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <dt className="text-earth-500">
                        {featured.labels.yield}
                      </dt>
                      <dd className="font-semibold text-earth-900">
                        {variety.yieldTonsPerHa.min}-
                        {variety.yieldTonsPerHa.max} {featured.labels.tonsPerHa}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Tag className="h-4 w-4 text-gold-700 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <dt className="text-earth-500">
                        {featured.labels.price}
                      </dt>
                      <dd className="font-bold text-lg text-gold-700">
                        {formatUzs(variety.priceUzs)} {featured.labels.currency}
                        <span className="text-xs font-normal text-earth-500 ml-1">
                          {featured.labels.perPiece}
                        </span>
                      </dd>
                    </div>
                  </div>

                  {variety.availableNow && (
                    <div className="flex items-center gap-2.5 pt-1">
                      <CheckCircle className="h-4 w-4 text-forest-600 shrink-0" />
                      <span className="text-sm font-semibold text-forest-700">
                        {featured.labels.availableNow}
                      </span>
                    </div>
                  )}
                </dl>

                {/* CTA */}
                <a
                  href={TELEGRAM_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-forest-700 px-4 py-3 text-sm font-bold text-cream transition-colors hover:bg-forest-900"
                >
                  🍇 {featured.labels.orderTelegram}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
