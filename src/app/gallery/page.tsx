import type { Metadata } from "next";
import { GALLERY } from "@/lib/site";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gallery · AURELIA",
  description:
    "A portrait of the reserve — residences, ocean, dining, spa and the island itself, photographed across the seasons of Maré Séraphine.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Reserve"
        title="A Portrait of Aurelia"
        intro="Light on water, the architecture of stillness, a table at the edge of the sea. A gathering of moments from across the reserve — chosen, not staged."
        image={GALLERY[0].src}
        imageAlt="The Coralline Signature Suite at dusk, overlooking the lagoon"
        align="center"
      />

      <section className="py-section">
        <div className="mx-auto max-w-[100rem] px-6 md:px-10">
          <SectionHeading
            eyebrow="In frames"
            index="01"
            title="Every image, a place you can go."
            align="center"
            className="mb-8"
          />
          <Reveal delay={0.1} className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-sand/70">
              Filter by the corners of the island that draw you — the residences,
              the open ocean, the kitchens, the overwater spa, or the reserve seen
              whole. Select any image to see it at full scale.
            </p>
          </Reveal>

          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
