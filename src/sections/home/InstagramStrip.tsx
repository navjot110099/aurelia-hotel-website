"use client";

import Image from "@/components/ui/SmartImage";
import { Instagram } from "lucide-react";
import { BRAND, GALLERY } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Primitives";

/** A social invitation — a hover-lit row of frames linking out to Instagram. */
export function InstagramStrip() {
  const shots = GALLERY.slice(3, 9);

  return (
    <section className="bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel index="11" align="center">
            Follow the Light
          </SectionLabel>
          <a
            href={BRAND.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 font-serif text-3xl font-light text-sand transition-colors hover:text-gold md:text-5xl"
            data-cursor="Follow"
          >
            <Instagram size={28} className="text-gold" />
            @aurelia.reserve
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {shots.map((shot) => (
            <a
              key={shot.src}
              href={BRAND.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View"
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <Instagram size={22} className="text-gold" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
