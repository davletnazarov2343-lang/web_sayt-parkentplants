import { Info, Lightbulb, TriangleAlert, type LucideIcon } from "lucide-react";
import type { TocItem } from "@/lib/articles/toc";
import { stripInline } from "@/lib/articles/inline";
import type { Block, CalloutTone, Inline } from "@/lib/articles/types";
import { cn } from "@/lib/utils";
import { InlineText } from "./InlineText";

type ToneStyle = {
  Icon: LucideIcon;
  box: string;
  icon: string;
  title: string;
  body: string;
  dot: string;
  num: string;
};

// Tailwind klasslari to'liq satr sifatida yozilgan (dinamik yig'ilmaydi)
const TONES: Record<CalloutTone, ToneStyle> = {
  tip: {
    Icon: Lightbulb,
    box: "border-forest-400/50 bg-forest-50/50",
    icon: "bg-forest-700 text-cream",
    title: "text-forest-900",
    body: "text-earth-900/90",
    dot: "bg-forest-600",
    num: "bg-forest-700/15 text-forest-900",
  },
  info: {
    Icon: Info,
    box: "border-sky-300 bg-sky-50",
    icon: "bg-sky-600 text-white",
    title: "text-sky-950",
    body: "text-sky-950/90",
    dot: "bg-sky-600",
    num: "bg-sky-600/15 text-sky-900",
  },
  warning: {
    Icon: TriangleAlert,
    box: "border-amber-300 bg-amber-50",
    icon: "bg-amber-400 text-amber-950",
    title: "text-amber-950",
    body: "text-amber-950/90",
    dot: "bg-amber-500",
    num: "bg-amber-500/20 text-amber-900",
  },
};

function BulletList({
  items,
  dotClass,
  className,
}: {
  items: Inline[];
  dotClass: string;
  className?: string;
}) {
  return (
    <ul role="list" className={cn("space-y-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative break-words pl-6">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0.5 top-[0.72em] h-1.5 w-1.5 rounded-full",
              dotClass,
            )}
          />
          <InlineText text={item} />
        </li>
      ))}
    </ul>
  );
}

function NumberedList({
  items,
  numClass,
  className,
}: {
  items: Inline[];
  numClass: string;
  className?: string;
}) {
  return (
    <ol role="list" className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative break-words pl-10">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-[0.18em] inline-flex h-7 w-7 items-center justify-center rounded-full font-sans text-sm font-bold",
              numClass,
            )}
          >
            {i + 1}
          </span>
          <InlineText text={item} />
        </li>
      ))}
    </ol>
  );
}

function BlockView({
  block,
  heading,
  toneLabels,
  tableLabel,
}: {
  block: Block;
  heading?: TocItem;
  toneLabels: Record<CalloutTone, string>;
  tableLabel: string;
}) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={heading?.id}
          className="mt-14 flex scroll-mt-24 items-start gap-3 font-serif text-2xl font-bold leading-snug text-earth-900 first:mt-0 sm:text-[28px]"
        >
          {block.number !== undefined && (
            <span
              aria-hidden="true"
              className="mt-px inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-700 font-sans text-base font-bold text-cream sm:mt-0.5"
            >
              {block.number}
            </span>
          )}
          <span className="min-w-0 break-words">
            <InlineText text={block.text} />
          </span>
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-9 break-words font-serif text-xl font-semibold leading-snug text-forest-900 first:mt-0 sm:text-2xl">
          <InlineText text={block.text} />
        </h3>
      );

    case "p":
      return (
        <p className="mt-5 break-words first:mt-0">
          <InlineText text={block.text} />
        </p>
      );

    case "ul":
    case "ol":
      return (
        <div className="mt-5 first:mt-0">
          {block.label && (
            <p className="mb-3 flex items-center gap-2 text-[15px] font-semibold leading-snug text-forest-700">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400"
              />
              <span className="min-w-0 break-words">
                <InlineText text={block.label} />
              </span>
            </p>
          )}
          {block.type === "ul" ? (
            <BulletList items={block.items} dotClass="bg-forest-600" />
          ) : (
            <NumberedList
              items={block.items}
              numClass="bg-forest-700/10 text-forest-700"
            />
          )}
        </div>
      );

    case "table": {
      const regionLabel = block.caption
        ? stripInline(block.caption)
        : tableLabel;
      return (
        <figure className="mt-8 first:mt-0">
          {block.caption && (
            <figcaption className="mb-3 text-sm font-semibold leading-snug text-earth-700">
              <InlineText text={block.caption} />
            </figcaption>
          )}
          <div
            role="region"
            aria-label={regionLabel}
            tabIndex={0}
            className="overflow-x-auto rounded-xl border border-earth-400/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest-400"
          >
            <table className="w-full border-collapse text-left text-[15px] leading-snug sm:text-base">
              <thead>
                <tr className="bg-forest-700 text-cream">
                  {block.head.map((cell, j) => (
                    <th
                      key={j}
                      scope="col"
                      className="min-w-[7.5rem] px-4 py-3 align-bottom font-semibold first:pl-5"
                    >
                      <InlineText text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-earth-900/90">
                {block.rows.map((row, r) => (
                  <tr key={r} className="odd:bg-cream even:bg-cream-100">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={cn(
                          "border-t border-earth-400/20 px-4 py-3 align-top first:pl-5",
                          c === 0 && "font-medium text-earth-900",
                        )}
                      >
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    }

    case "signature":
      return (
        <div className="mt-12 flex justify-end first:mt-0">
          <div className="max-w-full border-t border-gold-400/70 pl-12 pt-4 text-right font-serif text-base leading-snug text-earth-900 sm:text-lg">
            {block.lines.map((line, i) => (
              <p key={i} className={cn("break-words", i > 0 && "mt-1")}>
                <InlineText text={line} />
              </p>
            ))}
          </div>
        </div>
      );

    case "callout": {
      const tone = TONES[block.tone];
      const hasTitle = Boolean(block.title);
      return (
        <div
          role="note"
          aria-label={toneLabels[block.tone]}
          className={cn(
            "mt-8 flex gap-3.5 rounded-2xl border p-4 first:mt-0 sm:gap-4 sm:p-6",
            tone.box,
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
              tone.icon,
            )}
          >
            <tone.Icon className="h-5 w-5" strokeWidth={2} />
          </span>
          <div
            className={cn(
              "min-w-0 flex-1 text-base leading-relaxed sm:text-[17px]",
              tone.body,
            )}
          >
            {block.title && (
              <p
                className={cn(
                  "break-words font-serif text-lg font-bold leading-snug sm:text-xl",
                  tone.title,
                )}
              >
                <InlineText text={block.title} />
              </p>
            )}
            {block.text && (
              <p className={cn("break-words", hasTitle && "mt-1.5")}>
                <InlineText text={block.text} />
              </p>
            )}
            {block.items &&
              (block.ordered ? (
                <NumberedList
                  items={block.items}
                  numClass={tone.num}
                  className={cn(
                    "space-y-2",
                    (hasTitle || block.text) && "mt-3",
                  )}
                />
              ) : (
                <BulletList
                  items={block.items}
                  dotClass={tone.dot}
                  className={cn(
                    "space-y-2",
                    (hasTitle || block.text) && "mt-3",
                  )}
                />
              ))}
          </div>
        </div>
      );
    }
  }
}

/**
 * Maqola bloklarini chizadi (server komponent). `toc` — h2 bloklarining id'lari
 * (buildToc natijasi): sarlavhaga id va `scroll-mt` beriladi.
 */
export function ArticleBlocks({
  blocks,
  toc,
  toneLabels,
  tableLabel,
}: {
  blocks: ReadonlyArray<Block>;
  toc: ReadonlyArray<TocItem>;
  toneLabels: Record<CalloutTone, string>;
  tableLabel: string;
}) {
  const headingByIndex = new Map(toc.map((item) => [item.blockIndex, item]));

  return (
    <div className="text-[17px] leading-[1.8] text-earth-900/90 sm:text-lg sm:leading-[1.85]">
      {blocks.map((block, i) => (
        <BlockView
          key={i}
          block={block}
          heading={headingByIndex.get(i)}
          toneLabels={toneLabels}
          tableLabel={tableLabel}
        />
      ))}
    </div>
  );
}
