import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/site";
import { VenueGrid, EventTypes } from "./EventsSections";

export const metadata: Metadata = {
  title: "Private Events & Celebrations | AURELIA",
  description:
    "Milestone celebrations and private gatherings on a South Pacific island reserve — four extraordinary venues, one dedicated team, and the whole of Aurelia at your disposal.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Events"
        title="Occasions, Islanded"
        intro="When a moment deserves more than a room, it deserves an island. Aurelia hosts a small number of private celebrations each year — each one composed as carefully as a nine-course dinner."
        image="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Candlelit beach dinner beneath the stars at Aurelia"
      />

      {/* Intro */}
      <section className="relative bg-ink px-6 pt-section md:px-10">
        <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <SectionHeading
            index="—"
            eyebrow="The Idea"
            title="An entire island, arranged around a single evening"
          />
          <Reveal delay={0.15} className="flex flex-col justify-end text-base leading-relaxed text-stone-light">
            <p>
              There is no ballroom at Aurelia, and no queue of events waiting
              behind yours. When you gather here, the reserve holds a single
              celebration at a time. Our events atelier — a team of six, led by a
              dedicated producer — draws the evening from the tides, the season
              and your own imagination.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ink px-6 py-section md:px-10">
        <VenueGrid />
      </section>

      <section className="relative bg-ink-800 px-6 py-section md:px-10">
        <EventTypes />
      </section>

      {/* Planning CTA */}
      <section className="relative bg-ink px-6 py-section md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            index="03"
            align="center"
            eyebrow="Begin"
            title="Let us draw your evening"
            titleClassName="md:text-5xl"
          />
          <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              Share the occasion, the season and the number in your party. Within
              a day, our producer will return a first sketch of the evening —
              venue, table, menu and the shape of the light. Full island buyouts
              of all thirty-four residences are available for the grandest
              gatherings.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" cursorLabel="Enquire">
              Enquire about an event
            </Button>
            <Button href="/offers" variant="outline" cursorLabel="Buyout">
              The reserve, entirely yours
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-stone">
            {BRAND.phone} · {BRAND.email}
          </p>
        </div>
      </section>
    </>
  );
}
