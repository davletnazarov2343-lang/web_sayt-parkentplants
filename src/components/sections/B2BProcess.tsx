import { useTranslations } from "next-intl";
import { ClipboardList, FileSignature, Truck, Headphones, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const STEPS: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "consult", Icon: ClipboardList },
  { key: "agreement", Icon: FileSignature },
  { key: "delivery", Icon: Truck },
  { key: "support", Icon: Headphones },
];

export function B2BProcess() {
  const t = useTranslations("process");

  return (
    <section id="process" className="bg-cream py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
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

        <ol className="relative mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ key, Icon }, index) => (
            <li
              key={key}
              className="group relative flex flex-col rounded-2xl border border-earth-400/25 bg-cream-100 p-7 transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_8px_32px_-12px_rgba(27,67,50,0.18)]"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-5xl font-semibold leading-none tabular-nums text-forest-700/15 transition-colors group-hover:text-forest-700/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-700/10 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-cream">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              </div>
              <h3 className="mt-6 font-serif text-lg font-semibold leading-snug text-earth-900">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-earth-700">
                {t(`steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
