"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MapPin, Briefcase, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

type Role = {
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
};

const ROLES: Role[] = [
  {
    title: "Head Sommelier",
    department: "Dining · The Cellar",
    location: "Maré Séraphine · On-island",
    type: "Full-time · Live-in",
    summary:
      "Lead a twelve-thousand-bottle cellar and its tastings, curate pairings alongside Chef Elise Moreau, and mentor a small floor team. Advanced sommelier certification and a genuine love of storytelling required.",
  },
  {
    title: "Guest Experience Butler",
    department: "Guest Experience",
    location: "Maré Séraphine · On-island",
    type: "Full-time · Live-in",
    summary:
      "The single point of grace for a residence's guests — anticipating wishes, orchestrating experiences and holding the standard that keeps 98% of our guests returning. Prior ultra-luxury or private-household experience essential.",
  },
  {
    title: "Reef Conservation Lead",
    department: "Sustainability",
    location: "Maré Séraphine · On-island",
    type: "Full-time · Live-in",
    summary:
      "Direct the coral-restoration programme that has revived eleven hectares of reef, guide guest dives, and publish the reserve's marine research. Marine-biology degree and dive-master accreditation required.",
  },
  {
    title: "Chef de Partie — Maré",
    department: "Culinary",
    location: "Maré Séraphine · On-island",
    type: "Full-time · Live-in",
    summary:
      "Hold a station in a two-Michelin-star kitchen where nothing travels further than the reef, the garden or the day's catch. Fine-dining pedigree and unshakeable calm under a nine-course tasting service.",
  },
  {
    title: "Spa & Wellness Therapist",
    department: "Wellness",
    location: "Maré Séraphine · On-island",
    type: "Full-time · Live-in",
    summary:
      "Deliver the Aurelia Ritual and our overwater treatments with precision and warmth. Advanced massage and body-therapy qualifications, plus training in sound and breath work, are ideal.",
  },
  {
    title: "Reservations & House List Manager",
    department: "Reservations Atelier",
    location: "Papeete or Remote",
    type: "Full-time",
    summary:
      "Steward the reserve's most valued relationships — composing bespoke journeys, managing the house list and safeguarding the discretion our guests expect. Fluent English and French; a warm, unhurried telephone manner.",
  },
];

export function RolesList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {ROLES.map((role, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            key={role.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-7 text-left md:grid-cols-[1.4fr_1fr_0.8fr_auto]"
            >
              <span
                className={cn(
                  "font-serif text-xl font-light leading-snug tracking-[-0.01em] transition-colors duration-500 md:text-2xl",
                  isOpen ? "text-gold" : "text-sand group-hover:text-gold-light"
                )}
              >
                {role.title}
              </span>
              <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone md:flex">
                <Briefcase className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.5} />
                {role.department}
              </span>
              <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone md:flex">
                <MapPin className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.5} />
                {role.location}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 ease-luxe",
                  isOpen && "rotate-45 bg-gold-gradient text-ink"
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl pb-9">
                    <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-stone md:hidden">
                      <span className="inline-flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.5} />
                        {role.department}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.5} />
                        {role.location}
                      </span>
                    </div>
                    <div className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {role.type}
                    </div>
                    <p className="text-base leading-relaxed text-stone-light">{role.summary}</p>
                    <div className="mt-7">
                      <Button href="/contact" variant="outline" size="sm" cursorLabel="Apply">
                        Apply for this role
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
