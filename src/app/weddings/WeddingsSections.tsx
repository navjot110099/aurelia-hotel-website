"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { SectionHeading, GoldLine } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { formatCurrency } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const VENUES = [
  {
    name: "Séraphine Point",
    line: "Vows at the island's edge, ocean on three sides.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "The White Beach",
    line: "Barefoot on the sand as the sun falls into the sea.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "The Overwater Deck",
    line: "A floating aisle above the lagoon, lit by lanterns.",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1400&q=80",
  },
];

const PACKAGES = [
  {
    name: "The Elopement",
    from: 18000,
    line: "For two, and the sea.",
    inclusions: [
      "Intimate ceremony for up to eight guests",
      "Celebrant and legal documentation",
      "A private overwater residence for three nights",
      "Sunset ceremony styling and bridal florals",
      "A private dinner at Maré for the newlyweds",
      "Floating breakfast and daily spa ritual for two",
    ],
  },
  {
    name: "The Séraphine",
    from: 62000,
    line: "The classic island wedding, perfected.",
    inclusions: [
      "Ceremony and reception for up to 80 guests",
      "Dedicated wedding producer and design atelier",
      "Choice of ceremony venue with bespoke styling",
      "Five-course reception dinner by Chef Elise Moreau",
      "Cellar wines, house champagne and live music",
      "Bridal-party residences and a two-night suite for the couple",
    ],
  },
  {
    name: "The Reserve, Ours",
    from: 240000,
    line: "The entire island, for a weekend that is only yours.",
    inclusions: [
      "Full buyout of all 34 residences and the island team",
      "Three days of curated celebrations, land and sea",
      "Welcome sail, ceremony, gala and farewell brunch",
      "Fireworks over the reef and a private DJ under the stars",
      "Personal butler for every guest and a fleet of transfers",
      "The Celestia Residence as the couple's private estate",
    ],
  },
];

export function WeddingNarrative() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);

  return (
    <section ref={ref} className="relative bg-ink px-6 py-section md:px-10" id="your-day">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col justify-center">
          <SectionHeading index="01" eyebrow="Your Day" title="A single, unhurried day" />
          <Reveal delay={0.15} className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-stone-light">
            <p>
              It begins before the guests wake — a stillness on the water, coffee
              on the deck, the island holding its breath. By afternoon the palms
              are strung with light and the sand is raked to silk.
            </p>
            <p>
              You walk an aisle that ends at the horizon. There is no next
              wedding, no clock, no crowd beyond the ones you love. When the last
              toast is made, the reef lights with fire and the night belongs
              entirely to you.
            </p>
          </Reveal>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
              alt="A couple beneath a floral arch at the water's edge at Aurelia"
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

export function WeddingVenues() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10" id="venues">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="02" eyebrow="The Aisles" title="Where you will say yes" />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {VENUES.map((venue, i) => (
            <motion.figure
              key={venue.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-sm"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-serif text-2xl font-light text-sand">{venue.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand/70">{venue.line}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeddingPackages() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10" id="packages">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="03" eyebrow="Celebrations" title="Three ways to marry" />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              className="glass flex flex-col rounded-sm border border-white/10 p-8"
            >
              <h3 className="font-serif text-3xl font-light text-sand">{pkg.name}</h3>
              <p className="mt-2 text-sm italic text-gold-light">{pkg.line}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone">From</p>
              <p className="font-serif text-4xl font-light text-sand">
                {formatCurrency(pkg.from)}
              </p>
              <GoldLine className="my-7" />
              <ul className="space-y-3.5">
                {pkg.inclusions.map((inc) => (
                  <li key={inc} className="flex gap-3 text-sm leading-relaxed text-stone-light">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeddingTestimonial() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <span className="font-serif text-7xl leading-none text-gold/40">“</span>
        <AnimatedText
          as="blockquote"
          text="We married at the edge of the world, and the world was kind enough to hold still. Not one guest has stopped talking about it since."
          className="mt-4 font-serif text-2xl font-light leading-[1.3] text-sand md:text-4xl"
        />
        <Reveal delay={0.2} className="mt-8">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Amara &amp; Theo Whitlock · Married on Séraphine Point, 2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
