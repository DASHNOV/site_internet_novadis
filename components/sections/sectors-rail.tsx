"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, transform, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils";
import { industries } from "@/data/site";

// From tablet up, vertical scroll drives the card rail sideways; the section is exactly as tall as
// the rail's overflow, so the pin releases on the last card. Phones keep a native swipe rail.
export function SectorsRail({ heading }: { heading: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // Function form: a plain range would be offloaded to a native scroll timeline that ignores clamping.
  const x = useTransform(scrollYProgress, (v) => transform(v, [0, 1], [0, -distance]));

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => setDistance(Math.max(0, rail.scrollWidth - rail.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  const pinned = wide && !reduceMotion;

  return (
    <section
      className="section-soft relative"
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn(pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-10 pt-24" : "section-y")}>
        <div className="shell-wide">
          {heading}
          <motion.ul
            className={cn(
              "mt-12 flex gap-5",
              !pinned && "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
            ref={railRef}
            style={pinned ? { x } : undefined}
          >
            {industries.map((item) => (
              <li className="group w-[82%] flex-none snap-start sm:w-[46%] lg:w-[31%] xl:w-[27%]" key={item.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors duration-150 group-hover:border-primary">
                  <div className="aspect-[4/3] overflow-hidden border-b border-hairline">
                    <img alt={item.title} className="h-full w-full object-cover" loading="lazy" src={item.media} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2.5">
                      <IconBadge icon={item.icon} />
                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground-strong">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-strong">{item.summary}</p>
                  </div>
                </article>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
