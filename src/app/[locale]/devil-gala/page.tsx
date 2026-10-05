import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { VarietyLanding } from "@/components/landing/VarietyLanding";
import { generateVarietyLandingMetadata } from "@/components/landing/metadata";
import { VARIETY_LANDINGS } from "@/lib/landings";

type Props = { params: { locale: string } };

const CONFIG = VARIETY_LANDINGS["devil-gala"];

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  unstable_setRequestLocale(locale);
  return generateVarietyLandingMetadata(CONFIG, locale);
}

export default function DevilGalaPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  return <VarietyLanding config={CONFIG} locale={locale} />;
}
