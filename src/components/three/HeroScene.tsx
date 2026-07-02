"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { Sparkles, AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { OceanMaterial } from "./OceanShader";
import { useReducedMotion } from "@/hooks";

// Register <oceanMaterial /> in the same module that renders it, so the
// extend() side-effect is guaranteed to run before the Canvas mounts
// (importing the class alone can be tree-shaken / deferred by the bundler).
extend({ OceanMaterial });

/* ------------------------------------------------------------------ */
/*  Time-of-day moods. Each keeps a darkened palette so the overlaid    */
/*  headline stays legible — cinematic, never washed out.               */
/* ------------------------------------------------------------------ */
export type HeroMode = "nightfall" | "goldenhour" | "dawn";

type Palette = {
  deep: THREE.Color;
  shallow: THREE.Color;
  gold: THREE.Color;
  fog: THREE.Color;
  sparkle: string;
  light: THREE.Color;
};

const PALETTES: Record<HeroMode, Palette> = {
  nightfall: {
    deep: new THREE.Color("#0a1a1d"),
    shallow: new THREE.Color("#1e3a3f"),
    gold: new THREE.Color("#c9a961"),
    fog: new THREE.Color("#0a0e12"),
    sparkle: "#e4ce97",
    light: new THREE.Color("#e4ce97"),
  },
  goldenhour: {
    deep: new THREE.Color("#241a22"),
    shallow: new THREE.Color("#6b3f34"),
    gold: new THREE.Color("#f2c06e"),
    fog: new THREE.Color("#140d10"),
    sparkle: "#f4c988",
    light: new THREE.Color("#ffb877"),
  },
  dawn: {
    deep: new THREE.Color("#0c2530"),
    shallow: new THREE.Color("#235f6b"),
    gold: new THREE.Color("#cfe0d6"),
    fog: new THREE.Color("#0a141a"),
    sparkle: "#bfe3d8",
    light: new THREE.Color("#bfe3d8"),
  },
};

/* The ocean plane — lerps its shader colours toward the active mood. */
function Ocean({ mode }: { mode: HeroMode }) {
  const mat = useRef<
    THREE.ShaderMaterial & { uTime: number; uMouse: THREE.Vector2 }
  >(null);
  const { pointer } = useThree();
  const target = useRef(new THREE.Vector2());

  useFrame((_, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    const p = PALETTES[mode];
    const t = Math.min(1, delta * 2);
    u.uTime.value += delta;
    (u.uDeep.value as THREE.Color).lerp(p.deep, t);
    (u.uShallow.value as THREE.Color).lerp(p.shallow, t);
    (u.uGold.value as THREE.Color).lerp(p.gold, t);
    (u.uFog.value as THREE.Color).lerp(p.fog, t);
    target.current.lerp(pointer, 0.05);
    (u.uMouse.value as THREE.Vector2).copy(target.current);
  });

  return (
    <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.6, 0]}>
      <planeGeometry args={[42, 42, 180, 180]} />
      <oceanMaterial ref={mat} />
    </mesh>
  );
}

/* Animates the scene background + fog colour toward the active mood. */
function SceneColors({ mode }: { mode: HeroMode }) {
  const { scene } = useThree();
  useFrame((_, delta) => {
    const p = PALETTES[mode];
    const t = Math.min(1, delta * 2);
    if (!(scene.background instanceof THREE.Color)) {
      scene.background = p.fog.clone();
    } else {
      scene.background.lerp(p.fog, t);
    }
    if (scene.fog instanceof THREE.Fog) scene.fog.color.lerp(p.fog, t);
  });
  return null;
}

/* Camera that drifts subtly with the pointer for parallax. */
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (0.9 + pointer.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, -1.2, -6);
  });
  return null;
}

function Scene({ mode }: { mode: HeroMode }) {
  const p = PALETTES[mode];
  return (
    <>
      <color attach="background" args={["#0a0e12"]} />
      <fog attach="fog" args={["#0a0e12", 6, 26]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 6, 2]} intensity={0.6} color={p.sparkle} />

      <Ocean mode={mode} />
      <SceneColors mode={mode} />

      <Sparkles
        count={90}
        scale={[24, 8, 12]}
        position={[0, 1.5, -2]}
        size={3}
        speed={0.3}
        opacity={0.7}
        color={p.sparkle}
      />
      <Sparkles
        count={40}
        scale={[16, 5, 8]}
        position={[0, 0.6, 1]}
        size={5}
        speed={0.18}
        opacity={0.5}
        color={p.sparkle}
      />

      <CameraRig />
    </>
  );
}

/** The full hero canvas. Falls back to a still gradient under reduced motion. */
export function HeroScene({ mode = "nightfall" }: { mode?: HeroMode }) {
  const reduce = useReducedMotion();
  const [dpr, setDpr] = useState(1.5);

  if (reduce) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#1e3a3f_0%,#0a0e12_60%)]" />
    );
  }

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.9, 6], fov: 55, near: 0.1, far: 60 }}
      className="absolute inset-0"
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <AdaptiveDpr pixelated />
      <Scene mode={mode} />
    </Canvas>
  );
}
