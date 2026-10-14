"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import type { TocItem } from "@/lib/articles/toc";
import { cn } from "@/lib/utils";

// Sarlavha shu chiziqdan (viewport tepasidan, px) o'tsa — "joriy bo'lim"
const ACTIVE_LINE = 140;

/**
 * Desktop (lg+) yon mundarija: sticky, joriy bo'lim ajratib ko'rsatiladi.
 * Faqat props va scroll'ga tayanadi (Intl/Date yo'q) — hydration xavfsiz.
 */
export function ArticleTocSidebar({
  items,
  title,
}: {
  items: ReadonlyArray<TocItem>;
  title: string;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= ACTIVE_LINE) current = item.id;
        else break;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
        <ListTree className="h-4 w-4" aria-hidden="true" />
        {title}
      </p>
      <ol className="mt-4 max-h-[calc(100vh-11rem)] space-y-0.5 overflow-y-auto border-l border-earth-400/30 pr-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px flex items-start gap-2.5 border-l-2 py-1.5 pl-4 pr-2 text-sm leading-snug transition-colors",
                  active
                    ? "border-forest-700 font-semibold text-forest-700"
                    : "border-transparent text-earth-700 hover:border-gold-400 hover:text-forest-700",
                )}
              >
                {item.number !== undefined && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-px inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-xs font-bold",
                      active
                        ? "bg-forest-700 text-cream"
                        : "bg-forest-700/10 text-forest-700",
                    )}
                  >
                    {item.number}
                  </span>
                )}
                <span className="min-w-0 break-words">{item.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
