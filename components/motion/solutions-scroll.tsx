"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Blocks, Cpu, Fingerprint, Radar, ScanSearch, Video } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollSolution = {
  slug: string;
  title: string;
  summary: string;
  benefits: string[];
  product?: string;
  media: {
    kind: "image" | "video";
    src: string;
    poster?: string;
    alt: string;
  };
};

type SolutionsScrollProps = {
  solutions: ScrollSolution[];
};

const iconMap = {
  "it-infrastructure": Cpu,
  "access-control": Fingerprint,
  "intrusion-detection": Radar,
  "video-surveillance": Video,
  "ai-video-analytics": ScanSearch,
  "smart-integrations": Blocks,
} as const;

export function SolutionsScroll({ solutions }: SolutionsScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setProgress(ratio);
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    return () => {
      el.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
          Portefeuille — {solutions.length} solutions
        </span>
        <div className="relative h-px flex-1 bg-[rgba(var(--hairline-strong))]">
          <div
            className="absolute inset-y-[-1px] left-0 bg-primary transition-[width] duration-300"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Précédent"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] text-foreground transition",
              !canScrollPrev && "pointer-events-none opacity-40",
            )}
            onClick={() => scrollByCard(-1)}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Suivant"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary transition hover:bg-primary/25",
              !canScrollNext && "pointer-events-none opacity-40",
            )}
            onClick={() => scrollByCard(1)}
            type="button"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        ref={trackRef}
      >
        {solutions.map((solution, index) => {
          const Icon = iconMap[solution.slug as keyof typeof iconMap] ?? Blocks;

          return (
            <article
              className="relative flex min-h-[540px] w-[min(85vw,420px)] flex-none snap-start flex-col overflow-hidden rounded-[28px] border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card-strong))]"
              key={solution.slug}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[rgba(var(--hairline))]">
                {solution.media.kind === "video" ? (
                  <video
                    autoPlay
                    className="h-full w-full object-cover"
                    loop
                    muted
                    playsInline
                    poster={solution.media.poster}
                    src={solution.media.src}
                  />
                ) : (
                  <img
                    alt={solution.media.alt}
                    className="h-full w-full object-cover"
                    src={solution.media.src}
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(var(--background),0.05)_0%,rgba(var(--background),0.35)_55%,rgba(var(--background),0.90)_100%)]" />
                <span className="absolute left-5 top-5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-foreground-strong drop-shadow-sm">
                  {`0${index + 1}`}
                </span>
                {solution.product && (
                  <span className="absolute right-5 top-5 rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--background),0.75)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                    {solution.product}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">Solution</p>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground-strong">
                  {solution.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-strong">{solution.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {solution.benefits.slice(0, 3).map((benefit) => (
                    <span
                      className="rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] px-3 py-1.5 text-xs text-muted-strong"
                      key={benefit}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                <Link
                  className="group mt-8 inline-flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/20"
                  href={`/solutions/${solution.slug}`}
                >
                  Explorer cette solution
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
