/**
 * TOP shaftoli navlari — İrgeler.com.tr katalogidan tanlangan.
 * Norchontol shaftoli yetishtiradigan navlardan eng muhimlari (mavsumi
 * may oxiridan sentyabr o'rtasigacha cho'zilgan).
 *
 * Tartib: pishish vaqti bo'yicha (eng erta → eng kech).
 */

export type PeachSeason =
  | "very-early"
  | "early"
  | "mid"
  | "late"
  | "very-late";

export type PeachFlesh = "white" | "yellow";

export type PeachBadge =
  | "export"
  | "premium"
  | "classic"
  | "early"
  | "late"
  | "very-early"
  | "very-late"
  | "crack-resistant"
  | "long-storage";

export type PeachVariety = {
  slug: string;
  name: string;
  origin: string;
  /** Origin (ru) — bo'sh bo'lsa `origin` ishlatiladi */
  originRu?: string;
  /** Harvest period (e.g. "Iyun 5-10") */
  harvestPeriod: string;
  /** Harvest period (ru) — bo'sh bo'lsa `harvestPeriod` ishlatiladi */
  harvestPeriodRu?: string;
  season: PeachSeason;
  flesh: PeachFlesh;
  /** Fruit size — gram or descriptor */
  fruitSize: string;
  /** Fruit size (ru) — bo'sh bo'lsa `fruitSize` ishlatiladi */
  fruitSizeRu?: string;
  /** Brix (sugar) if known */
  brix?: number;
  /** Flower density */
  flowerDensity: string;
  /** Flower density (ru) — bo'sh bo'lsa `flowerDensity` ishlatiladi */
  flowerDensityRu?: string;
  /** Bloom time */
  bloomTime: string;
  /** Bloom time (ru) — bo'sh bo'lsa `bloomTime` ishlatiladi */
  bloomTimeRu?: string;
  /** Tree vigor */
  treeVigor?: string;
  /** Tree vigor (ru) — bo'sh bo'lsa `treeVigor` ishlatiladi */
  treeVigorRu?: string;
  /** Crack-resistant? */
  crackResistant: boolean;
  /** Self-fertile? */
  selfFertile: boolean;
  badges: PeachBadge[];
  taglineUz: string;
  taglineRu: string;
};

export const TOP_PEACHES: PeachVariety[] = [
  {
    slug: "filomena",
    name: "Filomena ®",
    origin: "PSB Produccion (Ispaniya)",
    originRu: "PSB Produccion (Испания)",
    harvestPeriod: "May 20-25",
    harvestPeriodRu: "20-25 мая",
    season: "very-early",
    flesh: "yellow",
    fruitSize: "140 g+",
    fruitSizeRu: "140 г+",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Juda erta",
    bloomTimeRu: "Очень раннее",
    crackResistant: true,
    selfFertile: true,
    badges: ["very-early", "crack-resistant"],
    taglineUz:
      "Eng erta shaftoli — may oxirida hosilga kiradi. Yorilishga chidamli, mavsum boshlovchisi.",
    taglineRu:
      "Самый ранний персик — урожай в конце мая. Устойчив к растрескиванию, открывает сезон.",
  },
  {
    slug: "astoria",
    name: "Astoria ®",
    origin: "PSB Produccion (Ispaniya)",
    originRu: "PSB Produccion (Испания)",
    harvestPeriod: "May 25-30",
    harvestPeriodRu: "25-30 мая",
    season: "very-early",
    flesh: "yellow",
    fruitSize: "150 g",
    fruitSizeRu: "150 г",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Erta",
    bloomTimeRu: "Раннее",
    crackResistant: true,
    selfFertile: true,
    badges: ["very-early", "crack-resistant", "long-storage"],
    taglineUz:
      "Erta yozgi shaftoli, 150 g. Yorilishga chidamli, uzoq saqlanadi — tashish uchun ideal.",
    taglineRu:
      "Раннелетний персик, 150 г. Устойчив к растрескиванию, долго хранится — идеален для перевозки.",
  },
  {
    slug: "royal-majestic",
    name: "Royal Majestic ®",
    origin: "Zaiger Genetics (AQSh)",
    originRu: "Zaiger Genetics (США)",
    harvestPeriod: "Iyul 1-5",
    harvestPeriodRu: "1-5 июля",
    season: "early",
    flesh: "yellow",
    fruitSize: "AA-A (yirik)",
    fruitSizeRu: "AA-A (крупный)",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Kech",
    bloomTimeRu: "Позднее",
    crackResistant: false,
    selfFertile: true,
    badges: ["premium", "long-storage"],
    taglineUz:
      "Yirik mevali, kech gullaydi (kechki sovuqlardan saqlanadi). Daraxtda uzoq turadi.",
    taglineRu:
      "Крупноплодный, поздно цветёт (защищён от поздних заморозков). Долго держится на дереве.",
  },
  {
    slug: "royal-glory",
    name: "Royal Glory ®",
    origin: "Zaiger Genetics (AQSh)",
    originRu: "Zaiger Genetics (США)",
    harvestPeriod: "Iyul 10-15",
    harvestPeriodRu: "10-15 июля",
    season: "early",
    flesh: "yellow",
    fruitSize: "Aъlo, sertola",
    fruitSizeRu: "Отличный, сочный",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Erta-o'rta",
    bloomTimeRu: "Ранне-среднее",
    crackResistant: false,
    selfFertile: true,
    badges: ["classic", "premium"],
    taglineUz:
      "Klassik premium nav — Royal liniyasining etakchisi. Eksport bozorida talabchan.",
    taglineRu:
      "Классический премиум — лидер линии Royal. Востребован на экспортном рынке.",
  },
  {
    slug: "royal-mona",
    name: "Royal Mona",
    origin: "Zaiger Genetics (AQSh)",
    originRu: "Zaiger Genetics (США)",
    harvestPeriod: "Avgust 1-5",
    harvestPeriodRu: "1-5 августа",
    season: "mid",
    flesh: "yellow",
    fruitSize: "AA",
    fruitSizeRu: "AA",
    brix: 12,
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Erta",
    bloomTimeRu: "Раннее",
    treeVigor: "Kuchli",
    treeVigorRu: "Сильнорослое",
    crackResistant: false,
    selfFertile: true,
    badges: ["premium"],
    taglineUz:
      "Yumaloq, biroz yassilangan. Shirin, aromat, past kislotalik. Mexanizatsiyaga mos.",
    taglineRu:
      "Округлый, слегка приплюснутый. Сладкий, ароматный, низкокислотный. Подходит для механизации.",
  },
  {
    slug: "sweet-dream",
    name: "Sweet Dream",
    origin: "PSB Produccion (Ispaniya)",
    originRu: "PSB Produccion (Испания)",
    harvestPeriod: "Avgust 15-20",
    harvestPeriodRu: "15-20 августа",
    season: "mid",
    flesh: "yellow",
    fruitSize: "Yuqori tonnaj",
    fruitSizeRu: "Высокий тоннаж",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Erta",
    bloomTimeRu: "Раннее",
    crackResistant: false,
    selfFertile: true,
    badges: ["premium", "export"],
    taglineUz:
      "Yuqori hosilli (tonnaj!), ravon yaltiroq po'st. O'rta mavsumning eksport tanlovi.",
    taglineRu:
      "Высокоурожайный (тоннаж!), гладкая блестящая кожица. Экспортный выбор среднего сезона.",
  },
  {
    slug: "cresthaven",
    name: "Cresthaven",
    origin: "AQSh",
    originRu: "США",
    harvestPeriod: "Avgust 25-30",
    harvestPeriodRu: "25-30 августа",
    season: "late",
    flesh: "yellow",
    fruitSize: "O'rtacha-yirik",
    fruitSizeRu: "Среднекрупный",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Juda kech",
    bloomTimeRu: "Очень позднее",
    treeVigor: "Yarim tik, kuchli",
    treeVigorRu: "Полупрямостоячее, сильнорослое",
    crackResistant: false,
    selfFertile: true,
    badges: ["classic", "long-storage", "late"],
    taglineUz:
      "Klassik kech AQSh navi. Uzoq saqlanadi, kechki bahorgi sovuqlarga chidamli.",
    taglineRu:
      "Классический поздний сорт США. Долго хранится, устойчив к поздним весенним заморозкам.",
  },
  {
    slug: "q-henry",
    name: "Q Henry",
    origin: "Kaliforniya (AQSh)",
    originRu: "Калифорния (США)",
    harvestPeriod: "Sentyabr 10-15",
    harvestPeriodRu: "10-15 сентября",
    season: "very-late",
    flesh: "yellow",
    fruitSize: "Yirik, yumaloq",
    fruitSizeRu: "Крупный, округлый",
    flowerDensity: "A'lo",
    flowerDensityRu: "Отличная",
    bloomTime: "Juda kech",
    bloomTimeRu: "Очень позднее",
    treeVigor: "Kuchli, juda sermahsul",
    treeVigorRu: "Сильнорослое, очень урожайное",
    crackResistant: false,
    selfFertile: true,
    badges: ["very-late", "long-storage", "export"],
    taglineUz:
      "Eng kech mavsum (sentyabr o'rtasi). Qattiq, sertola — saqlash uchun a'lo. Kuchli, sermahsul daraxt.",
    taglineRu:
      "Самый поздний сезон (середина сентября). Плотный, сочный — отлично для хранения. Сильное, очень урожайное дерево.",
  },
];

export const PEACH_FILTERS = [
  { id: "all", labelUz: "Hammasi", labelRu: "Все" },
  { id: "early", labelUz: "Erta", labelRu: "Ранние" },
  { id: "mid", labelUz: "O'rta", labelRu: "Средние" },
  { id: "late", labelUz: "Kech", labelRu: "Поздние" },
  { id: "export", labelUz: "Eksport", labelRu: "Экспорт" },
] as const;
