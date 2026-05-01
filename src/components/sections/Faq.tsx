import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { JsonLd, getFaqSchema } from "@/components/seo/JsonLd";

const FAQ_KEYS = [
  "varieties",
  "saplingAge",
  "harvestTime",
  "germination",
  "plantingTime",
  "delivery",
  "payment",
  "consult",
] as const;

export function Faq() {
  const t = useTranslations("faq");

  // SEO uchun JSON-LD
  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section id="faq" className="bg-cream py-20 lg:py-28">
      <JsonLd data={getFaqSchema(faqItems)} />
      <Container size="narrow">
        <div className="text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-earth-700">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-14 divide-y divide-earth-400/25 overflow-hidden rounded-2xl border border-earth-400/25 bg-cream-100">
          {FAQ_KEYS.map((key, idx) => (
            <details
              key={key}
              className="group p-6 transition-colors open:bg-cream sm:p-7"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h3 className="font-serif text-lg font-semibold leading-snug text-earth-900 sm:text-xl">
                  {t(`items.${key}.question`)}
                </h3>
                <span
                  aria-hidden="true"
                  className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-forest-700/30 text-forest-700 transition-transform group-open:rotate-45"
                >
                  <span className="absolute h-3 w-px bg-current" />
                  <span className="absolute h-px w-3 bg-current" />
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-earth-700">
                {t(`items.${key}.answer`)}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
