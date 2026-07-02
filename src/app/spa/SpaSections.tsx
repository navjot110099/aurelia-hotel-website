"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SPA_TREATMENTS } from "@/lib/site";
import { SectionHeading, SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Philosophy                                                         */
/* ------------------------------------------------------------------ */

export function SpaPhilosophy() {
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
          <SectionLabel index="01">The Overwater Spa</SectionLabel>
          <AnimatedText
            as="h2"
            text="Healing scored to the movement of the tide."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
          <Reveal delay={0.15} className="mt-8 max-w-md text-base leading-relaxed text-stone-light">
            <p>
              Suspended above the lagoon on a floor of glass, the Aurelia spa is
              a place where the ocean does the listening. Every ritual begins
              with the island&apos;s own waters and cold-pressed monoï, and ends
              in the float pavilion, where the only sound is the sea beneath you.
            </p>
          </Reveal>
          <div className="mt-10">
            <Button href="#reserve" variant="outline" cursorLabel="Book">
              Begin your ritual
            </Button>
          </div>
        </div>

        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=80"
              alt="Aurelia's overwater float pavilion above the lagoon"
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
/*  Treatment menu — elegant price list                                */
/* ------------------------------------------------------------------ */

export function TreatmentMenu() {
  return (
    <section
      id="treatments"
      className="relative scroll-mt-24 bg-ink-800 px-6 py-section md:px-10"
    >
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          eyebrow="The Ritual Menu"
          index="02"
          title="Treatments"
        />

        <div className="mt-14 grid gap-x-16 lg:grid-cols-2">
          <RevealGroup className="contents" stagger={0.1}>
            {SPA_TREATMENTS.map((t) => (
              <RevealItem key={t.name}>
                <div className="group border-t border-white/10 py-8">
                  <div className="flex items-baseline gap-5">
                    <h3 className="font-serif text-2xl font-light text-sand transition-colors duration-500 group-hover:text-gold md:text-3xl">
                      {t.name}
                    </h3>
                    <span
                      aria-hidden
                      className="min-w-6 flex-1 translate-y-[-0.2em] border-b border-dotted border-white/25"
                    />
                    <span className="shrink-0 font-serif text-xl text-gold">
                      {formatCurrency(t.price)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-6">
                    <p className="max-w-md text-sm leading-relaxed text-sand/60">
                      {t.description}
                    </p>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-sand/45">
                      {t.duration}
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <GoldLine />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-sand/50">
            All treatments may be taken in the overwater pavilion, in the privacy
            of your residence, or on the sand at first light. Bespoke rituals are
            composed with our lead therapist on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The Journey — horizontal-feel steps                                */
/* ------------------------------------------------------------------ */

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "The Consultation",
    body: "A quiet conversation over island tea. Your therapist reads the day — the flight, the sun, the sleep you did or didn't find — and composes the hours to follow.",
  },
  {
    step: "02",
    title: "The Cleansing",
    body: "A footbath of frangipani and warm atoll salt, then a marine exfoliation that draws on the mineral waters of the lagoon.",
  },
  {
    step: "03",
    title: "The Ceremony",
    body: "Warm basalt, cold-pressed monoï and slow, deliberate hands, timed to the rise and fall of the tide beneath the pavilion floor.",
  },
  {
    step: "04",
    title: "The Stillness",
    body: "A sound bath in the float pavilion, suspended between water and sky, until the only measure of time left is your own breath.",
  },
];

export function SpaJourney() {
  return (
    <section id="journey" className="relative scroll-mt-24 overflow-hidden bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          eyebrow="The Aurelia Ritual"
          index="03"
          title="An unhurried journey"
          className="max-w-2xl"
        />
      </div>

      <RevealGroup
        className="mx-auto mt-16 flex max-w-[100rem] gap-6 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible"
        stagger={0.12}
      >
        {JOURNEY_STEPS.map((s) => (
          <RevealItem key={s.step} className="min-w-[80%] sm:min-w-[60%] md:min-w-0">
            <div className="flex h-full flex-col border-t border-gold/30 pt-6">
              <span className="font-serif text-5xl font-light text-gold/40">
                {s.step}
              </span>
              <h3 className="mt-6 font-serif text-2xl font-light text-sand">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-sand/60">
                {s.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Private spa feature                                                */
/* ------------------------------------------------------------------ */

export function PrivateSpaFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="private" className="relative min-h-[80vh] scroll-mt-24 overflow-hidden" ref={ref}>
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1900&q=80"
          alt="A private spa cabana open to the sea"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-editorial flex-col justify-center px-6 py-24 md:px-10">
        <SectionLabel index="04">By Invitation of the Tide</SectionLabel>
        <AnimatedText
          as="h2"
          text="The spa, brought to your own veranda."
          className="mt-8 max-w-3xl font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
        />
        <Reveal delay={0.15} className="mt-8 max-w-xl text-base leading-relaxed text-sand/75">
          <p>
            For those who prefer the world at arm&apos;s length, our therapists
            come to you — a treatment bed set on your deck above the lagoon, a
            couples&apos; ritual beneath your villa&apos;s palms, or a sunrise
            massage on your own stretch of sand. The ocean, as ever, is included.
          </p>
        </Reveal>
        <div className="mt-10">
          <Button href="#reserve" variant="gold" cursorLabel="Arrange">
            Arrange a private ritual
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Booking CTA                                                        */
/* ------------------------------------------------------------------ */

export function SpaBookingCTA() {
  return (
    <section id="reserve" className="relative scroll-mt-24 bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel index="05" align="center">
          Your Hours, Reserved
        </SectionLabel>
        <AnimatedText
          as="h2"
          text="Book your escape into stillness."
          className="mx-auto mt-8 font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
        />
        <Reveal delay={0.1} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-light">
          <p>
            Our wellness concierge will hold the pavilion, pair your rituals to
            the rhythm of your stay, and see that the tide is with you. Reservations
            are recommended a day ahead.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="gold" cursorLabel="Book">
            Reserve a treatment
          </Button>
          <Button href="/wellness" variant="ghost" cursorLabel="Explore">
            Discover wellness
          </Button>
        </div>
      </div>
    </section>
  );
}
