import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconBadgeVariants = cva("flex flex-none items-center justify-center rounded-xl", {
  variants: {
    tone: {
      soft: "bg-primary/10 text-primary-strong",
      solid: "bg-brand-gradient text-white shadow-glow",
      glass: "border border-white/15 bg-white/10 text-glow",
    },
    size: {
      md: "h-12 w-12 [&>svg]:h-5 [&>svg]:w-5",
      lg: "h-14 w-14 [&>svg]:h-6 [&>svg]:w-6",
      sm: "h-10 w-10 rounded-lg [&>svg]:h-4 [&>svg]:w-4",
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
