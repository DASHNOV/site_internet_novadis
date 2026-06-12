import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "primary" | "outline";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]",
        tone === "default" && "text-foreground-strong",
        tone === "primary" && "text-primary",
        tone === "outline" && "text-muted-strong",
        className,
      )}
      {...props}
    />
  );
}
