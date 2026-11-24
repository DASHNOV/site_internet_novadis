"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Maximize2, Minimize2, MousePointer2, ScanLine } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { lidarWalkthrough as config } from "@/data/lidar-walkthrough";
import { cn } from "@/lib/utils";
import type { JoystickInput, LidarGrid, LidarLayout, LidarStatus, ZoneState } from "./lidar-walkthrough-scene";
import { useCanRender3d } from "./use-can-render-3d";

const Scene = dynamic(() => import("./lidar-walkthrough-scene"), { ssr: false });

type Phase = "idle" | "loading" | "error" | "live";

const stateTone: Record<ZoneState, string> = {
  clear: "text-glow",
  prealarm: "text-warning",
  alarm: "text-danger",
};

async function fetchBuffer(url: string, onProgress?: (ratio: number) => void) {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`${url}: ${res.status}`);
  const total = Number(res.headers.get("content-length")) || 0;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total) onProgress?.(Math.min(1, received / total));
  }
  const out = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out.buffer;
}

function parseGrid(buffer: ArrayBuffer): LidarGrid {
  const [width, height, cell, originX, originZ] = new Float32Array(buffer, 0, 5);
  return { width, height, cell, originX, originZ, cells: new Uint8Array(buffer, 20) };
}

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => setCoarse(window.matchMedia("(pointer: coarse)").matches), []);
  return coarse;
}

function Joystick({ input }: { input: React.MutableRefObject<JoystickInput> }) {
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const base = useRef<HTMLDivElement>(null);
  const RANGE = 40;

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = base.current?.getBoundingClientRect();
    if (!rect) return;
    let x = e.clientX - (rect.left + rect.width / 2);
    let y = e.clientY - (rect.top + rect.height / 2);
    const length = Math.hypot(x, y);
    if (length > RANGE) {
      x = (x / length) * RANGE;
      y = (y / length) * RANGE;
    }
    setKnob({ x, y });
    input.current = { x: x / RANGE, y: -y / RANGE };
  };
  const release = () => {
    setKnob({ x: 0, y: 0 });
    input.current = { x: 0, y: 0 };
  };

  return (
    <div
      aria-hidden
      className="absolute bottom-5 left-5 grid h-28 w-28 touch-none place-items-center rounded-full border border-white/20 bg-background-dark/50"
      onPointerCancel={release}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e);
      }}
      onPointerMove={(e) => e.buttons && move(e)}
      onPointerUp={release}
      ref={base}
    >
      <span className="h-11 w-11 rounded-full bg-glow/80" style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }} />
    </div>
  );
}

const MAP_SCALE = 1.4;

// Top view drawn from the collision grid: walkable floor, protected zone, then both tracked people.
function Minimap({ grid, layout, status }: { grid: LidarGrid; layout: LidarLayout; status: LidarStatus | null }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const floor = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = document.createElement("canvas");
    img.width = grid.width;
    img.height = grid.height;
    const ctx = img.getContext("2d");
    if (!ctx) return;
    const data = ctx.createImageData(grid.width, grid.height);
    for (let i = 0; i < grid.cells.length; i++) {
      if (grid.cells[i]) continue;
      data.data.set([129, 207, 245, 70], i * 4);
    }
    ctx.putImageData(data, 0, 0);
    floor.current = img;
  }, [grid]);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx || !floor.current) return;
    const unit = MAP_SCALE / grid.cell;
    const toMap = (x: number, z: number) => [(x - grid.originX) * unit, (z - grid.originZ) * unit] as const;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(floor.current, 0, 0, grid.width * MAP_SCALE, grid.height * MAP_SCALE);

    const state = status?.intruder.state ?? "clear";
    const tone = state === "alarm" ? "#ef4444" : state === "prealarm" ? "#f59e0b" : "#81cff5";
    const [cx, cz] = toMap(...layout.zone.center);
    ctx.save();
    ctx.translate(cx, cz);
    ctx.rotate(layout.zone.angle);
    const [w, d] = layout.zone.size;
    const m = config.prealarmMargin;
    ctx.strokeStyle = "rgba(245, 158, 11, 0.6)";
    ctx.setLineDash([3, 3]);
    ctx.strokeRect((-w / 2 - m) * unit, (-d / 2 - m) * unit, (w + m * 2) * unit, (d + m * 2) * unit);
    ctx.setLineDash([]);
    ctx.fillStyle = `${tone}33`;
    ctx.strokeStyle = tone;
    ctx.fillRect((-w / 2) * unit, (-d / 2) * unit, w * unit, d * unit);
    ctx.strokeRect((-w / 2) * unit, (-d / 2) * unit, w * unit, d * unit);
    ctx.restore();

    if (!status) return;
    const [ix, iz] = toMap(status.intruder.x, status.intruder.z);
    ctx.fillStyle = tone;
    ctx.beginPath();
    ctx.arc(ix, iz, 6, 0, Math.PI * 2);
    ctx.fill();

    const [vx, vz] = toMap(status.visitor.x, status.visitor.z);
    const yaw = status.visitor.yaw;
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.moveTo(vx - Math.sin(yaw) * 14, vz - Math.cos(yaw) * 14);
    ctx.lineTo(vx + Math.cos(yaw) * 7, vz - Math.sin(yaw) * 7);
    ctx.lineTo(vx - Math.cos(yaw) * 7, vz + Math.sin(yaw) * 7);
    ctx.closePath();
    ctx.fill();
  }, [grid, layout, status]);

  return (
    <canvas
      aria-hidden
      className="mx-auto block max-h-64 w-auto max-w-full"
      height={Math.round(grid.height * MAP_SCALE)}
      ref={canvas}
      width={Math.round(grid.width * MAP_SCALE)}
    />
  );
}

export function LidarWalkthrough() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<{ preview: Uint8Array; grid: LidarGrid; layout: LidarLayout } | null>(null);
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [status, setStatus] = useState<LidarStatus | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const joystick = useRef<JoystickInput>({ x: 0, y: 0 });
  const canRender = useCanRender3d();
  const coarse = useCoarsePointer();

  const start = useCallback(async () => {
    setPhase("loading");
    try {
      const [preview, grid, layout] = await Promise.all([
        fetchBuffer(config.splats.preview, setProgress),
        fetchBuffer(config.grid),
        fetch(config.layout).then((res) => {
          if (!res.ok) throw new Error(`${config.layout}: ${res.status}`);
          return res.json() as Promise<LidarLayout>;
        }),
      ]);
      setData({ preview: new Uint8Array(preview), grid: parseGrid(grid), layout });
      setPhase("live");
    } catch {
      setPhase("error");
    }
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stageRef.current?.requestFullscreen?.();
  };

  const markReady = useCallback(() => setReady(true), []);
  const intruderState = status?.intruder.state ?? "clear";
  const visitorState = status?.visitor.state ?? "clear";

  return (
    <section className="section-dark section-y">
      <div className="shell-wide">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <p className="data-label text-glow">{config.eyebrow}</p>
            <h2 className="section-title mt-4 text-balance text-[clamp(2rem,3.4vw,3rem)]">{config.title}</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{config.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start">
          <figure className="console overflow-hidden">
            <div className={cn("relative bg-background-dark", fullscreen ? "h-full" : "aspect-[16/10]")} ref={stageRef}>
              <img
                alt={config.posterAlt}
                className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", ready && "opacity-0")}
                loading="lazy"
                src={config.poster}
              />

              {phase === "live" && data && (
                <div className={cn("absolute inset-0 transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}>
                  <Scene
                    coarse={coarse}
                    grid={data.grid}
                    layout={data.layout}
                    joystick={joystick}
                    onLockChange={setLocked}
                    onReady={markReady}
                    onStatus={setStatus}
                    preview={data.preview}
                  />
                </div>
              )}

              {phase !== "live" && (
                <div className="absolute inset-0 grid place-items-center bg-background-dark/55 p-6 text-center">
                  {!canRender ? (
                    <p className="max-w-sm text-sm leading-6 text-white">{config.unsupported}</p>
                  ) : phase === "idle" ? (
                    <button
                      className="inline-flex min-h-12 items-center gap-3 rounded-md border border-glow bg-background-dark/80 px-6 font-semibold text-white transition-colors duration-150 hover:bg-glow hover:text-background-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
                      onClick={start}
                      type="button"
                    >
                      <ScanLine aria-hidden className="h-5 w-5" />
                      {config.start}
                    </button>
                  ) : phase === "loading" ? (
                    <div aria-live="polite" className="w-full max-w-xs">
                      <p className="data-label text-white">{config.loading}</p>
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full bg-glow transition-[width] duration-150" style={{ width: `${Math.round(progress * 100)}%` }} />
                      </div>
                      <p className="mt-2 font-mono text-xs text-muted-strong">{Math.round(progress * 100)} %</p>
                    </div>
                  ) : (
                    <p className="text-sm text-white">{config.error}</p>
                  )}
                </div>
              )}

              {ready && (
                <>
                  {intruderState !== "clear" && (
                    <p
                      aria-live="assertive"
                      className={cn(
                        "absolute left-4 top-4 rounded-sm px-3 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-background-dark",
                        intruderState === "alarm" ? "animate-status bg-danger" : "bg-warning",
                      )}
                    >
                      {config.hud.states[intruderState]} · {config.hud.zone}
                    </p>
                  )}

                  <button
                    aria-label={fullscreen ? config.exitFullscreen : config.fullscreen}
                    className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-background-dark/70 text-white hover:border-glow hover:text-glow"
                    onClick={toggleFullscreen}
                    title={fullscreen ? config.exitFullscreen : config.fullscreen}
                    type="button"
                  >
                    {fullscreen ? <Minimize2 aria-hidden className="h-4 w-4" /> : <Maximize2 aria-hidden className="h-4 w-4" />}
                  </button>

                  {!coarse && !locked && (
                    <p className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center gap-2 rounded-md bg-background-dark/80 px-4 py-2 text-sm font-semibold text-white">
                      <MousePointer2 aria-hidden className="h-4 w-4 text-glow" />
                      {config.lockHint}
                    </p>
                  )}

                  {!coarse && locked && (
                    <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
                  )}

                  {coarse && <Joystick input={joystick} />}
                </>
              )}
            </div>
            <figcaption className="console-head flex-wrap border-b-0 border-t">
              <span>{config.caption}</span>
              {ready && <span className="normal-case tracking-normal text-glow">{coarse ? config.controls.touch : config.controls.keyboard}</span>}
            </figcaption>
          </figure>

          <div className="console flex flex-col">
            <div className="console-head">
              <span>{config.hud.live}</span>
              <span className={cn("flex flex-none items-center gap-2 whitespace-nowrap", ready ? stateTone[intruderState] : "text-success")}>
                <span aria-hidden className="h-1.5 w-1.5 animate-status rounded-full bg-current" />
                {config.hud.states[intruderState]}
              </span>
            </div>

            <dl className="border-b border-night-line">
              <div className="border-b border-night-line px-5 py-4">
                <dt className="font-display text-base font-bold text-white">{config.hud.intruder}</dt>
                <dd className={cn("mt-1 font-mono text-[12px] uppercase tracking-[0.12em]", stateTone[intruderState])}>
                  {intruderState === "alarm" ? config.hud.inZone : intruderState === "prealarm" ? config.hud.states.prealarm : config.hud.outside}
                  {" · "}
                  {config.hud.height} {config.intruder.height.toFixed(2).replace(".", ",")} m · {config.hud.speed}{" "}
                  {config.intruder.speed.toFixed(1).replace(".", ",")} m/s
                </dd>
              </div>
              <div className="px-5 py-4">
                <dt className="font-display text-base font-bold text-white">{config.hud.visitor}</dt>
                <dd className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-success">
                  {visitorState === "alarm" ? `${config.hud.inZone} · ${config.hud.friendly}` : config.hud.outside}
                </dd>
              </div>
            </dl>

            <div className="flex flex-1 flex-col p-5">
              {data ? (
                <>
                  <p className="data-label text-muted-strong">{config.hud.minimap}</p>
                  <div className="mt-3 flex flex-1 items-center">
                    <Minimap grid={data.grid} layout={data.layout} status={status} />
                  </div>
                </>
              ) : (
                <ul className="grid grid-cols-3 gap-4">
                  {config.scan.map((item) => (
                    <li key={item.label}>
                      <p className="font-display text-2xl font-bold text-white">{item.value}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-strong">{item.label}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
