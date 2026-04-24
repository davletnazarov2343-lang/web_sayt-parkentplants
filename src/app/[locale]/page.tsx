import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-5xl font-serif text-forest-700">{t("title")}</h1>
    </main>
  );
}
