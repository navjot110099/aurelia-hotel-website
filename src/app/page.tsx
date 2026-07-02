import { Hero } from "@/sections/home/Hero";
import { Prologue } from "@/sections/home/Prologue";
import { MarqueeBand } from "@/sections/home/MarqueeBand";
import { Accommodations } from "@/sections/home/Accommodations";
import { TheIsland } from "@/sections/home/TheIsland";
import { DiningFeature } from "@/sections/home/DiningFeature";
import { ExperiencesScroll } from "@/sections/home/ExperiencesScroll";
import { StatsBand } from "@/sections/home/StatsBand";
import { Awards } from "@/sections/home/Awards";
import { Testimonials } from "@/sections/home/Testimonials";
import { GalleryPreview } from "@/sections/home/GalleryPreview";
import { JournalPreview } from "@/sections/home/JournalPreview";
import { InstagramStrip } from "@/sections/home/InstagramStrip";
import { FinalCTA } from "@/sections/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Prologue />
      <MarqueeBand />
      <Accommodations />
      <TheIsland />
      <DiningFeature />
      <ExperiencesScroll />
      <StatsBand />
      <Awards />
      <Testimonials />
      <GalleryPreview />
      <JournalPreview />
      <InstagramStrip />
      <FinalCTA />
    </>
  );
}
