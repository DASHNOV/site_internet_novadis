import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const numberBadgeVariants = cva(
  "flex flex-none items-center justify-center rounded-full bg-brand-gradient font-display font-bold text-white shadow-glow",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-11 w-11 text-sm",
        lg: "h-12 w-12 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type NumberBadgeProps = VariantProps<typeof numberBadgeVariants> & {
  value: number | string;
  className?: string;
};

export function NumberBadge({ value, size, className }: NumberBadgeProps) {
  const label = typeof value === "number" ? String(value).padStart(2, "0") : value;
  return <span className={cn(numberBadgeVariants({ size }), className)}>{label}</span>;
}
