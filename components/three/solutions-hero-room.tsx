// Shared layout of the /solutions hero room: the WebGL scene and the still SVG drawing both read it,
// so the poster, the 3D render and the callouts all line up. Units are metres, y up, room centred on 0.

export type Vec3 = [number, number, number];

// Design-system colour tokens (app/(site)/globals.css), resolved at runtime by each renderer.
export type Tone =
  | "surface"
  | "background-soft"
  | "hairline"
  | "hairline-strong"
  | "foreground-strong"
  | "night"
  | "night-panel"
  | "background-dark"
  | "primary"
  | "primary-strong"
  | "accent"
  | "glow"
  | "success"
  | "danger";

export type Block = {
  at: Vec3;
  size: Vec3;
  tone: Tone;
  rotY?: number;
  // Painter order for the SVG: floor, then walls, then furniture sorted by depth.
  layer?: number;
  kind?: "screen" | "led" | "reader";
  index?: number;
};

const ROOM = { x0: -2.8, x1: 2.8, z0: -2.3, z1: 1.6, h: 2.5, wall: 0.12, slab: 0.1 };
const DOOR = { z0: -0.05, z1: 0.95, h: 2.1 };

// Fixed axonometric view from the front right: a compact vignette, unlike the scroll journey below.
const AZIMUTH = 0.7;
const ELEVATION = 0.56;
export const VIEW_DIR: Vec3 = [Math.sin(AZIMUTH) * Math.cos(ELEVATION), Math.sin(ELEVATION), Math.cos(AZIMUTH) * Math.cos(ELEVATION)];
const RIGHT: Vec3 = normalize([VIEW_DIR[2], 0, -VIEW_DIR[0]]);
const UP: Vec3 = cross(VIEW_DIR, RIGHT);

function normalize(v: Vec3): Vec3 {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
}
function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const screen = (p: Vec3) => [dot(p, RIGHT), dot(p, UP)] as const;

export const VIEW_ASPECT = 16 / 11;

// Frame the room once, with room around it for the callouts, at the aspect the hero reserves.
export const VIEW = (() => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (const x of [ROOM.x0 - ROOM.wall, ROOM.x1])
    for (const y of [-ROOM.slab, ROOM.h])
      for (const z of [ROOM.z0 - ROOM.wall, ROOM.z1]) {
        const [sx, sy] = screen([x, y, z]);
        xs.push(sx);
        ys.push(sy);
      }
  const pad = 0.22;
  let width = Math.max(...xs) - Math.min(...xs) + pad * 2;
  let height = Math.max(...ys) - Math.min(...ys) + pad * 2;
  if (width / height > VIEW_ASPECT) height = width / VIEW_ASPECT;
  else width = height * VIEW_ASPECT;
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const target: Vec3 = [RIGHT[0] * cx + UP[0] * cy, RIGHT[1] * cx + UP[1] * cy, RIGHT[2] * cx + UP[2] * cy];
  return { width, height, cx, cy, target };
})();

// Position of a scene point in the frame, in percent from the top left.
export function toFrame(p: Vec3) {
  const [sx, sy] = screen(p);
  return { x: ((sx - VIEW.cx) / VIEW.width + 0.5) * 100, y: (0.5 - (sy - VIEW.cy) / VIEW.height) * 100 };
}

function rotate(local: Vec3, rotY: number): Vec3 {
  const c = Math.cos(rotY);
  const s = Math.sin(rotY);
  return [local[0] * c + local[2] * s, local[1], -local[0] * s + local[2] * c];
}
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

const span = (a: number, b: number) => [(a + b) / 2, Math.abs(b - a)] as const;
function box(x: [number, number], y: [number, number], z: [number, number], tone: Tone, extra: Partial<Block> = {}): Block {
  const [cx, w] = span(...x);
  const [cy, h] = span(...y);
  const [cz, d] = span(...z);
  return { at: [cx, cy, cz], size: [w, h, d], tone, ...extra };
}

const { x0, x1, z0, z1, h, wall, slab } = ROOM;

const shell: Block[] = [
  box([x0 - wall, x1], [-slab, 0], [z0 - wall, z1], "background-soft", { layer: 0 }),
  box([x0 - wall, x1], [0, h], [z0 - wall, z0], "surface", { layer: 1 }),
  box([x0 - wall, x0], [0, h], [z0, DOOR.z0], "surface", { layer: 1 }),
  box([x0 - wall, x0], [0, h], [DOOR.z1, z1], "surface", { layer: 1 }),
  box([x0 - wall, x0], [DOOR.h, h], [DOOR.z0, DOOR.z1], "surface", { layer: 1 }),
  // Door casing in the brand blue so the opening reads at a glance.
  box([x0 - wall - 0.01, x0 + 0.03], [0, DOOR.h + 0.05], [DOOR.z0 - 0.05, DOOR.z0], "primary-strong", { layer: 1 }),
  box([x0 - wall - 0.01, x0 + 0.03], [0, DOOR.h + 0.05], [DOOR.z1, DOOR.z1 + 0.05], "primary-strong", { layer: 1 }),
  box([x0 - wall - 0.01, x0 + 0.03], [DOOR.h, DOOR.h + 0.05], [DOOR.z0, DOOR.z1], "primary-strong", { layer: 1 }),
];

// Hypervision desk: one operator, one PC, three screens.
const DESK = { x: 0.45, z: -0.75 };
export const MONITORS = [
  { at: [DESK.x - 0.8, 0, DESK.z - 0.12] as Vec3, rotY: 0.38 },
  { at: [DESK.x, 0, DESK.z - 0.24] as Vec3, rotY: 0 },
  { at: [DESK.x + 0.8, 0, DESK.z - 0.12] as Vec3, rotY: -0.38 },
];
export const SCREEN_SIZE = { w: 0.72, h: 0.42 };

function monitorBlocks(): Block[] {
  return MONITORS.flatMap((m, index) => {
    const part = (local: Vec3, size: Vec3, tone: Tone, extra: Partial<Block> = {}): Block => ({
      at: add(m.at, rotate(local, m.rotY)),
      size,
      tone,
      rotY: m.rotY,
      ...extra,
    });
    return [
      part([0, 0.786, -0.02], [0.24, 0.012, 0.16], "foreground-strong"),
      part([0, 0.93, -0.04], [0.05, 0.3, 0.035], "foreground-strong"),
      part([0, 1.14, 0], [0.76, 0.46, 0.035], "foreground-strong"),
      part([0, 1.14, 0.019], [SCREEN_SIZE.w, SCREEN_SIZE.h, 0.004], "background-dark", { kind: "screen", index }),
    ];
  });
}

const desk: Block[] = [
  box([DESK.x - 1.25, DESK.x + 1.25], [0.72, 0.77], [DESK.z - 0.45, DESK.z + 0.42], "surface"),
  box([DESK.x - 1.22, DESK.x - 1.17], [0, 0.72], [DESK.z - 0.4, DESK.z + 0.38], "hairline-strong"),
  box([DESK.x + 1.17, DESK.x + 1.22], [0, 0.72], [DESK.z - 0.4, DESK.z + 0.38], "hairline-strong"),
  box([DESK.x - 1.17, DESK.x + 1.17], [0.2, 0.68], [DESK.z - 0.36, DESK.z - 0.33], "hairline"),
  box([DESK.x - 0.28, DESK.x + 0.28], [0.77, 0.79], [DESK.z + 0.06, DESK.z + 0.22], "hairline-strong"),
  // PC tower beside the desk, its status strip lit.
  box([DESK.x + 1.32, DESK.x + 1.56], [0, 0.52], [DESK.z - 0.3, DESK.z + 0.25], "foreground-strong"),
  box([DESK.x + 1.5, DESK.x + 1.53], [0.18, 0.46], [DESK.z + 0.25, DESK.z + 0.256], "accent", { kind: "led", index: 9 }),
  // Operator chair, low enough to leave the screens in view.
  box([DESK.x - 0.24, DESK.x + 0.24], [0.44, 0.5], [DESK.z + 0.7, DESK.z + 1.16], "foreground-strong"),
  box([DESK.x - 0.22, DESK.x + 0.22], [0.5, 0.88], [DESK.z + 1.12, DESK.z + 1.17], "foreground-strong"),
  box([DESK.x - 0.03, DESK.x + 0.03], [0.05, 0.44], [DESK.z + 0.9, DESK.z + 0.96], "hairline-strong"),
  box([DESK.x - 0.26, DESK.x + 0.26], [0, 0.05], [DESK.z + 0.67, DESK.z + 1.19], "hairline-strong"),
  ...monitorBlocks(),
];

// Server rack in the back right corner, a padlock above it for secured access.
export const RACK = { x: 2.38, z: -1.86, w: 0.64, d: 0.74, h: 1.75 };
const rackFront = RACK.z + RACK.d / 2;
const rack: Block[] = [
  box([RACK.x - RACK.w / 2, RACK.x + RACK.w / 2], [0, RACK.h], [RACK.z - RACK.d / 2, rackFront], "night-panel"),
  ...Array.from({ length: 6 }, (_, i): Block[] => {
    const y = 0.28 + i * 0.22;
    return [
      box([RACK.x - 0.27, RACK.x + 0.27], [y, y + 0.15], [rackFront, rackFront + 0.015], "night"),
      box([RACK.x + 0.17, RACK.x + 0.22], [y + 0.055, y + 0.095], [rackFront + 0.015, rackFront + 0.022], i % 3 === 1 ? "glow" : "success", {
        kind: "led",
        index: i,
      }),
    ];
  }).flat(),
  ...padlock(),
];

// Padlock floating above the rack, turned to face the viewer.
function padlock(): Block[] {
  const at = (local: Vec3): Vec3 => add([RACK.x, RACK.h + 0.14, RACK.z], rotate(local, AZIMUTH));
  return [
    { at: at([0, 0.13, 0]), size: [0.32, 0.26, 0.12], tone: "primary-strong", rotY: AZIMUTH },
    { at: at([0, 0.14, 0.062]), size: [0.05, 0.09, 0.006], tone: "background-dark", rotY: AZIMUTH },
  ];
}
// Shackle: two legs and a half circle, in the padlock's plane.
export const SHACKLE: Vec3[] = (() => {
  const base = RACK.h + 0.14 + 0.26;
  const r = 0.1;
  const local: Vec3[] = [
    [-r, 0, 0],
    [-r, 0.07, 0],
    ...Array.from({ length: 11 }, (_, i): Vec3 => {
      const a = Math.PI - (i / 10) * Math.PI;
      return [Math.cos(a) * r, 0.07 + Math.sin(a) * r, 0];
    }),
    [r, 0.07, 0],
    [r, 0, 0],
  ];
  return local.map((p) => add([RACK.x, base, RACK.z], rotate(p, AZIMUTH)));
})();

// Badge reader on the wall beside the door, facing into the room.
export const READER: Vec3 = [x0 + 0.03, 1.2, DOOR.z1 + 0.32];
const reader: Block[] = [
  box([x0, x0 + 0.05], [1.1, 1.3], [READER[2] - 0.06, READER[2] + 0.06], "foreground-strong"),
  box([x0 + 0.05, x0 + 0.058], [1.215, 1.245], [READER[2] - 0.035, READER[2] + 0.035], "glow", { kind: "reader" }),
];

export const DOOR_LEAF = { hinge: [x0 - wall / 2, 0, DOOR.z0 + 0.01] as Vec3, width: DOOR.z1 - DOOR.z0 - 0.02, height: DOOR.h - 0.02, open: 1.2, still: 0.95 };

export function doorLeaf(angle: number): Block[] {
  const { hinge, width, height } = DOOR_LEAF;
  return [
    { at: add(hinge, rotate([0, height / 2, width / 2], angle)), size: [0.05, height, width], tone: "hairline", rotY: angle, layer: 1.5 },
    { at: add(hinge, rotate([0.04, 1.02, width - 0.12], angle)), size: [0.04, 0.04, 0.14], tone: "primary-strong", rotY: angle, layer: 1.5 },
  ];
}

// Bullet camera high on the back wall, aimed across the room at the door: seen side on from this view.
const CAMERA_MOUNT: Vec3 = [-1.3, 2.1, z0];
export const CAMERA_AIM: Vec3 = [x0 + 0.3, 0.55, (DOOR.z0 + DOOR.z1) / 2];
const cameraAxis = normalize([CAMERA_AIM[0] - CAMERA_MOUNT[0], CAMERA_AIM[1] - CAMERA_MOUNT[1], CAMERA_AIM[2] - CAMERA_MOUNT[2]]);
const CAMERA_SCALE = 2.2;
// Half length of the model (axis-p1465-le.glb, ~ 35 cm) once scaled, plus room for its wall bracket.
const cameraHalf = 0.175 * CAMERA_SCALE;
const along = (from: Vec3, d: number): Vec3 => add(from, [cameraAxis[0] * d, cameraAxis[1] * d, cameraAxis[2] * d]);
export const CAMERA = {
  center: along(CAMERA_MOUNT, cameraHalf + 0.06),
  yaw: Math.atan2(cameraAxis[0], cameraAxis[2]),
  tilt: Math.asin(-cameraAxis[1]),
  scale: CAMERA_SCALE,
};
export const CAMERA_LENS: Vec3 = along(CAMERA_MOUNT, cameraHalf * 2 + 0.06);
const cameraBracket = box([CAMERA_MOUNT[0] - 0.1, CAMERA_MOUNT[0] + 0.1], [CAMERA_MOUNT[1] - 0.1, CAMERA_MOUNT[1] + 0.1], [z0, z0 + 0.05], "hairline-strong");
// Drawn only in the SVG still: the WebGL scene shows the real camera model.
export const CAMERA_PROXY: Block[] = [
  { at: CAMERA.center, size: [0.2, 0.2, cameraHalf * 1.6], tone: "surface", rotY: CAMERA.yaw },
  { at: along(CAMERA_MOUNT, cameraHalf * 1.75 + 0.06), size: [0.15, 0.15, 0.04], tone: "foreground-strong", rotY: CAMERA.yaw },
];

// Cable runs along the top of the walls: field devices up to the rack, then the rack to the desk.
const TRAY = h - 0.12;
export const ACCESS_LINK: Vec3[] = [
  [x0 + 0.02, 1.32, READER[2]],
  [x0 + 0.02, TRAY, READER[2]],
  [x0 + 0.02, TRAY, z0 + 0.02],
  [RACK.x, TRAY, z0 + 0.02],
  [RACK.x, RACK.h, z0 + 0.02],
];
export const VIDEO_LINK: Vec3[] = [
  [CAMERA_MOUNT[0], CAMERA_MOUNT[1] + 0.1, z0 + 0.02],
  [CAMERA_MOUNT[0], TRAY, z0 + 0.02],
  [RACK.x, TRAY, z0 + 0.02],
  [RACK.x, RACK.h, z0 + 0.02],
];
export const FEED_LINK: Vec3[] = [
  [RACK.x - 0.2, 0.012, rackFront],
  [RACK.x - 0.2, 0.012, DESK.z - 0.02],
  [DESK.x + 1.56, 0.012, DESK.z - 0.02],
];

export const BLOCKS: Block[] = [...shell, cameraBracket, ...desk, ...rack, ...reader];

// Badge travels from the visitor's hand to the reader face.
export const BADGE = { from: [x0 + 0.62, 1.12, READER[2] + 0.05] as Vec3, to: [x0 + 0.11, 1.2, READER[2]] as Vec3, size: [0.012, 0.09, 0.14] as Vec3 };

// ---------- Still drawing (no WebGL, before the scene is ready) ----------

const FACES: { n: Vec3; c: Vec3[] }[] = [
  { n: [1, 0, 0], c: [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]] },
  { n: [-1, 0, 0], c: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]] },
  { n: [0, 1, 0], c: [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]] },
  { n: [0, -1, 0], c: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]] },
  { n: [0, 0, 1], c: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]] },
  { n: [0, 0, -1], c: [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]] },
];
const LIGHT = normalize([0.3, 0.85, 0.6]);
const W = 1600;
const H = W / VIEW_ASPECT;
const pt = (p: Vec3) => {
  const f = toFrame(p);
  return `${((f.x / 100) * W).toFixed(1)},${((f.y / 100) * H).toFixed(1)}`;
};
const unit = W / VIEW.width;

function faces(block: Block) {
  const r = block.rotY ?? 0;
  const half: Vec3 = [block.size[0] / 2, block.size[1] / 2, block.size[2] / 2];
  return FACES.flatMap((face) => {
    const n = rotate(face.n, r);
    if (dot(n, VIEW_DIR) <= 1e-3) return [];
    const points = face.c.map((c) => pt(add(block.at, rotate([c[0] * half[0], c[1] * half[1], c[2] * half[2]], r)))).join(" ");
    return [{ points, shade: 0.24 * (1 - Math.max(0, dot(n, LIGHT))) }];
  });
}

function hull(points: [number, number][]) {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const turn = (o: [number, number], a: [number, number], b: [number, number]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  const upper: [number, number][] = [];
  for (const q of p) {
    while (lower.length >= 2 && turn(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  for (const q of [...p].reverse()) {
    while (upper.length >= 2 && turn(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

// Field of view of the camera, a cone from the lens to the floor by the door.
export const CONE_RADIUS = 0.75;
function conePoints() {
  const axis = normalize([CAMERA_AIM[0] - CAMERA_LENS[0], CAMERA_AIM[1] - CAMERA_LENS[1], CAMERA_AIM[2] - CAMERA_LENS[2]]);
  const a = normalize(cross(axis, [0, 1, 0]));
  const b = cross(axis, a);
  const ring = Array.from({ length: 24 }, (_, i) => {
    const t = (i / 24) * Math.PI * 2;
    return add(CAMERA_AIM, [
      (a[0] * Math.cos(t) + b[0] * Math.sin(t)) * CONE_RADIUS,
      (a[1] * Math.cos(t) + b[1] * Math.sin(t)) * CONE_RADIUS,
      (a[2] * Math.cos(t) + b[2] * Math.sin(t)) * CONE_RADIUS,
    ]);
  });
  return hull([CAMERA_LENS, ...ring].map((p) => {
    const f = toFrame(p);
    return [(f.x / 100) * W, (f.y / 100) * H] as [number, number];
  }))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

const fill = (tone: Tone) => `rgb(var(--${tone}))`;

export function SolutionsHeroRoomSvg({ className }: { className?: string }) {
  const depth = (b: Block) => dot(b.at, VIEW_DIR);
  const ordered = [...BLOCKS, ...doorLeaf(DOOR_LEAF.still), ...CAMERA_PROXY].sort(
    (a, b) => (a.layer ?? 2) - (b.layer ?? 2) || depth(a) - depth(b),
  );
  const line = (path: Vec3[]) => path.map(pt).join(" ");

  return (
    <svg aria-hidden className={className} preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${W} ${H}`}>
      {ordered.map((block, i) =>
        faces(block).map((face, j) => {
          const tone = block.kind === "reader" ? "success" : block.tone;
          return (
            <g key={`${i}-${j}`}>
              <polygon fill={fill(tone)} points={face.points} stroke={fill(tone)} strokeLinejoin="round" strokeWidth={0.6} />
              {face.shade > 0.01 && block.kind === undefined && (
                <polygon fill={fill("background-dark")} opacity={face.shade} points={face.points} />
              )}
              {block.kind === "screen" && <polygon fill={fill("primary")} opacity={0.28} points={face.points} />}
            </g>
          );
        }),
      )}
      <polyline fill="none" points={SHACKLE.map(pt).join(" ")} stroke={fill("primary-strong")} strokeLinecap="round" strokeWidth={0.05 * unit} />
      <polygon fill={fill("primary")} opacity={0.08} points={conePoints()} />
      {[ACCESS_LINK, VIDEO_LINK, FEED_LINK].map((path, i) => (
        <polyline
          fill="none"
          key={i}
          opacity={0.55}
          points={line(path)}
          stroke={fill("primary")}
          strokeDasharray={`${0.08 * unit} ${0.06 * unit}`}
          strokeWidth={0.025 * unit}
        />
      ))}
    </svg>
  );
}
