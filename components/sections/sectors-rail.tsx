"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/site";

export function SectorsRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setEdges({
      start: rail.scrollLeft <= 4,
      end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  // Targets the neighbouring card's exact offset: a relative smooth scrollBy
  // fights scroll-snap and can land back on the current card.
  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const offsets = Array.from(rail.children, (card) => (card as HTMLElement).offsetLeft - rail.offsetLeft);
    const current = offsets.reduce(
      (best, offset, index) => (Math.abs(offset - rail.scrollLeft) < Math.abs(offsets[best] - rail.scrollLeft) ? index : best),
      0,
    );
    const target = offsets[Math.min(Math.max(current + direction, 0), offsets.length - 1)];
    rail.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button
          aria-label="Secteurs précédents"
          disabled={edges.start}
          onClick={() => scrollByCard(-1)}
          size="icon"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Secteurs suivants"
          disabled={edges.end}
          onClick={() => scrollByCard(1)}
          size="icon"
          variant="outline"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <ul
        className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={updateEdges}
        ref={railRef}
      >
        {industries.map((item, index) => {
          const Icon = item.icon;
          return (
            <li className="group w-[80%] flex-none snap-start sm:w-[46%] lg:w-[31%] xl:w-[27%]" key={item.slug}>
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    src={item.media}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-black/40 backdrop-blur">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/80">
                      {`Secteur 0${index + 1}`}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-strong">{item.summary}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
