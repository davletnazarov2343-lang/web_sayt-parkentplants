import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";

const HAS_PHOTO = true;

export function CeoQuote() {
  const t = useTranslations("ceoQuote");

  return (
    <section id="ceo" className="bg-cream py-20 lg:py-28">
      <Container size="narrow">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)]">
              {HAS_PHOTO ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/team/shuhrat-abrorov.jpg"
                  alt={t("name")}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-full w-full items-center justify-center"
                >
                  <span className="font-serif text-8xl font-semibold text-forest-700/35">
                    SA
                  </span>
                </div>
              )}
              {/* subtle vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),transparent_55%)]"
              />
            </div>
            {/* Caption */}
            <div className="mt-5 text-center">
              <p className="font-serif text-lg font-semibold text-earth-900">
                {t("name")}
              </p>
              <p className="mt-1 text-sm text-earth-700">{t("role")}</p>
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-forest-600">
              {t("eyebrow")}
            </span>
            <Quote
              className="mt-6 h-10 w-10 text-gold-400"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <blockquote className="mt-4 font-serif text-3xl font-medium leading-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-earth-700 lg:text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
