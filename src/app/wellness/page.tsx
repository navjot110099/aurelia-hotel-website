import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import {
  WellnessIntro,
  Disciplines,
  DailySchedule,
  PractitionerHighlight,
  WellnessCTA,
} from "./WellnessSections";

export const metadata: Metadata = {
  title: "Wellness",
  description:
    "Yoga at first light, breathwork on the trade winds, meditation at the water's edge and island-grown nourishment. Aurelia's wellness programme keeps the unhurried pace of the island.",
};

export default function WellnessPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness · The Practice"
        title="Move a little slower"
        intro="Yoga on the eastern deck, breath carried on the trade winds, meditation at the water's edge — a practice that keeps the pace of the island."
        image="/images/wellness-yoga.jpg"
        imageAlt="A guest in yoga practice on an open-air deck above the ocean at sunrise"
      />

      <WellnessIntro />
      <Disciplines />
      <DailySchedule />
      <PractitionerHighlight />
      <WellnessCTA />
    </>
  );
}
