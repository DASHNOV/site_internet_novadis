"use client";

import { useRef } from "react";
import { transform, useReducedMotion } from "framer-motion";
import { CheckCircle2, ScanLine } from "lucide-react";
import { EventToast, FilmScene, Flash, HudPanel, LockBox, Shockwave, StaticFilmScene, useFrameSequence } from "@/components/motion/film-scene";
import { badgeDoor } from "@/data/site";

const { granted, open } = badgeDoor.beats;
// Scroll progress over which the film is scrubbed.
const PLAY: [number, number] = [0.02, 0.94];
// Reader lock box at scale 1, in fraction of the frame (the reader is ~3 % × 10 % of it).
const BOX = { w: 0.055, h: 0.15 };

function stepAt(frame: number) {
  if (frame < granted) return 0;
  return frame < open ? 1 : 2;
}

function ReaderHud({ frame, step }: { frame: number; step: number }) {
  const [x, y, s] = badgeDoor.anchors[frame];
  const ok = step >= 1;
  const tone = ok ? "success" : "glow";
  const reading = transform(frame, [4, granted - 1], [0, 1]);
  const w = (BOX.w * s) / 2;
  const h = (BOX.h * s) / 2;

  return (
    <LockBox box={[x - w, y - h, x + w, y + h]} tone={tone} visible={frame >= 3 && frame < open + 4}>
      {/* Read field: pulses while the badge is presented. */}
      {step === 0 && (
        <span className="absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-ping rounded-full border border-glow/50" />
          <span className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.22),transparent_70%)]" />
        </span>
      )}
      {step === 1 && <Shockwave tone="success" />}

      {/* Left of the reader, clear of the hand coming in from the right. */}
      <HudPanel side="left" tone={tone}>
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
      </HudPanel>
    </LockBox>
  );
}

export function BadgeDoor() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const sequence = useFrameSequence(sectionRef, badgeDoor, PLAY, !reduceMotion);
  const { frame } = sequence;
  const step = stepAt(frame);

  if (reduceMotion) return <StaticFilmScene {...badgeDoor} image={badgeDoor.framePath(badgeDoor.staticFrame)} />;

  const [x, y] = badgeDoor.anchors[frame];
  return (
    <FilmScene
      active={step}
      hint={badgeDoor.scrollHint}
      overlay={<EventToast icon={CheckCircle2} tone="success" visible={step === 2} {...badgeDoor.event} />}
      sectionRef={sectionRef}
      sequence={{ ...sequence, poster: badgeDoor.framePath(0) }}
      stage={
        <>
          {step === 1 && <Flash tone="success" x={x} y={y} />}
          <ReaderHud frame={frame} step={step} />
        </>
      }
      text={badgeDoor}
    />
  );
}
