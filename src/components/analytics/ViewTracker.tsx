"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type TrackEventKey } from "@/lib/analytics/events";

/**
 * Sahifaning bo'limga scroll qilingan paytda bir marta event yuboradi.
 * Foydalanish:
 *   <ViewTracker eventKey="view_nurseries" />
 * Komponent o'zi displayed bo'lgan element ko'rinishga kelganda fire qiladi.
 * 50% bo'lim ko'rinmaguncha kutadi (qat'iy interes signali).
 */
export function ViewTracker({
  eventKey,
  threshold = 0.5,
}: {
  eventKey: TrackEventKey;
  threshold?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.closest("section") ?? el.parentElement;
    if (!section) return;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired) {
            fired = true;
            trackEvent(eventKey);
            observer.disconnect();
          }
        }
      },
      { threshold },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [eventKey, threshold]);

  return <span ref={ref} aria-hidden="true" className="sr-only" />;
}
