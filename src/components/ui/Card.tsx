import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "bordered" | "elevated";
};

export function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-8 transition-all duration-200",
        variant === "default" && "bg-cream-100",
        variant === "bordered" &&
          "bg-cream border border-earth-400/30 hover:border-forest-400 hover:shadow-soft hover:-translate-y-1",
        variant === "elevated" &&
          "bg-cream shadow-soft hover:shadow-soft-lg hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  );
}
