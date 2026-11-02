import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FounderMissions } from "@/components/founder/FounderMissions";
import { FOUNDER, FOUNDER_SLUG } from "@/lib/founder";
import type { Locale } from "@/sanity/types";

const COPY = {
  uz: { eyebrow: "Asoschi va ekspert", years: "yil tajriba", more: "Shuhrat Abrorov haqida batafsil" },
  ru: { eyebrow: "Основатель и эксперт", years: "лет опыта", more: "Подробнее о Шухрате Абророве" },
};

/** Bosh sahifa: Shuhrat Abrorov bloki + missiyalar lentasi */
export function CeoQuote() {
  const locale = useLocale() as Locale;
  const c = COPY[locale];
  const name = FOUNDER.name[locale];
  const [exp, ...stats] = FOUNDER.stats;

  return (
    <>
      <section id="ceo" className="relative overflow-hidden bg-cream py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
            {/* Rasm kollaji */}
            <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(27,67,50,0.55)]">
                <Image
                  src="/team/shuhrat/seminar.jpg"
                  alt={`${name} — ${FOUNDER.roles[locale][0]}`}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover object-[35%_center]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-900/40 via-transparent to-transparent" />
              </div>

              {/* Tajriba nishoni */}
              <div className="absolute -left-3 top-8 rounded-2xl bg-forest-900 px-5 py-4 text-cream shadow-xl sm:-left-6">
                <p className="font-serif text-3xl font-semibold text-gold-400">{exp.value}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-cream-100/80">{c.years}</p>
              </div>

              {/* Kichik rasm — bog'da */}
              <div className="absolute -bottom-8 -right-3 w-36 overflow-hidden rounded-2xl ring-8 ring-cream shadow-xl sm:-right-6 sm:w-44">
                <div className="relative aspect-square">
                  <Image
                    src="/team/shuhrat/gilos-bogi.jpg"
                    alt={FOUNDER.gallery[1].caption[locale]}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Matn */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-600">{c.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-earth-900 sm:text-5xl">
                {name}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {FOUNDER.roles[locale].map((r) => (
                  <li key={r} className="rounded-full border border-forest-700/20 bg-forest-50/60 px-3 py-1 text-xs font-semibold text-forest-700">
                    {r}
                  </li>
                ))}
              </ul>

              <figure className="mt-8 border-l-2 border-gold-400 pl-6">
                <Quote className="h-7 w-7 text-gold-400" strokeWidth={1.25} aria-hidden="true" />
                <blockquote className="mt-2 font-serif text-2xl font-medium leading-snug text-earth-900 sm:text-3xl text-balance">
                  &ldquo;{FOUNDER.quote[locale]}&rdquo;
                </blockquote>
              </figure>

              <p className="mt-7 text-base leading-relaxed text-earth-700 lg:text-lg">{FOUNDER.short[locale]}</p>

              <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-earth-400/25 bg-earth-400/25 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.value} className="bg-cream-100 px-4 py-5">
                    <dt className="sr-only">{s.label[locale]}</dt>
                    <dd>
                      <span className="block font-serif text-2xl font-semibold text-forest-700">{s.value}</span>
                      <span className="mt-1 block text-xs leading-snug text-earth-700">{s.label[locale]}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/${locale}${FOUNDER_SLUG}`}
                className="group mt-9 inline-flex items-center gap-2 rounded-md bg-forest-900 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-700"
              >
                {c.more}
                <ArrowRight className="h-4 w-4 text-gold-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <FounderMissions locale={locale} />
    </>
  );
}
