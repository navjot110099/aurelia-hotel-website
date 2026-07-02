"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export type MenuCourse = {
  /** Ordinal or category label — e.g. "I", "Amuse", "Dessert". */
  course: string;
  /** Dish name. */
  name: string;
  /** Short tasting note beneath the name. */
  note: string;
  /** Optional right-aligned label — a pairing, region or price. */
  label?: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Staggered tasting-menu list. Each course reveals in sequence with a numbered
 * course marker, a serif dish name, a dotted leader that fills the space to an
 * optional right label (a wine pairing or price), and a tasting note below.
 */
export function MenuList({
  courses,
  className,
}: {
  courses: MenuCourse[];
  className?: string;
}) {
  return (
    <motion.ol
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={cn("flex flex-col", className)}
    >
      {courses.map((c, i) => (
        <motion.li
          key={`${c.course}-${i}`}
          variants={row}
          className="border-t border-white/10 py-6 first:border-t-0"
        >
          <div className="flex items-baseline gap-5">
            <span
              aria-hidden
              className="w-8 shrink-0 font-serif text-sm italic text-gold/70"
            >
              {c.course}
            </span>

            <div className="flex min-w-0 flex-1 items-baseline">
              <h3 className="font-serif text-xl font-light text-sand md:text-2xl">
                {c.name}
              </h3>
              <span
                aria-hidden
                className="mx-4 min-w-6 flex-1 translate-y-[-0.15em] border-b border-dotted border-white/25"
              />
              {c.label && (
                <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-gold/80">
                  {c.label}
                </span>
              )}
            </div>
          </div>

          <p className="mt-2 max-w-2xl pl-[52px] text-sm leading-relaxed text-sand/60">
            {c.note}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
