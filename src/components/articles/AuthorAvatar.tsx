import Image from "next/image";
import { getInitials } from "@/lib/articles/authors";
import { cn } from "@/lib/utils";

/**
 * Muallif avatari: rasm bo'lsa — rasm, bo'lmasa — bosh harflar doirasi
 * (masalan "SA"). Ism har doim yonida alohida matn sifatida chiqadi, shu
 * sabab avatar dekorativ (alt bo'sh).
 */
export function AuthorAvatar({
  name,
  photo,
  size = 40,
  className,
}: {
  name: string;
  photo?: string;
  size?: number;
  className?: string;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt=""
        width={size}
        height={size}
        className={cn(
          "shrink-0 rounded-full border border-earth-400/30 object-cover",
          className,
        )}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full bg-forest-700 font-sans font-bold tracking-wide text-cream",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
      }}
    >
      {getInitials(name)}
    </span>
  );
}
