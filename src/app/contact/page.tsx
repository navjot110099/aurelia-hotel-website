import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Plane, Anchor, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { BRAND } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMap } from "@/components/contact/ContactMap";

export const metadata: Metadata = {
  title: "Contact & Arrival",
  description:
    "Speak with Aurelia's reservations atelier, or send an enquiry. Details, coordinates and arrival by seaplane, helicopter and private jet to Maré Séraphine in the South Pacific.",
};

const DETAILS = [
  {
    icon: Phone,
    label: "Reservations",
    value: BRAND.phone,
    href: `tel:${BRAND.phone.replace(/\s/g, "")}`,
    note: "Our atelier answers 24 hours a day.",
  },
  {
    icon: Mail,
    label: "Reservations email",
    value: BRAND.reservations,
    href: `mailto:${BRAND.reservations}`,
    note: "A considered reply within a few hours.",
  },
  {
    icon: Mail,
    label: "Concierge",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    note: "For guests in residence and en route.",
  },
  {
    icon: MapPin,
    label: "The reserve",
    value: BRAND.address,
    note: `${BRAND.location} · Est. ${BRAND.established}`,
  },
];

const ARRIVAL = [
  {
    icon: Plane,
    title: "By seaplane",
    text: "A 35-minute flight from Faa'a International over the reef, landing in Aurelia's own lagoon. Champagne waits on the pontoon.",
  },
  {
    icon: Plane,
    title: "By helicopter",
    text: "Lift from Faa'a directly to the island's private helipad — the fastest, most scenic passage, ridgelines and lagoons below.",
  },
  {
    icon: Anchor,
    title: "By private jet & yacht",
    text: "Private-jet handling at Faa'a and a yacht crossing to the marina can be arranged in full by our concierge on request.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & Arrival"
        title="Begin the conversation."
        intro="However you prefer to reach us — a call answered at any hour, an email replied to with care, or a note left below — the island is closer than you think."
        image="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Aerial view of the Aurelia reserve and its lagoon at first light"
      />

      <section className="relative overflow-hidden bg-ink py-section">
        <div className="mx-auto w-full max-w-[100rem] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* left — details */}
            <div>
              <SectionLabel index="01" className="mb-6">
                Speak with us
              </SectionLabel>
              <h2 className="max-w-md font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-sand md:text-5xl">
                Every enquiry meets a person, not a portal.
              </h2>
              <GoldLine className="my-10" />

              <div className="space-y-8">
                {DETAILS.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <Reveal key={d.label} delay={i * 0.06}>
                      <div className="flex items-start gap-5">
                        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                          <Icon size={17} />
                        </span>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70">
                            {d.label}
                          </p>
                          {d.href ? (
                            <a
                              href={d.href}
                              className="mt-1 block font-serif text-2xl font-light text-sand transition-colors hover:text-gold"
                            >
                              {d.value}
                            </a>
                          ) : (
                            <p className="mt-1 font-serif text-2xl font-light text-sand">
                              {d.value}
                            </p>
                          )}
                          {d.note && (
                            <p className="mt-1 text-sm text-sand/45">{d.note}</p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={0.2}>
                <div className="mt-10 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-sand/60">
                  <Clock size={16} className="text-gold" />
                  Reservations atelier · open 24 hours, every day of the year.
                </div>
              </Reveal>
            </div>

            {/* right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* map */}
      <section className="relative overflow-hidden bg-ink pb-section">
        <div className="mx-auto w-full max-w-[100rem] px-6 md:px-10">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel index="02" className="mb-6">
                Where we are
              </SectionLabel>
              <h2 className="max-w-lg font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-sand md:text-5xl">
                A private motu in the South Pacific.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-sand/55">
              Aurelia sits on its own island within the Maré Séraphine atoll —
              reachable only by air or water, and all the quieter for it.
            </p>
          </div>

          <ContactMap />
        </div>
      </section>

      {/* arrival + faq teaser */}
      <section className="relative overflow-hidden bg-ink pb-section">
        <div className="mx-auto w-full max-w-[100rem] px-6 md:px-10">
          <SectionLabel index="03" className="mb-10">
            Arriving at Aurelia
          </SectionLabel>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ARRIVAL.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-gold/30">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-ink">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-6 font-serif text-2xl font-light text-sand">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sand/55">
                      {a.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-gold/20 bg-gold/[0.04] p-8 md:flex-row md:items-center md:p-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70">
                  Still curious?
                </p>
                <h3 className="mt-2 font-serif text-3xl font-light text-sand">
                  Answers to the questions guests ask most.
                </h3>
              </div>
              <Link
                href="/faq"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-gold/40 px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-sand transition-colors hover:border-gold hover:text-gold"
              >
                Read the FAQ
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
