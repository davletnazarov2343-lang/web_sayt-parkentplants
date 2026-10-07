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

export type LandingSlug = "black-splendor" | "devil-gala" | "granny-smith";

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
  /** Lid manbasi — LeadForm `source` (masalan "granny-smith-lending") */
  leadSource: string;
  /** ViewTracker event nomi (events.ts'dagi EVENT_MAP kaliti) */
  viewEvent: TrackEventKey;
  /**
   * Xususiyatlar jadvali qiymatidagi matn bo'lagini boshqa lending'ga havola
   * qiladi (qiymatda `text` birinchi uchragan joyi). Ixtiyoriy.
   */
  specLinks?: ReadonlyArray<{ text: string; slug: LandingSlug }>;
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
};

export type FeaturedLanding = {
  slug: LandingSlug;
  /** Locale prefiksisiz yo'l */
  href: string;
  image: string;
  accent: "red" | "green" | "purple";
};

export const FEATURED_LANDINGS: ReadonlyArray<FeaturedLanding> = [
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
