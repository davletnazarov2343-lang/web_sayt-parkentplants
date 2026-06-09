import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappFab } from "@/components/layout/WhatsappFab";
import { Analytics } from "@/components/analytics/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  JsonLd,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getServiceSchema,
  getVideoCollectionSchema,
  getNurseryImagesSchema,
} from "@/components/seo/JsonLd";
import { SITE_VIDEOS } from "@/lib/videos";

const SITE_URL = "https://parkentplants.uz";

const META_CONTENT: Record<
  Locale,
  {
    title: string;
    description: string;
    ogDescription: string;
    twitterDescription: string;
    ogLocale: string;
    keywords: string[];
  }
> = {
  uz: {
    title:
      "Mevali ko'chat sotib olish | Parkent Plants — yetakchi ko'chatzor",
    description:
      "Mevali ko'chatlar ulgurji va chakana: olma, gilos, shaftoli, o'rik, uzum, bodom. 23 yillik bog'dorchilik tajribasi, fitosanitar sertifikat, eksport. 500 000+ ko'chat yiliga, 87 gektar maydon. Toshkent vil., Parkent va Yuqori Chirchiq ko'chatzorlari.",
    ogDescription:
      "Mevali bog' uchun sifatli ko'chatlar — olma, gilos, shaftoli, o'rik, uzum, bodom. 23 yil bog'dorchilik tajribasi. Fermerlar va investorlar uchun B2B.",
    twitterDescription:
      "Mevali ko'chat ulgurji ⭐ 23 yil tajriba · 500K+ ko'chat · 87 ga ko'chatzor",
    ogLocale: "uz_UZ",
    keywords: [
      "mevali ko'chat",
      "ko'chat",
      "ko'chat sotib olish",
      "ko'chat ulgurji",
      "olma ko'chati",
      "gilos ko'chati",
      "shaftoli ko'chati",
      "o'rik ko'chati",
      "uzum ko'chati",
      "bodom ko'chati",
      "meva bog'i",
      "mevali bog' uchun ko'chat",
      "bog'dorchilik",
      "Parkent Plants",
      "Norchontol",
      "ko'chatzor",
      "Toshkent ko'chatzori",
      "Parkent ko'chatzori",
      "Yuqori Chirchiq ko'chatzori",
      "fitosanitar sertifikat",
      "ko'chat eksport",
      "Shuhrat Abrorov",
    ],
  },
  ru: {
    title:
      "Саженцы плодовые купить | Parkent Plants — питомник в Узбекистане",
    description:
      "Плодовые саженцы оптом и в розницу: яблоня, черешня, персик, абрикос, виноград, миндаль. 23 года практики, фитосанитарный сертификат, экспорт. 500 000+ саженцев в год, 87 гектаров земли в Ташкентской обл. (Паркент и Юкори-Чирчик).",
    ogDescription:
      "Качественные плодовые саженцы для сада — яблоня, черешня, персик, абрикос, виноград. 23 года опыта. B2B для фермеров и инвесторов.",
    twitterDescription:
      "Саженцы плодовые оптом ⭐ 23 года опыта · 500K+ саженцев · 87 га питомника",
    ogLocale: "ru_RU",
    keywords: [
      "саженцы плодовые",
      "саженцы плодовые купить",
      "саженцы плодовые оптом",
      "саженцы яблони",
      "саженцы черешни",
      "саженцы персика",
      "саженцы абрикоса",
      "саженцы винограда",
      "саженцы миндаля",
      "плодовый сад",
      "садоводство",
      "Parkent Plants",
      "Norchontol",
      "питомник Ташкент",
      "питомник Узбекистан",
      "Паркент питомник",
      "Юкори-Чирчик питомник",
      "фитосанитарный сертификат",
      "экспорт саженцев",
      "B2B саженцы",
      "Шухрат Аброров",
    ],
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const lang = (LOCALES.includes(locale as Locale) ? locale : "uz") as Locale;
  const meta = META_CONTENT[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: "%s · Parkent Plants",
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Parkent Plants" }],
    creator: "Parkent Plants",
    publisher: "Norchontol fermer xo'jaligi",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: "Parkent Plants",
      title: meta.title,
      description: meta.ogDescription,
      url: `${SITE_URL}/${lang}`,
      locale: meta.ogLocale,
      alternateLocale: lang === "uz" ? ["ru_RU"] : ["uz_UZ"],
      images: [
        {
          url: "/brand/og-image.jpg",
          width: 1500,
          height: 1500,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.twitterDescription,
      images: ["/brand/og-image.jpg"],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "uz-UZ": "/uz",
        "ru-UZ": "/ru",
        "x-default": "/uz",
      },
    },
    verification: {
      google: "CmLeWRqkz020-o25TIlMM8dgX5i56WNiwSUodlBYYqM",
      yandex: "23462ea252b26b6b",
    },
    icons: {
      icon: [{ url: "/icon.png", sizes: "any" }],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!LOCALES.includes(locale as Locale)) notFound();
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Performance hints — tashqi resurslar tezroq yuklanadi */}
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </head>
      <body className="min-h-screen bg-cream text-earth-900 antialiased">
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getLocalBusinessSchema()} />
        <JsonLd data={getWebsiteSchema(locale)} />
        <JsonLd data={getBreadcrumbSchema(locale)} />
        <JsonLd data={getServiceSchema(locale)} />
        {getVideoCollectionSchema(SITE_VIDEOS).map((video, i) => (
          <JsonLd key={`video-${i}`} data={video} />
        ))}
        {getNurseryImagesSchema().map((img, i) => (
          <JsonLd key={`img-${i}`} data={img} />
        ))}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsappFab />
        </NextIntlClientProvider>
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
