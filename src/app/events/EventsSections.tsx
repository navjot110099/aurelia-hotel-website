"use client";

import Image from "@/components/ui/SmartImage";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { SectionHeading, GoldLine } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const VENUES = [
  {
    name: "The White Beach",
    capacity: "Up to 220 seated",
    description:
      "A crescent of powder sand framed by palms and lit only by fire and stars — the reserve's grandest open-air room.",
    image:
      "/images/beach-first-light.jpg",
  },
  {
    name: "The Cellar",
    capacity: "12–40 seated",
    description:
      "A vaulted chamber carved into the coral bedrock, twelve thousand bottles deep. For dinners that feel like a held secret.",
    image:
      "/images/the-cellar.jpg",
  },
  {
    name: "The Overwater Deck",
    capacity: "Up to 120 standing",
    description:
      "A floating terrace suspended above the lagoon, its glass rail dissolving into the horizon at golden hour.",
    image:
      "/images/coralline-suite.jpg",
  },
  {
    name: "Séraphine Point",
    capacity: "Up to 60 seated",
    description:
      "The island's northern headland, wrapped on three sides by open ocean — for ceremonies and toasts beneath a limitless sky.",
    image:
      "/images/island-aerial.jpg",
  },
];

const EVENT_TYPES = [
  {
    title: "Milestone Celebrations",
    copy: "Landmark birthdays and anniversaries, staged with fireworks over the reef and a nine-course table by Chef Elise Moreau.",
  },
  {
    title: "Private Gatherings",
    copy: "Intimate reunions of family and friends who wish for the island — and its full team — to themselves for a weekend.",
  },
  {
    title: "Cultural & Art Salons",
    copy: "Curated evenings of music, performance and the plate, hosted in the cellar or upon the sand under a canopy of stars.",
  },
  {
    title: "Brand & Legacy Moments",
    copy: "Discreet launches and patron dinners for houses that value privacy above all — no logos, no crowds, only atmosphere.",
  },
];

export function VenueGrid() {
  return (
    <div className="mx-auto max-w-editorial">
      <SectionHeading
        index="01"
        eyebrow="The Settings"
        title="Four rooms without walls"
      />
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {VENUES.map((venue, i) => (
          <motion.article
            key={venue.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.85, ease: EASE, delay: (i % 2) * 0.1 }}
            className="group relative overflow-hidden rounded-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="mb-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                <Users className="h-3.5 w-3.5" strokeWidth={1.5} />
                {venue.capacity}
              </div>
              <h3 className="font-serif text-3xl font-light text-sand">
                {venue.name}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/70">
                {venue.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export function EventTypes() {
  return (
    <div className="mx-auto max-w-editorial">
      <SectionHeading
        index="02"
        eyebrow="Occasions"
        title="Every reason to gather"
      />
      <GoldLine className="mt-12" />
      <RevealGroup className="mt-4 divide-y divide-white/10" stagger={0.08}>
        {EVENT_TYPES.map((type) => (
          <RevealItem key={type.title}>
            <div className="grid gap-4 py-9 md:grid-cols-[0.5fr_1fr] md:gap-12">
              <h3 className="font-serif text-2xl font-light text-sand md:text-3xl">
                {type.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-stone-light">
                {type.copy}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
