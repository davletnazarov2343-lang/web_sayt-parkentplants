import { useTranslations } from "next-intl";
import { MapPin, Trees, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NURSERY_KEYS = ["parkent", "yuqori_chirchiq"] as const;

export function Nurseries() {
  const t = useTranslations("nurseries");

  return (
    <section id="nurseries" className="bg-cream-100 py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {NURSERY_KEYS.map((key) => (
            <article
              key={key}
              className="group flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:border-forest-400 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.25)]"
            >
              {/* Image placeholder */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-forest-100 via-forest-200 to-forest-400/40">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Trees
                    className="h-20 w-20 text-forest-700/30"
                    strokeWidth={1}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]"
                />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-forest-700 backdrop-blur">
                  {t(`items.${key}.badge`)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-2xl font-semibold leading-snug text-earth-900">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="mt-2 inline-flex items-start gap-1.5 text-sm text-earth-700">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-forest-700/70"
                    strokeWidth={1.75}
                  />
                  {t(`items.${key}.address`)}
                </p>

                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-earth-400/20 pt-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                      {t("metrics.area")}
                    </dt>
                    <dd className="mt-1 font-serif text-xl font-semibold text-forest-700">
                      {t(`items.${key}.area`)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                      {t("metrics.capacity")}
                    </dt>
                    <dd className="mt-1 font-serif text-xl font-semibold text-forest-700">
                      {t(`items.${key}.capacity`)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                      {t("metrics.specialty")}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-earth-900">
                      {t(`items.${key}.specialty`)}
                    </dd>
                  </div>
                </dl>

                <p className="mt-6 flex-1 text-sm leading-relaxed text-earth-700">
                  {t(`items.${key}.description`)}
                </p>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
                >
                  {t("visitCta")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
