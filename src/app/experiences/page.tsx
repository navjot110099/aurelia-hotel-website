import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import {
  ExperiencesIntro,
  ExperienceShowcase,
  ButlerCTA,
} from "./ExperienceSections";

export const metadata: Metadata = {
  title: "Experiences · Aurelia",
  description:
    "A private yacht for the outer atolls, helicopter journeys to hidden lagoons, dives through a pristine reef and an island of your own for the day — Aurelia's experiences are composed around the shape of your stay.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experience · Aurelia"
        title="The horizon, at your command"
        intro="From the deck of a private sloop to a sandbar that surfaces only at low tide — days composed for you alone."
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Aurelia's private yacht under sail on open water"
      />

      <ExperiencesIntro />
      <ExperienceShowcase />
      <ButlerCTA />
    </>
  );
}
