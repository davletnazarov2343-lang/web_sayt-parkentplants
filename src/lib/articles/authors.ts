/**
 * Maqola mualliflari.
 *
 * - `photo` (public/ ichidagi yo'l) va `bio` ixtiyoriy: bo'lsa maqola
 *   sahifasidagi muallif kartochkasida ko'rsatiladi, bo'lmasa — faqat ism
 *   (rasm o'rnida bosh harflar doirasi).
 * - Yangi muallif qo'shish: shu obyektga yangi kalit qo'shing — maqola JSON
 *   fayllaridagi "author" qiymati shu kalitlardan biri bo'lishi shart
 *   (validator tekshiradi).
 */

import type { Locale } from "@/lib/constants";

export type Author = {
  /** Ko'rsatiladigan ism (har til uchun) */
  name: Record<Locale, string>;
  /** Ixtiyoriy: rasm yo'li, masalan "/team/shuhrat.jpg" */
  photo?: string;
  /** Ixtiyoriy: qisqa tanishtiruv (har til uchun) */
  bio?: Partial<Record<Locale, string>>;
};

export const AUTHORS = {
  "shuhrat-abrorov": {
    name: { uz: "Shuhrat Abrorov", ru: "Шухрат Аброров" },
  },
} satisfies Record<string, Author>;

export type AuthorId = keyof typeof AUTHORS;

export function isAuthorId(value: unknown): value is AuthorId {
  return typeof value === "string" && Object.hasOwn(AUTHORS, value);
}

export function getAuthor(id: AuthorId): Author {
  return AUTHORS[id];
}

/** Ismning bosh harflari ("Shuhrat Abrorov" -> "SA"), avatar uchun. */
export function getInitials(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => Array.from(word)[0]?.toUpperCase() ?? "");
  return letters.join("");
}
