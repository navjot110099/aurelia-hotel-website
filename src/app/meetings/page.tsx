import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/site";
import { MeetingSpaces, MeetingTech, MeetingAgenda } from "./MeetingsSections";

export const metadata: Metadata = {
  title: "Executive Retreats & Meetings",
  description:
    "Executive retreats and leadership offsites on a private South Pacific island — overwater boardrooms, seamless technology, wellness-integrated agendas and full-island buyouts.",
};

export default function MeetingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Executive Retreats"
        title="Where Leaders Think"
        intro="The clearest decisions are made where the noise ends. Aurelia hosts small, consequential gatherings — leadership offsites, board retreats and partner summits — on an island with a single agenda: yours."
        image="/images/architecture-dusk.jpg"
        imageAlt="A glass-walled overwater meeting pavilion at Aurelia"
      />

      {/* Intro */}
      <section className="relative bg-ink px-6 pt-section md:px-10">
        <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <SectionHeading
            index="—"
            eyebrow="The Case"
            title="Distance is not a cost. It is the point."
          />
          <Reveal delay={0.15} className="flex flex-col justify-end text-base leading-relaxed text-stone-light">
            <p>
              A retreat at Aurelia removes the thousand small interruptions that
              blunt a team’s best thinking. No lobby traffic, no competing events,
              no city beyond the reef. Just your people, a producer who
              anticipates every need, and the rare permission to concentrate. We
              host one group at a time.
            </p>
          </Reveal>
        </div>
      </section>

      <MeetingSpaces />
      <MeetingTech />
      <MeetingAgenda />

      {/* Buyout + CTA */}
      <section className="relative bg-ink-800 px-6 py-section md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            index="04"
            align="center"
            eyebrow="Exclusive Use"
            title="Take the whole island"
            titleClassName="md:text-5xl"
          />
          <Reveal delay={0.15} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              For summits that demand absolute discretion, Aurelia offers full
              buyouts of all thirty-four residences and the island’s entire team.
              Your company arrives to a reserve that is, for those days, private
              in every sense — sealed, staffed and singular. Our meetings atelier
              will return a tailored proposal within a day.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="gold" cursorLabel="Enquire">
              Plan a retreat
            </Button>
            <Button href="/offers" variant="outline" cursorLabel="Buyout">
              Request a buyout
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
