"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Star, Cloud, Award, Moon, Sunset, Sunrise } from "lucide-react";
import { BRAND } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { AnimatedChars } from "@/components/ui/AnimatedText";
import { HeroBookingWidget } from "@/components/booking/HeroBookingWidget";
import type { HeroMode } from "@/components/three/HeroScene";
import { cn } from "@/lib/utils";

// R3F cannot render on the server — load the canvas client-only.
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const EASE = [0.22, 1, 0.36, 1] as const;

const MOODS: { id: HeroMode; label: string; icon: typeof Moon; weather: string }[] = [
  { id: "dawn", label: "Dawn", icon: Sunrise, weather: "21°C · First light · Still air" },
  { id: "goldenhour", label: "Golden Hour", icon: Sunset, weather: "26°C · Golden hour · Calm seas" },
  { id: "nightfall", label: "Nightfall", icon: Moon, weather: "22°C · Clear night · Trade winds 8kn" },
];

export function Hero() {
  const [mode, setMode] = useState<HeroMode>("nightfall");
  const weather = MOODS.find((m) => m.id === mode)?.weather ?? MOODS[2].weather;

  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      {/* WebGL ocean */}
      <div className="absolute inset-0">
        <HeroScene mode={mode} />
      </div>

      {/* cinematic gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

      {/* floating meta — top */}
      <div className="absolute inset-x-0 top-28 z-20 mx-auto flex max-w-[100rem] items-center justify-between px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-sand/70 md:flex"
        >
          <Cloud size={15} className="text-gold" />
          <motion.span key={weather} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            {weather}
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="ml-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand/70"
        >
          <span className="flex text-gold">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </span>
          <span className="hidden sm:inline">5.0 · 2,140 reviews</span>
        </motion.div>
      </div>

      {/* headline */}
      <div className="relative z-10 mx-auto flex h-full max-w-[100rem] flex-col justify-center px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: EASE }}
          className="eyebrow mb-8 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold" />
          {BRAND.location} · Est. {BRAND.established}
        </motion.p>

        <h1 className="max-w-5xl font-serif text-[15vw] font-light leading-[0.86] tracking-[-0.02em] text-sand sm:text-[12vw] lg:text-[9.5vw]">
          <span className="block overflow-hidden">
            <AnimatedChars text="Where the" delay={0.7} />
          </span>
          <span className="block overflow-hidden text-gold-gradient">
            <AnimatedChars text="horizon" delay={1.0} />
          </span>
          <span className="block overflow-hidden">
            <AnimatedChars text="belongs to you." delay={1.25} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1, ease: EASE }}
          className="mt-10 max-w-md text-base leading-relaxed text-sand/75"
        >
          A private island of thirty-four residences, held between the reef and
          the open Pacific — where the only schedule is the tide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/booking" variant="gold" size="lg" cursorLabel="Reserve">
            Reserve your stay
          </Button>
          <Button href="/about" variant="ghost" size="lg">
            Discover the reserve
          </Button>
        </motion.div>
      </div>

      {/* booking widget */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 1.1, ease: EASE }}
        className="absolute inset-x-0 bottom-10 z-20 mx-auto max-w-[100rem] px-6 md:px-10"
      >
        <HeroBookingWidget />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-stone-light">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-gold" />
        </motion.span>
      </motion.div>

      {/* time-of-day mood rail */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 md:flex md:right-8"
      >
        <span className="mb-2 rotate-180 text-center text-[9px] uppercase tracking-[0.28em] text-stone-light [writing-mode:vertical-rl]">
          Time of day
        </span>
        {MOODS.map((m) => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              data-cursor={m.label}
              aria-pressed={active}
              aria-label={`Set hero mood to ${m.label}`}
              className={cn(
                "group flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500",
                active
                  ? "border-gold bg-gold text-ink shadow-gold"
                  : "border-white/15 bg-ink-800/40 text-sand/70 hover:border-gold/60 hover:text-gold"
              )}
            >
              <Icon size={16} />
            </button>
          );
        })}
      </motion.div>

      {/* award ribbon */}
      <Link
        href="/about#awards"
        className="group absolute bottom-40 right-6 z-20 hidden items-center gap-3 rounded-full border border-gold/25 bg-ink-800/50 px-5 py-3 backdrop-blur-md transition-colors hover:border-gold/60 xl:flex"
      >
        <Award size={16} className="text-gold" />
        <span className="text-[10px] uppercase leading-tight tracking-[0.18em] text-sand/80">
          World&apos;s Best Resort
          <br />
          <span className="text-stone-light">Condé Nast · 2025</span>
        </span>
      </Link>
    </section>
  );
}
