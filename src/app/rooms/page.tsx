import type { Metadata } from "next";
import Image from "@/components/ui/SmartImage";
import type { Room } from "@/lib/site";
import { ROOMS_BY_CATEGORY, FAQ, BRAND } from "@/lib/site";
import { formatCurrency } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { RoomCard } from "@/components/cards/RoomCard";
import { SpecList } from "@/components/cards/SpecList";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SectionHeading, SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { Waves, Sparkles, Coffee, ShieldCheck, Leaf, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Ocean Rooms",
  description:
    "Overwater and garden retreats above the turquoise shallows of Maré Séraphine — hand-troweled lime, floating oak beds and private decks that open to the reef.",
};

const rooms = ROOMS_BY_CATEGORY.Room;

const HOUSE_AMENITIES = [
  { icon: ShieldCheck, title: "A butler, always", note: "One dedicated to your residence, from arrival to departure." },
  { icon: Coffee, title: "Daybreak & dusk", note: "Breakfast however you take it; canapés as the sun falls." },
  { icon: Waves, title: "The water, yours", note: "Non-motorised craft, snorkels and the lagoon at your door." },
  { icon: Sparkles, title: "The wellness pavilion", note: "Overwater float, steam and a dawn yoga deck." },
  { icon: Leaf, title: "Island-grown", note: "Herbs, fruit and honey from our own gardens and hives." },
  { icon: Wind, title: "Return by air & sea", note: "Private seaplane or helicopter transfers, both ways." },
];

/** An elegant hand-drawn floor plan rendered as SVG — a signature detail. */
function FloorPlan({ label }: { label: string }) {
  return (
    <figure className="relative overflow-hidden rounded-sm border border-white/10 bg-ink-800/60 p-6">
      <svg
        viewBox="0 0 400 300"
        className="h-auto w-full"
        role="img"
        aria-label={`Schematic floor plan — ${label}`}
      >
        <defs>
          <pattern id={`grid-${label}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,169,97,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#grid-${label})`} />
        {/* outer envelope */}
        <rect x="40" y="40" width="320" height="200" fill="none" stroke="rgba(201,169,97,0.55)" strokeWidth="1.2" />
        {/* interior partitions */}
        <line x1="220" y1="40" x2="220" y2="160" stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" />
        <line x1="220" y1="160" x2="360" y2="160" stroke="rgba(201,169,97,0.35)" strokeWidth="0.8" />
        {/* bed */}
        <rect x="70" y="70" width="90" height="70" fill="none" stroke="rgba(238,231,215,0.5)" strokeWidth="0.8" />
        <line x1="70" y1="86" x2="160" y2="86" stroke="rgba(238,231,215,0.35)" strokeWidth="0.6" />
        {/* tub */}
        <rect x="250" y="70" width="70" height="42" rx="10" fill="none" stroke="rgba(238,231,215,0.5)" strokeWidth="0.8" />
        {/* deck / water */}
        <line x1="40" y1="240" x2="360" y2="240" stroke="rgba(201,169,97,0.55)" strokeWidth="1.2" />
        <path d="M40 262 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="rgba(122,166,178,0.55)" strokeWidth="1" />
        <path d="M40 278 q 20 -8 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="rgba(122,166,178,0.35)" strokeWidth="1" />
        {/* labels */}
        <text x="115" y="112" textAnchor="middle" fill="rgba(238,231,215,0.55)" fontSize="9" letterSpacing="1.5">BEDROOM</text>
        <text x="285" y="96" textAnchor="middle" fill="rgba(238,231,215,0.5)" fontSize="8" letterSpacing="1">SOAK</text>
        <text x="290" y="200" textAnchor="middle" fill="rgba(238,231,215,0.4)" fontSize="8" letterSpacing="1">DRESSING</text>
        <text x="200" y="230" textAnchor="middle" fill="rgba(201,169,97,0.8)" fontSize="8" letterSpacing="2">SUNDECK</text>
        <text x="200" y="294" textAnchor="middle" fill="rgba(122,166,178,0.7)" fontSize="7.5" letterSpacing="2">LAGOON</text>
      </svg>
      <figcaption className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.22em] text-sand/50">
        <span>Indicative plan</span>
        <span className="text-gold/70">Not to scale</span>
      </figcaption>
    </figure>
  );
}

function RoomDetail({ room, index }: { room: Room; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <section
      id={room.slug}
      className="scroll-mt-28 border-t border-white/10 py-section"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <div className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Gallery */}
          <Reveal className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={room.image}
                alt={`${room.name} — principal view`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {room.gallery.map((src, i) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={src}
                    alt={`${room.name} — detail ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-[1100ms] ease-luxe hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:pt-4">
            <SectionLabel index={`0${index + 1}`}>{room.category}</SectionLabel>
            <AnimatedText
              as="h3"
              text={room.name}
              className="mt-6 font-serif text-4xl font-light leading-[1.02] tracking-[-0.01em] text-sand md:text-5xl"
            />
            <p className="mt-4 font-serif text-xl italic text-gold-light">{room.tagline}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-sand/70">
              {room.description}
            </p>

            <SpecList room={room} className="mt-10" />

            {/* Amenities */}
            <div className="mt-10">
              <p className="eyebrow mb-5 text-sand/50">In this residence</p>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-sm text-sand/75">
                    <span className="h-1 w-1 shrink-0 rotate-45 bg-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Floor plan */}
            <div className="mt-10">
              <p className="eyebrow mb-5 text-sand/50">The layout</p>
              <FloorPlan label={room.slug} />
            </div>

            {/* Reserve */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href="/booking" variant="gold" cursorLabel="Reserve">
                Reserve this residence
              </Button>
              <span className="font-serif text-lg text-sand">
                {formatCurrency(room.price)}
                <span className="text-sm text-sand/50"> / night</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Residences · 01"
        title="Ocean Rooms"
        intro="Rooms that hold nothing between you and the water — overwater on stilts, or hidden within the frangipani gardens, each one a private frame of sea and sky."
        image={rooms[0].image}
        imageAlt="An overwater Ocean Room above the turquoise lagoon at Aurelia"
      />

      {/* Intro editorial */}
      <section className="py-section">
        <div className="mx-auto grid max-w-editorial gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="The invitation"
              index="I"
              title="The smallest way to have an island entirely."
              titleClassName="md:text-5xl lg:text-6xl"
            />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="text-lg leading-relaxed text-sand/80">
              Our Ocean Rooms are the quiet beginning of Aurelia — and no less
              considered for their scale. Each is drawn by Studio Kenzō Aramaki
              to disappear into the reef: lime-washed walls that hold the day&apos;s
              warmth, floating oak beds set toward the horizon, and glass that
              slides entirely away so the room becomes a deck, and the deck a
              lagoon.
            </p>
            <p className="mt-6 text-base leading-relaxed text-sand/60">
              There are only a handful. Two silhouettes — one on stilts above
              the shallows, one folded into the gardens — and a single promise:
              that from the moment you wake, the horizon is yours alone.
            </p>
            <GoldLine className="mt-10" />
          </Reveal>
        </div>
      </section>

      {/* Grid of RoomCards */}
      <section className="pb-section">
        <div className="mx-auto max-w-editorial px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {rooms.map((room, i) => (
              <RoomCard key={room.slug} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Every residence includes — amenities band */}
      <section className="border-y border-white/10 bg-ink-800/40 py-section">
        <div className="mx-auto max-w-editorial px-6 md:px-10">
          <SectionHeading
            eyebrow="Included, without asking"
            index="II"
            title="Every residence includes"
            align="center"
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {HOUSE_AMENITIES.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06} className="bg-ink">
                <div className="flex h-full flex-col gap-4 p-8">
                  <a.icon size={22} className="text-gold" strokeWidth={1.3} />
                  <h4 className="font-serif text-xl font-light text-sand">{a.title}</h4>
                  <p className="text-sm leading-relaxed text-sand/60">{a.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Room details */}
      {rooms.map((room, i) => (
        <RoomDetail key={room.slug} room={room} index={i} />
      ))}

      {/* FAQ */}
      <section className="border-t border-white/10 py-section">
        <div className="mx-auto grid max-w-editorial gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="Good to know"
              index="III"
              title="Questions, considered."
              titleClassName="md:text-4xl lg:text-5xl"
            />
            <p className="mt-6 text-sm leading-relaxed text-sand/60">
              A few things guests ask before they arrive. For anything else, our
              reservations atelier answers within the hour.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-section">
        <div className="absolute inset-0 -z-10 opacity-40">
          <Image
            src={rooms[0].gallery[0]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <SectionHeading
            eyebrow="Begin"
            title="Reserve your window on the sea."
            align="center"
          />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sand/70">
            Availability across the Ocean Rooms is limited by design. Choose your
            dates and our team will hold your residence while we tailor the rest.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/booking" variant="gold" size="lg" cursorLabel="Book">
              Check availability
            </Button>
            <Button href="/suites" variant="outline" size="lg">
              Explore the suites
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
