import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { FounderMissions } from "@/components/founder/FounderMissions";
import { InstagramIcon, TelegramIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { buildMetadata } from "@/lib/seo/metadata";
import { FOUNDER, FOUNDER_SLUG, t } from "@/lib/founder";
import { BASE_URL, FOUNDER_ID } from "@/lib/schema/organization";
import type { Locale } from "@/sanity/types";

type Props = { params: { locale: string } };

const COPY = {
  uz: {
    metaTitle: "Shuhrat Abrorov — agronom va xalqaro bog'dorchilik konsultanti",
    metaDescription:
      "Shuhrat Abrorov: agronom, xalqaro konsultant, Parkent Plants sherigi. Kingsburg Orchards (AQSh) tajribasi, 30+ davlat bog'lari, ~20 kitob, Agronomlar maktabi, ~2 500 ga bog'larda konsultatsiya. Missiyalari va hayot yo'li.",
    home: "Bosh sahifa",
    timelineEyebrow: "Hayot yo'li",
    timelineTitle: "Marhamatdan Kaliforniyagacha — va qaytib O'zbekiston bog'lariga",
    galleryEyebrow: "Dala va dunyo",
    galleryTitle: "5 qit'adagi 30+ davlat bog'laridan O'zbekistonga",
    ctaTitle: "Bog'ingiz uchun Shuhrat akaning tajribasi",
    ctaText: "Nav tanlash, payvandtag va bog' loyihasi bo'yicha bepul maslahat oling.",
    cta: "Bepul maslahat olish",
    follow: "Kuzatib boring",
  },
  ru: {
    metaTitle: "Шухрат Аброров — агроном и международный консультант по садоводству",
    metaDescription:
      "Шухрат Аброров: агроном, международный консультант, партнёр Parkent Plants. Опыт Kingsburg Orchards (США), сады 30+ стран, ~20 книг, «Школа агрономов», консультирование ~2 500 га садов. Миссии и биография.",
    home: "Главная",
    timelineEyebrow: "Биография",
    timelineTitle: "От Мархамата до Калифорнии — и обратно в сады Узбекистана",
    galleryEyebrow: "Поле и мир",
    galleryTitle: "Из садов 30+ стран на 5 континентах — в Узбекистан",
    ctaTitle: "Опыт Шухрата ака — для вашего сада",
    ctaText: "Получите бесплатную консультацию по выбору сортов, подвоев и проекту сада.",
    cta: "Получить консультацию",
    follow: "Следите за нами",
  },
};

const SOCIAL = [
  { name: "YouTube", Icon: YoutubeIcon, href: "https://www.youtube.com/@shuhrat_abrorov" },
  { name: "Instagram", Icon: InstagramIcon, href: "https://www.instagram.com/shuhrat_abrorov/" },
  { name: "Telegram", Icon: TelegramIcon, href: "https://t.me/shuhrat_abrorov" },
];

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const c = COPY[locale as Locale];
  return buildMetadata({
    locale,
    path: FOUNDER_SLUG,
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

export default function FounderPage({ params: { locale: raw } }: Props) {
  unstable_setRequestLocale(raw);
  const locale = raw as Locale;
  const c = COPY[locale];
  const name = FOUNDER.name[locale];
  const pageUrl = `${BASE_URL}/${locale}${FOUNDER_SLUG}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${pageUrl}#page`,
      url: pageUrl,
      name: c.metaTitle,
      inLanguage: locale,
      mainEntity: { "@id": FOUNDER_ID },
      dateModified: "2026-11-02",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.home, item: `${BASE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

      {/* ===== Hero — to'q yashil ===== */}
      <section className="relative overflow-hidden bg-forest-900 pb-20 pt-32 text-cream sm:pt-36 lg:pb-24 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-forest-700/40 blur-3xl" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
        <Container className="relative">
          <nav className="text-sm text-cream-100/60">
            <Link href={`/${locale}`} className="hover:text-gold-400">{c.home}</Link>
            <span className="mx-2 text-cream-100/30">/</span>
            <span className="text-cream-100/90">{name}</span>
          </nav>

          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <ul className="flex flex-wrap gap-2">
                {FOUNDER.roles[locale].map((r) => (
                  <li key={r} className="rounded-full border border-gold-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
                    {r}
                  </li>
                ))}
              </ul>
              <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">{name}</h1>
              <figure className="mt-8 flex gap-4">
                <Quote className="h-8 w-8 shrink-0 text-gold-400" strokeWidth={1.25} aria-hidden="true" />
                <blockquote className="font-serif text-2xl italic leading-snug text-cream-100 sm:text-3xl">
                  {FOUNDER.quote[locale]}
                </blockquote>
              </figure>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream-100/75 lg:text-lg">{FOUNDER.intro[locale]}</p>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-gold-400/30 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]">
                <Image
                  src="/team/shuhrat/seminar.jpg"
                  alt={name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover object-[35%_center]"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 w-32 overflow-hidden rounded-2xl ring-8 ring-forest-900 sm:w-40">
                <div className="relative aspect-square">
                  <Image src="/team/shuhrat/olma-bogi.jpg" alt={FOUNDER.gallery[3].caption[locale]} fill sizes="160px" className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-100/10 bg-cream-100/10 lg:grid-cols-5">
            {FOUNDER.stats.map((s) => (
              <div key={s.value} className="bg-forest-900 px-5 py-6 last:col-span-2 lg:last:col-span-1">
                <dt className="sr-only">{s.label[locale]}</dt>
                <dd>
                  <span className="block font-serif text-3xl font-semibold text-gold-400">{s.value}</span>
                  <span className="mt-1 block text-sm text-cream-100/70">{s.label[locale]}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ===== Hayot yo'li ===== */}
      <section className="bg-cream py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-600">{c.timelineEyebrow}</p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-earth-900 sm:text-4xl">{c.timelineTitle}</h2>
                <div className="relative mt-8 hidden aspect-video overflow-hidden rounded-2xl lg:block">
                  <Image src="/team/shuhrat/bogda-mutaxassislar.jpg" alt={FOUNDER.gallery[2].caption[locale]} fill sizes="400px" className="object-cover" />
                </div>
              </div>
            </div>
            <ol className="relative lg:col-span-8">
              <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-gold-400 via-forest-700/30 to-gold-400" />
              {FOUNDER.timeline.map((item, i) => {
                const last = i === FOUNDER.timeline.length - 1;
                return (
                  <li key={i} className="relative pb-10 pl-10 last:pb-0">
                    <span
                      aria-hidden="true"
                      className={
                        last
                          ? "absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full bg-gold-400 ring-4 ring-gold-400/25"
                          : "absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-gold-400 bg-cream"
                      }
                    />
                    <p className="font-serif text-lg font-semibold text-gold-700">{t(item.year, locale)}</p>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-earth-900">{item.title[locale]}</h3>
                    <p className="mt-2 leading-relaxed text-earth-700">{item.text[locale]}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <FounderMissions locale={locale} />

      {/* ===== Galereya ===== */}
      <section className="bg-cream-100 py-20 lg:py-28">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest-600">{c.galleryEyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight text-earth-900 sm:text-4xl">{c.galleryTitle}</h2>
          <ul className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-3">
            {FOUNDER.gallery.map((g) => (
              <li
                key={g.src}
                className={`group relative overflow-hidden rounded-2xl ${g.wide ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <Image
                  src={g.src}
                  alt={`${name} — ${g.caption[locale]}`}
                  fill
                  sizes={g.wide ? "(min-width: 1024px) 400px, 100vw" : "(min-width: 1024px) 400px, 50vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: g.wide || g.src.endsWith("seminar.jpg") ? "center" : "center 72%" }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/85 to-transparent p-4 pt-12">
                  <p className="text-sm font-medium text-cream">{g.caption[locale]}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-cream py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[28px] bg-forest-900 px-8 py-12 text-cream sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
            <div className="relative max-w-xl">
              <h2 className="font-serif text-3xl font-semibold">{c.ctaTitle}</h2>
              <p className="mt-3 text-cream-100/75">{c.ctaText}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-cream-100/60">{c.follow}</span>
                {SOCIAL.map(({ name: n, Icon, href }) => (
                  <a key={n} href={href} target="_blank" rel="noopener noreferrer" aria-label={n}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/20 text-cream-100/80 transition-colors hover:border-gold-400 hover:text-gold-400">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
            <Link
              href={`/${locale}#request`}
              className="group relative mt-8 inline-flex items-center gap-2 rounded-md bg-gold-400 px-7 py-4 font-semibold text-earth-900 transition-colors hover:bg-gold-100 lg:mt-0"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
