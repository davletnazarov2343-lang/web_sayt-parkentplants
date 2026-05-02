import Link from "next/link";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { Home, Search, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export const metadata = {
  title: "Sahifa topilmadi",
  description: "Bunday sahifa mavjud emas",
};

export default async function NotFound({
  params,
}: {
  params?: { locale?: string };
}) {
  // Locale-aware not-found ham, root not-found ham bu fayl ishlatadi.
  // params bo'lmasa default 'uz'.
  const locale = params?.locale ?? "uz";
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden bg-gradient-to-br from-forest-900 via-forest-900 to-forest-700 py-24 lg:py-32">
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(to_right,#FEFCF8_1px,transparent_1px),linear-gradient(to_bottom,#FEFCF8_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_top,rgba(201,169,97,0.15),transparent_60%)]"
      />

      <Container size="narrow">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-9xl font-semibold leading-none text-gold-400/60 sm:text-[10rem]">
            404
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-cream sm:text-5xl text-balance">
            {t("title")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-cream-100/80 lg:text-lg">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <LinkButton
              href={`/${locale}`}
              variant="secondary"
              size="lg"
              className="shadow-[0_4px_18px_-4px_rgba(201,169,97,0.5)]"
            >
              <Home className="h-4 w-4" />
              {t("backHome")}
            </LinkButton>
            <Link
              href={`/${locale}/varieties`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cream-100/30 px-7 py-3.5 text-sm font-semibold text-cream-100 transition-colors hover:bg-cream-100/10"
            >
              <Search className="h-4 w-4" />
              {t("browseCatalog")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-8 text-sm text-cream-100/60">
            {t("contact")}{" "}
            <a
              href="tel:+998781131819"
              className="font-semibold text-gold-400 hover:underline"
            >
              +998 78 113 18 19
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
