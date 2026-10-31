/**
 * Nav lending sahifalari (Granny Smith, Devil Gala, ...) — bitta umumiy ro'yxat.
 *
 * - VARIETY_LANDINGS: har bir lending uchun VarietyLanding komponenti sozlamasi.
 * - FEATURED_LANDINGS: "Tavsiya etilgan navlar" (bosh sahifa va /varieties).
 *   Tartib: yangisi birinchi. Matnlar `featuredVarieties` namespace'da slug bo'yicha.
 * - LANDING_HREFS: Header'da "Navlar" bandi lending sahifalarda ham aktiv bo'lishi uchun.
 *
 * Yangi lending qo'shish: shu yerga yozuv + src/app/[locale]/<slug>/page.tsx
 * + messages'ga namespace + sitemap + events.ts'ga view event.
 */

import type { TrackEventKey } from "@/lib/analytics/events";
import { LOCALES } from "@/lib/constants";
import type { FruitTypeKey } from "@/lib/leads/schema";

export type LandingSlug =
  | "black-splendor"
  | "devil-gala"
  | "granny-smith"
  | "pink-lady"
  | "sweet-aryana";

/** Hero video (ovozsiz, loop). Poster — video'ning birinchi kadriga mos rasm. */
export type LandingVideo = {
  /** Asosiy (desktop) fayl, masalan "/videos/sweet-aryana.mp4" */
  src: string;
  /** Mobil (< 768px) uchun yengilroq fayl. Berilmasa — `src` */
  srcMobile?: string;
  /** Poster rasm (LCP) — video yuklanguncha ko'rinadi */
  poster: string;
  /** Video o'lchami (kenglik/balandlik nisbati ramka uchun) */
  width: number;
  height: number;
  /** JSON-LD VideoObject: yuklangan sana (ISO, "2026-10-21") */
  uploadDate: string;
  /** JSON-LD VideoObject: davomiyligi (ISO 8601, masalan "PT17S") */
  duration: string;
};

/**
 * Lid formasining "manba" tanlovi (masalan "Hozir bor" / "2027 buyurtma").
 * `value` — i18n kaliti ham: yorliq `<namespace>.formOption.<value>` dan olinadi.
 * `source` — API'ga ketadigan lid manbasi (faqat `[a-zA-Z0-9_-]`, ko'pi bilan 64).
 */
export type LandingSourceOption = {
  value: string;
  source: string;
};

export type VarietyLandingConfig = {
  /** URL slug — locale prefiksisiz va "/" siz (masalan "granny-smith") */
  slug: LandingSlug;
  /** i18n namespace (masalan "grannySmithPage") */
  namespace: string;
  images: {
    hero: string;
    cluster: string;
    closeup: string;
  };
  /**
   * Ixtiyoriy qo'shimcha galereya rasmlari. Berilsa — galereya closeup + shu
   * rasmlarni grid'da ko'rsatadi (alt'lar `gallery.alt4`, `gallery.alt5`, ...
   * — tartib bo'yicha). Berilmasa — galereya faqat closeup (eski ko'rinish).
   */
  extraGallery?: ReadonlyArray<string>;
  /**
   * OpenGraph rasmi (hero) haqiqiy o'lchami (px). Berilmasa — 1080x1080
   * (kvadrat hero rasmlar uchun standart).
   */
  ogImage?: { width: number; height: number };
  /** Lid manbasi — LeadForm `source` (masalan "granny-smith-lending") */
  leadSource: string;
  /** ViewTracker event nomi (events.ts'dagi EVENT_MAP kaliti) */
  viewEvent: TrackEventKey;
  /**
   * Xususiyatlar jadvali qiymatidagi matn bo'lagini boshqa lending'ga havola
   * qiladi (qiymatda `text` birinchi uchragan joyi). Ixtiyoriy.
   */
  specLinks?: ReadonlyArray<{ text: string; slug: LandingSlug }>;
  /**
   * Ixtiyoriy: payvandtag afzalliklari bo'limi (ustunliklardan keyin).
   * `true` bo'lsa, namespace'da `rootstock: { title, items: [{ title, text }] }`
   * bo'lishi shart. Berilmasa — bo'lim chiqmaydi (eski ko'rinish).
   */
  rootstockSection?: boolean;
  /** "Kim uchun" bo'limi. Standart `true`; `false` — bo'lim chiqmaydi (tarjimada `audience` shart emas). */
  audience?: boolean;
  /**
   * Hero'da 3 ta qisqa fakt (chip) + mavjudlik belgisi. `true` bo'lsa, namespace'da
   * `heroFacts: string[]` va `availabilityBadge: string` bo'lishi shart.
   */
  heroFacts?: boolean;
  /**
   * Hero rasm o'rniga video. Namespace'da `video: { title, ariaLabel }` va
   * poster alt'i uchun `gallery.alt5` bo'lishi shart. Hero rasm esa galereyaga
   * ko'chadi (alt: `gallery.alt1`).
   */
  video?: LandingVideo;
  /**
   * "Hozir bor / oldindan buyurtma" ikki kartali bo'lim (ustunliklardan keyin).
   * `true` bo'lsa, namespace'da `offers: { title, now, preorder }` (har biri
   * `{ badge, title, text, cta }`) bo'lishi shart. Karta tugmasi formani
   * tegishli variantga o'rnatib, formaga siljitadi — `sourceOptions` bilan birga ishlating.
   */
  offers?: boolean;
  /**
   * Mobil (< md) pastki yopishqoq panel: Qo'ng'iroq / Telegram / Buyurtma.
   * Namespace'da `stickyBar: { call, telegram, order }` bo'lishi shart.
   */
  stickyBar?: boolean;
  /**
   * Ixtiyoriy: shu lending uchun alohida Telegram havolasi (hero tugmasi va
   * mobil pastki panel). Berilmasa — umumiy raqam (t.me/+998995573800).
   */
  telegramHref?: string;
  /**
   * Lid qoldirishga moslangan tartib: hero -> takliflar (narx bilan) -> qisqa forma
   * -> qolgan bo'limlar; "Eslatma" bo'limi chiqmaydi; hero'da formaga tugma.
   * Namespace'da `ctaForm`, `offers.now.price`, `offers.preorder.price` bo'lishi
   * shart; `offers: true` va `sourceOptions` bilan ishlating.
   */
  conversionLayout?: boolean;
  /**
   * Ixtiyoriy YouTube video (bosilgandagina yuklanadi). `start` — boshlanish
   * soniyasi. Namespace'da `youtube: { title, text, ariaLabel }` bo'lishi shart.
   */
  youtube?: { id: string; start?: number };
  /**
   * Lid formasi tepasida 2 variantli tanlov. Standart tanlov — birinchisi.
   * Berilsa, `leadSource` o'rniga tanlangan variantning `source`i yuboriladi.
   */
  sourceOptions?: ReadonlyArray<LandingSourceOption>;
  /** Lid formasida oldindan belgilangan meva turlari (masalan ["cherry"]) */
  defaultFruitTypes?: ReadonlyArray<FruitTypeKey>;
};

export const VARIETY_LANDINGS: Record<LandingSlug, VarietyLandingConfig> = {
  "granny-smith": {
    slug: "granny-smith",
    namespace: "grannySmithPage",
    images: {
      hero: "/images/granny-smith/hero.jpg",
      cluster: "/images/granny-smith/cluster.jpg",
      closeup: "/images/granny-smith/closeup.jpg",
    },
    leadSource: "granny-smith-lending",
    viewEvent: "view_granny_smith",
  },
  "devil-gala": {
    slug: "devil-gala",
    namespace: "devilGalaPage",
    images: {
      hero: "/images/devil-gala/hero.jpg",
      cluster: "/images/devil-gala/cluster.jpg",
      closeup: "/images/devil-gala/closeup.jpg",
    },
    leadSource: "devil-gala-lending",
    viewEvent: "view_devil_gala",
    // Changlatuvchilar qatoridagi "Granny Smith" — o'z lendingiga havola
    specLinks: [{ text: "Granny Smith", slug: "granny-smith" }],
  },
  "black-splendor": {
    slug: "black-splendor",
    namespace: "blackSplendorPage",
    images: {
      hero: "/images/black-splendor/hero.jpg",
      cluster: "/images/black-splendor/cluster.jpg",
      closeup: "/images/black-splendor/closeup.jpg",
    },
    extraGallery: [
      "/images/black-splendor/market-1.jpg",
      "/images/black-splendor/market-2.jpg",
    ],
    leadSource: "black-splendor-lending",
    viewEvent: "view_black_splendor",
  },
  "pink-lady": {
    slug: "pink-lady",
    namespace: "pinkLadyPage",
    images: {
      hero: "/images/pink-lady/hero.jpg",
      cluster: "/images/pink-lady/cluster.jpg",
      closeup: "/images/pink-lady/closeup.jpg",
    },
    extraGallery: [
      "/images/pink-lady/harvest-bin.jpg",
      "/images/pink-lady/harvest-pile.jpg",
    ],
    leadSource: "pink-lady-lending",
    viewEvent: "view_pink_lady",
    // Changlatuvchilar qatoridagi "Granny Smith" — o'z lendingiga havola
    specLinks: [{ text: "Granny Smith", slug: "granny-smith" }],
    rootstockSection: true,
  },
  "sweet-aryana": {
    slug: "sweet-aryana",
    namespace: "sweetAryanaPage",
    images: {
      hero: "/images/sweet-aryana/hero.jpg",
      cluster: "/images/sweet-aryana/cluster.jpg",
      closeup: "/images/sweet-aryana/closeup.jpg",
    },
    extraGallery: ["/images/sweet-aryana/harvest-hand.jpg"],
    ogImage: { width: 1200, height: 1080 },
    leadSource: "sweet-aryana-lending",
    telegramHref: "https://t.me/m/Fdqy8BuLYTdi",
    viewEvent: "view_sweet_aryana",
    audience: false,
    heroFacts: true,
    video: {
      src: "/videos/sweet-aryana.mp4",
      srcMobile: "/videos/sweet-aryana-480.mp4",
      poster: "/images/sweet-aryana/video-poster.jpg",
      width: 720,
      height: 632,
      uploadDate: "2026-10-21",
      duration: "PT17S",
    },
    offers: true,
    stickyBar: true,
    conversionLayout: true,
    youtube: { id: "AlzVDFIUDig", start: 644 },
    sourceOptions: [
      { value: "now", source: "sweet-aryana-lending-now" },
      { value: "preorder", source: "sweet-aryana-lending-2027" },
    ],
    defaultFruitTypes: ["cherry"],
  },
};

/**
 * Mobil pastki panel (`stickyBar`) bor sahifalar — har ikki locale uchun to'liq
 * yo'l ("/uz/sweet-aryana", ...). Global WhatsappFab shu sahifalarda mobilda
 * yashiriladi (tugmalar ustma-ust tushmasin).
 */
export const STICKY_BAR_PATHS: ReadonlyArray<string> = Object.values(
  VARIETY_LANDINGS,
)
  .filter((landing) => landing.stickyBar)
  .flatMap((landing) =>
    LOCALES.map((locale) => `/${locale}/${landing.slug}`),
  );

export type FeaturedLanding = {
  slug: LandingSlug;
  /** Locale prefiksisiz yo'l */
  href: string;
  image: string;
  accent: "red" | "green" | "purple" | "pink" | "rose";
};

export const FEATURED_LANDINGS: ReadonlyArray<FeaturedLanding> = [
  {
    slug: "sweet-aryana",
    href: "/sweet-aryana",
    image: VARIETY_LANDINGS["sweet-aryana"].images.cluster,
    accent: "rose",
  },
  {
    slug: "pink-lady",
    href: "/pink-lady",
    image: VARIETY_LANDINGS["pink-lady"].images.cluster,
    accent: "pink",
  },
  {
    slug: "black-splendor",
    href: "/black-splendor",
    image: VARIETY_LANDINGS["black-splendor"].images.cluster,
    accent: "purple",
  },
  {
    slug: "devil-gala",
    href: "/devil-gala",
    image: VARIETY_LANDINGS["devil-gala"].images.cluster,
    accent: "red",
  },
  {
    slug: "granny-smith",
    href: "/granny-smith",
    image: VARIETY_LANDINGS["granny-smith"].images.cluster,
    accent: "green",
  },
];

/** Barcha lending sahifalarning locale prefiksisiz yo'llari ("/devil-gala", ...) */
export const LANDING_HREFS: ReadonlyArray<string> = FEATURED_LANDINGS.map(
  (l) => l.href,
);

/**
 * Lending -> ko'chat kategoriyasi slug'i (/kochatlar/<slug>). Ichki havolalar
 * uchun: kategoriya sahifasi o'z lendinglarini, lending esa o'z kategoriyasini
 * ko'rsatadi. Yangi lending qo'shilsa — shu yerga ham yozuv qo'shing.
 */
export const LANDING_CATEGORY: Record<LandingSlug, string> = {
  "pink-lady": "olma-kochati",
  "devil-gala": "olma-kochati",
  "granny-smith": "olma-kochati",
  "sweet-aryana": "gilos-kochati",
  "black-splendor": "olxori-kochati",
};

/** Berilgan kategoriyaga tegishli lendinglar (FEATURED_LANDINGS tartibida) */
export function getLandingsByCategory(
  categorySlug: string,
): FeaturedLanding[] {
  return FEATURED_LANDINGS.filter(
    (l) => LANDING_CATEGORY[l.slug] === categorySlug,
  );
}
