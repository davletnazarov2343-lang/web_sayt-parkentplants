import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

const IMG_CLUSTER = "/images/granny-smith/cluster.jpg";

/**
 * Bosh sahifadagi Granny Smith lendingiga olib boruvchi banner.
 * TrustBar'dan keyin, Hero bilan raqobatlashmaslik uchun yengil fonda va
 * ixcham balandlikda. Server komponent — tracking yo'q.
 */
export function GrannySmithBanner() {
  const t = useTranslations("grannySmithBanner");
  const locale = useLocale();
  const chips = t.raw("chips") as string[];

  return (
    <section
      id="granny-smith-banner"
      aria-labelledby="granny-smith-banner-title"
      className="bg-forest-50/40 py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="grid items-center gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50 shadow-[0_16px_40px_-20px_rgba(27,67,50,0.45)] md:max-w-none">
            <Image
              src={IMG_CLUSTER}
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 1024px) 272px, (min-width: 768px) 224px, 320px"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
              {t("eyebrow")}
            </p>
            <h2
              id="granny-smith-banner-title"
              className="mt-3 font-serif text-2xl font-bold leading-tight text-earth-900 sm:text-3xl"
            >
              {t("title")}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-earth-700">
              {t("text")}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-forest-400/40 bg-cream px-3.5 py-1.5 text-sm font-semibold text-forest-900"
                >
                  {chip}
                </li>
              ))}
            </ul>

            <LinkButton
              href={`/${locale}/granny-smith`}
              variant="primary"
              size="md"
              className="mt-6"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
