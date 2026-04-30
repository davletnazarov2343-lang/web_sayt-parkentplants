"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "#top" },
  { key: "varieties", href: "#varieties" },
  { key: "about", href: "#about" },
  { key: "nursery", href: "#stats" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-cream/95 backdrop-blur-md border-b border-earth-400/20 shadow-[0_1px_24px_-8px_rgba(27,67,50,0.15)]"
          : "bg-transparent",
      )}
    >
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-6">
          <a
            href="#top"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-earth-900 hover:text-forest-700 transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <a
              href="#contact"
              className="hidden md:inline-flex"
              aria-label={tHero("ctaSecondary")}
            >
              <Button size="sm" variant="primary">
                {tHero("ctaSecondary")}
              </Button>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("close") : t("menu")}
              aria-expanded={open}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-earth-900 hover:bg-cream-100"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-earth-400/20 bg-cream/98 backdrop-blur-md">
          <Container size="wide">
            <nav className="flex flex-col py-6 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-base font-medium text-earth-900 hover:bg-cream-100 hover:text-forest-700 transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3"
              >
                <Button className="w-full" variant="primary">
                  {tHero("ctaSecondary")}
                </Button>
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
