"use client";

import { useEffect, useRef } from "react";

/**
 * O'qish progress chizig'i: ekran tepasida ingichka oltin chiziq.
 * `targetId` — maqola matni elementi; progress shu elementning ko'rinish
 * holatidan hisoblanadi. Scroll'da React qayta chizilmaydi — faqat
 * transform yangilanadi.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const target = document.getElementById(targetId);
    if (!bar || !target) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const vh = window.innerHeight;
      // Matn ekranning 70% chizig'iga kirganda boshlanadi, oxiri 40% chizig'idan
      // o'tganda 100%.
      const total = rect.height + vh * 0.3;
      const progress = total > 0 ? (vh * 0.7 - rect.top) / total : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      bar.style.transform = `scaleX(${clamped})`;
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
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gold-400"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
