import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";

/**
 * A stylised night-ocean surface. Layered sine "Gerstner-lite" waves displace
 * the plane; the fragment shader blends deep sea toward a champagne-gold rim
 * along the wave crests and toward the horizon, with a moon-glint highlight.
 * Everything is driven by uTime, uMouse and a few tunable colour uniforms.
 */
export const OceanMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uDeep: new THREE.Color("#0a1a1d"),
    uShallow: new THREE.Color("#1e3a3f"),
    uGold: new THREE.Color("#c9a961"),
    uFog: new THREE.Color("#0a0e12"),
  },
  // vertex
  /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    varying float vElevation;
    varying vec2 vUv;
    varying vec3 vPos;

    float wave(vec2 p, vec2 dir, float freq, float speed, float amp) {
      return sin(dot(p, dir) * freq + uTime * speed) * amp;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float e = 0.0;
      e += wave(pos.xy, normalize(vec2(1.0, 0.4)), 0.6, 0.8, 0.42);
      e += wave(pos.xy, normalize(vec2(-0.6, 1.0)), 1.1, 1.1, 0.22);
      e += wave(pos.xy, normalize(vec2(0.9, -0.7)), 2.3, 1.7, 0.10);
      e += wave(pos.xy, normalize(vec2(0.2, 1.0)), 3.7, 2.3, 0.05);

      // gentle interactive swell toward the cursor
      e += sin(pos.x * 0.5 + uMouse.x * 3.0) * 0.06;

      pos.z += e;
      vElevation = e;
      vPos = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment
  /* glsl */ `
    uniform vec3 uDeep;
    uniform vec3 uShallow;
    uniform vec3 uGold;
    uniform vec3 uFog;
    uniform float uTime;
    varying float vElevation;
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
      float h = smoothstep(-0.6, 0.7, vElevation);
      vec3 col = mix(uDeep, uShallow, h);

      // champagne foam on the crests
      float crest = smoothstep(0.45, 0.75, vElevation);
      col = mix(col, uGold, crest * 0.55);

      // moon-glint shimmer travelling across the surface
      float glint = sin((vPos.x + vPos.y) * 3.0 + uTime * 1.5) * 0.5 + 0.5;
      glint = pow(glint, 6.0);
      col += uGold * glint * 0.12;

      // distance fog toward the horizon (far edge of the plane)
      float depth = smoothstep(0.0, 0.85, 1.0 - vUv.y);
      col = mix(col, uFog, depth * 0.9);

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ OceanMaterial });

// Register <oceanMaterial /> as a typed R3F intrinsic element (v9 pattern).
declare module "@react-three/fiber" {
  interface ThreeElements {
    oceanMaterial: ThreeElement<typeof OceanMaterial>;
  }
}
