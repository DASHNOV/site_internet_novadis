"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { BEATS } from "@/components/three/badge-door-beats";

const MODEL_PATH = "/novadis/models/badge-door.glb";
const BACKGROUND = "#0b1220";
const IDLE = new THREE.Color("#36a4d9");
const GRANTED = new THREE.Color("#22c55e");
// Positions in the model (metres, Y-up): reader face on the wall, badge start in front of it.
const READER = new THREE.Vector3(0.78, 1.2, 0.13);
const BADGE_START = new THREE.Vector3(1.25, 0.95, 0.75);
const BADGE_AT_READER = new THREE.Vector3(0.78, 1.2, 0.16);
const DOOR_OPEN = THREE.MathUtils.degToRad(82);


const ease = (p: number, [a, b]: readonly [number, number]) => THREE.MathUtils.smoothstep(p, a, b);

function DoorModel({ progress }: { progress: MotionValue<number> }) {
  const { scene } = useGLTF(MODEL_PATH);
  const parts = useMemo(() => {
    const leaf = scene.getObjectByName("DoorLeaf")!;
    const badge = scene.getObjectByName("Badge")!;
    const led = scene.getObjectByName("ReaderLED") as THREE.Mesh;
    return { leaf, badge, ledMaterial: led.material as THREE.MeshStandardMaterial };
  }, [scene]);
  const ripple = useRef<THREE.Mesh>(null);
  const corridor = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const p = progress.get();
    const t = clock.elapsedTime;

    const k = ease(p, BEATS.badgeIn);
    parts.badge.position.lerpVectors(BADGE_START, BADGE_AT_READER, k);
    parts.badge.rotation.set(0, (1 - k) * -0.6, (1 - k) * 0.25);

    const granted = p >= BEATS.granted;
    parts.ledMaterial.emissive.copy(granted ? GRANTED : IDLE);
    parts.ledMaterial.emissiveIntensity = granted ? 6 : 2.5 + 1.5 * Math.sin(t * 3);

    if (ripple.current) {
      const r = THREE.MathUtils.clamp((p - BEATS.granted) / 0.12, 0, 1);
      ripple.current.visible = r > 0 && r < 1;
      ripple.current.scale.setScalar(0.05 + r * 0.45);
      (ripple.current.material as THREE.MeshBasicMaterial).opacity = (1 - r) * 0.9;
    }

    const open = ease(p, BEATS.door);
    parts.leaf.rotation.y = open * DOOR_OPEN;
    if (corridor.current) corridor.current.intensity = 2 + open * 22;
  });

  return (
    <group>
      <primitive object={scene} />
      <mesh position={READER} ref={ripple}>
        <ringGeometry args={[0.9, 1, 48]} />
        <meshBasicMaterial blending={THREE.AdditiveBlending} color={GRANTED} depthWrite={false} toneMapped={false} transparent />
      </mesh>
      {/* Lit corridor behind the wall, revealed as the door opens. */}
      {/* Only as wide as the doorway: seen past the wall's edge it would read as a stray panel. */}
      <mesh position={[0, 1.2, -3.2]}>
        <planeGeometry args={[1.6, 2.4]} />
        <meshBasicMaterial color="#cfe6ff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.001, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.0, 3.2]} />
        <meshStandardMaterial color="#1b2638" roughness={0.6} />
      </mesh>
      <pointLight color="#cfe6ff" decay={1.6} distance={7} position={[0, 1.6, -1.2]} ref={corridor} />
    </group>
  );
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const { camera, pointer } = useThree();
  const v = useMemo(
    () => ({
      startPos: new THREE.Vector3(2.4, 1.5, 3.9),
      startTarget: new THREE.Vector3(0.2, 1.15, 0),
      endPos: new THREE.Vector3(0.15, 1.45, 1.55),
      endTarget: new THREE.Vector3(-0.15, 1.25, -2),
      pos: new THREE.Vector3(),
      target: new THREE.Vector3(),
      look: new THREE.Vector3(0.2, 1.15, 0),
    }),
    [],
  );
  useFrame((_, delta) => {
    const k = ease(progress.get(), BEATS.dolly);
    v.pos.lerpVectors(v.startPos, v.endPos, k);
    v.pos.x += pointer.x * 0.08;
    v.pos.y += pointer.y * 0.05;
    v.target.lerpVectors(v.startTarget, v.endTarget, k);
    const follow = 1 - Math.exp(-delta * 5);
    camera.position.lerp(v.pos, follow);
    v.look.lerp(v.target, follow);
    camera.lookAt(v.look);
  });
  return null;
}

export function BadgeDoorScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas camera={{ fov: 40, position: [2.4, 1.5, 3.9] }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <color args={[BACKGROUND]} attach="background" />
      <fog args={[BACKGROUND, 4, 11]} attach="fog" />
      <ambientLight intensity={0.35} />
      <spotLight angle={0.6} color="#dbe8ff" decay={1.4} distance={9} intensity={28} penumbra={0.7} position={[1.4, 3.4, 2.2]} />
      <mesh position={[0, 0, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#0e1726" metalness={0.2} roughness={0.55} />
      </mesh>
      <Suspense fallback={null}>
        <DoorModel progress={progress} />
        <Environment files="/novadis/hdri/potsdamer_platz_1k.hdr" environmentIntensity={0.35} />
      </Suspense>
      <CameraRig progress={progress} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);
