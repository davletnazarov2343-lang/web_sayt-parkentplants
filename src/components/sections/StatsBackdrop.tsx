"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SLIDE_IMAGES = [
  "/images/kochatzor-qatorlar.jpg",
  "/images/kochatzor-tomchilatib.jpg",
  "/images/kochatzor-maydon.jpg",
] as const;

const SLIDE_DURATION_MS = 6000;

/**
 * "Raqamlarda biz" bo'limining fon slayd-shousi.
 * Faqat bo'lim ekranda ko'rinib turganda va tab faol bo'lganda ishlaydi.
 * prefers-reduced-motion yoqilgan bo'lsa — almashish butunlay o'chadi.
 */
export function StatsBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Foydalanuvchi animatsiyani kamaytirishni xohlaydimi
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Bo'lim ekranda ko'rinishini kuzatish — faqat shundagina taymer ishlaydi
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasEnteredView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Avtomatik almashtirish: ko'rinib turganda + tab faol bo'lganda + reduced-motion bo'lmasa
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        setActiveIndex((i) => (i + 1) % SLIDE_IMAGES.length);
      }, SLIDE_DURATION_MS);
    };
    const stop = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    if (document.visibilityState === "visible") start();

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isVisible, reducedMotion]);

  // 2- va 3-rasmlar faqat bo'lim ko'rinishga kirgandan keyin mount qilinadi.
  // Barchasi bir vaqtda DOM'da turgani uchun crossfade paytida oq ekran chiqmaydi.
  const imagesToRender =
    hasEnteredView && !reducedMotion ? SLIDE_IMAGES : [SLIDE_IMAGES[0]];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 -z-20 overflow-hidden bg-forest-900"
    >
      {imagesToRender.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
