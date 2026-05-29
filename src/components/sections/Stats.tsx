import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

const STAT_KEYS = ["experience", "seedlings", "nurseries"] as const;

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section id="stats" className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-earth-900 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-earth-700">
            {t("subtitle")}
          </p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-earth-400/30 sm:grid-cols-3">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="group flex flex-col items-center gap-2 bg-cream px-6 py-10 text-center transition-colors hover:bg-cream-100"
            >
              <dd className="font-serif text-4xl font-semibold tabular-nums tracking-tight text-forest-700 sm:text-5xl lg:text-6xl">
                {t(`items.${key}.value`)}
              </dd>
              <dt className="text-sm font-semibold uppercase tracking-widest text-earth-900">
                {t(`items.${key}.label`)}
              </dt>
              <p className="text-xs leading-relaxed text-earth-700">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
