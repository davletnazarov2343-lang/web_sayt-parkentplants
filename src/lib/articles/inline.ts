/**
 * Inline matn tahlili: `**qalin**` va `*kursiv*`.
 *
 * Sof funksiyalar (React yo'q) — server/client/validator hammasi ishlata oladi.
 * Aniq `*` belgisi kerak bo'lsa — `\*`.
 * Belgilar "almashtirib turish" (toggle) usulida ishlaydi: `**` — qalinni
 * yoqadi/o'chiradi, `*` — kursivni. Oxirida biri yoqilgan qolsa — matn
 * noto'g'ri (juftlanmagan belgi) hisoblanadi.
 */

export type InlineSegment = {
  text: string;
  bold: boolean;
  italic: boolean;
};

export type ParsedInline = {
  segments: InlineSegment[];
  /** Barcha `**` va `*` belgilari juftlashganmi */
  balanced: boolean;
};

export function parseInline(input: string): ParsedInline {
  const segments: InlineSegment[] = [];
  let bold = false;
  let italic = false;
  let buffer = "";

  const flush = () => {
    if (buffer) {
      segments.push({ text: buffer, bold, italic });
      buffer = "";
    }
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "\\" && input[i + 1] === "*") {
      buffer += "*";
      i += 1;
      continue;
    }
    if (ch === "*") {
      flush();
      if (input[i + 1] === "*") {
        bold = !bold;
        i += 1;
      } else {
        italic = !italic;
      }
      continue;
    }
    buffer += ch;
  }
  flush();

  return { segments, balanced: !bold && !italic };
}

/**
 * Belgilarsiz oddiy matn (mundarija, so'z sanash, aria-label uchun).
 * Qator uzilishlari ("\n") bo'shliqqa aylanadi.
 */
export function stripInline(input: string): string {
  return parseInline(input)
    .segments.map((segment) => segment.text)
    .join("")
    .replace(/\s*\r?\n\s*/g, " ");
}
