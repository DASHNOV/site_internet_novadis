"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { SparkRenderer, SplatFileType, SplatMesh } from "@sparkjsdev/spark";
import * as THREE from "three";
import { lidarWalkthrough as config } from "@/data/lidar-walkthrough";

export type LidarGrid = {
  width: number;
  height: number;
  cell: number;
  originX: number;
  originZ: number;
  cells: Uint8Array;
};

export type ZoneState = "clear" | "prealarm" | "alarm";

export type LidarStatus = {
  intruder: { x: number; z: number; state: ZoneState };
  visitor: { x: number; z: number; yaw: number; state: ZoneState };
};

export type JoystickInput = { x: number; y: number };

// Spawn, protected zone and intruder route, in scan coordinates. Loaded with the scene, never bundled.
export type LidarLayout = {
  spawn: [number, number];
  zone: { center: [number, number]; size: [number, number]; angle: number };
  route: [number, number][];
};

const FOV = 70;
const WALK = 1.6;
const RUN = 3.4;
const RADIUS = 0.22;
const LOOK_SPEED = 0.0022;
const PITCH_LIMIT = 1.35;
const COLORS = { clear: "#81cff5", prealarm: "#f59e0b", alarm: "#ef4444", night: "#0b1220" } as const;

function zoneStateAt(layout: LidarLayout, x: number, z: number): ZoneState {
  const zoneCos = Math.cos(layout.zone.angle);
  const zoneSin = Math.sin(layout.zone.angle);
  const dx = x - layout.zone.center[0];
  const dz = z - layout.zone.center[1];
  const u = Math.abs(dx * zoneCos + dz * zoneSin);
  const v = Math.abs(-dx * zoneSin + dz * zoneCos);
  const [w, d] = layout.zone.size;
  if (u <= w / 2 && v <= d / 2) return "alarm";
  const m = config.prealarmMargin;
  if (u <= w / 2 + m && v <= d / 2 + m) return "prealarm";
  return "clear";
}

function isBlocked(grid: LidarGrid, x: number, z: number) {
  const cx = Math.floor((x - grid.originX) / grid.cell);
  const cz = Math.floor((z - grid.originZ) / grid.cell);
  if (cx < 0 || cz < 0 || cx >= grid.width || cz >= grid.height) return true;
  return grid.cells[cz * grid.width + cx] === 1;
}

function collides(grid: LidarGrid, x: number, z: number) {
  if (isBlocked(grid, x, z)) return true;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    if (isBlocked(grid, x + Math.cos(a) * RADIUS, z + Math.sin(a) * RADIUS)) return true;
  }
  return false;
}

// Photorealistic capture of the offices (Gaussian splats from the scanner's LCC2 export). The files
// keep the y-down convention of splat captures: flipped about X, then lifted onto the scan's floor.
function placeSplats(mesh: SplatMesh) {
  mesh.quaternion.set(1, 0, 0, 0);
  mesh.position.y = config.splats.lift;
  return mesh;
}

// The light preview shows at once; the detailed level loads behind it and takes over when ready.
function OfficeSplats({ preview, onReady }: { preview: Uint8Array; onReady: () => void }) {
  const { gl } = useThree();
  const spark = useMemo(() => new SparkRenderer({ renderer: gl }), [gl]);
  const coarse = useMemo(() => placeSplats(new SplatMesh({ fileBytes: preview, fileType: SplatFileType.SPZ })), [preview]);
  const [detail, setDetail] = useState<SplatMesh | null>(null);

  useEffect(() => {
    let alive = true;
    coarse.initialized.then(() => alive && onReady());
    return () => {
      alive = false;
      coarse.dispose();
    };
  }, [coarse, onReady]);

  useEffect(() => {
    let alive = true;
    let mesh: SplatMesh | null = null;
    const controller = new AbortController();
    // If the detailed level fails, the preview simply stays.
    fetch(config.splats.detail, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`${config.splats.detail}: ${res.status}`);
        return res.arrayBuffer();
      })
      .then((bytes) => {
        if (!alive) return;
        mesh = placeSplats(new SplatMesh({ fileBytes: new Uint8Array(bytes), fileType: SplatFileType.SPZ }));
        return mesh.initialized.then(() => alive && mesh && setDetail(mesh));
      })
      .catch(() => undefined);
    return () => {
      alive = false;
      controller.abort();
      mesh?.dispose();
    };
  }, []);

  useEffect(() => () => spark.dispose(), [spark]);

  return (
    <>
      <primitive object={spark} />
      <primitive object={detail ?? coarse} />
    </>
  );
}

function capsulePoints(from: THREE.Vector3, to: THREE.Vector3, radius: number, count: number, depth = 1) {
  const out = new Float32Array(count * 3);
  const axis = to.clone().sub(from);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const a = Math.random() * Math.PI * 2;
    // Rounded ends: narrow the radius near both tips.
    const r = radius * Math.sqrt(1 - Math.pow(2 * t - 1, 8));
    const p = from.clone().addScaledVector(axis, t);
    out[i * 3] = p.x + Math.cos(a) * r;
    out[i * 3 + 1] = p.y;
    out[i * 3 + 2] = p.z + Math.sin(a) * r * depth;
  }
  return out;
}

function spherePoints(center: THREE.Vector3, radius: number, count: number) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(radius).add(center);
    out.set([v.x, v.y, v.z], i * 3);
  }
  return out;
}

const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

// A walking silhouette drawn as LiDAR returns: torso and head fixed, limbs swing around their joints.
function useFigure() {
  return useMemo(() => {
    const merge = (...parts: Float32Array[]) => {
      const out = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
      let o = 0;
      for (const p of parts) {
        out.set(p, o);
        o += p.length;
      }
      return new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(out, 3));
    };
    const body = merge(
      spherePoints(v3(0, 1.66, 0), 0.11, 260),
      capsulePoints(v3(0, 0.98, 0), v3(0, 1.5, 0), 0.18, 900, 0.62),
      capsulePoints(v3(0, 1.5, 0), v3(0, 1.56, 0), 0.06, 60),
    );
    const leg = merge(capsulePoints(v3(0, 0, 0), v3(0, -0.84, 0), 0.075, 340), capsulePoints(v3(0, -0.86, 0), v3(0, -0.86, 0.14), 0.05, 50));
    const arm = merge(capsulePoints(v3(0, 0, 0), v3(0, -0.62, 0), 0.05, 200));
    return { body, leg, arm };
  }, []);
}

function routeLength(route: [number, number][]) {
  const cumulative = [0];
  for (let i = 1; i < route.length; i++) {
    const [ax, az] = route[i - 1];
    const [bx, bz] = route[i];
    cumulative.push(cumulative[i - 1] + Math.hypot(bx - ax, bz - az));
  }
  return cumulative;
}

function pointOnRoute(route: [number, number][], cumulative: number[], s: number) {
  let i = 1;
  while (i < cumulative.length - 1 && cumulative[i] < s) i++;
  const t = (s - cumulative[i - 1]) / (cumulative[i] - cumulative[i - 1] || 1);
  const [ax, az] = route[i - 1];
  const [bx, bz] = route[i];
  return { x: ax + (bx - ax) * t, z: az + (bz - az) * t, dx: bx - ax, dz: bz - az };
}

function Intruder({
  layout,
  state,
  stateRef,
}: {
  layout: LidarLayout;
  state: ZoneState;
  stateRef: MutableRefObject<{ x: number; z: number }>;
}) {
  const figure = useFigure();
  const group = useRef<THREE.Group>(null);
  const limbs = useRef<(THREE.Object3D | null)[]>([]);
  const cumulative = useMemo(() => routeLength(layout.route), [layout]);
  const total = cumulative[cumulative.length - 1];
  const progress = useRef(total * 0.15);
  const phase = useRef(0);
  const tag = useRef<HTMLSpanElement>(null);
  const material = useMemo(() => new THREE.PointsMaterial({ size: 0.03, sizeAttenuation: true, color: COLORS.clear }), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.7, config.intruder.height, 0.5)), []);
  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: COLORS.clear, transparent: true, opacity: 0.8 }), []);

  useEffect(() => {
    material.color.set(COLORS[state]);
    edgeMaterial.color.set(COLORS[state]);
  }, [state, material, edgeMaterial]);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    // Walks the route back and forth, as a ping-pong over twice its length.
    progress.current = (progress.current + dt * config.intruder.speed) % (total * 2);
    const forward = progress.current <= total;
    const s = forward ? progress.current : total * 2 - progress.current;
    const p = pointOnRoute(layout.route, cumulative, s);
    const heading = Math.atan2(forward ? p.dx : -p.dx, forward ? p.dz : -p.dz);
    stateRef.current = { x: p.x, z: p.z };
    phase.current += dt * config.intruder.speed * 4.2;
    const swing = Math.sin(phase.current);
    const g = group.current;
    if (!g) return;
    g.position.set(p.x, 0, p.z);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, heading, 1 - Math.exp(-10 * dt));
    const [legL, legR, armL, armR] = limbs.current;
    if (legL) legL.rotation.x = swing * 0.42;
    if (legR) legR.rotation.x = -swing * 0.42;
    if (armL) armL.rotation.x = -swing * 0.32;
    if (armR) armR.rotation.x = swing * 0.32;

    // Html overlays still project when behind the camera: only show the tag when the object is ahead.
    if (tag.current) {
      const toTarget = new THREE.Vector3(p.x, config.intruder.height, p.z).sub(camera.position);
      const ahead = toTarget.dot(camera.getWorldDirection(new THREE.Vector3())) > 0;
      tag.current.style.visibility = ahead && toTarget.length() < 30 ? "visible" : "hidden";
    }
  });

  const label = `${config.hud.intruder} · ${config.intruder.height.toFixed(2).replace(".", ",")} m · ${config.intruder.speed
    .toFixed(1)
    .replace(".", ",")} m/s`;

  return (
    <group ref={group}>
      <points geometry={figure.body} material={material} />
      {[
        [-0.1, 0.9, 0, figure.leg],
        [0.1, 0.9, 0, figure.leg],
        [-0.25, 1.44, 0, figure.arm],
        [0.25, 1.44, 0, figure.arm],
      ].map(([x, y, z, geometry], i) => (
        <points
          geometry={geometry as THREE.BufferGeometry}
          key={i}
          material={material}
          position={[x as number, y as number, z as number]}
          ref={(el) => {
            limbs.current[i] = el;
          }}
        />
      ))}
      <lineSegments geometry={edges} material={edgeMaterial} position={[0, config.intruder.height / 2, 0]} />
      <Html center position={[0, config.intruder.height + 0.32, 0]} zIndexRange={[10, 0]}>
        <span
          ref={tag}
          className="block whitespace-nowrap rounded-sm px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-background-dark"
          style={{ background: COLORS[state] }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function Zone({ layout, state }: { layout: LidarLayout; state: ZoneState }) {
  const [w, d] = layout.zone.size;
  const m = config.prealarmMargin;
  const height = 2.4;
  const fill = useRef<THREE.MeshBasicMaterial>(null);
  const box = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, height, d)), [w, d]);
  const outer = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(w + m * 2, d + m * 2)), [w, d, m]);

  useFrame(({ clock }) => {
    if (!fill.current) return;
    fill.current.opacity = state === "alarm" ? 0.12 + Math.sin(clock.elapsedTime * 8) * 0.06 : 0.06;
  });

  return (
    <group position={[layout.zone.center[0], 0, layout.zone.center[1]]} rotation={[0, -layout.zone.angle, 0]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[w, height, d]} />
        <meshBasicMaterial color={COLORS[state === "clear" ? "clear" : state]} depthWrite={false} ref={fill} side={THREE.DoubleSide} transparent />
      </mesh>
      <lineSegments geometry={box} position={[0, height / 2, 0]}>
        <lineBasicMaterial color={COLORS[state === "clear" ? "clear" : state]} />
      </lineSegments>
      <lineSegments geometry={outer} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <lineBasicMaterial color={COLORS.prealarm} opacity={0.55} transparent />
      </lineSegments>
      <Sensor />
    </group>
  );
}

// Ouster OS1 hung under the ceiling: Ø 87 mm cylinder, the scan pulse starts here.
function Sensor() {
  return (
    <group position={[0, 2.45, 0]}>
      <mesh>
        <cylinderGeometry args={[0.043, 0.043, 0.087, 24]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.02, 24]} />
        <meshBasicMaterial color={COLORS.clear} />
      </mesh>
    </group>
  );
}

function Player({
  layout,
  grid,
  joystick,
  coarse,
  onLockChange,
  visitorRef,
}: {
  layout: LidarLayout;
  grid: LidarGrid;
  joystick: MutableRefObject<JoystickInput>;
  coarse: boolean;
  onLockChange: (locked: boolean) => void;
  visitorRef: MutableRefObject<{ x: number; z: number; yaw: number }>;
}) {
  const { camera, gl } = useThree();
  const keys = useRef(new Set<string>());
  const look = useRef({
    yaw: Math.atan2(-(layout.zone.center[0] - layout.spawn[0]), -(layout.zone.center[1] - layout.spawn[1])),
    pitch: -0.05,
  });
  const position = useRef({ x: layout.spawn[0], z: layout.spawn[1] });
  const bob = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;
    const locked = () => document.pointerLockElement === canvas;
    const onClick = () => {
      if (!coarse && !locked()) canvas.requestPointerLock?.();
    };
    const onLock = () => {
      if (!locked()) keys.current.clear();
      onLockChange(locked());
    };
    const onMouse = (e: MouseEvent) => {
      if (!locked()) return;
      look.current.yaw -= e.movementX * LOOK_SPEED;
      look.current.pitch = THREE.MathUtils.clamp(look.current.pitch - e.movementY * LOOK_SPEED, -PITCH_LIMIT, PITCH_LIMIT);
    };
    const handled = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ShiftLeft", "ShiftRight", "Space"]);
    const onKeyDown = (e: KeyboardEvent) => {
      if (!locked() || !handled.has(e.code)) return;
      e.preventDefault();
      keys.current.add(e.code);
    };
    const onKeyUp = (e: KeyboardEvent) => keys.current.delete(e.code);
    const onBlur = () => keys.current.clear();

    // Touch: dragging anywhere on the scene turns the head; the joystick handles walking.
    let touchId: number | null = null;
    let last = { x: 0, y: 0 };
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      touchId = e.pointerId;
      last = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== touchId) return;
      look.current.yaw += (e.clientX - last.x) * 0.005;
      look.current.pitch = THREE.MathUtils.clamp(look.current.pitch + (e.clientY - last.y) * 0.005, -PITCH_LIMIT, PITCH_LIMIT);
      last = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId === touchId) touchId = null;
    };

    canvas.addEventListener("click", onClick);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("pointerlockchange", onLock);
    document.addEventListener("mousemove", onMouse);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("pointerlockchange", onLock);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      if (locked()) document.exitPointerLock();
    };
  }, [gl, coarse, onLockChange]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const k = keys.current;
    let forward = (k.has("KeyW") || k.has("ArrowUp") ? 1 : 0) - (k.has("KeyS") || k.has("ArrowDown") ? 1 : 0);
    let strafe = (k.has("KeyD") || k.has("ArrowRight") ? 1 : 0) - (k.has("KeyA") || k.has("ArrowLeft") ? 1 : 0);
    forward += joystick.current.y;
    strafe += joystick.current.x;
    const length = Math.hypot(forward, strafe);
    if (length > 1) {
      forward /= length;
      strafe /= length;
    }
    const speed = k.has("ShiftLeft") || k.has("ShiftRight") ? RUN : WALK;
    const { yaw, pitch } = look.current;
    const dx = (-Math.sin(yaw) * forward + Math.cos(yaw) * strafe) * speed * dt;
    const dz = (-Math.cos(yaw) * forward - Math.sin(yaw) * strafe) * speed * dt;
    const p = position.current;
    // Axis by axis, so walking into a wall at an angle slides along it.
    if (dx && !collides(grid, p.x + dx, p.z)) p.x += dx;
    if (dz && !collides(grid, p.x, p.z + dz)) p.z += dz;

    const moving = length > 0.05;
    bob.current = moving ? bob.current + dt * speed * 5 : bob.current * (1 - Math.min(1, dt * 6));
    camera.position.set(p.x, config.eyeHeight + Math.sin(bob.current) * 0.025, p.z);
    camera.rotation.set(pitch, yaw, 0, "YXZ");
    visitorRef.current = { x: p.x, z: p.z, yaw };
  });

  return null;
}

function Tracker({
  layout,
  onStatus,
  visitorRef,
  intruderRef,
  onIntruderState,
}: {
  layout: LidarLayout;
  onStatus: (status: LidarStatus) => void;
  visitorRef: MutableRefObject<{ x: number; z: number; yaw: number }>;
  intruderRef: MutableRefObject<{ x: number; z: number }>;
  onIntruderState: (state: ZoneState) => void;
}) {
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    elapsed.current += delta;
    if (elapsed.current < 0.15) return;
    elapsed.current = 0;
    const visitor = visitorRef.current;
    const intruder = intruderRef.current;
    const intruderState = zoneStateAt(layout, intruder.x, intruder.z);
    const visitorState = zoneStateAt(layout, visitor.x, visitor.z);
    onIntruderState(intruderState);
    onStatus({ intruder: { ...intruder, state: intruderState }, visitor: { ...visitor, state: visitorState } });
  });
  return null;
}

function World(props: SceneProps) {
  const { layout } = props;
  const visitorRef = useRef({ x: layout.spawn[0], z: layout.spawn[1], yaw: 0 });
  const intruderRef = useRef({ x: layout.route[0][0], z: layout.route[0][1] });
  // The authorised visitor never raises the alarm: only the unknown object drives the zone.
  const [intruderState, setIntruderState] = useState<ZoneState>("clear");

  return (
    <>
      <OfficeSplats onReady={props.onReady} preview={props.preview} />
      <Zone layout={layout} state={intruderState} />
      <Intruder layout={layout} state={intruderState} stateRef={intruderRef} />
      <Player layout={layout} coarse={props.coarse} grid={props.grid} joystick={props.joystick} onLockChange={props.onLockChange} visitorRef={visitorRef} />
      <Tracker
        layout={layout}
        intruderRef={intruderRef}
        onIntruderState={setIntruderState}
        onStatus={props.onStatus}
        visitorRef={visitorRef}
      />
    </>
  );
}

type SceneProps = {
  preview: Uint8Array;
  layout: LidarLayout;
  grid: LidarGrid;
  joystick: MutableRefObject<JoystickInput>;
  coarse: boolean;
  onStatus: (status: LidarStatus) => void;
  onLockChange: (locked: boolean) => void;
  onReady: () => void;
};

export default function LidarWalkthroughScene(props: SceneProps) {
  return (
    <Canvas
      camera={{ fov: FOV, near: 0.05, far: 60, position: [props.layout.spawn[0], config.eyeHeight, props.layout.spawn[1]] }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(COLORS.night)}
      style={{ touchAction: "none" }}
    >
      <World {...props} />
    </Canvas>
  );
}
