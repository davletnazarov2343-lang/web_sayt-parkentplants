/**
 * Ko'chat kategoriyalari — SEO hub strukturasi.
 *
 * Maqsad: Google'da "ko'chat", "olma ko'chati", "gilos ko'chati" kabi
 * yuqori-niyatli (high-intent) qidiruvlarda 1-o'rinda chiqish.
 *
 * Har bir kategoriya alohida sahifa: /[locale]/kochatlar/[slug]
 * i18n keys: catalog.categories.[slug].{title,h1,intro,buyingGuide,...}
 *
 * Yangi kategoriya qo'shish:
 *   1) Pastdagi massivga slug + emoji + keywords qo'shing
 *   2) uz.json + ru.json'da catalog.categories.<slug> kalitlarini qo'shing
 *   3) (ixtiyoriy) Cover rasm: /public/images/category-<slug>.jpg
 */

export type FruitCategory = {
  /** URL slug — /kochatlar/<slug> */
  slug: string;
  /** Emoji icon */
  icon: string;
  /** Cover image path (optional) */
  cover?: string;
  /** Asosiy kalit so'zlar (UZ + RU) — SEO meta keywords uchun */
  keywords: string[];
  /** Tartib raqami */
  order: number;
  /** Bog'liq yangiliklar slug'lari */
  relatedNews?: string[];
};

export const FRUIT_CATEGORIES: FruitCategory[] = [
  {
    slug: "olma-kochati",
    icon: "🍎",
    cover: "/images/olma-kochati.jpg",
    keywords: [
      "olma ko'chati",
      "olma ko'chati narxi",
      "olma ko'chati sotib olish",
      "Gala olma ko'chati",
      "Pink Lady ko'chati",
      "саженцы яблони",
      "саженцы яблони купить",
      "саженцы яблони цена",
    ],
    order: 1,
  },
  {
    slug: "gilos-kochati",
    icon: "🍒",
    cover: "/images/gilos-kochati.jpg",
    keywords: [
      "gilos ko'chati",
      "gilos ko'chati narxi",
      "Royal Tioga ko'chati",
      "Sweet Aryana ko'chati",
      "Black Pearl ko'chati",
      "danaksiz gilos",
      "саженцы черешни",
      "саженцы черешни купить",
    ],
    order: 2,
    relatedNews: ["gilos-bozori-global-talab-2027"],
  },
  {
    slug: "olcha-kochati",
    icon: "🍒",
    cover: "/images/olcha-kochati.jpg",
    keywords: [
      "olcha ko'chati",
      "olcha ko'chati narxi",
      "achchiq olcha ko'chati",
      "саженцы вишни",
      "саженцы вишни купить",
    ],
    order: 3,
  },
  {
    slug: "shaftoli-kochati",
    icon: "🍑",
    cover: "/images/shaftoli-kochati.jpg",
    keywords: [
      "shaftoli ko'chati",
      "nektarin ko'chati",
      "shaftoli ko'chati narxi",
      "саженцы персика",
      "саженцы нектарина",
    ],
    order: 4,
  },
  {
    slug: "orik-kochati",
    icon: "🍑",
    cover: "/images/orik-kochati.jpg",
    keywords: [
      "o'rik ko'chati",
      "abrikos ko'chati",
      "o'rik ko'chati narxi",
      "саженцы абрикоса",
      "саженцы абрикоса купить",
    ],
    order: 5,
  },
  {
    slug: "olxori-kochati",
    icon: "🟣",
    cover: "/images/olxori-kochati.jpg",
    keywords: [
      "olxo'ri ko'chati",
      "slivka ko'chati",
      "olxo'ri ko'chati narxi",
      "саженцы сливы",
    ],
    order: 6,
  },
  {
    slug: "nok-kochati",
    icon: "🍐",
    cover: "/images/nok-kochati.jpg",
    keywords: [
      "nok ko'chati",
      "armut ko'chati",
      "nok ko'chati narxi",
      "саженцы груши",
    ],
    order: 7,
  },
  {
    slug: "uzum-kochati",
    icon: "🍇",
    cover: "/images/uzum-kochati.jpg",
    keywords: [
      "uzum ko'chati",
      "danaksiz uzum ko'chati",
      "urug'siz uzum ko'chati",
      "uzum ko'chati narxi",
      "саженцы винограда",
      "саженцы винограда без косточек",
    ],
    order: 8,
  },
  {
    slug: "bodom-kochati",
    icon: "🌰",
    cover: "/images/bodom-kochati.jpg",
    keywords: [
      "bodom ko'chati",
      "mindal ko'chati",
      "bodom ko'chati narxi",
      "саженцы миндаля",
    ],
    order: 9,
  },
];

export function getCategoryBySlug(slug: string): FruitCategory | undefined {
  return FRUIT_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategories(): FruitCategory[] {
  return [...FRUIT_CATEGORIES].sort((a, b) => a.order - b.order);
}
