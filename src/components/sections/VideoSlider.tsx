"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { YoutubeIcon } from "@/components/ui/SocialIcons";
import { trackEvent } from "@/lib/analytics/events";

const CHANNEL_URL = "https://www.youtube.com/@shuhrat_abrorov";

type Video = {
  id: string;
  title: string;
  topic: string;
};

// Shuhrat aka's channel — Top videolar (qo'lda tanlangan).
// Yangi video qo'shish uchun pastdagi ro'yxatga ID + sarlavhasini qo'shing.
const VIDEOS: Video[] = [
  {
    id: "6N6WojKxnlc",
    title: "Norchontol ko'chatzoriga sayohat!",
    topic: "Ko'chatzor",
  },
  {
    id: "AlzVDFIUDig",
    title: "Nimaga bu sirli giloslarni ekishimizni istashmayapti?",
    topic: "Gilos",
  },
  {
    id: "g0Cnyzx4jE8",
    title: "Endi bu giloslarni yashirishdan foyda yo'q! Sababi?",
    topic: "Gilos",
  },
  {
    id: "Q17JMDhQxow",
    title: "Biz bilgan va bilmagan shaftoli-nektarinlar!",
    topic: "Shaftoli",
  },
  {
    id: "sYpa522n7pI",
    title: "Qaysi biri yaxshiroq? Urug'siz yoki oddiy uzum?",
    topic: "Uzum",
  },
  {
    id: "-9izSnjGlrI",
    title: "Urug'siz uzum ko'chatlariga aksiya boshlandi!",
    topic: "Aksiya",
  },
];

function thumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function VideoSlider() {
  const t = useTranslations("videos");
  const [activeId, setActiveId] = useState<string | null>(null);

  const openVideo = useCallback((id: string, title: string) => {
    setActiveId(id);
    trackEvent("video_play", { source: "video_slider", videoId: id, title });
  }, []);

  // ESC key closes modal
  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeId]);

  function scrollSlider(direction: "left" | "right") {
    const slider = document.getElementById("video-slider-track");
    if (!slider) return;
    const cardWidth = slider.firstElementChild?.clientWidth ?? 320;
    slider.scrollBy({
      left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  }

  return (
    <section id="videos" className="bg-cream-100 py-20 lg:py-28">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              <YoutubeIcon size={16} />
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-earth-700">
              {t("subtitle")}
            </p>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-forest-700/20 bg-cream px-5 py-2.5 text-sm font-semibold text-forest-700 transition-all hover:border-forest-700 hover:bg-forest-700 hover:text-cream"
          >
            <YoutubeIcon size={16} />
            {t("channelCta")}
          </a>
        </div>

        {/* Slider controls (desktop) */}
        <div className="relative mt-14">
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            aria-label={t("prev")}
            className="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-earth-400/30 bg-cream text-earth-900 shadow-md transition-all hover:border-forest-700 hover:bg-forest-700 hover:text-cream lg:flex"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollSlider("right")}
            aria-label={t("next")}
            className="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-earth-400/30 bg-cream text-earth-900 shadow-md transition-all hover:border-forest-700 hover:bg-forest-700 hover:text-cream lg:flex"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>

          {/* Track */}
          <div
            id="video-slider-track"
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-earth-400/30 sm:gap-6"
          >
            {VIDEOS.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => openVideo(video.id, video.title)}
                className="group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream text-left transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.4)] sm:w-[340px] lg:w-[360px]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-earth-400/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl(video.id)}
                    alt={video.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Topic badge */}
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-cream/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forest-700 backdrop-blur">
                    {video.topic}
                  </span>
                  {/* Play overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-forest-900/30 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-forest-700 shadow-lg">
                      <Play className="h-6 w-6 fill-current" strokeWidth={0} />
                    </span>
                  </div>
                  {/* Bottom gradient */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-900/40 to-transparent"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-base font-semibold leading-snug text-earth-900 line-clamp-3">
                    {video.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700">
                    <Play className="h-3 w-3 fill-current" strokeWidth={0} />
                    {t("watch")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Lightbox modal */}
      {activeId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("playerLabel")}
          onClick={() => setActiveId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setActiveId(null)}
            aria-label={t("close")}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition-colors hover:bg-cream/25"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-forest-900 shadow-2xl"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`}
              title={t("playerLabel")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
