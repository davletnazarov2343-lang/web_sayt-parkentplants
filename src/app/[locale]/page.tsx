import { unstable_setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { CeoQuote } from "@/components/sections/CeoQuote";
import { About } from "@/components/sections/About";
import { FeaturedVarieties } from "@/components/sections/FeaturedVarieties";
import { B2BProcess } from "@/components/sections/B2BProcess";
import { Nurseries } from "@/components/sections/Nurseries";
import { Testimonials } from "@/components/sections/Testimonials";
import { KnowledgeCenter } from "@/components/sections/KnowledgeCenter";
import { Faq } from "@/components/sections/Faq";
import { ContactPreview } from "@/components/sections/ContactPreview";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <Stats />
      <CeoQuote />
      <About />
      <FeaturedVarieties />
      <B2BProcess />
      <Nurseries />
      <Testimonials />
      <KnowledgeCenter />
      <Faq />
      <ContactPreview />
    </>
  );
}
