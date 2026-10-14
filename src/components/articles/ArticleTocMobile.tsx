import { ChevronDown, ListTree } from "lucide-react";
import type { TocItem } from "@/lib/articles/toc";

/**
 * Mobil/planshet mundarija: tepada yig'iladigan blok (JS'siz — <details>).
 * lg dan boshlab yashirin: o'rniga yon tomondagi sticky mundarija chiqadi.
 */
export function ArticleTocMobile({
  items,
  title,
}: {
  items: ReadonlyArray<TocItem>;
  title: string;
}) {
  return (
    <details className="group mt-8 rounded-xl border border-earth-400/30 bg-cream-100 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold text-earth-900 [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          <ListTree className="h-4 w-4 text-gold-700" aria-hidden="true" />
          {title}
        </span>
        <ChevronDown
          className="h-4 w-4 text-forest-700 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <ol className="space-y-0.5 border-t border-earth-400/25 px-2 py-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-[15px] leading-snug text-earth-700 transition-colors hover:bg-cream hover:text-forest-700"
            >
              {item.number !== undefined && (
                <span
                  aria-hidden="true"
                  className="mt-px inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-forest-700/10 px-1 text-xs font-bold text-forest-700"
                >
                  {item.number}
                </span>
              )}
              <span className="min-w-0 break-words">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
