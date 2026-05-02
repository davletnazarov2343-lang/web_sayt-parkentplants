import { Container } from "@/components/ui/Container";

/**
 * Skeleton — katalog yuklanayotganda ko'rinadi.
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

        {/* Filter chips */}
        <div className="mt-10 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full bg-earth-400/15"
            />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-earth-400/25 bg-cream"
            >
              <div className="h-44 animate-pulse bg-earth-400/20" />
              <div className="p-6">
                <div className="h-5 w-3/4 animate-pulse rounded bg-earth-400/20" />
                <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-earth-400/15" />
                <div className="mt-5 h-3 w-1/3 animate-pulse rounded bg-earth-400/15" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
