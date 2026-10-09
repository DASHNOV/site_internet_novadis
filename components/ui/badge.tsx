import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "primary" | "outline" | "success";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tone === "default" && "bg-foreground-strong/5 text-foreground-strong",
        tone === "primary" && "bg-primary/10 text-primary-strong",
        tone === "outline" && "border border-hairline bg-surface text-muted-strong",
        tone === "success" && "bg-success/10 text-emerald-700",
        className,
      )}
      {...props}
    />
  );
}
