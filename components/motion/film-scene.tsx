"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion, transform, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Sequence = { frameCount: number; framePath: (index: number) => string };

// Scroll-scrubbed image sequence drawn on a canvas: frames preload once the section is near,
// then the frame follows the scroll progress over `play`.
export function useFrameSequence(
  sectionRef: RefObject<HTMLElement | null>,
  { frameCount, framePath }: Sequence,
  play: [number, number],
  enabled: boolean,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const current = useRef(-1);
  const near = useInView(sectionRef, { once: true, margin: "800px 0px" });
  const [loaded, setLoaded] = useState(false);
  const [frame, setFrame] = useState(0);
  const last = frameCount - 1;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const frameProgress = useTransform(scrollYProgress, play, [0, 1], { clamp: true });

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const image = frames.current[index];
    if (!canvas || !image?.complete || !image.naturalWidth || index === current.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    current.current = index;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!near || !enabled) return;
    let remaining = frameCount;
    frames.current = Array.from({ length: frameCount }, (_, i) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = image.onerror = () => {
        remaining -= 1;
        if (i === 0) draw(0);
        if (remaining === 0) setLoaded(true);
      };
      image.src = framePath(i);
      return image;
    });
    // draw only reads refs, so it is deliberately left out of the dependencies.
  }, [near, enabled, frameCount, framePath]);

  useMotionValueEvent(frameProgress, "change", (value) => {
    const index = Math.round(value * last);
    draw(index);
    setFrame(index);
  });

  useEffect(() => {
    if (loaded) draw(Math.round(frameProgress.get() * last));
  }, [loaded]);

  return { canvasRef, loaded, frame, scrollYProgress, frameProgress };
}

type Step = { label: string; text: string };

export const tones = {
  glow: { border: "border-glow", soft: "border-glow/30", bg: "bg-glow", line: "bg-glow/70", text: "text-glow", shadow: "", rgb: "var(--glow)" },
  success: { border: "border-success", soft: "border-success/40", bg: "bg-success", line: "bg-success/70", text: "text-success", shadow: "", rgb: "var(--success)" },
  danger: { border: "border-danger", soft: "border-danger/40", bg: "bg-danger", line: "bg-danger/70", text: "text-danger", shadow: "", rgb: "var(--danger)" },
} as const;
export type Tone = keyof typeof tones;

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

// Lock-on box over a tracked object; `box` is [x0, y0, x1, y1] in fraction of the frame.
export function LockBox({
  box,
  visible,
  tone,
  children,
}: {
  box: readonly [number, number, number, number] | readonly number[];
  visible: boolean;
  tone: Tone;
  children?: ReactNode;
}) {
  const [x0, y0, x1, y1] = box;
  return (
    <div
      className={cn("pointer-events-none absolute transition-[opacity,scale] duration-500", visible ? "scale-100 opacity-100" : "scale-150 opacity-0")}
      style={{ left: `${x0 * 100}%`, top: `${y0 * 100}%`, width: `${(x1 - x0) * 100}%`, height: `${(y1 - y0) * 100}%` }}
    >
      {CORNERS.map((corner) => (
        <span
          className={cn("absolute h-3 w-3 transition-colors duration-300 [filter:drop-shadow(0_0_3px_rgb(0_0_0/0.9))]", corner, tones[tone].border)}
          key={corner}
        />
      ))}
      {children}
    </div>
  );
}

// One shockwave from the centre of its parent, replayed each time it mounts.
export function Shockwave({ tone }: { tone: Tone }) {
  return (
    <motion.span
      animate={{ opacity: 0, scale: 7 }}
      className={cn("absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2", tones[tone].border, tones[tone].shadow)}
      initial={{ opacity: 0.9, scale: 0.6 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    />
  );
}

// Colour wash from a point of the frame, fading out once mounted.
export function Flash({ x, y, tone }: { x: number; y: number; tone: Tone }) {
  return (
    <motion.div
      animate={{ opacity: 0 }}
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 1 }}
      style={{ background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(${tones[tone].rgb} / 0.35), transparent 45%)` }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    />
  );
}

// HUD panel hanging off the side of a LockBox, joined by a short line. Hidden on narrow screens.
export function HudPanel({ side, tone, children }: { side: "left" | "right"; tone: Tone; children: ReactNode }) {
  return (
    <div
      className={cn(
        "absolute top-1/2 hidden -translate-y-1/2 items-center sm:flex",
        side === "left" ? "right-full flex-row-reverse" : "left-full",
      )}
    >
      <span className={cn("h-px w-10 transition-colors duration-300 lg:w-16", tones[tone].line)} />
      <div
        className={cn(
          "w-56 rounded-xl border bg-night/80 px-4 py-3 backdrop-blur transition-colors duration-300",
          tones[tone].soft,
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Supervision-style notification, top right of the scene.
export function EventToast({
  visible,
  tone,
  icon: Icon,
  title,
  detail,
  logged,
}: {
  visible: boolean;
  tone: Tone;
  icon: LucideIcon;
  title: string;
  detail: string;
  logged: string;
}) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "absolute right-6 top-28 w-72 rounded-xl border bg-[rgb(var(--background-dark))]/85 px-5 py-4 backdrop-blur transition-all duration-500 lg:right-12",
        tones[tone].soft,
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("h-5 w-5 flex-none", tones[tone].text)} />
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-strong">{detail}</p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-glow">
        <span className="relative h-1.5 w-1.5 rounded-full bg-glow">
          <span className="absolute inset-0 animate-ping rounded-full bg-glow" />
        </span>
        {logged}
      </p>
    </div>
  );
}

function Steps({ steps, active }: { steps: readonly Step[]; active: number }) {
  return (
    <div className="relative h-[170px] w-full max-w-md">
      {steps.map((step, index) => (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 transition-all duration-500",
            index === active ? "translate-y-0 opacity-100" : index < active ? "-translate-y-5 opacity-0" : "translate-y-5 opacity-0",
          )}
          key={step.label}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-primary">{`0${index + 1} / 0${steps.length}`}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{step.label}</h3>
          <p className="mt-4 max-w-md text-base leading-7 text-foreground">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

type SceneText = { eyebrow: string; title: string; steps: readonly Step[] };

export function StaticFilmScene({ title, steps, image }: SceneText & { image: string }) {
  return (
    <section className="section-dark py-24 lg:py-32">
      <div className="shell-wide">
        <h2 className="section-title text-balance text-4xl sm:text-5xl">{title}</h2>
        <img alt="" className="mt-12 aspect-video w-full rounded-xl object-cover" loading="lazy" src={image} />
        <ol className="mt-14 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li className="border-t border-white/12 pt-6" key={step.label}>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-primary">{`0${index + 1}`}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white">{step.label}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Full-bleed 16:9 film, sticky while its section scrolls, with the step text on the left.
// `stage` overlays are positioned in fraction of the film frame; `overlay` sits over the viewport.
export function FilmScene({
  sectionRef,
  sequence,
  text,
  active,
  hint,
  stage,
  overlay,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  sequence: ReturnType<typeof useFrameSequence> & { poster: string };
  text: SceneText;
  active: number;
  hint: string;
  stage?: ReactNode;
  overlay?: ReactNode;
}) {
  // Function form: a plain range would be offloaded to a native scroll timeline that ignores clamping.
  const hintOpacity = useTransform(sequence.scrollYProgress, (v) => transform(v, [0, 0.04], [1, 0]));

  return (
    <section className="section-dark relative h-[420vh]" ref={sectionRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Film cropped like object-cover, anchored right so the subject stays in view on portrait screens. */}
        <div className="absolute left-[calc((100%_-_max(100%,177.78vh))*0.75)] top-1/2 aspect-video w-[max(100%,177.78vh)] -translate-y-1/2">
          <img alt="" className={cn("absolute inset-0 h-full w-full transition-opacity", sequence.loaded && "opacity-0")} src={sequence.poster} />
          <canvas className="absolute inset-0 h-full w-full" height={900} ref={sequence.canvasRef} width={1600} />
          {stage}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/20 to-transparent lg:bg-gradient-to-r lg:from-[rgb(var(--background-dark))]/90 lg:via-[rgb(var(--background-dark))]/25" />

        <div className="shell-wide relative flex h-full flex-col justify-between pb-16 pt-28 lg:pb-24">
          <div>
            <h2 className="section-title max-w-lg text-balance text-4xl sm:text-5xl">{text.title}</h2>
          </div>
          <Steps active={active} steps={text.steps} />
        </div>

        {overlay}

        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[12px] uppercase tracking-[0.14em] text-white/50"
          style={{ opacity: hintOpacity }}
        >
          {hint}
        </motion.p>
      </div>
    </section>
  );
}
