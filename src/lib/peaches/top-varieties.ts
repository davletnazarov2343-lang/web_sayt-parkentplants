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
  /** Harvest period (e.g. "Iyun 5-10") */
  harvestPeriod: string;
  season: PeachSeason;
  flesh: PeachFlesh;
  /** Fruit size — gram or descriptor */
  fruitSize: string;
  /** Brix (sugar) if known */
  brix?: number;
  /** Flower density */
  flowerDensity: string;
  /** Bloom time */
  bloomTime: string;
  /** Tree vigor */
  treeVigor?: string;
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
    harvestPeriod: "May 20-25",
    season: "very-early",
    flesh: "yellow",
    fruitSize: "140 g+",
    flowerDensity: "A'lo",
    bloomTime: "Juda erta",
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
    harvestPeriod: "May 25-30",
    season: "very-early",
    flesh: "yellow",
    fruitSize: "150 g",
    flowerDensity: "A'lo",
    bloomTime: "Erta",
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
    harvestPeriod: "Iyul 1-5",
    season: "early",
    flesh: "yellow",
    fruitSize: "AA-A (yirik)",
    flowerDensity: "A'lo",
    bloomTime: "Kech",
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
    harvestPeriod: "Iyul 10-15",
    season: "early",
    flesh: "yellow",
    fruitSize: "Aъlo, sertola",
    flowerDensity: "A'lo",
    bloomTime: "Erta-o'rta",
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
    harvestPeriod: "Avgust 1-5",
    season: "mid",
    flesh: "yellow",
    fruitSize: "AA",
    brix: 12,
    flowerDensity: "A'lo",
    bloomTime: "Erta",
    treeVigor: "Kuchli",
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
    harvestPeriod: "Avgust 15-20",
    season: "mid",
    flesh: "yellow",
    fruitSize: "Yuqori tonnaj",
    flowerDensity: "A'lo",
    bloomTime: "Erta",
    crackResistant: false,
    selfFertile: true,
    badges: ["premium", "export"],
    taglineUz:
      "Yuqori hosilli (tonnaj!), ravon yaltiroq po'st. O'rta mavsumning eksport tanlovi.",
    taglineRu:
      "Высокая тоннажность, гладкая блестящая кожица. Экспортный выбор среднего сезона.",
  },
  {
    slug: "cresthaven",
    name: "Cresthaven",
    origin: "AQSh",
    harvestPeriod: "Avgust 25-30",
    season: "late",
    flesh: "yellow",
    fruitSize: "O'rtacha-yirik",
    flowerDensity: "A'lo",
    bloomTime: "Juda kech",
    treeVigor: "Yarim tik, kuchli",
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
    harvestPeriod: "Sentyabr 10-15",
    season: "very-late",
    flesh: "yellow",
    fruitSize: "Yirik, yumaloq",
    flowerDensity: "A'lo",
    bloomTime: "Juda kech",
    treeVigor: "Kuchli, juda sermahsul",
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
