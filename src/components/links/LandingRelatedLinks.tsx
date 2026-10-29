import { CategoryLink } from "@/components/links/CategoryLink";
import { ArticleLinkCard } from "@/components/links/ArticleLinkCard";
import { getArticlesForLanding } from "@/lib/articles/related";
import { LANDING_CATEGORY, type LandingSlug } from "@/lib/landings";

/**
 * Lending sahifasi oxirida: o'z kategoriyasiga ("Barcha olma ko'chatlari")
 * va mavzuga oid maqolaga (bo'lsa) ichki havolalar. Server komponent.
 */
export function LandingRelatedLinks({ landing }: { landing: LandingSlug }) {
  const article = getArticlesForLanding(landing)[0];

  return (
    <section className="mx-auto mt-16 max-w-4xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <CategoryLink categorySlug={LANDING_CATEGORY[landing]} />
        {article && <ArticleLinkCard article={article} />}
      </div>
    </section>
  );
}
