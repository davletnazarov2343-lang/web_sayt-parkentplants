import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles/types";

/** Mavzuga oid maqolaga ichki havola kartasi (belgi + sarlavha). Server komponent. */
export function ArticleLinkCard({ article }: { article: Article }) {
  const t = useTranslations("internalLinks");
  const locale = useLocale() === "ru" ? "ru" : "uz";

  return (
    <Link
      href={`/${locale}/maqolalar/${article.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-earth-200 bg-cream-50 p-4 transition-all hover:border-gold-400 hover:shadow-lg sm:p-5"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wider text-gold-700">
          {t("articleLabel")}
        </span>
        <span className="mt-1.5 block font-serif text-lg font-bold leading-snug text-earth-900 group-hover:text-forest-700">
          {article[locale].title}
        </span>
      </span>
      <ArrowRight
        className="h-5 w-5 shrink-0 text-forest-700 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
