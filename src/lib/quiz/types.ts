/**
 * Variety recommendation quiz — types.
 * Norchontol CallCenter ekspert maslahatlari asosida.
 */

export type Goal =
  | "export" // Eksport bozori uchun
  | "commercial" // Tijoriy fermer (ichki bozor + chekli eksport)
  | "household" // Hovli, oz miqdorli
  | "investment"; // Yiriklab investitsiya, intensiv

export type Region =
  | "tashkent_fergana" // Toshkent / Farg'ona vodiysi (issiq, normal tuproq)
  | "samarkand_bukhara" // Samarqand / Buxoro (kontinental)
  | "khorezm" // Xorazm / Qoraqalpog'iston (issiq, sho'r)
  | "south" // Surxondaryo / Qashqadaryo (subtropik)
  | "mountain" // Tog'li hududlar (sovuq)
  | "export_only"; // Boshqa davlat uchun

export type SoilType = "normal" | "salty" | "heavy_clay" | "sandy_light";

export type WaterSource = "drip" | "canal" | "rain";

export type HarvestTimeline = "fast" | "balanced" | "patient"; // 2-3 / 3-4 / 5+ yil

export type AreaSize = "small" | "medium" | "large" | "industrial";
// small: <1 ga, medium: 1-10 ga, large: 10-50 ga, industrial: 50+ ga

export type QuizAnswers = {
  goal: Goal;
  region: Region;
  area: AreaSize;
  soil: SoilType;
  water: WaterSource;
  timeline: HarvestTimeline;
};

export type FruitId =
  | "cherry"
  | "apple_intensive"
  | "pear_intensive"
  | "peach"
  | "apricot"
  | "plum"
  | "almond"
  | "walnut"
  | "grape"
  | "fig"
  | "pomegranate";

export type FruitRecommendation = {
  id: FruitId;
  score: number; // 0-100
  matchReasons: string[]; // i18n key list
};

export type QuizResult = {
  topFruits: FruitRecommendation[]; // top 3
  answers: QuizAnswers;
};
