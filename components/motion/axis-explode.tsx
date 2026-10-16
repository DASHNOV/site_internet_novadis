"use client";

import { useRef, useState } from "react";
import { motion, transform, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useFrameSequence } from "@/components/motion/film-scene";
import { axisExplode } from "@/data/site";
import { cn } from "@/lib/utils";

const LAST = axisExplode.frameCount - 1;
// Scroll progress where the sequence plays, then where the fleet takes over.
const PLAY: [number, number] = [0.04, 0.68];
const FLEET: [number, number] = [0.72, 0.9];
const HUB = { x: 0.5, y: 0.47 };

function stepAt(progress: number) {
  if (progress < 0.36) return 0;
  return progress < FLEET[0] ? 1 : 2;
}

function Labels({ frame, visible }: { frame: number; visible: boolean }) {
  const points = axisExplode.anchors[frame];
  return (
    <>
      {axisExplode.labels.map((item, index) => {
        const [x, y] = points[index];
        return (
          <div
            className={cn(
              "pointer-events-none absolute flex items-center gap-2 transition-opacity duration-500",
              item.side === "left" ? "-translate-x-full flex-row-reverse" : "",
              visible ? "opacity-100" : "opacity-0",
            )}
            key={item.label}
            style={{ left: `${x * 100}%`, top: `${y * 100}%`, transitionDelay: `${visible ? index * 90 : 0}ms` }}
          >
            <span className="relative -mt-px h-2 w-2 flex-none -translate-y-1/2 rounded-full bg-glow">
              <span className="absolute inset-0 animate-ping rounded-full bg-glow/60" />
            </span>
            {/* Narrow screens keep the dots only: side labels would run off the viewport. */}
            <span className="hidden h-px w-14 -translate-y-1/2 bg-gradient-to-r from-glow/70 to-white/20 sm:block" />
            <span className="hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-glow/25 bg-night/85 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.14em] text-white sm:block">
              {item.label}
            </span>
          </div>
        );
      })}
    </>
  );
}

// Concentric HUD rings behind the camera, slowly counter-rotating.
function Radar() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.22)_0%,transparent_62%)]" />
      <svg className="absolute inset-0 h-full w-full animate-[spin_80s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" fill="none" r="46" stroke="rgb(255 255 255 / 0.08)" strokeDasharray="0.6 2.4" strokeWidth="0.25" />
        <circle cx="50" cy="50" fill="none" r="38" stroke="rgb(var(--glow) / 0.16)" strokeDasharray="14 6" strokeWidth="0.15" />
      </svg>
      <svg className="absolute inset-0 h-full w-full animate-[spin_120s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" fill="none" r="30" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.15" />
        <path d="M50 4 V9 M50 91 V96 M4 50 H9 M91 50 H96" stroke="rgb(var(--glow) / 0.4)" strokeWidth="0.3" />
      </svg>
    </div>
  );
}

function FleetItem({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const { camera, x, y } = axisExplode.fleet[index];
  const span: [number, number] = [index * 0.09, index * 0.09 + 0.46];
  const t = useTransform(progress, (v) => transform(v, span, [0, 1]));
  const opacity = useTransform(t, [0, 0.5], [0, 1]);
  const scale = useTransform(t, [0, 1], [0.6, 1]);
  // Fly in from beyond the ring, along the spoke to the hub.
  const dx = useTransform(t, [0, 1], [(x - HUB.x) * 120, 0]);
  const dy = useTransform(t, [0, 1], [(y - HUB.y) * 120, 0]);
  return (
    <motion.figure
      className="absolute w-[22%] max-w-[132px] -translate-x-1/2 -translate-y-1/2 text-center"
      style={{ left: `${x * 100}%`, top: `${y * 100}%`, opacity, scale, x: dx, y: dy }}
    >
      <img
        alt={`Caméra ${camera.brand} — ${camera.type}`}
        className="mx-auto aspect-[4/3] w-full object-contain drop-"
        loading="lazy"
        src={camera.cutout}
      />
      <figcaption className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-glow sm:text-[12px]">
        {camera.brand}
      </figcaption>
    </motion.figure>
  );
}

function Fleet({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [0.3, 1], [0, 1]);
  const hubOpacity = useTransform(progress, [0.75, 1], [0, 1]);
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {axisExplode.fleet.map(({ camera, x, y }) => (
          <motion.path
            d={`M${x * 100} ${y * 100} L${HUB.x * 100} ${HUB.y * 100}`}
            fill="none"
            key={camera.cutout}
            stroke="rgb(var(--glow) / 0.35)"
            strokeWidth="1"
            style={{ pathLength }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {axisExplode.fleet.map((item, index) => (
        <FleetItem index={index} key={item.camera.cutout} progress={progress} />
      ))}
      <motion.p
        className="absolute left-1/2 top-[97%] -translate-x-1/2 whitespace-nowrap rounded-full border border-glow/30 bg-night/70 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-white backdrop-blur"
        style={{ opacity: hubOpacity }}
      >
        {axisExplode.hub}
      </motion.p>
    </div>
  );
}

function Steps({ active }: { active: number }) {
  return (
    <ol className="mt-8 space-y-1 lg:mt-10">
      {axisExplode.steps.map((step, index) => {
        const on = index === active;
        return (
          <li
            className={cn(
              "relative border-l py-2 pl-5 transition-all duration-500",
              on ? "border-glow" : "border-white/10 max-lg:hidden",
            )}
            key={step.title}
          >
            <p className={cn("font-mono text-[12px] uppercase tracking-[0.14em] transition-colors", on ? "text-glow" : "text-white/55")}>
              {String(index + 1).padStart(2, "0")} · {step.title}
            </p>
            <p
              className={cn(
                "grid text-sm leading-6 text-foreground transition-all duration-500 sm:text-base sm:leading-7",
                on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <span className="overflow-hidden">{step.text}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}

// Static state for reduced motion: last frame with its labels, fleet laid out below.
function StaticExplode() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="shell-wide grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="max-w-md">
          <h2 className="section-title text-balance text-4xl sm:text-5xl">{axisExplode.title}</h2>
          <p className="mt-6 text-base leading-7 text-foreground">{axisExplode.description}</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[620px]">
          <Radar />
          <img alt="" className="relative h-full w-full object-contain" loading="lazy" src={axisExplode.framePath(LAST)} />
          <Labels frame={LAST} visible />
        </div>
      </div>
      <ul className="shell-wide mt-12 grid grid-cols-3 gap-6 sm:grid-cols-6">
        {axisExplode.fleet.map(({ camera }) => (
          <li className="text-center" key={camera.cutout}>
            <img alt={`Caméra ${camera.brand} — ${camera.type}`} className="mx-auto aspect-[4/3] w-full object-contain" loading="lazy" src={camera.cutout} />
            <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-glow">{camera.brand}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AxisExplode() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const { canvasRef, loaded, frame, scrollYProgress } = useFrameSequence(sectionRef, axisExplode, PLAY, !reduceMotion);
  // Function forms: a plain range would be offloaded to a native scroll timeline that ignores clamping.
  const fleetProgress = useTransform(scrollYProgress, (v) => transform(v, FLEET, [0, 1]));
  const stageScale = useTransform(fleetProgress, (v) => transform(v, [0, 0.6], [1, 0.74]));
  const stageDim = useTransform(fleetProgress, (v) => transform(v, [0, 0.6], [1, 0.55]));
  const hintOpacity = useTransform(scrollYProgress, (v) => transform(v, [0, 0.06], [1, 0]));

  useMotionValueEvent(scrollYProgress, "change", (value) => setStep(stepAt(value)));

  if (reduceMotion) return <StaticExplode />;

  return (
    <section className="section-dark relative h-[420vh]" ref={sectionRef}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_65%_50%,black_20%,transparent_75%)]"
        />
        <div className="shell-wide relative grid w-full items-center gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-10">
          <div className="max-w-md">
            <h2 className="section-title text-balance text-3xl sm:text-5xl lg:mt-6">{axisExplode.title}</h2>
            <Steps active={step} />
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[min(680px,58vh)] lg:max-w-[min(720px,82vh)]">
            <motion.div className="absolute inset-0" style={{ scale: stageScale }}>
              <Radar />
              <motion.div className="absolute inset-0" style={{ opacity: stageDim }}>
                {/* First frame as poster until the sequence is ready (and for no-JS visitors). */}
                <img
                  alt=""
                  className={cn("absolute inset-0 h-full w-full object-contain transition-opacity", loaded && "opacity-0")}
                  loading="lazy"
                  src={axisExplode.framePath(0)}
                />
                <canvas className="absolute inset-0 h-full w-full" height={1000} ref={canvasRef} width={1000} />
              </motion.div>
              <Labels frame={frame} visible={frame >= axisExplode.labelsFrom && step < 2} />
            </motion.div>
            <Fleet progress={fleetProgress} />
          </div>
        </div>
        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[12px] uppercase tracking-[0.14em] text-white/50"
          style={{ opacity: hintOpacity }}
        >
          {axisExplode.scrollHint}
        </motion.p>
      </div>
    </section>
  );
}
