"use client";

import Image from "@/components/ui/SmartImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeading, GoldLine } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const VALUES = [
  { title: "Anticipation", copy: "We meet a wish before it is spoken. The craft is in the noticing." },
  { title: "Restraint", copy: "The rarest luxury is what we choose to leave out. We do less, better." },
  { title: "Stewardship", copy: "The island outlives us all. We tend the reef, the reserve and one another." },
  { title: "Belonging", copy: "One island, one team. We live where we work, and we look after our own." },
];

const BENEFITS = [
  "Live-in island residence with all meals",
  "Return flights and generous leave rotations",
  "Private health cover and wellness allowance",
  "Cross-discipline training and mentorship",
  "Certification and further-study sponsorship",
  "A profit-shared performance bonus",
];

export function CultureStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section ref={ref} className="relative bg-ink px-6 py-section md:px-10" id="culture">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="/images/coralline-beach-club.jpg"
              alt="Aurelia's team preparing the Coralline Beach Club at first light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading index="01" eyebrow="Life at Aurelia" title="A rare kind of belonging" />
          <Reveal delay={0.15} className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-stone-light">
            <p>
              To work at Aurelia is to live at Aurelia. Our team of two hundred
              shares the island, its dawns and its quiet — a community as
              considered as the reserve itself. We hire slowly and for character,
              then invest for a career.
            </p>
            <p>
              Here you will not be one of thousands. You will be one of the few
              who make the impossible feel effortless, night after night, for the
              guests who trust us with their most precious days.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10" id="values">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="02" eyebrow="What We Hold" title="Four things we never compromise" />
        <RevealGroup className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {VALUES.map((v, i) => (
            <RevealItem key={v.title}>
              <div className="flex h-full flex-col gap-4">
                <span className="font-serif text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <GoldLine />
                <h3 className="font-serif text-2xl font-light text-sand">{v.title}</h3>
                <p className="text-sm leading-relaxed text-stone-light">{v.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Benefits() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10" id="benefits">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <SectionHeading index="03" eyebrow="The Offer" title="We look after our own" />
        <RevealGroup className="grid gap-5 sm:grid-cols-2" stagger={0.06}>
          {BENEFITS.map((b) => (
            <RevealItem key={b}>
              <div className="glass flex h-full items-center rounded-sm border border-white/10 px-6 py-5 text-sm leading-relaxed text-stone-light">
                {b}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
