"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  transform,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { BEATS, STEP_RANGES } from "@/components/three/badge-door-beats";
import { badgeDoor } from "@/data/site";
import { cn } from "@/lib/utils";

const BadgeDoorScene = dynamic(() => import("@/components/three/badge-door-scene").then((m) => m.BadgeDoorScene), {
  ssr: false,
});

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function StepText({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const [start, end] = STEP_RANGES[index];
  const first = index === 0;
  const last = index === STEP_RANGES.length - 1;
  const range = [start, start + 0.05, end - 0.05, end];
  const opacityOut = [first ? 1 : 0, 1, 1, last ? 1 : 0];
  // Function transforms: plain ranges get offloaded to a native scroll timeline that ignores clamping.
  const opacity = useTransform(progress, (v) => transform(v, range, opacityOut));
  const y = useTransform(progress, (v) => transform(v, range, [first ? 0 : 20, 0, 0, last ? 0 : -20]));
  const step = badgeDoor.steps[index];

  return (
    <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity, y }}>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
        {`0${index + 1} / 0${badgeDoor.steps.length}`}
      </p>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{step.label}</h3>
      <p className="mt-4 max-w-md text-base leading-7 text-slate-300">{step.text}</p>
    </motion.div>
  );
}

function StaticBadgeDoor() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="shell-wide">
        <p className="eyebrow">{badgeDoor.eyebrow}</p>
        <h2 className="section-title mt-6 text-balance text-4xl sm:text-5xl">{badgeDoor.title}</h2>
        <ol className="mt-14 grid gap-8 lg:grid-cols-3">
          {badgeDoor.steps.map((step, index) => (
            <li className="border-t border-white/12 pt-6" key={step.label}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">{`0${index + 1}`}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">{step.label}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BadgeDoor() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const near = useInView(sectionRef, { once: true, margin: "800px 0px" });
  const [mode, setMode] = useState<"pending" | "interactive" | "static">("pending");
  const [eventShown, setEventShown] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    setMode(reduceMotion || !webglAvailable() ? "static" : "interactive");
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (value) => setEventShown(value > BEATS.door[1]));

  if (mode === "static") return <StaticBadgeDoor />;

  return (
    <section className="section-dark relative h-[350vh]" ref={sectionRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">{near && mode === "interactive" && <BadgeDoorScene progress={scrollYProgress} />}</div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/20 to-transparent lg:bg-gradient-to-r lg:from-[rgb(var(--background-dark))]/90 lg:via-[rgb(var(--background-dark))]/30" />

        <div className="shell-wide relative flex h-full flex-col justify-between pb-16 pt-28 lg:pb-24">
          <div>
            <p className="eyebrow">{badgeDoor.eyebrow}</p>
            <h2 className="section-title mt-6 max-w-lg text-balance text-4xl sm:text-5xl">{badgeDoor.title}</h2>
          </div>
          <div className="relative h-[170px] w-full max-w-md">
            {badgeDoor.steps.map((step, index) => (
              <StepText index={index} key={step.label} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Supervision-style notification: the access is logged as the door opens. */}
        <div
          aria-live="polite"
          className={cn(
            "absolute right-6 top-28 flex items-center gap-3 rounded-2xl border border-white/15 bg-[rgb(var(--background-dark))]/85 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur transition-all duration-500 lg:right-12",
            eventShown ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <CheckCircle2 className="h-5 w-5 flex-none text-green-400" />
          <div>
            <p className="text-sm font-semibold text-white">{badgeDoor.event.title}</p>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-400">{badgeDoor.event.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
