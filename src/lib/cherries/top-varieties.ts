/**
 * TOP 12 gilos navi — Shuhrat Abrorovning "Gilos yetishtirishning katta kitobi"
 * (424 sahifa, 2025) asosida. 65 ta nav orasidan B2B uchun eng muhimlari
 * tanlandi: eksport, mahalliy bozor va sariq nichлар.
 *
 * Har nav uchun ma'lumotlar to'g'ridan-to'g'ri kitobdan olingan:
 * - Ҳосил терими вақти (Roy­al Tioga'ga nisbatan)
 * - S аллеллари (changlanish genetikasi)
 * - Қаттиқлиги, йириклиги, ёрилишга чидамлилик
 * - Тавсифлар
 *
 * Manba: Шуҳрат Аброров. Гилос Етиштиришнинг Катта Китоби.
 * Тошкент: "Yoshlar mediaprint", 2025. — 424 b. ISBN 978-9943-7862-4-0
 */

export type CherrySeason =
  | "very-early"
  | "early"
  | "mid"
  | "late"
  | "very-late";

export type CherryFirmness =
  | "soft"
  | "medium"
  | "good"
  | "excellent"
  | "very-firm";

export type CherryCrackResistance = "low" | "medium" | "high";

export type CherryBadge =
  | "export"
  | "premium"
  | "yellow"
  | "classic"
  | "self-pollinating"
  | "early"
  | "late";

export type CherryVariety = {
  /** URL slug */
  slug: string;
  /** Display name (Latin/English transliteration) */
  name: string;
  /** Original name from book (Cyrillic) */
  nameOriginal: string;
  /** Days after Royal Tioga (reference variety) */
  daysAfterRoyal: number;
  season: CherrySeason;
  /** Fruit size in mm */
  sizeMm: number;
  /** "S1 S4 (ўзини чанглатувчи)" — kept verbatim */
  pollination: string;
  selfPollinating: boolean;
  firmness: CherryFirmness;
  crackResistance: CherryCrackResistance;
  /** Color description in Uzbek-Latin */
  color: string;
  /** Recommended badges (visual labels) */
  badges: CherryBadge[];
  /** One-line tagline (uz) */
  taglineUz: string;
  /** One-line tagline (ru) */
  taglineRu: string;
};

export const TOP_CHERRIES: CherryVariety[] = [
  {
    slug: "red-pacific",
    name: "Red Pacific",
    nameOriginal: "Ред Песифик",
    daysAfterRoyal: 10,
    season: "early",
    sizeMm: 29,
    pollination: "S4 S9 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "excellent",
    crackResistance: "high",
    color: "Qizg'ish-qirmizi · eti qora",
    badges: ["export", "self-pollinating", "early"],
    taglineUz:
      "Eksportbop, A'lo sifatli erta nav. Tez hosilga kiradi, yarim kuchli o'sadi.",
    taglineRu:
      "Экспортный, отличного качества раннеспелый сорт. Быстро вступает в плодоношение.",
  },
  {
    slug: "sweet-ariana",
    name: "Sweet Ariana",
    nameOriginal: "Свит Ариана",
    daysAfterRoyal: 10,
    season: "early",
    sizeMm: 30,
    pollination: "S3 S4 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "excellent",
    crackResistance: "medium",
    color: "Po'st va et — qirmizi",
    badges: ["self-pollinating", "premium", "early"],
    taglineUz:
      "Yuraksimon, shirin meva. Daraxt baquvvat, tarvaqaylab o'sadi va serhosil.",
    taglineRu:
      "Сердцевидная, сладкая. Дерево мощное, раскидистое, очень урожайное.",
  },
  {
    slug: "brooks",
    name: "Brooks",
    nameOriginal: "Брукс",
    daysAfterRoyal: 15,
    season: "early",
    sizeMm: 28,
    pollination: "S1 S9",
    selfPollinating: false,
    firmness: "excellent",
    crackResistance: "low",
    color: "Qizil va och-qirmizi",
    badges: ["export", "premium"],
    taglineUz:
      "Kaliforniya erta gilos standarti. Aъlo taъm, uzoq tashishga qulay.",
    taglineRu:
      "Стандарт Калифорнии для раннего рынка. Отличный вкус, выдерживает дальнюю перевозку.",
  },
  {
    slug: "black-pearl",
    name: "Black Pearl",
    nameOriginal: "Блэк Перл",
    daysAfterRoyal: 20,
    season: "mid",
    sizeMm: 30,
    pollination: "S4 S13",
    selfPollinating: false,
    firmness: "very-firm",
    crackResistance: "medium",
    color: "Po'st va et — qora",
    badges: ["export", "premium"],
    taglineUz:
      "Erta o'rta-mavsum, jo'shqin yirik va juda qattiq. Gizela'da sermahsul.",
    taglineRu:
      "Ранне-средний сезон, крупная и очень плотная. Высокая урожайность на Гизеле.",
  },
  {
    slug: "coral-champagne",
    name: "Coral Champagne",
    nameOriginal: "Корл-Шампейн",
    daysAfterRoyal: 20,
    season: "mid",
    sizeMm: 30,
    pollination: "S1 S3",
    selfPollinating: false,
    firmness: "excellent",
    crackResistance: "medium",
    color: "Po'st och qizil · et to'q qizil",
    badges: ["premium"],
    taglineUz:
      "Kaliforniyada eng ko'p ekiladi. Juda shirin, kam nordon, tez hosilga kiradi.",
    taglineRu:
      "Самый популярный в Калифорнии. Очень сладкий, рано вступает в плодоношение.",
  },
  {
    slug: "santina",
    name: "Santina",
    nameOriginal: "Сантина",
    daysAfterRoyal: 20,
    season: "mid",
    sizeMm: 28,
    pollination: "S1 S4 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "excellent",
    crackResistance: "medium",
    color: "Po'st va et — qora",
    badges: ["export", "self-pollinating"],
    taglineUz:
      "Chilidan Xitoyga eksport. Yirik, ozgina nordon, ёйилиб o'sadi.",
    taglineRu:
      "Экспорт из Чили в Китай. Крупная, слегка кисловатая, раскидистый рост.",
  },
  {
    slug: "bing",
    name: "Bing",
    nameOriginal: "Бинг",
    daysAfterRoyal: 20,
    season: "mid",
    sizeMm: 27,
    pollination: "S3 S4",
    selfPollinating: false,
    firmness: "good",
    crackResistance: "low",
    color: "Po'st va et — och qirmizi",
    badges: ["classic", "export"],
    taglineUz:
      "Bir asrdan ko'p Shimoliy-G'arbiy AQSh standardi. Aъlo taъm, dunyodagi etakchi nav.",
    taglineRu:
      "Более ста лет — стандарт Северо-Запада США. Отличный вкус, мировой лидер.",
  },
  {
    slug: "ebony-pearl",
    name: "Ebony Pearl",
    nameOriginal: "Эбони-Перл",
    daysAfterRoyal: 20,
    season: "mid",
    sizeMm: 32,
    pollination: "S1 S4",
    selfPollinating: false,
    firmness: "excellent",
    crackResistance: "high",
    color: "Po'st va et — qirmizi va to'q qirmizi",
    badges: ["premium", "export"],
    taglineUz:
      "Bing'dan yirikroq, yorilishga chidamliroq. Bakteriy rakka kamroq chalinadi.",
    taglineRu:
      "Крупнее Bing, устойчивее к растрескиванию. Меньше подвержен бактериальному раку.",
  },
  {
    slug: "skina",
    name: "Skina",
    nameOriginal: "Скина",
    daysAfterRoyal: 30,
    season: "late",
    sizeMm: 30,
    pollination: "S1 S4 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "very-firm",
    crackResistance: "high",
    color: "Po'st qirmizi · et to'q qirmizi",
    badges: ["export", "self-pollinating", "late"],
    taglineUz:
      "Lapins o'rnida ko'p qabul qilinmoqda. Yirikroq, qalin bandli, oson boshqariladi.",
    taglineRu:
      "Заменяет Lapins. Крупнее, плотнее, легче в управлении.",
  },
  {
    slug: "lapins",
    name: "Lapins",
    nameOriginal: "Лапинс",
    daysAfterRoyal: 30,
    season: "late",
    sizeMm: 30,
    pollination: "S1 S4 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "excellent",
    crackResistance: "medium",
    color: "Po'st to'q qizil · et qizil",
    badges: ["self-pollinating", "classic", "late"],
    taglineUz:
      "Shimoliy-G'arbiy AQSh, Kanada va Yangi Zelandiyada keng tarqalgan, juda sermahsul.",
    taglineRu:
      "Широко распространён в США, Канаде и Новой Зеландии, очень урожайный.",
  },
  {
    slug: "sweethart",
    name: "Sweethart",
    nameOriginal: "Свитхарт",
    daysAfterRoyal: 40,
    season: "very-late",
    sizeMm: 26,
    pollination: "S3 S4 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "excellent",
    crackResistance: "medium",
    color: "Po'st va et — qizil",
    badges: ["self-pollinating", "late"],
    taglineUz:
      "Juda kech mavsum. Yoqimli taъm, mevasi yuzasida chuqurchalar olishi mumkin.",
    taglineRu:
      "Очень поздний сорт. Приятный вкус, возможны питтинги при перевозке.",
  },
  {
    slug: "0900-ziroat",
    name: "0900 Ziroat",
    nameOriginal: "0900 Зироат",
    daysAfterRoyal: 35,
    season: "late",
    sizeMm: 30,
    pollination: "S3 S12",
    selfPollinating: false,
    firmness: "good",
    crackResistance: "medium",
    color: "Po'st qora · et och qora",
    badges: ["export", "premium", "late"],
    taglineUz:
      "Turkiyaning eng yirik eksport navi. Har yili Yevropaga eksport qilinadi.",
    taglineRu:
      "Самый крупный экспортный сорт Турции. Ежегодно экспортируется в Европу.",
  },
];

export const CHERRY_FILTERS = [
  { id: "all", labelUz: "Hammasi", labelRu: "Все" },
  { id: "export", labelUz: "Eksport", labelRu: "Экспорт" },
  { id: "self-pollinating", labelUz: "O'zini changlatuvchi", labelRu: "Самоопыляющиеся" },
  { id: "early", labelUz: "Erta", labelRu: "Ранние" },
  { id: "late", labelUz: "Kech", labelRu: "Поздние" },
] as const;
