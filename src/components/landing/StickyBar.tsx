"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Phone } from "lucide-react";
import { TelegramIcon } from "@/components/ui/SocialIcons";
import { trackEvent } from "@/lib/analytics/events";
import { LEAD_FORM_ID, scrollToLeadForm } from "@/lib/landing-form";
import { cn } from "@/lib/utils";

/** Hero CTA tugmalari konteynerining belgisi (VarietyLanding `stickyBar` bo'lganda qo'yadi) */
const HERO_CTA_SELECTOR = "[data-hero-cta]";

/**
 * Selektor bo'yicha topilgan element ko'rinish maydonida bo'lsa `true`.
 * Element topilmasa `false`; hali o'lchanmagan paytda `null`.
 */
function useElementInView(selector: string): boolean | null {
  const [inView, setInView] = useState<boolean | null>(null);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) {
      setInView(false);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      setInView(entries[entries.length - 1].isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [selector]);

  return inView;
}

/**
 * Mobil (< md) pastki yopishqoq panel: Qo'ng'iroq / Telegram / Buyurtma.
 *
 * - Hero CTA tugmalari ham, lid formasi ham ko'rinish maydonida BO'LMAGANDA
 *   ko'rinadi: birinchi ekranda (CTA pastda) ko'rinadi, CTA ko'ringanda yashirinadi,
 *   o'tib ketgach qaytadi, formada yana yashirinadi (kiritish maydonlari va
 *   "Yuborish" tugmasini yopmasin).
 * - O'lchov tugamaguncha yashirin (SSR/hydration paytida yaltirab ketmasin).
 * - Panel ochiq paytda <body>ga `has-sticky-bar` klassi qo'yiladi: globals.css
 *   mobilda pastdan joy qoldiradi — footer panel ostida qolmaydi.
 * - iOS xavfsiz zona: `env(safe-area-inset-bottom)`.
 */
export function StickyBar({
  landing,
  callHref,
  telegramHref,
  labels,
}: {
  /** Lending slug'i — analytics uchun */
  landing: string;
  callHref: string;
  telegramHref: string;
  labels: { call: string; telegram: string; order: string };
}) {
  const heroCtaInView = useElementInView(HERO_CTA_SELECTOR);
  const formInView = useElementInView(`#${LEAD_FORM_ID}`);

  // Footer panel ostida qolmasligi uchun pastdan joy (globals.css)
  useEffect(() => {
    document.body.classList.add("has-sticky-bar");
    return () => document.body.classList.remove("has-sticky-bar");
  }, []);

  const visible = heroCtaInView === false && formInView === false;

  const itemClass =
    "flex h-12 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

  return (
    <>
      <div
        aria-hidden={!visible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 md:hidden",
          "border-t border-earth-400/25 bg-cream/95 px-3 pt-2 backdrop-blur",
          "pb-[calc(0.5rem_+_env(safe-area-inset-bottom,0px))]",
          "shadow-[0_-8px_24px_-12px_rgba(27,67,50,0.25)]",
          // visibility ham o'tadi — yashirin panel Tab tartibidan chiqib ketadi
          "transition-[transform,visibility] duration-300 ease-out",
          visible ? "visible translate-y-0" : "invisible translate-y-full",
        )}
      >
        <div className="grid grid-cols-3 gap-2">
          <a
            href={callHref}
            onClick={() =>
              trackEvent("contact_phone", { source: "landing_sticky", landing })
            }
            className={cn(
              itemClass,
              "border border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-cream",
            )}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{labels.call}</span>
          </a>
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("contact_telegram", {
                source: "landing_sticky",
                landing,
              })
            }
            className={cn(
              itemClass,
              "border border-[#229ED9] text-[#17709b] hover:bg-[#229ED9] hover:text-white",
            )}
          >
            <TelegramIcon size={16} className="shrink-0" />
            <span>{labels.telegram}</span>
          </a>
          <a
            href={`#${LEAD_FORM_ID}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToLeadForm();
            }}
            className={cn(
              itemClass,
              "bg-forest-700 text-cream hover:bg-forest-900",
            )}
          >
            <ClipboardList className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{labels.order}</span>
          </a>
        </div>
      </div>
    </>
  );
}
