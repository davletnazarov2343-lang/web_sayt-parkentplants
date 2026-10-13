import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import {
  PRIVACY,
  PRIVACY_UPDATED,
  type PolicySection,
  type PolicyText,
} from "@/lib/legal/privacy";

/**
 * /uz/maxfiylik, /ru/maxfiylik — maxfiylik siyosati.
 * Meta ilovasi (App Review) "Privacy policy URL" va "Data deletion instructions URL"
 * (#malumotlarni-ochirish yoki #data-deletion) shu sahifaga ishora qiladi —
 * manzilni o'zgartirsangiz, Meta ilova sozlamalarini ham yangilang.
 */

type Props = { params: { locale: string } };

function pick(locale: string): PolicyText {
  return locale === "ru" ? PRIVACY.ru : PRIVACY.uz;
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const p = pick(locale);
  return {
    title: p.title,
    description: p.metaDescription,
    alternates: {
      canonical: `/${locale}/maxfiylik`,
      languages: {
        "uz-UZ": "/uz/maxfiylik",
        "ru-UZ": "/ru/maxfiylik",
        "x-default": "/uz/maxfiylik",
      },
    },
  };
}

function Section({ s }: { s: PolicySection }) {
  return (
    <section id={s.id} className="scroll-mt-32">
      <h2 className="font-serif text-xl font-semibold text-earth-900 sm:text-2xl">
        {s.title}
      </h2>
      {s.paragraphs?.map((t, i) => (
        <p key={`p${i}`} className="mt-3 leading-relaxed text-earth-700">
          {t}
        </p>
      ))}
      {s.bullets && (
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-earth-700 marker:text-forest-600">
          {s.bullets.map((t, i) => (
            <li key={`b${i}`}>{t}</li>
          ))}
        </ul>
      )}
      {s.after?.map((t, i) => (
        <p key={`a${i}`} className="mt-3 leading-relaxed text-earth-700">
          {t}
        </p>
      ))}
    </section>
  );
}

function Policy({ p, headingLevel }: { p: PolicyText; headingLevel: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <>
      <H
        className={
          headingLevel === 1
            ? "text-4xl font-serif font-bold leading-tight text-earth-900 sm:text-5xl"
            : "text-3xl font-serif font-bold leading-tight text-earth-900"
        }
      >
        {p.title}
      </H>
      <p className="mt-3 text-sm text-earth-500">
        {p.updatedLabel}: {PRIVACY_UPDATED}
      </p>
      {p.intro.map((t, i) => (
        <p key={i} className="mt-5 text-base leading-relaxed text-earth-700 sm:text-lg">
          {t}
        </p>
      ))}
      <div className="mt-10 space-y-10">
        {p.sections.map((s) => (
          <Section key={s.id} s={s} />
        ))}
      </div>
    </>
  );
}

export default function PrivacyPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const p = pick(locale);
  const homeLabel = locale === "ru" ? "Главная" : "Bosh sahifa";

  return (
    <article className="pt-28 pb-24 sm:pt-32 lg:pt-40">
      <Container size="narrow">
        <nav className="text-sm text-earth-500">
          <Link href={`/${locale}`} className="hover:text-forest-700">
            {homeLabel}
          </Link>
          <span className="mx-2 text-earth-300">/</span>
          <span className="font-medium text-earth-700">{p.title}</span>
        </nav>

        <div className="mt-8">
          <Policy p={p} headingLevel={1} />
        </div>

        {/* Meta App Review tekshiruvchilari va chet ellik hamkorlar uchun */}
        <div
          id="english"
          lang="en"
          className="mt-20 border-t border-earth-400/30 pt-12"
        >
          <Policy p={PRIVACY.en} headingLevel={2} />
        </div>
      </Container>
    </article>
  );
}
