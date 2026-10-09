"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useInView, useReducedMotion } from "framer-motion";
import { Box3, type Group, Vector3 } from "three";
import { Cctv, Rotate3d } from "lucide-react";
import { ArButton } from "@/components/three/ar-button";
import { solutionsHeroModel } from "@/data/site";
import { cn } from "@/lib/utils";

const MODEL_PATH = "/novadis/models/axis-q6010-e.glb";
// The wall plate is on the model's +Z side: turned so the dome faces the viewer.
const FACING = Math.PI;

function useModelSize() {
  const { scene } = useGLTF(MODEL_PATH);
  return useMemo(() => new Box3().setFromObject(scene).getSize(new Vector3()), [scene]);
}

function CameraModel({ sway }: { sway: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!sway || !ref.current) return;
    ref.current.rotation.y = FACING + Math.sin(clock.elapsedTime * 0.45) * 0.35;
  });

  return (
    <group ref={ref} rotation={[0, FACING, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function GroundShadow() {
  const size = useModelSize();
  return (
    <ContactShadows
      blur={2.6}
      color="#0570a4"
      far={size.y}
      opacity={0.35}
      position={[0, -size.y / 2 - size.y * 0.08, 0]}
      resolution={512}
      scale={Math.max(size.x, size.z) * 2.4}
    />
  );
}

useGLTF.preload(MODEL_PATH);

type SolutionsHeroModelProps = {
  className?: string;
};

export function SolutionsHeroModel({ className }: SolutionsHeroModelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [touched, setTouched] = useState(false);
  // Idle sway only while visible and untouched; afterwards the scene renders on demand.
  const sway = onScreen && !reduceMotion && !touched;

  return (
    <div className={cn("relative isolate", className)} ref={ref}>
      <div
        aria-hidden
        className="absolute inset-[6%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.5),rgb(var(--accent)/0.14)_62%,transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute bottom-[11%] left-1/2 -z-10 h-[13%] w-[56%] -translate-x-1/2 rounded-[50%] border border-primary/15 bg-[radial-gradient(closest-side,rgb(var(--primary)/0.12),transparent)]"
      />

      <Canvas
        camera={{ position: [3.2, -0.4, 3.4], fov: 35 }}
        dpr={[1, 1.75]}
        frameloop={sway ? "always" : "demand"}
        gl={{ alpha: true, antialias: true }}
        onPointerDown={() => setTouched(true)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.65} />
          <directionalLight intensity={1.5} position={[4, 6, 4]} />
          {/* Cool rim light in the brand blue, so the white housing picks up the page palette. */}
          <directionalLight color="#81cff5" intensity={1.4} position={[-5, 2, -4]} />
          <Bounds fit clip observe margin={1.35}>
            <CameraModel sway={sway} />
          </Bounds>
          <GroundShadow />
          {/* Self-hosted copy of drei's "city" preset (Poly Haven, CC0): no runtime fetch from GitHub. */}
          <Environment files="/novadis/hdri/potsdamer_platz_1k.hdr" />
          {/* Bounded so the visitor keeps a view of the dome: no top-down flip, never the wall plate. */}
          <OrbitControls
            enableDamping={false}
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

      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground-strong shadow-soft backdrop-blur sm:left-4 sm:top-4">
        <Cctv aria-hidden className="h-4 w-4 text-primary" />
        {solutionsHeroModel.name}
      </span>

      {solutionsHeroModel.callouts.map((callout) => (
        <span
          className={cn(
            "pointer-events-none absolute hidden items-center gap-2 whitespace-nowrap text-xs font-semibold text-foreground-strong xl:inline-flex",
            callout.position === "left" ? "right-[57%] top-[44%]" : "left-[56%] top-[75%] flex-row-reverse",
          )}
          key={callout.label}
        >
          <span className="rounded-full border border-hairline bg-surface/90 px-3 py-1.5 shadow-soft backdrop-blur">
            {callout.label}
          </span>
          <span aria-hidden className="h-px w-10 bg-primary/40" />
          <span aria-hidden className="h-2 w-2 rounded-full bg-primary shadow-glow" />
        </span>
      ))}

      <span
        className={cn(
          "pointer-events-none absolute bottom-4 left-3 inline-flex items-center gap-2 text-xs font-medium text-muted-strong transition-opacity duration-500 sm:left-4",
          touched && "opacity-0",
        )}
      >
        <Rotate3d aria-hidden className="h-4 w-4 text-primary" />
        {solutionsHeroModel.hint}
      </span>

      <ArButton className="absolute bottom-4 right-4" />
    </div>
  );
}
