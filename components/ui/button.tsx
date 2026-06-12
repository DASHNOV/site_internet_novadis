import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-foreground-strong text-background hover:-translate-y-0.5",
        primary:
          "bg-primary text-background shadow-[0_18px_40px_-18px_rgba(var(--primary),0.6)] hover:-translate-y-0.5 hover:bg-primary-strong",
        outline:
          "border border-[rgba(var(--hairline-strong))] bg-transparent text-foreground-strong hover:-translate-y-0.5 hover:border-primary/55 hover:text-primary",
        subtle:
          "bg-[rgba(var(--card))] text-foreground-strong border border-[rgba(var(--hairline))] hover:bg-[rgba(var(--card-strong))]",
        ghost: "text-muted-strong hover:text-foreground-strong",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-7 text-[0.94rem]",
        sm: "h-9 px-4 text-xs",
        icon: "h-10 w-10",
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
