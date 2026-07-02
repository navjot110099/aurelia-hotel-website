"use client";

import CountUp from "react-countup";
import { STATS } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The proof, in numbers. React CountUp animates each figure into view via its
 * scroll-spy, framed by a quiet editorial header.
 */
export function StatsBand() {
  return (
    <section className="border-y border-white/5 bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-16 flex flex-col items-center text-center">
          <SectionLabel index="06" align="center">
            By the Numbers
          </SectionLabel>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light text-sand md:text-5xl">
              Small enough to know you. Rare enough to remember.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="flex flex-col items-center text-center"
            >
              <span className="font-serif text-6xl font-light text-gold-gradient md:text-8xl">
                {stat.prefix}
                <CountUp
                  end={stat.value}
                  duration={2.4}
                  enableScrollSpy
                  scrollSpyOnce
                  scrollSpyDelay={200}
                />
                {stat.suffix}
              </span>
              <span className="mt-4 max-w-[12rem] text-xs uppercase tracking-[0.2em] text-stone-light">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
