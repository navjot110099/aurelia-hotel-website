"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wind, Sunrise, Waves, Leaf, Activity } from "lucide-react";
import { SectionHeading, SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Philosophy / intro                                                 */
/* ------------------------------------------------------------------ */

export function WellnessIntro() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="01">The Practice</SectionLabel>
          <AnimatedText
            as="h2"
            text="Wellness that keeps the pace of the island."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
        </div>
        <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <Reveal className="max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              Aurelia&apos;s wellness programme is not a schedule to be kept — it
              is an invitation to move a little slower. Yoga on the eastern deck
              as the island wakes, breathwork carried on the trade winds,
              meditation at the water&apos;s edge and a table set by our nutrition
              team from the day&apos;s garden. Join a session, or let us design a
              private practice for the length of your stay.
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
/*  Disciplines                                                        */
/* ------------------------------------------------------------------ */

const DISCIPLINES = [
  {
    icon: Sunrise,
    name: "Yoga",
    body: "Vinyasa, yin and restorative practice on the open-air deck, guided from the first light to the golden hour.",
  },
  {
    icon: Waves,
    name: "Meditation",
    body: "Guided stillness and sound healing at the water's edge, and silent sits in the reserve's meditation garden.",
  },
  {
    icon: Activity,
    name: "Movement",
    body: "Ocean-front mobility, aqua conditioning in the lagoon and barefoot strength sessions on the sand.",
  },
  {
    icon: Wind,
    name: "Breathwork",
    body: "Pranayama and functional breath practice to steady the nervous system and lengthen the day.",
  },
  {
    icon: Leaf,
    name: "Nutrition",
    body: "Cold-pressed tonics, an island-grown menu and private consultations with our resident nutritionist.",
  },
];

export function Disciplines() {
  return (
    <section id="disciplines" className="relative scroll-mt-24 bg-ink px-6 pb-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <SectionHeading eyebrow="Five Paths" index="02" title="The disciplines" />
        <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {DISCIPLINES.map((d) => {
            const Icon = d.icon;
            return (
              <RevealItem key={d.name}>
                <div className="group h-full rounded-sm border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-gold/40">
                  <Icon
                    size={26}
                    strokeWidth={1.2}
                    className="text-gold transition-transform duration-500 group-hover:-translate-y-1"
                  />
                  <h3 className="mt-6 font-serif text-2xl font-light text-sand">
                    {d.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand/60">
                    {d.body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Daily schedule                                                     */
/* ------------------------------------------------------------------ */

const SCHEDULE = [
  { time: "06:00", name: "Sunrise Vinyasa", place: "Eastern Deck", type: "Yoga" },
  { time: "07:15", name: "Ocean Breathwork", place: "Float Pavilion", type: "Breathwork" },
  { time: "09:00", name: "Lagoon Aqua-Mobility", place: "Main Lagoon", type: "Movement" },
  { time: "10:30", name: "Guided Sound Meditation", place: "Meditation Garden", type: "Meditation" },
  { time: "12:00", name: "Living Larder Tasting", place: "Nutrition Atelier", type: "Nutrition" },
  { time: "16:00", name: "Restorative Yin", place: "Overwater Deck", type: "Yoga" },
  { time: "17:30", name: "Barefoot Strength", place: "Private Beach", type: "Movement" },
  { time: "18:45", name: "Sunset Stillness", place: "West Point", type: "Meditation" },
];

export function DailySchedule() {
  return (
    <section id="schedule" className="relative scroll-mt-24 bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          eyebrow="A Day, Gently Kept"
          index="03"
          title="The daily wellness schedule"
          className="max-w-2xl"
        />
        <Reveal delay={0.1} className="mt-6 max-w-xl text-sm leading-relaxed text-sand/55">
          <p>
            Complimentary group sessions, held daily. Private and in-villa
            practice may be arranged at any hour through your butler.
          </p>
        </Reveal>

        <div className="mt-14 overflow-hidden">
          <div className="hidden grid-cols-12 gap-4 border-b border-white/10 pb-4 text-[10px] uppercase tracking-[0.22em] text-sand/45 md:grid">
            <span className="col-span-2">Time</span>
            <span className="col-span-5">Session</span>
            <span className="col-span-3">Setting</span>
            <span className="col-span-2 text-right">Discipline</span>
          </div>

          <RevealGroup stagger={0.06}>
            {SCHEDULE.map((s) => (
              <RevealItem key={`${s.time}-${s.name}`}>
                <div className="group grid grid-cols-2 items-baseline gap-2 border-b border-white/10 py-6 md:grid-cols-12 md:gap-4">
                  <span className="col-span-2 font-serif text-2xl font-light text-gold md:text-xl">
                    {s.time}
                  </span>
                  <span className="col-span-2 font-serif text-xl font-light text-sand transition-colors duration-500 group-hover:text-gold-light md:col-span-5 md:text-2xl">
                    {s.name}
                  </span>
                  <span className="col-span-1 text-sm text-sand/60 md:col-span-3">
                    {s.place}
                  </span>
                  <span className="col-span-1 text-right text-[11px] uppercase tracking-[0.18em] text-sand/45 md:col-span-2">
                    {s.type}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Practitioner highlight                                             */
/* ------------------------------------------------------------------ */

export function PractitionerHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="practitioner" className="relative scroll-mt-24 bg-ink px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-sm lg:order-2">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80"
              alt="Kaia Rautahi, Aurelia's lead wellness practitioner, on the deck at dawn"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
        </div>

        <div className="flex flex-col justify-center lg:order-1">
          <SectionLabel index="04">The Practitioner</SectionLabel>
          <AnimatedText
            as="h2"
            text="Kaia Rautahi"
            className="mt-6 font-serif text-4xl font-light leading-none text-sand md:text-6xl"
          />
          <Reveal delay={0.1} className="mt-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold/80">
              Lead of Wellness · Yoga & Breath
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 max-w-lg text-base leading-relaxed text-stone-light">
            <p>
              Trained in Rishikesh and along the coasts of Aotearoa, Kaia has
              spent twenty years teaching breath as medicine. At Aurelia she
              leads the sunrise practice herself and designs private programmes
              that read the sea, the sleep and the season a guest arrives in.
            </p>
          </Reveal>
          <Reveal delay={0.26} className="mt-10 border-l border-gold/40 pl-6">
            <p className="font-serif text-2xl font-light italic leading-snug text-sand md:text-3xl">
              &ldquo;The ocean has never once been in a hurry. Neither, here, are you.&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */

export function WellnessCTA() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedText
          as="h2"
          text="Design your days of stillness."
          className="mx-auto font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
        />
        <Reveal delay={0.1} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-light">
          <p>
            Let our wellness team compose a private programme for your stay —
            from a single sunrise class to a full week of guided practice, spa
            ritual and island-grown nourishment.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/spa#reserve" variant="gold" cursorLabel="Compose">
            Book a wellness journey
          </Button>
          <Button href="/spa" variant="ghost" cursorLabel="Explore">
            Visit the spa
          </Button>
        </div>
      </div>
    </section>
  );
}
