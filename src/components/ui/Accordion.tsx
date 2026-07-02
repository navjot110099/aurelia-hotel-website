"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Animated FAQ accordion. A single open panel at a time, an animated
 * height/opacity reveal, and a gold plus/minus that rotates on toggle.
 */
export function Accordion({
  items,
  className,
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-white/10 border-y border-white/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              data-cursor={isOpen ? "Close" : "Open"}
              className="group flex w-full items-center gap-6 py-7 text-left transition-colors duration-500"
            >
              <span
                className={cn(
                  "font-serif text-sm text-gold/60 transition-colors duration-500",
                  isOpen && "text-gold"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "flex-1 font-serif text-xl font-light leading-snug text-sand transition-colors duration-500 md:text-2xl",
                  isOpen ? "text-sand" : "group-hover:text-gold-light"
                )}
              >
                {item.q}
              </span>

              {/* gold plus / minus */}
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:border-gold">
                <span className="absolute h-px w-3.5 bg-current" />
                <motion.span
                  className="absolute h-px w-3.5 bg-current"
                  animate={{ rotate: isOpen ? 0 : 90 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
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
                  <p className="max-w-2xl pb-8 pl-[3.25rem] pr-12 text-base leading-relaxed text-sand/70">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
