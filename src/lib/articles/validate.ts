/**
 * Maqola JSON'ining runtime validatori (build vaqtida registr yuklanganda
 * ishlaydi). Noto'g'ri shaklda aniq xato tashlaydi: qaysi fayl, qaysi joy
 * (masalan `uz.blocks[3].items[1]`) va nima noto'g'ri.
 *
 * Sxema `types.ts` da. Noma'lum kalitlar ham xato (imlo xatolarini ushlash
 * uchun); "_" yoki "$" bilan boshlanadigan kalitlar izoh sifatida e'tiborsiz.
 */

import { AUTHORS, isAuthorId } from "./authors";
import { parseInline } from "./inline";
import {
  ARTICLE_TOPICS,
  CALLOUT_TONES,
  type Article,
  type ArticleContent,
  type Block,
  type CalloutTone,
  type Inline,
} from "./types";

export class ArticleValidationError extends Error {
  constructor(file: string, path: string, problem: string) {
    super(`[maqola] ${file} — ${path}: ${problem}`);
    this.name = "ArticleValidationError";
  }
}

type Where = { file: string; path: string };

function fail(where: Where, problem: string): never {
  throw new ArticleValidationError(where.file, where.path, problem);
}

function at(where: Where, suffix: string): Where {
  return { file: where.file, path: `${where.path}${suffix}` };
}

function typeName(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "massiv";
  switch (typeof value) {
    case "string":
      return "satr";
    case "number":
      return "son";
    case "boolean":
      return "mantiqiy qiymat";
    case "object":
      return "obyekt";
    default:
      return typeof value;
  }
}

function asObject(value: unknown, where: Where): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(where, `obyekt kutilgan, ${typeName(value)} topildi`);
  }
  return value as Record<string, unknown>;
}

function asArray(value: unknown, where: Where): unknown[] {
  if (!Array.isArray(value)) {
    fail(where, `massiv kutilgan, ${typeName(value)} topildi`);
  }
  return value;
}

function checkKeys(
  obj: Record<string, unknown>,
  allowed: readonly string[],
  where: Where,
): void {
  for (const key of Object.keys(obj)) {
    if (key.startsWith("_") || key.startsWith("$")) continue;
    if (!allowed.includes(key)) {
      fail(
        at(where, `.${key}`),
        `noma'lum kalit (ruxsat etilganlar: ${allowed.join(", ")})`,
      );
    }
  }
}

function plainString(value: unknown, where: Where): string {
  if (typeof value !== "string") {
    fail(where, `satr kutilgan, ${typeName(value)} topildi`);
  }
  if (value.trim() === "") fail(where, "bo'sh bo'lmasligi kerak");
  return value;
}

function inline(value: unknown, where: Where): Inline {
  const text = plainString(value, where);
  if (!parseInline(text).balanced) {
    const preview = text.length > 70 ? `${text.slice(0, 70)}…` : text;
    fail(
      where,
      `"**" yoki "*" belgisi juftlashmagan (aniq yulduzcha kerak bo'lsa "\\*" yozing): "${preview}"`,
    );
  }
  return text;
}

function optionalInline(
  obj: Record<string, unknown>,
  key: string,
  where: Where,
): Inline | undefined {
  if (obj[key] === undefined) return undefined;
  return inline(obj[key], at(where, `.${key}`));
}

function inlineList(value: unknown, where: Where): Inline[] {
  const list = asArray(value, where);
  if (list.length === 0) fail(where, "kamida bitta element kerak");
  return list.map((item, i) => inline(item, at(where, `[${i}]`)));
}

function validateBlock(raw: unknown, where: Where): Block {
  const obj = asObject(raw, where);
  const type = obj.type;
  const text = (key: string) => inline(obj[key], at(where, `.${key}`));

  switch (type) {
    case "h2": {
      checkKeys(obj, ["type", "text", "number"], where);
      const block: Block = { type: "h2", text: text("text") };
      if (obj.number !== undefined) {
        const n = obj.number;
        if (typeof n !== "number" || !Number.isInteger(n) || n < 1) {
          fail(at(where, ".number"), "musbat butun son kutilgan");
        }
        block.number = n;
      }
      return block;
    }
    case "h3":
    case "p": {
      checkKeys(obj, ["type", "text"], where);
      return { type, text: text("text") };
    }
    case "ul":
    case "ol": {
      checkKeys(obj, ["type", "items", "label"], where);
      const block: Block = {
        type,
        items: inlineList(obj.items, at(where, ".items")),
      };
      const label = optionalInline(obj, "label", where);
      if (label !== undefined) block.label = label;
      return block;
    }
    case "table": {
      checkKeys(obj, ["type", "head", "rows", "caption"], where);
      const head = inlineList(obj.head, at(where, ".head"));
      const rowsWhere = at(where, ".rows");
      const rawRows = asArray(obj.rows, rowsWhere);
      if (rawRows.length === 0) fail(rowsWhere, "kamida bitta qator kerak");
      const rows = rawRows.map((rawRow, r) => {
        const rowWhere = at(rowsWhere, `[${r}]`);
        const row = inlineList(rawRow, rowWhere);
        if (row.length !== head.length) {
          fail(
            rowWhere,
            `ustunlar soni sarlavhadagidek (${head.length}) bo'lishi kerak, ${row.length} topildi`,
          );
        }
        return row;
      });
      const block: Block = { type: "table", head, rows };
      const caption = optionalInline(obj, "caption", where);
      if (caption !== undefined) block.caption = caption;
      return block;
    }
    case "callout": {
      checkKeys(
        obj,
        ["type", "tone", "title", "text", "items", "ordered"],
        where,
      );
      const tone = obj.tone;
      if (!CALLOUT_TONES.includes(tone as CalloutTone)) {
        fail(
          at(where, ".tone"),
          `${CALLOUT_TONES.join(" | ")} dan biri kutilgan, ${JSON.stringify(tone)} topildi`,
        );
      }
      const block: Block = { type: "callout", tone: tone as CalloutTone };
      const title = optionalInline(obj, "title", where);
      const body = optionalInline(obj, "text", where);
      if (title !== undefined) block.title = title;
      if (body !== undefined) block.text = body;
      if (obj.items !== undefined) {
        block.items = inlineList(obj.items, at(where, ".items"));
      }
      if (obj.ordered !== undefined) {
        if (typeof obj.ordered !== "boolean") {
          fail(
            at(where, ".ordered"),
            `true yoki false kutilgan, ${typeName(obj.ordered)} topildi`,
          );
        }
        block.ordered = obj.ordered;
      }
      if (!block.title && !block.text && !block.items) {
        fail(where, "callout'da title, text yoki items'dan kamida bittasi kerak");
      }
      return block;
    }
    case "signature": {
      checkKeys(obj, ["type", "lines"], where);
      return {
        type: "signature",
        lines: inlineList(obj.lines, at(where, ".lines")),
      };
    }
    default:
      return fail(
        at(where, ".type"),
        `noma'lum blok turi ${JSON.stringify(type)} (ruxsat etilganlar: h2, h3, p, ul, ol, table, callout, signature)`,
      );
  }
}

function validateContent(raw: unknown, where: Where): ArticleContent {
  const obj = asObject(raw, where);
  checkKeys(obj, ["title", "summary", "blocks"], where);
  const title = plainString(obj.title, at(where, ".title"));
  const summary = plainString(obj.summary, at(where, ".summary"));
  const blocksWhere = at(where, ".blocks");
  const rawBlocks = asArray(obj.blocks, blocksWhere);
  if (rawBlocks.length === 0) fail(blocksWhere, "kamida bitta blok kerak");
  const blocks = rawBlocks.map((block, i) =>
    validateBlock(block, at(blocksWhere, `[${i}]`)),
  );
  return { title, summary, blocks };
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function isRealDate(iso: string): boolean {
  const match = DATE_PATTERN.exec(iso);
  if (!match) return false;
  const [year, month, day] = [match[1], match[2], match[3]].map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * @param raw   JSON'dan o'qilgan qiymat
 * @param file  fayl nomi (masalan "tuproq-tanlash.json") — xato matni va
 *              slug mosligini tekshirish uchun
 */
export function validateArticle(raw: unknown, file: string): Article {
  const root: Where = { file, path: "(ildiz)" };
  const obj = asObject(raw, root);
  checkKeys(
    obj,
    [
      "slug",
      "topic",
      "order",
      "publishedAt",
      "author",
      "cover",
      "pdf",
      "uz",
      "ru",
    ],
    root,
  );

  const slugWhere = at({ file, path: "" }, "slug");
  const slug = plainString(obj.slug, slugWhere);
  if (!SLUG_PATTERN.test(slug)) {
    fail(
      slugWhere,
      `faqat kichik lotin harf, raqam va "-" bo'lishi kerak: ${JSON.stringify(slug)}`,
    );
  }
  const expectedSlug = file.replace(/\.json$/i, "");
  if (slug !== expectedSlug) {
    fail(
      slugWhere,
      `slug fayl nomiga mos emas: fayl "${expectedSlug}", slug "${slug}"`,
    );
  }

  const topic = obj.topic;
  if (!ARTICLE_TOPICS.includes(topic as Article["topic"])) {
    fail(
      at({ file, path: "" }, "topic"),
      `${ARTICLE_TOPICS.join(" | ")} dan biri kutilgan, ${JSON.stringify(topic)} topildi`,
    );
  }

  const order = obj.order;
  if (typeof order !== "number" || !Number.isFinite(order)) {
    fail(
      at({ file, path: "" }, "order"),
      `son kutilgan, ${typeName(order)} topildi`,
    );
  }

  const publishedAt = plainString(
    obj.publishedAt,
    at({ file, path: "" }, "publishedAt"),
  );
  if (!isRealDate(publishedAt)) {
    fail(
      at({ file, path: "" }, "publishedAt"),
      `haqiqiy sana "YYYY-MM-DD" ko'rinishida kutilgan, ${JSON.stringify(publishedAt)} topildi`,
    );
  }

  const author = obj.author;
  if (!isAuthorId(author)) {
    fail(
      at({ file, path: "" }, "author"),
      `${Object.keys(AUTHORS).join(" | ")} dan biri kutilgan, ${JSON.stringify(author)} topildi (yangi muallif: src/lib/articles/authors.ts)`,
    );
  }

  const article: Article = {
    slug,
    topic: topic as Article["topic"],
    order,
    publishedAt,
    author,
    uz: validateContent(obj.uz, at({ file, path: "" }, "uz")),
    ru: validateContent(obj.ru, at({ file, path: "" }, "ru")),
  };

  if (obj.cover !== undefined) {
    const coverWhere = at({ file, path: "" }, "cover");
    const cover = plainString(obj.cover, coverWhere);
    if (!cover.startsWith("/")) {
      fail(
        coverWhere,
        `"/" bilan boshlanishi kerak (masalan "/images/maqolalar/rasm.jpg"): ${JSON.stringify(cover)}`,
      );
    }
    article.cover = cover;
  }

  if (obj.pdf !== undefined) {
    const pdfWhere = at({ file, path: "" }, "pdf");
    const pdf = plainString(obj.pdf, pdfWhere);
    if (!pdf.startsWith("/") || !/\.pdf$/i.test(pdf)) {
      fail(
        pdfWhere,
        `"/" bilan boshlanib ".pdf" bilan tugashi kerak (masalan "/maqolalar/fayl.pdf"): ${JSON.stringify(pdf)}`,
      );
    }
    article.pdf = pdf;
  }

  return article;
}
