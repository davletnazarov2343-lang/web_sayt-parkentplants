import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LandingCard } from "@/components/landing/LandingCard";
import { CategoryLink } from "@/components/links/CategoryLink";
import { FEATURED_LANDINGS, type LandingSlug } from "@/lib/landings";

/**
 * Maqola oxiridagi "Tegishli ko'chatlar" bloki: kategoriya sahifasiga havola +
 * tegishli nav lendinglari kartalari. Xarita — src/lib/articles/related.ts.
 * Server komponent.
 */
export function RelatedSaplings({
  categorySlug,
  landings,
}: {
  categorySlug: string | null;
  landings: ReadonlyArray<LandingSlug>;
}) {
  const t = useTranslations("internalLinks");
  const cards = landings
    .map((slug) => FEATURED_LANDINGS.find((l) => l.slug === slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <section
      aria-labelledby="related-saplings-title"
      className="mt-16 border-t border-earth-400/20 py-14 sm:py-16"
    >
      <Container>
        <h2
          id="related-saplings-title"
          className="font-serif text-2xl font-bold text-earth-900 sm:text-3xl"
        >
          {t("saplingsTitle")}
        </h2>

        <div className="mt-6 max-w-2xl">
          <CategoryLink categorySlug={categorySlug} />
        </div>

        {cards.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-6">
            {cards.map((landing) => (
              <LandingCard
                key={landing.slug}
                landing={landing}
                className="md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
