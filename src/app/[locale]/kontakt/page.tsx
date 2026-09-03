import type { Metadata } from "next";
import Link from "next/link";
import {
  unstable_setRequestLocale,
  getTranslations,
} from "next-intl/server";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import {
  JsonLd,
  getLocalBusinessSchema,
  getOrganizationSchema,
} from "@/components/seo/JsonLd";

type Props = { params: { locale: string } };

const CONTACT_ITEMS: Array<{
  key: "address" | "phone" | "whatsapp" | "email" | "hours";
  Icon: LucideIcon;
  hrefBuilder?: (rawValue: string) => string;
}> = [
  { key: "address", Icon: MapPin },
  {
    key: "phone",
    Icon: Phone,
    hrefBuilder: (v) => `tel:${v.replace(/\s/g, "")}`,
  },
  {
    key: "whatsapp",
    Icon: MessageCircle,
    hrefBuilder: (v) => `https://wa.me/${v.replace(/[^0-9]/g, "")}`,
  },
  {
    key: "email",
    Icon: Mail,
    hrefBuilder: (v) => `mailto:${v}`,
  },
  { key: "hours", Icon: Clock },
];

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/kontakt`,
      languages: {
        "uz-UZ": "/uz/kontakt",
        "ru-UZ": "/ru/kontakt",
        "x-default": "/uz/kontakt",
      },
    },
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://parkentplants.uz/${locale}/kontakt`,
    },
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const tContact = await getTranslations({ locale, namespace: "contact" });
  const homeLabel = locale === "ru" ? "Главная" : "Bosh sahifa";

  const addressValue = tContact("address.value");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(addressValue)}&output=embed`;

  // BreadcrumbList — mavjud kochatlar sahifalaridagi uslubda
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `https://parkentplants.uz/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb"),
        item: `https://parkentplants.uz/${locale}/kontakt`,
      },
    ],
  };

  // Mavjud generatorlardan LocalBusiness va Organization schema
  const localBusinessSchema = getLocalBusinessSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={organizationSchema} />

      <article className="pt-28 pb-24 sm:pt-32 lg:pt-40">
        <Container size="default">
          {/* Breadcrumb */}
          <nav className="text-sm text-earth-500">
            <Link href={`/${locale}`} className="hover:text-forest-700">
              {homeLabel}
            </Link>
            <span className="mx-2 text-earth-300">/</span>
            <span className="text-earth-700 font-medium">
              {t("breadcrumb")}
            </span>
          </nav>

          {/* Hero */}
          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              {tContact("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-serif font-bold text-earth-900 sm:text-5xl lg:text-6xl leading-tight">
              {tContact("title")}
            </h1>
            <p className="mt-6 text-base text-earth-600 leading-relaxed sm:text-lg">
              {tContact("subtitle")}
            </p>
          </header>

          {/* Contact info + map */}
          <section className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <ul className="grid overflow-hidden rounded-2xl border border-earth-400/25 bg-earth-400/25 gap-px">
                {CONTACT_ITEMS.map(({ key, Icon, hrefBuilder }) => {
                  const value = tContact(`${key}.value`);
                  const content = (
                    <>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-forest-700/10 text-forest-700">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-earth-700/70">
                          {tContact(`${key}.label`)}
                        </p>
                        <p className="mt-1 font-serif text-lg leading-snug text-earth-900">
                          {value}
                        </p>
                      </div>
                    </>
                  );
                  const wrapperClass =
                    "flex items-start gap-4 bg-cream-100 p-6 transition-colors hover:bg-cream";
                  return (
                    <li key={key}>
                      {hrefBuilder ? (
                        <a
                          href={hrefBuilder(value)}
                          target={key === "whatsapp" ? "_blank" : undefined}
                          rel={
                            key === "whatsapp"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className={wrapperClass}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className={wrapperClass}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full overflow-hidden rounded-2xl border border-earth-400/25 shadow-[0_12px_40px_-16px_rgba(27,67,50,0.2)]">
                <iframe
                  src={mapSrc}
                  title={`${tContact("address.label")}: ${addressValue}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full border-0 sm:h-full sm:min-h-[420px]"
                />
              </div>
            </div>
          </section>

          {/* Lead form CTA */}
          <section className="mt-16 rounded-2xl bg-gradient-to-br from-forest-900 to-forest-700 p-8 sm:p-12 text-cream">
            <h2 className="text-3xl font-serif font-bold sm:text-4xl">
              {t("formCtaTitle")}
            </h2>
            <p className="mt-4 text-base text-cream-100/90 leading-relaxed sm:text-lg max-w-2xl">
              {t("formCtaBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={`/${locale}#request`}
                variant="secondary"
                size="lg"
              >
                {t("formCtaButton")}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
          </section>
        </Container>
      </article>
    </>
  );
}
