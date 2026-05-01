/**
 * GROQ query natijalarining TypeScript turlari.
 * Schema va query'lar bilan qo'lda sinxron tutiladi.
 */

import type { Image } from "sanity";

export type LocalizedString = {
  uz: string;
  ru: string;
};

export type LocalizedText = {
  uz?: string;
  ru?: string;
};

export type Locale = "uz" | "ru";

export type FruitTypeSlug = string;

export type FruitTypeListItem = {
  _id: string;
  slug: FruitTypeSlug;
  name: LocalizedString;
  emoji?: string;
  shortDescription?: LocalizedText;
  varietyCount: number;
};

export type FruitTypeRef = {
  _id?: string;
  slug: FruitTypeSlug;
  name: LocalizedString;
  emoji?: string;
};

export type VarietyStatus = "active" | "upcoming" | "archived";

export type VarietyTreeSize = "small" | "medium" | "large";

export type VarietyCard = {
  _id: string;
  slug: string;
  name: LocalizedString;
  status: VarietyStatus;
  featured: boolean;
  ripeningTime?: LocalizedString;
  exportable?: boolean;
  coverImage?: Image & { alt?: string };
  fruitType: FruitTypeRef;
};

export type VarietyDetail = VarietyCard & {
  description?: LocalizedText;
  treeSize?: VarietyTreeSize;
  yieldKgPerTree?: number;
  origin?: LocalizedString;
  certifications?: string[];
  characteristicsExtra?: LocalizedText;
  gallery?: Array<Image & { alt?: string }>;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedText;
};

export type AllVarietySlugsResult = Array<{
  slug: string;
  fruitTypeSlug: string;
}>;

export type AllFruitTypeSlugsResult = Array<{ slug: string }>;
