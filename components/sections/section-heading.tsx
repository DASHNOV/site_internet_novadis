import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/ui/split-title";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:items-end",
        align === "center"
          ? "place-items-center text-center"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16",
        className,
      )}
    >
      <Reveal className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-5 text-balance text-3xl sm:text-4xl lg:text-5xl">
          {typeof title === "string" ? <SplitTitle text={title} /> : title}
        </h2>
      </Reveal>
      {(description || actions) && (
        <Reveal className={cn("flex flex-col gap-6", align === "center" ? "items-center" : "lg:items-start")}>
          {description && (
            <p className="max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{description}</p>
          )}
          {actions}
        </Reveal>
      )}
    </div>
  );
}
