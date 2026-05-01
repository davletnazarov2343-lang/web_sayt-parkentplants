"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { recommend } from "@/lib/quiz/scoring";
import { getFruitMeta } from "@/lib/quiz/data";
import type {
  AreaSize,
  Goal,
  HarvestTimeline,
  QuizAnswers,
  Region,
  SoilType,
  WaterSource,
  QuizResult,
} from "@/lib/quiz/types";

type Stage =
  | { state: "questions"; step: number }
  | { state: "result"; result: QuizResult }
  | {
      state: "submitting";
      result: QuizResult;
      payload: { name: string; phone: string };
    }
  | { state: "submitted"; result: QuizResult }
  | {
      state: "error";
      result: QuizResult;
      payload: { name: string; phone: string };
      message: string;
    };

const TOTAL_STEPS = 5;

const GOALS: Goal[] = ["investment", "commercial", "export", "household"];
const REGIONS: Region[] = [
  "tashkent_fergana",
  "samarkand_bukhara",
  "khorezm",
  "south",
  "mountain",
  "export_only",
];
const AREAS: AreaSize[] = ["small", "medium", "large", "industrial"];
const SOILS: SoilType[] = ["normal", "salty", "heavy_clay", "sandy_light"];
const WATERS: WaterSource[] = ["drip", "canal", "rain"];
const TIMELINES: HarvestTimeline[] = ["fast", "balanced", "patient"];

export function Quiz({ locale }: { locale: "uz" | "ru" }) {
  const t = useTranslations("quiz");

  const [stage, setStage] = useState<Stage>({ state: "questions", step: 0 });
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  function setAnswer<K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K],
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    if (stage.state !== "questions") return;
    if (stage.step < TOTAL_STEPS - 1) {
      setStage({ state: "questions", step: stage.step + 1 });
    } else {
      // All answered → compute
      const finalAnswers = answers as QuizAnswers;
      const result = recommend(finalAnswers);
      setStage({ state: "result", result });
    }
  }

  function prevStep() {
    if (stage.state !== "questions") return;
    if (stage.step > 0) {
      setStage({ state: "questions", step: stage.step - 1 });
    }
  }

  function restart() {
    setAnswers({});
    setStage({ state: "questions", step: 0 });
  }

  // Validation: each step requires its answer
  function canAdvance(step: number) {
    switch (step) {
      case 0:
        return Boolean(answers.goal);
      case 1:
        return Boolean(answers.region);
      case 2:
        return Boolean(answers.area);
      case 3:
        return Boolean(answers.soil) && Boolean(answers.water);
      case 4:
        return Boolean(answers.timeline);
      default:
        return false;
    }
  }

  return (
    <section
      id="quiz"
      className="relative isolate overflow-hidden bg-gradient-to-br from-forest-900 via-forest-900 to-forest-700 py-20 lg:py-28"
    >
      {/* Decorative */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_top_right,rgba(201,169,97,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(82,183,136,0.1),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(to_right,#FEFCF8_1px,transparent_1px),linear-gradient(to_bottom,#FEFCF8_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <Container size="narrow">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            <Award className="h-3.5 w-3.5" strokeWidth={2} />
            {t("eyebrow")}
          </span>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream-100/80 lg:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-cream p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-10">
          {stage.state === "questions" && (
            <QuestionsView
              step={stage.step}
              answers={answers}
              setAnswer={setAnswer}
              onNext={nextStep}
              onPrev={prevStep}
              canAdvance={canAdvance(stage.step)}
            />
          )}

          {stage.state === "result" && (
            <ResultView
              result={stage.result}
              locale={locale}
              onRestart={restart}
              onSubmit={(payload) => {
                setStage({ state: "submitting", result: stage.result, payload });
                submitQuizLead(stage.result, payload, locale)
                  .then(() => setStage({ state: "submitted", result: stage.result }))
                  .catch((err) => {
                    setStage({
                      state: "error",
                      result: stage.result,
                      payload,
                      message: err instanceof Error ? err.message : "unknown",
                    });
                  });
              }}
            />
          )}

          {stage.state === "submitting" && (
            <ResultView
              result={stage.result}
              locale={locale}
              onRestart={restart}
              isSubmitting
            />
          )}

          {stage.state === "submitted" && (
            <SuccessView result={stage.result} locale={locale} onRestart={restart} />
          )}

          {stage.state === "error" && (
            <ResultView
              result={stage.result}
              locale={locale}
              onRestart={restart}
              error={stage.message}
              onSubmit={(payload) => {
                setStage({ state: "submitting", result: stage.result, payload });
                submitQuizLead(stage.result, payload, locale)
                  .then(() => setStage({ state: "submitted", result: stage.result }))
                  .catch((err) => {
                    setStage({
                      state: "error",
                      result: stage.result,
                      payload,
                      message: err instanceof Error ? err.message : "unknown",
                    });
                  });
              }}
            />
          )}
        </div>
      </Container>
    </section>
  );
}

// ===========================================================================
// Questions view (5 steps)
// ===========================================================================

type QuestionsViewProps = {
  step: number;
  answers: Partial<QuizAnswers>;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  onNext: () => void;
  onPrev: () => void;
  canAdvance: boolean;
};

function QuestionsView({
  step,
  answers,
  setAnswer,
  onNext,
  onPrev,
  canAdvance,
}: QuestionsViewProps) {
  const t = useTranslations("quiz");

  return (
    <div>
      {/* Progress */}
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-earth-700">
          {t("step", { current: step + 1, total: TOTAL_STEPS })}
        </span>
        <div className="flex flex-1 items-center gap-1.5 px-6">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-forest-700" : "bg-earth-400/30",
              )}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Goal */}
      {step === 0 && (
        <StepRadio
          title={t("q.goal.title")}
          description={t("q.goal.description")}
          options={GOALS.map((g) => ({
            value: g,
            label: t(`q.goal.options.${g}.label`),
            hint: t(`q.goal.options.${g}.hint`),
          }))}
          value={answers.goal}
          onChange={(v) => setAnswer("goal", v as Goal)}
        />
      )}

      {/* Step 2: Region */}
      {step === 1 && (
        <StepRadio
          title={t("q.region.title")}
          description={t("q.region.description")}
          options={REGIONS.map((r) => ({
            value: r,
            label: t(`q.region.options.${r}.label`),
            hint: t(`q.region.options.${r}.hint`),
          }))}
          value={answers.region}
          onChange={(v) => setAnswer("region", v as Region)}
        />
      )}

      {/* Step 3: Area */}
      {step === 2 && (
        <StepRadio
          title={t("q.area.title")}
          description={t("q.area.description")}
          options={AREAS.map((a) => ({
            value: a,
            label: t(`q.area.options.${a}.label`),
            hint: t(`q.area.options.${a}.hint`),
          }))}
          value={answers.area}
          onChange={(v) => setAnswer("area", v as AreaSize)}
        />
      )}

      {/* Step 4: Soil + Water (combined) */}
      {step === 3 && (
        <div>
          <h3 className="font-serif text-2xl font-semibold text-earth-900 sm:text-3xl">
            {t("q.soilWater.title")}
          </h3>
          <p className="mt-2 text-sm text-earth-700">
            {t("q.soilWater.description")}
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-earth-900">
              {t("q.soilWater.soilLabel")}
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {SOILS.map((s) => (
                <OptionButton
                  key={s}
                  active={answers.soil === s}
                  onClick={() => setAnswer("soil", s)}
                  label={t(`q.soilWater.soil.${s}.label`)}
                  hint={t(`q.soilWater.soil.${s}.hint`)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-earth-900">
              {t("q.soilWater.waterLabel")}
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {WATERS.map((w) => (
                <OptionButton
                  key={w}
                  active={answers.water === w}
                  onClick={() => setAnswer("water", w)}
                  label={t(`q.soilWater.water.${w}.label`)}
                  hint={t(`q.soilWater.water.${w}.hint`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Timeline */}
      {step === 4 && (
        <StepRadio
          title={t("q.timeline.title")}
          description={t("q.timeline.description")}
          options={TIMELINES.map((tl) => ({
            value: tl,
            label: t(`q.timeline.options.${tl}.label`),
            hint: t(`q.timeline.options.${tl}.hint`),
          }))}
          value={answers.timeline}
          onChange={(v) => setAnswer("timeline", v as HarvestTimeline)}
        />
      )}

      {/* Nav */}
      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-earth-700 hover:text-forest-700 disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.back")}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canAdvance}
          className="inline-flex items-center gap-2 rounded-md bg-forest-700 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-900 disabled:opacity-50"
        >
          {step === TOTAL_STEPS - 1 ? t("nav.finish") : t("nav.next")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ===========================================================================
// Step radio (single-choice list)
// ===========================================================================

type StepRadioProps<V extends string> = {
  title: string;
  description?: string;
  options: Array<{ value: V; label: string; hint?: string }>;
  value: V | undefined;
  onChange: (v: V) => void;
};

function StepRadio<V extends string>({
  title,
  description,
  options,
  value,
  onChange,
}: StepRadioProps<V>) {
  return (
    <div>
      <h3 className="font-serif text-2xl font-semibold text-earth-900 sm:text-3xl">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-earth-700">{description}</p>
      )}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <OptionButton
            key={opt.value}
            active={value === opt.value}
            onClick={() => onChange(opt.value)}
            label={opt.label}
            hint={opt.hint}
          />
        ))}
      </div>
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-forest-700 bg-forest-700/5 shadow-[0_4px_18px_-8px_rgba(27,67,50,0.4)]"
          : "border-earth-400/30 bg-cream-100 hover:border-forest-400 hover:bg-cream",
      )}
    >
      {active && (
        <CheckCircle2
          className="absolute right-3 top-3 h-5 w-5 text-forest-700"
          strokeWidth={2}
        />
      )}
      <span
        className={cn(
          "font-semibold leading-tight",
          active ? "text-forest-900" : "text-earth-900",
        )}
      >
        {label}
      </span>
      {hint && (
        <span className="text-xs leading-relaxed text-earth-700">{hint}</span>
      )}
    </button>
  );
}

// ===========================================================================
// Result view
// ===========================================================================

function ResultView({
  result,
  locale,
  onRestart,
  onSubmit,
  isSubmitting,
  error,
}: {
  result: QuizResult;
  locale: "uz" | "ru";
  onRestart: () => void;
  onSubmit?: (payload: { name: string; phone: string }) => void;
  isSubmitting?: boolean;
  error?: string;
}) {
  const t = useTranslations("quiz");
  const tFruit = useTranslations("varieties.items");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!onSubmit || !name.trim() || !phone.trim()) return;
    onSubmit({ name: name.trim(), phone: phone.trim() });
  }

  return (
    <div>
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-forest-700/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-forest-700">
          <Award className="h-3.5 w-3.5" strokeWidth={2} />
          {t("result.eyebrow")}
        </span>
        <h3 className="mt-4 font-serif text-2xl font-semibold text-earth-900 sm:text-3xl">
          {t("result.title")}
        </h3>
        <p className="mt-2 text-sm text-earth-700">{t("result.subtitle")}</p>
      </div>

      {/* Top 3 fruits */}
      <ol className="mt-8 space-y-3">
        {result.topFruits.map((rec, idx) => {
          const meta = getFruitMeta(rec.id);
          if (!meta) return null;
          // Map FruitId to varieties i18n key (some IDs map to existing varieties items)
          const i18nKey = mapFruitToVarietyKey(rec.id);
          const fruitName = i18nKey
            ? tFruit(`${i18nKey}.name`)
            : t(`fruits.${rec.id}.name`);

          return (
            <li
              key={rec.id}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-5 transition-colors sm:flex-row sm:gap-5",
                idx === 0
                  ? "border-forest-400 bg-forest-50/30"
                  : "border-earth-400/25 bg-cream-100",
              )}
            >
              <div className="flex items-center justify-center gap-2 sm:flex-col sm:items-start">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full font-serif text-sm font-bold",
                    idx === 0
                      ? "bg-gold-400 text-earth-900"
                      : "bg-forest-700 text-cream",
                  )}
                >
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-earth-700">
                  {rec.score}/100
                </span>
              </div>

              <div className="flex-1">
                <h4 className="font-serif text-xl font-semibold text-earth-900">
                  {fruitName}
                </h4>
                <p className="mt-1 text-sm text-earth-700">
                  ${meta.income.min.toLocaleString()} – $
                  {meta.income.max.toLocaleString()} / ga ·{" "}
                  {t("result.yearsToHarvest", { n: meta.yearsToHarvest })}
                </p>

                {rec.matchReasons.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {rec.matchReasons.map((reason) => (
                      <li
                        key={reason}
                        className="inline-flex items-center gap-1 rounded-full bg-forest-700/10 px-2.5 py-1 text-xs font-medium text-forest-700"
                      >
                        <CheckCircle2
                          className="h-3 w-3"
                          strokeWidth={2.5}
                        />
                        {t(`reasons.${reason}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* CTA: phone capture */}
      {onSubmit && (
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border-2 border-dashed border-forest-400/50 bg-forest-50/20 p-6"
        >
          <h4 className="font-serif text-xl font-semibold text-earth-900">
            {t("result.ctaTitle")}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-earth-700">
            {t("result.ctaSubtitle")}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-earth-700">
            {["nameList", "rootstockList", "yieldCalc", "consultation"].map(
              (k) => (
                <li key={k} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-forest-700"
                    strokeWidth={2}
                  />
                  <span>{t(`result.ctaItems.${k}`)}</span>
                </li>
              ),
            )}
          </ul>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder={t("result.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-earth-400/40 bg-cream px-4 py-3 text-sm focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            />
            <input
              type="tel"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-md border border-earth-400/40 bg-cream px-4 py-3 text-sm focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-400/30"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || phone.length < 7}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-400 px-6 py-3.5 text-sm font-semibold text-earth-900 transition-all hover:bg-gold-100 disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("result.sending")}
              </>
            ) : (
              <>
                {t("result.cta")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={2}
              />
              <span>{error}</span>
            </div>
          )}

          <p className="mt-3 text-xs text-earth-700/70">
            {t("result.privacy")}
          </p>
        </form>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 text-sm font-semibold text-earth-700 hover:text-forest-700"
      >
        ↻ {t("result.restart")}
      </button>
    </div>
  );
}

// ===========================================================================
// Success view
// ===========================================================================

function SuccessView({
  result,
  locale,
  onRestart,
}: {
  result: QuizResult;
  locale: "uz" | "ru";
  onRestart: () => void;
}) {
  const t = useTranslations("quiz");
  return (
    <div className="text-center py-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-700 text-cream">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.75} />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-earth-900 sm:text-3xl">
        {t("success.title")}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-earth-700">
        {t("success.subtitle")}
      </p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-forest-700 px-6 py-3 text-sm font-semibold text-forest-700 hover:bg-forest-700 hover:text-cream"
      >
        ↻ {t("success.again")}
      </button>
    </div>
  );
}

// ===========================================================================
// Helpers
// ===========================================================================

function mapFruitToVarietyKey(fruitId: string): string | null {
  // Map FruitId to existing varieties.items key (so we reuse i18n names)
  const map: Record<string, string> = {
    cherry: "cherry",
    apple_intensive: "apple",
    pear_intensive: "pear",
    peach: "peach",
    apricot: "apricot",
    plum: "plum",
    walnut: "walnut",
    // Others (almond, grape, fig, pomegranate) need their own quiz.fruits.* keys
  };
  return map[fruitId] ?? null;
}

async function submitQuizLead(
  result: QuizResult,
  payload: { name: string; phone: string },
  locale: "uz" | "ru",
): Promise<void> {
  const fruitTypes = result.topFruits.map((f) =>
    mapFruitToVarietyKey(f.id) ?? "other",
  );
  const message = [
    "Quiz natijasi bo'yicha so'rov:",
    `Top 3: ${result.topFruits.map((f) => `${f.id} (${f.score})`).join(", ")}`,
    `Maqsad: ${result.answers.goal}`,
    `Hudud: ${result.answers.region}`,
    `Maydon: ${result.answers.area}`,
    `Tuproq: ${result.answers.soil}`,
    `Suv: ${result.answers.water}`,
    `Hosil muddati: ${result.answers.timeline}`,
  ].join("\n");

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      consent: true,
      locale,
      fruitTypes: fruitTypes.filter((t) => t !== "other"),
      message,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
}
