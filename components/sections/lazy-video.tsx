"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useLiteMode } from "@/lib/use-lite-mode";

type LazyVideoProps = {
  src: string;
  alt: string;
  poster?: string;
  priority?: boolean;
};

// Looping muted video that only downloads once it is close to the screen, and never on data saver,
// a slow connection or reduced motion: those visitors keep the poster.
export function LazyVideo({ src, alt, poster, priority }: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "200px 0px" });
  const lite = useLiteMode();

  return (
    <div className="relative h-full w-full" ref={ref}>
      {poster && <img alt={alt} className="h-full w-full object-cover" loading={priority ? undefined : "lazy"} src={poster} />}
      {near && !lite && (
        <video autoPlay className="absolute inset-0 h-full w-full object-cover" loop muted playsInline poster={poster} preload="metadata" src={src} />
      )}
    </div>
  );
}
