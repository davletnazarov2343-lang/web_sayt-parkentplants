/**
 * Mundarija (TOC): h2 bloklaridan id generatsiyasi.
 *
 * Id matndan hosil qilinadi (apostrof tashlanadi, kirill harflar lotinga
 * o'giriladi), takrorlansa `-2`, `-3` qo'shiladi. Natija tartibi bloklar
 * tartibi bilan bir xil. Sof funksiyalar — client komponent ham import qila
 * oladi (kontent registrini tortmaydi).
 */

import { stripInline } from "./inline";
import type { Block } from "./types";

export type TocItem = {
  id: string;
  /** Belgilarsiz sarlavha matni */
  text: string;
  number?: number;
  /** Bloklar massividagi o'rni — renderer id'ni shu bo'yicha topadi */
  blockIndex: number;
};

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  ў: "o",
  қ: "q",
  ғ: "g",
  ҳ: "h",
};

const MAX_ID_LENGTH = 60;

export function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    // Kirill avval o'giriladi: NFKD "й" ni "и" ga aylantirib yuborardi
    .replace(/[а-яёўқғҳ]/g, (ch) => CYRILLIC_TO_LATIN[ch] ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    // o'simlik / o‘simlik / oʻsimlik / o`simlik -> osimlik
    .replace(/['’‘ʻʼ`´]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (base.length <= MAX_ID_LENGTH) return base;
  // So'z o'rtasida kesmaslik uchun oxirgi "-" gacha qisqartiramiz
  const cut = base.slice(0, MAX_ID_LENGTH);
  const lastDash = cut.lastIndexOf("-");
  return (lastDash > 20 ? cut.slice(0, lastDash) : cut).replace(/-+$/, "");
}

export function buildToc(blocks: ReadonlyArray<Block>): TocItem[] {
  const used = new Set<string>();
  const items: TocItem[] = [];

  blocks.forEach((block, blockIndex) => {
    if (block.type !== "h2") return;
    const text = stripInline(block.text).trim();
    const base = slugifyHeading(text) || `bolim-${items.length + 1}`;

    let id = base;
    let suffix = 2;
    while (used.has(id)) {
      id = `${base}-${suffix}`;
      suffix += 1;
    }
    used.add(id);

    items.push({ id, text, number: block.number, blockIndex });
  });

  return items;
}
