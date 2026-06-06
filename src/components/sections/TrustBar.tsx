import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Stamp,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const TRUST_ITEMS: Array<{ key: string; Icon: LucideIcon }> = [
  { key: "registry", Icon: Stamp },
  { key: "phyto", Icon: ShieldCheck },
];

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section
      id="trust"
      aria-label={t("ariaLabel")}
      className="border-y border-earth-400/20 bg-cream-100 py-8"
    >
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-earth-700/70">
          {t("title")}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {TRUST_ITEMS.map(({ key, Icon }) => (
            <li
              key={key}
              className="flex items-center gap-2.5 text-earth-700 transition-colors hover:text-forest-700"
            >
              <Icon
                className="h-5 w-5 shrink-0 text-forest-700/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-sm font-medium leading-tight tracking-wide">
                {t(`items.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
