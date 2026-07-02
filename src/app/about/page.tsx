import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/site";
import {
  BrandStory,
  MissionVision,
  Architecture,
  Timeline,
  Sustainability,
  Leadership,
  AwardsPress,
  AboutManifesto,
} from "./AboutSections";

export const metadata: Metadata = {
  title: "The Reserve · About | AURELIA",
  description:
    "The story of Aurelia — a private-island reserve on Maré Séraphine drawn by Studio Kenzō Aramaki, restoring its reef and giving more to the ocean than it takes.",
};

export default function AboutPage() {
  return (
    <>
      <section id="hero">
        <PageHero
          eyebrow="The Reserve"
          title="Where the Horizon Belongs to You"
          intro="One island in the South Pacific, kept apart from the world. This is the story of how Aurelia came to be — and the quiet convictions that hold it together."
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          imageAlt="The Aurelia reserve at dusk, dissolving into its island"
        />
      </section>

      <BrandStory />
      <MissionVision />
      <Architecture />
      <Timeline />
      <Sustainability />
      <Leadership />
      <AwardsPress />
      <AboutManifesto />

      {/* Closing CTA */}
      <section className="relative bg-ink px-6 py-section md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            index="08"
            align="center"
            eyebrow="Come and See"
            title="The rest is best told in person"
            titleClassName="md:text-5xl"
          />
          <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              A story can only carry you to the edge of the lagoon. Let our
              concierge arrange the seaplane, and let the island tell the rest.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/booking" variant="gold" cursorLabel="Book">
              Begin a stay
            </Button>
            <Button href="/contact" variant="outline" cursorLabel="Ask">
              Speak with concierge
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-stone">
            {BRAND.location}
          </p>
        </div>
      </section>
    </>
  );
}
