import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/site";
import { CultureStatement, Values, Benefits } from "./CultureSections";
import { RolesList } from "./RolesList";

export const metadata: Metadata = {
  title: "Careers · Life at Aurelia | AURELIA",
  description:
    "Live and work on a private South Pacific island reserve. Explore open roles at Aurelia and join a team of two hundred who make the impossible feel effortless.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Life at Aurelia"
        intro="Two hundred people, one island, and a shared devotion to a standard the world calls impossible. If hospitality is your craft, this is where it comes alive."
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
        imageAlt="The palms and beach of the Aurelia reserve at golden hour"
      />

      <CultureStatement />
      <Values />
      <Benefits />

      {/* Open roles */}
      <section className="relative bg-ink-800 px-6 py-section md:px-10" id="roles">
        <div className="mx-auto max-w-editorial">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading index="04" eyebrow="Open Positions" title="Where you might fit" />
            <Reveal delay={0.15} className="max-w-sm text-base leading-relaxed text-stone-light">
              <p>
                A living list of the roles we are hiring for now. Don't see yours?
                We are always glad to meet exceptional people — write to us anyway.
              </p>
            </Reveal>
          </div>
          <RolesList />
        </div>
      </section>

      {/* Application CTA */}
      <section className="relative bg-ink px-6 py-section md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            index="05"
            align="center"
            eyebrow="Introduce Yourself"
            title="Begin your island story"
            titleClassName="md:text-5xl"
          />
          <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              Send us your story and the role that calls to you. Every application
              is read by a person, and every promising one is answered. We hire
              for warmth and train for everything else.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" cursorLabel="Apply">
              Send an application
            </Button>
            <Button href="/about" variant="outline" cursorLabel="Learn">
              About the reserve
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-stone">
            careers@aurelia-reserve.com · {BRAND.location}
          </p>
        </div>
      </section>
    </>
  );
}
