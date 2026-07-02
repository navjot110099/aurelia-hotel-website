"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sun, Droplets, Waves } from "lucide-react";
import { SectionHeading, GoldLine, Marquee } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AWARDS } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------- */
/*  Brand story                                                      */
/* ---------------------------------------------------------------- */

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section ref={ref} className="relative bg-ink px-6 py-section md:px-10" id="brand-story">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <SectionHeading index="01" eyebrow="Our Story" title="One island, kept apart from the world" />
          <Reveal delay={0.15} className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-stone-light">
            <p>
              Aurelia began with a refusal. Its founders had stayed in the finest
              rooms on earth and found them, somehow, crowded — with other guests,
              other agendas, the low hum of a world that would not quite let go.
              They went looking for the opposite of a hotel.
            </p>
            <p>
              They found it on Maré Séraphine, a private atoll in the South
              Pacific reachable only by seaplane. There they built a reserve, not
              a resort: thirty-four residences, a single team, and the radical
              luxury of an entire island arranged around your day. No strangers
              you did not invite. No horizon you do not own.
            </p>
          </Reveal>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1400&q=80"
              alt="The Aurelia reserve seen from the air at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
          <div className="absolute bottom-6 left-6 glass rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-sand">
            Established 2019
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Mission & Vision                                                 */
/* ---------------------------------------------------------------- */

export function MissionVision() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10" id="mission">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="02" align="center" eyebrow="Mission & Vision" title="Space, silence, and time" className="mx-auto" />
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          <Reveal>
            <div className="glass flex h-full flex-col gap-5 rounded-sm border border-white/10 p-10">
              <span className="eyebrow text-gold">The Mission</span>
              <p className="font-serif text-2xl font-light leading-[1.25] text-sand md:text-3xl">
                To hold, for a handful of guests at a time, the rarest things money
                cannot usually buy — undivided attention, unbroken quiet, and time
                that forgets to pass.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass flex h-full flex-col gap-5 rounded-sm border border-white/10 p-10">
              <span className="eyebrow text-gold">The Vision</span>
              <p className="font-serif text-2xl font-light leading-[1.25] text-sand md:text-3xl">
                An island that gives more to the ocean than it takes — proof that
                the most exalted hospitality and the most serious stewardship can be
                the same act.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Architecture — Studio Kenzō Aramaki                              */
/* ---------------------------------------------------------------- */

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section ref={ref} className="relative bg-ink px-6 py-section md:px-10" id="architecture">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-sm lg:order-1">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
              alt="Architecture of the Aurelia reserve dissolving into its island"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
        </div>
        <div className="order-1 flex flex-col justify-center lg:order-2">
          <SectionHeading index="03" eyebrow="Architecture" title="Studio Kenzō Aramaki" />
          <Reveal delay={0.15} className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-stone-light">
            <p>
              The reserve was drawn by the Kyoto-and-Auckland studio of Kenzō
              Aramaki, an architect celebrated for buildings that seem to
              apologise for existing. For three years his team did little but
              watch the island — the sun, the wind, the softest hour of the light.
            </p>
            <p>
              What they built almost disappears. Every residence is turned a few
              degrees from its neighbour so that no guest sees another roof. The
              palette is deliberately narrow: hand-troweled lime, unlacquered
              teak, coral stone quarried and returned. The most expensive material
              of all, Aramaki insists, is restraint.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 border-l-2 border-gold pl-6">
            <p className="font-serif text-xl font-light italic leading-snug text-gold-light">
              “A great building on a small island is a kind of rudeness. We wanted
              guests to forget the architecture and remember the sea.”
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-stone">
              Kenzō Aramaki · Founding Architect
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Timeline 2016 → 2026                                             */
/* ---------------------------------------------------------------- */

const MILESTONES = [
  { year: "2016", title: "A refusal, and a search", copy: "Aurelia's founders set out to find the opposite of a hotel — a single island, kept for the few." },
  { year: "2017", title: "Maré Séraphine acquired", copy: "A private atoll in French Polynesia is secured under a hundred-year conservation covenant." },
  { year: "2018", title: "Studio Kenzō Aramaki commissioned", copy: "Three years of watching the island begin before a single foundation is poured." },
  { year: "2019", title: "The reserve opens", copy: "Thirty-four residences receive their first guests. The seaplane makes its inaugural landing on the lagoon." },
  { year: "2021", title: "Maré earns its first stars", copy: "Chef Elise Moreau's water's-edge kitchen is awarded two Michelin stars in its debut season." },
  { year: "2022", title: "The coral nursery is founded", copy: "The reserve's marine team begins restoring the reef, fragment by fragment, at dawn." },
  { year: "2024", title: "Carbon-negative operation", copy: "Aurelia runs entirely on solar and stored power, desalinating and recycling all of its water." },
  { year: "2026", title: "Eleven hectares reborn", copy: "The restored reef crosses eleven hectares as the reserve marks its finest season yet." },
];

export function Timeline() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10" id="timeline">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="04" eyebrow="The Story So Far" title="A decade in the making" />
        <div className="relative mt-20 pl-10 md:pl-0">
          {/* animated spine */}
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute left-1 top-0 h-full w-px origin-top bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2"
          />
          <ul className="space-y-14 md:space-y-4">
            {MILESTONES.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 ${
                    left ? "" : "md:[&>*:first-child]:col-start-2"
                  }`}
                >
                  {/* node */}
                  <span className="absolute -left-[35px] top-2 h-3 w-3 rounded-full border border-gold bg-ink md:left-1/2 md:-translate-x-1/2" />
                  <div className={`md:py-10 ${left ? "md:pr-16 md:text-right" : "md:pl-16 md:col-start-2"}`}>
                    <span className="font-serif text-3xl font-light text-gold md:text-4xl">{m.year}</span>
                    <h3 className="mt-2 font-serif text-2xl font-light text-sand">{m.title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed text-stone-light ${left ? "md:ml-auto md:max-w-sm" : "md:max-w-sm"}`}>
                      {m.copy}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Sustainability                                                   */
/* ---------------------------------------------------------------- */

const SUSTAIN = [
  { icon: Sun, stat: "100%", label: "Solar & stored power", copy: "The reserve runs entirely on the sun, captured by day and held in island batteries through the night." },
  { icon: Droplets, stat: "0", label: "Litres imported", copy: "Every drop is desalinated, filtered and recycled on-island. Nothing arrives by tanker; nothing is wasted." },
  { icon: Waves, stat: "11 ha", label: "Reef restored", copy: "Our coral nursery has revived eleven hectares of reef, planted fragment by fragment at dawn." },
];

export function Sustainability() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10" id="sustainability">
      <div className="mx-auto max-w-editorial">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <SectionHeading index="05" eyebrow="Sustainability" title="An island that gives more than it takes" />
          <Reveal delay={0.15} className="flex flex-col justify-end text-base leading-relaxed text-stone-light">
            <p>
              Stewardship at Aurelia was never an afterthought bolted to the plan.
              It was the plan. The reserve is carbon-negative in operation, grows
              much of its own produce, and funds the restoration of the very reef
              that surrounds it.
            </p>
          </Reveal>
        </div>
        <RevealGroup className="mt-16 grid gap-8 md:grid-cols-3" stagger={0.1}>
          {SUSTAIN.map((s) => (
            <RevealItem key={s.label}>
              <div className="glass flex h-full flex-col gap-5 rounded-sm border border-white/10 p-9">
                <s.icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
                <span className="font-serif text-5xl font-light text-sand">{s.stat}</span>
                <GoldLine />
                <span className="eyebrow text-gold">{s.label}</span>
                <p className="text-sm leading-relaxed text-stone-light">{s.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Leadership                                                       */
/* ---------------------------------------------------------------- */

const LEADERS = [
  {
    name: "Séraphine Aurel",
    title: "Founder & Custodian",
    bio: "A former conservationist turned hotelier, Séraphine conceived the reserve as a place where the finest hospitality and the most serious stewardship would be one act. She still walks the reef most mornings.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Matteo Lombardi",
    title: "Managing Director",
    bio: "Twenty years across the world's great houses taught Matteo that luxury is a discipline of subtraction. He runs Aurelia the way a conductor runs an orchestra — invisibly, and to the last detail.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Amara Chen",
    title: "Director of Guest Experience",
    bio: "Amara leads the team that anticipates a wish before it is spoken. Her single rule for the butlers and the beach: notice everything, and be seen doing none of it.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dr. Nālani Kealoha",
    title: "Head of Sustainability",
    bio: "A marine biologist who traded a research post for a reef, Nālani directs the coral programme and the island's carbon-negative operation, proving nightly that the two ambitions are the same.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Leadership() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10" id="leadership">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="06" eyebrow="The People" title="Those who keep the island" />
        <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {LEADERS.map((l) => (
            <RevealItem key={l.name}>
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src={l.image}
                    alt={`Portrait of ${l.name}, ${l.title} at Aurelia`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-[1400ms] ease-luxe group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                </div>
                <figcaption className="mt-5">
                  <h3 className="font-serif text-xl font-light text-sand">{l.name}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gold">{l.title}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-light">{l.bio}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Awards & Press                                                   */
/* ---------------------------------------------------------------- */

export function AwardsPress() {
  return (
    <section className="relative overflow-hidden bg-ink py-section" id="awards">
      <div className="mx-auto mb-16 max-w-editorial px-6 md:px-10">
        <SectionHeading index="07" eyebrow="Awards & Press" title="Recognition, quietly received" />
      </div>

      <Marquee items={["Condé Nast Traveler", "Travel + Leisure", "Robb Report", "Guide Michelin", "AHEAD"]} className="mb-16 opacity-70" />

      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {AWARDS.map((award, i) => (
            <motion.li
              key={`${award.title}-${award.year}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 md:gap-12"
            >
              <span className="font-serif text-sm text-gold/70">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-2xl font-light text-sand md:text-3xl">{award.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone">{award.org}</p>
              </div>
              <span className="font-serif text-2xl font-light text-gold md:text-3xl">{award.year}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutManifesto() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <AnimatedText
          as="p"
          text="Aurelia is not a hotel. It is a private reserve — one island, one team, thirty-four residences, and no strangers you did not invite."
          className="font-serif text-2xl font-light leading-[1.3] text-sand md:text-4xl"
        />
      </div>
    </section>
  );
}
