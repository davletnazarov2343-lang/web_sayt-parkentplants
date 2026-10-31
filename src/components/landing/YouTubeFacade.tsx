"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * Yengil YouTube pleyer: sahifa ochilganda faqat muqova rasmi (i.ytimg.com)
 * yuklanadi. YouTube iframe'i (~1 MB JS) faqat foydalanuvchi bosgandan keyin
 * yuklanadi — lending og'irlashmaydi. `start` — boshlanish soniyasi.
 */
export function YouTubeFacade({
  id,
  start,
  title,
  ariaLabel,
}: {
  id: string;
  start?: number;
  title: string;
  ariaLabel: string;
}) {
  const [active, setActive] = useState(false);
  const params = new URLSearchParams({ autoplay: "1", rel: "0" });
  if (start) params.set("start", String(start));

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-earth-400/25 bg-earth-900 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)]">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={ariaLabel}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}
