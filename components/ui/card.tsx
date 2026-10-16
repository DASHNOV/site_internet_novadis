import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Tuile plate : la profondeur vient du filet, jamais d'une ombre.
const cardVariants = cva("relative rounded-xl border", {
  variants: {
    tone: {
      surface: "border-hairline bg-surface",
      console: "rounded-lg border-night-line bg-night-panel",
    },
    interactive: {
      true: "transition-colors duration-150 ease-out",
      false: "",
    },
  },
  compoundVariants: [
    { tone: "surface", interactive: true, className: "hover:border-primary" },
    { tone: "console", interactive: true, className: "hover:border-glow/50" },
  ],
  defaultVariants: {
    tone: "surface",
    interactive: false,
  },
});

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export function Card({ className, tone, interactive, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone, interactive }), className)} {...props} />;
}

export { cardVariants };
