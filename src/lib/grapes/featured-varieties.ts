/**
 * Sotuvdagi uzum navlari — Parkent Plants kassasida buyurtmaga tayyor.
 *
 * Yangi nav qo'shish uchun:
 *   1) Pastdagi massivga slug + image qo'shing
 *   2) i18n: uz.json + ru.json — catalog.uzumVarieties.<slug>.{name,description}
 *   3) Rasm: /public/images/uzum-<slug>.jpg (max 1200×1500 px)
 */

export type GrapeVariety = {
  /** URL slug uchun va i18n kalit */
  slug: string;
  /** Poster rasm yo'li */
  image: string;
  /** Brand kategoriyasi */
  category: "seedless" | "table";
  /** Pishish kuni (ko'rsatuv uchun) */
  ripeningISO: string;
  /** Pishish matni (lokalga qarab UZ/RU) — i18n'da */
  /** Hosildorlik diapazoni — tonna/gektar */
  yieldTonsPerHa: { min: number; max: number };
  /** Narx UZS */
  priceUzs: number;
  /** Hozir ekish mumkinmi? */
  availableNow: boolean;
  /** Ko'rinishda alohida ajralib ko'rinsinmi (yondi belgi) */
  highlight?: "best-seller" | "new" | "limited";
  /** Tartib raqami */
  order: number;
};

export const GRAPE_VARIETIES: GrapeVariety[] = [
  {
    slug: "avatar",
    image: "/images/uzum-avatar.jpg",
    category: "seedless",
    ripeningISO: "07-15",
    yieldTonsPerHa: { min: 20, max: 25 },
    priceUzs: 25000,
    availableNow: true,
    highlight: "new",
    order: 1,
  },
  {
    slug: "crimson",
    image: "/images/uzum-crimson.jpg",
    category: "seedless",
    ripeningISO: "08-25",
    yieldTonsPerHa: { min: 20, max: 25 },
    priceUzs: 30000,
    availableNow: true,
    highlight: "best-seller",
    order: 2,
  },
  {
    slug: "autumn-royal",
    image: "/images/uzum-autumn-royal.jpg",
    category: "seedless",
    ripeningISO: "08-25",
    yieldTonsPerHa: { min: 20, max: 25 },
    priceUzs: 30000,
    availableNow: true,
    order: 3,
  },
];

export function formatUzs(amount: number): string {
  return new Intl.NumberFormat("uz-UZ").format(amount);
}
