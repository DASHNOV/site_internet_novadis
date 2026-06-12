"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: "10%", y: "22%", size: 9 },
  { x: "24%", y: "62%", size: 8 },
  { x: "37%", y: "16%", size: 11 },
  { x: "48%", y: "52%", size: 9 },
  { x: "60%", y: "20%", size: 8 },
  { x: "70%", y: "70%", size: 11 },
  { x: "84%", y: "32%", size: 9 },
  { x: "92%", y: "62%", size: 7 },
];

const lines = [
  { x1: "10%", y1: "22%", x2: "24%", y2: "62%" },
  { x1: "10%", y1: "22%", x2: "37%", y2: "16%" },
  { x1: "24%", y1: "62%", x2: "48%", y2: "52%" },
  { x1: "37%", y1: "16%", x2: "48%", y2: "52%" },
  { x1: "37%", y1: "16%", x2: "60%", y2: "20%" },
  { x1: "48%", y1: "52%", x2: "70%", y2: "70%" },
  { x1: "60%", y1: "20%", x2: "84%", y2: "32%" },
  { x1: "70%", y1: "70%", x2: "92%", y2: "62%" },
  { x1: "84%", y1: "32%", x2: "92%", y2: "62%" },
];

export function HeroGraph() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_0%,rgba(54,164,217,0.20),transparent_60%),radial-gradient(800px_460px_at_88%_10%,rgba(90,188,235,0.14),transparent_60%)]" />

      <motion.div
        animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35] }}
        className="absolute inset-x-[16%] top-[12%] h-[36%] rounded-full blur-3xl"
        style={{ background: "rgba(129,207,245,0.10)" }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="graph-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(129,207,245,0.20)" />
            <stop offset="50%" stopColor="rgba(129,207,245,0.65)" />
            <stop offset="100%" stopColor="rgba(90,188,235,0.25)" />
          </linearGradient>
          <radialGradient id="graph-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(175,226,251,0.95)" />
            <stop offset="60%" stopColor="rgba(54,164,217,0.55)" />
            <stop offset="100%" stopColor="rgba(54,164,217,0)" />
          </radialGradient>
        </defs>

        {lines.map((line, index) => (
          <motion.line
            animate={reduce ? undefined : { opacity: [0.18, 0.78, 0.18] }}
            key={`${line.x1}-${line.x2}-${index}`}
            stroke="url(#graph-line)"
            strokeWidth="1"
            transition={{ delay: index * 0.18, duration: 4.6, repeat: Number.POSITIVE_INFINITY }}
            x1={line.x1}
            x2={line.x2}
            y1={line.y1}
            y2={line.y2}
          />
        ))}

        {nodes.map((node, index) => (
          <motion.g
            animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.45, 1, 0.45] }}
            key={`${node.x}-${node.y}`}
            style={{ transformOrigin: `${node.x} ${node.y}` }}
            transition={{ delay: index * 0.18, duration: 3.8, repeat: Number.POSITIVE_INFINITY }}
          >
            <circle cx={node.x} cy={node.y} fill="url(#graph-node)" r={node.size + 18} />
            <circle cx={node.x} cy={node.y} fill="rgba(225, 240, 255, 0.96)" r={node.size / 2.4} />
          </motion.g>
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
