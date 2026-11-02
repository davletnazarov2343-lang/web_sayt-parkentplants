"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Avto-o'tish oralig'i: har 4 soniyada bir karta */
const AUTOPLAY_MS = 4000;
/** Foydalanuvchi surgandan / tugma bosgandan keyin avto-o'tish shu muddat kutadi */
const RESUME_AFTER_INTERACTION_MS = 6000;
/** Scroll chegarasida pikselli xatolik uchun zaxira */
const EDGE_PX = 2;

const ARROW_CLASS =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-earth-400/40 text-earth-700 transition-colors hover:border-forest-700 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Bitta qatorli, gorizontal siljiydigan karusel (scroll-snap).
 *
 * `children` — serverda chizilgan `<li>` kartalar (masalan `LandingCard`): ular
 * bu yerga tayyor HTML bo'lib keladi, SSR markup saqlanadi. Karta kengligi shu
 * komponentdagi `[&>li]` qoidalari bilan beriladi: mobil ~1.15 (keyingisi chetdan
 * ko'rinib turadi), sm 2, lg 3, xl 4. Kartalar balandligi bir xil (flex stretch).
 *
 * Avto-o'tish (~4 s): bir karta chapga, oxirida silliq boshiga qaytadi. To'xtaydi:
 * sichqoncha ustida, klaviatura fokusi ichida, surish/tugma bosishdan keyin
 * bir necha soniya, tab yashirin yoki bo'lim ekranda ko'rinmasa. `prefers-reduced-motion`
 * da avto-o'tish ham, silliq animatsiya ham yo'q. Hamma kartalar sig'sa — strelkalar
 * yashirin va avto-o'tish ishlamaydi.
 */
export function LandingCarousel({
  children,
  label,
  prevLabel,
  nextLabel,
  className,
}: {
  children: ReactNode;
  /** Karusel nomi (ekran o'quvchilar uchun) */
  label: string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  // Avto-o'tish holati: render'ga ta'sir qilmaydi, shuning uchun ref'larda
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const visibleRef = useRef(false);
  const canScrollRef = useRef(false);
  const resumeAtRef = useRef(0);

  const pauseAfterInteraction = useCallback(() => {
    resumeAtRef.current = Date.now() + RESUME_AFTER_INTERACTION_MS;
  }, []);

  /** Har bir kartaning scroll pozitsiyasi (oxirgi kartalar scroll chegarasiga qisqartiriladi) */
  const getSnapPositions = useCallback((track: HTMLUListElement): number[] => {
    const maxLeft = track.scrollWidth - track.clientWidth;
    const trackLeft = track.getBoundingClientRect().left;
    const positions = Array.from(track.children).map((child) => {
      const left =
        child.getBoundingClientRect().left - trackLeft + track.scrollLeft;
      return Math.min(Math.max(left, 0), maxLeft);
    });
    return positions;
  }, []);

  const scrollToLeft = useCallback((track: HTMLUListElement, left: number) => {
    track.scrollTo({
      left,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  /** Keyingi karta; oxirida boshiga qaytadi */
  const goNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const current = track.scrollLeft;
    const next = getSnapPositions(track).find((p) => p > current + EDGE_PX);
    scrollToLeft(track, next ?? 0);
  }, [getSnapPositions, scrollToLeft]);

  /** Oldingi karta; boshida oxiriga o'tadi */
  const goPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const current = track.scrollLeft;
    const prev = getSnapPositions(track)
      .filter((p) => p < current - EDGE_PX)
      .pop();
    scrollToLeft(track, prev ?? track.scrollWidth - track.clientWidth);
  }, [getSnapPositions, scrollToLeft]);

  // Hamma kartalar sig'adimi? (strelkalar va avto-o'tish faqat sig'masa kerak)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const scrollable = track.scrollWidth > track.clientWidth + EDGE_PX;
      canScrollRef.current = scrollable;
      setCanScroll(scrollable);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Bo'lim ekranda ko'rinadimi?
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[entries.length - 1].isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Avto-o'tish
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (
        !canScrollRef.current ||
        !visibleRef.current ||
        hoveredRef.current ||
        focusedRef.current ||
        document.hidden ||
        Date.now() < resumeAtRef.current ||
        prefersReducedMotion()
      ) {
        return;
      }
      goNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative min-w-0", className)}
      // Faqat sichqoncha: sensorli ekranda pointerenter barmoq tekkanda ham keladi
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hoveredRef.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") hoveredRef.current = false;
      }}
      // Faqat klaviatura fokusi (:focus-visible) — tugmani sichqoncha bilan bosish to'xtatib qo'ymasin
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) focusedRef.current = true;
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          focusedRef.current = false;
        }
      }}
      onPointerDown={pauseAfterInteraction}
      onTouchStart={pauseAfterInteraction}
      onWheel={pauseAfterInteraction}
      onKeyDown={pauseAfterInteraction}
    >
      {/* Tepa/past padding — kartaning ko'tarilishi (hover) va soyasi overflow bilan kesilmasin;
          manfiy margin joyni qaytaradi */}
      <ul
        ref={trackRef}
        role="list"
        className={cn(
          "-mb-6 -mt-2 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-6 pt-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          // Karta kengligi = (100% - bo'shliqlar) / ko'rinadigan kartalar; gap-6 = 1.5rem.
          // Mobil: 1 karta + keyingisining 15% i (siljish borligi ko'rinib turadi)
          "[&>li]:w-[calc((100%-1.5rem)/1.15)] [&>li]:shrink-0 [&>li]:snap-start",
          "sm:[&>li]:w-[calc((100%-1.5rem)/2)]",
          "lg:[&>li]:w-[calc((100%-3rem)/3)]",
          "xl:[&>li]:w-[calc((100%-4.5rem)/4)]",
        )}
      >
        {children}
      </ul>

      <div
        className={cn("mt-4 justify-end gap-2", canScroll ? "flex" : "hidden")}
      >
        <button
          type="button"
          aria-label={prevLabel}
          onClick={() => {
            pauseAfterInteraction();
            goPrev();
          }}
          className={ARROW_CLASS}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => {
            pauseAfterInteraction();
            goNext();
          }}
          className={ARROW_CLASS}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
