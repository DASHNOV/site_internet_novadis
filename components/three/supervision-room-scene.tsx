"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { supervisionRoom } from "@/data/site";
import { cn } from "@/lib/utils";

// Blender camera (Cam_Supervision) converted to glTF axes: x, z, -y.
const OVERVIEW = { position: new THREE.Vector3(2.1, 2.1, 5.1), target: new THREE.Vector3(-0.2, 1.15, 0.2) };
// Distance kept between the camera and a screen it focuses on.
const FOCUS_DISTANCE = 3.2;

type Point = { slug: string; label: string; screen: number };

function useScreens(scene: THREE.Object3D, feed: THREE.Texture) {
  return useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const mesh = scene.getObjectByName(`Screen_${i}`) as THREE.Mesh | undefined;
        if (!mesh) return null;
        // Own material per screen so one can light up while the others dim.
        const material = (mesh.material as THREE.MeshStandardMaterial).clone();
        // The Blender export carries the screen image as emission; fall back to the colour map.
        material.emissiveMap = material.emissiveMap ?? material.map;
        material.emissive = new THREE.Color(material.emissiveMap ? "white" : "black");
        if (i === supervisionRoom.points[0].screen) {
          const image = feed.clone();
          image.flipY = false;
          image.colorSpace = THREE.SRGBColorSpace;
          image.repeat.set(0.42, 0.42);
          image.offset.set(0.5, 0.25);
          image.needsUpdate = true;
          material.emissiveMap = image;
          material.emissive = new THREE.Color("white");
        }
        mesh.material = material;
        const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
        return { material, center };
      }),
    [scene, feed],
  );
}

function Room({
  points,
  active,
  onSelect,
  onReady,
}: {
  points: Point[];
  active: string | null;
  onSelect: (slug: string) => void;
  onReady: () => void;
}) {
  const { scene } = useGLTF(supervisionRoom.model);
  const feed = useTexture(supervisionRoom.feed);
  const screens = useScreens(scene, feed);
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;
  const camera = useThree((state) => state.camera);
  const goal = useRef({ position: OVERVIEW.position.clone(), target: OVERVIEW.target.clone(), left: 0 });

  // Reached only once the model and feed have loaded: the still render can give way.
  useEffect(() => onReady(), [onReady]);

  // Set once here rather than as a prop, which would snap the target back on every parent render.
  useEffect(() => {
    if (!controls) return;
    controls.target.copy(OVERVIEW.target);
    controls.update();
  }, [controls]);

  useEffect(() => {
    const point = supervisionRoom.points.find((p) => p.slug === active);
    const screen = point ? screens[point.screen] : null;
    if (screen) {
      goal.current.target = screen.center.clone();
      // Slightly above the screen: the orbit limits refuse a dead-level view.
      goal.current.position = screen.center.clone().add(new THREE.Vector3(screen.center.x * 0.4, 0.5, FOCUS_DISTANCE));
    } else {
      goal.current.target = OVERVIEW.target.clone();
      goal.current.position = OVERVIEW.position.clone();
    }
    // Bounded in time so the glide never fights a visitor's drag once it has settled.
    goal.current.left = 1.6;
  }, [active, screens]);

  useFrame((_, delta) => {
    const activeScreen = points.find((p) => p.slug === active)?.screen;
    screens.forEach((screen, i) => {
      if (!screen) return;
      const target = activeScreen === undefined ? 1 : i === activeScreen ? 1.5 : 0.35;
      screen.material.emissiveIntensity = THREE.MathUtils.damp(screen.material.emissiveIntensity, target, 6, delta);
    });

    if (goal.current.left <= 0 || !controls) return;
    goal.current.left -= delta;
    const ease = 1 - Math.exp(-4 * delta);
    camera.position.lerp(goal.current.position, ease);
    controls.target.lerp(goal.current.target, ease);
    controls.update();
  });

  return (
    <>
      <primitive object={scene} />
      {points.map((point) => {
        const screen = screens[point.screen];
        if (!screen) return null;
        const on = point.slug === active;
        return (
          <Html center key={point.slug} position={[screen.center.x, screen.center.y, screen.center.z + 0.05]} zIndexRange={[20, 0]}>
            {/* Mirrors the accessible list beside the canvas: pointer shortcut only. */}
            <button
              aria-hidden
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-full border font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-150",
                on
                  ? "border-glow bg-glow px-3 py-1 text-background-dark"
                  : "h-5 w-5 justify-center border-glow/60 bg-background-dark/70 hover:border-glow",
              )}
              onClick={() => onSelect(point.slug)}
              tabIndex={-1}
              title={point.label}
              type="button"
            >
              {on ? point.label : <span className="h-1.5 w-1.5 animate-status rounded-full bg-glow" />}
            </button>
          </Html>
        );
      })}
    </>
  );
}

useGLTF.preload(supervisionRoom.model);

// On touch screens a drag must scroll the page: rotation stays a mouse affordance, the list drives the view.
function useCoarsePointer() {
  return useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches, []);
}

export default function SupervisionRoomScene({
  points,
  active,
  onSelect,
  onReady,
}: {
  points: Point[];
  active: string | null;
  onSelect: (slug: string) => void;
  onReady: () => void;
}) {
  const coarse = useCoarsePointer();
  return (
    <Canvas
      camera={{ fov: 40, position: OVERVIEW.position.toArray(), near: 0.1, far: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: coarse ? "pan-y" : "none" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.setClearColor("#0b1220");
      }}
    >
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#81cff5", "#0b1220", 0.6]} />
      <directionalLight color="#cfe7ff" intensity={0.8} position={[1.5, 3.2, 3]} />
      <pointLight color="#36a4d9" distance={5} intensity={4} position={[0, 1.2, 2.6]} />
      <Suspense fallback={null}>
        <Room active={active} onReady={onReady} onSelect={onSelect} points={points} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableRotate={!coarse}
        enableZoom={false}
        makeDefault
        maxAzimuthAngle={0.65}
        maxPolarAngle={1.45}
        minAzimuthAngle={-0.45}
        minPolarAngle={0.9}
      />
    </Canvas>
  );
}
