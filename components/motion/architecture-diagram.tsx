"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { architectureLayers, getSolution, type ArchitectureLayer } from "@/data/site";
import { cn } from "@/lib/utils";

const UNIT = 34;
const ORIGIN = { x: 175, y: 315 };
const PLATE = { w: 8, d: 5 };
const LAYER_Z: Record<ArchitectureLayer["id"], number> = { field: 0, core: 150, operators: 300 };
const BACKBONE_Y = PLATE.d / 2;
const CUBE_HALF = 0.55;
const CUBE_HEIGHT = { default: 22, core: 40 };

type Point = [number, number];

function iso(x: number, y: number, z: number): Point {
  return [ORIGIN.x + (x - y) * UNIT * 0.866, ORIGIN.y + (x + y) * UNIT * 0.5 - z];
}

function poly(points: Point[]) {
  return points.map((p) => p.join(",")).join(" ");
}

function path(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
}

const coreLayer = architectureLayers.find((layer) => layer.id === "core")!;
const server = coreLayer.nodes[0];
const coreZ = LAYER_Z.core;

type Route = { slug: string; points: Point[] };

// Every non-core node is wired to the backbone, then along it to the server.
const routes: Route[] = architectureLayers
  .filter((layer) => layer.id !== "core")
  .flatMap((layer) =>
    layer.nodes.map((node) => {
      const z = LAYER_Z[layer.id];
      const start = iso(node.x, node.y, layer.id === "field" ? z + CUBE_HEIGHT.default : z);
      return {
        slug: node.slug,
        points: [
          start,
          iso(node.x, node.y, coreZ),
          iso(node.x, BACKBONE_Y, coreZ),
          iso(server.x, server.y, coreZ),
        ],
      };
    }),
  );

function Plate({ z, label }: { z: number; label: string }) {
  const corners = [iso(0, 0, z), iso(PLATE.w, 0, z), iso(PLATE.w, PLATE.d, z), iso(0, PLATE.d, z)];
  const [labelX, labelY] = iso(0.25, PLATE.d, z);
  return (
    <>
      <polygon className="pointer-events-none fill-primary/[0.06] stroke-primary/35" points={poly(corners)} strokeWidth={1} />
      {Array.from({ length: PLATE.w - 1 }, (_, i) => (
        <line
          className="pointer-events-none stroke-primary/10"
          key={`gx-${i}`}
          x1={iso(i + 1, 0, z)[0]}
          x2={iso(i + 1, PLATE.d, z)[0]}
          y1={iso(i + 1, 0, z)[1]}
          y2={iso(i + 1, PLATE.d, z)[1]}
        />
      ))}
      {Array.from({ length: PLATE.d - 1 }, (_, i) => (
        <line
          className="pointer-events-none stroke-primary/10"
          key={`gy-${i}`}
          x1={iso(0, i + 1, z)[0]}
          x2={iso(PLATE.w, i + 1, z)[0]}
          y1={iso(0, i + 1, z)[1]}
          y2={iso(PLATE.w, i + 1, z)[1]}
        />
      ))}
      <text
        className="pointer-events-none fill-muted-strong font-mono text-[10.5px] uppercase"
        style={{ letterSpacing: "0.18em" }}
        // Lays the label flat on the plate, along its front edge.
        transform={`matrix(0.866 0.5 -0.866 0.5 ${labelX} ${labelY})`}
        x={0}
        y={-6}
      >
        {label}
      </text>
    </>
  );
}

type NodeProps = {
  slug: string;
  x: number;
  y: number;
  z: number;
  height: number;
  active: boolean;
  onSelect: (slug: string) => void;
};

function Node({ slug, x, y, z, height, active, onSelect }: NodeProps) {
  const solution = getSolution(slug);
  if (!solution) return null;
  const Icon = solution.icon;
  const h = CUBE_HALF;
  const top = [iso(x - h, y - h, z + height), iso(x + h, y - h, z + height), iso(x + h, y + h, z + height), iso(x - h, y + h, z + height)];
  const left = [iso(x - h, y + h, z + height), iso(x + h, y + h, z + height), iso(x + h, y + h, z), iso(x - h, y + h, z)];
  const right = [iso(x + h, y - h, z + height), iso(x + h, y + h, z + height), iso(x + h, y + h, z), iso(x + h, y - h, z)];
  const [cx, cy] = iso(x, y, z + height);
  const badgeY = cy - 30;

  return (
    <g
      aria-label={solution.shortTitle}
      aria-pressed={active}
      className="cursor-pointer outline-none [&:focus-visible_.node-badge]:stroke-primary-deep [&:focus-visible_.node-badge]:[stroke-width:3]"
      onClick={() => onSelect(slug)}
      onFocus={() => onSelect(slug)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(slug);
        }
      }}
      onMouseEnter={() => onSelect(slug)}
      role="button"
      tabIndex={0}
    >
      <circle cx={cx} cy={cy - 10} fill="transparent" r={38} />
      <polygon
        className={cn("transition-colors duration-300", active ? "fill-primary/45" : "fill-primary/20")}
        points={poly(left)}
      />
      <polygon
        className={cn("transition-colors duration-300", active ? "fill-primary/65" : "fill-primary/30")}
        points={poly(right)}
      />
      <polygon
        className={cn("stroke-primary/60 transition-colors duration-300", active ? "fill-primary" : "fill-background")}
        points={poly(top)}
        strokeWidth={1}
      />
      <line
        className={cn("transition-colors duration-300", active ? "stroke-primary" : "stroke-primary/30")}
        x1={cx}
        x2={cx}
        y1={cy}
        y2={badgeY + 16}
      />
      <circle
        className={cn(
          "node-badge transition-colors duration-300",
          active ? "fill-primary stroke-primary" : "fill-background stroke-primary/50",
        )}
        cx={cx}
        cy={badgeY}
        r={16}
        strokeWidth={1.5}
      />
      <Icon
        className={cn("transition-colors duration-300", active ? "text-white" : "text-primary")}
        height={16}
        width={16}
        x={cx - 8}
        y={badgeY - 8}
      />
    </g>
  );
}

function Links({ routes: subset, activeSlug }: { routes: Route[]; activeSlug: string }) {
  return (
    <>
      {subset.map((route) => {
        const highlighted = activeSlug === route.slug || activeSlug === server.slug;
        return (
          <path
            className={cn(
              "pointer-events-none fill-none transition-colors duration-300",
              highlighted ? "stroke-primary" : "stroke-primary/30",
            )}
            d={path(route.points.slice(0, 3))}
            key={route.slug}
            strokeDasharray={highlighted ? undefined : "3 4"}
            strokeWidth={highlighted ? 1.75 : 1}
          />
        );
      })}
    </>
  );
}

export function ArchitectureDiagram({ caption, label }: { caption: string; label: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [shown, setShown] = useState(false);
  const [activeSlug, setActiveSlug] = useState(architectureLayers[architectureLayers.length - 1].nodes[0].slug);

  useEffect(() => {
    if (reduceMotion || inView) setShown(true);
  }, [reduceMotion, inView]);

  const activeLayer = architectureLayers.find((layer) => layer.nodes.some((node) => node.slug === activeSlug));
  const activeSolution = getSolution(activeSlug);
  const backboneStart = iso(0.6, BACKBONE_Y, coreZ);
  const backboneEnd = iso(PLATE.w - 0.6, BACKBONE_Y, coreZ);
  const fieldSlugs = new Set(architectureLayers.find((l) => l.id === "field")?.nodes.map((n) => n.slug));

  const layerGroup = (index: number) => ({
    animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    initial: false as const,
    transition: reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.15 + index * 0.35, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <figure className="panel overflow-hidden p-0" ref={ref}>
      <svg aria-label={label} className="block h-auto w-full" role="group" viewBox="0 0 440 550">
        {architectureLayers.map((layer, index) => {
          const z = LAYER_Z[layer.id];
          return (
            <motion.g data-reveal key={layer.id} {...layerGroup(index)}>
              {layer.id === "core" && (
                <Links activeSlug={activeSlug} routes={routes.filter((r) => fieldSlugs.has(r.slug))} />
              )}
              {layer.id === "operators" && (
                <Links activeSlug={activeSlug} routes={routes.filter((r) => !fieldSlugs.has(r.slug))} />
              )}
              <Plate label={layer.label} z={z} />
              {layer.id === "core" && (
                <line
                  className="stroke-primary"
                  strokeLinecap="round"
                  strokeWidth={3}
                  x1={backboneStart[0]}
                  x2={backboneEnd[0]}
                  y1={backboneStart[1]}
                  y2={backboneEnd[1]}
                />
              )}
              {layer.nodes.map((node) => (
                <Node
                  active={activeSlug === node.slug}
                  height={layer.id === "core" ? CUBE_HEIGHT.core : CUBE_HEIGHT.default}
                  key={node.slug}
                  onSelect={setActiveSlug}
                  slug={node.slug}
                  x={node.x}
                  y={node.y}
                  z={z}
                />
              ))}
            </motion.g>
          );
        })}

        {shown && !reduceMotion && (
          <g aria-hidden className="pointer-events-none">
            {routes.map((route, index) => (
              <circle className="fill-primary" key={route.slug} r={3.5}>
                <animateMotion
                  begin={`${1.4 + index * 0.45}s`}
                  dur="2.8s"
                  keyPoints={fieldSlugs.has(route.slug) ? "0;1" : "1;0"}
                  keyTimes="0;1"
                  path={path(route.points)}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  begin={`${1.4 + index * 0.45}s`}
                  dur="2.8s"
                  repeatCount="indefinite"
                  values="0;1;1;0"
                />
              </circle>
            ))}
          </g>
        )}
      </svg>

      <div aria-live="polite" className="border-t border-[rgba(var(--hairline))] p-6 sm:p-8">
        <AnimatePresence initial={false} mode="wait">
          {activeSolution && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              initial={{ opacity: 0, y: 6 }}
              key={activeSolution.slug}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-primary">{activeLayer?.label}</p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground-strong">
                  {activeSolution.shortTitle}
                </h3>
                {activeSolution.product && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-strong">
                    {activeSolution.product}
                  </p>
                )}
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-strong">{activeSolution.summary}</p>
              <Link
                className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-strong"
                href={`/solutions/${activeSolution.slug}`}
              >
                En savoir plus
                <ArrowUpRight className="cta-arrow h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <figcaption className="border-t border-[rgba(var(--hairline))] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-strong sm:px-8">
        {caption}
      </figcaption>
    </figure>
  );
}
