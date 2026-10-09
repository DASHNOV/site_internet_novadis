"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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
import { ArrowUpRight } from "lucide-react";
import { alarmJourney, architectureLayers, getSolution } from "@/data/site";
import { cn } from "@/lib/utils";

const AlarmJourneyScene = dynamic(
  () => import("@/components/three/alarm-journey-scene").then((m) => m.AlarmJourneyScene),
  { ssr: false },
);

const steps = alarmJourney.steps.map((step) => ({
  ...step,
  layerLabel: architectureLayers.find((layer) => layer.id === step.layer)?.label ?? "",
  solution: getSolution(step.slug)!,
}));

// Index 0 is the overview, 1..n the steps; must match the scene's keyframes.
const FRAMES = steps.length;

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function StepText({ index, progress, children }: { index: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const center = index / FRAMES;
  const range =
    index === 0
      ? [0, 0.08, 0.13]
      : index === FRAMES
        ? [center - 0.1, center - 0.04, 1]
        : [center - 0.1, center - 0.04, center + 0.04, center + 0.1];
  const opacityOut = index === 0 ? [1, 1, 0] : index === FRAMES ? [0, 1, 1] : [0, 1, 1, 0];
  const blurOut =
    index === 0 ? ["blur(0px)", "blur(0px)", "blur(10px)"] : index === FRAMES ? ["blur(10px)", "blur(0px)", "blur(0px)"] : ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"];
  const yOut = index === 0 ? [0, 0, -24] : index === FRAMES ? [24, 0, 0] : [24, 0, 0, -24];
  // Function transforms on purpose: with plain ranges framer-motion hands opacity and filter to a
  // native scroll timeline, which ignores clamping outside partial ranges and brings old steps back.
  const opacity = useTransform(progress, (v) => transform(v, range, opacityOut));
  const filter = useTransform(progress, (v) => transform(v, range, blurOut));
  const y = useTransform(progress, (v) => transform(v, range, yOut));

  return (
    <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity, filter, y }}>
      {children}
    </motion.div>
  );
}

function StaticJourney() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="shell-wide">
        <p className="eyebrow">{alarmJourney.eyebrow}</p>
        <h2 className="section-title mt-6 max-w-3xl text-balance text-4xl sm:text-5xl">{alarmJourney.title}</h2>
        <ol className="mt-14 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li className="border-t border-white/12 pt-6" key={step.slug}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                {`0${index + 1} · ${step.layerLabel}`}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">
                {step.solution.shortTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.solution.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AlarmJourney() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const near = useInView(sectionRef, { once: true, margin: "800px 0px" });
  const onScreen = useInView(sectionRef);
  const [mode, setMode] = useState<"pending" | "interactive" | "static">("pending");
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    setMode(reduceMotion || !webglAvailable() ? "static" : "interactive");
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveStep(Math.round(value * FRAMES));
  });

  if (mode === "static") return <StaticJourney />;

  return (
    <section className="section-dark relative h-[400vh]" ref={sectionRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          {near && mode === "interactive" && (
            <AlarmJourneyScene
              active={onScreen}
              activeStep={activeStep}
              hotspots={[
                { label: steps[0].solution.shortTitle, sublabel: steps[0].solution.product },
                { label: steps[1].solution.shortTitle, sublabel: steps[1].solution.product },
                { label: steps[2].solution.shortTitle, sublabel: steps[2].solution.product },
              ]}
              progress={scrollYProgress}
            />
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/25 to-transparent lg:bg-gradient-to-r lg:from-[rgb(var(--background-dark))]/85 lg:via-[rgb(var(--background-dark))]/30" />

        <div className="shell-wide relative flex h-full items-end pb-16 lg:pb-24">
          <div className="relative h-[340px] w-full max-w-xl">
            <StepText index={0} progress={scrollYProgress}>
              <p className="eyebrow">{alarmJourney.eyebrow}</p>
              <h2 className="section-title mt-6 text-balance text-4xl sm:text-5xl lg:text-[3.4rem]">{alarmJourney.title}</h2>
            </StepText>
            {steps.map((step, index) => (
              <StepText index={index + 1} key={step.slug} progress={scrollYProgress}>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
                  {`0${index + 1} / 0${steps.length} · ${step.layerLabel}`}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {step.solution.shortTitle}
                </h3>
                {step.solution.product && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {step.solution.product}
                  </p>
                )}
                <p className="mt-4 text-base leading-7 text-slate-300">{step.solution.summary}</p>
                <Link
                  className={cn(
                    "mt-5 inline-flex items-center gap-2 text-sm font-medium text-white",
                    activeStep === index + 1 ? "pointer-events-auto" : "pointer-events-none",
                  )}
                  href={`/solutions/${step.slug}`}
                  tabIndex={activeStep === index + 1 ? 0 : -1}
                >
                  En savoir plus
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Link>
              </StepText>
            ))}
          </div>
        </div>

        <ol aria-hidden className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
          {steps.map((step, index) => (
            <li
              className={cn(
                "flex items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300",
                activeStep === index + 1 ? "text-white" : "text-white/35",
              )}
              key={step.slug}
            >
              {step.layerLabel}
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  activeStep === index + 1 ? "bg-primary" : "bg-white/25",
                )}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
