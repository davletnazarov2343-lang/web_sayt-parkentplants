import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Sprout,
  TrendingUp,
  MonitorPlay,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FOUNDER } from "@/lib/founder";
import type { Locale } from "@/sanity/types";

const ICONS: Record<(typeof FOUNDER.missions)[number]["icon"], LucideIcon> = {
  trending: TrendingUp,
  school: GraduationCap,
  book: BookOpen,
  video: MonitorPlay,
  sprout: Sprout,
  heart: HeartHandshake,
};

const COPY = {
  uz: { eyebrow: "Missiyalar", title: "Shuhrat Abrorovning 6 ta missiyasi", lead: "Har bir yo'nalishda aniq, o'lchanadigan maqsad." },
  ru: { eyebrow: "Миссии", title: "6 миссий Шухрата Абророва", lead: "В каждом направлении — конкретная, измеримая цель." },
};

/** To'q yashil lenta — header va ishonch lentasi bilan bir xil vizual til */
export function FounderMissions({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <section
      id="missiyalar"
      aria-labelledby="missions-title"
      className="relative overflow-hidden bg-forest-900 py-20 text-cream lg:py-24"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-forest-700/40 blur-3xl" />

      <Container className="relative">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">{c.eyebrow}</p>
          <h2 id="missions-title" className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {c.title}
          </h2>
          <p className="mt-4 text-base text-cream-100/70">{c.lead}</p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream-100/10 bg-cream-100/10 sm:grid-cols-2 lg:grid-cols-3">
          {FOUNDER.missions.map((m, i) => {
            const Icon = ICONS[m.icon];
            return (
              <li key={m.icon} className="group relative flex flex-col bg-forest-900 p-7 transition-colors hover:bg-[#21503c] lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-forest-900">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-3xl font-semibold text-cream-100/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold-400">
                  {m.title[locale]}
                </h3>
                <p className="mt-3 font-serif text-xl leading-snug text-cream">
                  {m.goal[locale]}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
