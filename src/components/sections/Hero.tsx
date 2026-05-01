import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-cream pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36"
    >
      {/* Decorative gradient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(82,183,136,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(201,169,97,0.12),transparent_50%)]"
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(to_right,#1B4332_1px,transparent_1px),linear-gradient(to_bottom,#1B4332_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest-700/20 bg-cream-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-forest-700">
            <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-earth-900 sm:text-5xl lg:text-7xl text-balance">
            {t("title")}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-earth-700 sm:text-lg text-balance">
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
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </LinkButton>
          </div>
        </div>
      </Container>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-earth-700/60 lg:flex">
        <span>{t("scrollHint")}</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
}
