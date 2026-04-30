import { unstable_setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { FeaturedVarieties } from "@/components/sections/FeaturedVarieties";
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
      <Stats />
      <About />
      <FeaturedVarieties />
      <ContactPreview />
    </>
  );
}
