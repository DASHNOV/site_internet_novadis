import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Icône en ligne, sans pastille : elle accompagne un titre, elle ne le surmonte pas.
const iconBadgeVariants = cva("inline-flex flex-none items-center justify-center [&>svg]:stroke-[1.75]", {
  variants: {
    tone: {
      soft: "text-primary-strong",
      solid: "text-primary-strong",
      glass: "text-glow",
    },
    size: {
      sm: "[&>svg]:h-4 [&>svg]:w-4",
      md: "[&>svg]:h-5 [&>svg]:w-5",
      lg: "[&>svg]:h-6 [&>svg]:w-6",
    },
  },
  defaultVariants: {
    tone: "soft",
    size: "md",
  },
});

type IconBadgeProps = VariantProps<typeof iconBadgeVariants> & {
  icon: LucideIcon;
  className?: string;
};

export function IconBadge({ icon: Icon, tone, size, className }: IconBadgeProps) {
  return (
    <span aria-hidden className={cn(iconBadgeVariants({ tone, size }), className)}>
      <Icon />
    </span>
  );
}
