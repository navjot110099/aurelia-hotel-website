import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, GoldLine, Marquee } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { NEWSLETTER_NOTE } from "@/lib/site";
import { OffersGrid } from "./OffersGrid";

export const metadata: Metadata = {
  title: "Offers & Journeys",
  description:
    "Rare invitations and considered journeys at Aurelia — extended escapes, honeymoons written in salt, and the reserve entirely reserved for you.",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Invitations"
        title="Offers & Journeys"
        intro="Not discounts — invitations. A small collection of ways to give a stay at Aurelia a shape all its own, each composed with the same restraint as the island itself."
        image="/images/coralline-suite.jpg"
        imageAlt="Coralline Signature Suite at dusk above the lagoon"
      />

      {/* Intro */}
      <section className="relative bg-ink px-6 pt-section md:px-10">
        <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <SectionHeading
            index="01"
            eyebrow="The Collection"
            title="A season's worth of rare beginnings"
          />
          <Reveal delay={0.15} className="flex flex-col justify-end text-base leading-relaxed text-stone-light">
            <p>
              Each journey below is limited, seasonal and quietly generous. They
              are offered to guests of the reserve and to those who have joined
              our house list. Should none quite suit the occasion you have in
              mind, our concierge will draw one for you alone.
            </p>
          </Reveal>
        </div>
        <GoldLine className="mx-auto mt-14 max-w-editorial" />
      </section>

      {/* Offer cards */}
      <section className="relative bg-ink px-6 py-section md:px-10">
        <OffersGrid />
      </section>

      {/* Membership / house list */}
      <section className="relative overflow-hidden bg-ink-800 py-section">
        <Marquee items={["The House List", "By Invitation", "Membership", "Reserved"]} className="opacity-60" />
        <div className="mx-auto mt-16 max-w-3xl px-6 text-center md:px-10">
          <SectionHeading
            index="02"
            align="center"
            eyebrow="Membership"
            title="The House List"
            titleClassName="md:text-5xl"
          />
          <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              A quiet correspondence for those who return. Members receive first
              refusal on the reserve’s most sought seasons, priority on the
              Celestia Residence, and invitations that are never published —
              private tables at Maré, cellar dinners, and the island’s occasional
              buyout weekends.
            </p>
          </Reveal>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-stone">
            {NEWSLETTER_NOTE}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" cursorLabel="Join">
              Request an invitation
            </Button>
            <Button href="/booking" variant="outline" cursorLabel="Book">
              Plan a stay
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
