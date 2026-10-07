"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Colours are converted to linear by THREE.Color; shaders work in linear space and
// the OutputPass applies tone mapping + sRGB at the end.
const BACKGROUND = new THREE.Color("#0b1220");
const PRIMARY = new THREE.Color("#36a4d9");
const GLOW = new THREE.Color("#81cff5");
const ALERT = new THREE.Color("#ef4444");
const SODIUM = new THREE.Color("#ffb066");
const FOG = { near: 14, far: 42 };
const CENTER_HEIGHT = 4.2;
const FRAME_SHIFT = 5.5;
// Seconds for the activation wave to travel from the control centre to the outskirts.
const WAVE_DURATION = 3.6;
const AVENUE_EVERY = 4;
const TEXTURES = {
  albedo: "/novadis/textures/city/facade-albedo.webp",
  emissive: "/novadis/textures/city/facade-emissive.webp",
  roof: "/novadis/textures/city/roof.webp",
  asphalt: "/novadis/textures/city/asphalt.webp",
};

function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Building = { x: number; z: number; w: number; d: number; h: number };
type City = { buildings: Building[]; half: number; avenues: number[] };

function generateCity(size: number): City {
  const random = seeded(7);
  const buildings: Building[] = [];
  const half = size / 2;
  const avenues: number[] = [];
  for (let i = 0; i < size; i++) {
    if (i % AVENUE_EVERY === 0) avenues.push(i - half + 0.5);
    for (let j = 0; j < size; j++) {
      if (i % AVENUE_EVERY === 0 || j % AVENUE_EVERY === 0) continue;
      const x = i - half + 0.5;
      const z = j - half + 0.5;
      const dist = Math.hypot(x, z);
      if (dist < 2.2 || random() < 0.12) continue;
      const downtown = Math.max(0, 1 - dist / (half * 0.9));
      const h = 0.25 + random() * 0.6 + downtown * downtown * (1.2 + random() * 2.6);
      buildings.push({ x, z, w: 0.5 + random() * 0.32, d: 0.5 + random() * 0.32, h });
    }
  }
  return { buildings, half, avenues };
}

const FOG_GLSL = /* glsl */ `
  uniform vec3 uBackground;
  uniform float uFogNear;
  uniform float uFogFar;
  vec3 applyFog(vec3 color, float depth) {
    return mix(color, uBackground, smoothstep(uFogNear, uFogFar, depth));
  }
`;

const fogUniforms = () => ({
  uBackground: { value: BACKGROUND },
  uFogNear: { value: FOG.near },
  uFogFar: { value: FOG.far },
});

const BUILDING_VERTEX = /* glsl */ `
  attribute float aSeed;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vSeed;
  varying float vFogDepth;
  void main() {
    vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormal = normalize(mat3(modelMatrix * instanceMatrix) * normal);
    vSeed = aSeed;
    vec4 mv = viewMatrix * world;
    vFogDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const BUILDING_FRAGMENT = /* glsl */ `
  uniform sampler2D uAlbedo;
  uniform sampler2D uEmissive;
  uniform sampler2D uRoof;
  uniform vec3 uWarm;
  uniform vec3 uCool;
  uniform vec3 uNeon;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vSeed;
  varying float vFogDepth;
  ${FOG_GLSL}

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  // Windows per metre (x) and floors per metre (y) for each facade style of the atlas.
  vec2 cellDensity(float style) {
    if (style < 0.5) return vec2(5.0, 8.5);
    if (style < 1.5) return vec2(6.5, 9.0);
    if (style < 2.5) return vec2(7.5, 10.0);
    return vec2(4.5, 8.0);
  }

  void main() {
    vec3 n = normalize(vNormal);
    float style = floor(fract(vSeed * 7.13) * 4.0);
    // Night lighting: cool moonlight from above, warm bounce from the street below.
    vec3 moon = vec3(0.10, 0.13, 0.20) * (0.55 + 0.45 * max(dot(n, normalize(vec3(0.3, 0.9, 0.2))), 0.0));
    vec3 bounce = uWarm * 0.22 * exp(-vWorld.y * 2.2);
    vec3 color;

    if (abs(n.y) < 0.5) {
      float along = dot(vWorld.xz, vec2(-n.z, n.x));
      vec2 cell = vec2(along, vWorld.y) * cellDensity(style);
      vec2 id = floor(cell);
      vec2 f = fract(cell);
      float variant = floor(hash(id + vSeed * 31.0) * 4.0);
      vec2 atlas = vec2((variant + f.x) / 4.0, 1.0 - (style + 1.0 - f.y) / 4.0);
      // Gradients from the continuous coordinate avoid mip seams at cell borders.
      vec2 dx = dFdx(cell) / 4.0;
      vec2 dy = dFdy(cell) / 4.0;
      vec3 albedo = textureGrad(uAlbedo, atlas, dx, dy).rgb;
      float glow = textureGrad(uEmissive, atlas, dx, dy).r;

      // Offices light whole floors, homes light single windows.
      float floorOn = style < 0.5 ? step(0.45, hash(vec2(id.y, vSeed * 91.0))) : 1.0;
      float windowOn = step(style < 0.5 ? 0.3 : 0.58, hash(id * 1.7 + vSeed * 13.0)) * floorOn;
      float tintPick = hash(id * 3.1 + vSeed);
      vec3 tint = tintPick > 0.82 ? uCool : (tintPick > 0.74 ? uNeon : uWarm);
      float brightness = 0.6 + 0.8 * hash(id * 0.7 + 4.0);

      // Shop fronts along the ground floor of some buildings.
      float shop = (1.0 - smoothstep(0.1, 0.13, vWorld.y)) * step(0.55, fract(vSeed * 3.7));

      color = albedo * (moon + bounce);
      color += glow * windowOn * tint * brightness * 2.2;
      color += shop * uWarm * 1.4 * (0.6 + 0.4 * hash(vec2(floor(along * 3.0), vSeed)));
    } else {
      vec3 roof = texture2D(uRoof, vWorld.xz * 0.7).rgb;
      color = roof * (moon * 1.4 + vec3(0.01, 0.015, 0.025));
    }

    gl_FragColor = vec4(applyFog(color, vFogDepth), 1.0);
  }
`;

function Buildings({ city, textures }: { city: City; textures: Record<keyof typeof TEXTURES, THREE.Texture> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { buildings } = city;
  const geometry = useMemo(() => {
    const g = new THREE.BoxGeometry(1, 1, 1);
    g.translate(0, 0.5, 0);
    g.setAttribute("aSeed", new THREE.InstancedBufferAttribute(new Float32Array(buildings.map((_, i) => (i * 0.618034) % 1)), 1));
    return g;
  }, [buildings]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: BUILDING_VERTEX,
        fragmentShader: BUILDING_FRAGMENT,
        uniforms: {
          ...fogUniforms(),
          uAlbedo: { value: textures.albedo },
          uEmissive: { value: textures.emissive },
          uRoof: { value: textures.roof },
          uWarm: { value: new THREE.Color("#ffc58a") },
          uCool: { value: new THREE.Color("#cfe6ff") },
          uNeon: { value: new THREE.Color("#7fd3ff") },
        },
      }),
    [textures],
  );

  useEffect(() => {
    if (!mesh.current) return;
    const m = new THREE.Matrix4();
    buildings.forEach((b, i) => {
      m.makeScale(b.w, b.h, b.d).setPosition(b.x, 0, b.z);
      mesh.current!.setMatrixAt(i, m);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [buildings]);

  return <instancedMesh args={[geometry, material, buildings.length]} frustumCulled={false} ref={mesh} />;
}

function RooftopUnits({ city }: { city: City }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const units = useMemo(() => {
    const random = seeded(51);
    const list: { x: number; y: number; z: number; s: number }[] = [];
    city.buildings.forEach((b) => {
      if (random() < 0.35) return;
      const count = 1 + Math.floor(random() * 3);
      for (let k = 0; k < count; k++) {
        list.push({ x: b.x + (random() - 0.5) * b.w * 0.6, y: b.h, z: b.z + (random() - 0.5) * b.d * 0.6, s: 0.06 + random() * 0.08 });
      }
    });
    return list;
  }, [city]);

  useEffect(() => {
    if (!mesh.current) return;
    const m = new THREE.Matrix4();
    units.forEach((u, i) => {
      m.makeScale(u.s * 1.4, u.s * 0.7, u.s).setPosition(u.x, u.y + u.s * 0.35, u.z);
      mesh.current!.setMatrixAt(i, m);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [units]);

  return (
    <instancedMesh args={[undefined, undefined, units.length]} frustumCulled={false} ref={mesh}>
      <boxGeometry />
      <meshStandardMaterial color="#2a3240" metalness={0.5} roughness={0.6} />
    </instancedMesh>
  );
}

const GROUND_VERTEX = /* glsl */ `
  varying vec3 vWorld;
  varying float vFogDepth;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mv = viewMatrix * world;
    vFogDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const GROUND_FRAGMENT = /* glsl */ `
  uniform sampler2D uAsphalt;
  uniform vec3 uSodium;
  uniform float uOrigin;
  uniform float uSpacing;
  varying vec3 vWorld;
  varying float vFogDepth;
  ${FOG_GLSL}

  // Distance to the nearest avenue centre line along one axis.
  float avenueDistance(float v) {
    float t = (v - uOrigin) / uSpacing;
    return abs(t - floor(t + 0.5)) * uSpacing;
  }

  // Sodium light pools from lamps on both kerbs, every metre along the avenue.
  float lampPools(float across, float along) {
    float alongD = fract(along) - 0.5;
    float a = across - 0.38;
    float b = across + 0.38;
    return exp(-(a * a + alongD * alongD) * 22.0) + exp(-(b * b + alongD * alongD) * 22.0);
  }

  void main() {
    vec3 asphalt = texture2D(uAsphalt, vWorld.xz * 0.35).rgb;
    float dx = avenueDistance(vWorld.x);
    float dz = avenueDistance(vWorld.z);
    float onAvenue = max(step(dx, 0.5), step(dz, 0.5));

    vec3 color = asphalt * mix(0.05, 0.11, onAvenue);
    // Dashed centre lines.
    float dashX = step(dx, 0.015) * step(0.5, fract(vWorld.z * 2.0));
    float dashZ = step(dz, 0.015) * step(0.5, fract(vWorld.x * 2.0));
    color += vec3(0.25) * max(dashX, dashZ) * 0.35;

    float signedX = (vWorld.x - uOrigin) / uSpacing;
    float signedZ = (vWorld.z - uOrigin) / uSpacing;
    float acrossX = (signedX - floor(signedX + 0.5)) * uSpacing;
    float acrossZ = (signedZ - floor(signedZ + 0.5)) * uSpacing;
    float pools = step(dx, 0.6) * lampPools(acrossX, vWorld.z) + step(dz, 0.6) * lampPools(acrossZ, vWorld.x);
    color += uSodium * pools * 0.35;

    // Faint orange haze over the city centre.
    color += uSodium * 0.025 * exp(-length(vWorld.xz) * 0.12);

    gl_FragColor = vec4(applyFog(color, vFogDepth), 1.0);
  }
`;

function Ground({ city, asphalt }: { city: City; asphalt: THREE.Texture }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: GROUND_VERTEX,
        fragmentShader: GROUND_FRAGMENT,
        uniforms: {
          ...fogUniforms(),
          uAsphalt: { value: asphalt },
          uSodium: { value: SODIUM },
          uOrigin: { value: city.avenues[0] },
          uSpacing: { value: AVENUE_EVERY },
        },
      }),
    [asphalt, city],
  );
  return (
    <mesh material={material} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[90, 90]} />
    </mesh>
  );
}

const SPRITE_VERTEX = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uScale;
  varying vec3 vColor;
  varying float vFogDepth;
  void main() {
    vec4 mv = viewMatrix * modelMatrix * vec4(position, 1.0);
    vColor = aColor;
    vFogDepth = -mv.z;
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const SPRITE_FRAGMENT = /* glsl */ `
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vColor;
  varying float vFogDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    float fade = 1.0 - smoothstep(uFogNear, uFogFar, vFogDepth) * 0.85;
    gl_FragColor = vec4(vColor * (a + smoothstep(0.15, 0.0, d)), a * fade);
  }
`;

function useSpriteMaterial() {
  const { gl } = useThree();
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: SPRITE_VERTEX,
        fragmentShader: SPRITE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uScale: { value: gl.getPixelRatio() * 30 }, uFogNear: { value: FOG.near }, uFogFar: { value: FOG.far } },
      }),
    [gl],
  );
}

function StreetLights({ city }: { city: City }) {
  const material = useSpriteMaterial();
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const extent = city.half - 0.5;
    city.avenues.forEach((a) => {
      for (let t = -extent; t <= extent; t += 1) {
        for (const side of [-0.38, 0.38]) {
          positions.push(a + side, 0.14, t + 0.5, t + 0.5, 0.14, a + side);
        }
      }
    });
    const count = positions.length / 3;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.Float32BufferAttribute(Array.from({ length: count }, () => [SODIUM.r * 1.6, SODIUM.g * 1.6, SODIUM.b * 1.6]).flat(), 3));
    g.setAttribute("aSize", new THREE.Float32BufferAttribute(new Array(count).fill(7), 1));
    return g;
  }, [city]);
  return <points frustumCulled={false} geometry={geometry} material={material} />;
}

type Car = { avenue: number; axis: 0 | 1; lane: number; dir: number; speed: number; offset: number };

function Traffic({ city, compact }: { city: City; compact: boolean }) {
  const material = useSpriteMaterial();
  const cars = useMemo<Car[]>(() => {
    const random = seeded(77);
    return Array.from({ length: compact ? 140 : 260 }, () => {
      const dir = random() < 0.5 ? 1 : -1;
      return {
        avenue: city.avenues[Math.floor(random() * city.avenues.length)],
        axis: random() < 0.5 ? 0 : 1,
        lane: dir * (0.1 + random() * 0.12),
        dir,
        speed: 0.5 + random() * 0.9,
        offset: random() * city.half * 2,
      };
    });
  }, [city, compact]);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(cars.length * 3), 3));
    // Headlights one way, tail lights the other: the classic long-exposure look from above.
    g.setAttribute("aColor", new THREE.Float32BufferAttribute(cars.flatMap((c) => (c.dir > 0 ? [1.6, 1.55, 1.4] : [1.8, 0.12, 0.08])), 3));
    g.setAttribute("aSize", new THREE.Float32BufferAttribute(cars.map((c) => (c.dir > 0 ? 6 : 5)), 1));
    return g;
  }, [cars]);

  useFrame(({ clock }) => {
    const positions = geometry.attributes.position as THREE.BufferAttribute;
    const span = city.half * 2;
    cars.forEach((car, i) => {
      const travelled = (car.offset + clock.elapsedTime * car.speed * car.dir) % span;
      const along = ((travelled + span) % span) - city.half;
      const across = car.avenue + car.lane;
      if (car.axis === 0) positions.setXYZ(i, across, 0.04, along);
      else positions.setXYZ(i, along, 0.04, across);
    });
    positions.needsUpdate = true;
  });

  return <points frustumCulled={false} geometry={geometry} material={material} />;
}

function AviationLights({ city, time }: { city: City; time: { current: number } }) {
  const material = useRef<THREE.PointsMaterial>(null);
  const geometry = useMemo(() => {
    const tops = city.buildings.filter((b) => b.h > 2.4).flatMap((b) => [b.x, b.h + 0.06, b.z]);
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(tops, 3));
  }, [city]);
  useFrame(() => {
    if (material.current) material.current.opacity = Math.sin(time.current * 2.4) > 0.3 ? 1 : 0.1;
  });
  return (
    <points frustumCulled={false} geometry={geometry}>
      <pointsMaterial blending={THREE.AdditiveBlending} color={ALERT} depthWrite={false} ref={material} size={0.09} sizeAttenuation transparent />
    </points>
  );
}

const DEVICE_VERTEX = /* glsl */ `
  attribute float aDelay;
  attribute float aAlert;
  uniform float uTime;
  uniform float uScale;
  uniform float uWaveEnd;
  varying float vIntensity;
  varying float vAlert;
  varying float vFogDepth;
  void main() {
    vec4 mv = viewMatrix * modelMatrix * vec4(position, 1.0);
    float on = smoothstep(aDelay, aDelay + 0.35, uTime);
    // Brief flash as each device comes online, then a slow individual breathing.
    float flash = exp(-max(uTime - aDelay, 0.0) * 4.0) * on;
    float breathe = 0.75 + 0.25 * sin(uTime * 1.6 + aDelay * 9.0);
    float alertBlink = aAlert * step(0.0, sin(uTime * 7.0)) * step(uWaveEnd, uTime);
    vIntensity = on * (breathe + flash * 2.5) + alertBlink * 1.5;
    vAlert = aAlert * step(uWaveEnd, uTime);
    vFogDepth = -mv.z;
    gl_PointSize = (12.0 + flash * 34.0 + alertBlink * 30.0) * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const DEVICE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAlert;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vIntensity;
  varying float vAlert;
  varying float vFogDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.18, 0.0, d);
    vec3 color = mix(uColor, uAlert, vAlert);
    float fog = smoothstep(uFogNear, uFogFar, vFogDepth);
    float a = (glow * 0.45 + core * 1.2) * vIntensity * (1.0 - fog * 0.9);
    gl_FragColor = vec4(color * (0.8 + core * 1.5), a);
  }
`;

function Devices({ city, time }: { city: City; time: { current: number } }) {
  const { gl } = useThree();
  const geometry = useMemo(() => {
    const random = seeded(21);
    const positions: number[] = [];
    const delays: number[] = [];
    const alerts: number[] = [];
    const maxDist = Math.max(...city.buildings.map((b) => Math.hypot(b.x, b.z)));
    city.buildings.forEach((b) => {
      const count = 1 + Math.floor(random() * 2);
      for (let k = 0; k < count; k++) {
        const onRoof = random() < 0.5;
        const sx = (random() < 0.5 ? -1 : 1) * b.w * 0.5;
        const sz = (random() < 0.5 ? -1 : 1) * b.d * 0.5;
        positions.push(b.x + sx, onRoof ? b.h + 0.04 : 0.08 + random() * Math.min(b.h, 0.5), b.z + sz);
        delays.push(0.4 + (Math.hypot(b.x, b.z) / maxDist) * WAVE_DURATION + random() * 0.25);
        alerts.push(random() < 0.006 ? 1 : 0);
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute("aDelay", new THREE.Float32BufferAttribute(delays, 1));
    g.setAttribute("aAlert", new THREE.Float32BufferAttribute(alerts, 1));
    return g;
  }, [city]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: DEVICE_VERTEX,
        fragmentShader: DEVICE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uScale: { value: gl.getPixelRatio() * 30 },
          uWaveEnd: { value: WAVE_DURATION + 1.2 },
          uColor: { value: GLOW },
          uAlert: { value: ALERT },
          uFogNear: { value: FOG.near },
          uFogFar: { value: FOG.far },
        },
      }),
    [gl],
  );

  useFrame(() => {
    material.uniforms.uTime.value = time.current;
  });

  return <points frustumCulled={false} geometry={geometry} material={material} />;
}

const RADAR_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    float wave = fract(uTime * 0.12);
    float ring = smoothstep(0.03, 0.0, abs(r - wave)) * (1.0 - wave);
    float angle = atan(p.y, p.x);
    float sweep = pow(fract((angle / 6.2831853) - uTime * 0.08), 18.0) * smoothstep(1.0, 0.2, r);
    float a = (ring * 0.7 + sweep * 0.45) * smoothstep(1.0, 0.85, r);
    gl_FragColor = vec4(uColor, a);
  }
`;

function Radar({ time }: { time: { current: number } }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: RADAR_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: PRIMARY } },
      }),
    [],
  );
  useFrame(() => {
    material.uniforms.uTime.value = time.current;
  });
  return (
    <mesh material={material} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30]} />
    </mesh>
  );
}

function ControlCenter({ time }: { time: { current: number } }) {
  const ring = useRef<THREE.Mesh>(null);
  const beacon = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (ring.current) ring.current.rotation.z = time.current * 0.6;
    if (beacon.current) beacon.current.opacity = 0.6 + 0.4 * Math.sin(time.current * 3);
  });
  return (
    <group>
      <mesh position={[0, CENTER_HEIGHT / 2, 0]}>
        <boxGeometry args={[1.1, CENTER_HEIGHT, 1.1]} />
        <meshStandardMaterial color="#0d1830" emissive={PRIMARY} emissiveIntensity={0.12} metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Lit glass fins running up the tower. */}
      {[-0.42, 0, 0.42].map((x) =>
        [0.556, -0.556].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, CENTER_HEIGHT / 2, z]}>
            <boxGeometry args={[0.04, CENTER_HEIGHT * 0.96, 0.01]} />
            <meshBasicMaterial color={GLOW} toneMapped={false} />
          </mesh>
        )),
      )}
      <mesh position={[0, CENTER_HEIGHT + 0.35, 0]} ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.025, 8, 64]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[0, CENTER_HEIGHT + 0.12, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={GLOW} ref={beacon} toneMapped={false} transparent />
      </mesh>
      <pointLight color={PRIMARY} distance={9} intensity={30} position={[0, CENTER_HEIGHT + 0.6, 0]} />
    </group>
  );
}

type Link = { curve: THREE.QuadraticBezierCurve3; delay: number };

function Links({ city, time }: { city: City; time: { current: number } }) {
  const links = useMemo<Link[]>(() => {
    const random = seeded(99);
    const maxDist = Math.max(...city.buildings.map((b) => Math.hypot(b.x, b.z)));
    const candidates = city.buildings.filter((b) => Math.hypot(b.x, b.z) > 4 && b.h > 0.6);
    const picked: Building[] = [];
    while (picked.length < 18 && candidates.length) {
      picked.push(candidates.splice(Math.floor(random() * candidates.length), 1)[0]);
    }
    const top = new THREE.Vector3(0, CENTER_HEIGHT + 0.35, 0);
    return picked.map((b) => {
      const start = new THREE.Vector3(b.x, b.h + 0.05, b.z);
      const dist = start.distanceTo(top);
      const mid = start.clone().lerp(top, 0.5).add(new THREE.Vector3(0, 1.2 + dist * 0.22, 0));
      return { curve: new THREE.QuadraticBezierCurve3(start, mid, top), delay: 0.6 + (Math.hypot(b.x, b.z) / maxDist) * WAVE_DURATION + 0.4 };
    });
  }, [city]);

  const lines = useMemo(
    () =>
      links.map(({ curve }) => {
        const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
        const m = new THREE.LineBasicMaterial({ color: PRIMARY, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
        return new THREE.Line(g, m);
      }),
    [links],
  );

  const pulses = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(links.length * 2 * 3), 3));
    return g;
  }, [links]);
  const pulsePoint = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const t = time.current;
    const positions = pulses.attributes.position as THREE.BufferAttribute;
    links.forEach((link, i) => {
      const reveal = THREE.MathUtils.clamp((t - link.delay) / 0.8, 0, 1);
      (lines[i].material as THREE.LineBasicMaterial).opacity = reveal * 0.55;
      lines[i].geometry.setDrawRange(0, Math.floor(reveal * 49));
      for (let k = 0; k < 2; k++) {
        const u = reveal < 1 ? 0 : (t * 0.35 + k * 0.5 + i * 0.13) % 1;
        link.curve.getPoint(u, pulsePoint);
        positions.setXYZ(i * 2 + k, pulsePoint.x, reveal < 1 ? -10 : pulsePoint.y, pulsePoint.z);
      }
    });
    positions.needsUpdate = true;
  });

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
      <points frustumCulled={false} geometry={pulses}>
        <pointsMaterial blending={THREE.AdditiveBlending} color="#d6f1ff" depthWrite={false} size={0.12} sizeAttenuation transparent />
      </points>
    </group>
  );
}

// Bloom from three's own examples (no extra package): bright lights bleed like at night.
function Bloom({ compact }: { compact: boolean }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useMemo(() => {
    const c = new EffectComposer(gl);
    c.addPass(new RenderPass(scene, camera));
    c.addPass(new UnrealBloomPass(new THREE.Vector2(size.width, size.height), compact ? 0.5 : 0.62, 0.45, 0.72));
    c.addPass(new OutputPass());
    return c;
    // Size changes are handled by setSize below; rebuilding on resize would drop the passes.
  }, [gl, scene, camera, compact]);

  useEffect(() => {
    composer.setPixelRatio(gl.getPixelRatio());
    composer.setSize(size.width, size.height);
  }, [composer, gl, size]);
  useEffect(() => () => composer.dispose(), [composer]);

  useFrame((_, delta) => composer.render(delta), 1);
  return null;
}

type CameraRigProps = { progress: MotionValue<number>; time: { current: number }; compact: boolean };

function CameraRig({ progress, time, compact }: CameraRigProps) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const far = useMemo(() => new THREE.Vector3(), []);
  const near = useMemo(() => new THREE.Vector3(2.4, 3.2, 6.2), []);

  useFrame((_, delta) => {
    time.current += delta;
    // Slow orbit around the city, nudged by the pointer; scrolling dives toward the control centre.
    const angle = 0.65 + Math.sin(time.current * 0.05) * 0.25 + pointer.x * 0.08;
    const radius = compact ? 23 : 19;
    far.set(Math.sin(angle) * radius, 10.5 + pointer.y * 0.8, Math.cos(angle) * radius);
    const k = THREE.MathUtils.smoothstep(progress.get(), 0, 1);
    desired.lerpVectors(far, near, k);
    camera.position.lerp(desired, 1 - Math.exp(-delta * 3));
    // On narrow screens the text spans the full width: keep the city centred instead.
    right.set(Math.cos(angle), 0, -Math.sin(angle)).multiplyScalar(compact ? 0 : -FRAME_SHIFT * (1 - k));
    target.set(0, 1 + k * 1.6, 0).add(right);
    camera.lookAt(target);
  });
  return null;
}

function Scene({ progress, compact, onReady }: CityHeroSceneProps) {
  const city = useMemo(() => generateCity(compact ? 22 : 30), [compact]);
  const time = useRef(0);
  const textures = useTexture(TEXTURES);

  useEffect(() => {
    textures.albedo.colorSpace = THREE.SRGBColorSpace;
    textures.roof.colorSpace = THREE.SRGBColorSpace;
    textures.asphalt.colorSpace = THREE.SRGBColorSpace;
    for (const key of ["roof", "asphalt"] as const) {
      textures[key].wrapS = textures[key].wrapT = THREE.RepeatWrapping;
      textures[key].anisotropy = 4;
      textures[key].needsUpdate = true;
    }
    textures.albedo.needsUpdate = true;
    onReady();
  }, [textures, onReady]);

  return (
    <>
      <Ground asphalt={textures.asphalt} city={city} />
      <Radar time={time} />
      <Buildings city={city} textures={textures} />
      <RooftopUnits city={city} />
      <StreetLights city={city} />
      <Traffic city={city} compact={compact} />
      <AviationLights city={city} time={time} />
      <ControlCenter time={time} />
      <Devices city={city} time={time} />
      <Links city={city} time={time} />
      <CameraRig compact={compact} progress={progress} time={time} />
      <Bloom compact={compact} />
    </>
  );
}

type CityHeroSceneProps = {
  progress: MotionValue<number>;
  compact: boolean;
  onReady: () => void;
};

export function CityHeroScene(props: CityHeroSceneProps) {
  return (
    <Canvas
      camera={{ fov: 40, position: [12, 10.5, 14] }}
      dpr={[1, props.compact ? 1.4 : 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color args={[BACKGROUND]} attach="background" />
      <fog args={[BACKGROUND, FOG.near, FOG.far]} attach="fog" />
      <ambientLight intensity={0.35} />
      <directionalLight color="#9fb8ff" intensity={0.5} position={[6, 10, 4]} />
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}

useTexture.preload(Object.values(TEXTURES));
