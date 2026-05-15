import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36"
    >
      {/* Background photo — real Norchontol nursery rows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-nursery.jpg')",
          filter: "saturate(1.05)",
        }}
      />

      {/* Dark forest overlay — readability + brand color */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-900/70 via-forest-900/55 to-forest-900/80"
      />

      {/* Subtle gold accent glow (top-right) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,97,0.18),transparent_55%)]"
      />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-7xl text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            {t("title")}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-cream-100/95 sm:text-lg text-balance drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)]">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <LinkButton
              href="#varieties"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              href="#request"
              variant="outline"
              size="lg"
              className="w-full border-cream/40 bg-cream/10 text-cream backdrop-blur-sm hover:border-cream hover:bg-cream/20 sm:w-auto"
            >
              {t("ctaSecondary")}
            </LinkButton>
          </div>
        </div>
      </Container>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-cream/70 lg:flex">
        <span>{t("scrollHint")}</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
}
