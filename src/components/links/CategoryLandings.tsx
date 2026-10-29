import { useTranslations } from "next-intl";
import { LandingCard } from "@/components/landing/LandingCard";
import { getLandingsByCategory } from "@/lib/landings";

/**
 * Kategoriya sahifasida shu meva turining nav lendinglari ("Bozorbop navlar").
 * Lendingi yo'q kategoriyada hech narsa chiqarmaydi. Server komponent.
 */
export function CategoryLandings({ categorySlug }: { categorySlug: string }) {
  const t = useTranslations("internalLinks");
  const landings = getLandingsByCategory(categorySlug);
  if (landings.length === 0) return null;

  return (
    <section aria-labelledby="category-landings-title" className="mt-12">
      <h2
        id="category-landings-title"
        className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl"
      >
        {t("varietiesTitle")}
      </h2>
      <ul className="mt-6 flex flex-wrap justify-center gap-6">
        {landings.map((landing) => (
          <LandingCard
            key={landing.slug}
            landing={landing}
            className="sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          />
        ))}
      </ul>
    </section>
  );
}
