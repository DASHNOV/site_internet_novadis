"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Html, useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const MODEL_PATH = "/novadis/models/security-camera.glb";
const PRIMARY = new THREE.Color("#36a4d9");
const ALERT = new THREE.Color("#ef4444");
const BACKGROUND = "#0b1220";

export const STATIONS = {
  field: new THREE.Vector3(0, 0, 0),
  core: new THREE.Vector3(7, 0, -1),
  operators: new THREE.Vector3(14, 0.4, 0),
};

const FIELD_TO_CORE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.4, -0.6, 0.2),
  new THREE.Vector3(2.5, -1.1, 0.8),
  new THREE.Vector3(5, -1.1, 0),
  new THREE.Vector3(6.6, -0.9, -0.6),
]);
const CORE_TO_OPERATORS = new THREE.CatmullRomCurve3([
  new THREE.Vector3(7.4, -0.9, -0.6),
  new THREE.Vector3(9.5, -1.1, 0.4),
  new THREE.Vector3(12, -1, 0.6),
  new THREE.Vector3(13.6, -0.2, 0.4),
]);
// Between two stations the camera rides along the cable carrying the signal.
const TRANSIT: Record<number, THREE.CatmullRomCurve3> = { 1: FIELD_TO_CORE, 2: CORE_TO_OPERATORS };
const CHASE_OFFSET = new THREE.Vector3(-0.6, 1.4, 3.2);

// Keyframe 0 is the overview; keyframes 1..3 frame each station in story order.
const KEYFRAMES = [
  { position: [7, 6.5, 15], target: [7, 0.4, 0] },
  { position: [2.4, 1.3, 4.4], target: [0, 0.2, 0] },
  { position: [9.6, 2, 4.4], target: [7, 0.6, -1] },
  { position: [12.2, 1.8, 6.2], target: [14, 1.2, 0] },
].map((k) => ({ position: new THREE.Vector3(...k.position), target: new THREE.Vector3(...k.target) }));

// Holds the camera on each keyframe for part of the scroll, so text can be read.
function keyframeAt(progress: number) {
  const t = THREE.MathUtils.clamp(progress, 0, 1) * (KEYFRAMES.length - 1);
  const index = Math.min(Math.floor(t), KEYFRAMES.length - 2);
  const local = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((t - index - 0.2) / 0.6, 0, 1), 0, 1);
  return { index, from: KEYFRAMES[index], to: KEYFRAMES[index + 1], k: local };
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const desired = useRef({ position: new THREE.Vector3(), target: new THREE.Vector3() });
  const chase = useRef({ point: new THREE.Vector3(), position: new THREE.Vector3() });

  useFrame((_, delta) => {
    const { index, from, to, k } = keyframeAt(progress.get());
    desired.current.position.lerpVectors(from.position, to.position, k);
    desired.current.target.lerpVectors(from.target, to.target, k);
    const curve = TRANSIT[index];
    if (curve) {
      const pull = Math.sin(Math.PI * k);
      curve.getPointAt(k, chase.current.point);
      chase.current.position.copy(chase.current.point).add(CHASE_OFFSET);
      desired.current.target.lerp(chase.current.point, pull);
      desired.current.position.lerp(chase.current.position, pull);
    }
    // Damping smooths out wheel steps without lagging behind the scroll.
    const ease = 1 - Math.exp(-delta * 6);
    camera.position.lerp(desired.current.position, ease);
    target.current.lerp(desired.current.target, ease);
    camera.lookAt(target.current);
  });
  return null;
}

function SecurityCamera() {
  const { scene } = useGLTF(MODEL_PATH);
  // The hero on the same page renders this GLB too: a scene object can only live in one canvas.
  const model = useMemo(() => scene.clone(true), [scene]);
  const scale = useMemo(() => {
    const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
    return 2.2 / Math.max(size.x, size.y, size.z);
  }, [model]);

  return (
    <group position={STATIONS.field}>
      <group scale={scale}>
        <Center>
          <primitive object={model} />
        </Center>
      </group>
    </group>
  );
}

function ServerRack({ active }: { active: boolean }) {
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);

  useFrame(({ clock }) => {
    leds.current.forEach((material, i) => {
      if (!material) return;
      const blink = Math.sin(clock.elapsedTime * (2 + (i % 3)) + i) > 0.2 ? 1 : 0.25;
      material.emissiveIntensity = (active ? 2.4 : 1.2) * blink;
    });
  });

  return (
    <group position={STATIONS.core}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 2.6, 1]} />
        <meshStandardMaterial color="#1a2333" metalness={0.7} roughness={0.35} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[0, -0.85 + i * 0.26, 0.51]}>
          <boxGeometry args={[0.95, 0.04, 0.01]} />
          <meshStandardMaterial
            color={PRIMARY}
            emissive={PRIMARY}
            ref={(material) => {
              if (material) leds.current[i] = material;
            }}
          />
        </mesh>
      ))}
    </group>
  );
}

function VideoWall({ alarm }: { alarm: boolean }) {
  const tiles = useRef<THREE.MeshStandardMaterial[]>([]);
  const ALARM_TILE = 4;

  useFrame(({ clock }) => {
    tiles.current.forEach((material, i) => {
      if (!material) return;
      if (i === ALARM_TILE && alarm) {
        material.emissive.copy(ALERT);
        material.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 8) * 0.8;
      } else {
        material.emissive.copy(PRIMARY);
        material.emissiveIntensity = 0.35 + 0.15 * Math.sin(clock.elapsedTime * 0.8 + i * 1.7);
      }
    });
  });

  return (
    <group position={STATIONS.operators}>
      {Array.from({ length: 6 }, (_, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <mesh key={i} position={[(col - 1) * 1.72, 1.9 - row * 0.98, -0.6]}>
            <planeGeometry args={[1.64, 0.9]} />
            <meshStandardMaterial
              color="#0d1626"
              ref={(material) => {
                if (material) tiles.current[i] = material;
              }}
            />
          </mesh>
        );
      })}
      <mesh position={[0, -0.7, 0.9]}>
        <boxGeometry args={[4.4, 0.08, 1.1]} />
        <meshStandardMaterial color="#0f1a2b" envMapIntensity={0.15} metalness={0.2} roughness={0.85} />
      </mesh>
    </group>
  );
}

function SignalPath({ curve, active }: { curve: THREE.CatmullRomCurve3; active: boolean }) {
  const pulses = useRef<THREE.Mesh[]>([]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 120, 0.025, 8, false), [curve]);

  useFrame(({ clock }) => {
    pulses.current.forEach((pulse, i) => {
      if (!pulse) return;
      const t = (clock.elapsedTime * (active ? 0.35 : 0.15) + i / pulses.current.length) % 1;
      pulse.position.copy(curve.getPointAt(t));
    });
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshStandardMaterial color={PRIMARY} emissive={PRIMARY} emissiveIntensity={active ? 1.6 : 0.5} transparent opacity={0.85} />
      </mesh>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            if (mesh) pulses.current[i] = mesh;
          }}
        >
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color="#bfe7fb" />
        </mesh>
      ))}
    </group>
  );
}

function Starfield() {
  const geometry = useMemo(() => {
    const points = new Float32Array(600 * 3);
    for (let i = 0; i < points.length; i += 3) {
      points[i] = (Math.random() - 0.3) * 50;
      points[i + 1] = Math.random() * 18 - 2;
      points[i + 2] = -Math.random() * 30 - 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, []);
  return (
    <points geometry={geometry}>
      <pointsMaterial color="#81cff5" size={0.05} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

function Hotspot({ position, label, sublabel, visible }: { position: THREE.Vector3; label: string; sublabel?: string; visible: boolean }) {
  return (
    <Html position={position} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
      <div
        className="flex items-center gap-3 transition-all duration-500"
        style={{ opacity: visible ? 1 : 0, transform: `translate(-20px, -20px) scale(${visible ? 1 : 0.9})` }}
      >
        <span className="h-10 w-10 flex-none rounded-full border border-white/80 shadow-[0_0_24px_rgba(54,164,217,0.6)]" />
        <span className="hidden h-px w-10 bg-white/60 sm:block" />
        <span className="hidden w-[220px] font-mono text-[11px] uppercase leading-5 tracking-[0.2em] text-white sm:block">
          {label}
          {sublabel && <span className="mt-1 block text-[10px] text-white/60">{sublabel}</span>}
        </span>
      </div>
    </Html>
  );
}

export type HotspotLabel = { label: string; sublabel?: string };

type AlarmJourneySceneProps = {
  progress: MotionValue<number>;
  activeStep: number;
  hotspots: [HotspotLabel, HotspotLabel, HotspotLabel];
};

export function AlarmJourneyScene({ progress, activeStep, hotspots }: AlarmJourneySceneProps) {
  return (
    <Canvas camera={{ fov: 38, position: KEYFRAMES[0].position.toArray() }} dpr={[1, 1.6]} gl={{ antialias: true }}>
      <color args={[BACKGROUND]} attach="background" />
      <fog args={[BACKGROUND, 10, 34]} attach="fog" />
      <ambientLight intensity={0.35} />
      <directionalLight intensity={1.2} position={[6, 8, 6]} />
      <pointLight color={PRIMARY} intensity={18} distance={8} position={[7, 1.5, 1.5]} />
      <gridHelper args={[60, 60, "#1f3b57", "#132235"]} position={[7, -1.4, 0]} />
      <Starfield />
      <Suspense fallback={null}>
        <SecurityCamera />
        <Environment files="/novadis/hdri/potsdamer_platz_1k.hdr" />
      </Suspense>
      <ServerRack active={activeStep >= 2} />
      <VideoWall alarm={activeStep >= 3} />
      <SignalPath active={activeStep >= 1} curve={FIELD_TO_CORE} />
      <SignalPath active={activeStep >= 2} curve={CORE_TO_OPERATORS} />
      <Hotspot position={new THREE.Vector3(0.3, 0.6, 0.4)} visible={activeStep === 1} {...hotspots[0]} />
      <Hotspot position={new THREE.Vector3(7.6, 1.2, -0.5)} visible={activeStep === 2} {...hotspots[1]} />
      <Hotspot position={new THREE.Vector3(14, 1.32, -0.55)} visible={activeStep === 3} {...hotspots[2]} />
      <CameraRig progress={progress} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);
