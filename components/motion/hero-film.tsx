"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HeroFilmMarker = {
  id: string;
  label: string;
  x: number;
  y: number;
  side: "left" | "right";
};

type HeroFilmProps = {
  video: string;
  posterStart: string;
  posterEnd: string;
  focusX: number;
  hubId: string;
  status: string;
  markers: HeroFilmMarker[];
  perimeter: [number, number][][];
};

const VIEW_W = 1600;
const VIEW_H = 900;
const EASE = [0.16, 1, 0.3, 1] as const;

const toView = ([x, y]: [number, number]) => `${(x / 100) * VIEW_W},${(y / 100) * VIEW_H}`;

// Home hero backdrop. The drone shot plays on every load and holds its last frame; the HUD then
// locks onto the site. Reduced-motion visitors get that last frame straight away.
export function HeroFilm({ video, posterStart, posterEnd, focusX, hubId, status, markers, perimeter }: HeroFilmProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<"film" | "still" | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setMode("still");
      setLocked(true);
    } else {
      setMode("film");
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (mode !== "film") return;
    // Played faster so the HUD lands while the visitor is still reading the headline.
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
    // Autoplay can be refused (data saver, low-power mode): fall back to the still frame.
    videoRef.current?.play().catch(() => {
      setMode("still");
      setLocked(true);
    });
  }, [mode]);

  const showStill = () => {
    setMode("still");
    setLocked(true);
  };

  const hub = markers.find((marker) => marker.id === hubId);
  const animate = locked && !reduceMotion;
  const instant = { duration: 0 };

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden [container-type:size]">
      {/* 16:9 stage that always covers the hero, so HUD coordinates stay glued to the picture. */}
      <div
        className="absolute left-[clamp(calc(100cqw_-_var(--film-w)),calc(50cqw_-_var(--film-w)_*_var(--film-focus)),0px)] top-1/2 h-[calc(var(--film-w)_*_0.5625)] w-[var(--film-w)] -translate-y-1/2 [--film-w:max(100cqw,177.78cqh)]"
        style={{ "--film-focus": focusX / 100 } as React.CSSProperties}
      >
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={posterStart} />
        {mode === "film" && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            muted
            onEnded={() => setLocked(true)}
            onError={showStill}
            playsInline
            poster={posterStart}
            preload="auto"
            ref={videoRef}
            src={video}
          />
        )}
        <img
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            mode === "still" ? "opacity-100" : "opacity-0",
          )}
          src={posterEnd}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--background-dark))]/95 via-[rgb(var(--background-dark))]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--background-dark))]/85 via-transparent to-[rgb(var(--background-dark))]/40" />
        {/* On phones the text sits over the whole picture: darken it all and keep the HUD off. */}
        <div className="absolute inset-0 bg-[rgb(var(--background-dark))]/60 md:hidden" />

        {locked && (
          <>
            {animate && (
              <motion.div
                animate={{ x: "420%", opacity: [0, 1, 1, 0] }}
                className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-accent/25 to-transparent"
                initial={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}

            <svg
              className="absolute inset-0 hidden h-full w-full overflow-visible [mask-image:linear-gradient(to_right,transparent_34%,black_50%)] md:block"
              fill="none"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            >
              {perimeter.map((segment, index) => (
                <motion.polyline
                  animate={{ pathLength: 1, opacity: 1 }}
                  className="stroke-accent"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  key={index}
                  points={segment.map(toView).join(" ")}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  transition={reduceMotion ? instant : { duration: 1.8, delay: 0.5 + index * 0.9, ease: "easeInOut" }}
                  vectorEffect="non-scaling-stroke"
                />
              ))}

              {hub &&
                markers
                  .filter((marker) => marker.id !== hubId)
                  .map((marker, index) => {
                    const [x1, y1] = [(hub.x / 100) * VIEW_W, (hub.y / 100) * VIEW_H];
                    const [x2, y2] = [(marker.x / 100) * VIEW_W, (marker.y / 100) * VIEW_H];
                    const path = `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`;
                    const delay = 1.5 + index * 0.25;
                    return (
                      <g key={marker.id}>
                        <motion.path
                          animate={{ pathLength: 1, opacity: 0.45 }}
                          className="stroke-white"
                          d={path}
                          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                          strokeWidth={1}
                          transition={reduceMotion ? instant : { duration: 0.9, delay, ease: EASE }}
                          vectorEffect="non-scaling-stroke"
                        />
                        {animate && (
                          <motion.path
                            animate={{ strokeDashoffset: [0, -72], opacity: 1 }}
                            className="stroke-accent"
                            d={path}
                            initial={{ opacity: 0 }}
                            strokeDasharray="3 33"
                            strokeLinecap="round"
                            strokeWidth={3}
                            transition={{
                              strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
                              opacity: { duration: 0.4, delay: delay + 0.9 },
                            }}
                            vectorEffect="non-scaling-stroke"
                          />
                        )}
                      </g>
                    );
                  })}

              {markers.map((marker, index) => {
                const cx = (marker.x / 100) * VIEW_W;
                const cy = (marker.y / 100) * VIEW_H;
                const delay = 0.7 + index * 0.22;
                return (
                  <g key={marker.id} transform={`translate(${cx} ${cy})`}>
                    {animate && (
                      <motion.circle
                        animate={{ r: [5, 30], opacity: [0.7, 0] }}
                        className="stroke-accent"
                        initial={{ r: 5, opacity: 0 }}
                        strokeWidth={1.5}
                        transition={{ duration: 2.4, repeat: Infinity, delay: delay + 0.6, ease: "easeOut" }}
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                    <motion.g
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      initial={reduceMotion ? false : { scale: 2.6, opacity: 0, rotate: 45 }}
                      transition={reduceMotion ? instant : { duration: 0.7, delay, ease: EASE }}
                    >
                      <path
                        className="stroke-white"
                        d="M-16,-8 V-16 H-8 M8,-16 H16 V-8 M16,8 V16 H8 M-8,16 H-16 V8"
                        strokeLinecap="round"
                        strokeWidth={2}
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle className="fill-accent" r={4} />
                    </motion.g>
                  </g>
                );
              })}
            </svg>

            {markers.map((marker, index) => (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "absolute hidden -translate-y-1/2 md:block",
                  marker.side === "right" ? "pl-8" : "-translate-x-full pr-8",
                )}
                initial={reduceMotion ? false : { opacity: 0, x: marker.side === "right" ? -12 : 12 }}
                key={marker.id}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                transition={reduceMotion ? instant : { duration: 0.5, delay: 1.1 + index * 0.22, ease: EASE }}
              >
                <div className="whitespace-nowrap rounded-lg border border-white/15 bg-[rgb(var(--background-dark))]/70 px-3 py-2 backdrop-blur-md">
                  <p className="text-xs font-semibold leading-none text-white">{marker.label}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {status}
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
