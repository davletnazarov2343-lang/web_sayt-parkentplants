import { Fragment, type ReactNode } from "react";
import { parseInline } from "@/lib/articles/inline";

/** Matndagi "\n" ni <br /> ga aylantiradi (React tugunlari massivi). */
function withLineBreaks(text: string): ReactNode {
  const parts = text.split(/\r?\n/);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i === 0 ? [part] : [<br key={`br-${i}`} />, part],
  );
}

/**
 * Inline matnni (`**qalin**`, `*kursiv*`, `\n` qator uzilishi) React
 * tugunlariga aylantiradi. Xom HTML ishlatilmaydi — matn har doim React
 * tomonidan escape qilinadi.
 */
export function InlineText({ text }: { text: string }) {
  const { segments } = parseInline(text);

  return (
    <>
      {segments.map((segment, i) => {
        let node: ReactNode = withLineBreaks(segment.text);
        if (segment.italic) node = <em>{node}</em>;
        if (segment.bold) node = <strong className="font-semibold">{node}</strong>;
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}
