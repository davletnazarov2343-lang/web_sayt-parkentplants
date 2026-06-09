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
} from "@/components/seo/JsonLd";

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
      "Parkent Plants — Markaziy Osiyoning yetakchi mevali ko'chatchilik xo'jaligi",
    description:
      "2002 yildan buyon Toshkent viloyatida sertifikatlangan mevali ko'chatlar yetishtiramiz. 500 000+ ko'chat yiliga, 11 meva turi, 87 gektar maydon (Parkent 23 + Yuqori Chirchiq 64).",
    ogDescription:
      "23 yillik tajriba · 500 000+ ko'chat yiliga · 11 meva turi · 87 gektar ko'chatzor. Professional fermerlar va investorlar uchun.",
    twitterDescription:
      "23 yil tajriba · 500K+ ko'chat · 11 meva turi · 87 ga ko'chatzor",
    ogLocale: "uz_UZ",
    keywords: [
      "mevali ko'chat",
      "olma ko'chati",
      "shaftoli ko'chati",
      "olcha ko'chati",
      "o'rik ko'chati",
      "Parkent Plants",
      "Norchontol",
      "ko'chatzor",
      "fitosanitar sertifikat",
      "ko'chat eksport",
      "Toshkent ko'chat",
      "Parkent ko'chat",
      "Yuqori Chirchiq ko'chat",
      "Shuhrat Abrorov",
    ],
  },
  ru: {
    title:
      "Parkent Plants — ведущий питомник плодовых саженцев Центральной Азии",
    description:
      "С 2002 года в Ташкентской области выращиваем сертифицированные плодовые саженцы. 500 000+ саженцев в год, 11 видов плодов, 87 гектаров земли (Паркент 23 + Юкори-Чирчик 64).",
    ogDescription:
      "23 года опыта · 500 000+ саженцев в год · 11 видов плодов · 87 гектаров питомника. Для профессиональных фермеров и инвесторов.",
    twitterDescription:
      "23 года опыта · 500K+ саженцев · 11 видов · 87 га питомника",
    ogLocale: "ru_RU",
    keywords: [
      "саженцы плодовые",
      "саженцы яблони",
      "саженцы черешни",
      "саженцы персика",
      "саженцы абрикоса",
      "Parkent Plants",
      "Norchontol",
      "питомник Ташкент",
      "питомник Узбекистан",
      "фитосанитарный сертификат",
      "экспорт саженцев",
      "B2B саженцы",
      "Shuhrat Abrorov",
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
