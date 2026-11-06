import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JournalGrid } from "./JournalGrid";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Dispatches from the reserve — on design and stillness, a reef reborn, and a season at the two-Michelin-star table of Maré. The Aurelia Journal.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Dispatches"
        intro="Slow reading from a slow island. Essays on the craft of the reserve — its architecture, its reef, its table — written for those who savour the story as much as the stay."
        image="/images/architecture-dusk.jpg"
        imageAlt="The architecture of the Aurelia reserve at dusk"
      />

      <section className="relative bg-ink px-6 py-section md:px-10" id="journal">
        <JournalGrid />
      </section>
    </>
  );
}
