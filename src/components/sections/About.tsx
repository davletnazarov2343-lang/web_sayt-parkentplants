import { useTranslations } from "next-intl";
import { Award, Truck, Leaf, Headphones, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const FEATURES: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "certified", Icon: Award },
  { key: "scale", Icon: Truck },
  { key: "regional", Icon: Leaf },
  { key: "support", Icon: Headphones },
];

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Header */}
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-earth-700 lg:text-lg">
              {t("subtitle")}
            </p>
          </div>

          {/* Features grid */}
          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl bg-earth-400/25 sm:grid-cols-2">
              {FEATURES.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="group flex flex-col gap-4 bg-cream-100 p-7 transition-colors hover:bg-cream"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-700/10 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold leading-snug text-earth-900">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-earth-700">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
