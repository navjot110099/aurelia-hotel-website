import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/site";
import {
  WeddingNarrative,
  WeddingVenues,
  WeddingPackages,
  WeddingTestimonial,
} from "./WeddingsSections";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Marry at the edge of the world. A private-island wedding on Aurelia — three ceremony venues, bespoke packages and a reserve that holds a single celebration at a time.",
};

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Weddings"
        title="Marry the Horizon"
        intro="One island. One celebration at a time. A day drawn from the tide, the light and the two of you — witnessed by the people you love and the open Pacific."
        image="/images/wedding-celebration.jpg"
        imageAlt="A wedding ceremony at the water's edge on Aurelia at golden hour"
        align="center"
      />

      <WeddingNarrative />
      <WeddingVenues />
      <WeddingPackages />
      <WeddingTestimonial />

      {/* Enquiry CTA */}
      <section className="relative bg-ink px-6 py-section md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            index="04"
            align="center"
            eyebrow="Begin"
            title="Write to us of your day"
            titleClassName="md:text-5xl"
          />
          <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              Tell us your season and the number of hearts you’ll bring. Our
              wedding producer will reply with a first vision of the day, and — if
              you wish — an invitation to visit the island before you decide.
              Aurelia hosts only a handful of weddings each year.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" cursorLabel="Enquire">
              Enquire about your wedding
            </Button>
            <Button href="/offers" variant="outline" cursorLabel="Honeymoon">
              Honeymoon journeys
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-stone">
            {BRAND.reservations}
          </p>
        </div>
      </section>
    </>
  );
}
