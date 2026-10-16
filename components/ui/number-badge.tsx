import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Numéro d'étape : réservé aux séquences où l'ordre compte.
const numberBadgeVariants = cva(
  "tabular flex flex-none items-center justify-center rounded-full border border-hairline-strong font-mono font-medium text-primary-strong",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-xs",
        lg: "h-12 w-12 text-sm",
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
