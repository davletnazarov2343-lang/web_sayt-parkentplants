import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappFab } from "@/components/layout/WhatsappFab";
import { Analytics } from "@/components/analytics/Analytics";
import {
  JsonLd,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebsiteSchema,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://parkentplants.uz"),
  title: {
    default: "Parkent Plants — Markaziy Osiyoning yetakchi mevali ko'chatchilik xo'jaligi",
    template: "%s · Parkent Plants",
  },
  description:
    "2002 yildan buyon Toshkent viloyatida sertifikatlangan mevali ko'chatlar yetishtiramiz. 500 000+ ko'chat yiliga, 135+ nav, 2 ta ko'chatzor (32 + 64 ga).",
  keywords: [
    "mevali ko'chat",
    "olma ko'chati",
    "shaftoli ko'chati",
    "olcha ko'chati",
    "o'rik ko'chati",
    "Parkent Plants",
    "ko'chatzor",
    "fitosanitar sertifikat",
    "B2B ko'chat",
    "Toshkent ko'chat",
    "саженцы плодовые Узбекистан",
    "питомник Ташкент",
  ],
  authors: [{ name: "Parkent Plants" }],
  openGraph: {
    type: "website",
    siteName: "Parkent Plants",
    title:
      "Parkent Plants — Markaziy Osiyoning yetakchi mevali ko'chatchilik xo'jaligi",
    description:
      "23 yillik tajriba · 500 000+ ko'chat yiliga · 135+ nav · 2 ta zamonaviy ko'chatzor. Professional fermerlar va investorlar uchun.",
    locale: "uz_UZ",
    alternateLocale: ["ru_RU"],
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1500,
        height: 1500,
        alt: "Parkent Plants — sinalgan mevali ko'chatlar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parkent Plants — yetakchi mevali ko'chatchilik xo'jaligi",
    description:
      "23 yil tajriba · 500K+ ko'chat · 135+ nav · 2 ta ko'chatzor",
    images: ["/brand/og-image.jpg"],
  },
  alternates: {
    languages: {
      uz: "/uz",
      ru: "/ru",
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
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
      <body className="min-h-screen bg-cream text-earth-900 antialiased">
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getLocalBusinessSchema()} />
        <JsonLd data={getWebsiteSchema(locale)} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsappFab />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
