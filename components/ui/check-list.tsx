import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckListProps = {
  items: string[];
  columns?: 1 | 2;
  tone?: "primary" | "success";
  className?: string;
};

export function CheckList({ items, columns = 1, tone = "primary", className }: CheckListProps) {
  return (
    <ul className={cn("grid gap-x-6 border-t border-hairline", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li className="flex items-start gap-3 border-b border-hairline py-3 text-sm leading-6 text-foreground-strong" key={item}>
          <Check
            aria-hidden
            className={cn("mt-1 h-4 w-4 flex-none stroke-[2.25]", tone === "success" ? "text-success" : "text-primary")}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
