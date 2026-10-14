"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Radar, Siren, TriangleAlert } from "lucide-react";
import { EventToast, FilmScene, Flash, HudPanel, LockBox, Shockwave, StaticFilmScene, tones, useFrameSequence } from "@/components/motion/film-scene";
import { intrusionScene } from "@/data/site";
import { cn } from "@/lib/utils";

const { detected, escalated } = intrusionScene.beats;
const { detector, intruder } = intrusionScene.anchors;
const PLAY: [number, number] = [0.02, 0.94];
// Far edges of the detector's field, in fraction of the frame: the aisle it watches.
const FIELD = { top: [0.16, 0.4], bottom: [0.44, 0.98] };

function stepAt(frame: number) {
  if (frame < detected) return 0;
  return frame < escalated ? 1 : 2;
}

// Detection field from the detector to the aisle, then the link to the intruder once it fires.
function Field({ frame, step }: { frame: number; step: number }) {
  const [x0, y0, , y1] = detector[frame];
  const apex = [x0 * 100, ((y0 + y1) / 2) * 100];
  const target = intruder[frame];
  const color = step === 0 ? tones.glow.rgb : tones.danger.rgb;
  const fade = (FIELD.top[0] + FIELD.bottom[0]) * 50;

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700", step < 2 ? "opacity-100" : "opacity-0")}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="intrusion-field" x1={apex[0]} x2={fade} y1={apex[1]} y2={apex[1]}>
          <stop offset="0" stopColor={`rgb(${color})`} stopOpacity="0.32" />
          <stop offset="1" stopColor={`rgb(${color})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        className="transition-[fill] duration-300"
        fill="url(#intrusion-field)"
        points={`${apex} ${FIELD.top[0] * 100},${FIELD.top[1] * 100} ${FIELD.bottom[0] * 100},${FIELD.bottom[1] * 100}`}
      />
      {[FIELD.top, FIELD.bottom].map(([fx, fy]) => (
        <line
          className="animate-[pulse_2.4s_ease-in-out_infinite]"
          key={fx}
          stroke={`rgb(${color} / 0.45)`}
          strokeDasharray="4 6"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          x1={apex[0]}
          x2={fx * 100}
          y1={apex[1]}
          y2={fy * 100}
        />
      ))}
      {step === 1 && target && (
        <line
          stroke={`rgb(${tones.danger.rgb})`}
          strokeDasharray="6 4"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          x1={apex[0]}
          x2={target[2] * 100}
          y1={apex[1]}
          y2={((target[1] + target[3]) / 2) * 100}
        />
      )}
    </svg>
  );
}

function DetectorHud({ frame, step }: { frame: number; step: number }) {
  const alarm = step >= 1;
  const tone = alarm ? "danger" : "glow";
  const [x0, y0, x1, y1] = detector[frame];
  const pad = (x1 - x0) * 0.25;

  return (
    <LockBox box={[x0 - pad, y0 - pad, x1 + pad, y1 + pad]} tone={tone} visible={frame < escalated + 4}>
      {step === 1 && <Shockwave tone="danger" />}
      {/* Left of the detector: it sits on the right edge of the frame. */}
      <HudPanel side="left" tone={tone}>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">{intrusionScene.hud.detector}</p>
        {alarm ? (
          <>
            <div className="mt-2 flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 flex-none text-danger" />
              <p className="text-sm font-semibold text-white">{intrusionScene.hud.detected}</p>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-danger">{intrusionScene.hud.panel}</p>
          </>
        ) : (
          <>
            <div className="mt-2 flex items-center gap-2">
              <Radar className="h-4 w-4 flex-none text-glow" />
              <p className="text-sm font-semibold text-white">{intrusionScene.hud.armed}</p>
            </div>
            <p className="mt-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-glow">
              <span className="relative h-1.5 w-1.5 rounded-full bg-glow">
                <span className="absolute inset-0 animate-ping rounded-full bg-glow" />
              </span>
              {intrusionScene.hud.watching}
            </p>
          </>
        )}
      </HudPanel>
    </LockBox>
  );
}

function IntruderHud({ frame, step }: { frame: number; step: number }) {
  const box = intruder[frame];
  if (!box) return null;
  const [x0, y0, x1, y1] = box;
  const pad = (x1 - x0) * 0.3;
  // The tracked box stops at the ankles: extra room below keeps the feet inside.
  return (
    <LockBox box={[x0 - pad, y0 - 0.02, x1 + pad, y1 + 0.04]} tone="danger" visible={step === 1}>
      <p className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-danger/40 bg-night/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
        {intrusionScene.hud.intruder}
      </p>
    </LockBox>
  );
}

export function IntrusionScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const sequence = useFrameSequence(sectionRef, intrusionScene, PLAY, !reduceMotion);
  const { frame } = sequence;
  const step = stepAt(frame);

  if (reduceMotion) return <StaticFilmScene {...intrusionScene} image={intrusionScene.framePath(intrusionScene.staticFrame)} />;

  const [x0, y0, x1, y1] = detector[frame];
  return (
    <FilmScene
      active={step}
      hint={intrusionScene.scrollHint}
      overlay={<EventToast icon={Siren} tone="danger" visible={step === 2} {...intrusionScene.event} />}
      sectionRef={sectionRef}
      sequence={{ ...sequence, poster: intrusionScene.framePath(0) }}
      stage={
        <>
          <Field frame={frame} step={step} />
          {step === 1 && <Flash tone="danger" x={(x0 + x1) / 2} y={(y0 + y1) / 2} />}
          {/* Escalation: the frame edges pulse red while the alarm is up. */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 animate-pulse shadow-[inset_0_0_180px_rgb(var(--danger)/0.5)] transition-opacity duration-700",
              step === 2 ? "opacity-100" : "opacity-0",
            )}
          />
          <IntruderHud frame={frame} step={step} />
          <DetectorHud frame={frame} step={step} />
        </>
      }
      text={intrusionScene}
    />
  );
}
