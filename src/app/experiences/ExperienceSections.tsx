"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES } from "@/lib/site";
import { SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Intro                                                              */
/* ------------------------------------------------------------------ */

export function ExperiencesIntro() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="01">Curated Days</SectionLabel>
          <AnimatedText
            as="h2"
            text="Days you could not have imagined, arranged before you ask."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
        </div>
        <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <Reveal className="max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              A private sloop for the outer atolls. A champagne landing on a
              sandbar that surfaces only at low tide. A dive through one of the
              last pristine coral gardens in the Pacific. At Aurelia, an
              experience is never booked from a list — it is composed, quietly,
              around the shape of your day.
            </p>
          </Reveal>
          <div className="mt-10">
            <GoldLine />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Alternating immersive blocks                                       */
/* ------------------------------------------------------------------ */

function ExperienceBlock({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const flip = index % 2 === 1;

  return (
    <section
      id={experience.id}
      className="relative scroll-mt-24 bg-ink px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-editorial items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div
          ref={ref}
          className={`relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[5/6] ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src={experience.image}
              alt={experience.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-sand backdrop-blur-sm">
            {experience.kind}
          </span>
        </div>

        <div className={flip ? "lg:order-1" : ""}>
          <span className="font-serif text-6xl font-light text-gold/25 md:text-7xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <AnimatedText
            as="h2"
            text={experience.name}
            className="mt-4 font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
          />
          <Reveal delay={0.12} className="mt-6 max-w-md text-base leading-relaxed text-stone-light">
            <p>{experience.description}</p>
          </Reveal>
          <div className="mt-10">
            <Button href="#butler" variant="outline" cursorLabel="Arrange">
              Arrange this day
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExperienceShowcase() {
  return (
    <div className="relative">
      {EXPERIENCES.map((e, i) => (
        <ExperienceBlock key={e.id} experience={e} index={i} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Curated by your butler CTA                                         */
/* ------------------------------------------------------------------ */

export function ButlerCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="butler" className="relative min-h-[80vh] scroll-mt-24 overflow-hidden" ref={ref}>
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1900&q=80"
          alt="A restored schooner at anchor as the sky turns gold"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-editorial flex-col justify-center px-6 py-24 text-center md:px-10">
        <SectionLabel index="—" align="center">
          Curated by Your Butler
        </SectionLabel>
        <AnimatedText
          as="h2"
          text="Tell us the day you dream of."
          className="mx-auto mt-8 max-w-3xl font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
        />
        <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sand/75">
          <p>
            Every experience at Aurelia is arranged by the butler assigned to
            your residence — a single point of quiet, endless capability. A
            sunrise dive, a private island for the afternoon, a proposal on a
            sandbar that vanishes by dusk. Describe it, and consider it done.
          </p>
        </Reveal>
        <div className="mx-auto mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/contact" variant="gold" cursorLabel="Compose">
            Speak with your butler
          </Button>
          <Button href="/beach" variant="ghost" cursorLabel="Discover">
            The private beach
          </Button>
        </div>
      </div>
    </section>
  );
}
