"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Cctv, DoorOpen, LockKeyhole, type LucideIcon, MonitorDot, ShieldCheck, Siren } from "lucide-react";
import { useSiteContent } from "@/components/content-provider";
import { solutionsHeroModel as defaults } from "@/data/site";
import { cleanText } from "@/lib/content/stega";
import { cn } from "@/lib/utils";
import { SolutionsHeroRoomSvg, toFrame, type Vec3 } from "./solutions-hero-room";
import { useCanRender3d } from "./use-can-render-3d";

const Scene = dynamic(() => import("./solutions-hero-scene"), { ssr: false });

const ICONS: Record<string, LucideIcon> = { hypervision: MonitorDot, access: DoorOpen, video: Cctv, server: LockKeyhole, intrusion: Siren };

// The CMS replaces each text by position; the camera-era values it may still hold fall back to the code.
function useHeroCopy() {
  const { solutionsHeroModel: content } = useSiteContent();
  const current = (value: string, fallback: string) => (defaults.retired.includes(cleanText(value)) ? fallback : value);
  return {
    name: current(content.name, defaults.name),
    hint: current(content.hint, defaults.hint),
    callouts: content.callouts.map((callout, index) => ({ ...callout, label: current(callout.label, defaults.callouts[index].label) })),
  };
}

// The dot (8 px) sits on the anchor; the label leaves it on the given side. On phones the stage is too
// small for five labels: each callout keeps its icon and the legend below the stage spells them out.
const SIDES = {
  right: "-translate-x-1 -translate-y-1/2",
  left: "flex-row-reverse -translate-x-[calc(100%-4px)] -translate-y-1/2",
  up: "flex-col-reverse -translate-x-1/2 -translate-y-[calc(100%-4px)]",
  down: "flex-col -translate-x-1/2 -translate-y-1",
};

function Callout({ id, label, anchor, side }: { id: string; label: string; anchor: Vec3; side: keyof typeof SIDES }) {
  const { x, y } = toFrame(anchor);
  const Icon = ICONS[id];
  const vertical = side !== "left" && side !== "right";
  return (
    <span
      className={cn(
        "pointer-events-none absolute flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-foreground-strong sm:gap-1.5",
        SIDES[side],
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span aria-hidden className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/50 motion-reduce:hidden" />
        <span className="relative h-2 w-2 rounded-full bg-primary" />
      </span>
      <span aria-hidden className={cn("shrink-0 bg-primary/40", vertical ? "h-3 w-px sm:h-5" : "h-px w-3 sm:w-6")} />
      <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/90 p-1.5 shadow-[var(--shadow-overlay)] backdrop-blur sm:px-3">
        {Icon && <Icon aria-hidden className="h-3.5 w-3.5 text-primary" />}
        <span className="hidden sm:inline">{label}</span>
      </span>
    </span>
  );
}

export function SolutionsHeroModel({ className }: { className?: string }) {
  const copy = useHeroCopy();
  const ref = useRef<HTMLElement>(null);
  const near = useInView(ref, { once: true, margin: "300px 0px" });
  const onScreen = useInView(ref);
  const reduceMotion = useReducedMotion();
  const canRender = useCanRender3d();
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  // Lite mode (data saver, slow link, reduced motion) or no WebGL: the drawing stays and no 3D loads.
  const live = near && canRender;
  // A scene dropped mid-visit (reduced motion switched on) must load again before it shows.
  if (!live && ready) setReady(false);
  const shown = live && ready;
  const animate = onScreen && !reduceMotion;

  return (
    <figure aria-label={cleanText(copy.name)} className={cn("relative isolate", className)} ref={ref}>
      {/* Over the frame from sm up; on phones above and below it, to leave the small stage to the callouts. */}
      <figcaption className="pointer-events-none mb-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground-strong backdrop-blur sm:absolute sm:left-0 sm:top-0 sm:z-10 sm:mb-0">
        <ShieldCheck aria-hidden className="h-4 w-4 text-primary" />
        {copy.name}
      </figcaption>
      {/* The stage keeps the frame's aspect, so canvas, drawing and callouts share one coordinate space. */}
      <div className="relative aspect-[16/11]">
        <div
          aria-hidden
          className="absolute inset-[4%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.45),rgb(var(--accent)/0.12)_62%,transparent)] blur-2xl"
        />
        <SolutionsHeroRoomSvg className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", shown && "opacity-0")} />
        {live && (
          <div className={cn("absolute inset-0 transition-opacity duration-700", shown ? "opacity-100" : "opacity-0")}>
            <Scene animate={animate} onReady={markReady} />
          </div>
        )}
        {copy.callouts.map((callout) => (
          <Callout anchor={callout.anchor as Vec3} id={callout.id} key={callout.id} label={callout.label} side={callout.side} />
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-semibold text-foreground-strong sm:hidden">
        {copy.callouts.map((callout) => {
          const Icon = ICONS[callout.id];
          return (
            <li className="flex items-center gap-2" key={callout.id}>
              {Icon && <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-primary" />}
              {callout.label}
            </li>
          );
        })}
      </ul>
      <p className="pointer-events-none mt-3 text-xs font-medium leading-5 text-muted-strong sm:absolute sm:bottom-0 sm:left-0 sm:mt-0 sm:max-w-[60%]">{copy.hint}</p>
    </figure>
  );
}
