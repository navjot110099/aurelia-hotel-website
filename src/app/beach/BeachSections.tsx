"use client";

import Image from "@/components/ui/SmartImage";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading, SectionLabel, GoldLine, Marquee } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ExperienceCard } from "@/components/cards/ExperienceCard";

/* ------------------------------------------------------------------ */
/*  Intro                                                              */
/* ------------------------------------------------------------------ */

export function BeachIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section className="relative bg-ink px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <SectionLabel index="01">A Mile of White Sand</SectionLabel>
          <AnimatedText
            as="h2"
            text="One beach, kept for the island's guests alone."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
          <Reveal delay={0.15} className="mt-8 max-w-md text-base leading-relaxed text-stone-light">
            <p>
              On the reserve&apos;s leeward shore lies a mile of powder-fine sand
              the colour of moonlight, sheltered by the reef and shaded by a stand
              of coconut palms. There are no crowds, no vendors, no hours — only a
              butler who appears with iced towels and a shaded cabana already set
              to your name.
            </p>
          </Reveal>
          <div className="mt-10">
            <GoldLine />
          </div>
        </div>

        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="/images/beach-first-light.jpg"
              alt="Aurelia's private white-sand beach at first light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Cabanas                                                            */
/* ------------------------------------------------------------------ */

const CABANAS = [
  {
    image: "/images/ocean-lagoon-room.jpg",
    kind: "Beachfront",
    name: "The Palm Cabana",
    description: "A shaded daybed for two beneath the coconut palms, with a private butler call, chilled linens and an all-day sea view.",
  },
  {
    image: "/images/ocean-room-interior.jpg",
    kind: "At the Waterline",
    name: "The Tidal Pavilion",
    description: "A canopied lounge set where the lagoon meets the sand, with its own plunge step, sun deck and a menu from Coralline.",
  },
  {
    image: "/images/coralline-suite.jpg",
    kind: "Reserved by Day",
    name: "The Reef Retreat",
    description: "The beach's most private corner — a walled cabana with an outdoor shower, a hammock in the palms and a dedicated attendant.",
  },
];

export function Cabanas() {
  return (
    <section id="cabanas" className="relative scroll-mt-24 bg-ink px-6 pb-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <SectionHeading eyebrow="Your Place in the Shade" index="02" title="Cabanas" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {CABANAS.map((c, i) => (
            <ExperienceCard
              key={c.name}
              image={c.image}
              kind={c.kind}
              name={c.name}
              description={c.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Water sports                                                       */
/* ------------------------------------------------------------------ */

const WATER_SPORTS = [
  { name: "Paddleboarding", note: "Glide the mirror-still lagoon at dawn." },
  { name: "Sea Kayaking", note: "Trace the reef line to hidden coves." },
  { name: "Hobie Sailing", note: "Catch the trade winds on a nimble catamaran." },
  { name: "Foil Surfing", note: "Rise above the water with a private coach." },
  { name: "Snorkel Safari", note: "Drift the coral shallows with a guide." },
  { name: "Big-Game Fishing", note: "Chase marlin from the reserve's sport boat." },
];

export function WaterSports() {
  return (
    <section id="water-sports" className="relative scroll-mt-24 bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          eyebrow="From the Shore"
          index="03"
          title="On, and under, the water"
          className="max-w-2xl"
        />
        <Reveal delay={0.1} className="mt-6 max-w-xl text-sm leading-relaxed text-sand/55">
          <p>
            Non-motorised watersports are yours throughout your stay. Guided and
            motorised adventures are arranged by the beach team at the raise of a
            hand.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-x-16 sm:grid-cols-2" stagger={0.08}>
          {WATER_SPORTS.map((w) => (
            <RevealItem key={w.name}>
              <div className="group flex items-baseline gap-5 border-t border-white/10 py-6">
                <h3 className="font-serif text-2xl font-light text-sand transition-colors duration-500 group-hover:text-gold md:text-3xl">
                  {w.name}
                </h3>
                <span
                  aria-hidden
                  className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-white/25"
                />
                <span className="shrink-0 text-sm text-sand/55">{w.note}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Private dining on the sand                                         */
/* ------------------------------------------------------------------ */

export function SandDining() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="dining" className="relative min-h-[85vh] scroll-mt-24 overflow-hidden" ref={ref}>
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/beach-dinner-sunset.jpg"
          alt="A private table set on the sand at sunset with lanterns"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-editorial flex-col justify-center px-6 py-24 md:px-10">
        <SectionLabel index="04">Dinner on the Sand</SectionLabel>
        <AnimatedText
          as="h2"
          text="A table for two, and the whole beach for a dining room."
          className="mt-8 max-w-3xl font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
        />
        <Reveal delay={0.15} className="mt-8 max-w-xl text-base leading-relaxed text-sand/75">
          <p>
            As the tide falls, our team sets a single table on the sand —
            lanterns, a driftwood fire and a menu drawn by Chef Elise Moreau from
            the day&apos;s catch. A sommelier waits in the shadows; the stars do
            the rest. Available for two, or for a celebration of the reserve
            entire.
          </p>
        </Reveal>
        <div className="mt-10">
          <Button href="/dining#reserve" variant="gold" cursorLabel="Reserve">
            Reserve a beach dinner
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Marine program                                                     */
/* ------------------------------------------------------------------ */

const MARINE_STATS = [
  { value: "11 ha", label: "Reef restored by our marine team" },
  { value: "220+", label: "Species logged in the lagoon" },
  { value: "1", label: "Resident marine biologist, daily" },
  { value: "0", label: "Single-use plastics on the shore" },
];

export function MarineProgram() {
  return (
    <section id="marine" className="relative scroll-mt-24 bg-ink px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="05">The Living Shore</SectionLabel>
          <AnimatedText
            as="h2"
            text="A reef reborn, tended at dawn."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
          <Reveal delay={0.12} className="mt-8 max-w-md text-base leading-relaxed text-stone-light">
            <p>
              The beach is the doorstep to Aurelia&apos;s marine programme. Join
              the reserve&apos;s resident biologist to plant coral in the nursery,
              release hatchling turtles at first light, or simply learn to read
              the reef that keeps this shore so still.
            </p>
          </Reveal>
          <div className="mt-10">
            <Button href="/experiences#reef" variant="outline" cursorLabel="Discover">
              Meet the reef
            </Button>
          </div>
        </div>

        <RevealGroup
          className="grid grid-cols-2 gap-x-8 gap-y-12 self-center lg:col-span-6 lg:col-start-7"
          stagger={0.12}
        >
          {MARINE_STATS.map((s) => (
            <RevealItem key={s.label}>
              <p className="font-serif text-5xl font-light text-gold">{s.value}</p>
              <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.16em] text-sand/60">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="mx-auto mt-24 max-w-[100rem]">
        <Marquee items={["Sand", "Reef", "Tide", "Salt", "Sun"]} />
      </div>
    </section>
  );
}
