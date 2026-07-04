"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Namoyish qilinadigan qiymat, mas. "23+", "500 000+", "87". */
  value: string;
  /** Animatsiya davomiyligi (ms). */
  duration?: number;
  className?: string;
};

/** prefiks (raqamgacha) · raqam (bo'sh joy/vergul bilan) · suffiks (raqamdan keyin). */
const NUM_RE = /^(\D*?)([\d\s .,]*\d)(\D*)$/;

/** Deterministik guruhlash (server = klient, ICU'ga bog'liq emas) — har 3 xonaga NBSP. */
function group(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Ko'rinishga kirganda 0 dan haqiqiy raqamgacha sanaydigan komponent.
 * MUHIM: SSR va boshlang'ich render HAQIQIY raqamni beradi (SEO + JS-siz holat);
 * JS yuklangach 0 dan boshlab sanaydi. Raqam bo'lmasa qiymatni shundayligicha ko'rsatadi.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const match = value.match(NUM_RE);
  const prefix = match?.[1] ?? "";
  const rawNum = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(rawNum.replace(/[\s .,]/g, ""));
  const animatable = rawNum !== "" && Number.isFinite(target);

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(animatable ? group(target) : value);
  const done = useRef(false);

  useEffect(() => {
    if (!animatable) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(group(target));
      return;
    }

    setDisplay(group(0));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(group(Math.round(target * eased)));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [animatable, target, duration]);

  if (!animatable) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
