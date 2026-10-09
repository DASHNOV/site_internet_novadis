"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
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
        className="-mx-2 mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={updateEdges}
        ref={railRef}
      >
        {industries.map((item, index) => {
          const Icon = item.icon;
          return (
            <li className="group w-[82%] flex-none snap-start sm:w-[46%] lg:w-[31%] xl:w-[27%]" key={item.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface shadow-soft transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={item.media}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-strong backdrop-blur">
                    {`Secteur 0${index + 1}`}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={Icon} size="sm" />
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground-strong">{item.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-strong">{item.summary}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
