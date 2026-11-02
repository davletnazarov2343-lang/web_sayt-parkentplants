import { useTranslations } from "next-intl";
import { ShieldCheck, Stamp, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Ishonch lentasi — header bilan bir xil to'q yashil (forest-900) band.
 *
 * MUHIM: Bu yerga faqat kompaniyada HAQIQATDA bor hujjatlar yoziladi.
 * Bizda yo'q sertifikat va hamkorlar (ro'yxati: scripts/check-claims.mjs)
 * qayta qo'shilmasin — build vaqtida avtomatik tekshiriladi.
 */
const TRUST_ITEMS: ReadonlyArray<{ key: "registry" | "phyto"; Icon: LucideIcon }> = [
  { key: "registry", Icon: Stamp },
  { key: "phyto", Icon: ShieldCheck },
];

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section
      id="trust"
      aria-label={t("ariaLabel")}
      className="relative bg-forest-900 text-cream-100 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]"
    >
      {/* Oltin chiziqlar — lenta effekti */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />

      <Container size="wide">
        <div className="flex min-h-[72px] flex-col items-center justify-center gap-3 py-4 sm:flex-row sm:gap-0 lg:min-h-20">
          <ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-0">
            {TRUST_ITEMS.map(({ key, Icon }, i) => (
              <li key={key} className="flex items-center">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="mx-6 hidden h-1.5 w-1.5 rotate-45 bg-gold-400 sm:block lg:mx-10"
                  />
                )}
                <span className="flex items-center gap-3">
                  <Icon
                    className="h-5 w-5 shrink-0 text-gold-400"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-cream sm:text-[13px]">
                    {t(`items.${key}`)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
