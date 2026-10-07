"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

// Past this window after mount, an element first seen well inside the viewport
// was reached by a jump (anchor link, fast scroll, scrolling back up): reveal it
// almost instantly instead of leaving a blank area while it fades in.
const MOUNT_GRACE_MS = 600;
const JUMP_THRESHOLD = 0.75;

export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(0);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [state, setState] = useState<"hidden" | "animated" | "instant">("hidden");

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  useEffect(() => {
    if (state !== "hidden") return;
    if (reduceMotion) {
      setState("instant");
      return;
    }
    if (!inView || !ref.current) return;
    const afterMount = performance.now() - mountedAt.current > MOUNT_GRACE_MS;
    const top = ref.current.getBoundingClientRect().top;
    setState(afterMount && top < window.innerHeight * JUMP_THRESHOLD ? "instant" : "animated");
  }, [reduceMotion, inView, state]);

  return (
    <motion.div
      animate={state === "hidden" ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      className={cn(className)}
      initial={false}
      ref={ref}
      transition={
        state === "instant"
          ? { duration: reduceMotion ? 0 : 0.2 }
          : { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
