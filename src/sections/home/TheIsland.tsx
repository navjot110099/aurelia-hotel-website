"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

type Tile = {
  title: string;
  copy: string;
  image: string;
  href: string;
  className: string;
};

const TILES: Tile[] = [
  {
    title: "The Infinity Pool",
    copy: "A 50-metre horizon pool that spills into the lagoon at the island's edge.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80",
    href: "/experiences",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Overwater Spa",
    copy: "Float pavilions above the coral garden.",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80",
    href: "/spa",
    className: "md:col-span-2",
  },
  {
    title: "Private Marina",
    copy: "Berth for the estate yacht & tenders.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    href: "/experiences#yacht",
    className: "",
  },
  {
    title: "Helipad",
    copy: "Arrive above the reef.",
    image:
      "https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?auto=format&fit=crop&w=1200&q=80",
    href: "/experiences#helicopter",
    className: "",
  },
  {
    title: "Private Beach",
    copy: "A mile of white sand kept for our guests alone.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    href: "/beach",
    className: "md:col-span-2",
  },
];

export function TheIsland() {
  return (
    <section className="bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading
          eyebrow="The Estate"
          index="03"
          align="center"
          title="One island holds everything, and asks for nothing."
          titleClassName="max-w-3xl"
          className="mb-16"
        />

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[240px]">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
              className={cn("group relative overflow-hidden rounded-sm", tile.className)}
            >
              <Link href={tile.href} data-cursor="View" className="block h-full w-full">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-light text-sand">
                      {tile.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="translate-y-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-sand/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {tile.copy}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
