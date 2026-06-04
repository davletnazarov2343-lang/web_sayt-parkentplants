/**
 * Marketing event tracking — Meta Pixel + GA4 + Yandex.Metrika.
 *
 * Foydalanish:
 *   import { trackEvent } from "@/lib/analytics/events";
 *   trackEvent("lead", { source: "hero_form" });
 *
 * Server-side render'da skip qiladi (window yo'q).
 */

type FbqStandardEvent =
  | "Lead"
  | "Contact"
  | "ViewContent"
  | "InitiateCheckout"
  | "CompleteRegistration"
  | "Subscribe"
  | "Search";

type GaEventName =
  | "generate_lead"
  | "contact"
  | "view_item"
  | "begin_checkout"
  | "sign_up";

type YmEventName = string;

// O'yin ichidagi event nomidan har bir tracker'ga mapping
const EVENT_MAP: Record<
  string,
  { fbq?: FbqStandardEvent; ga?: GaEventName; ym?: YmEventName }
> = {
  // Eng muhim — lead yaratildi
  lead: { fbq: "Lead", ga: "generate_lead", ym: "lead_submit" },
  // Kontakt (WhatsApp/Telegram/phone/email klik)
  contact_whatsapp: { fbq: "Contact", ga: "contact", ym: "contact_whatsapp" },
  contact_telegram: { fbq: "Contact", ga: "contact", ym: "contact_telegram" },
  contact_phone: { fbq: "Contact", ga: "contact", ym: "contact_phone" },
  contact_email: { fbq: "Contact", ga: "contact", ym: "contact_email" },
  // Form boshlash
  lead_form_start: {
    fbq: "InitiateCheckout",
    ga: "begin_checkout",
    ym: "form_start",
  },
  // Sahifa kontentini ko'rish (CTA, scroll-based)
  view_nurseries: { fbq: "ViewContent", ga: "view_item", ym: "view_nurseries" },
  view_b2b_process: {
    fbq: "ViewContent",
    ga: "view_item",
    ym: "view_b2b_process",
  },
  view_about: { fbq: "ViewContent", ga: "view_item", ym: "view_about" },
  // Hero CTA bosish
  hero_cta_nurseries: {
    fbq: "ViewContent",
    ga: "view_item",
    ym: "hero_cta_nurseries",
  },
  hero_cta_consultation: {
    fbq: "ViewContent",
    ga: "view_item",
    ym: "hero_cta_consultation",
  },
};

type FbqWindow = Window & {
  fbq?: (action: "track" | "trackCustom", event: string, params?: Record<string, unknown>) => void;
  gtag?: (action: "event", event: string, params?: Record<string, unknown>) => void;
  ym?: (counterId: number, action: string, target: string, params?: Record<string, unknown>) => void;
};

export function trackEvent(
  eventKey: keyof typeof EVENT_MAP,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const win = window as FbqWindow;
  const mapping = EVENT_MAP[eventKey];
  if (!mapping) return;

  try {
    // 1. Meta Pixel
    if (win.fbq && mapping.fbq) {
      win.fbq("track", mapping.fbq, params);
    }
    // 2. Google Analytics 4
    if (win.gtag && mapping.ga) {
      win.gtag("event", mapping.ga, params);
    }
    // 3. Yandex.Metrika
    const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
    if (win.ym && ymId && mapping.ym) {
      win.ym(Number(ymId), "reachGoal", mapping.ym, params);
    }
  } catch (err) {
    // Sukunatda yutib yuboramiz — tracker xatolari foydalanuvchini bo'lmasligi shart
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] trackEvent failed:", err);
    }
  }
}

export type TrackEventKey = keyof typeof EVENT_MAP;
