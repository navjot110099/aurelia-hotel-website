"use client";

import Image from "@/components/ui/SmartImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * The opening editorial statement — a parallax portrait beside a large
 * serif manifesto. Sets the tone: quiet, exact, and rare.
 */
export function Prologue() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-ink px-6 py-section md:px-10"
      id="prologue"
    >
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <SectionLabel index="01">The Prologue</SectionLabel>
          <AnimatedText
            as="h2"
            text="An island kept for the few who know that true luxury is space, silence, and time."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
          <Reveal delay={0.15} className="mt-8 max-w-md text-base leading-relaxed text-stone-light">
            <p>
              Aurelia is not a hotel. It is a private reserve — one island, one
              team, thirty-four residences and no strangers you did not invite.
              From the moment our seaplane sets you upon the lagoon, the island
              arranges itself around your day.
            </p>
          </Reveal>
          <div className="mt-10">
            <Button href="/about" variant="outline" cursorLabel="Read">
              Our story
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="/images/island-aerial.jpg"
              alt="Aurelia reserve seen from the air at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
          <div className="absolute bottom-6 left-6 glass rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-sand">
            17°40′S · 149°24′W
          </div>
        </div>
      </div>
    </section>
  );
}
