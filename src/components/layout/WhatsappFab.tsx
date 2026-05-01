"use client";

/**
 * Floating WhatsApp Action Button — har sahifada o'ng pastda ko'rinadi.
 * Mijoz bir bosishda WhatsApp orqali yozish imkoniyatiga ega bo'ladi.
 */

import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/ui/SocialIcons";

export function WhatsappFab() {
  const t = useTranslations("contact");

  const phone = t("whatsapp.value").replace(/[^0-9]/g, "");
  const messagePrefill = t("whatsapp.prefill");

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(messagePrefill)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp orqali yozish"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.5)] transition-all hover:scale-105 hover:shadow-[0_12px_32px_-4px_rgba(37,211,102,0.6)] sm:h-16 sm:w-16"
    >
      <WhatsappIcon size={28} className="sm:h-8 sm:w-8" />
      {/* Pulse halosi */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping"
      />
    </a>
  );
}
