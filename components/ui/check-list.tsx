import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckListProps = {
  items: string[];
  columns?: 1 | 2;
  tone?: "primary" | "success";
  className?: string;
};

export function CheckList({ items, columns = 1, tone = "primary", className }: CheckListProps) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2 sm:gap-x-6", className)}>
      {items.map((item) => (
        <li className="flex items-start gap-3 text-sm leading-6 text-foreground-strong" key={item}>
          <CheckCircle2
            aria-hidden
            className={cn("mt-0.5 h-5 w-5 flex-none", tone === "success" ? "text-success" : "text-primary")}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
