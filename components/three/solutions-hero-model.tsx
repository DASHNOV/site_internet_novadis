"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { cn } from "@/lib/utils";

const MODEL_PATH = "/novadis/models/axis-q6010-e.glb";

function CameraModel() {
  const { scene } = useGLTF(MODEL_PATH);

  return (
    // The wall plate is on the model's +Z side: turned so the dome faces the viewer.
    <group rotation={[0, Math.PI, 0]}>
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
  return (
    <div className={cn("relative overflow-hidden bg-[rgb(var(--background-elevated))]", className)}>
      <Canvas camera={{ position: [3.2, -0.4, 3.4], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight intensity={1.5} position={[4, 6, 4]} />
          <Bounds fit clip observe margin={1.3}>
            <CameraModel />
          </Bounds>
          {/* Self-hosted copy of drei's "city" preset (Poly Haven, CC0): no runtime fetch from GitHub. */}
          <Environment files="/novadis/hdri/potsdamer_platz_1k.hdr" />
          {/* Bounded so the visitor keeps a view of the dome: no top-down flip, never the wall plate. */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            makeDefault
            maxAzimuthAngle={1.95}
            maxPolarAngle={Math.PI * 0.62}
            minAzimuthAngle={-0.45}
            minPolarAngle={Math.PI * 0.38}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
