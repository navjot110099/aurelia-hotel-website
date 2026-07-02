"use client";

import { Marquee } from "@/components/ui/Primitives";

/** A quiet band of brand values that drifts across the seam between sections. */
export function MarqueeBand() {
  return (
    <section className="border-y border-white/5 bg-ink-800 py-10" aria-hidden>
      <Marquee
        items={[
          "Private Island",
          "Two Michelin Stars",
          "Overwater Spa",
          "34 Residences",
          "Barefoot Luxury",
          "The Living Reef",
        ]}
      />
    </section>
  );
}
