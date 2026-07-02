import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading, GoldLine } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQ, BRAND } from "@/lib/site";
import { FaqAccordion } from "./FaqAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked | AURELIA",
  description:
    "Everything you might wish to know before you arrive at Aurelia — from private transfers to the reserve's sustainability commitment.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Before You Arrive"
        title="Questions, Answered"
        intro="A quiet primer for the curious — and for those already dreaming of the lagoon. Should a question remain, our concierge is never more than a message away."
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Overwater residence at Aurelia opening onto the turquoise lagoon"
      />

      <section className="relative bg-ink px-6 py-section md:px-10" id="faq">
        <div className="mx-auto grid max-w-editorial gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              index="—"
              eyebrow="The Essentials"
              title="What guests ask most"
              titleClassName="md:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.15} className="mt-8 max-w-sm text-base leading-relaxed text-stone-light">
              <p>
                Every stay at Aurelia is composed by hand, so few answers are ever
                final. Consider these a beginning. Our reservations atelier will
                tailor the rest to your journey.
              </p>
            </Reveal>
            <GoldLine className="mt-10 max-w-[12rem]" />
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact" variant="gold" cursorLabel="Ask">
                Speak with concierge
              </Button>
              <Button href="/booking" variant="outline" cursorLabel="Book">
                Begin a stay
              </Button>
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-stone">
              {BRAND.reservations}
            </p>
          </div>

          <div>
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
