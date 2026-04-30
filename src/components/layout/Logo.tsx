import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  const textColor =
    variant === "dark" ? "text-forest-700" : "text-cream";
  const accentColor =
    variant === "dark" ? "text-gold-700" : "text-gold-400";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-9 w-9", textColor)}
        aria-hidden="true"
      >
        <path
          d="M16 2C9 4 4 10 4 18c0 5 2 9 5 11 1-7 4-13 8-17-3 5-5 11-5 17h7c0-9 4-17 11-21-2-2-7-6-14-6Z"
          fill="currentColor"
        />
        <circle
          cx="22"
          cy="11"
          r="2.2"
          className={accentColor}
          fill="currentColor"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-semibold tracking-tight",
            textColor,
          )}
        >
          Parkent Plants
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.2em]",
            variant === "dark" ? "text-earth-700" : "text-cream-100/80",
          )}
        >
          Est. 2002
        </span>
      </div>
    </div>
  );
}
