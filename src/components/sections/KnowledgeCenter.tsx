import { useTranslations } from "next-intl";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";

const ARTICLE_KEYS = ["selection", "planting", "export"] as const;

const ARTICLE_ACCENTS: Record<(typeof ARTICLE_KEYS)[number], string> = {
  selection: "from-forest-100 to-forest-200",
  planting: "from-gold-100 to-gold-400/40",
  export: "from-forest-50 to-forest-100",
};

export function KnowledgeCenter() {
  const t = useTranslations("knowledge");

  return (
    <section id="knowledge" className="bg-cream-100 py-20 lg:py-28">
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
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ARTICLE_KEYS.map((key) => (
            <article
              key={key}
              className="group flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.2)]"
            >
              <div
                className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${ARTICLE_ACCENTS[key]}`}
              >
                <BookOpen
                  className="h-14 w-14 text-forest-700/30"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest-700 backdrop-blur">
                  {t(`items.${key}.category`)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg font-semibold leading-snug text-earth-900">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-earth-700">
                  {t(`items.${key}.excerpt`)}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-earth-400/20 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-earth-700">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {t(`items.${key}.readTime`)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 transition-colors group-hover:text-forest-900">
                    {t("readMore")}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
