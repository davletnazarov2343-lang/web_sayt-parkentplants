import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { getCategoryBySlug } from "@/lib/categories";

/**
 * Ko'chat kategoriyasiga ichki havola kartasi ("Barcha olma ko'chatlari").
 * `categorySlug = null` — umumiy /kochatlar katalogi. Server komponent.
 */
export function CategoryLink({ categorySlug }: { categorySlug: string | null }) {
  const t = useTranslations("internalLinks");
  const locale = useLocale();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const href = category
    ? `/${locale}/kochatlar/${category.slug}`
    : `/${locale}/kochatlar`;

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-forest-400/40 bg-cream p-4 transition-all hover:-translate-y-0.5 hover:border-forest-400 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.3)] sm:p-5"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-700/10 text-2xl"
      >
        {category?.icon ?? "\u{1F331}"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-lg font-semibold leading-snug text-earth-900 group-hover:text-forest-700 sm:text-xl">
          {category ? t(`allCategory.${category.slug}`) : t("hubLink")}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-earth-700">
          {category ? t("categoryText") : t("hubText")}
        </span>
      </span>
      <ArrowRight
        className="h-5 w-5 shrink-0 text-forest-700 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
