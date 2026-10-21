"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Tailwind `md` (768px) dan kichik ekran — yengil (mobil) fayl
const MOBILE_QUERY = "(max-width: 767px)";

type NetworkInformation = { saveData?: boolean };

/**
 * Lending hero video (ovozsiz, loop). Poster — asosiy qatlam (tez LCP), video
 * uning ustida, `playing` bo'lganda silliq paydo bo'ladi.
 *
 * - Video faqat ko'rinish maydonida o'ynaydi, chiqib ketsa pauza bo'ladi.
 * - `prefers-reduced-motion` yoki "Data Saver" yoqilgan bo'lsa avtomatik
 *   o'ynamaydi: poster + katta "play" tugmasi ko'rinadi.
 * - Kichik pauza/play tugmasi (5 soniyadan uzoq harakatni to'xtatish imkoni).
 * - Fayl `preload="none"` — o'ynash boshlanmaguncha yuklanmaydi.
 */
export function LandingVideo({
  src,
  srcMobile,
  poster,
  width,
  height,
  posterAlt,
  ariaLabel,
}: {
  src: string;
  srcMobile?: string;
  poster: string;
  width: number;
  height: number;
  /** Poster rasm alt matni */
  posterAlt: string;
  /** Pauza/play tugmasi uchun aria-label */
  ariaLabel: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(false);
  const userPausedRef = useRef(false);
  const autoplayRef = useRef(false);

  // Tanlangan fayl (mount'dan keyin) — server HTML'da video manbasi yo'q
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  // Birinchi kadr o'ynalgach true — video posterni yopadi
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Avtomatik o'ynash taqiqlangan/bloklangan — katta "play" tugmasi
  const [needsTap, setNeedsTap] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.getAttribute("src")) return;
    video.play().catch((err: unknown) => {
      // Brauzer avto-o'ynashni bloklasa (masalan iOS tejash rejimi) — tugma.
      // AbortError (tez skroll paytida pauza) esa oddiy holat.
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setNeedsTap(true);
      }
    });
  }, []);

  // Ko'rinish/sozlamaga qarab o'ynatish yoki pauza
  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay =
      inViewRef.current &&
      autoplayRef.current &&
      !userPausedRef.current &&
      !document.hidden;
    if (shouldPlay) {
      if (video.paused) play();
    } else if (!video.paused) {
      video.pause();
    }
  }, [play]);

  // 1. Qaysi fayl va avto-o'ynash mumkinmi — faqat brauzerda aniqlanadi
  useEffect(() => {
    const isMobile = window.matchMedia(MOBILE_QUERY).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const autoplayAllowed = !reduceMotion && !connection?.saveData;

    autoplayRef.current = autoplayAllowed;
    setNeedsTap(!autoplayAllowed);
    setVideoSrc(isMobile && srcMobile ? srcMobile : src);
  }, [src, srcMobile]);

  // 2. Manba o'rnatilgach (yoki o'zgargach) holatni qayta tekshiramiz
  useEffect(() => {
    if (videoSrc) syncPlayback();
  }, [videoSrc, syncPlayback]);

  // 3. Ko'rinish maydoni: kamida 25% ko'ringanda o'ynaydi
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.intersectionRatio >= 0.25;
        syncPlayback();
      },
      { threshold: [0, 0.25, 0.5] },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [syncPlayback]);

  // 4. Tab yashirilsa — pauza, qaytsa — davom
  useEffect(() => {
    document.addEventListener("visibilitychange", syncPlayback);
    return () =>
      document.removeEventListener("visibilitychange", syncPlayback);
  }, [syncPlayback]);

  function handleToggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      setNeedsTap(false);
      play();
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }

  const showBigButton = needsTap && !started;

  return (
    <div
      ref={frameRef}
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)] lg:max-w-none"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Asosiy qatlam — poster (LCP) */}
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 576px, 100vw"
        className="object-cover"
      />

      {/* Video — poster ustida, `playing` bo'lganda paydo bo'ladi */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setStarted(true);
          setPlaying(true);
          setNeedsTap(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          started ? "opacity-100" : "opacity-0",
        )}
      />

      {videoSrc && !failed && (
        <button
          type="button"
          onClick={handleToggle}
          aria-label={ariaLabel}
          aria-pressed={playing}
          className={cn(
            "absolute z-10 flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
            showBigButton
              ? "left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 bg-cream/90 text-forest-700 shadow-lg hover:bg-cream"
              : "bottom-3 right-3 h-11 w-11 bg-earth-900/60 text-cream backdrop-blur-sm hover:bg-earth-900/80",
          )}
        >
          {playing ? (
            <Pause className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Play
              className={showBigButton ? "h-7 w-7" : "h-5 w-5"}
              aria-hidden="true"
            />
          )}
        </button>
      )}
    </div>
  );
}
