import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import {
  SpaPhilosophy,
  TreatmentMenu,
  SpaJourney,
  PrivateSpaFeature,
  SpaBookingCTA,
} from "./SpaSections";

export const metadata: Metadata = {
  title: "Spa · Aurelia",
  description:
    "Aurelia's overwater spa suspends healing above the lagoon — monoï ceremonies, marine renewals and sound baths in the float pavilion, each ritual scored to the movement of the tide.",
};

export default function SpaPage() {
  return (
    <>
      <PageHero
        eyebrow="Wellness · The Overwater Spa"
        title="Above the lagoon, below the noise"
        intro="A spa suspended over the water, where every ritual begins with the island's own tides and ends in the quiet of the float pavilion."
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1900&q=80"
        imageAlt="Aurelia's overwater spa pavilion glowing above the lagoon at dusk"
      />

      <SpaPhilosophy />
      <TreatmentMenu />
      <SpaJourney />
      <PrivateSpaFeature />
      <SpaBookingCTA />
    </>
  );
}
