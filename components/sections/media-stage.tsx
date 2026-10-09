import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MediaStageProps = {
  children: ReactNode;
  tilt?: "left" | "right" | "none";
  className?: string;
};

// Cadre blanc surélevé, incliné en perspective sur desktop, qui se redresse au survol.
export function MediaStage({ children, tilt = "right", className }: MediaStageProps) {
  return (
    <div className={cn("group perspective-[2000px]", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-hairline bg-surface p-2 shadow-float transition-transform duration-500 ease-out motion-reduce:transition-none lg:group-hover:rotate-x-0 lg:group-hover:rotate-y-0 [&_figure]:rounded-xl [&_video]:rounded-xl",
          tilt === "right" && "lg:rotate-x-[3deg] lg:rotate-y-6",
          tilt === "left" && "lg:rotate-x-[3deg] lg:-rotate-y-6",
        )}
      >
        {children}
      </div>
    </div>
  );
}
