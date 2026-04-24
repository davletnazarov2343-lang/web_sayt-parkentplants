export const BRAND = {
  name: "Parkent Plants",
  foundedYear: 2002,
  location: "Toshkent viloyati, Parkent tumani",
  domain: "parkentplants.uz",
} as const;

export const STATS = {
  yearsOfExperience: new Date().getFullYear() - BRAND.foundedYear,
  seedlingsPerYear: 500_000,
  varieties: 135,
  nurseries: 2,
} as const;

export const COLORS = {
  forest: {
    50: "#D8F3DC",
    100: "#B7E4C7",
    200: "#95D5B2",
    400: "#52B788",
    600: "#40916C",
    700: "#2D6A4F",
    900: "#1B4332",
  },
  gold: {
    100: "#E8D4A0",
    400: "#C9A961",
    700: "#8B6F47",
  },
  cream: {
    DEFAULT: "#FEFCF8",
    100: "#F5F1EA",
  },
  earth: {
    400: "#A8A39B",
    700: "#5A5A5A",
    900: "#1A1A1A",
  },
} as const;

export const LOCALES = ["uz", "ru"] as const;
export const DEFAULT_LOCALE = "uz";

export type Locale = (typeof LOCALES)[number];
