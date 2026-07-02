import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import {
  BeachIntro,
  Cabanas,
  WaterSports,
  SandDining,
  MarineProgram,
} from "./BeachSections";

export const metadata: Metadata = {
  title: "Private Beach · Aurelia",
  description:
    "A mile of moonlit sand kept for the island's guests alone — private cabanas, watersports on a sheltered lagoon, dinner set on the sand and a marine programme that has restored eleven hectares of reef.",
};

export default function BeachPage() {
  return (
    <>
      <PageHero
        eyebrow="The Reserve · Private Beach"
        title="A shore of your own"
        intro="A mile of moonlit sand, sheltered by the reef and shaded by palms — no crowds, no hours, only the tide and a butler who knows your name."
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Aurelia's private white-sand beach with turquoise shallows at golden hour"
      />

      <BeachIntro />
      <Cabanas />
      <WaterSports />
      <SandDining />
      <MarineProgram />
    </>
  );
}
