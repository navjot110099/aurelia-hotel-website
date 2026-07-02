"use client";

import { motion } from "framer-motion";
import { AWARDS } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Primitives";

/** A refined list of accolades that reveal line by line, like end credits. */
export function Awards() {
  return (
    <section id="awards" className="bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <div className="mb-14 flex flex-col items-center text-center">
          <SectionLabel index="08" align="center">
            Recognition
          </SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl font-serif text-3xl font-light text-sand md:text-5xl"
          >
            Honoured by those who measure the world&apos;s finest.
          </motion.h2>
        </div>

        <ul>
          {AWARDS.map((award, i) => (
            <motion.li
              key={award.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-t border-white/10 py-7 transition-colors last:border-b hover:bg-white/[0.02] md:gap-10"
            >
              <span className="font-serif text-sm text-gold/70">
                0{i + 1}
              </span>
              <span className="font-serif text-2xl font-light text-sand transition-colors group-hover:text-gold md:text-4xl">
                {award.title}
              </span>
              <span className="text-right text-[11px] uppercase tracking-[0.16em] text-stone-light md:text-xs">
                {award.org}
                <span className="ml-3 text-gold">{award.year}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
