import Image from "next/image";
import { getTopicCover } from "@/lib/articles/topics";
import type { ArticleTopic } from "@/lib/articles/types";
import { cn } from "@/lib/utils";

/**
 * Maqola muqovasi (16:10).
 * - Mavzuning rasmi bo'lsa (olma/nok/gilos/o'rik — ko'chat kategoriyalaridan):
 *   next/image + pastdan yengil qoraytirish.
 * - Rasmi yo'q mavzu (masalan "tuproq"): brend ranglaridagi gradient va
 *   inline SVG (tuproq qatlamlari, nihol, quyosh) — tashqi rasm yuklanmaydi.
 * `group` sinfi bor ota element hover'da rasmni biroz kattalashtiradi.
 */
export function ArticleCover({
  topic,
  cover: coverOverride,
  topicLabel,
  sizes,
  priority = false,
  className,
}: {
  topic: ArticleTopic;
  /** Maqolaning o'z muqovasi — berilsa mavzu rasmidan ustun */
  cover?: string;
  topicLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const cover = coverOverride ?? getTopicCover(topic);

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-forest-900",
        className,
      )}
    >
      {cover ? (
        <>
          <Image
            src={cover}
            alt=""
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent" />
        </>
      ) : (
        <CoverArt />
      )}
      <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-cream/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-700 shadow-sm">
        {topicLabel}
      </span>
    </div>
  );
}

function CoverArt() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-700 to-forest-600">
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {/* Quyosh */}
        <circle cx="318" cy="64" r="48" fill="#C9A961" opacity="0.14" />
        <circle cx="318" cy="64" r="27" fill="#C9A961" opacity="0.85" />
        {/* Tuproq qatlamlari */}
        <path
          d="M0 178 C70 156 130 198 210 178 S340 158 400 182 V250 H0 Z"
          fill="#8B6F47"
        />
        <path
          d="M0 204 C80 188 140 222 220 204 S350 192 400 210 V250 H0 Z"
          fill="#6E5636"
        />
        <path
          d="M0 228 C90 216 150 240 230 228 S360 220 400 232 V250 H0 Z"
          fill="#4E3C25"
        />
        {/* Mayda toshlar */}
        <circle cx="64" cy="214" r="4" fill="#E8D4A0" opacity="0.35" />
        <circle cx="132" cy="236" r="3" fill="#E8D4A0" opacity="0.3" />
        <circle cx="296" cy="218" r="4.5" fill="#E8D4A0" opacity="0.3" />
        <circle cx="352" cy="240" r="3" fill="#E8D4A0" opacity="0.35" />
        {/* Nihol */}
        <path
          d="M200 180 V122"
          stroke="#D8F3DC"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M200 148 C172 150 154 132 152 108 C180 108 199 124 200 148 Z"
          fill="#95D5B2"
        />
        <path
          d="M200 134 C228 134 247 116 249 92 C221 92 201 109 200 134 Z"
          fill="#B7E4C7"
        />
      </svg>
    </div>
  );
}
