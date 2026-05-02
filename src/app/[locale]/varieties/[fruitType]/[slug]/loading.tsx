import { Container } from "@/components/ui/Container";

export default function VarietyDetailLoading() {
  return (
    <article className="bg-cream pt-12 pb-20 lg:pt-16 lg:pb-28">
      <Container>
        {/* Breadcrumb */}
        <div className="h-3 w-48 animate-pulse rounded bg-earth-400/20" />

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-earth-400/20" />
          </div>

          {/* Info */}
          <div className="lg:col-span-6">
            <div className="h-3 w-24 animate-pulse rounded bg-earth-400/20" />
            <div className="mt-4 h-12 w-3/4 animate-pulse rounded-lg bg-earth-400/20" />
            <div className="mt-6 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-earth-400/15" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-earth-400/15" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-earth-400/15" />
            </div>

            {/* Spec table */}
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-earth-400/25 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-cream-100 p-5">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-earth-400/20" />
                  <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-earth-400/20" />
                </div>
              ))}
            </div>

            <div className="mt-10 h-12 w-48 animate-pulse rounded-md bg-earth-400/20" />
          </div>
        </div>
      </Container>
    </article>
  );
}
