import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

const TESTIMONIAL_KEYS = ["farmer", "investor", "government"] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="bg-cream py-20 lg:py-28">
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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIAL_KEYS.map((key) => (
            <figure
              key={key}
              className="flex h-full flex-col rounded-2xl border border-earth-400/25 bg-cream-100 p-7 transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.18)]"
            >
              <div className="flex items-center gap-1 text-gold-700">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-400 text-gold-400"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-snug text-earth-900">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-earth-400/20 pt-5">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-700/10 font-serif text-lg font-semibold text-forest-700"
                >
                  {t(`items.${key}.initials`)}
                </div>
                <div>
                  <p className="font-semibold text-earth-900">
                    {t(`items.${key}.name`)}
                  </p>
                  <p className="text-xs text-earth-700">
                    {t(`items.${key}.role`)}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
