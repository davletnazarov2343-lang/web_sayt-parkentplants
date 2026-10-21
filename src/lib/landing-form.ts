/**
 * Lending sahifalar uchun lid formasi bilan aloqa:
 * - karta/panel tugmasi formani tegishli variantga o'rnatadi (CustomEvent),
 * - formaga silliq siljiydi.
 *
 * LeadForm (src/components/sections/LeadForm.tsx) shu hodisani tinglaydi.
 * Faqat brauzerda ishlaydi (server'da hech narsa qilmaydi).
 */

/** LeadForm <section> id'si — `#request` havolalari ham shunga olib boradi */
export const LEAD_FORM_ID = "request";

/** window'da yuboriladigan hodisa nomi; detail: { value: string } */
export const LEAD_OPTION_EVENT = "parkent:lead-option";

/** Forma `sourceOptions` ichidan `value` bo'yicha variantni tanlatadi */
export function selectLeadOption(value: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(LEAD_OPTION_EVENT, { detail: { value } }),
  );
}

/** Lid formasiga siljiydi (harakatni kamaytirish sozlamasi hurmat qilinadi) */
export function scrollToLeadForm(): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(LEAD_FORM_ID);
  if (!el) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}
