"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const NUMBER = /\d[\d   ]*(?:,\d+)?/;

function parse(value: string) {
  const match = value.match(NUMBER);
  if (!match || match.index === undefined) return null;
  const raw = match[0].trimEnd();
  const [integer, decimals = ""] = raw.split(",");
  return {
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + raw.length),
    target: Number(`${integer.replace(/\D/g, "")}.${decimals || "0"}`),
    decimals: decimals.length,
    separator: integer.match(/[   ]/)?.[0] ?? " ",
  };
}

// Keeps the source formatting ("12 000", "2,3") so the final frame matches the data exactly.
function format(n: number, decimals: number, separator: string) {
  const [integer, fraction] = n.toFixed(decimals).split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return fraction ? `${grouped},${fraction}` : grouped;
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    const parsed = parse(value);
    if (!inView || reduceMotion || !parsed || !ref.current) return;
    const node = ref.current;
    const { prefix, suffix, target, decimals, separator } = parsed;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        node.textContent = `${prefix}${format(n, decimals, separator)}${suffix}`;
      },
      onComplete: () => {
        node.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span className="tabular-nums" ref={ref}>
      {value}
    </span>
  );
}
