/**
 * Meva turlari haqida ekspert ma'lumot bazasi.
 * Manba: Norchontol CallCenter qo'llanmasi + Shuhrat aka tajribasi.
 *
 * Har meva uchun: daromad, kerak shartlar, sho'r/quruq chidamliligi,
 * tavsiya etiladigan navlar, va `i18nKey` lar (UI da tarjima beriladi).
 */

import type { FruitId } from "./types";

export type FruitMeta = {
  id: FruitId;
  /** $/ga yillik daromad (tonna ostida) */
  income: { min: number; max: number };
  /** Eng erta hosilga kirishi (yil) */
  yearsToHarvest: number;
  /** Saqlash davomiyligi (kun) — logistika rejasiga ta'sir qiladi */
  storageDays: number;
  /** Sug'orish talabi: low | medium | high */
  waterNeed: "low" | "medium" | "high";
  /** Sho'r yerga chidamlilik */
  saltTolerance: "high" | "moderate" | "low";
  /** Tuproqqa moslik */
  soilPreference: "sandy_light" | "any" | "heavy_clay" | "carbonate";
  /** Eksport potensiali */
  exportPotential: "high" | "medium" | "low";
  /** Mexanizatsiya darajasi (1 - low, 5 - high) */
  mechanization: 1 | 2 | 3 | 4 | 5;
  /** Hovliga / hozirgi maydon uchun mosligi */
  goodForBackyard: boolean;
  /** Tavsiya etiladigan navlar va pivandtaglar (i18nsiz, faqat lotin) */
  recommendedVarieties: string[];
  recommendedRootstocks: string[];
  /** Ozini changlata oladimi (hovli uchun muhim) */
  selfPollinatingOptions?: string[];
};

export const FRUITS: FruitMeta[] = [
  {
    id: "cherry",
    income: { min: 25000, max: 40000 },
    yearsToHarvest: 4,
    storageDays: 10,
    waterNeed: "high",
    saltTolerance: "moderate",
    soilPreference: "sandy_light",
    exportPotential: "high",
    mechanization: 3,
    goodForBackyard: true,
    recommendedVarieties: ["Bing", "Regina", "Lapins", "Valeriy Chkalov"],
    recommendedRootstocks: ["Krimsk-6 (yarim past)", "Krimsk-5", "KAB-6P"],
    selfPollinatingOptions: ["Lapins", "Stella"],
  },
  {
    id: "apple_intensive",
    income: { min: 15000, max: 25000 },
    yearsToHarvest: 2,
    storageDays: 180,
    waterNeed: "medium",
    saltTolerance: "low",
    soilPreference: "any",
    exportPotential: "medium",
    mechanization: 5,
    goodForBackyard: true,
    recommendedVarieties: [
      "Devil Gala",
      "Granny Smith",
      "Pink Lady Rose Glow",
      "Liberty",
      "Goldrush",
    ],
    recommendedRootstocks: ["M9 (past)", "G.41 (past)", "MM106 (yarim past)"],
  },
  {
    id: "pear_intensive",
    income: { min: 20000, max: 30000 },
    yearsToHarvest: 3,
    storageDays: 120,
    waterNeed: "medium",
    saltTolerance: "moderate",
    soilPreference: "any",
    exportPotential: "medium",
    mechanization: 4,
    goodForBackyard: true,
    recommendedVarieties: [
      "Conference",
      "Williams",
      "Forelle",
      "Harrow Sweet",
    ],
    recommendedRootstocks: ["OHF 87", "OHF 333", "Fox 11"],
  },
  {
    id: "peach",
    income: { min: 15000, max: 20000 },
    yearsToHarvest: 2,
    storageDays: 14,
    waterNeed: "medium",
    saltTolerance: "moderate",
    soilPreference: "carbonate",
    exportPotential: "high",
    mechanization: 3,
    goodForBackyard: true,
    recommendedVarieties: [
      "Erta pishar (Spaniya seleksiyasi)",
      "O'rta pishar",
      "Kech pishar (eksport uchun)",
    ],
    recommendedRootstocks: ["Garnem", "GF 677", "Krimsk 86"],
    selfPollinatingOptions: ["Barchasi"],
  },
  {
    id: "apricot",
    income: { min: 10000, max: 20000 },
    yearsToHarvest: 2,
    storageDays: 7,
    waterNeed: "low",
    saltTolerance: "moderate",
    soilPreference: "carbonate",
    exportPotential: "high",
    mechanization: 2,
    goodForBackyard: true,
    recommendedVarieties: [
      "Subhoniy",
      "Xurmoyi",
      "Mirsanjali",
      "Ispaniya yangi seleksiyasi",
    ],
    recommendedRootstocks: ["Mироболан 29C", "Mираred"],
    selfPollinatingOptions: ["Yangi serҳosil navlar"],
  },
  {
    id: "plum",
    income: { min: 10000, max: 18000 },
    yearsToHarvest: 2,
    storageDays: 30,
    waterNeed: "medium",
    saltTolerance: "moderate",
    soilPreference: "any",
    exportPotential: "medium",
    mechanization: 3,
    goodForBackyard: true,
    recommendedVarieties: [
      "Stanley (Yevropa, quritish)",
      "President",
      "Yapon olxo'rilari (ichi qizil, o'zini changlatadigan)",
    ],
    recommendedRootstocks: ["Mироболан 29C", "Mираred"],
    selfPollinatingOptions: ["Stanley", "Yapon ichi qizil navlar"],
  },
  {
    id: "almond",
    income: { min: 10000, max: 18000 },
    yearsToHarvest: 3,
    storageDays: 365,
    waterNeed: "low",
    saltTolerance: "moderate",
    soilPreference: "carbonate",
    exportPotential: "high",
    mechanization: 4,
    goodForBackyard: false,
    recommendedVarieties: [
      "Nonpareil (yumshoq pўchoq)",
      "Vinters",
      "Guara (oq mag'iz, o'zini changlatadigan)",
      "Soleta",
      "Bellona",
    ],
    recommendedRootstocks: ["Garnem", "GF 677", "Krimsk 86"],
    selfPollinatingOptions: ["Guara", "Soleta", "Bellona"],
  },
  {
    id: "walnut",
    income: { min: 8000, max: 14000 },
    yearsToHarvest: 4,
    storageDays: 365,
    waterNeed: "medium",
    saltTolerance: "low",
    soilPreference: "any",
    exportPotential: "medium",
    mechanization: 3,
    goodForBackyard: true,
    recommendedVarieties: ["Chandler", "Fernor", "Mahalliy yirik mag'izli"],
    recommendedRootstocks: ["Yong'oq urug'i"],
  },
  {
    id: "grape",
    income: { min: 14000, max: 16000 },
    yearsToHarvest: 3,
    storageDays: 60,
    waterNeed: "high",
    saltTolerance: "low",
    soilPreference: "sandy_light",
    exportPotential: "high",
    mechanization: 2,
    goodForBackyard: true,
    recommendedVarieties: [
      "Uruғsiz eksport navlari",
      "Mahalliy talab navlari",
    ],
    recommendedRootstocks: ["Mahalliy"],
    selfPollinatingOptions: ["Barchasi"],
  },
  {
    id: "fig",
    income: { min: 8000, max: 14000 },
    yearsToHarvest: 2,
    storageDays: 5,
    waterNeed: "low",
    saltTolerance: "high",
    soilPreference: "any",
    exportPotential: "low",
    mechanization: 1,
    goodForBackyard: true,
    recommendedVarieties: ["Brown Turkey", "Mahalliy navlar"],
    recommendedRootstocks: ["Anjir o'zi"],
    selfPollinatingOptions: ["Barchasi"],
  },
  {
    id: "pomegranate",
    income: { min: 8000, max: 15000 },
    yearsToHarvest: 3,
    storageDays: 90,
    waterNeed: "low",
    saltTolerance: "high",
    soilPreference: "carbonate",
    exportPotential: "high",
    mechanization: 2,
    goodForBackyard: true,
    recommendedVarieties: [
      "Eslatma: Norchontol o'zi etishtirmaydi, ishonchli sherikdan topib beradi",
    ],
    recommendedRootstocks: [],
    selfPollinatingOptions: ["Barchasi"],
  },
];

export function getFruitMeta(id: FruitId): FruitMeta | undefined {
  return FRUITS.find((f) => f.id === id);
}
