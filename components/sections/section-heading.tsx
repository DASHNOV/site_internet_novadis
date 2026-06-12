import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

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
        "grid gap-10 lg:items-end",
        align === "center"
          ? "place-items-center text-center"
          : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
        className,
      )}
    >
      <Reveal className={align === "center" ? "max-w-3xl" : "max-w-2xl"}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-6 text-balance text-4xl sm:text-6xl lg:text-[3.75rem]">{title}</h2>
      </Reveal>
      {(description || actions) && (
        <Reveal className={cn("flex flex-col gap-6", align === "center" && "items-center")}>
          {description && (
            <p className="max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{description}</p>
          )}
          {actions}
        </Reveal>
      )}
    </div>
  );
}
