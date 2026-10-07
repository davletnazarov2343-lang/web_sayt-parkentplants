/**
 * TOP 8 olma navi — Norchontol ko'chatzorida bevosita yetishtiriladigan
 * navlar. Manbalar:
 * - Norchontol marketing rasmlari (Devil Gala, Pink Lady, Forelady, Jeromin, Golden Reinders)
 * - İrgeler.com.tr ma'lumotlar bazasi (Story Inored, Granny Smith, Mondial Gala)
 * - Shuhrat Abrorov "Gilos kitobi" va umumiy agronomik bilim
 *
 * Tartib: pishish vaqti bo'yicha (erta → kech).
 */

export type AppleSeason = "summer" | "early-autumn" | "autumn" | "late-autumn";

export type AppleStorage = "short" | "medium" | "long" | "very-long";

export type AppleBadge =
  | "export"
  | "premium"
  | "classic"
  | "self-pollinating"
  | "early"
  | "late"
  | "norchontol-grown"
  | "disease-resistant";

export type AppleVariety = {
  /** URL slug */
  slug: string;
  /** Display name (Latin/English) */
  name: string;
  /** Origin / breeder */
  origin: string;
  /** Origin (ru) — bo'sh bo'lsa `origin` ishlatiladi */
  originRu?: string;
  /** Harvest period (rough) */
  harvestPeriod: string;
  /** Harvest period (ru) — bo'sh bo'lsa `harvestPeriod` ishlatiladi */
  harvestPeriodRu?: string;
  /** Harvest season grouping */
  season: AppleSeason;
  /** Skin color description */
  skinColor: string;
  /** Skin color (ru) — bo'sh bo'lsa `skinColor` ishlatiladi */
  skinColorRu?: string;
  /** Recommended rootstocks */
  recommendedRootstocks: string;
  /** Recommended rootstocks (ru) — bo'sh bo'lsa `recommendedRootstocks` ishlatiladi */
  recommendedRootstocksRu?: string;
  /** Self-pollinating? */
  selfPollinating: boolean;
  /** Pollinators if not self-pollinating */
  pollinators?: string;
  /** Pollinators (ru) — bo'sh bo'lsa `pollinators` ishlatiladi */
  pollinatorsRu?: string;
  /** Storage potential (months) */
  storageMonths: number;
  storage: AppleStorage;
  /** Tree vigor */
  treeVigor: string;
  /** Tree vigor (ru) — bo'sh bo'lsa `treeVigor` ishlatiladi */
  treeVigorRu?: string;
  /** Recommended badges */
  badges: AppleBadge[];
  /** One-line tagline (uz) */
  taglineUz: string;
  /** One-line tagline (ru) */
  taglineRu: string;
  /** Optional photo (relative to /public) — Norchontol-branded */
  photo?: string;
  /** Optional maxsus lending sahifa (locale prefiksisiz, masalan "/granny-smith") */
  landingHref?: string;
};

export const TOP_APPLES: AppleVariety[] = [
  {
    slug: "williams-pride",
    name: "Williams Pride",
    origin: "AQSh (Purdue)",
    originRu: "США (Purdue)",
    harvestPeriod: "Iyul oxiri – Avgust boshi",
    harvestPeriodRu: "Конец июля – начало августа",
    season: "summer",
    skinColor: "To'q qizil sariq-yashil fonda",
    skinColorRu: "Тёмно-красная на жёлто-зелёном фоне",
    recommendedRootstocks: "M9, MM106",
    recommendedRootstocksRu: "M9, MM106",
    selfPollinating: false,
    pollinators: "Mondial Gala, Royal Gala",
    pollinatorsRu: "Mondial Gala, Royal Gala",
    storageMonths: 1,
    storage: "short",
    treeVigor: "Kuchli, keng tojli",
    treeVigorRu: "Сильнорослое, с широкой кроной",
    badges: ["disease-resistant", "early"],
    taglineUz:
      "Eng erta yozgi olma. Bahorgi sovuqlarga chidamli, kasalliklarga immunitet.",
    taglineRu:
      "Самое раннее летнее яблоко. Устойчиво к весенним заморозкам, обладает иммунитетом к болезням.",
  },
  {
    slug: "mondial-gala",
    name: "Mondial Gala",
    origin: "Yangi Zelandiya",
    originRu: "Новая Зеландия",
    harvestPeriod: "Avgust o'rtasi",
    harvestPeriodRu: "Середина августа",
    season: "early-autumn",
    skinColor: "Yorqin qizil-norangi engil fonda",
    skinColorRu: "Ярко-красно-оранжевая на светлом фоне",
    recommendedRootstocks: "M9, G.41, MM106",
    recommendedRootstocksRu: "M9, G.41, MM106",
    selfPollinating: false,
    pollinators: "Golden Delicious, Fuji, Granny Smith",
    pollinatorsRu: "Golden Delicious, Fuji, Granny Smith",
    storageMonths: 4,
    storage: "long",
    treeVigor: "Kuchli, keng o'sadi",
    treeVigorRu: "Сильнорослое, широко разрастается",
    badges: ["classic", "export"],
    taglineUz:
      "Klassik Gala — qattiq, sertola, shirin va ta'mli. Universal eksport navi.",
    taglineRu:
      "Классическая Gala — твёрдая, сочная, сладкая и вкусная. Универсальный экспортный сорт.",
  },
  {
    slug: "devil-gala",
    name: "Devil Gala",
    origin: "Italiya seleksiyasi",
    originRu: "Итальянская селекция",
    harvestPeriod: "Iyul–avgust",
    harvestPeriodRu: "Июль–август",
    season: "summer",
    skinColor: "Eng to'q qizil — Gala guruhida",
    skinColorRu: "Самая тёмно-красная в группе Gala",
    recommendedRootstocks: "M9",
    recommendedRootstocksRu: "M9",
    selfPollinating: false,
    pollinators: "Golden Delicious, Granny Smith, Fuji",
    pollinatorsRu: "Golden Delicious, Granny Smith, Fuji",
    storageMonths: 6,
    storage: "long",
    treeVigor: "O'rtacha-kuchli",
    treeVigorRu: "Средне-сильнорослое",
    badges: ["norchontol-grown", "premium"],
    taglineUz:
      "Galaning eng qizili. Bozorga hammadan 1 oy oldin chiqadi, 5–6 oygacha saqlanadi.",
    taglineRu:
      "Самая красная Gala. Выходит на рынок на месяц раньше всех, хранится до 5–6 месяцев.",
    photo: "/varieties/saplings/apple-devil-gala.png",
    landingHref: "/devil-gala",
  },
  {
    slug: "forelady",
    name: "Forelady",
    origin: "Yangi seleksiya",
    originRu: "Новая селекция",
    harvestPeriod: "Sentyabr boshi",
    harvestPeriodRu: "Начало сентября",
    season: "early-autumn",
    skinColor: "Yorqin qizil",
    skinColorRu: "Ярко-красная",
    recommendedRootstocks: "MM106, M9",
    recommendedRootstocksRu: "MM106, M9",
    selfPollinating: false,
    pollinators: "Granny Smith, Golden Delicious",
    pollinatorsRu: "Granny Smith, Golden Delicious",
    storageMonths: 5,
    storage: "long",
    treeVigor: "Kuchli, sermahsul",
    treeVigorRu: "Сильнорослое, урожайное",
    badges: ["norchontol-grown", "premium"],
    taglineUz:
      "Norchontolda yetishtiriladigan ekspert nav. Yorqin qizil meva, intensiv bog' uchun ideal.",
    taglineRu:
      "Экспертный сорт, выращиваемый в хозяйстве «Норчонтол». Яркие красные плоды; идеален для интенсивного сада.",
    photo: "/varieties/saplings/apple-forelady.png",
  },
  {
    slug: "golden-reinders",
    name: "Golden Reinders",
    origin: "AQSh (Golden Delicious mutatsiyasi)",
    originRu: "США (мутация Golden Delicious)",
    harvestPeriod: "Sentyabr o'rtasi",
    harvestPeriodRu: "Середина сентября",
    season: "autumn",
    skinColor: "Tilla-sariq, ravon",
    skinColorRu: "Золотисто-жёлтая, гладкая",
    recommendedRootstocks: "M9, MM106",
    recommendedRootstocksRu: "M9, MM106",
    selfPollinating: false,
    pollinators: "Granny Smith, Fuji",
    pollinatorsRu: "Granny Smith, Fuji",
    storageMonths: 6,
    storage: "very-long",
    treeVigor: "Yuqori hosildor",
    treeVigorRu: "Высокоурожайное",
    badges: ["norchontol-grown", "classic"],
    taglineUz:
      "Klassik tilla-sariq olma. Ichki bozorda eng talab qilinadigan navlardan biri.",
    taglineRu:
      "Классическое золотисто-жёлтое яблоко. Один из самых востребованных сортов на внутреннем рынке.",
    photo: "/varieties/saplings/apple-golden-reinders.png",
  },
  {
    slug: "jeromin",
    name: "Jeromin",
    origin: "Yangi seleksiya",
    originRu: "Новая селекция",
    harvestPeriod: "Sentyabr o'rtasi",
    harvestPeriodRu: "Середина сентября",
    season: "autumn",
    skinColor: "Qizil-yashil aralash",
    skinColorRu: "Смешанная красно-зелёная",
    recommendedRootstocks: "M9 (past)",
    recommendedRootstocksRu: "M9 (слаборослый)",
    selfPollinating: false,
    pollinators: "Golden Delicious, Granny Smith",
    pollinatorsRu: "Golden Delicious, Granny Smith",
    storageMonths: 4,
    storage: "long",
    treeVigor: "Past, intensiv bog' uchun",
    treeVigorRu: "Слаборослое, для интенсивного сада",
    badges: ["norchontol-grown", "early"],
    taglineUz:
      "M9 pivandtagida — past intensiv bog' uchun ideal. Norchontolda yetishtiriladi.",
    taglineRu:
      "На подвое M9 — идеален для низких интенсивных садов. Выращивается в хозяйстве «Норчонтол».",
    photo: "/varieties/saplings/apple-jeromin.png",
  },
  {
    slug: "story-inored",
    name: "Story® Inored",
    origin: "Frantsiya (NOVADI)",
    originRu: "Франция (NOVADI)",
    harvestPeriod: "Oktyabr 20-25",
    harvestPeriodRu: "20-25 октября",
    season: "late-autumn",
    skinColor: "100% qizil",
    skinColorRu: "100% красная",
    recommendedRootstocks: "M9, G.41",
    recommendedRootstocksRu: "M9, G.41",
    selfPollinating: false,
    pollinators: "Granny Smith, Red Delicious, Gala guruhi",
    pollinatorsRu: "Granny Smith, Red Delicious, группа Gala",
    storageMonths: 7,
    storage: "very-long",
    treeVigor: "Kuchli",
    treeVigorRu: "Сильнорослое",
    badges: ["premium", "export", "disease-resistant", "late"],
    taglineUz:
      "Eng zamonaviy premium nav. Erwinia (bakteriy kuyish) chidamli. 7 oygacha saqlanadi.",
    taglineRu:
      "Самый современный премиум-сорт. Устойчив к бактериальному ожогу (Erwinia). Хранится до 7 месяцев.",
  },
  {
    slug: "granny-smith",
    name: "Granny Smith (Challenger)",
    origin: "Avstraliya",
    originRu: "Австралия",
    harvestPeriod: "Sentyabr boshi",
    harvestPeriodRu: "Начало сентября",
    season: "early-autumn",
    skinColor: "Yorqin yashil",
    skinColorRu: "Ярко-зелёная",
    recommendedRootstocks: "M9",
    recommendedRootstocksRu: "M9",
    selfPollinating: false,
    pollinators: "Golden Delicious, Gala",
    pollinatorsRu: "Golden Delicious, Gala",
    storageMonths: 6,
    storage: "long",
    treeVigor: "Kuchli",
    treeVigorRu: "Сильнорослое",
    badges: ["classic", "export", "early"],
    taglineUz:
      "Yashil olma standarti. 6 oygacha saqlanadi, supermarket va eksport bozorida yetakchi.",
    taglineRu:
      "Стандарт зелёных яблок. Хранится до 6 месяцев, лидер на рынке супермаркетов и экспорта.",
    landingHref: "/granny-smith",
  },
  {
    slug: "pink-lady",
    name: "Pink Lady (Rosy Glow)",
    origin: "Avstraliya",
    originRu: "Австралия",
    harvestPeriod: "Noyabr boshi",
    harvestPeriodRu: "Начало ноября",
    season: "late-autumn",
    skinColor: "Pushti-qizil sariq fonda",
    skinColorRu: "Розово-красная на жёлтом фоне",
    recommendedRootstocks: "M9, MM106",
    recommendedRootstocksRu: "M9, MM106",
    selfPollinating: false,
    pollinators: "Granny Smith, Golden Delicious",
    pollinatorsRu: "Granny Smith, Golden Delicious",
    storageMonths: 6,
    storage: "very-long",
    treeVigor: "O'rtacha, intensiv bog' uchun",
    treeVigorRu: "Среднерослое, для интенсивного сада",
    badges: ["norchontol-grown", "premium", "export", "late"],
    taglineUz:
      "Premium kech nav. Pushti-qizil mevasi va shirin-nordon balansi bilan tanilgan. Eksport va supermarket talabchanini qondiradi.",
    taglineRu:
      "Премиальный поздний сорт. Известен розово-красной окраской и сбалансированным сладко-кислым вкусом. Подходит для экспорта и супермаркетов.",
    photo: "/varieties/saplings/apple-pink-lady.png",
  },
];

export const APPLE_FILTERS = [
  { id: "all", labelUz: "Hammasi", labelRu: "Все" },
  { id: "norchontol-grown", labelUz: "Norchontolda", labelRu: "Норчонтол" },
  { id: "export", labelUz: "Eksport", labelRu: "Экспорт" },
  { id: "early", labelUz: "Erta", labelRu: "Ранние" },
  { id: "late", labelUz: "Kech", labelRu: "Поздние" },
] as const;
