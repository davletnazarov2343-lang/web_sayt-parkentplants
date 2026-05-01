import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { BRAND } from "@/lib/constants";
import {
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

const NAV_ITEMS = [
  { key: "home", href: "#top" },
  { key: "varieties", href: "#varieties" },
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
    name: "YouTube",
    Icon: YoutubeIcon,
    href: "https://www.youtube.com/@shuhrat_abrorov",
  },
] as const;

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-cream-100/90">
      <Container size="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-100/70">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100/70 transition-all hover:border-gold-400 hover:text-gold-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-semibold text-cream">
              {t("footer.navTitle")}
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-cream-100/70 transition-colors hover:text-gold-400"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-base font-semibold text-cream">
              {t("footer.contactTitle")}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="text-cream-100/80">
                  {t("contact.address.value")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <a
                  href={`tel:${t("contact.phone.value").replace(/\s/g, "")}`}
                  className="text-cream-100/80 transition-colors hover:text-gold-400"
                >
                  {t("contact.phone.value")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <a
                  href={`https://wa.me/${t("contact.whatsapp.value").replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/80 transition-colors hover:text-gold-400"
                >
                  {t("contact.whatsapp.value")}{" "}
                  <span className="text-cream-100/50">· WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <a
                  href={`mailto:${t("contact.email.value")}`}
                  className="text-cream-100/80 transition-colors hover:text-gold-400"
                >
                  {t("contact.email.value")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="text-cream-100/80">
                  {t("contact.hours.value")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream-100/10 py-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-cream-100/60 sm:flex-row">
            <p>
              © {year} {BRAND.name}. {t("footer.rights")}
            </p>
            <p>{BRAND.domain}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
