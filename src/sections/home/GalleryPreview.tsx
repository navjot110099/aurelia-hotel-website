"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY } from "@/lib/site";
import { SectionHeading } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";

/** A staggered preview strip that invites guests into the full gallery. */
export function GalleryPreview() {
  const shots = GALLERY.slice(0, 5);

  return (
    <section className="bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The Reserve in Frames"
            index="09"
            title="Light, water, and the hours between."
            titleClassName="max-w-xl"
          />
          <Button href="/gallery" variant="outline" cursorLabel="Open">
            Enter the gallery
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {shots.map((shot, i) => (
            <motion.figure
              key={shot.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-sm ${
                i === 0
                  ? "col-span-2 row-span-2 aspect-square md:aspect-auto"
                  : "aspect-square"
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
              />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.16em] text-sand">
                  {shot.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
