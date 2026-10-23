"use client";

import { useEffect, useState } from "react";

// Phones on data saver or with little memory keep the still render: the scene is a bonus, not the content.
export function useCanRender3d() {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const webgl = !!document.createElement("canvas").getContext("webgl2");
    setCan(webgl && !lowMemory && !nav.connection?.saveData);
  }, []);
  return can;
}
