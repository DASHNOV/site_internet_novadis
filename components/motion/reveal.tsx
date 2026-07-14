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

export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  return (
    <motion.div
      animate={reduceMotion || shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      ref={ref}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
