/**
 * Maqola ma'lumot sxemasi.
 *
 * Har maqola — `src/content/articles/<slug>.json` (fayl nomi = slug).
 * Shakl `validate.ts` da build vaqtida tekshiriladi.
 */

import type { AuthorId } from "./authors";

export type { AuthorId };

export const ARTICLE_TOPICS = [
  "tuproq",
  "olma",
  "nok",
  "gilos",
  "orik",
] as const;
export type ArticleTopic = (typeof ARTICLE_TOPICS)[number];

export const ARTICLE_LOCALES = ["uz", "ru"] as const;
export type ArticleLocale = (typeof ARTICLE_LOCALES)[number];

/**
 * Inline matn: oddiy satr. Ichida faqat `**qalin**` va `*kursiv*` belgilari
 * bo'lishi mumkin. Aniq `*` belgisi kerak bo'lsa — `\*` deb yozing.
 * Satr ichidagi `\n` (JSON'da "\n") qator uzilishi sifatida chiqadi.
 */
export type Inline = string;

export const CALLOUT_TONES = ["tip", "info", "warning"] as const;
export type CalloutTone = (typeof CALLOUT_TONES)[number];

export type H2Block = {
  type: "h2";
  text: Inline;
  /** Bo'lim raqami — berilsa, sarlavha oldida raqamli nishon chiqadi */
  number?: number;
};
export type H3Block = { type: "h3"; text: Inline };
export type ParagraphBlock = { type: "p"; text: Inline };
export type ListBlock = {
  type: "ul" | "ol";
  items: Inline[];
  /** Ro'yxat ustidagi kichik sarlavha, masalan "Mohiyati:" */
  label?: Inline;
};
export type TableBlock = {
  type: "table";
  head: Inline[];
  rows: Inline[][];
  caption?: Inline;
};
export type CalloutBlock = {
  type: "callout";
  tone: CalloutTone;
  title?: Inline;
  text?: Inline;
  items?: Inline[];
  /** items raqamlangan ro'yxatmi (ol) yoki oddiy (ul) */
  ordered?: boolean;
};

/** Maqola oxiridagi muallif imzosi: o'ngga tekislangan, har qator alohida */
export type SignatureBlock = {
  type: "signature";
  lines: Inline[];
};

export type Block =
  | H2Block
  | H3Block
  | ParagraphBlock
  | ListBlock
  | TableBlock
  | CalloutBlock
  | SignatureBlock;

export type BlockType = Block["type"];

export type ArticleContent = {
  title: string;
  summary: string;
  blocks: Block[];
};

export type Article = {
  slug: string;
  topic: ArticleTopic;
  /** Kichik raqam = ro'yxatda tepada */
  order: number;
  /** YYYY-MM-DD */
  publishedAt: string;
  author: AuthorId;
  /**
   * Alohida muqova rasmi (public/ ichidagi yo'l), masalan
   * "/images/maqolalar/tuproq-namuna.jpg". Berilmasa — mavzu rasmi
   * (`getTopicCover`), u ham yo'q bo'lsa — gradient + SVG.
   */
  cover?: string;
  /** Asl hujjat, masalan "/maqolalar/<fayl>.pdf" (public/ ichida) */
  pdf?: string;
  uz: ArticleContent;
  ru: ArticleContent;
};
