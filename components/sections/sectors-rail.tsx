"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, transform, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils";
import { industries } from "@/data/site";

// Pinned section: vertical scroll drives the card rail sideways. The section is
// exactly as tall as the rail's overflow, so the pin releases on the last card.
export function SectorsRail({ heading }: { heading: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Function form: a plain range would be offloaded to a native scroll timeline that ignores clamping.
  const x = useTransform(scrollYProgress, (v) => transform(v, [0, 1], [0, -distance]));

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => setDistance(Math.max(0, rail.scrollWidth - rail.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const pinned = !reduceMotion;

  return (
    <section
      className="section-soft relative"
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn("overflow-hidden", pinned ? "sticky top-0 flex h-screen flex-col justify-center pb-10 pt-24" : "section-y")}>
        <div className="shell-wide">
          {heading}
          <motion.ul
            className={cn(
              "-mx-2 mt-10 flex gap-6 px-2 pb-6 pt-2",
              !pinned && "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
            ref={railRef}
            style={pinned ? { x } : undefined}
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
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
