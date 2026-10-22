import { Container } from "@/components/ui/Container";

/**
 * Skeleton — sahifa yuklanayotganda ko'rinadi.
 * Cumulative Layout Shift'ni kamaytiradi.
 */
export default function VarietiesLoading() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-3 w-32 rounded bg-earth-400/20" />
          <div className="mx-auto mt-5 h-12 w-3/4 rounded-lg bg-earth-400/20" />
          <div className="mx-auto mt-5 h-4 w-2/3 rounded bg-earth-400/15" />
        </header>
      </Container>
    </section>
  );
}
