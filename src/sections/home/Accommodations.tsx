"use client";

import { ROOMS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/Primitives";
import { RoomCard } from "@/components/cards/RoomCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** The signature residences — a three-up editorial grid of featured stays. */
export function Accommodations() {
  const featured = ROOMS.filter((r) => r.featured).slice(0, 3);

  return (
    <section id="stay" className="bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The Residences"
            index="02"
            title="Thirty-four ways to belong to the sea."
            titleClassName="max-w-2xl"
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-stone-light">
              From overwater rooms that open onto the lagoon to a beachfront
              estate with its own crew — every residence is a private world,
              tended by a butler who knows your name before you arrive.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((room, i) => (
            <RoomCard key={room.slug} room={room} index={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Button href="/rooms" variant="outline" cursorLabel="Explore">
            Ocean Rooms
          </Button>
          <Button href="/suites" variant="outline" cursorLabel="Explore">
            Signature Suites
          </Button>
          <Button href="/villas" variant="gold" cursorLabel="Explore">
            Private Villas
          </Button>
        </div>
      </div>
    </section>
  );
}
