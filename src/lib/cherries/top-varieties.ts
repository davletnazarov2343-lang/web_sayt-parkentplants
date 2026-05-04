/**
 * TOP 8 gilos navi — Norchontol ko'chatzorida bevosita yetishtiriladigan
 * navlar. Shuhrat Abrorovning "Gilos yetishtirishning katta kitobi"
 * (424 sahifa, 2025) asosida.
 *
 * Tartib: pishish vaqti bo'yicha (juda erta → kech).
 * Royal Tioga — referans nav (1–5 may), qolgan navlar undan necha kun
 * keyin pishishi ko'rsatilgan.
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
  | "late"
  | "reference";

export type CherryVariety = {
  /** URL slug */
  slug: string;
  /** Display name (Latin/English transliteration) */
  name: string;
  /** Original name from book (Cyrillic) */
  nameOriginal: string;
  /** Days after Royal Tioga (reference variety). 0 = Royal Tioga itself */
  daysAfterRoyal: number;
  season: CherrySeason;
  /** Fruit size in mm (0 = not specified in book) */
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
    slug: "royal-tioga",
    name: "Royal Tioga",
    nameOriginal: "Роял Тиога",
    daysAfterRoyal: 0,
    season: "very-early",
    sizeMm: 28,
    pollination: "S1 S4 (o'zini changlatuvchi)",
    selfPollinating: true,
    firmness: "good",
    crackResistance: "medium",
    color: "Po'st och-qirmizi · et qizil",
    badges: ["reference", "self-pollinating", "early"],
    taglineUz:
      "Mavsum boshlovchisi (1–5 may). Daraxti tik va kuchli, juda unumli. Eksport bozori uchun ahamiyatli.",
    taglineRu:
      "Открывает сезон (1–5 мая). Дерево прямое и сильное, очень урожайное. Важен для экспортного рынка.",
  },
  {
    slug: "nimba",
    name: "Nimba",
    nameOriginal: "Нимба",
    daysAfterRoyal: 5,
    season: "very-early",
    sizeMm: 30,
    pollination: "S2 S3",
    selfPollinating: false,
    firmness: "good",
    crackResistance: "low",
    color: "Po'st och-qirmizi · et qizil",
    badges: ["export", "early"],
    taglineUz:
      "Erta pishishi va yirikligi tufayli erta-mavsum gilosi uchun ahamiyatli. Taъmi shirin, kuchsiz nordon.",
    taglineRu:
      "Раннее созревание и крупный размер делают сорт ценным для раннего рынка. Сладкий, легко-кисловатый.",
  },
  {
    slug: "giant-red",
    name: "Giant Red",
    nameOriginal: "Жайнт Ред",
    daysAfterRoyal: 10,
    season: "early",
    sizeMm: 28,
    pollination: "S1 S3",
    selfPollinating: false,
    firmness: "good",
    crackResistance: "medium",
    color: "Qizil",
    badges: ["premium", "early"],
    taglineUz:
      "Jahondagi eng yirik gilos navlaridan biri. 10-mayda oq-sariq holda terib yuqori narxda sotish mumkin.",
    taglineRu:
      "Один из самых крупных сортов в мире. К 10 мая можно собирать в бело-жёлтом виде и продавать по высокой цене.",
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
    slug: "sweet-lorenz",
    name: "Sweet Lorenz",
    nameOriginal: "Свит Лоренз",
    daysAfterRoyal: 15,
    season: "early",
    sizeMm: 30,
    pollination: "S3 S4",
    selfPollinating: false,
    firmness: "excellent",
    crackResistance: "medium",
    color: "Qora",
    badges: ["premium"],
    taglineUz:
      "A'lo qattiqlik bilan yirik qora gilos. Erta-o'rta mavsum uchun premium tanlov.",
    taglineRu:
      "Крупная чёрная черешня с отличной плотностью. Премиум-выбор для раннего сезона.",
  },
  {
    slug: "sps-342",
    name: "SPS 342",
    nameOriginal: "СПС 342",
    daysAfterRoyal: 20,
    season: "mid",
    sizeMm: 28,
    pollination: "S1 S5",
    selfPollinating: false,
    firmness: "excellent",
    crackResistance: "high",
    color: "Qora",
    badges: ["export", "premium"],
    taglineUz:
      "Skina'ga o'xshash sifatli, lekin 10 kun erta. Qo'shaloq mevaga chidamli, banalı uzun. Aъlo taъm.",
    taglineRu:
      "Похож на Skina по качеству, но на 10 дней раньше. Устойчив к двойным плодам, длинная плодоножка. Отличный вкус.",
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
];

export const CHERRY_FILTERS = [
  { id: "all", labelUz: "Hammasi", labelRu: "Все" },
  { id: "export", labelUz: "Eksport", labelRu: "Экспорт" },
  { id: "self-pollinating", labelUz: "O'zini changlatuvchi", labelRu: "Самоопыляющиеся" },
  { id: "early", labelUz: "Erta", labelRu: "Ранние" },
  { id: "late", labelUz: "Kech", labelRu: "Поздние" },
] as const;
