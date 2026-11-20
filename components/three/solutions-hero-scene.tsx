"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Line, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import {
  ACCESS_LINK,
  BADGE,
  BLOCKS,
  type Block,
  CAMERA,
  CAMERA_AIM,
  CAMERA_LENS,
  CONE_RADIUS,
  DOOR_LEAF,
  FEED_LINK,
  SCREEN_SIZE,
  SHACKLE,
  type Tone,
  VIDEO_LINK,
  VIEW,
  VIEW_DIR,
  type Vec3,
  doorLeaf,
} from "./solutions-hero-room";

const CAMERA_MODEL = "/novadis/models/axis-p1465-le.glb";

// One loop of the story, in seconds: badge, green light, the door opens, the event reaches the desk.
const PERIOD = 9;
const STILL_T = 4.6;
const smooth = (a: number, b: number, t: number) => {
  const x = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};
const timeline = (t: number) => {
  const p = t % PERIOD;
  return {
    p,
    badge: smooth(0.4, 1.3, p) * (1 - smooth(2.2, 2.9, p)),
    granted: p > 1.4 && p < 7.2,
    door: smooth(1.9, 3.8, p) * (1 - smooth(5.8, 7.6, p)),
    // Seconds since the access event reached the hypervision desk, or -1.
    event: p > 3.2 && p < 8.6 ? p - 3.2 : -1,
  };
};

type Clock = { current: number };
type Palette = Record<Tone, string>;

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const read = (name: Tone) => {
    const [r, g, b] = style.getPropertyValue(`--${name}`).trim().split(/[\s/]+/);
    return `rgb(${r}, ${g}, ${b})`;
  };
  const tones: Tone[] = [
    "surface",
    "background-soft",
    "hairline",
    "hairline-strong",
    "foreground-strong",
    "night",
    "night-panel",
    "background-dark",
    "primary",
    "primary-strong",
    "accent",
    "glow",
    "success",
    "danger",
  ];
  return Object.fromEntries(tones.map((tone) => [tone, read(tone)])) as Palette;
}

// ---------- Screens: three canvases redrawn a few times a second ----------

const SCREEN_W = 256;
const SCREEN_H = Math.round((SCREEN_W * SCREEN_SIZE.h) / SCREEN_SIZE.w);

function drawVideo(ctx: CanvasRenderingContext2D, t: number, c: Palette, event: number) {
  ctx.fillStyle = c["background-dark"];
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  const gap = 5;
  const tw = (SCREEN_W - gap * 3) / 2;
  const th = (SCREEN_H - gap * 3) / 2;
  for (let i = 0; i < 4; i++) {
    const x = gap + (i % 2) * (tw + gap);
    const y = gap + Math.floor(i / 2) * (th + gap);
    ctx.fillStyle = c["night-panel"];
    ctx.fillRect(x, y, tw, th);
    ctx.fillStyle = c.night;
    ctx.beginPath();
    ctx.moveTo(x, y + th);
    ctx.lineTo(x + tw * 0.3, y + th * 0.45);
    ctx.lineTo(x + tw * 0.7, y + th * 0.45);
    ctx.lineTo(x + tw, y + th);
    ctx.fill();
    if (i === 1) {
      ctx.fillStyle = event >= 0 ? c.success : c["primary-strong"];
      ctx.fillRect(x + tw * 0.42, y + th * 0.2, tw * 0.16, th * 0.36);
    }
    // A figure crossing each view at its own pace.
    const walk = ((t * (8 + i * 3) + i * 37) % (tw + 20)) - 10;
    ctx.fillStyle = c.glow;
    ctx.fillRect(x + walk, y + th * 0.52, 5, 12);
    ctx.beginPath();
    ctx.arc(x + walk + 2.5, y + th * 0.52 - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = Math.floor(t * 1.5) % 2 === 0 ? c.danger : c.night;
    ctx.beginPath();
    ctx.arc(x + 8, y + 8, 3, 0, Math.PI * 2);
    ctx.fill();
    if (i === 1 && event >= 0) {
      ctx.strokeStyle = c.success;
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 1.5, y + 1.5, tw - 3, th - 3);
    }
  }
}

function drawPlan(ctx: CanvasRenderingContext2D, t: number, c: Palette, event: number) {
  ctx.fillStyle = c["background-dark"];
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  ctx.fillStyle = c["primary-strong"];
  ctx.fillRect(0, 0, SCREEN_W, 14);
  ctx.strokeStyle = c.glow;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 28, 140, 92);
  ctx.strokeRect(164, 28, 66, 50);
  ctx.beginPath();
  ctx.moveTo(24, 74);
  ctx.lineTo(96, 74);
  ctx.moveTo(164, 78);
  ctx.lineTo(164, 120);
  ctx.stroke();
  ctx.globalAlpha = 1;
  const dots: [number, number, string][] = [
    [40, 44, c.glow],
    [140, 100, c.glow],
    [196, 52, c.success],
    [60, 104, event >= 0 ? c.success : c.glow],
  ];
  dots.forEach(([x, y, color], i) => {
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.55 + 0.45 * Math.abs(Math.sin(t * 1.6 + i));
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  if (event >= 0) {
    const ring = (event % 1.2) * 18;
    ctx.strokeStyle = c.success;
    ctx.globalAlpha = Math.max(0, 1 - ring / 22);
    ctx.beginPath();
    ctx.arc(60, 104, 6 + ring, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = c.success;
    ctx.fillRect(SCREEN_W - 104, SCREEN_H - 26, 96, 18);
  }
}

function drawEvents(ctx: CanvasRenderingContext2D, t: number, c: Palette, event: number) {
  ctx.fillStyle = c["background-dark"];
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  ctx.fillStyle = c["night-panel"];
  ctx.fillRect(0, 0, SCREEN_W, 14);
  const fresh = event >= 0 ? Math.min(1, event / 0.4) : 0;
  const rowH = 17;
  const shift = fresh * rowH;
  const widths = [0.62, 0.48, 0.7, 0.4, 0.56, 0.66, 0.45];
  widths.forEach((w, i) => {
    const y = 22 + i * rowH + shift - (event >= 0 ? rowH : 0);
    if (y < 18 || y > SCREEN_H - 8) return;
    ctx.fillStyle = i % 3 === 2 ? c.glow : c["primary-strong"];
    ctx.fillRect(12, y, 6, 6);
    ctx.fillStyle = c.night;
    ctx.fillRect(26, y, (SCREEN_W - 40) * w, 6);
  });
  if (event >= 0) {
    ctx.globalAlpha = fresh;
    ctx.fillStyle = c.success;
    ctx.fillRect(12, 22 + shift - rowH, 6, 6);
    ctx.fillRect(26, 22 + shift - rowH, (SCREEN_W - 40) * 0.78, 6);
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = c.glow;
  ctx.globalAlpha = 0.4 + 0.3 * Math.sin(t * 2);
  ctx.fillRect(SCREEN_W - 26, 4, 18, 6);
  ctx.globalAlpha = 1;
}

const DRAW = [drawVideo, drawPlan, drawEvents];

function Screen({ block, clock, palette }: { block: Block; clock: Clock; palette: Palette }) {
  const index = block.index ?? 0;
  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_W;
    canvas.height = SCREEN_H;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return { canvas, texture };
  }, []);
  const last = useRef(-1);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(() => {
    const t = clock.current;
    // Eight redraws a second are plenty for screens this size.
    const tick = Math.floor(t * 8);
    if (tick === last.current) return;
    last.current = tick;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    DRAW[index](ctx, t, palette, timeline(t).event);
    texture.needsUpdate = true;
  });

  return (
    <mesh position={block.at} rotation-y={block.rotY ?? 0}>
      <planeGeometry args={[SCREEN_SIZE.w, SCREEN_SIZE.h]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// ---------- Static room ----------

function Blocks({ palette, clock }: { palette: Palette; clock: Clock }) {
  const materials = useMemo(() => {
    const map = new Map<Tone, THREE.MeshStandardMaterial>();
    for (const block of BLOCKS) {
      if (map.has(block.tone)) continue;
      map.set(block.tone, new THREE.MeshStandardMaterial({ color: palette[block.tone], roughness: 0.82, metalness: 0.02 }));
    }
    return map;
  }, [palette]);
  // Shared through <primitive>, which the renderer never disposes on its own.
  useEffect(() => () => materials.forEach((material) => material.dispose()), [materials]);
  const leds = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const reader = useRef<THREE.MeshBasicMaterial>(null);
  const colors = useMemo(
    () => ({ success: new THREE.Color(palette.success), glow: new THREE.Color(palette.glow), dim: new THREE.Color(palette.night) }),
    [palette],
  );

  useFrame(() => {
    const t = clock.current;
    leds.current.forEach((material, i) => {
      if (!material) return;
      const on = Math.sin(t * (2.2 + (i % 4) * 0.9) + i * 1.7) > -0.35;
      material.opacity = on ? 1 : 0.25;
    });
    if (reader.current) {
      const { granted, p } = timeline(t);
      // Idle: a slow blue blink. Badge accepted: steady green.
      reader.current.color.copy(granted ? colors.success : Math.sin(p * 5) > 0 ? colors.glow : colors.dim);
    }
  });

  return (
    <>
      {BLOCKS.map((block, i) => {
        if (block.kind === "screen") return <Screen block={block} clock={clock} key={i} palette={palette} />;
        const lit = block.kind === "led" || block.kind === "reader";
        return (
          <mesh castShadow={!lit} key={i} position={block.at} receiveShadow={!lit} rotation-y={block.rotY ?? 0}>
            <boxGeometry args={block.size} />
            {lit ? (
              <meshBasicMaterial
                color={palette[block.tone]}
                ref={(m) => {
                  if (block.kind === "reader") reader.current = m;
                  else leds.current[block.index ?? 0] = m;
                }}
                toneMapped={false}
                transparent={block.kind === "led"}
              />
            ) : (
              <primitive attach="material" object={materials.get(block.tone)!} />
            )}
          </mesh>
        );
      })}
      <mesh castShadow>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(SHACKLE.map((p) => new THREE.Vector3(...p)), false, "centripetal"), 32, 0.026, 8, false]} />
        <meshStandardMaterial color={palette["primary-strong"]} metalness={0.2} roughness={0.5} />
      </mesh>
    </>
  );
}

function Door({ palette, clock }: { palette: Palette; clock: Clock }) {
  const leaf = useRef<THREE.Group>(null);
  const [panel, handle] = doorLeaf(0);
  const { hinge } = DOOR_LEAF;
  useFrame(() => {
    if (leaf.current) leaf.current.rotation.y = timeline(clock.current).door * DOOR_LEAF.open;
  });
  const local = (b: Block): Vec3 => [b.at[0] - hinge[0], b.at[1] - hinge[1], b.at[2] - hinge[2]];
  return (
    <group position={hinge} ref={leaf}>
      <mesh castShadow position={local(panel)} receiveShadow>
        <boxGeometry args={panel.size} />
        <meshStandardMaterial color={palette[panel.tone]} roughness={0.7} />
      </mesh>
      <mesh position={local(handle)}>
        <boxGeometry args={handle.size} />
        <meshStandardMaterial color={palette[handle.tone]} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Badge({ palette, clock }: { palette: Palette; clock: Clock }) {
  const ref = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const from = useMemo(() => new THREE.Vector3(...BADGE.from), []);
  const to = useMemo(() => new THREE.Vector3(...BADGE.to), []);
  useFrame(() => {
    if (!ref.current || !material.current) return;
    const { badge } = timeline(clock.current);
    ref.current.position.lerpVectors(from, to, badge);
    material.current.opacity = Math.min(1, badge * 3);
    ref.current.visible = badge > 0.01;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={BADGE.size} />
      <meshStandardMaterial color={palette.primary} ref={material} roughness={0.4} transparent />
    </mesh>
  );
}

function SecurityCamera() {
  const { scene } = useGLTF(CAMERA_MODEL);
  const model = useMemo(() => {
    const copy = scene.clone(true);
    copy.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = true;
    });
    return copy;
  }, [scene]);
  // The model looks down +Z with its wall plate behind: yaw toward the door, then tilt down.
  return (
    <group position={CAMERA.center} rotation={[CAMERA.tilt, CAMERA.yaw, 0, "YXZ"]} scale={CAMERA.scale}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

function ViewCone({ palette }: { palette: Palette }) {
  const { position, quaternion, length } = useMemo(() => {
    const lens = new THREE.Vector3(...CAMERA_LENS);
    const aim = new THREE.Vector3(...CAMERA_AIM);
    const axis = lens.clone().sub(aim);
    const length = axis.length();
    return {
      position: lens.clone().add(aim).multiplyScalar(0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis.normalize()),
      length,
    };
  }, []);
  return (
    <mesh position={position} quaternion={quaternion} renderOrder={2}>
      <coneGeometry args={[CONE_RADIUS, length, 32, 1, true]} />
      <meshBasicMaterial color={palette.primary} depthWrite={false} opacity={0.09} side={THREE.DoubleSide} toneMapped={false} transparent />
    </mesh>
  );
}

// ---------- Data flowing up to the rack, then to the desk ----------

function samplePath(path: Vec3[]) {
  const points = path.map((p) => new THREE.Vector3(...p));
  const lengths = points.slice(1).map((p, i) => p.distanceTo(points[i]));
  const total = lengths.reduce((a, b) => a + b, 0);
  return (u: number, out: THREE.Vector3) => {
    let d = THREE.MathUtils.clamp(u, 0, 1) * total;
    for (let i = 0; i < lengths.length; i++) {
      if (d <= lengths[i] || i === lengths.length - 1) return out.lerpVectors(points[i], points[i + 1], Math.min(1, d / lengths[i]));
      d -= lengths[i];
    }
    return out;
  };
}

function Pulses({ palette, clock }: { palette: Palette; clock: Clock }) {
  const video = useMemo(() => samplePath(VIDEO_LINK), []);
  const access = useMemo(() => samplePath(ACCESS_LINK), []);
  const feed = useMemo(() => samplePath(FEED_LINK), []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const t = clock.current;
    const { p } = timeline(t);
    const [v1, v2, a, f1, f2] = refs.current;
    // Video streams continuously; the badge event rides the access line once per loop.
    if (v1) video((t * 0.28) % 1, v1.position);
    if (v2) video((t * 0.28 + 0.5) % 1, v2.position);
    if (a) {
      const u = (p - 1.45) / 1.6;
      a.visible = u > 0 && u < 1;
      access(u, a.position);
    }
    if (f1) feed((t * 0.45) % 1, f1.position);
    if (f2) {
      const u = (p - 3.0) / 0.7;
      f2.visible = u > 0 && u < 1;
      feed(u, f2.position);
    }
  });

  const dot = (i: number, color: string, size = 0.05) => (
    <mesh key={i} ref={(m) => void (refs.current[i] = m)}>
      <sphereGeometry args={[size, 12, 8]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );

  return (
    <>
      {[ACCESS_LINK, VIDEO_LINK, FEED_LINK].map((path, i) => (
        <Line color={palette.primary} dashed dashScale={12} dashSize={0.6} gapSize={0.45} key={i} lineWidth={1.4} opacity={0.5} points={path} transparent />
      ))}
      {dot(0, palette.accent)}
      {dot(1, palette.accent)}
      {dot(2, palette.success, 0.065)}
      {dot(3, palette.accent)}
      {dot(4, palette.success, 0.065)}
    </>
  );
}

// ---------- Frame, clock, readiness ----------

function Frame() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  useLayoutEffect(() => {
    const [tx, ty, tz] = VIEW.target;
    camera.position.set(tx + VIEW_DIR[0] * 20, ty + VIEW_DIR[1] * 20, tz + VIEW_DIR[2] * 20);
    camera.lookAt(tx, ty, tz);
    // Same "contain" fit as the SVG still, so the callouts land on the same points.
    camera.zoom = Math.min(size.width / VIEW.width, size.height / VIEW.height);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);
  return null;
}

function Ticker({ clock, animate }: { clock: Clock; animate: boolean }) {
  const start = useRef<number | null>(null);
  useFrame(({ clock: c }) => {
    if (!animate) {
      clock.current = STILL_T;
      return;
    }
    // Start the loop on the still pose, so the switch from poster to scene does not jump.
    if (start.current === null) start.current = c.elapsedTime - STILL_T;
    clock.current = c.elapsedTime - start.current;
  }, -1);
  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(onReady);
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [invalidate, onReady]);
  return null;
}

useGLTF.preload(CAMERA_MODEL);

export default function SolutionsHeroScene({ animate, onReady }: { animate: boolean; onReady: () => void }) {
  const palette = useMemo(readPalette, []);
  const clock = useRef(STILL_T);

  return (
    <Canvas
      camera={{ near: 0.1, far: 60 }}
      dpr={[1, 1.75]}
      flat
      frameloop={animate ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      orthographic
      shadows="soft"
      style={{ pointerEvents: "none" }}
    >
      <Frame />
      <Ticker animate={animate} clock={clock} />
      <ambientLight intensity={1.35} />
      <hemisphereLight args={[palette.surface, palette["background-soft"], 0.6]} />
      <directionalLight
        castShadow
        intensity={1.6}
        position={[3.5, 7, 4.5]}
        shadow-bias={-0.0004}
        shadow-camera-bottom={-4}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={4}
        shadow-mapSize={[1024, 1024]}
      />
      <Blocks clock={clock} palette={palette} />
      <Door clock={clock} palette={palette} />
      <Badge clock={clock} palette={palette} />
      <Pulses clock={clock} palette={palette} />
      <ViewCone palette={palette} />
      <Suspense fallback={null}>
        <SecurityCamera />
        <Ready onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
