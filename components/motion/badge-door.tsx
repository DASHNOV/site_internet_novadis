"use client";

import { useEffect, useRef, useState } from "react";
import { motion, transform, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ScanLine } from "lucide-react";
import { badgeDoor } from "@/data/site";
import { cn } from "@/lib/utils";

const LAST = badgeDoor.frameCount - 1;
const { granted, open } = badgeDoor.beats;
// Scroll progress over which the film is scrubbed.
const PLAY: [number, number] = [0.02, 0.94];
// Reader lock box at scale 1, in fraction of the frame (the reader is ~3 % × 10 % of it).
const BOX = { w: 0.055, h: 0.15 };

function stepAt(frame: number) {
  if (frame < granted) return 0;
  return frame < open ? 1 : 2;
}

function Corners({ ok }: { ok: boolean }) {
  const color = ok ? "border-success" : "border-glow";
  return (
    <>
      {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((corner) => (
        <span className={cn("absolute h-3 w-3 transition-colors duration-300", corner, color)} key={corner} />
      ))}
    </>
  );
}

function ReaderHud({ frame, step }: { frame: number; step: number }) {
  const [x, y, s] = badgeDoor.anchors[frame];
  const visible = frame >= 3 && frame < open + 4;
  const ok = step >= 1;
  const reading = transform(frame, [4, granted - 1], [0, 1]);
  const w = BOX.w * s;
  const h = BOX.h * s;

  return (
    <div
      className={cn(
        "pointer-events-none absolute transition-all duration-500",
        visible ? "scale-100 opacity-100" : "scale-150 opacity-0",
      )}
      style={{ left: `${(x - w / 2) * 100}%`, top: `${(y - h / 2) * 100}%`, width: `${w * 100}%`, height: `${h * 100}%` }}
    >
      <Corners ok={ok} />

      {/* Read field: pulses while the badge is presented. */}
      {step === 0 && (
        <span className="absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-ping rounded-full border border-glow/50" />
          <span className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.22),transparent_70%)]" />
        </span>
      )}

      {/* Grant: one shockwave from the reader, replayed each time the step is entered. */}
      {step === 1 && (
        <motion.span
          animate={{ opacity: 0, scale: 7 }}
          className="absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-success shadow-[0_0_40px_rgb(var(--success)/0.8)]"
          initial={{ opacity: 0.9, scale: 0.6 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      )}

      {/* Left of the reader, clear of the hand coming in from the right. Narrow screens keep the lock box only. */}
      <div className="absolute right-full top-1/2 hidden -translate-y-1/2 flex-row-reverse items-center sm:flex">
        <span className={cn("h-px w-10 transition-colors duration-300 lg:w-16", ok ? "bg-success/70" : "bg-glow/70")} />
        <div
          className={cn(
            "w-56 rounded-xl border bg-night/80 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur transition-colors duration-300",
            ok ? "border-success/40" : "border-glow/30",
          )}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">{badgeDoor.hud.reader}</p>
          {ok ? (
            <>
              <div className="mt-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-none text-success" />
                <p className="text-sm font-semibold text-white">{badgeDoor.hud.granted}</p>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-success">{badgeDoor.hud.decision}</p>
            </>
          ) : (
            <>
              <div className="mt-2 flex items-center gap-2">
                <ScanLine className="h-4 w-4 flex-none text-glow" />
                <p className="text-sm font-semibold text-white">{badgeDoor.hud.reading}</p>
              </div>
              <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-glow">{badgeDoor.hud.badgeId}</p>
              <span className="mt-2 block h-0.5 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full origin-left bg-glow transition-transform duration-150" style={{ transform: `scaleX(${reading})` }} />
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Green wash from the reader as the right is granted.
function GrantFlash({ frame, step }: { frame: number; step: number }) {
  const [x, y] = badgeDoor.anchors[frame];
  if (step !== 1) return null;
  return (
    <motion.div
      animate={{ opacity: 0 }}
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 1 }}
      style={{ background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(var(--success) / 0.35), transparent 45%)` }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    />
  );
}

function Steps({ active }: { active: number }) {
  return (
    <div className="relative h-[170px] w-full max-w-md">
      {badgeDoor.steps.map((step, index) => (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 transition-all duration-500",
            index === active ? "translate-y-0 opacity-100" : index < active ? "-translate-y-5 opacity-0" : "translate-y-5 opacity-0",
          )}
          key={step.label}
        >
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">
            {`0${index + 1} / 0${badgeDoor.steps.length}`}
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{step.label}</h3>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-300">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

function StaticBadgeDoor() {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="shell-wide">
        <p className="eyebrow">{badgeDoor.eyebrow}</p>
        <h2 className="section-title mt-6 text-balance text-4xl sm:text-5xl">{badgeDoor.title}</h2>
        <img alt="" className="mt-12 aspect-video w-full rounded-2xl object-cover" loading="lazy" src={badgeDoor.framePath(badgeDoor.staticFrame)} />
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const current = useRef(-1);
  const near = useInView(sectionRef, { once: true, margin: "800px 0px" });
  const [loaded, setLoaded] = useState(false);
  const [frame, setFrame] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const frameProgress = useTransform(scrollYProgress, [PLAY[0], PLAY[1]], [0, 1], { clamp: true });
  // Function form: a plain range would be offloaded to a native scroll timeline that ignores clamping.
  const hintOpacity = useTransform(scrollYProgress, (v) => transform(v, [0, 0.04], [1, 0]));
  const step = stepAt(frame);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const image = frames.current[index];
    if (!canvas || !image?.complete || !image.naturalWidth || index === current.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    current.current = index;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!near || reduceMotion) return;
    let remaining = badgeDoor.frameCount;
    frames.current = Array.from({ length: badgeDoor.frameCount }, (_, i) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = image.onerror = () => {
        remaining -= 1;
        if (i === 0) draw(0);
        if (remaining === 0) setLoaded(true);
      };
      image.src = badgeDoor.framePath(i);
      return image;
    });
    // draw only reads refs, so it is deliberately left out of the dependencies.
  }, [near, reduceMotion]);

  useMotionValueEvent(frameProgress, "change", (value) => {
    const index = Math.round(value * LAST);
    draw(index);
    setFrame(index);
  });

  useEffect(() => {
    if (loaded) draw(Math.round(frameProgress.get() * LAST));
  }, [loaded]);

  if (reduceMotion) return <StaticBadgeDoor />;

  return (
    <section className="section-dark relative h-[420vh]" ref={sectionRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Film cropped like object-cover, anchored right so the reader stays in view on portrait screens. */}
        <div className="absolute left-[calc((100%_-_max(100%,177.78vh))*0.75)] top-1/2 aspect-video w-[max(100%,177.78vh)] -translate-y-1/2">
          <img
            alt=""
            className={cn("absolute inset-0 h-full w-full transition-opacity", loaded && "opacity-0")}
            src={badgeDoor.framePath(0)}
          />
          <canvas className="absolute inset-0 h-full w-full" height={900} ref={canvasRef} width={1600} />
          <GrantFlash frame={frame} step={step} />
          <ReaderHud frame={frame} step={step} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/20 to-transparent lg:bg-gradient-to-r lg:from-[rgb(var(--background-dark))]/90 lg:via-[rgb(var(--background-dark))]/25" />

        <div className="shell-wide relative flex h-full flex-col justify-between pb-16 pt-28 lg:pb-24">
          <div>
            <p className="eyebrow">{badgeDoor.eyebrow}</p>
            <h2 className="section-title mt-6 max-w-lg text-balance text-4xl sm:text-5xl">{badgeDoor.title}</h2>
          </div>
          <Steps active={step} />
        </div>

        {/* Supervision-style notification: the access is logged as the door opens. */}
        <div
          aria-live="polite"
          className={cn(
            "absolute right-6 top-28 w-72 rounded-2xl border border-success/30 bg-[rgb(var(--background-dark))]/85 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur transition-all duration-500 lg:right-12",
            step === 2 ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 flex-none text-success" />
            <div>
              <p className="text-sm font-semibold text-white">{badgeDoor.event.title}</p>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-slate-400">{badgeDoor.event.detail}</p>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-glow">
            <span className="relative h-1.5 w-1.5 rounded-full bg-glow">
              <span className="absolute inset-0 animate-ping rounded-full bg-glow" />
            </span>
            {badgeDoor.event.logged}
          </p>
        </div>

        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50"
          style={{ opacity: hintOpacity }}
        >
          {badgeDoor.scrollHint}
        </motion.p>
      </div>
    </section>
  );
}
