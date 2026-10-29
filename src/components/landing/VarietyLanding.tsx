import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Anchor,
  Apple,
  ArrowRight,
  Bug,
  CalendarClock,
  CircleCheck,
  Droplets,
  HelpCircle,
  Phone,
  ShieldCheck,
  Sprout,
  Store,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  JsonLd,
  getFaqSchema,
  getVideoObjectSchema,
} from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { LeadForm } from "@/components/sections/LeadForm";
import { LandingVideo } from "@/components/landing/LandingVideo";
import { LeadFormLink } from "@/components/landing/LeadFormLink";
import { StickyBar } from "@/components/landing/StickyBar";
import { TrackedLinkButton } from "@/components/landing/TrackedLinkButton";
import { LandingRelatedLinks } from "@/components/links/LandingRelatedLinks";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import type { VarietyLandingConfig } from "@/lib/landings";

const BASE_URL = "https://parkentplants.uz";

const CALL_HREF = "tel:+998781131819";
const TELEGRAM_HREF = "https://t.me/+998995573800";
const TIKTOK_HREF = "https://www.tiktok.com/@fruit_house.uz";

// Kim uchun — kartalar tartibi tarjimadagi audience.items bilan bir xil
const AUDIENCE_ICONS: LucideIcon[] = [Apple, Store, Sprout];

// Payvandtag bo'limi (ixtiyoriy) — kartalar tartibi tarjimadagi rootstock.items bilan bir xil
const ROOTSTOCK_ICONS: LucideIcon[] = [
  Anchor,
  Droplets,
  Bug,
  Sprout,
  ShieldCheck,
];

// Ustunlik: oddiy matn yoki sarlavhali ({ title, text }) — ikkalasi ham qo'llanadi
type AdvantageItem = string | { title: string; text: string };

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

/**
 * Xususiyat qiymatida `specLinks` matni bo'lsa — o'sha bo'lakni lending'ga
 * havola qiladi (birinchi uchragan joy). Bo'lmasa qiymat o'zgarmaydi.
 */
function renderSpecValue(
  value: string,
  locale: string,
  links: VarietyLandingConfig["specLinks"],
) {
  if (!links) return value;
  for (const link of links) {
    const idx = value.indexOf(link.text);
    if (idx === -1) continue;
    return (
      <>
        {value.slice(0, idx)}
        <Link
          href={`/${locale}/${link.slug}`}
          className="font-semibold text-forest-700 underline decoration-forest-400/60 underline-offset-2 transition-colors hover:text-forest-900"
        >
          {link.text}
        </Link>
        {value.slice(idx + link.text.length)}
      </>
    );
  }
  return value;
}

/**
 * Nav lending sahifasi (Granny Smith, Devil Gala, ...) — bitta umumiy tuzilma.
 * Matnlar `config.namespace` dagi tarjimalardan olinadi. Server komponent.
 * `unstable_setRequestLocale(locale)` ni sahifa (page.tsx) chaqiradi.
 */
export async function VarietyLanding({
  config,
  locale,
}: {
  config: VarietyLandingConfig;
  locale: string;
}) {
  const lang = locale === "ru" ? "ru" : "uz";
  const t = await getTranslations({ locale, namespace: config.namespace });
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const homeLabel = locale === "ru" ? "Главная" : "Bosh sahifa";

  const { hero: IMG_HERO, cluster: IMG_CLUSTER, closeup: IMG_CLOSEUP } =
    config.images;
  const extraGallery = config.extraGallery ?? [];
  const pageUrl = `${BASE_URL}/${locale}/${config.slug}`;
  const video = config.video;

  // "Kim uchun" bo'limi ixtiyoriy (config.audience === false — tarjimada ham shart emas)
  const showAudience = config.audience !== false;
  const audience = showAudience
    ? (t.raw("audience.items") as { title: string; text: string }[])
    : [];
  const heroFacts = config.heroFacts ? (t.raw("heroFacts") as string[]) : [];
  const specRows = t.raw("specs.rows") as { label: string; value: string }[];
  const advantages = t.raw("advantages.items") as AdvantageItem[];
  const rootstock = config.rootstockSection
    ? (t.raw("rootstock.items") as { title: string; text: string }[])
    : [];
  const faq = t.raw("faq.items") as { q: string; a: string }[];

  // "Hozir bor / oldindan buyurtma" kartalari (ixtiyoriy)
  const offers = config.offers
    ? {
        title: t("offers.title"),
        now: {
          badge: t("offers.now.badge"),
          title: t("offers.now.title"),
          text: t("offers.now.text"),
          cta: t("offers.now.cta"),
        },
        preorder: {
          badge: t("offers.preorder.badge"),
          title: t("offers.preorder.title"),
          text: t("offers.preorder.text"),
          cta: t("offers.preorder.cta"),
        },
      }
    : null;

  // Lid formasi manba tanlovi (ixtiyoriy) — yorliqlar `formOption.<value>` dan
  const sourceOptions = config.sourceOptions?.map((option) => ({
    value: option.value,
    label: t(`formOption.${option.value}`),
    source: option.source,
  }));

  // Galereya. Hero video bilan almashtirilgan bo'lsa, hero rasm shu yerga ko'chadi.
  // Alt'lar: hero = alt1, closeup = alt3, qo'shimcha rasmlar = alt4, alt5, ...
  // (alt2 — cluster rasmi, "Xususiyatlar" bo'limida).
  const galleryItems = [
    ...(video ? [{ src: IMG_HERO, alt: t("gallery.alt1") }] : []),
    { src: IMG_CLOSEUP, alt: t("gallery.alt3") },
    ...extraGallery.map((src, i) => ({
      src,
      alt: t(`gallery.alt${i + 4}`),
    })),
  ];

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
        item: pageUrl,
      },
    ],
  };

  // Product JSON-LD ataylab yo'q: lendinglarda narx ko'rsatilmaydi, narxsiz
  // Product Google "Product snippets" xatosini beradi (offers/review/rating kerak).

  const faqSchema = getFaqSchema(
    faq.map((item) => ({ question: item.q, answer: item.a })),
  );

  // Hero matni ikki bo'lakka bo'lingan: video variantda mobilda ular orasiga video tushadi.
  // Video variantda mobil sarlavha bir pog'ona kichik, CTA tugmalari to'liq kenglikda (ustma-ust).
  const heroIntro = (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
        {t("eyebrow")}
      </p>
      <h1
        className={
          video
            ? "mt-4 text-3xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight"
            : "mt-4 text-4xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight"
        }
      >
        {t("title")}
      </h1>
      <p className="mt-6 text-base text-earth-700 leading-relaxed sm:text-lg">
        {t("lead")}
      </p>
    </>
  );

  const heroExtras = (
    <>
      {/* Hero faktlar (ixtiyoriy): 3 chip + mavjudlik belgisi */}
      {config.heroFacts && (
        <>
          <ul className="mt-6 flex flex-wrap gap-2">
            {heroFacts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-forest-400/40 bg-forest-50/60 px-3.5 py-1.5 text-sm font-semibold text-forest-900"
              >
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-forest-700 px-4 py-2 text-sm font-semibold text-cream">
            <span
              aria-hidden="true"
              className="relative flex h-2.5 w-2.5 shrink-0"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-forest-200 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-forest-200" />
            </span>
            {t("availabilityBadge")}
          </p>
        </>
      )}

      {/* `data-hero-cta` — StickyBar shu tugmalar ko'rinib turganda yashirinadi */}
      <div
        data-hero-cta={config.stickyBar ? "" : undefined}
        className={
          video
            ? "mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            : "mt-8 flex flex-wrap gap-3"
        }
      >
        <TrackedLinkButton
          href={CALL_HREF}
          variant="primary"
          size="lg"
          className={video ? "w-full sm:w-auto" : undefined}
          event="contact_phone"
          source="landing_hero"
          landing={config.slug}
        >
          <Phone className="h-4 w-4" />
          {t("ctaCall")}
        </TrackedLinkButton>
        <TrackedLinkButton
          href={TELEGRAM_HREF}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="lg"
          className={video ? "w-full sm:w-auto" : undefined}
          event="contact_telegram"
          source="landing_hero"
          landing={config.slug}
        >
          <TelegramIcon size={16} />
          {t("ctaTelegram")}
        </TrackedLinkButton>
      </div>
    </>
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      {video && (
        <JsonLd
          data={getVideoObjectSchema({
            name: t("video.title"),
            description: t("metaDescription"),
            thumbnailUrl: `${BASE_URL}${video.poster}`,
            contentUrl: `${BASE_URL}${video.src}`,
            uploadDate: video.uploadDate,
            duration: video.duration,
            inLanguage: locale === "ru" ? "ru-RU" : "uz-UZ",
          })}
        />
      )}

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
          {video ? (
            // Video variant. Mobil (< lg): eyebrow -> sarlavha -> lead -> VIDEO -> faktlar -> CTA.
            // Matn bloki mobilda `contents` (bolalari to'g'ridan-to'g'ri grid elementi bo'ladi) va
            // `order` bilan video o'rtaga qo'yiladi — video bitta, DOM'da takrorlanmaydi.
            // Desktop (lg+): avvalgidek 2 ustun (matn bloki | video).
            <header className="mt-8 grid gap-0 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div className="contents lg:block">
                <div>{heroIntro}</div>
                <div className="order-3 lg:order-none">{heroExtras}</div>
              </div>
              <div className="order-2 mt-8 lg:order-none lg:mt-0">
                <LandingVideo
                  src={video.src}
                  srcMobile={video.srcMobile}
                  poster={video.poster}
                  width={video.width}
                  height={video.height}
                  posterAlt={t("gallery.alt5")}
                  ariaLabel={t("video.ariaLabel")}
                />
              </div>
            </header>
          ) : (
            <header className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div>
                {heroIntro}
                {heroExtras}
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
          )}

          {/* Mobil pastki panel (ixtiyoriy): hero'dan keyin paydo bo'ladi */}
          {config.stickyBar && (
            <StickyBar
              landing={config.slug}
              callHref={CALL_HREF}
              telegramHref={TELEGRAM_HREF}
              labels={{
                call: t("stickyBar.call"),
                telegram: t("stickyBar.telegram"),
                order: t("stickyBar.order"),
              }}
            />
          )}

          {/* 2. Kim uchun (ixtiyoriy) */}
          {showAudience && (
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
          )}

          {/* 3. Xususiyatlar */}
          <section className="mt-20">
            <ViewTracker eventKey={config.viewEvent} />
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
                      {renderSpecValue(row.value, locale, config.specLinks)}
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
              {advantages.map((item) => {
                const isTitled = typeof item !== "string";
                return (
                  <li
                    key={isTitled ? item.title : item}
                    className="flex items-start gap-3"
                  >
                    <CircleCheck
                      className="mt-0.5 h-5 w-5 shrink-0 text-forest-700"
                      strokeWidth={2}
                    />
                    {isTitled ? (
                      <span className="text-base leading-relaxed text-earth-900">
                        <strong className="block font-serif text-lg font-semibold">
                          {item.title}
                        </strong>
                        <span className="mt-1 block text-earth-700">
                          {item.text}
                        </span>
                      </span>
                    ) : (
                      <span className="text-base leading-relaxed text-earth-900">
                        {item}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* 4a. Hozir bor / oldindan buyurtma (ixtiyoriy) */}
          {offers && (
            <section className="mt-20">
              <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
                {offers.title}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {/* Hozir bor — yashil "mavjud" urg'u */}
                <div className="flex flex-col rounded-2xl border-2 border-forest-400/60 bg-forest-50/50 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-forest-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cream">
                    <CircleCheck
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {offers.now.badge}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-earth-900 sm:text-2xl">
                    {offers.now.title}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-earth-700">
                    {offers.now.text}
                  </p>
                  <LeadFormLink
                    option="now"
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full sm:w-auto sm:self-start"
                  >
                    {offers.now.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LeadFormLink>
                </div>

                {/* Oldindan buyurtma (2027) — oltin/amber urg'u */}
                <div className="flex flex-col rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                    <CalendarClock
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {offers.preorder.badge}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-amber-900 sm:text-2xl">
                    {offers.preorder.title}
                  </h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-amber-900/90">
                    {offers.preorder.text}
                  </p>
                  <LeadFormLink
                    option="preorder"
                    variant="secondary"
                    size="lg"
                    className="mt-6 w-full sm:w-auto sm:self-start"
                  >
                    {offers.preorder.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </LeadFormLink>
                </div>
              </div>
            </section>
          )}

          {/* 4b. Payvandtag afzalliklari (ixtiyoriy) */}
          {rootstock.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-serif font-bold text-earth-900 sm:text-3xl">
                {t("rootstock.title")}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rootstock.map((item, i) => {
                  const Icon = ROOTSTOCK_ICONS[i] ?? ShieldCheck;
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
          )}

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
            {galleryItems.length > 1 ? (
              // Bir nechta rasm (closeup + extraGallery; video bo'lsa hero ham), grid'da
              <div
                className={
                  galleryItems.length === 2
                    ? "grid gap-5 md:grid-cols-2"
                    : "grid gap-5 md:grid-cols-3"
                }
              >
                {galleryItems.map((item) => (
                  <div
                    key={item.src}
                    className="relative aspect-square w-full overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1280px) 384px, (min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-hidden rounded-2xl border border-earth-400/25 bg-forest-50 shadow-[0_20px_60px_-25px_rgba(27,67,50,0.45)]">
                <Image
                  src={IMG_CLOSEUP}
                  alt={t("gallery.alt3")}
                  fill
                  sizes="(min-width: 768px) 672px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
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

          {/* 7b. Ichki havolalar: o'z kategoriyasi + mavzuga oid maqola */}
          <LandingRelatedLinks landing={config.slug} />
        </Container>
      </article>

      {/* 8. Lid formasi */}
      <LeadForm
        locale={lang}
        source={config.leadSource}
        title={t("formTitle")}
        sourceOptions={sourceOptions}
        defaultFruitTypes={config.defaultFruitTypes}
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
