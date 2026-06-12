"use client";

/**
 * Floating Action Buttons — har sahifada o'ng pastda ko'rinadi.
 * Telegram (tepada) + WhatsApp (pastda) — bir bosishda yozish imkoniyatiga ega.
 *
 * Komponent nomi ("WhatsappFab") legacy — endi 2 ta tugma chiqaradi.
 */

import { useTranslations } from "next-intl";
import { WhatsappIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import { trackEvent } from "@/lib/analytics/events";

const TELEGRAM_URL = "https://t.me/norchontolbot";

export function WhatsappFab() {
  const t = useTranslations("contact");

  const phone = t("whatsapp.value").replace(/[^0-9]/g, "");
  const messagePrefill = t("whatsapp.prefill");
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(messagePrefill)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Telegram — tepada */}
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram bot orqali yozish"
        onClick={() => trackEvent("contact_telegram", { source: "fab" })}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_8px_24px_-4px_rgba(34,158,217,0.5)] transition-all hover:scale-105 hover:shadow-[0_12px_32px_-4px_rgba(34,158,217,0.6)] sm:h-16 sm:w-16"
      >
        <TelegramIcon size={28} className="sm:h-8 sm:w-8" />
        {/* Pulse halosi */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-[#229ED9] opacity-40 motion-safe:animate-ping"
        />
      </a>

      {/* WhatsApp — pastda */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp orqali yozish"
        onClick={() => trackEvent("contact_whatsapp", { source: "fab" })}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.5)] transition-all hover:scale-105 hover:shadow-[0_12px_32px_-4px_rgba(37,211,102,0.6)] sm:h-16 sm:w-16"
      >
        <WhatsappIcon size={28} className="sm:h-8 sm:w-8" />
        {/* Pulse halosi */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping"
        />
      </a>
    </div>
  );
}
