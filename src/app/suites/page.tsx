import type { Metadata } from "next";
import Image from "next/image";
import type { Room } from "@/lib/site";
import { ROOMS_BY_CATEGORY, FAQ, TESTIMONIALS, BRAND } from "@/lib/site";
import { formatCurrency } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { SpecList } from "@/components/cards/SpecList";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionHeading, SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { RotateCw, Move, Quote, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Signature Suites · AURELIA",
  description:
    "Duplex overwater suites and the island's most exalted address — infinity edges, glass-floor lounges and rooftop observatories above the coral gardens of Maré Séraphine.",
};

const suites = ROOMS_BY_CATEGORY.Suite;

/** SVG floor plan tuned for the larger, multi-level suites. */
function SuitePlan({ label }: { label: string }) {
  return (
    <figure className="relative overflow-hidden rounded-sm border border-white/10 bg-ink-800/60 p-6">
      <svg viewBox="0 0 420 300" className="h-auto w-full" role="img" aria-label={`Schematic floor plan — ${label}`}>
        <defs>
          <pattern id={`sgrid-${label}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,169,97,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="420" height="300" fill={`url(#sgrid-${label})`} />
        {/* envelope */}
        <rect x="36" y="34" width="348" height="196" fill="none" stroke="rgba(201,169,97,0.55)" strokeWidth="1.2" />
        {/* wraparound deck */}
        <rect x="20" y="18" width="380" height="228" rx="4" fill="none" stroke="rgba(201,169,97,0.25)" strokeWidth="0.8" strokeDasharray="3 4" />
        {/* partitions */}
        <line x1="200" y1="34" x2="200" y2="230" stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" />
        <line x1="200" y1="140" x2="384" y2="140" stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" />
        {/* principal bed */}
        <rect x="66" y="70" width="96" height="72" fill="none" stroke="rgba(238,231,215,0.5)" strokeWidth="0.8" />
        <line x1="66" y1="88" x2="162" y2="88" stroke="rgba(238,231,215,0.35)" strokeWidth="0.6" />
        {/* infinity pool */}
        <rect x="236" y="164" width="128" height="46" rx="4" fill="rgba(122,166,178,0.12)" stroke="rgba(122,166,178,0.55)" strokeWidth="1" />
        <path d="M236 200 q 16 -6 32 0 t 32 0 t 32 0 t 32 0" fill="none" stroke="rgba(122,166,178,0.5)" strokeWidth="0.8" />
        {/* spa cabana */}
        <circle cx="284" cy="96" r="30" fill="none" stroke="rgba(238,231,215,0.45)" strokeWidth="0.8" />
        {/* labels */}
        <text x="114" y="112" textAnchor="middle" fill="rgba(238,231,215,0.55)" fontSize="9" letterSpacing="1.5">PRINCIPAL</text>
        <text x="284" y="99" textAnchor="middle" fill="rgba(238,231,215,0.5)" fontSize="8" letterSpacing="1">SPA CABANA</text>
        <text x="118" y="180" textAnchor="middle" fill="rgba(238,231,215,0.45)" fontSize="8" letterSpacing="1">GLASS LOUNGE</text>
        <text x="300" y="190" textAnchor="middle" fill="rgba(122,166,178,0.75)" fontSize="8" letterSpacing="1.5">INFINITY EDGE</text>
        <text x="210" y="262" textAnchor="middle" fill="rgba(201,169,97,0.8)" fontSize="8" letterSpacing="2">WRAPAROUND DECK</text>
      </svg>
      <figcaption className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.22em] text-sand/50">
        <span>Indicative plan · upper level</span>
        <span className="text-gold/70">Not to scale</span>
      </figcaption>
    </figure>
  );
}

/** Faux-interactive 360° tour panel — a visual mock with a rotating hint. */
function VirtualTour({ image, name }: { image: string; name: string }) {
  return (
    <div className="group relative aspect-[16/10] w-full cursor-grab overflow-hidden rounded-sm border border-white/10" data-cursor="Drag">
      <Image
        src={image}
        alt={`360° virtual tour of the ${name}`}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

      {/* rotating hint ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-slow-spin rounded-full border border-dashed border-gold/50" />
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/60 text-gold backdrop-blur-md">
            <RotateCw size={22} strokeWidth={1.4} />
          </span>
        </div>
      </div>

      {/* top-left badge */}
      <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-sand backdrop-blur-sm">
        360° Virtual Tour
      </span>

      {/* drag cursor label */}
      <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-ink/50 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-sand/80 backdrop-blur-sm">
        <Move size={14} className="text-gold" /> Drag to look around
      </span>

      {/* hotspots */}
      <span className="absolute right-[22%] top-[38%] h-3 w-3 animate-ping rounded-full bg-gold/70" />
      <span className="absolute right-[22%] top-[38%] h-3 w-3 rounded-full bg-gold" />
      <span className="absolute left-[30%] bottom-[30%] h-3 w-3 animate-ping rounded-full bg-gold/70" />
      <span className="absolute left-[30%] bottom-[30%] h-3 w-3 rounded-full bg-gold" />
    </div>
  );
}

function SuiteFeature({ room, index }: { room: Room; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <section id={room.slug} className="scroll-mt-28 border-t border-white/10 py-section">
      <div className="mx-auto max-w-[100rem] px-6 md:px-10">
        {/* Full-bleed alternating hero for the suite */}
        <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
              <Image
                src={room.image}
                alt={`${room.name} — principal view`}
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
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/booking" variant="gold" cursorLabel="Reserve">
                Reserve the suite
              </Button>
              <span className="font-serif text-lg text-sand">
                {formatCurrency(room.price)}
                <span className="text-sm text-sand/50"> / night</span>
              </span>
            </div>
          </div>
        </div>

        {/* Specs + gallery strip */}
        <div className="mt-12">
          <SpecList room={room} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Virtual tour */}
          <Reveal className="lg:col-span-7">
            <VirtualTour image={room.gallery[0] ?? room.image} name={room.name} />
          </Reveal>

          {/* Amenities + plan */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 text-sand/50">Within the suite</p>
            <ul className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm text-sand/75">
                  <span className="h-1 w-1 shrink-0 rotate-45 bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
            <SuitePlan label={room.slug} />
          </div>
        </div>

        {/* Secondary gallery */}
        {room.gallery.length > 1 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {room.gallery.slice(1).map((src, i) => (
              <Reveal key={src} delay={i * 0.08}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                  <Image
                    src={src}
                    alt={`${room.name} — detail ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-[1400ms] ease-luxe hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SuitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Residences · 02"
        title="Signature Suites"
        intro="Where a room becomes a residence. Duplex terraces above the coral garden, infinity edges that dissolve into the lagoon, and the island's single most exalted address."
        image={suites[0].image}
        imageAlt="A Signature Suite with an infinity-edge pool above the ocean at Aurelia"
      />

      {/* Immersive intro */}
      <section className="py-section">
        <div className="mx-auto max-w-editorial px-6 md:px-10">
          <SectionHeading
            eyebrow="The art of more"
            index="I"
            title="Space is the rarest luxury of all."
            align="center"
            className="mx-auto max-w-4xl"
          />
          <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-sand/80">
              A suite at Aurelia is measured not in square metres but in horizon.
              Each is a self-contained world — a glass-floor lounge suspended over
              the reef, a private spa cabana, a dining pavilion beneath the stars
              — served by a dedicated butler who learns your rhythm and keeps to
              the edges of it.
            </p>
            <GoldLine className="mx-auto mt-10 max-w-xs" />
          </Reveal>
        </div>
      </section>

      {/* Suite features */}
      {suites.map((room, i) => (
        <SuiteFeature key={room.slug} room={room} index={i} />
      ))}

      {/* Reviews */}
      <section className="border-y border-white/10 bg-ink-800/40 py-section">
        <div className="mx-auto max-w-editorial px-6 md:px-10">
          <SectionHeading
            eyebrow="In their words"
            index="II"
            title="What the suites are remembered for."
            align="center"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <figure className="glass flex h-full flex-col rounded-sm p-8">
                  <div className="mb-5 flex items-center gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <Quote size={26} className="mb-4 text-gold/50" />
                  <blockquote className="flex-1 font-serif text-xl font-light italic leading-relaxed text-sand">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-sm font-medium text-sand">{t.author}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-sand/50">{t.origin}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section">
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
          <Image src={suites[0].image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <SectionHeading eyebrow="Begin" title="Claim the finer horizon." align="center" />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sand/70">
            The suites are few and much requested. Share your dates and our atelier
            will hold the residence while your journey is composed around it.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/booking" variant="gold" size="lg" cursorLabel="Book">
              Check availability
            </Button>
            <Button href="/villas" variant="outline" size="lg">
              Discover the villas
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
