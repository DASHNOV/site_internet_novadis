"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { wheelCore, wheelCta, wheelDisciplines, wheelStages } from "@/data/solutions-wheel";
import { cn } from "@/lib/utils";

const C = { x: 400, y: 320 };
const TRACK_R = 222;
const DISC_R = 192;
const RING_R = 148;
const CORE_R = 80;
const ICON_R = 19;
const SUPERVISION_R = 27;
const STAGE_R = 24;
const LABEL_R = 262;
const COMET_SPAN = 42;
const CYCLE_SECONDS = 14;
const EASE = [0.16, 1, 0.3, 1] as const;

function polar(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  // Rounded so server and client render identical attributes.
  return [Math.round((C.x + r * Math.sin(rad)) * 100) / 100, Math.round((C.y - r * Math.cos(rad)) * 100) / 100];
}

function arc(r: number, from: number, to: number) {
  const [x1, y1] = polar(r, from);
  const [x2, y2] = polar(r, to);
  return `M${x1},${y1} A${r},${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2},${y2}`;
}

function chevron(deg: number) {
  const rad = (deg * Math.PI) / 180;
  const [px, py] = polar(TRACK_R, deg);
  const t = [Math.cos(rad), Math.sin(rad)];
  const n = [Math.sin(rad), -Math.cos(rad)];
  const tip = [px + t[0] * 9, py + t[1] * 9];
  const a = [px - t[0] * 6 + n[0] * 9, py - t[1] * 6 + n[1] * 9];
  const b = [px - t[0] * 6 - n[0] * 9, py - t[1] * 6 - n[1] * 9];
  return [a, tip, b].map((p) => p.map((v) => v.toFixed(2)).join(",")).join(" ");
}

function wrap(label: string, max = 13) {
  return label.split(" ").reduce<string[]>((lines, word) => {
    const last = lines[lines.length - 1];
    if (last && `${last} ${word}`.length <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
    return lines;
  }, []);
}

const step = 360 / wheelDisciplines.length;
const disciplines = wheelDisciplines.map((item, index) => {
  const angle = index * step;
  const r = index === 0 ? SUPERVISION_R : ICON_R;
  return { ...item, index, angle, r, center: polar(RING_R, angle) };
});

export function SolutionsWheel({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [shown, setShown] = useState(false);
  const [live, setLive] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const angle = useMotionValue(0);
  const cometPath = useTransform(angle, (a) => arc(TRACK_R, a - COMET_SPAN, a));
  const cometX = useTransform(angle, (a) => polar(TRACK_R, a)[0]);
  const cometY = useTransform(angle, (a) => polar(TRACK_R, a)[1]);

  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (reduceMotion || inView) setShown(true);
  }, [reduceMotion, inView]);

  // On phones the stage labels move below the wheel, so the viewBox is cropped to the wheel itself.
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!shown || reduceMotion) return;
    const timer = setTimeout(() => setLive(true), 2600);
    return () => clearTimeout(timer);
  }, [shown, reduceMotion]);

  useEffect(() => {
    if (!live) return;
    const controls = animate(angle, [0, 360], { duration: CYCLE_SECONDS, ease: "linear", repeat: Infinity });
    return () => controls.stop();
  }, [live, angle]);

  useMotionValueEvent(angle, "change", (a) => {
    const passed = wheelStages.filter((stage) => stage.angle <= a);
    const next = passed.length ? wheelStages.indexOf(passed[passed.length - 1]) : wheelStages.length - 1;
    if (next !== activeStage) setActiveStage(next);
  });

  const appear = (delay: number, from: Record<string, number> = { opacity: 0, scale: 0.6 }) => ({
    initial: false as const,
    animate: shown ? Object.fromEntries(Object.keys(from).map((key) => [key, 1])) : from,
    transition: reduceMotion ? { duration: 0 } : { duration: 0.8, delay, ease: EASE },
    style: { transformBox: "fill-box" as const, transformOrigin: "center" },
  });

  const focus = hovered === null ? null : disciplines[hovered];
  const focusLines = focus ? wrap(focus.label) : [];

  return (
    <div className="w-full" ref={ref}>
      <svg aria-label={label} className="block h-auto w-full select-none" role="group" viewBox={compact ? "136 56 528 528" : "0 0 800 640"}>
        <title>{label}</title>

        <motion.circle className="fill-background-soft" cx={C.x} cy={C.y} r={DISC_R} {...appear(0, { opacity: 0, scale: 0.85 })} />

        <motion.circle
          className="fill-none stroke-hairline-strong"
          cx={C.x}
          cy={C.y}
          r={TRACK_R}
          strokeWidth={10}
          transform={`rotate(-90 ${C.x} ${C.y})`}
          {...appear(1.1, { opacity: 0, pathLength: 0 })}
          style={undefined}
        />
        {wheelStages.map((stage, index) => (
          <motion.polygon
            className="fill-muted"
            key={`chevron-${stage.angle}`}
            points={chevron(stage.angle - 16)}
            {...appear(1.6 + index * 0.1, { opacity: 0 })}
            style={undefined}
          />
        ))}

        {live && (
          <g aria-hidden className="pointer-events-none">
            <motion.path className="fill-none stroke-primary/70" d={cometPath} strokeLinecap="round" strokeWidth={4} />
            <motion.circle className="fill-primary" cx={cometX} cy={cometY} r={5} />
          </g>
        )}

        <motion.circle
          className="fill-none stroke-hairline-strong"
          cx={C.x}
          cy={C.y}
          r={RING_R}
          strokeWidth={6}
          transform={`rotate(-90 ${C.x} ${C.y})`}
          {...appear(0.2, { opacity: 0, pathLength: 0 })}
          style={undefined}
        />

        {disciplines.map((item) => {
          const [x1, y1] = polar(RING_R - item.r - 4, item.angle);
          const [x2, y2] = polar(CORE_R + 4, item.angle);
          const active = hovered === item.index;
          return (
            <motion.line
              className={cn("transition-colors duration-300", active ? "stroke-primary" : "stroke-hairline-strong")}
              key={`spoke-${item.label}`}
              strokeDasharray={active ? undefined : "2 4"}
              strokeWidth={active ? 2 : 1.25}
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
              {...appear(0.6 + item.index * 0.05, { opacity: 0 })}
              style={undefined}
            />
          );
        })}

        {live && (
          <g aria-hidden className="pointer-events-none">
            {disciplines.map((item) => {
              const [x1, y1] = polar(RING_R - item.r - 4, item.angle);
              const [x2, y2] = polar(CORE_R + 6, item.angle);
              const begin = `${(item.index * 0.55) % 4.4}s`;
              return (
                <circle className="fill-primary" key={`pulse-${item.label}`} opacity={0} r={2.75}>
                  <animateMotion
                    begin={begin}
                    calcMode="spline"
                    dur="4.4s"
                    keyPoints="0;1;1"
                    keySplines="0.4 0 0.6 1;0 0 1 1"
                    keyTimes="0;0.4;1"
                    path={`M${x1},${y1} L${x2},${y2}`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    begin={begin}
                    dur="4.4s"
                    keyTimes="0;0.05;0.34;0.4;1"
                    repeatCount="indefinite"
                    values="0;1;1;0;0"
                  />
                </circle>
              );
            })}
          </g>
        )}

        <motion.g {...appear(0.3)}>
          <circle className="fill-surface stroke-hairline-strong" cx={C.x} cy={C.y} r={CORE_R} strokeWidth={1.5} />
          {live && (
            <circle className="fill-none stroke-primary/40" cx={C.x} cy={C.y} r={CORE_R}>
              <animate attributeName="r" dur="2.2s" repeatCount="indefinite" values={`${CORE_R};${CORE_R + 10}`} />
              <animate attributeName="opacity" dur="2.2s" repeatCount="indefinite" values="0.8;0" />
            </circle>
          )}
          {focus ? (
            <text className="pointer-events-none font-display" textAnchor="middle">
              {focusLines.map((line, i) => (
                <tspan
                  className="fill-foreground-strong text-[17px] font-bold"
                  key={line}
                  x={C.x}
                  y={C.y - (focusLines.length - 1) * 10 + i * 20 - 4}
                >
                  {line}
                </tspan>
              ))}
              <tspan
                className="fill-primary-strong text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.08em" }}
                x={C.x}
                y={C.y + (focusLines.length - 1) * 10 + 22}
              >
                {wheelCta} →
              </tspan>
            </text>
          ) : (
            <text className="pointer-events-none font-display uppercase" textAnchor="middle">
              <tspan className="fill-foreground-strong text-[23px] font-bold" x={C.x} y={C.y - 8}>
                {wheelCore[0]}
              </tspan>
              <tspan className="fill-primary-strong text-[15px] font-bold" x={C.x} y={C.y + 12}>
                {wheelCore[1]}
              </tspan>
              <tspan
                className="fill-primary-strong text-[10px] font-semibold"
                style={{ letterSpacing: "0.04em" }}
                x={C.x}
                y={C.y + 28}
              >
                {wheelCore[2]}
              </tspan>
            </text>
          )}
        </motion.g>

        {disciplines.map((item) => {
          const [cx, cy] = item.center;
          const Icon = item.icon;
          const active = hovered === item.index;
          const isSupervision = item.index === 0;
          const iconSize = isSupervision ? 26 : 18;
          return (
            <motion.g key={item.label} {...appear(0.5 + item.index * 0.06)}>
              <Link
                aria-label={`${item.label} — ${wheelCta}`}
                className="cursor-pointer outline-none [&:focus-visible_.wheel-badge]:stroke-primary-deep [&:focus-visible_.wheel-badge]:[stroke-width:3]"
                href={`/solutions/${item.slug}`}
                onBlur={() => setHovered(null)}
                onFocus={() => setHovered(item.index)}
                onMouseEnter={() => setHovered(item.index)}
                onMouseLeave={() => setHovered(null)}
              >
                <motion.g
                  animate={{ scale: active ? 1.18 : 1 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
                >
                  {isSupervision && (
                    <circle className="fill-surface stroke-primary/30" cx={cx} cy={cy} r={item.r + 6} strokeWidth={1.5} />
                  )}
                  <circle
                    className={cn(
                      "wheel-badge transition-colors duration-300",
                      active
                        ? "fill-primary-strong stroke-primary-strong"
                        : isSupervision
                          ? "fill-surface stroke-primary"
                          : "fill-surface stroke-muted",
                    )}
                    cx={cx}
                    cy={cy}
                    r={item.r}
                    strokeWidth={isSupervision ? 3 : 2}
                  />
                  <Icon
                    className={cn(
                      "transition-colors duration-300",
                      active ? "text-white" : isSupervision ? "text-primary-strong" : "text-muted-strong",
                    )}
                    height={iconSize}
                    strokeWidth={isSupervision ? 2 : 1.75}
                    width={iconSize}
                    x={cx - iconSize / 2}
                    y={cy - iconSize / 2}
                  />
                </motion.g>
              </Link>
            </motion.g>
          );
        })}

        {wheelStages.map((stage, index) => {
          const [cx, cy] = polar(TRACK_R, stage.angle);
          const [lx, ly] = polar(LABEL_R, stage.angle);
          const sin = Math.sin((stage.angle * Math.PI) / 180);
          const cos = Math.cos((stage.angle * Math.PI) / 180);
          const anchor = sin > 0.3 ? "start" : sin < -0.3 ? "end" : "middle";
          const lineHeight = 16;
          const firstY =
            cos > 0.3
              ? ly - (stage.lines.length - 1) * lineHeight
              : cos < -0.3
                ? ly + 12
                : ly - ((stage.lines.length - 1) * lineHeight) / 2 + 4;
          const Icon = stage.icon;
          const active = activeStage === index;
          return (
            <motion.g key={stage.lines[0]} {...appear(1.5 + index * 0.12)}>
              <circle
                className={cn("fill-primary/15 transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
                cx={cx}
                cy={cy}
                r={STAGE_R + 9}
              />
              <circle
                className={cn("stroke-surface transition-colors duration-500", active ? "fill-primary-strong" : "fill-accent")}
                cx={cx}
                cy={cy}
                r={STAGE_R}
                strokeWidth={3}
              />
              <Icon className="text-white" height={22} strokeWidth={2} width={22} x={cx - 11} y={cy - 11} />
              <text
                className={cn(
                  "hidden font-display text-[13px] font-bold uppercase transition-colors duration-500 sm:inline",
                  active ? "fill-primary-strong" : "fill-foreground-strong",
                )}
                style={{ letterSpacing: "0.04em" }}
                textAnchor={anchor}
              >
                {stage.lines.map((line, i) => (
                  <tspan key={line} x={lx} y={firstY + i * lineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <ol className="mt-5 grid gap-2 border-t border-hairline pt-5 sm:hidden">
        {wheelStages.map((stage, index) => {
          const Icon = stage.icon;
          const active = activeStage === index;
          return (
            <li className="flex items-center gap-3" key={stage.lines[0]}>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-500",
                  active ? "bg-primary-strong" : "bg-accent",
                )}
              >
                <Icon aria-hidden className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "font-display text-[13px] font-bold uppercase leading-5 tracking-[0.04em] transition-colors duration-500",
                  active ? "text-primary-strong" : "text-foreground-strong",
                )}
              >
                {stage.lines.join(" ")}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
