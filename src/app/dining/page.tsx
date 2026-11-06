import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import {
  DiningIntro,
  RestaurantShowcase,
  ChefFeature,
  TastingMenu,
  WineCellarFeature,
  FoodGalleryStrip,
  ReservationsHeader,
} from "./DiningSections";
import { ReservationForm } from "./ReservationForm";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Two Michelin stars at Maré, barefoot Mediterranean at Coralline and a cellar of twelve thousand bottles carved beneath the island. Dining at Aurelia is drawn from the reef, the garden and the day's catch.",
};

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Dining · Aurelia"
        title="A table at the water's edge"
        intro="Two Michelin stars, a beach club on the sand, and a cellar beneath the coral — every plate begins within sight of the island."
        image="/images/dining-mare.jpg"
        imageAlt="A candlelit table set at the water's edge as the sun falls over Aurelia"
      />

      <DiningIntro />
      <RestaurantShowcase />
      <ChefFeature />
      <TastingMenu />
      <WineCellarFeature />

      <section id="reserve" className="scroll-mt-24 bg-ink-800 px-6 py-section md:px-10">
        <div className="mx-auto max-w-3xl">
          <ReservationsHeader />
          <ReservationForm />
        </div>
      </section>

      <FoodGalleryStrip />
    </>
  );
}
