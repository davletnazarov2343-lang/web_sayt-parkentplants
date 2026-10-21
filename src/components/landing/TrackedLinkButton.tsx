"use client";

import type { ComponentPropsWithoutRef } from "react";
import { LinkButton } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/events";

/**
 * LinkButton + kontakt klikini hisoblash (Header/Footer/WhatsappFab bilan bir xil
 * `contact_phone` / `contact_telegram` event'lari). VarietyLanding — server
 * komponent, shuning uchun onClick shu yerda client tomonda ulanadi.
 */
export function TrackedLinkButton({
  event,
  source,
  landing,
  onClick,
  ...props
}: ComponentPropsWithoutRef<typeof LinkButton> & {
  event: "contact_phone" | "contact_telegram";
  /** Qaysi joydan bosilgani (masalan "landing_hero") */
  source: string;
  /** Lending slug'i (masalan "pink-lady") — sahifalarni ajratish uchun */
  landing: string;
}) {
  return (
    <LinkButton
      {...props}
      onClick={(e) => {
        trackEvent(event, { source, landing });
        onClick?.(e);
      }}
    />
  );
}
