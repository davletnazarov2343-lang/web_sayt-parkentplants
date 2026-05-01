/**
 * Sanity environment variables.
 *
 * Set these in `.env.local`:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_READ_TOKEN=...     (only needed for previewing draft content)
 *
 * Soft fallback: agar env yo'q bo'lsa, bo'sh string qaytariladi va sayt
 * yiqilmaydi — `safeFetch` yordamida fallback ma'lumot ishlatiladi.
 * Real fetch uchun `isSanityConfigured()` ni `fetch.ts` ichida ishlatamiz.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

// Build/runtime'da yiqilmaslik uchun — env yo'q bo'lsa bo'sh string.
// Studio sahifasi (`/studio`) o'zining xato xabarini ko'rsatadi.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const useCdn = false;
export const studioUrl = "/studio";

export function isConfigured(): boolean {
  return Boolean(projectId && dataset);
}
