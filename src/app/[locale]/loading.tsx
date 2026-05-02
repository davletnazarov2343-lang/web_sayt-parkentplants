import { Container } from "@/components/ui/Container";

/**
 * Bosh sahifa uchun loading skeleton — Hero qismini taqlid qiladi.
 * Faqat Sanity'dan dinamik ma'lumot chaqirilganda paydo bo'ladi (Header sticky qoladi).
 */
export default function HomeLoading() {
  return (
    <section className="relative bg-gradient-to-b from-cream-100 to-cream pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow pill */}
          <div className="mx-auto h-9 w-64 animate-pulse rounded-full bg-earth-400/20" />
          {/* Title */}
          <div className="mx-auto mt-8 space-y-4">
            <div className="mx-auto h-14 w-5/6 animate-pulse rounded-lg bg-earth-400/20" />
            <div className="mx-auto h-14 w-3/4 animate-pulse rounded-lg bg-earth-400/20" />
          </div>
          {/* Subtitle */}
          <div className="mx-auto mt-8 space-y-2">
            <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-earth-400/15" />
            <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-earth-400/15" />
          </div>
          {/* CTAs */}
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="h-12 w-44 animate-pulse rounded-md bg-earth-400/25" />
            <div className="h-12 w-44 animate-pulse rounded-md bg-earth-400/15" />
          </div>
        </div>
      </Container>
    </section>
  );
}
