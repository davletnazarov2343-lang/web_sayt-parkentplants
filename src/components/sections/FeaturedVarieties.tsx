import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LandingCard } from "@/components/landing/LandingCard";
import { FEATURED_LANDINGS } from "@/lib/landings";

/**
 * "Tavsiya etilgan navlar" — nav lending sahifalariga olib boruvchi kartalar
 * (olma, olxo'ri, ...). Kartalar balandligi bir xil (grid stretch + CTA pastda).
 * Ro'yxat — src/lib/landings.ts (FEATURED_LANDINGS), matnlar —
 * `featuredVarieties` namespace'da slug bo'yicha. Server komponent.
 */
export function FeaturedVarieties({
  showAllLink = false,
}: {
  /** Sarlavha yonida "Barcha navlar →" (/varieties) havolasini ko'rsatish */
  showAllLink?: boolean;
}) {
  const t = useTranslations("featuredVarieties");
  const locale = useLocale();

  return (
    <section
      id="featured-varieties"
      aria-labelledby="featured-varieties-title"
      className="bg-forest-50/40 py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-700">
              {t("eyebrow")}
            </p>
            <h2
              id="featured-varieties-title"
              className="mt-3 font-serif text-2xl font-bold leading-tight text-earth-900 sm:text-3xl"
            >
              {t("title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-earth-700">
              {t("text")}
            </p>
          </div>

          {showAllLink && (
            <Link
              href={`/${locale}/varieties`}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
            >
              {t("allLink")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* 5 ta karta, markazlashgan qatorlar: mobil 1 ustun, md (768+) 2+2+1, lg (1024+) 3+2,
            xl (1280+) hammasi bir qatorda (5).
            Karta kengligi = (100% - bo'shliqlar) / ustunlar soni; gap-6 = 1.5rem */}
        <ul className="mt-8 flex flex-wrap justify-center gap-6">
          {FEATURED_LANDINGS.map((landing) => (
            <LandingCard
              key={landing.slug}
              landing={landing}
              className="md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-6rem)/5)]"
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
