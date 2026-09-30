import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import {
  Apple,
  CircleCheck,
  HelpCircle,
  Phone,
  Sprout,
  Store,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd, getFaqSchema } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { LeadForm } from "@/components/sections/LeadForm";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

type Props = { params: { locale: string } };

const BASE_URL = "https://parkentplants.uz";
const IMG_HERO = "/images/granny-smith/hero.jpg";
const IMG_CLUSTER = "/images/granny-smith/cluster.jpg";
const IMG_CLOSEUP = "/images/granny-smith/closeup.jpg";

const CALL_HREF = "tel:+998781131819";
const TELEGRAM_HREF = "https://t.me/+998995573800";
const TIKTOK_HREF = "https://www.tiktok.com/@fruit_house.uz";

// Kim uchun — kartalar tartibi tarjimadagi audience.items bilan bir xil
const AUDIENCE_ICONS: LucideIcon[] = [Apple, Store, Sprout];

const SOCIAL_LINKS: ReadonlyArray<{
  name: string;
  Icon: typeof TelegramIcon;
  href: string;
}> = [
  {
    name: "Telegram",
    Icon: TelegramIcon,
    href: "https://t.me/+Q2HYAuBIWn4wN2Vi",
  },
  {
    name: "Instagram",
    Icon: InstagramIcon,
    href: "https://www.instagram.com/shuhrat_abrorov/",
  },
  {
    name: "Facebook",
    Icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=61552782846741",
  },
  {
    name: "YouTube",
    Icon: YoutubeIcon,
    href: "https://www.youtube.com/@shuhrat_abrorov",
  },
];

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "grannySmithPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/granny-smith`,
      languages: {
        "uz-UZ": "/uz/granny-smith",
        "ru-UZ": "/ru/granny-smith",
        "x-default": "/uz/granny-smith",
      },
    },
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${BASE_URL}/${locale}/granny-smith`,
      images: [
        { url: IMG_HERO, width: 1080, height: 1080, alt: t("gallery.alt1") },
      ],
    },
  };
}

export default async function GrannySmithPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const lang = locale === "ru" ? "ru" : "uz";
  const t = await getTranslations({ locale, namespace: "grannySmithPage" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const homeLabel = locale === "ru" ? "Главная" : "Bosh sahifa";

  const audience = t.raw("audience.items") as { title: string; text: string }[];
  const specRows = t.raw("specs.rows") as { label: string; value: string }[];
  const advantages = t.raw("advantages.items") as string[];
  const faq = t.raw("faq.items") as { q: string; a: string }[];

  // BreadcrumbList — biz-haqimizda sahifasidagi uslubda
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb"),
        item: `${BASE_URL}/${locale}/granny-smith`,
      },
    ],
  };

  // Product — NARXSIZ (offers yo'q): faqat nom, tavsif, rasm, brend
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t("eyebrow"),
    description: t("metaDescription"),
    image: [IMG_HERO, IMG_CLUSTER, IMG_CLOSEUP].map((src) => `${BASE_URL}${src}`),
    brand: { "@type": "Brand", name: "Parkent Plants" },
  };

  const faqSchema = getFaqSchema(
    faq.map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />

      <article className="pt-28 pb-20 sm:pt-32 lg:pt-40">
        <Container size="default">
          {/* Breadcrumb */}
          <nav className="text-sm text-earth-700/70">
            <Link href={`/${locale}`} className="hover:text-forest-700">
              {homeLabel}
            </Link>
            <span className="mx-2 text-earth-400">/</span>
            <span className="text-earth-700 font-medium">
              {t("breadcrumb")}
            </span>
          </nav>

          {/* 1. Hero */}
          <header className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
                {t("eyebrow")}
              </p>
              <h1 className="mt-4 text-4xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight">
                {t("title")}
              </h1>
              <p className="mt-6 text-base text-earth-700 leading-relaxed sm:text-lg">
                {t("lead")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={CALL_HREF} variant="primary" size="lg">
                  <Phone className="h-4 w-4" />
                  {t("ctaCall")}
                </LinkButton>
                <LinkButton
                  href={TELEGRAM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                >
                  <TelegramIcon size={16} />
                  {t("ctaTelegram")}
                </LinkButton>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)] lg:max-w-none">
              <Image
                src={IMG_HERO}
                alt={t("gallery.alt1")}
                fill
                priority
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 576px, 100vw"
                className="object-cover"
              />
            </div>
          </header>

          {/* 2. Kim uchun */}
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("audience.title")}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {audience.map((item, i) => {
                const Icon = AUDIENCE_ICONS[i] ?? Apple;
                return (
                  <Card key={item.title} variant="bordered">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-700/10 text-forest-700">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-earth-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-earth-700">
                      {item.text}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* 3. Xususiyatlar */}
          <section className="mt-20">
            <ViewTracker eventKey="view_granny_smith" />
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("specs.title")}
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
              <dl className="divide-y divide-earth-400/25 rounded-2xl border border-earth-400/25 bg-cream px-5 sm:px-6">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-5 gap-4 py-3.5"
                  >
                    <dt className="col-span-2 text-xs font-semibold uppercase tracking-wide text-earth-700/70 sm:text-sm">
                      {row.label}
                    </dt>
                    <dd className="col-span-3 text-sm font-medium text-earth-900 sm:text-base">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50 lg:max-w-none">
                <Image
                  src={IMG_CLUSTER}
                  alt={t("gallery.alt2")}
                  fill
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 576px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* 4. Ustunliklar */}
          <section className="mt-20 rounded-2xl bg-forest-50 p-8 sm:p-10">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("advantages.title")}
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {advantages.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <CircleCheck
                    className="mt-0.5 h-5 w-5 shrink-0 text-forest-700"
                    strokeWidth={2}
                  />
                  <span className="text-base leading-relaxed text-earth-900">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Halol ogohlantirish */}
          <section
            role="note"
            className="mt-12 flex items-start gap-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8"
          >
            <TriangleAlert
              className="mt-1 h-6 w-6 shrink-0 text-amber-600"
              strokeWidth={2}
            />
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-900 sm:text-2xl">
                {t("warning.title")}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-amber-900/90 sm:text-lg">
                {t("warning.text")}
              </p>
            </div>
          </section>

          {/* 6. Galereya — closeup (rasm ichida logotip/telefon bor: kesmaymiz) */}
          <section className="mt-20">
            <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)]">
              <Image
                src={IMG_CLOSEUP}
                alt={t("gallery.alt3")}
                fill
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
          </section>

          {/* 7. FAQ */}
          <section className="mt-20 mx-auto max-w-4xl">
            <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
              {t("faq.title")}
            </h2>
            <div className="mt-6 space-y-4">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-earth-400/25 bg-cream-100 p-5 transition-colors hover:border-forest-400"
                >
                  <summary className="flex cursor-pointer items-start gap-3 text-base font-semibold text-earth-900 sm:text-lg">
                    <HelpCircle className="h-5 w-5 shrink-0 text-gold-700 mt-1" />
                    <span className="flex-1">{item.q}</span>
                    <span className="text-forest-700 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 pl-8 text-sm text-earth-700 leading-relaxed sm:text-base">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </Container>
      </article>

      {/* 8. Lid formasi */}
      <LeadForm
        locale={lang}
        source="granny-smith-lending"
        title={t("formTitle")}
      />

      {/* 9. Ijtimoiy tarmoqlar */}
      <section className="py-14">
        <Container size="narrow" className="text-center">
          <h2 className="font-serif text-xl font-semibold text-earth-900">
            {tFooter("socialTitle")}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {SOCIAL_LINKS.map(({ name, Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-earth-400/40 text-earth-700 transition-colors hover:border-forest-700 hover:text-forest-700"
              >
                <Icon size={18} />
              </a>
            ))}
            <a
              href={TIKTOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-earth-400/40 px-4 text-sm font-semibold text-earth-700 transition-colors hover:border-forest-700 hover:text-forest-700"
            >
              TikTok
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
