/**
 * Statik katalog — birlashtiruvchi qatlam.
 *
 * Sanity hali ulanmagan (loyiha yaratilmagan, NEXT_PUBLIC_SANITY_PROJECT_ID
 * bo'sh). Shu bilan birga, kodda 4 ta meva turi bo'yicha allaqachon boy va
 * to'g'ri ma'lumot bor:
 *   - src/lib/apples/top-varieties.ts
 *   - src/lib/peaches/top-varieties.ts
 *   - src/lib/cherries/top-varieties.ts
 *   - src/lib/grapes/featured-varieties.ts (+ i18n dagi nom/tavsif)
 *
 * Bu fayl o'sha 4 manbani BITTA umumiy `CatalogVariety` shakliga keltiradi.
 * MUHIM: bu yerda hech qanday yangi ma'lumot o'ylab topilmagan — faqat
 * manba fayllarda va i18n'da mavjud qiymatlar ko'chirilgan/formatlangan.
 * Agar manbada biror maydon bo'lmasa (masalan ruscha tarjima), o'sha
 * qiymat ikkala locale uchun ham asl (uz) matn bilan ko'rsatiladi — bu
 * loyihada allaqachon mavjud pattern (qarang: TopCherries.tsx dagi
 * `variety.color`, `variety.nameOriginal`).
 *
 * Sanity ulanganda bu qatlamga tegilmaydi — u faqat Sanity bo'sh bo'lgan
 * holat uchun ishlatiladi (qarang: varieties/page.tsx dagi `hasSanityData`).
 */

import ruMessages from "@/i18n/messages/ru.json";
import uzMessages from "@/i18n/messages/uz.json";
import {
  TOP_APPLES,
  type AppleBadge,
  type AppleVariety,
} from "@/lib/apples/top-varieties";
import {
  TOP_PEACHES,
  type PeachBadge,
  type PeachVariety,
} from "@/lib/peaches/top-varieties";
import {
  TOP_CHERRIES,
  type CherryBadge,
  type CherryFirmness,
  type CherryVariety,
} from "@/lib/cherries/top-varieties";
import {
  GRAPE_VARIETIES,
  type GrapeVariety,
} from "@/lib/grapes/featured-varieties";

export type CatalogFruitType = "apple" | "peach" | "cherry" | "grape";

/**
 * Narxni "so'm" formatida ko'rsatish uchun deterministik formatlagich.
 *
 * MUHIM: `toLocaleString()` / `Intl.NumberFormat` ATAYLAB ishlatilmaydi —
 * ular server (Node) va brauzer o'rtasida ICU/locale ma'lumoti farq qilishi
 * sababli har xil ajratgich (bo'sh joy vs vergul) chiqarishi mumkin, bu esa
 * Next.js'da hydration mismatch'ga olib keladi. O'rniga har doim bir xil
 * natija beradigan qo'lda formatlash ishlatiladi.
 */
function formatPriceUzs(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export type CatalogSpec = {
  labelUz: string;
  labelRu: string;
  valueUz: string;
  valueRu: string;
};

export type CatalogBadge = {
  labelUz: string;
  labelRu: string;
};

export type CatalogVariety = {
  /** URL slug (kelajakdagi /varieties/[fruitType]/[slug] uchun tayyor) */
  slug: string;
  /** Ko'rsatiladigan nom (lotin/original) */
  name: string;
  fruitType: CatalogFruitType;
  ripeningUz: string;
  ripeningRu: string;
  badges: CatalogBadge[];
  taglineUz: string;
  taglineRu: string;
  specs: CatalogSpec[];
  /** Norchontol-brendli rasm mavjud bo'lsa (faqat ba'zi olma navlarida) */
  photo?: string;
  /** Maxsus lending sahifa bo'lsa — locale prefiksisiz yo'l (masalan "/granny-smith") */
  landingHref?: string;
};

export type FruitTypeMeta = {
  id: CatalogFruitType;
  emoji: string;
  nameUz: string;
  nameRu: string;
};

export const FRUIT_TYPES: FruitTypeMeta[] = [
  { id: "apple", emoji: "🍎", nameUz: "Olma", nameRu: "Яблоко" },
  { id: "cherry", emoji: "🍒", nameUz: "Gilos", nameRu: "Черешня" },
  { id: "peach", emoji: "🍑", nameUz: "Shaftoli", nameRu: "Персик" },
  { id: "grape", emoji: "🍇", nameUz: "Uzum", nameRu: "Виноград" },
];

// ===========================================================================
// Badge label lookup — barcha manbalardagi badge kodlari uchun uz/ru nomi.
// (Xuddi mavjud APPLE_FILTERS/CHERRY_FILTERS'dagi labelUz/labelRu uslubida.)
// ===========================================================================

type AnyBadgeId = AppleBadge | PeachBadge | CherryBadge;

const BADGE_LABELS: Record<AnyBadgeId, CatalogBadge> = {
  export: { labelUz: "Eksport", labelRu: "Экспорт" },
  premium: { labelUz: "Premium", labelRu: "Премиум" },
  classic: { labelUz: "Klassik", labelRu: "Классика" },
  "self-pollinating": {
    labelUz: "O'zini changlatuvchi",
    labelRu: "Самоопыляющийся",
  },
  early: { labelUz: "Erta", labelRu: "Ранний" },
  late: { labelUz: "Kech", labelRu: "Поздний" },
  "norchontol-grown": { labelUz: "Norchontolda", labelRu: "Норчонтол" },
  "disease-resistant": {
    labelUz: "Kasallikka chidamli",
    labelRu: "Устойчив к болезням",
  },
  "very-early": { labelUz: "Juda erta", labelRu: "Очень ранний" },
  "very-late": { labelUz: "Juda kech", labelRu: "Очень поздний" },
  "crack-resistant": {
    labelUz: "Yorilishga chidamli",
    labelRu: "Устойчив к растрескиванию",
  },
  "long-storage": { labelUz: "Uzoq saqlanadi", labelRu: "Долго хранится" },
  yellow: { labelUz: "Sariq", labelRu: "Жёлтый" },
  reference: { labelUz: "Asos nav", labelRu: "Эталон" },
};

function badgeLabel(id: AnyBadgeId): CatalogBadge {
  return BADGE_LABELS[id];
}

const CHERRY_FIRMNESS_UZ: Record<CherryFirmness, string> = {
  soft: "Yumshoq",
  medium: "O'rta",
  good: "Yaxshi",
  excellent: "A'lo",
  "very-firm": "Juda qattiq",
};

const CHERRY_FIRMNESS_RU: Record<CherryFirmness, string> = {
  soft: "Мягкая",
  medium: "Средняя",
  good: "Хорошая",
  excellent: "Отличная",
  "very-firm": "Очень плотная",
};

// ===========================================================================
// Adapterlar — manba → CatalogVariety
// ===========================================================================

function mapApple(v: AppleVariety): CatalogVariety {
  const specs: CatalogSpec[] = [
    {
      labelUz: "Kelib chiqishi",
      labelRu: "Происхождение",
      valueUz: v.origin,
      valueRu: v.origin,
    },
    {
      labelUz: "Po'sti rangi",
      labelRu: "Цвет кожуры",
      valueUz: v.skinColor,
      valueRu: v.skinColor,
    },
    {
      labelUz: "Tavsiya etilgan payvandtag",
      labelRu: "Рекомендуемый подвой",
      valueUz: v.recommendedRootstocks,
      valueRu: v.recommendedRootstocks,
    },
    v.selfPollinating
      ? {
          labelUz: "Changlanish",
          labelRu: "Опыление",
          valueUz: "O'zini changlatuvchi",
          valueRu: "Самоопыляющийся",
        }
      : {
          labelUz: "Changlatuvchi navlar",
          labelRu: "Опылители",
          valueUz: v.pollinators ?? "Ko'rsatilmagan",
          valueRu: v.pollinators ?? "Не указано",
        },
    {
      labelUz: "Saqlash muddati",
      labelRu: "Срок хранения",
      valueUz: `${v.storageMonths} oy`,
      valueRu: `${v.storageMonths} мес.`,
    },
    {
      labelUz: "Daraxt kuchi",
      labelRu: "Сила дерева",
      valueUz: v.treeVigor,
      valueRu: v.treeVigor,
    },
  ];

  return {
    slug: v.slug,
    name: v.name,
    fruitType: "apple",
    ripeningUz: v.harvestPeriod,
    ripeningRu: v.harvestPeriod,
    badges: v.badges.map(badgeLabel),
    taglineUz: v.taglineUz,
    taglineRu: v.taglineRu,
    specs,
    photo: v.photo,
    landingHref: v.landingHref,
  };
}

function mapPeach(v: PeachVariety): CatalogVariety {
  const specs: CatalogSpec[] = [
    {
      labelUz: "Kelib chiqishi",
      labelRu: "Происхождение",
      valueUz: v.origin,
      valueRu: v.origin,
    },
    {
      labelUz: "Meva o'lchami",
      labelRu: "Размер плода",
      valueUz: v.fruitSize,
      valueRu: v.fruitSize,
    },
  ];

  if (v.brix != null) {
    specs.push({
      labelUz: "Shirinlik (Brix)",
      labelRu: "Сахаристость (Brix)",
      valueUz: String(v.brix),
      valueRu: String(v.brix),
    });
  }

  specs.push({
    labelUz: "Gullash zichligi",
    labelRu: "Плотность цветения",
    valueUz: v.flowerDensity,
    valueRu: v.flowerDensity,
  });

  specs.push({
    labelUz: "Gullash vaqti",
    labelRu: "Время цветения",
    valueUz: v.bloomTime,
    valueRu: v.bloomTime,
  });

  if (v.treeVigor) {
    specs.push({
      labelUz: "Daraxt kuchi",
      labelRu: "Сила дерева",
      valueUz: v.treeVigor,
      valueRu: v.treeVigor,
    });
  }

  specs.push({
    labelUz: "O'zini changlatuvchi",
    labelRu: "Самоопыляемость",
    valueUz: v.selfFertile ? "Ha" : "Yo'q",
    valueRu: v.selfFertile ? "Да" : "Нет",
  });

  return {
    slug: v.slug,
    name: v.name,
    fruitType: "peach",
    ripeningUz: v.harvestPeriod,
    ripeningRu: v.harvestPeriod,
    badges: v.badges.map(badgeLabel),
    taglineUz: v.taglineUz,
    taglineRu: v.taglineRu,
    specs,
  };
}

function mapCherry(v: CherryVariety): CatalogVariety {
  const specs: CatalogSpec[] = [];

  if (v.sizeMm > 0) {
    specs.push({
      labelUz: "Yiriklik",
      labelRu: "Размер",
      valueUz: `${v.sizeMm} mm`,
      valueRu: `${v.sizeMm} мм`,
    });
  }

  specs.push({
    labelUz: "Qattiqligi",
    labelRu: "Плотность",
    valueUz: CHERRY_FIRMNESS_UZ[v.firmness],
    valueRu: CHERRY_FIRMNESS_RU[v.firmness],
  });

  specs.push({
    labelUz: "Changlanish",
    labelRu: "Опыление",
    valueUz: v.pollination,
    valueRu: v.pollination,
  });

  specs.push({
    labelUz: "Rang",
    labelRu: "Цвет",
    valueUz: v.color,
    valueRu: v.color,
  });

  const ripeningUz =
    v.daysAfterRoyal === 0
      ? "1–5 may (mavsum boshlovchisi)"
      : `Royal Tioga'dan ${v.daysAfterRoyal} kun keyin`;
  const ripeningRu =
    v.daysAfterRoyal === 0
      ? "1–5 мая (открывает сезон)"
      : `+${v.daysAfterRoyal} дн. от Royal Tioga`;

  return {
    slug: v.slug,
    name: v.name,
    fruitType: "cherry",
    ripeningUz,
    ripeningRu,
    badges: v.badges.map(badgeLabel),
    taglineUz: v.taglineUz,
    taglineRu: v.taglineRu,
    specs,
  };
}

type GrapeVarietyMessages = {
  name: string;
  nameCyrillic: string;
  ripening: string;
  description: string;
};

type FeaturedVarietiesMessages = {
  labels: {
    yield: string;
    price: string;
    tonsPerHa: string;
    currency: string;
    availableNow: string;
  };
  highlights: Record<string, string>;
  varieties: Record<string, GrapeVarietyMessages>;
};

const uzGrapeMessages = (
  uzMessages as unknown as {
    saplings: { featuredVarieties: FeaturedVarietiesMessages };
  }
).saplings.featuredVarieties;
const ruGrapeMessages = (
  ruMessages as unknown as {
    saplings: { featuredVarieties: FeaturedVarietiesMessages };
  }
).saplings.featuredVarieties;

function mapGrape(v: GrapeVariety): CatalogVariety | null {
  const uzInfo = uzGrapeMessages.varieties[v.slug];
  const ruInfo = ruGrapeMessages.varieties[v.slug];
  // Ma'lumot yo'q bo'lsa — o'ylab topmasdan o'tkazib yuboramiz.
  if (!uzInfo || !ruInfo) return null;

  const specs: CatalogSpec[] = [
    {
      labelUz: uzGrapeMessages.labels.yield,
      labelRu: ruGrapeMessages.labels.yield,
      valueUz: `${v.yieldTonsPerHa.min}-${v.yieldTonsPerHa.max} ${uzGrapeMessages.labels.tonsPerHa}`,
      valueRu: `${v.yieldTonsPerHa.min}-${v.yieldTonsPerHa.max} ${ruGrapeMessages.labels.tonsPerHa}`,
    },
    {
      labelUz: uzGrapeMessages.labels.price,
      labelRu: ruGrapeMessages.labels.price,
      valueUz: `${formatPriceUzs(v.priceUzs)} ${uzGrapeMessages.labels.currency}`,
      valueRu: `${formatPriceUzs(v.priceUzs)} ${ruGrapeMessages.labels.currency}`,
    },
  ];

  if (v.availableNow) {
    specs.push({
      labelUz: "Holati",
      labelRu: "Статус",
      valueUz: uzGrapeMessages.labels.availableNow,
      valueRu: ruGrapeMessages.labels.availableNow,
    });
  }

  const badges: CatalogBadge[] = v.highlight
    ? [
        {
          labelUz: uzGrapeMessages.highlights[v.highlight],
          labelRu: ruGrapeMessages.highlights[v.highlight],
        },
      ]
    : [];

  return {
    slug: v.slug,
    name: uzInfo.name,
    fruitType: "grape",
    ripeningUz: uzInfo.ripening,
    ripeningRu: ruInfo.ripening,
    badges,
    taglineUz: uzInfo.description,
    taglineRu: ruInfo.description,
    specs,
    photo: v.image,
  };
}

// ===========================================================================
// Yakuniy birlashtirilgan ro'yxat
// ===========================================================================

export const CATALOG_VARIETIES: CatalogVariety[] = [
  ...TOP_APPLES.map(mapApple),
  ...TOP_PEACHES.map(mapPeach),
  ...TOP_CHERRIES.map(mapCherry),
  ...GRAPE_VARIETIES.map(mapGrape).filter(
    (v): v is CatalogVariety => v !== null,
  ),
];

export const TOTAL_CATALOG_VARIETIES = CATALOG_VARIETIES.length;

export function getFruitTypeCounts(): Record<CatalogFruitType, number> {
  const counts: Record<CatalogFruitType, number> = {
    apple: 0,
    peach: 0,
    cherry: 0,
    grape: 0,
  };
  for (const v of CATALOG_VARIETIES) counts[v.fruitType] += 1;
  return counts;
}

export function getFruitTypesWithCounts(): (FruitTypeMeta & {
  count: number;
})[] {
  const counts = getFruitTypeCounts();
  return FRUIT_TYPES.map((ft) => ({ ...ft, count: counts[ft.id] }));
}
