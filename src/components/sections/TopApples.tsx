"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Award,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Archive,
  TreeDeciduous,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import {
  TOP_APPLES,
  APPLE_FILTERS,
  type AppleBadge,
  type AppleSeason,
  type AppleStorage,
  type AppleVariety,
} from "@/lib/apples/top-varieties";

const SEASON_LABEL_UZ: Record<AppleSeason, string> = {
  summer: "Yozgi",
  "early-autumn": "Erta kuzgi",
  autumn: "Kuzgi",
  "late-autumn": "Kech kuzgi",
};

const SEASON_LABEL_RU: Record<AppleSeason, string> = {
  summer: "Летний",
  "early-autumn": "Раннеосенний",
  autumn: "Осенний",
  "late-autumn": "Позднеосенний",
};

const STORAGE_DOTS: Record<AppleStorage, number> = {
  short: 1,
  medium: 2,
  long: 4,
  "very-long": 5,
};

const BADGE_CONFIG: Record<
  AppleBadge,
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
  "self-pollinating": {
    uz: "Self-poll.",
    ru: "Самоопыл.",
    className: "bg-forest-100 text-forest-900",
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
  "norchontol-grown": {
    uz: "Bizda",
    ru: "У нас",
    className: "bg-forest-700 text-gold-400 border border-gold-400/30",
  },
  "disease-resistant": {
    uz: "Kasal-chid.",
    ru: "Болезне-уст.",
    className: "bg-forest-100 text-forest-900",
  },
};

type FilterId = (typeof APPLE_FILTERS)[number]["id"];

export function TopApples({ locale }: { locale: "uz" | "ru" }) {
  const t = useTranslations("topApples");
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return TOP_APPLES;
    return TOP_APPLES.filter((v) => {
      if (filter === "norchontol-grown")
        return v.badges.includes("norchontol-grown");
      if (filter === "export") return v.badges.includes("export");
      if (filter === "early")
        return v.season === "summer" || v.season === "early-autumn";
      if (filter === "late") return v.season === "late-autumn";
      return true;
    });
  }, [filter]);

  const seasonLabel = locale === "ru" ? SEASON_LABEL_RU : SEASON_LABEL_UZ;

  return (
    <section
      id="top-apples"
      className="relative isolate overflow-hidden bg-gradient-to-b from-cream-100 to-cream py-20 lg:py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest-700/20 bg-forest-700/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest-700">
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
          {APPLE_FILTERS.map((f) => {
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
                    ? "border-forest-700 bg-forest-700 text-cream"
                    : "border-earth-400/30 bg-cream text-earth-900 hover:border-forest-400 hover:bg-cream-100",
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

        {/* Cards grid — 3 cols on lg for 9 varieties (3 rows) */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <AppleCard
              key={v.slug}
              variety={v}
              locale={locale}
              seasonLabel={seasonLabel}
              t={t}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-forest-700/15 bg-forest-700/5 p-8 sm:flex-row sm:gap-6">
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

function AppleCard({
  variety,
  locale,
  seasonLabel,
  t,
}: {
  variety: AppleVariety;
  locale: "uz" | "ru";
  seasonLabel: Record<AppleSeason, string>;
  t: ReturnType<typeof useTranslations>;
}) {
  const tagline = locale === "ru" ? variety.taglineRu : variety.taglineUz;
  const visibleBadges = variety.badges.slice(0, 2);
  const hasPhoto = Boolean(variety.photo);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-400/25 bg-cream transition-all hover:-translate-y-1 hover:border-forest-400 hover:shadow-[0_12px_40px_-16px_rgba(27,67,50,0.25)]">
      {/* Visual band — photo or gradient */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-forest-100 via-forest-200 to-forest-400/40">
        {hasPhoto ? (
          <Image
            src={variety.photo!}
            alt={variety.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_55%)]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 text-[140px] leading-none opacity-25 transition-transform duration-500 group-hover:scale-110"
            >
              🍎
            </div>
          </>
        )}

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

        {/* Season indicator bottom-right */}
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
            Icon={ShieldCheck}
            label={t("specs.skin")}
            value={variety.skinColor}
          />
          <SpecRow
            Icon={TreeDeciduous}
            label={t("specs.rootstock")}
            value={variety.recommendedRootstocks}
          />
          <SpecRow
            Icon={Archive}
            label={t("specs.storage")}
            value={
              <span className="inline-flex items-center gap-1.5">
                {t("specs.storageMonths", { n: variety.storageMonths })}
                <span className="inline-flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        i < STORAGE_DOTS[variety.storage]
                          ? "bg-forest-700"
                          : "bg-earth-400/30",
                      )}
                    />
                  ))}
                </span>
              </span>
            }
          />
          {!variety.selfPollinating && variety.pollinators && (
            <SpecRow
              Icon={CheckCircle2}
              label={t("specs.pollinators")}
              value={variety.pollinators}
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
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-700/60"
        strokeWidth={2}
      />
      <div className="flex-1">
        <span className="text-earth-700/70">{label}: </span>
        <span className="font-medium text-earth-900">{value}</span>
      </div>
    </div>
  );
}
