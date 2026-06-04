"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  FRUIT_TYPE_KEYS,
  REGION_KEYS,
  VOLUME_PLAN_KEYS,
  leadSchema,
  type FruitTypeKey,
  type RegionKey,
  type VolumePlanKey,
  type LeadInput,
} from "@/lib/leads/schema";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/events";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const initialFruitTypes: Record<FruitTypeKey, boolean> = FRUIT_TYPE_KEYS.reduce(
  (acc, key) => {
    acc[key] = false;
    return acc;
  },
  {} as Record<FruitTypeKey, boolean>,
);

export function LeadForm({ locale }: { locale: "uz" | "ru" }) {
  const t = useTranslations("leadForm");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState<RegionKey | "">("");
  const [volume, setVolume] = useState<VolumePlanKey | "">("");
  const [fruitTypes, setFruitTypes] = useState(initialFruitTypes);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [hasStarted, setHasStarted] = useState(false);

  function handleFormStart() {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent("lead_form_start", { form: "main_lead_form", locale });
  }

  function toggleFruit(key: FruitTypeKey) {
    setFruitTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus({ state: "submitting" });

    const payload: LeadInput = {
      name: name.trim(),
      phone: phone.trim(),
      company: company.trim() || undefined,
      region: region || undefined,
      volumePlan: volume || undefined,
      fruitTypes: (Object.entries(fruitTypes)
        .filter(([, v]) => v)
        .map(([k]) => k) as FruitTypeKey[]),
      message: message.trim() || undefined,
      consent,
      locale,
      website: website || undefined,
    };

    // Client-side validation (server ham qayta tekshiradi)
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "_form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus({ state: "idle" });
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        details?: Record<string, string[]>;
      };

      if (!res.ok || !data.ok) {
        if (data.details) {
          const fieldErrors: Record<string, string> = {};
          for (const [key, values] of Object.entries(data.details)) {
            fieldErrors[key] = values?.[0] ?? "invalid";
          }
          setErrors(fieldErrors);
          setStatus({ state: "idle" });
          return;
        }
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setStatus({ state: "success" });
      // Marketing event — Lead yaratildi (Facebook/GA/Yandex)
      trackEvent("lead", {
        form: "main_lead_form",
        locale,
        region: region || undefined,
        volume: volume || undefined,
      });
      // Form'ni tozalaymiz (keyingi so'rov uchun)
      setName("");
      setPhone("+998 ");
      setCompany("");
      setRegion("");
      setVolume("");
      setFruitTypes(initialFruitTypes);
      setMessage("");
      setConsent(false);
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "unknown",
      });
    }
  }

  return (
    <section
      id="request"
      className="relative isolate overflow-hidden bg-cream-100 py-20 lg:py-28"
    >
      <Container size="narrow">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-forest-600">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-earth-900 sm:text-4xl lg:text-5xl text-balance">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-earth-700">
            {t("subtitle")}
          </p>
        </header>

        {status.state === "success" ? (
          <SuccessPanel onReset={() => setStatus({ state: "idle" })} />
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 rounded-2xl border border-earth-400/25 bg-cream p-6 shadow-[0_8px_40px_-20px_rgba(27,67,50,0.18)] sm:p-10"
          >
            {/* Honeypot — vizual yashirin */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("fields.name.label")}
                required
                error={errors.name && t(`errors.${errors.name}`)}
              >
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleFormStart}
                  className={inputClass(Boolean(errors.name))}
                  placeholder={t("fields.name.placeholder")}
                />
              </Field>
              <Field
                label={t("fields.phone.label")}
                required
                error={errors.phone && t(`errors.${errors.phone}`)}
              >
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass(Boolean(errors.phone))}
                  placeholder="+998 90 123 45 67"
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field
                label={t("fields.company.label")}
                error={errors.company && t(`errors.${errors.company}`)}
              >
                <input
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClass(Boolean(errors.company))}
                  placeholder={t("fields.company.placeholder")}
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label={t("fields.region.label")}>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as RegionKey | "")}
                  className={inputClass(false)}
                >
                  <option value="">{t("fields.region.placeholder")}</option>
                  {REGION_KEYS.map((r) => (
                    <option key={r} value={r}>
                      {t(`regions.${r}`)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("fields.volume.label")}>
                <select
                  value={volume}
                  onChange={(e) =>
                    setVolume(e.target.value as VolumePlanKey | "")
                  }
                  className={inputClass(false)}
                >
                  <option value="">{t("fields.volume.placeholder")}</option>
                  {VOLUME_PLAN_KEYS.map((v) => (
                    <option key={v} value={v}>
                      {t(`volumes.${v}`)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-6">
              <span className="block text-sm font-semibold text-earth-900">
                {t("fields.fruitTypes.label")}
              </span>
              <p className="mt-1 text-xs text-earth-700">
                {t("fields.fruitTypes.hint")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {FRUIT_TYPE_KEYS.map((key) => {
                  const active = fruitTypes[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleFruit(key)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "border-forest-700 bg-forest-700 text-cream"
                          : "border-earth-400/40 bg-cream-100 text-earth-900 hover:border-forest-400",
                      )}
                    >
                      {t(`fruitTypes.${key}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5">
              <Field
                label={t("fields.message.label")}
                error={errors.message && t(`errors.${errors.message}`)}
              >
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputClass(false), "min-h-[110px] resize-y")}
                  placeholder={t("fields.message.placeholder")}
                />
              </Field>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-earth-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-earth-400 text-forest-700 focus:ring-forest-400"
              />
              <span>
                {t("consent")}{" "}
                {errors.consent && (
                  <span className="font-semibold text-red-600">
                    — {t(`errors.${errors.consent}`)}
                  </span>
                )}
              </span>
            </label>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status.state === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-forest-700 px-7 py-3.5 font-medium text-cream transition-all hover:bg-forest-900 disabled:opacity-60"
              >
                {status.state === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    {t("submit")}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="text-xs leading-relaxed text-earth-700/70">
                {t("disclaimer")}
              </p>
            </div>

            {status.state === "error" && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-900">
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  strokeWidth={2}
                />
                <div>
                  <p className="font-semibold">{t("errorTitle")}</p>
                  <p className="mt-1 text-red-800/80">{status.message}</p>
                </div>
              </div>
            )}
          </form>
        )}
      </Container>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | false | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-earth-900">
        {label}
        {required && <span className="ml-0.5 text-forest-700">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </label>
  );
}

function inputClass(error: boolean) {
  return cn(
    "block w-full rounded-md border bg-cream-100 px-3.5 py-2.5 text-sm text-earth-900 placeholder:text-earth-700/50",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-forest-400 focus:ring-offset-1 focus:ring-offset-cream",
    error
      ? "border-red-400 focus:ring-red-400"
      : "border-earth-400/40 focus:border-forest-400",
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  const t = useTranslations("leadForm");
  return (
    <div className="mt-12 rounded-2xl border border-forest-400/40 bg-forest-50/40 p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-700 text-cream">
        <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold text-earth-900">
        {t("success.title")}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-earth-700">
        {t("success.subtitle")}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900"
      >
        {t("success.again")}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
