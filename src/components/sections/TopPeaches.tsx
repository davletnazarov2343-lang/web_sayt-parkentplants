"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Award,
  Calendar,
  Ruler,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flower2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import {
  TOP_PEACHES,
  PEACH_FILTERS,
  type PeachBadge,
  type PeachSeason,
  type PeachVariety,
} from "@/lib/peaches/top-varieties";

const SEASON_LABEL_UZ: Record<PeachSeason, string> = {
  "very-early": "Juda erta",
  early: "Erta",
  mid: "O'rta",
  late: "Kech",
  "very-late": "Juda kech",
};

const SEASON_LABEL_RU: Record<PeachSeason, string> = {
  "very-early": "Очень ранний",
  early: "Ранний",
  mid: "Средний",
  late: "Поздний",
  "very-late": "Очень поздний",
};

const BADGE_CONFIG: Record<
  PeachBadge,
  { uz: string; ru: string; className: string }
> = {
  export: {
    uz: "Eksport",
    ru: "Экспорт",
    className: "bg-gold-400 text-earth-900",
  },
  premium: {
    uz: "Premium",
    ru: "Премиум",
    className: "bg-forest-700 text-cream",
  },
  classic: {
    uz: "Klassik",
    ru: "Классика",
    className: "bg-earth-400/20 text-earth-900 border border-earth-400/40",
  },
  early: {
    uz: "Erta",
    ru: "Ранний",
    className: "bg-cream-100 text-earth-900 border border-earth-400/30",
  },
  late: {
    uz: "Kech",
    ru: "Поздний",
    className: "bg-cream-100 text-earth-900 border border-earth-400/30",
  },
  "very-early": {
    uz: "Juda erta",
    ru: "Оч. ранний",
    className: "bg-gold-100 text-earth-900 border border-gold-400/40",
  },
  "very-late": {
    uz: "Juda kech",
    ru: "Оч. поздний",
    className: "bg-forest-100 text-forest-900 border border-forest-400/30",
  },
  "crack-resistant": {
    uz: "Yorilmaydi",
    ru: "Не трескается",
    className: "bg-forest-100 text-forest-900",
  },
  "long-storage": {
    uz: "Uzoq saqlanadi",
    ru: "Долго хранится",
    className: "bg-forest-100 text-forest-900",
  },
};

type FilterId = (typeof PEACH_FILTERS)[number]["id"];

export function TopPeaches({ locale }: { locale: "uz" | "ru" }) {
  const t = useTranslations("topPeaches");
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return TOP_PEACHES;
    return TOP_PEACHES.filter((v) => {
      if (filter === "early")
        return v.season === "very-early" || v.season === "early";
      if (filter === "mid") return v.season === "mid";
      if (filter === "late")
        return v.season === "late" || v.season === "very-late";
      if (filter === "export") return v.badges.includes("export");
      return true;
    });
  }, [filter]);

  const seasonLabel = locale === "ru" ? SEASON_LABEL_RU : SEASON_LABEL_UZ;

  return (
    <section
      id="top-peaches"
      className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-cream to-gold-100/30 py-20 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-700/20 bg-gold-100/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
            <Award className="h-3.5 w-3.5" strokeWidth={2} />
            {t("eyebrow")}
          </span>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-earth-700 lg:text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {PEACH_FILTERS.map((f) => {
            const active = filter === f.id;
            const label = locale === "ru" ? f.labelRu : f.labelUz;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-gold-700 bg-gold-700 text-cream"
                    : "border-earth-400/30 bg-cream text-earth-900 hover:border-gold-400 hover:bg-cream-100",
                )}
              >
                {label}
              </button>
            );
          })}
          <span className="ml-2 text-xs text-earth-700/70">
            {t("count", { n: filtered.length })}
          </span>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((v) => (
            <PeachCard
              key={v.slug}
              variety={v}
              locale={locale}
              seasonLabel={seasonLabel}
              t={t}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-gold-700/20 bg-gold-100/20 p-8 sm:flex-row sm:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-serif text-lg font-semibold text-earth-900">
              {t("more.title")}
            </p>
            <p className="mt-1 text-sm text-earth-700">{t("more.subtitle")}</p>
          </div>
          <a
            href="#request"
            className="inline-flex items-center gap-2 rounded-md bg-forest-700 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-900"
          >
            {t("more.cta")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}

// ===========================================================================
// Single card
// ===========================================================================

function PeachCard({
  variety,
  locale,
  seasonLabel,
  t,
}: {
  variety: PeachVariety;
  locale: "uz" | "ru";
  seasonLabel: Record<PeachSeason, string>;
  t: ReturnType<typeof useTranslations>;
}) {
  const tagline = locale === "ru" ? variety.taglineRu : variety.taglineUz;
  const visibleBadges = variety.badges.slice(0, 2);
  const fleshLabelUz = variety.flesh === "white" ? "Oq et" : "Sariq et";
  const fleshLabelRu = variety.flesh === "white" ? "Белая мякоть" : "Жёлтая мякоть";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_12px_40px_-16px_rgba(201,169,97,0.4)]">
      {/* Visual band — peach gradient */}
      <div
        className={cn(
          "relative h-32 overflow-hidden",
          variety.flesh === "white"
            ? "bg-gradient-to-br from-cream-100 via-gold-100/60 to-gold-400/30"
            : "bg-gradient-to-br from-gold-100 via-gold-400/40 to-gold-700/30",
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-3 -top-2 text-[120px] leading-none opacity-30 transition-transform duration-500 group-hover:scale-110"
        >
          🍑
        </div>

        {/* Badges top-left */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {visibleBadges.map((badge) => {
            const cfg = BADGE_CONFIG[badge];
            const label = locale === "ru" ? cfg.ru : cfg.uz;
            return (
              <span
                key={badge}
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                  cfg.className,
                )}
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Season badge bottom-right */}
        <div className="absolute bottom-2 right-3 inline-flex items-center gap-1 rounded-md bg-cream/90 px-2 py-1 text-[10px] font-semibold text-earth-900 backdrop-blur-sm">
          <Calendar className="h-3 w-3" strokeWidth={2.5} />
          {seasonLabel[variety.season]}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-tight text-earth-900">
          {variety.name}
        </h3>
        <p className="mt-0.5 text-xs text-earth-700/70">
          {variety.origin} · {variety.harvestPeriod}
        </p>

        {/* Specs */}
        <dl className="mt-4 space-y-2 text-xs">
          <SpecRow
            Icon={Ruler}
            label={t("specs.size")}
            value={variety.fruitSize}
          />
          <SpecRow
            Icon={Sparkles}
            label={t("specs.flesh")}
            value={locale === "ru" ? fleshLabelRu : fleshLabelUz}
          />
          {variety.brix && (
            <SpecRow
              Icon={Sparkles}
              label={t("specs.brix")}
              value={`${variety.brix}°`}
            />
          )}
          <SpecRow
            Icon={Flower2}
            label={t("specs.bloom")}
            value={variety.bloomTime}
          />
          {variety.selfFertile && (
            <SpecRow
              Icon={CheckCircle2}
              label={t("specs.pollination")}
              value={t("specs.selfFertile")}
            />
          )}
        </dl>

        {/* Tagline */}
        <p className="mt-4 flex-1 border-t border-earth-400/20 pt-4 text-xs leading-relaxed text-earth-700">
          {tagline}
        </p>
      </div>
    </article>
  );
}

function SpecRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-700/70"
        strokeWidth={2}
      />
      <div className="flex-1">
        <span className="text-earth-700/70">{label}: </span>
        <span className="font-medium text-earth-900">{value}</span>
      </div>
    </div>
  );
}
