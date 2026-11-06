"use client";

import dynamic from "next/dynamic";
import Image from "@/components/ui/SmartImage";
import { useLowPowerDevice, useReducedMotion, useIdle } from "@/hooks";

export type HeroMode = "nightfall" | "goldenhour" | "dawn";

// The heavy Three.js / R3F canvas lives in its own chunk and is fetched only
// on the client, only when we've decided to render it. This keeps three + drei
// out of the initial hero payload entirely.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Static hero backdrop — a darkened seascape. Server-rendered and `priority`
 * so it is the hero's LCP image, and the permanent fallback for
 * reduced-motion / low-power devices. Decorative, hence empty alt.
 */
function HeroStill() {
  return (
    <>
      <Image
        src="/images/hero-still.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* keeps the deep, legible tone even behind a bright frame */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(30,58,63,0.35)_0%,rgba(10,14,18,0.65)_60%)]" />
    </>
  );
}

/**
 * The hero background. Always paints the static still immediately; capable
 * devices then fade the live WebGL ocean in over it once the browser is idle.
 * Reduced-motion and low-power devices keep the still and never load the
 * ~R3F/three bundle at all.
 */
export function HeroScene({ mode = "nightfall" }: { mode?: HeroMode }) {
  const reduce = useReducedMotion();
  const lowPower = useLowPowerDevice();
  const useStill = reduce || lowPower;
  const idle = useIdle(!useStill);

  return (
    <div className="absolute inset-0">
      <HeroStill />
      {!useStill && idle && (
        <div className="hero-canvas-enter absolute inset-0">
          <HeroCanvas mode={mode} />
        </div>
      )}
    </div>
  );
}
