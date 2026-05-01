import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** "dark" — light fonda (Header), "light" — dark fonda (Footer) */
  variant?: "dark" | "light";
  /** Faqat ikonkani ko'rsatish (mobile yoki kichik joylar uchun) */
  iconOnly?: boolean;
};

/**
 * Parkent Plants logosi (real PNG fayllar `public/brand/` ichida).
 *
 * - `variant="dark"` (default) — Header'da (cream fon) — to'liq rangli logo
 * - `variant="light"` — Footer'da (forest-900 fon) — oq versiya
 * - `iconOnly` — faqat olcha+tog' ikonkasi
 */
export function Logo({
  className,
  variant = "dark",
  iconOnly = false,
}: LogoProps) {
  if (iconOnly) {
    return (
      <Image
        src="/brand/icon-square.png"
        alt="Parkent Plants"
        width={48}
        height={48}
        priority
        className={cn("h-10 w-10 rounded-md object-cover", className)}
      />
    );
  }

  const src =
    variant === "light" ? "/brand/logo-dark.png" : "/brand/logo-light.png";

  // Asl PNG aspect ratio ~1.72:1. h-12 (48px) -> width ~82px.
  return (
    <Image
      src={src}
      alt="Parkent Plants"
      width={206}
      height={120}
      priority
      className={cn(
        "h-10 w-auto sm:h-11 lg:h-12",
        // Asl PNG'da matn allaqachon o'z ranglariga ega — qo'shimcha rang shart emas
        className,
      )}
    />
  );
}
