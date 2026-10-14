/**
 * O'qish vaqti: so'zlar soni / 200 (daqiqada), yuqoriga yaxlitlanadi, kamida 1.
 */

import { stripInline } from "./inline";
import type { ArticleContent, Block } from "./types";

const WORDS_PER_MINUTE = 200;

function blockTexts(block: Block): string[] {
  switch (block.type) {
    case "h2":
    case "h3":
    case "p":
      return [block.text];
    case "ul":
    case "ol":
      return [...(block.label ? [block.label] : []), ...block.items];
    case "table":
      return [
        ...(block.caption ? [block.caption] : []),
        ...block.head,
        ...block.rows.flat(),
      ];
    case "callout":
      return [
        ...(block.title ? [block.title] : []),
        ...(block.text ? [block.text] : []),
        ...(block.items ?? []),
      ];
    case "signature":
      // Imzo o'qish vaqtiga ta'sir qilmaydi
      return [];
  }
}

export function countWords(content: ArticleContent): number {
  const texts = [content.title, ...content.blocks.flatMap(blockTexts)];
  return texts.reduce((sum, raw) => {
    const words = stripInline(raw).split(/\s+/).filter(Boolean);
    return sum + words.length;
  }, 0);
}

export function readingMinutes(content: ArticleContent): number {
  return Math.max(1, Math.ceil(countWords(content) / WORDS_PER_MINUTE));
}
