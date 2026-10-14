"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, PerformanceMonitor, useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

const CAMERA_PATH = "/novadis/models/axis-p1465-le.glb";
const SETS_PATH = "/novadis/models/alarm-journey-sets.glb";
const RACK_PATH = "/novadis/models/server-rack.glb";
const ROOM_PATH = "/novadis/models/control-room.glb";
const FLOOR = -1.4;
// Bottom-centre panel of the 3x2 wall, the one showing the gate camera.
const ALARM_SCREEN = 4;
// Centre of that panel in the control-room model (metres, Y-up), just in front of the glass.
const ALARM_SCREEN_CENTER: [number, number, number] = [0, 1.24, 0.012];
const ALARM_SCREEN_SIZE: [number, number] = [1.19, 0.66];
const PRIMARY = new THREE.Color("#36a4d9");
const ALERT = new THREE.Color("#ef4444");
const WHITE = new THREE.Color("#ffffff");
const BACKGROUND = "#0b1220";

// Crops of the site frame shown on the wall, as [left, top, width] fractions of the image.
const FEEDS: Record<number, [number, number, number]> = {
  0: [0.3, 0.3, 0.27],
  2: [0.72, 0.45, 0.27],
};
// Gate and forecourt in the gate camera film, as [left, top, right, bottom] fractions of the frame.
const DETECTION_BOX: [number, number, number, number] = [0.24, 0.42, 0.66, 0.86];
// The gate starts sliding about 2 s into the film: the detection frame appears then.
const DETECTION_AT = 2.2;

// The bullet reads at a diorama scale, not at its real 37 cm.
const CAMERA_SCALE = 2.5;
// From the model's origin (wall plate centre): plate back and lens front along +Z, lens height.
const PLATE_BACK = 0.226;
const LENS = new THREE.Vector3(0, 0.066, 0.358);

export const STATIONS = {
  field: new THREE.Vector3(0, 0, 0),
  core: new THREE.Vector3(7, 0, -1),
  operators: new THREE.Vector3(14, 0, 0),
};

const F = FLOOR + 0.045;
const FIELD_TO_CORE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-0.95, F, 0.05),
  new THREE.Vector3(-0.7, F, 1.3),
  new THREE.Vector3(1.6, F, 2.1),
  new THREE.Vector3(4.2, F, 1.0),
  new THREE.Vector3(6.1, F, -0.75),
]);
const CORE_TO_OPERATORS = new THREE.CatmullRomCurve3([
  new THREE.Vector3(7.9, F, -0.75),
  new THREE.Vector3(9.4, F, 0.6),
  new THREE.Vector3(11.4, F, 1.1),
  new THREE.Vector3(12.4, F, 1.15),
  new THREE.Vector3(13.4, F, 0.9),
]);
// Between two stations the camera rides along the cable carrying the signal.
const TRANSIT: Record<number, THREE.CatmullRomCurve3> = { 1: FIELD_TO_CORE, 2: CORE_TO_OPERATORS };
const CHASE_OFFSET = new THREE.Vector3(-0.6, 1.6, 3.4);

// Keyframe 0 is the overview; keyframes 1..3 frame each station in story order.
// Subjects sit right of centre: the step text covers the left of the screen.
const KEYFRAMES = [
  { position: [6.2, 9.5, 21.5], target: [6.2, -1.6, 0] },
  { position: [-3.4, 2.1, 9.8], target: [-0.4, 0, 0] },
  { position: [9.6, 1.5, 5.6], target: [6.3, -0.1, -1.1] },
  { position: [12.4, 1.2, 6.4], target: [13.1, -0.1, 0] },
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

// One diorama from the sets file, with its own copy of the plinth glow so each station lights up alone.
function useSet(name: "Field" | "Core" | "Operators") {
  const { nodes } = useGLTF(SETS_PATH);
  return useMemo(() => {
    const set = nodes[name].clone(true);
    let glow: THREE.MeshStandardMaterial | null = null;
    set.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const swapped = materials.map((material) => {
        if (material.name !== "Edge_Glow") return material;
        glow ??= (material as THREE.MeshStandardMaterial).clone();
        return glow;
      });
      mesh.material = Array.isArray(mesh.material) ? swapped : swapped[0];
    });
    return { set, glow: glow as THREE.MeshStandardMaterial | null };
  }, [nodes, name]);
}

function useGlow(glow: THREE.MeshStandardMaterial | null, lit: boolean) {
  useFrame((_, delta) => {
    if (!glow) return;
    const goal = lit ? 4 : 0.9;
    glow.emissiveIntensity += (goal - glow.emissiveIntensity) * (1 - Math.exp(-delta * 4));
  });
}

// Field: façade, sliding gate and the AXIS P1465-LE watching it. On detection the gate opens and the view cone turns red.
function FieldStation({ lit, alarm }: { lit: boolean; alarm: boolean }) {
  const { set, glow } = useSet("Field");
  const { scene } = useGLTF(CAMERA_PATH);
  // The hero on the same page renders this GLB too: a scene object can only live in one canvas.
  const camera = useMemo(() => scene.clone(true), [scene]);
  const gate = useMemo(() => {
    const leaf = set.getObjectByName("Gate_Leaf");
    return leaf ? { leaf, closedZ: leaf.position.z } : null;
  }, [set]);
  const cone = useRef<THREE.MeshBasicMaterial>(null);
  const spot = useRef<THREE.MeshBasicMaterial>(null);
  useGlow(glow, lit);

  const { mount, beam } = useMemo(() => {
    const mountNode = set.getObjectByName("Camera_Mount")!;
    const targetNode = set.getObjectByName("Camera_Target")!;
    const lens = mountNode.position.clone().add(new THREE.Vector3(LENS.z, LENS.y, LENS.x).multiplyScalar(CAMERA_SCALE));
    const aim = targetNode.position.clone();
    const axis = lens.clone().sub(aim);
    const length = axis.length();
    return {
      mount: mountNode.position,
      beam: {
        length,
        radius: length * 0.27,
        aim,
        center: lens.clone().add(aim).multiplyScalar(0.5),
        quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize()),
      },
    };
  }, [set]);

  useFrame(({ clock }, delta) => {
    const ease = 1 - Math.exp(-delta * 3);
    if (gate) {
      const goal = alarm ? gate.closedZ - 1.5 : gate.closedZ;
      gate.leaf.position.z += (goal - gate.leaf.position.z) * ease;
    }
    const pulse = alarm ? 0.5 + 0.5 * Math.sin(clock.elapsedTime * 6) : 0;
    [cone.current, spot.current].forEach((material, i) => {
      if (!material) return;
      material.color.lerp(alarm ? ALERT : PRIMARY, ease);
      material.opacity = (i === 0 ? 0.1 : 0.22) + (lit ? 0.06 : 0) + pulse * 0.08;
    });
  });

  return (
    <group position={[STATIONS.field.x, FLOOR, STATIONS.field.z]}>
      <primitive object={set} />
      {/* The model's lens looks down +Z: turned a quarter so it faces the gate, wall plate flush on the façade. */}
      <group position={mount} rotation={[0, Math.PI / 2, 0]}>
        <primitive object={camera} position={[0, 0, PLATE_BACK * CAMERA_SCALE]} scale={CAMERA_SCALE} />
      </group>
      <mesh position={beam.center} quaternion={beam.quaternion}>
        <coneGeometry args={[beam.radius, beam.length, 40, 1, true]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={PRIMARY}
          depthWrite={false}
          opacity={0.1}
          ref={cone}
          side={THREE.DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh position={[beam.aim.x - 0.4, 0.03, beam.aim.z]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial blending={THREE.AdditiveBlending} color={PRIMARY} depthWrite={false} opacity={0.2} ref={spot} toneMapped={false} transparent />
      </mesh>
      <pointLight color="#ffb35c" decay={2} distance={7} intensity={5} position={[1.8, 3.3, -1.6]} />
    </group>
  );
}

function useMaterials(scene: THREE.Object3D, prefix: string) {
  return useMemo(() => {
    const found = new Map<string, THREE.MeshStandardMaterial>();
    scene.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (material.name.startsWith(prefix)) found.set(material.name, material);
    });
    return [...found.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, material]) => material);
  }, [scene, prefix]);
}

// Technical room: three racks (Blender, MCP) in their slots; the LED materials are shared by the clones.
function CoreStation({ lit }: { lit: boolean }) {
  const { set, glow } = useSet("Core");
  const { scene } = useGLTF(RACK_PATH);
  const leds = useMaterials(scene, "LED");
  const racks = useMemo(
    () =>
      [0, 1, 2].map((i) => ({
        model: scene.clone(true),
        position: set.getObjectByName(`Rack_Slot_${i}`)!.position,
      })),
    [scene, set],
  );
  useGlow(glow, lit);

  useFrame(({ clock }) => {
    leds.forEach((material, i) => {
      const blink = Math.sin(clock.elapsedTime * (3 + i * 2.3)) > -0.3 ? 1 : 0.15;
      material.emissiveIntensity = (lit ? 6 : 2.5) * blink;
    });
  });

  return (
    <group position={[STATIONS.core.x, FLOOR, STATIONS.core.z]}>
      <primitive object={set} />
      {racks.map((rack, i) => (
        <primitive key={i} object={rack.model} position={rack.position} />
      ))}
      <pointLight color={PRIMARY} decay={2} distance={6} intensity={lit ? 9 : 4} position={[0, 2.2, 1.2]} />
    </group>
  );
}

function useFeedTextures(src: string) {
  const image = useTexture(src);
  return useMemo(() => {
    const textures = new Map<number, THREE.Texture>();
    Object.entries(FEEDS).forEach(([screen, [left, top, width]]) => {
      const texture = image.clone();
      // glTF UVs run top-down: keep the image unflipped so the crop offsets read as on the picture.
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.repeat.set(width, width);
      texture.offset.set(left, top);
      texture.needsUpdate = true;
      textures.set(Number(screen), texture);
    });
    return textures;
  }, [image]);
}

function useDetectionOverlay(label: string) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = Math.round((1024 * ALARM_SCREEN_SIZE[1]) / ALARM_SCREEN_SIZE[0]);
    const ctx = canvas.getContext("2d")!;
    const [l, t, r, b] = DETECTION_BOX;
    const x0 = l * canvas.width;
    const y0 = t * canvas.height;
    const x1 = r * canvas.width;
    const y1 = b * canvas.height;
    const arm = 34;
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 6;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.lineWidth = 12;
    ctx.beginPath();
    for (const [cx, cy, dx, dy] of [
      [x0, y0, 1, 1],
      [x1, y0, -1, 1],
      [x0, y1, 1, -1],
      [x1, y1, -1, -1],
    ]) {
      ctx.moveTo(cx + dx * arm, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + dy * arm);
    }
    ctx.stroke();
    ctx.font = "600 30px ui-monospace, SFMono-Regular, Menlo, monospace";
    const text = label.toUpperCase();
    const width = ctx.measureText(text).width + 32;
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(x0, y0 - 52, width, 46);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x0 + 16, y0 - 18);
    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    return result;
  }, [label]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

// The gate camera: paused on its first frame (a quiet feed) until the alarm, then played once and held.
function useGateFeed(src: string, alarm: boolean) {
  const texture = useVideoTexture(src, { start: false, loop: false, muted: true, playsInline: true, preload: "auto" });
  const video = texture.image as HTMLVideoElement;

  useEffect(() => {
    // glTF UVs run top-down.
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    if (alarm) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
      // A seek presents a frame, so the screen is not blank before the first play.
      video.currentTime = 0.01;
    }
  }, [alarm, video]);

  return { texture, video };
}

function OperatorsStation({
  lit,
  alarm,
  feed,
  gateFeed,
  detection,
}: {
  lit: boolean;
  alarm: boolean;
  feed: string;
  gateFeed: string;
  detection: string;
}) {
  const { set, glow } = useSet("Operators");
  const { scene } = useGLTF(ROOM_PATH);
  const screens = useMaterials(scene, "Screen_");
  const feeds = useFeedTextures(feed);
  const gate = useGateFeed(gateFeed, alarm);
  const overlay = useDetectionOverlay(detection);
  const veil = useRef<THREE.MeshBasicMaterial>(null);
  const frame = useRef<THREE.MeshBasicMaterial>(null);
  useGlow(glow, lit);

  useEffect(() => {
    screens.forEach((material, i) => {
      const texture = i === ALARM_SCREEN ? gate.texture : feeds.get(i);
      if (!texture) return;
      material.emissiveMap = texture;
      material.needsUpdate = true;
    });
  }, [screens, feeds, gate.texture]);

  useFrame(({ clock }) => {
    const pulse = (Math.sin(clock.elapsedTime * 7) + 1) / 2;
    const detected = alarm && gate.video.currentTime >= DETECTION_AT;
    screens.forEach((material, i) => {
      material.emissive.copy(WHITE);
      // The film is brighter than the still crops: toned down to sit with the rest of the wall.
      material.emissiveIntensity = i === ALARM_SCREEN ? 0.8 : 1.05 + 0.1 * Math.sin(clock.elapsedTime * 0.8 + i * 1.7);
    });
    if (veil.current) veil.current.opacity = detected ? 0.04 + 0.08 * pulse : 0;
    if (frame.current) frame.current.opacity = detected ? 0.55 + 0.45 * pulse : 0;
  });

  return (
    <group position={[STATIONS.operators.x, FLOOR, STATIONS.operators.z]}>
      <primitive object={set} />
      <primitive object={scene} />
      <mesh position={ALARM_SCREEN_CENTER}>
        <planeGeometry args={ALARM_SCREEN_SIZE} />
        <meshBasicMaterial color={ALERT} depthWrite={false} opacity={0} ref={veil} toneMapped={false} transparent />
      </mesh>
      <mesh position={[ALARM_SCREEN_CENTER[0], ALARM_SCREEN_CENTER[1], ALARM_SCREEN_CENTER[2] + 0.002]}>
        <planeGeometry args={ALARM_SCREEN_SIZE} />
        <meshBasicMaterial depthWrite={false} map={overlay} opacity={0} ref={frame} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

function SignalPath({ curve, active }: { curve: THREE.CatmullRomCurve3; active: boolean }) {
  const pulses = useRef<THREE.Mesh[]>([]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 160, 0.03, 10, false), [curve]);

  useFrame(({ clock }) => {
    pulses.current.forEach((pulse, i) => {
      if (!pulse) return;
      const t = (clock.elapsedTime * (active ? 0.35 : 0.12) + i / pulses.current.length) % 1;
      pulse.position.copy(curve.getPointAt(t));
    });
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshStandardMaterial color={PRIMARY} emissive={PRIMARY} emissiveIntensity={active ? 1.8 : 0.4} opacity={0.9} transparent />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          ref={(mesh) => {
            if (mesh) pulses.current[i] = mesh;
          }}
        >
          <sphereGeometry args={[active ? 0.06 : 0.04, 12, 12]} />
          <meshBasicMaterial color="#bfe7fb" toneMapped={false} />
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
      points[i + 2] = -Math.random() * 30 - 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, []);
  return (
    <points geometry={geometry}>
      <pointsMaterial color="#81cff5" opacity={0.6} size={0.05} sizeAttenuation transparent />
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
        <span className="hidden w-[220px] rounded-md bg-[#0b1220]/70 px-3 py-2 font-mono text-[11px] uppercase leading-5 tracking-[0.2em] text-white backdrop-blur-sm sm:block">
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
  feed: string;
  gateFeed: string;
  detection: string;
  /** Render only while the section is on screen. */
  active: boolean;
};

const HOTSPOTS = [
  new THREE.Vector3(-0.05, FLOOR + 2.7, 0.05),
  new THREE.Vector3(7.68, FLOOR + 1.9, -0.9),
  new THREE.Vector3(14.5, FLOOR + 1.24, 0.05),
];

export function AlarmJourneyScene({ progress, activeStep, hotspots, feed, gateFeed, detection, active }: AlarmJourneySceneProps) {
  const [degraded, setDegraded] = useState(false);
  return (
    <Canvas
      camera={{ fov: 38, position: KEYFRAMES[0].position.toArray() }}
      dpr={degraded ? 1 : [1, 1.6]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true }}
    >
      <PerformanceMonitor onDecline={() => setDegraded(true)} />
      <color args={[BACKGROUND]} attach="background" />
      <fog args={[BACKGROUND, 14, 42]} attach="fog" />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1.6} position={[4, 9, 8]} />
      <gridHelper args={[70, 70, "#1f3b57", "#132235"]} position={[7, FLOOR - 0.28, 0]} />
      <Starfield />
      <Suspense fallback={null}>
        <FieldStation alarm={activeStep >= 1} lit={activeStep === 1} />
        <CoreStation lit={activeStep === 2} />
        <OperatorsStation alarm={activeStep >= 3} detection={detection} feed={feed} gateFeed={gateFeed} lit={activeStep === 3} />
        <Environment files="/novadis/hdri/potsdamer_platz_1k.hdr" environmentIntensity={0.9} />
      </Suspense>
      <SignalPath active={activeStep >= 1} curve={FIELD_TO_CORE} />
      <SignalPath active={activeStep >= 2} curve={CORE_TO_OPERATORS} />
      {HOTSPOTS.map((position, i) => (
        <Hotspot key={i} position={position} visible={activeStep === i + 1} {...hotspots[i]} />
      ))}
      <CameraRig progress={progress} />
    </Canvas>
  );
}

useGLTF.preload(CAMERA_PATH);
useGLTF.preload(SETS_PATH);
useGLTF.preload(RACK_PATH);
useGLTF.preload(ROOM_PATH);
