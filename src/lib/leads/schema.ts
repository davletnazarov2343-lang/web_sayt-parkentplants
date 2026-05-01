import { z } from "zod";

/**
 * Form bilan API o'rtasidagi shartnoma. Bir joyda — ham client ham server validate qiladi.
 */

export const FRUIT_TYPE_KEYS = [
  "apple",
  "peach",
  "cherry",
  "apricot",
  "pear",
  "plum",
  "quince",
  "walnut",
  "other",
] as const;

export const REGION_KEYS = [
  "tashkent",
  "andijan",
  "fergana",
  "namangan",
  "syrdarya",
  "jizzakh",
  "samarkand",
  "bukhara",
  "navoi",
  "kashkadarya",
  "surkhandarya",
  "khorezm",
  "karakalpakstan",
  "export",
] as const;

export const VOLUME_PLAN_KEYS = [
  "500-2000",
  "2001-10000",
  "10001-50000",
  "50000+",
  "undecided",
] as const;

export const LOCALE_KEYS = ["uz", "ru"] as const;

// O'zbek/xalqaro telefon: +998 XX XXX XX XX yoki minimal +<digits>{7,15}
const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "min").max(120, "max"),
  phone: z
    .string()
    .trim()
    .min(7, "min")
    .max(20, "max")
    .regex(phoneRegex, "format"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  region: z.enum(REGION_KEYS).optional(),
  fruitTypes: z.array(z.enum(FRUIT_TYPE_KEYS)).max(10).default([]),
  volumePlan: z.enum(VOLUME_PLAN_KEYS).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "consent" }),
  locale: z.enum(LOCALE_KEYS).default("uz"),

  // Anti-spam: bu maydon to'ldirilgan bo'lsa — bot
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type FruitTypeKey = (typeof FRUIT_TYPE_KEYS)[number];
export type RegionKey = (typeof REGION_KEYS)[number];
export type VolumePlanKey = (typeof VOLUME_PLAN_KEYS)[number];
