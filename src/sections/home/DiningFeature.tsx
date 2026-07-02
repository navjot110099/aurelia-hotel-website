"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CHEF } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * A full-bleed dining moment: a parallax kitchen image, two Michelin stars,
 * and Chef Elise Moreau's philosophy set in large serif.
 */
export function DiningFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      {/* parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
          alt="Dinner service at Maré as the sun falls"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[100rem] gap-16 px-6 py-section md:px-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <SectionLabel index="04">The Table</SectionLabel>
          <div className="mt-6 flex items-center gap-3 text-gold">
            <span className="text-2xl">★★</span>
            <span className="text-xs uppercase tracking-[0.24em] text-sand/70">
              Two Michelin Stars · Maré
            </span>
          </div>
          <AnimatedText
            as="h2"
            text="Nine courses, one tide, nothing that travelled further than the reef."
            className="mt-8 font-serif text-4xl font-light leading-[1.08] text-sand md:text-6xl"
          />
          <Reveal delay={0.15} className="mt-8 max-w-md border-l border-gold/40 pl-6">
            <p className="font-serif text-xl italic leading-relaxed text-sand/85">
              “{CHEF.quote}”
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">
              {CHEF.name} — {CHEF.title}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/dining" variant="gold" cursorLabel="Savour">
              Explore dining
            </Button>
            <Button href="/dining#reserve" variant="ghost">
              Reserve a table
            </Button>
          </div>
        </div>

        <div className="relative hidden items-center justify-center lg:flex">
          <Reveal className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm">
            <Image
              src={CHEF.image}
              alt={CHEF.name}
              fill
              sizes="40vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
              <p className="font-serif text-2xl text-sand">{CHEF.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                Executive Chef
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
