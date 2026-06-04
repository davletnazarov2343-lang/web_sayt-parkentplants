"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { LinkButton } from "@/components/ui/Button";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { trackEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "#top" },
  { key: "nursery", href: "#nurseries" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#request" },
] as const;

const SOCIAL_LINKS = [
  {
    name: "Telegram",
    Icon: TelegramIcon,
    href: "https://t.me/+Q2HYAuBIWn4wN2Vi",
  },
  {
    name: "Instagram",
    Icon: InstagramIcon,
    href: "https://www.instagram.com/shuhrat_abrorov/",
  },
  {
    name: "Facebook",
    Icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=61552782846741",
  },
  {
    name: "YouTube",
    Icon: YoutubeIcon,
    href: "https://www.youtube.com/@shuhrat_abrorov",
  },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tContact = useTranslations("contact");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const phoneRaw = tContact("phone.value");
  const phoneHref = `tel:${phoneRaw.replace(/\s/g, "")}`;
  const email = tContact("email.value");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* === Top utility bar — eng to'q (forest-900) === */}
      <div
        className={cn(
          "hidden lg:block bg-forest-900 text-cream-100/75 transition-[max-height,opacity] duration-300 overflow-hidden",
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100",
        )}
      >
        <Container size="wide">
          <div className="flex h-10 items-center justify-between text-xs">
            <ul className="flex items-center gap-7">
              <li>
                <a
                  href={phoneHref}
                  onClick={() => trackEvent("contact_phone", { source: "header_top" })}
                  className="flex items-center gap-2 transition-colors hover:text-gold-400"
                >
                  <Phone
                    className="h-3.5 w-3.5 text-gold-400"
                    strokeWidth={2}
                  />
                  <span className="font-medium">{phoneRaw}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  onClick={() => trackEvent("contact_email", { source: "header_top" })}
                  className="flex items-center gap-2 transition-colors hover:text-gold-400"
                >
                  <Mail
                    className="h-3.5 w-3.5 text-gold-400"
                    strokeWidth={2}
                  />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock
                  className="h-3.5 w-3.5 text-gold-400"
                  strokeWidth={2}
                />
                <span>{tContact("hours.value")}</span>
              </li>
            </ul>
            <ul className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-cream-100/60 transition-colors hover:bg-forest-700 hover:text-gold-400"
                  >
                    <Icon size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      {/* === Main nav — to'q yashil, oq matn === */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled || open
            ? "bg-forest-900/95 backdrop-blur-md border-forest-700/40 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]"
            : "bg-forest-900 border-forest-700/30",
        )}
      >
        <Container size="wide">
          <div className="flex h-[72px] items-center justify-between gap-6 lg:h-20">
            <a
              href="#top"
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label="Parkent Plants — bosh sahifa"
            >
              <Logo variant="light" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="group relative px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-cream-100/85 transition-colors hover:text-cream"
                >
                  {t(item.key)}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-4 -bottom-px h-0.5 origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LocaleSwitcher
                className="hidden md:inline-flex"
                variant="light"
              />
              <LinkButton
                href="#request"
                size="sm"
                variant="secondary"
                className="hidden md:inline-flex shadow-[0_4px_14px_-4px_rgba(201,169,97,0.5)]"
                aria-label={tHero("ctaSecondary")}
              >
                {tHero("ctaSecondary")}
                <ArrowRight className="h-3.5 w-3.5" />
              </LinkButton>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? t("close") : t("menu")}
                aria-expanded={open}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-cream-100 hover:bg-forest-700"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* === Mobile menu === */}
      {open && (
        <div className="lg:hidden border-t border-forest-700/40 bg-forest-900/98 backdrop-blur-md">
          <Container size="wide">
            <nav className="flex flex-col py-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-base font-semibold text-cream-100/90 hover:bg-forest-700 hover:text-cream transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>

            {/* Mobile contact strip */}
            <div className="border-t border-forest-700/40 py-4 space-y-3 text-sm">
              <a
                href={phoneHref}
                onClick={() => trackEvent("contact_phone", { source: "mobile_menu" })}
                className="flex items-center gap-3 text-cream-100/90 hover:text-gold-400"
              >
                <Phone
                  className="h-4 w-4 text-gold-400"
                  strokeWidth={2}
                />
                <span className="font-semibold">{phoneRaw}</span>
              </a>
              <a
                href={`mailto:${email}`}
                onClick={() => trackEvent("contact_email", { source: "mobile_menu" })}
                className="flex items-center gap-3 text-cream-100/75 hover:text-gold-400"
              >
                <Mail
                  className="h-4 w-4 text-gold-400"
                  strokeWidth={2}
                />
                <span>{email}</span>
              </a>
              <div className="flex items-center gap-2 pt-2">
                <LocaleSwitcher variant="light" />
                <div className="ml-auto flex items-center gap-1.5">
                  {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/20 text-cream-100/70 transition-colors hover:border-gold-400 hover:text-gold-400"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="pb-5">
              <LinkButton
                href="#request"
                onClick={() => setOpen(false)}
                variant="secondary"
                size="lg"
                className="w-full"
              >
                {tHero("ctaSecondary")}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
