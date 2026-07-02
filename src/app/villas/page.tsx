import type { Metadata } from "next";
import Image from "next/image";
import type { Room } from "@/lib/site";
import { ROOMS_BY_CATEGORY, FAQ, BRAND } from "@/lib/site";
import { formatCurrency } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { SpecList } from "@/components/cards/SpecList";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionHeading, SectionLabel, GoldLine } from "@/components/ui/Primitives";
import {
  ChefHat,
  Anchor,
  Sparkles,
  Wine,
  Users,
  Plane,
  Flower2,
  KeyRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Private Villas · AURELIA",
  description:
    "Beachfront estates with private pools, resident teams and a stretch of white sand of your own — including The Celestia Residence, offered by invitation on Maré Séraphine.",
};

const villas = ROOMS_BY_CATEGORY.Villa;
const celestia = villas.find((v) => v.slug === "the-celestia-residence");
const otherVillas = villas.filter((v) => v.slug !== "the-celestia-residence");

const ESTATE_SERVICES = [
  { icon: ChefHat, title: "Resident chef", note: "A private kitchen brigade cooking to your table, morning to midnight." },
  { icon: KeyRound, title: "Estate butlers", note: "A dedicated team who anticipate the day before it begins." },
  { icon: Anchor, title: "Private captain", note: "The estate yacht and its crew, ready at your own jetty." },
  { icon: Sparkles, title: "In-villa wellness", note: "Therapists, a yoga master and a spa pavilion of your own." },
  { icon: Wine, title: "Cellar & sommelier", note: "A curated cellar stocked to taste, with tastings on request." },
  { icon: Flower2, title: "House florist & garden", note: "Fresh cuttings daily and an island larder at the gate." },
  { icon: Users, title: "Children's atelier", note: "Discreet nannies and tailored adventures for younger guests." },
  { icon: Plane, title: "Private arrivals", note: "Seaplane, helicopter or jet — arranged, met and unhurried." },
];

/** Expansive estate floor plan for the villas. */
function VillaPlan({ label }: { label: string }) {
  return (
    <figure className="relative overflow-hidden rounded-sm border border-white/10 bg-ink-800/60 p-6">
      <svg viewBox="0 0 460 300" className="h-auto w-full" role="img" aria-label={`Schematic estate plan — ${label}`}>
        <defs>
          <pattern id={`vgrid-${label}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,169,97,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="460" height="300" fill={`url(#vgrid-${label})`} />
        {/* grounds boundary */}
        <rect x="16" y="16" width="428" height="228" rx="6" fill="none" stroke="rgba(201,169,97,0.25)" strokeWidth="0.8" strokeDasharray="3 4" />
        {/* main pavilion */}
        <rect x="44" y="48" width="200" height="150" fill="none" stroke="rgba(201,169,97,0.55)" strokeWidth="1.2" />
        <line x1="144" y1="48" x2="144" y2="198" stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" />
        <line x1="44" y1="128" x2="244" y2="128" stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" />
        {/* bedrooms */}
        <rect x="60" y="66" width="66" height="46" fill="none" stroke="rgba(238,231,215,0.45)" strokeWidth="0.7" />
        <rect x="162" y="66" width="66" height="46" fill="none" stroke="rgba(238,231,215,0.45)" strokeWidth="0.7" />
        <rect x="60" y="144" width="66" height="40" fill="none" stroke="rgba(238,231,215,0.45)" strokeWidth="0.7" />
        {/* wellness pavilion */}
        <circle cx="330" cy="90" r="40" fill="none" stroke="rgba(238,231,215,0.4)" strokeWidth="0.8" />
        {/* 30m pool */}
        <rect x="276" y="158" width="152" height="54" rx="6" fill="rgba(122,166,178,0.12)" stroke="rgba(122,166,178,0.55)" strokeWidth="1" />
        <path d="M276 194 q 19 -6 38 0 t 38 0 t 38 0 t 38 0" fill="none" stroke="rgba(122,166,178,0.5)" strokeWidth="0.8" />
        {/* beach line */}
        <path d="M16 262 q 30 -10 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="rgba(201,169,97,0.5)" strokeWidth="1" />
        <path d="M16 280 q 30 -10 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="rgba(122,166,178,0.4)" strokeWidth="1" />
        {/* labels */}
        <text x="93" y="92" textAnchor="middle" fill="rgba(238,231,215,0.5)" fontSize="7.5" letterSpacing="1">SUITE I</text>
        <text x="195" y="92" textAnchor="middle" fill="rgba(238,231,215,0.5)" fontSize="7.5" letterSpacing="1">SUITE II</text>
        <text x="93" y="168" textAnchor="middle" fill="rgba(238,231,215,0.45)" fontSize="7.5" letterSpacing="1">LIVING</text>
        <text x="330" y="93" textAnchor="middle" fill="rgba(238,231,215,0.5)" fontSize="8" letterSpacing="1">WELLNESS</text>
        <text x="352" y="188" textAnchor="middle" fill="rgba(122,166,178,0.75)" fontSize="8" letterSpacing="1.5">PRIVATE POOL</text>
        <text x="230" y="274" textAnchor="middle" fill="rgba(201,169,97,0.8)" fontSize="8" letterSpacing="2">PRIVATE BEACH</text>
      </svg>
      <figcaption className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.22em] text-sand/50">
        <span>Indicative estate plan</span>
        <span className="text-gold/70">Not to scale</span>
      </figcaption>
    </figure>
  );
}

function VillaFeature({ room, index }: { room: Room; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <section id={room.slug} className="scroll-mt-28 border-t border-white/10 py-section">
      <div className="mx-auto max-w-[100rem] px-6 md:px-10">
        <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
              <Image
                src={room.image}
                alt={`${room.name} — the estate`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <SectionLabel index={`0${index + 1}`}>{room.category}</SectionLabel>
            <AnimatedText
              as="h3"
              text={room.name}
              className="mt-6 font-serif text-4xl font-light leading-[1.0] tracking-[-0.015em] text-sand md:text-6xl"
            />
            <p className="mt-5 font-serif text-2xl italic text-gold-light">{room.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-sand/70">{room.description}</p>
            <SpecList room={room} className="mt-8" />
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/booking" variant="gold" cursorLabel="Reserve">
                Reserve the villa
              </Button>
              <span className="font-serif text-lg text-sand">
                {formatCurrency(room.price)}
                <span className="text-sm text-sand/50"> / night</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {room.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={src}
                    alt={`${room.name} — detail ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 29vw"
                    className="object-cover transition-transform duration-[1400ms] ease-luxe hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 text-sand/50">Within the estate</p>
            <ul className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm text-sand/75">
                  <span className="h-1 w-1 shrink-0 rotate-45 bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
            <VillaPlan label={room.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VillasPage() {
  return (
    <>
      <PageHero
        eyebrow="Residences · 03"
        title="Private Villas"
        intro="Beachfront estates of teak and coral stone, each with its own pool, its own pavilion and its own stretch of the sea — tended by a resident team who keep the day effortless."
        image={villas[0].image}
        imageAlt="A private beachfront villa with a pool at Aurelia"
      />

      {/* Intro */}
      <section className="py-section">
        <div className="mx-auto grid max-w-editorial gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="The private estates"
              index="I"
              title="An island within the island."
              titleClassName="md:text-5xl lg:text-6xl"
            />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="text-lg leading-relaxed text-sand/80">
              To take a villa at Aurelia is to draw a line around a piece of the
              reserve and call it yours. Walls of glass fold entirely away; the
              living pavilion becomes the beach; the pool runs to meet the sea.
              A resident team — chef, butlers, a captain for the estate&apos;s
              yacht — moves quietly at the edges so that the days belong wholly
              to you.
            </p>
            <p className="mt-6 text-base leading-relaxed text-sand/60">
              And at the far northern point, beyond the last frangipani, stands
              the most private address on Maré Séraphine — offered to a very few.
            </p>
            <GoldLine className="mt-10" />
          </Reveal>
        </div>
      </section>

      {/* ---- The Celestia Residence — the opulent anchored feature ---- */}
      {celestia && (
        <section id="celestia" className="scroll-mt-28 relative overflow-hidden border-y border-gold/20 py-section">
          {/* full-bleed backdrop */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={celestia.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/90" />
          </div>

          <div className="mx-auto max-w-[100rem] px-6 md:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel index="✦" align="center" className="mb-6">
                By invitation only
              </SectionLabel>
              <AnimatedText
                as="h2"
                text="The Celestia Residence"
                className="font-serif text-5xl font-light leading-[0.95] tracking-[-0.02em] text-sand md:text-8xl"
              />
              <p className="mt-6 font-serif text-2xl italic text-gold-light md:text-3xl">
                {celestia.tagline}
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-sand/80">
                {celestia.description}
              </p>
            </div>

            {/* opulent layout */}
            <div className="mt-16 grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-8">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm ring-1 ring-gold/25">
                  <Image
                    src={celestia.gallery[0] ?? celestia.image}
                    alt="The Celestia Residence — the private beach and pool"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <div className="flex flex-col gap-6 lg:col-span-4">
                {celestia.gallery.slice(1, 3).map((src, i) => (
                  <Reveal key={src} delay={0.1 + i * 0.1} className="flex-1">
                    <div className="relative aspect-[4/3] h-full overflow-hidden rounded-sm ring-1 ring-gold/20">
                      <Image
                        src={src}
                        alt={`The Celestia Residence — detail ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-7">
                <SpecList room={celestia} />
              </Reveal>
              <div className="lg:col-span-5">
                <p className="eyebrow mb-5 text-gold/70">The Celestia holds</p>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {celestia.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-sm text-sand/80">
                      <span className="h-1 w-1 shrink-0 rotate-45 bg-gold" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6 text-center">
              <VillaPlan label={celestia.slug} />
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <Button href="/booking" variant="gold" size="lg" cursorLabel="Enquire">
                  Request an invitation
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Speak with the atelier
                </Button>
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-sand/50">
                From {formatCurrency(celestia.price)} / night · offered to a select few
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Estate services */}
      <section className="border-b border-white/10 bg-ink-800/40 py-section">
        <div className="mx-auto max-w-editorial px-6 md:px-10">
          <SectionHeading
            eyebrow="Attended, entirely"
            index="II"
            title="The estate services"
            align="center"
          />
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-sand/70">
            Every villa arrives with its own household — a team drawn from the
            reserve to keep your days seamless and your privacy absolute.
          </p>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {ESTATE_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.05} className="bg-ink">
                <div className="flex h-full flex-col gap-4 p-8">
                  <s.icon size={22} className="text-gold" strokeWidth={1.3} />
                  <h4 className="font-serif text-lg font-light text-sand">{s.title}</h4>
                  <p className="text-sm leading-relaxed text-sand/60">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other villas */}
      {otherVillas.map((room, i) => (
        <VillaFeature key={room.slug} room={room} index={i} />
      ))}

      {/* FAQ */}
      <section className="border-t border-white/10 py-section">
        <div className="mx-auto grid max-w-editorial gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="Good to know"
              index="III"
              title="Before you arrive."
              titleClassName="md:text-4xl lg:text-5xl"
            />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-section">
        <div className="absolute inset-0 -z-10 opacity-40">
          <Image src={villas[0].gallery[0] ?? villas[0].image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <SectionHeading eyebrow="Begin" title="Draw a line around your own island." align="center" />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sand/70">
            The villas — and The Celestia above all — are held for the very few.
            Share your dates and our atelier will compose the rest around you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/booking" variant="gold" size="lg" cursorLabel="Book">
              Check availability
            </Button>
            <Button href="/rooms" variant="outline" size="lg">
              See all residences
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-sand/40">
            Or call our atelier · {BRAND.phone}
          </p>
        </div>
      </section>
    </>
  );
}
