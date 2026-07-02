"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Item = { q: string; a: string };

/**
 * Bespoke, self-contained accordion for the FAQ page. Each row reveals on
 * scroll, then expands its answer with a measured height/opacity transition.
 * No shared Accordion component is assumed.
 */
export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.li
            key={item.q}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-8 py-8 text-left"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-serif text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-serif text-xl font-light leading-snug tracking-[-0.01em] transition-colors duration-500 md:text-2xl",
                    isOpen ? "text-gold" : "text-sand group-hover:text-gold-light"
                  )}
                >
                  {item.q}
                </span>
              </span>
              <span
                className={cn(
                  "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 ease-luxe",
                  isOpen && "rotate-45 bg-gold-gradient text-ink"
                )}
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-9 pl-10 pr-12 text-base leading-relaxed text-stone-light">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
