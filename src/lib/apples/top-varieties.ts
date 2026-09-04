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
  /** Harvest period (rough) */
  harvestPeriod: string;
  /** Harvest season grouping */
  season: AppleSeason;
  /** Skin color description */
  skinColor: string;
  /** Recommended rootstocks */
  recommendedRootstocks: string;
  /** Self-pollinating? */
  selfPollinating: boolean;
  /** Pollinators if not self-pollinating */
  pollinators?: string;
  /** Storage potential (months) */
  storageMonths: number;
  storage: AppleStorage;
  /** Tree vigor */
  treeVigor: string;
  /** Recommended badges */
  badges: AppleBadge[];
  /** One-line tagline (uz) */
  taglineUz: string;
  /** One-line tagline (ru) */
  taglineRu: string;
  /** Optional photo (relative to /public) — Norchontol-branded */
  photo?: string;
};

export const TOP_APPLES: AppleVariety[] = [
  {
    slug: "williams-pride",
    name: "Williams Pride",
    origin: "AQSh (Purdue)",
    harvestPeriod: "Iyul oxiri – Avgust boshi",
    season: "summer",
    skinColor: "To'q qizil sariq-yashil fonda",
    recommendedRootstocks: "M9, MM106",
    selfPollinating: false,
    pollinators: "Mondial Gala, Royal Gala",
    storageMonths: 1,
    storage: "short",
    treeVigor: "Kuchli, keng tojli",
    badges: ["disease-resistant", "early"],
    taglineUz:
      "Eng erta yozgi olma. Bahorgi sovuqlarga chidamli, kasalliklarga immunitet.",
    taglineRu:
      "Самое раннее летнее яблоко. Устойчиво к весенним заморозкам и болезням.",
  },
  {
    slug: "mondial-gala",
    name: "Mondial Gala",
    origin: "Yangi Zelandiya",
    harvestPeriod: "Avgust o'rtasi",
    season: "early-autumn",
    skinColor: "Yorqin qizil-norangi engil fonda",
    recommendedRootstocks: "M9, G.41, MM106",
    selfPollinating: false,
    pollinators: "Golden Delicious, Fuji, Granny Smith",
    storageMonths: 4,
    storage: "long",
    treeVigor: "Kuchli, keng o'sadi",
    badges: ["classic", "export"],
    taglineUz:
      "Klassik Gala — qattiq, sertola, shirin va ta'mli. Universal eksport navi.",
    taglineRu:
      "Классическая Gala — твёрдая, сочная, сладкая и ароматная. Универсальный экспортный сорт.",
  },
  {
    slug: "devil-gala",
    name: "Devil Gala",
    origin: "Italiya seleksiyasi",
    harvestPeriod: "Avgust oxiri",
    season: "early-autumn",
    skinColor: "Eng to'q qizil — Gala guruhida",
    recommendedRootstocks: "MM106 (yarim past), M9",
    selfPollinating: false,
    pollinators: "Granny Smith, Fuji, Golden Delicious",
    storageMonths: 5,
    storage: "long",
    treeVigor: "O'rtacha, sermahsul",
    badges: ["norchontol-grown", "premium"],
    taglineUz:
      "Eng to'q qizil Gala. Norchontolda bevosita yetishtiriladi. Yaxshi saqlanadi va eksport bozorida talabchan.",
    taglineRu:
      "Самая тёмно-красная Gala. Выращивается в Норчонтол. Хорошо хранится, востребована на экспорт.",
    photo: "/varieties/saplings/apple-devil-gala.png",
  },
  {
    slug: "forelady",
    name: "Forelady",
    origin: "Yangi seleksiya",
    harvestPeriod: "Sentyabr boshi",
    season: "early-autumn",
    skinColor: "Yorqin qizil",
    recommendedRootstocks: "MM106, M9",
    selfPollinating: false,
    pollinators: "Granny Smith, Golden Delicious",
    storageMonths: 5,
    storage: "long",
    treeVigor: "Kuchli, sermahsul",
    badges: ["norchontol-grown", "premium"],
    taglineUz:
      "Norchontolda yetishtiriladigan ekspert nav. Yorqin qizil meva, intensiv bog' uchun ideal.",
    taglineRu:
      "Экспертный сорт, выращиваемый в Норчонтол. Яркие красные плоды, идеален для интенсивного сада.",
    photo: "/varieties/saplings/apple-forelady.png",
  },
  {
    slug: "golden-reinders",
    name: "Golden Reinders",
    origin: "AQSh (Golden Delicious mutatsiyasi)",
    harvestPeriod: "Sentyabr o'rtasi",
    season: "autumn",
    skinColor: "Tilla-sariq, ravon",
    recommendedRootstocks: "M9, MM106",
    selfPollinating: false,
    pollinators: "Granny Smith, Fuji",
    storageMonths: 6,
    storage: "very-long",
    treeVigor: "Yuqori hosildor",
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
    harvestPeriod: "Sentyabr o'rtasi",
    season: "autumn",
    skinColor: "Qizil-yashil aralash",
    recommendedRootstocks: "M9 (past)",
    selfPollinating: false,
    pollinators: "Golden Delicious, Granny Smith",
    storageMonths: 4,
    storage: "long",
    treeVigor: "Past, intensiv bog' uchun",
    badges: ["norchontol-grown", "early"],
    taglineUz:
      "M9 pivandtagida — past intensiv bog' uchun ideal. Norchontolda yetishtiriladi.",
    taglineRu:
      "На подвое M9 — идеален для низких интенсивных садов. Выращивается в Норчонтол.",
    photo: "/varieties/saplings/apple-jeromin.png",
  },
  {
    slug: "story-inored",
    name: "Story® Inored",
    origin: "Frantsiya (NOVADI)",
    harvestPeriod: "Oktyabr 20-25",
    season: "late-autumn",
    skinColor: "100% qizil",
    recommendedRootstocks: "M9, G.41",
    selfPollinating: false,
    pollinators: "Granny Smith, Red Delicious, Gala guruhi",
    storageMonths: 7,
    storage: "very-long",
    treeVigor: "Kuchli",
    badges: ["premium", "export", "disease-resistant", "late"],
    taglineUz:
      "Eng zamonaviy premium nav. Erwinia (bakteriy kuyish) chidamli. 7 oygacha saqlanadi.",
    taglineRu:
      "Самый современный премиум-сорт. Устойчив к Erwinia (бактериальному ожогу). Хранится до 7 месяцев.",
  },
  {
    slug: "granny-smith",
    name: "Granny Smith",
    origin: "Avstraliya",
    harvestPeriod: "Oktyabr oxiri",
    season: "late-autumn",
    skinColor: "Yorqin yashil",
    recommendedRootstocks: "M9, MM106",
    selfPollinating: false,
    pollinators: "Golden Delicious, Mondial Gala",
    storageMonths: 8,
    storage: "very-long",
    treeVigor: "Yarim tik, juda tez o'sadi",
    badges: ["classic", "export", "late"],
    taglineUz:
      "Yashil olma standarti. Eng uzoq saqlanadi (8 oygacha), eksport bozorida etakchi.",
    taglineRu:
      "Стандарт зелёных яблок. Самое долгое хранение (до 8 месяцев), лидер на экспортном рынке.",
  },
  {
    slug: "pink-lady",
    name: "Pink Lady (Rosy Glow)",
    origin: "Avstraliya",
    harvestPeriod: "Noyabr boshi",
    season: "late-autumn",
    skinColor: "Pushti-qizil sariq fonda",
    recommendedRootstocks: "M9, MM106",
    selfPollinating: false,
    pollinators: "Granny Smith, Golden Delicious",
    storageMonths: 6,
    storage: "very-long",
    treeVigor: "O'rtacha, intensiv bog' uchun",
    badges: ["norchontol-grown", "premium", "export", "late"],
    taglineUz:
      "Premium kech nav. Pushti-qizil mevasi va shirin-nordon balansi bilan tanilgan. Eksport va supermarket talabchanini qondiradi.",
    taglineRu:
      "Премиум поздний сорт. Известен розово-красной окраской и сбалансированным сладко-кислым вкусом. Подходит для экспорта и супермаркетов.",
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
