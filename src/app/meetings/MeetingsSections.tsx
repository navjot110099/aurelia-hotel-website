"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Wifi, Presentation, Waves } from "lucide-react";
import { SectionHeading, GoldLine } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const SPACES = [
  {
    name: "The Boardroom, Overwater",
    capacity: "Up to 16",
    detail: "A glass-walled table suspended above the lagoon, with 4K conferencing, private catering and a butler on call.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "The Séraphine Salon",
    capacity: "Up to 40",
    detail: "A flexible studio for keynotes and workshops — reconfigurable, acoustically tuned, opening onto a private garden terrace.",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "The Cellar Table",
    capacity: "Up to 12",
    detail: "A vaulted chamber for the decisions that matter most — no screens, no signal, only the twelve of you and a sommelier.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80",
  },
];

const TECH = [
  { icon: Wifi, label: "Dedicated 2 Gbps fibre & Starlink backup" },
  { icon: Presentation, label: "4K displays, hybrid conferencing & simultaneous translation" },
  { icon: Users, label: "On-site producer, IT lead and executive assistant" },
  { icon: Waves, label: "Wellness-integrated agendas built around the tide" },
];

const AGENDA = [
  { time: "06:30", title: "Sunrise breath & sea swim", copy: "The day opens on the eastern deck — pranayama, a clear head, and the lagoon before anyone else is awake." },
  { time: "09:00", title: "Deep-work session", copy: "Two focused hours in the overwater boardroom, phones surrendered, a single agenda on the table." },
  { time: "13:00", title: "Table by Chef Elise Moreau", copy: "Lunch on the sand — the reef, the garden, the day's catch — designed to restore, not to sedate." },
  { time: "16:00", title: "Reef expedition or reset", copy: "Strategy dissolves into a dive, a sail, or an hour at the overwater spa. The best ideas arrive here." },
  { time: "19:30", title: "Cellar dinner & close", copy: "The day lands over rare bottles in the coral vault — decisions made, the team closer than it began." },
];

export function MeetingSpaces() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10" id="spaces">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="01" eyebrow="The Spaces" title="Rooms that think clearly" />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SPACES.map((space, i) => (
            <motion.article
              key={space.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              className="group overflow-hidden rounded-sm border border-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="mb-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                  <Users className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {space.capacity}
                </div>
                <h3 className="font-serif text-2xl font-light text-sand">{space.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-light">{space.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MeetingTech() {
  return (
    <section className="relative bg-ink-800 px-6 py-section md:px-10" id="tech">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <SectionHeading index="02" eyebrow="The Infrastructure" title="Connected when it counts, unreachable when it doesn't" />
        <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.08}>
          {TECH.map((item) => (
            <RevealItem key={item.label}>
              <div className="glass flex h-full flex-col gap-4 rounded-sm border border-white/10 p-7">
                <item.icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                <p className="text-sm leading-relaxed text-stone-light">{item.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function MeetingAgenda() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10" id="agenda">
      <div className="mx-auto max-w-editorial">
        <SectionHeading index="03" eyebrow="A Day, Composed" title="Wellness written into the work" />
        <GoldLine className="mt-12" />
        <RevealGroup className="mt-4 divide-y divide-white/10" stagger={0.07}>
          {AGENDA.map((row) => (
            <RevealItem key={row.time}>
              <div className="grid gap-3 py-8 md:grid-cols-[0.2fr_0.4fr_1fr] md:gap-10">
                <span className="font-serif text-2xl text-gold/80">{row.time}</span>
                <h3 className="font-serif text-xl font-light text-sand md:text-2xl">{row.title}</h3>
                <p className="max-w-xl text-base leading-relaxed text-stone-light">{row.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
