"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { challenges, getSolution, supervisionRoom } from "@/data/site";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("./supervision-room-scene"), { ssr: false });

// Phones on data saver or with little memory keep the still render: the scene is a bonus, not the content.
function useCanRender3d() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const webgl = !!document.createElement("canvas").getContext("webgl2");
    setCan(webgl && !lowMemory && !nav.connection?.saveData);
  }, []);
  return can;
}

export function SupervisionRoom() {
  const challenge = challenges.find((c) => c.slug === supervisionRoom.challengeSlug);
  const points = supervisionRoom.points.flatMap((point) => {
    const solution = getSolution(point.slug);
    return solution ? [{ ...point, label: solution.shortTitle, solution }] : [];
  });
  const [active, setActive] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const near = useInView(stageRef, { once: true, margin: "400px 0px" });
  const reduceMotion = useReducedMotion();
  const canRender = useCanRender3d();
  const live = near && canRender && !reduceMotion;
  const current = points.find((p) => p.slug === active);
  const markReady = useCallback(() => setReady(true), []);

  return (
    <section className="section-dark section-y">
      <div className="shell-wide">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <h2 className="section-title text-balance text-[clamp(2rem,3.4vw,3rem)]">{challenge?.title}</h2>
          <p className="max-w-xl text-base leading-7 text-muted-strong sm:text-lg">{challenge?.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <figure className="console overflow-hidden">
            <div className="relative aspect-[16/10]" ref={stageRef}>
              <img
                alt="Salle de supervision modélisée : mur de six écrans, pupitre à trois moniteurs, deux postes opérateurs"
                className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", ready && "opacity-0")}
                loading="lazy"
                src={supervisionRoom.poster}
              />
              {live && (
                <div className={cn("absolute inset-0 transition-opacity duration-500", ready ? "opacity-100" : "opacity-0")}>
                  <Scene active={active} onReady={markReady} onSelect={setActive} points={points} />
                </div>
              )}
            </div>
            <figcaption className="console-head border-b-0 border-t">
              <span>{supervisionRoom.caption}</span>
              {ready && <span className="hidden text-glow [@media(pointer:fine)]:sm:inline">Faites glisser pour pivoter</span>}
            </figcaption>
          </figure>

          <div className="console flex flex-col">
            <div className="console-head">
              <span>Poste opérateur unique</span>
              <span className="flex flex-none items-center gap-2 whitespace-nowrap text-success">
                <span aria-hidden className="h-1.5 w-1.5 animate-status rounded-full bg-success" />
                {points.length} systèmes
              </span>
            </div>
            <ul className="border-b border-night-line">
              {points.map((point) => {
                const on = point.slug === active;
                return (
                  <li className="border-b border-night-line last:border-b-0" key={point.slug}>
                    <button
                      aria-pressed={on}
                      className={cn(
                        "flex min-h-12 w-full items-center justify-between gap-4 px-5 py-3 text-left text-sm font-semibold transition-colors duration-150",
                        on ? "bg-white/[0.06] text-glow" : "text-white hover:bg-white/[0.03]",
                      )}
                      onClick={() => setActive(on ? null : point.slug)}
                      type="button"
                    >
                      {point.label}
                      <span className="data-label">{on ? "Affiché" : "Afficher"}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div aria-live="polite" className="flex flex-1 flex-col p-5">
              {current ? (
                <>
                  <h3 className="font-display text-xl font-bold text-white">{current.solution.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-strong">{current.solution.summary}</p>
                  <Link
                    className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-glow"
                    href={`/solutions/${current.slug}`}
                  >
                    En savoir plus
                    <ArrowUpRight aria-hidden className="cta-arrow h-4 w-4" />
                  </Link>
                </>
              ) : (
                <p className="text-sm leading-7 text-muted-strong">{getSolution(supervisionRoom.solutionSlug)?.summary}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
