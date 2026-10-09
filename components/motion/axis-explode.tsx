"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  transform,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { axisExplode } from "@/data/site";
import { cn } from "@/lib/utils";

const LAST = axisExplode.frameCount - 1;

function Labels({ visible }: { visible: boolean }) {
  return (
    <>
      {axisExplode.labels.map((item, index) => (
        <div
          className={cn(
            "pointer-events-none absolute flex items-center gap-2 transition-all duration-500",
            item.side === "left" ? "-translate-x-full flex-row-reverse" : "",
            visible ? "opacity-100" : "translate-y-2 opacity-0",
          )}
          key={item.label}
          style={{ left: `${item.x * 100}%`, top: `${item.y * 100}%`, transitionDelay: `${visible ? index * 90 : 0}ms` }}
        >
          <span className="-mt-px h-2 w-2 flex-none -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(54,164,217,0.8)]" />
          {/* Narrow screens keep the dots only: side labels would run off the viewport. */}
          <span className="hidden h-px w-16 -translate-y-1/2 bg-white/50 sm:block" />
          <span className="hidden -translate-y-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-white sm:block">
            {item.label}
          </span>
        </div>
      ))}
    </>
  );
}

function Intro() {
  return (
    <div className="max-w-md">
      <p className="eyebrow">{axisExplode.eyebrow}</p>
      <h2 className="section-title mt-6 text-balance text-4xl sm:text-5xl">{axisExplode.title}</h2>
      <p className="mt-6 text-base leading-7 text-slate-300">{axisExplode.description}</p>
    </div>
  );
}

// Static exploded state for reduced motion: last frame with its labels.
function StaticExplode() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="shell-wide grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Intro />
        <div className="relative mx-auto aspect-[8/9] w-full max-w-[560px]">
          <img loading="lazy" alt="" className="h-full w-full object-contain" src={axisExplode.framePath(LAST)} />
          <Labels visible />
        </div>
      </div>
    </section>
  );
}

export function AxisExplode() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const current = useRef(-1);
  const near = useInView(sectionRef, { once: true, margin: "600px 0px" });
  const [loaded, setLoaded] = useState(false);
  const [exploded, setExploded] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Hold the closed camera a moment, open it over the middle of the scroll, then hold the exploded view.
  const frameProgress = useTransform(scrollYProgress, [0.08, 0.78], [0, 1], { clamp: true });
  // Function form: a plain range would be offloaded to a native scroll timeline that ignores clamping.
  const hintOpacity = useTransform(scrollYProgress, (v) => transform(v, [0, 0.1], [1, 0]));

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const image = frames.current[index];
    if (!canvas || !image?.complete || index === current.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    current.current = index;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!near || reduceMotion) return;
    let remaining = axisExplode.frameCount;
    frames.current = Array.from({ length: axisExplode.frameCount }, (_, i) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = image.onerror = () => {
        remaining -= 1;
        if (i === 0) draw(0);
        if (remaining === 0) setLoaded(true);
      };
      image.src = axisExplode.framePath(i);
      return image;
    });
    // draw only reads refs, so it is deliberately left out of the dependencies.
  }, [near, reduceMotion]);

  useMotionValueEvent(frameProgress, "change", (value) => {
    draw(Math.round(value * LAST));
    setExploded(value > 0.92);
  });

  useEffect(() => {
    if (loaded) draw(Math.round(frameProgress.get() * LAST));
  }, [loaded]);

  if (reduceMotion) return <StaticExplode />;

  return (
    <section className="section-dark relative h-[300vh]" ref={sectionRef}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell-wide grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Intro />
          <div className="relative mx-auto aspect-[8/9] w-full max-w-[min(560px,70vh)]">
            {/* First frame as poster until the sequence is ready (and for no-JS visitors). */}
            <img loading="lazy"
              alt=""
              className={cn("absolute inset-0 h-full w-full object-contain transition-opacity", loaded && "opacity-0")}
              src={axisExplode.framePath(0)}
            />
            <canvas className="absolute inset-0 h-full w-full" height={810} ref={canvasRef} width={720} />
            <Labels visible={exploded} />
          </div>
        </div>
        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50"
          style={{ opacity: hintOpacity }}
        >
          {axisExplode.scrollHint}
        </motion.p>
      </div>
    </section>
  );
}
