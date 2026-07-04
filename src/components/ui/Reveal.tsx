"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Stagger kechikishi (ms) — grid ichidagi kartalar ketma-ket chiqishi uchun. */
  delay?: number;
};

/**
 * Element ko'rinishga kirganda uni yumshoq "suzib chiqaruvchi" o'rovchi.
 * Alohida div render qiladi va berilgan className ni oladi — shuning uchun
 * mavjud elementning (grid/flex item) o'rniga qo'yish layoutni buzmaydi.
 */
export function Reveal({
  className,
  delay = 0,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={delay ? { animationDelay: `${delay}ms`, ...style } : style}
      {...props}
    >
      {children}
    </div>
  );
}
