"use client";

import { useSyncExternalStore } from "react";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

const SLOW_TYPES = ["slow-2g", "2g", "3g"];
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const connection = () => (navigator as Navigator & { connection?: Connection }).connection;

// True when heavy media (autoplay video, 3D scenes, frame sequences) should give way to the still image:
// data saver on, a slow connection, or a visitor who asked for less motion.
export function isLiteMode() {
  const link = connection();
  return !!link?.saveData || SLOW_TYPES.includes(link?.effectiveType ?? "") || window.matchMedia(REDUCED_MOTION).matches;
}

function subscribe(onChange: () => void) {
  const link = connection();
  const motion = window.matchMedia(REDUCED_MOTION);
  link?.addEventListener("change", onChange);
  motion.addEventListener("change", onChange);
  return () => {
    link?.removeEventListener("change", onChange);
    motion.removeEventListener("change", onChange);
  };
}

// Heavy until proven otherwise: the server render and the first client render both assume a good connection.
export function useLiteMode() {
  return useSyncExternalStore(subscribe, isLiteMode, () => false);
}
