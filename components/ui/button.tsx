import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground-strong text-white hover:-translate-y-0.5 hover:bg-foreground",
        primary:
          "bg-brand-gradient text-white shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover",
        outline:
          "border border-hairline bg-surface text-foreground hover:-translate-y-0.5 hover:border-hairline-strong hover:bg-background hover:text-foreground-strong",
        subtle: "bg-primary/10 text-primary-strong hover:bg-primary/15",
        ghost: "text-muted-strong hover:text-foreground-strong",
        inverse:
          "bg-white text-primary-strong shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)] hover:-translate-y-0.5 hover:bg-white/95",
        glass:
          "border border-white/25 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-7 text-[0.94rem]",
        sm: "h-9 px-4 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
