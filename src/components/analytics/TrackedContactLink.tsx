"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent } from "@/lib/analytics/events";

/**
 * Oddiy <a> + kontakt klikini hisoblash (Header/Footer/WhatsappFab bilan bir xil
 * `contact_*` event'lari). Server komponent sahifalarda (kontakt, katalog,
 * 404, maqola) onClick'ni client tomonda ulash uchun. Markup o'zgarmaydi:
 * className/children/target/rel to'g'ridan-to'g'ri <a> ga o'tadi.
 */
export function TrackedContactLink({
  event,
  source,
  params,
  onClick,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  event:
    | "contact_phone"
    | "contact_telegram"
    | "contact_whatsapp"
    | "contact_email";
  /** Qaysi joydan bosilgani (masalan "kontakt_page") — GA4'da `placement` bo'ladi */
  source: string;
  /** Qo'shimcha parametrlar (masalan { category: "olma" }) */
  params?: Record<string, unknown>;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event, { source, ...params });
        onClick?.(e);
      }}
    />
  );
}
