"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { LOCALES, type Locale } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

const LOCALE_LABELS: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
};

const LOCALE_SHORT: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
};

type LocaleSwitcherProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function LocaleSwitcher({
  className,
  variant = "dark",
}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (target: Locale) => {
    if (target === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: target });
    });
  };

  const baseColor =
    variant === "dark" ? "text-earth-700" : "text-cream-100/80";
  const inactiveHover =
    variant === "dark"
      ? "text-earth-700 hover:text-forest-700"
      : "text-cream-100/80 hover:text-cream";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1 py-1",
        variant === "dark"
          ? "border-earth-400/30 bg-cream"
          : "border-cream/20 bg-forest-900/50",
        isPending && "opacity-60",
        className,
      )}
    >
      <Globe
        className={cn("ml-2 h-3.5 w-3.5", baseColor)}
        aria-hidden="true"
      />
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-label={LOCALE_LABELS[l]}
          aria-current={locale === l ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
            locale === l
              ? variant === "dark"
                ? "bg-forest-700 text-cream"
                : "bg-cream text-forest-900"
              : inactiveHover,
          )}
        >
          {LOCALE_SHORT[l]}
        </button>
      ))}
    </div>
  );
}
