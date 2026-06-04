"use client";

import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { trackEvent, type TrackEventKey } from "@/lib/analytics/events";

const CONTACT_ITEMS: Array<{
  key: "address" | "phone" | "whatsapp" | "hours";
  Icon: LucideIcon;
  hrefBuilder?: (rawValue: string) => string;
  eventKey?: TrackEventKey;
}> = [
  { key: "address", Icon: MapPin },
  {
    key: "phone",
    Icon: Phone,
    hrefBuilder: (v) => `tel:${v.replace(/\s/g, "")}`,
    eventKey: "contact_phone",
  },
  {
    key: "whatsapp",
    Icon: MessageCircle,
    hrefBuilder: (v) => `https://wa.me/${v.replace(/[^0-9]/g, "")}`,
    eventKey: "contact_whatsapp",
  },
  { key: "hours", Icon: Clock },
];

export function ContactPreview() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-forest-900 py-20 lg:py-28"
    >
      {/* Decorative ornament */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,97,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(82,183,136,0.15),transparent_55%)]"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t("eyebrow")}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream-100/80 lg:text-lg">
              {t("subtitle")}
            </p>
            <LinkButton
              href="#request"
              variant="secondary"
              size="lg"
              className="mt-8"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-2xl bg-cream-100/10 sm:grid-cols-2">
              {CONTACT_ITEMS.map(({ key, Icon, hrefBuilder, eventKey }) => {
                const value = t(`${key}.value`);
                const content = (
                  <>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-400/15 text-gold-400">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-cream-100/60">
                        {t(`${key}.label`)}
                      </p>
                      <p className="mt-1 font-serif text-lg leading-snug text-cream">
                        {value}
                      </p>
                    </div>
                  </>
                );

                const wrapperClass =
                  "flex items-start gap-4 bg-forest-900 p-7 transition-colors hover:bg-forest-700";

                return (
                  <li key={key}>
                    {hrefBuilder ? (
                      <a
                        href={hrefBuilder(value)}
                        target={key === "whatsapp" ? "_blank" : undefined}
                        rel={key === "whatsapp" ? "noopener noreferrer" : undefined}
                        onClick={
                          eventKey
                            ? () =>
                                trackEvent(eventKey, {
                                  source: "contact_preview",
                                })
                            : undefined
                        }
                        className={wrapperClass}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={wrapperClass}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
