"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";
import { cn } from "@/lib/utils";

const MODEL_PATH = "/novadis/models/axis-q6010-e.glb";

function CameraModel({ autoRotate }: { autoRotate: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef<Group>(null);
  const reduceMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (reduceMotion || !autoRotate || !group.current) return;
    group.current.rotation.y += delta * 0.3;
  });

  return (
    // The wall plate is on the model's +Z side: start turned so the dome faces the viewer.
    <group ref={group} rotation={[0, Math.PI, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

type SolutionsHeroModelProps = {
  className?: string;
};

export function SolutionsHeroModel({ className }: SolutionsHeroModelProps) {
  const [dragging, setDragging] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-[rgb(var(--background-elevated))]", className)}>
      <Canvas camera={{ position: [3.2, -0.4, 3.4], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight intensity={1.5} position={[4, 6, 4]} />
          <Bounds fit clip observe margin={1.3}>
            <CameraModel autoRotate={!dragging} />
          </Bounds>
          {/* Self-hosted copy of drei's "city" preset (Poly Haven, CC0): no runtime fetch from GitHub. */}
          <Environment files="/novadis/hdri/potsdamer_platz_1k.hdr" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            makeDefault
            onEnd={() => setDragging(false)}
            onStart={() => setDragging(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
