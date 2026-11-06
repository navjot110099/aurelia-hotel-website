"use client";

import { useRef } from "react";
import Image from "@/components/ui/SmartImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/site";

/**
 * The closing invitation — a full-bleed parallax of the reserve at golden hour,
 * an oversized serif call, and the two primary actions.
 */
export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[124%]">
        <Image
          src="/images/beach-dinner-sunset.jpg"
          alt="The reserve at golden hour"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-8">Your arrival awaits</p>
        </Reveal>
        <AnimatedText
          as="h2"
          text="The tide is turning. The island is ready. All that remains is you."
          className="font-serif text-4xl font-light leading-[1.05] text-sand md:text-7xl"
        />
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/booking" variant="gold" size="lg" cursorLabel="Reserve">
            Begin your reservation
          </Button>
          <Button href="/concierge" variant="outline" size="lg">
            Speak with a concierge
          </Button>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-10 text-xs uppercase tracking-[0.24em] text-stone-light">
            {BRAND.reservations} · {BRAND.phone}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
