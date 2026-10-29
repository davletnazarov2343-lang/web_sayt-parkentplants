/**
 * Sitemap `lastmod` sanalari — QO'LDA yuritiladi.
 *
 * KONTENT O'ZGARGANDA SANANI YANGILA (matn, sarlavha, rasm, ichki havolalar).
 * Build vaqtidagi `new Date()` ishlatilmaydi: har deployda hamma URL "yangilandi"
 * bo'lib ko'rinsa, Google lastmod'ga ishonmay qo'yadi. Git tarixiga ham
 * bog'lanmaymiz — Vercel'da tarix sayoz (shallow clone).
 *
 * Maqolalar (`publishedAt`) va yangiliklar (`publishedAt`) sanasi o'z
 * ma'lumotidan olinadi — bu yerda emas. /news va /maqolalar ro'yxat sahifalari
 * esa ichidagi eng yangi elementning sanasini oladi (sitemap.ts).
 *
 * Format: "YYYY-MM-DD". Kalit — locale prefiksisiz yo'l ("" = bosh sahifa).
 * Dastlabki qiymatlar: 2026-10-29 da qo'lda aniqlangan (tegishli fayllarning
 * oxirgi commit sanasi; Faza 0 da sarlavhasi o'zgargan sahifalar — 2026-10-29).
 */
export const PAGE_LASTMOD: Record<string, string> = {
  // Bosh sahifa: oxirgi ko'rinadigan o'zgarish — Sweet Aryana kartasi (FeaturedVarieties)
  "": "2026-10-29", // title/description Faza 1 matnlarida o'zgargan
  "/varieties": "2026-10-29", // sarlavha Faza 0 da o'zgargan
  "/kochatlar": "2026-10-29", // sarlavha Faza 0 da o'zgargan
  "/biz-haqimizda": "2026-10-29", // sarlavha Faza 0 da o'zgargan; OAV havolasi qo'shildi
  "/oav": "2026-10-29", // yangi sahifa
  "/kontakt": "2026-10-29", // sarlavha Faza 0 da o'zgargan
  "/maqolalar": "2026-10-29", // title/H1/description Faza 1 matnlarida o'zgargan
  "/maxfiylik": "2026-10-13",

  // Nav lendinglari: 2026-10-29 da "kategoriya + maqola" ichki havola bloki qo'shildi
  "/pink-lady": "2026-10-29",
  "/sweet-aryana": "2026-10-29",
  "/granny-smith": "2026-10-29",
  "/devil-gala": "2026-10-29",
  "/black-splendor": "2026-10-29",
};

/** Ko'chat kategoriyalari (/kochatlar/<slug>), kalit — slug */
export const CATEGORY_LASTMOD: Record<string, string> = {
  "olma-kochati": "2026-10-29", // sarlavha + ichki havolalar
  "gilos-kochati": "2026-10-29", // ichki havolalar (Sweet Aryana, maqola)
  "olcha-kochati": "2026-10-29", // sarlavha Faza 0 da o'zgargan
  "shaftoli-kochati": "2026-10-29", // sarlavha Faza 0 da o'zgargan
  "orik-kochati": "2026-10-29", // sarlavha + maqola havolasi
  "olxori-kochati": "2026-10-29", // sarlavha + ichki havolalar (Black Splendor)
  "nok-kochati": "2026-10-29", // sarlavha + maqola havolasi
  "uzum-kochati": "2026-10-29", // title/H1/description Faza 1 matnlarida o'zgargan
  "bodom-kochati": "2026-10-29", // sarlavha Faza 0 da o'zgargan
};

/** Ro'yxatda yo'q sahifa (masalan Sanity'dan kelgan nav/meva turi) uchun */
export const DEFAULT_LASTMOD = "2026-10-22";

/** "YYYY-MM-DD" -> Date (UTC yarim tun; build vaqtiga bog'liq emas) */
export function lastmodDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function pageLastmod(path: string): Date {
  return lastmodDate(PAGE_LASTMOD[path] ?? DEFAULT_LASTMOD);
}

export function categoryLastmod(slug: string): Date {
  return lastmodDate(CATEGORY_LASTMOD[slug] ?? DEFAULT_LASTMOD);
}
