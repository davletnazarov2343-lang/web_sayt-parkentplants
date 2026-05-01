import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappFab } from "@/components/layout/WhatsappFab";

export const metadata: Metadata = {
  title: "Parkent Plants — Markaziy Osiyoning yetakchi mevali ko'chatchilik xo'jaligi",
  description:
    "2002 yildan buyon Toshkent viloyatida sertifikatlangan mevali ko'chatlar yetishtiramiz. 500 000+ ko'chat yiliga, 135+ nav, 2 ta ko'chatzor.",
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
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsappFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
