import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("relative rounded-xl", {
  variants: {
    tone: {
      surface: "border border-hairline bg-surface shadow-soft",
      glass: "border border-white/12 bg-white/[0.05] backdrop-blur-sm",
    },
    interactive: {
      true: "transition-all duration-200 ease-out hover:-translate-y-1",
      false: "",
    },
  },
  compoundVariants: [
    { tone: "surface", interactive: true, className: "hover:border-primary/20 hover:shadow-lift" },
    { tone: "glass", interactive: true, className: "hover:border-white/25 hover:bg-white/[0.08]" },
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
