"use client";

import { useEffect, useState } from "react";
import { isLiteMode, useLiteMode } from "@/lib/use-lite-mode";

// Phones with little memory keep the still render, as do data saver, slow links and reduced motion: the scene is a bonus, not the content.
export function useCanRender3d() {
  const lite = useLiteMode();
  const [can, setCan] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    setCan(!!document.createElement("canvas").getContext("webgl2") && !lowMemory && !isLiteMode());
  }, [lite]);
  return can;
}
