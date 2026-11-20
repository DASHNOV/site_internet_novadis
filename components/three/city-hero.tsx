"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { isLiteMode, useLiteMode } from "@/lib/use-lite-mode";

const CityHeroScene = dynamic(() => import("@/components/three/city-hero-scene").then((m) => m.CityHeroScene), {
  ssr: false,
});

const INTRO_KEY = "novadis:city-intro-played";

// The opening flight plays once per visit; storage can be unavailable (private mode, blocked).
function introAlreadyPlayed() {
  try {
    const played = sessionStorage.getItem(INTRO_KEY) === "1";
    sessionStorage.setItem(INTRO_KEY, "1");
    return played;
  } catch {
    return false;
  }
}

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// Night-city backdrop for the home hero. `children` (the reference photo) stays as the fallback:
// shown while the scene loads, and kept for no-WebGL or reduced-motion visitors.
export function CityHero({ children }: { children: React.ReactNode }) {
  const lite = useLiteMode();
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  // Read once: effects run twice in development, and the second read would see our own flag.
  const introPlayed = useRef<boolean | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const handleReady = useCallback(() => setReady(true), []);
  const onScreen = useInView(ref);

  useEffect(() => {
    const on = !isLiteMode() && webglAvailable();
    setEnabled(on);
    if (on) {
      introPlayed.current ??= introAlreadyPlayed();
      setSkipIntro(introPlayed.current);
    }
    setCompact(window.matchMedia("(max-width: 767px)").matches);
  }, [lite]);

  return (
    <div className="absolute inset-0" ref={ref}>
      <div className={cn("absolute inset-0 transition-opacity duration-1000", ready && "opacity-0")}>{children}</div>
      {enabled && (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <CityHeroScene compact={compact} onReady={handleReady} active={onScreen} progress={scrollYProgress} skipIntro={skipIntro} />
        </div>
      )}
    </div>
  );
}
