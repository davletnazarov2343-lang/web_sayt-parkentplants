import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const VARIETY_KEYS = ["apple", "peach", "cherry", "quince"] as const;

const VARIETY_ACCENTS: Record<(typeof VARIETY_KEYS)[number], string> = {
  apple: "from-forest-100 to-forest-200",
  peach: "from-gold-100 to-gold-400/40",
  cherry: "from-forest-50 to-forest-100",
  quince: "from-gold-100/70 to-cream-100",
};

const VARIETY_GLYPHS: Record<(typeof VARIETY_KEYS)[number], string> = {
  apple: "🍎",
  peach: "🍑",
  cherry: "🍒",
  quince: "🍐",
};

export function FeaturedVarieties() {
  const t = useTranslations("varieties");
  const tCard = useTranslations("varieties.card");

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
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VARIETY_KEYS.map((key) => (
            <article
              key={key}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.25)]"
            >
              <div
                className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${VARIETY_ACCENTS[key]}`}
              >
                <span
                  className="text-6xl drop-shadow-sm"
                  aria-hidden="true"
                >
                  {VARIETY_GLYPHS[key]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                  {t(`items.${key}.count`)}
                </span>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-earth-900">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-earth-700">
                  {t(`items.${key}.description`)}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors group-hover:text-forest-900">
                  {tCard("viewMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
