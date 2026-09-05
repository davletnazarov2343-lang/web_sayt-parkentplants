import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { StatsBackdrop } from "./StatsBackdrop";

const STAT_KEYS = ["experience", "seedlings", "nurseries"] as const;

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section id="stats" className="relative isolate overflow-hidden py-20 lg:py-28">
      {/* Fon slayd-shou — client komponent, aylanish mantig'i shu yerda */}
      <StatsBackdrop />

      {/* Qorong'i parda — rasm ustida matn o'qilishi uchun */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-900/60 via-forest-900/40 to-forest-900/60"
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-100/90">
            {t("subtitle")}
          </p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-cream/20 sm:grid-cols-3">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="group flex flex-col items-center gap-2 border border-cream/15 bg-cream/10 px-6 py-10 text-center backdrop-blur-md transition-colors hover:bg-cream/20"
            >
              <dd className="font-serif text-4xl font-semibold tabular-nums tracking-tight text-cream sm:text-5xl lg:text-6xl">
                {t(`items.${key}.value`)}
              </dd>
              <dt className="text-sm font-semibold uppercase tracking-widest text-cream">
                {t(`items.${key}.label`)}
              </dt>
              <p className="text-xs leading-relaxed text-cream-100/85">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
