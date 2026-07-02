"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Primitives";

/** Guest voices in an Embla carousel with a crossfading gold quote mark. */
export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    const id = setInterval(() => embla.scrollNext(), 6500);
    return () => {
      embla.off("select", onSelect);
      clearInterval(id);
    };
  }, [embla, onSelect]);

  return (
    <section className="relative overflow-hidden bg-ink-800 px-6 py-section md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <SectionLabel index="07" align="center" className="mb-10">
          In Their Words
        </SectionLabel>

        <Quote className="mx-auto mb-8 text-gold" size={40} />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="min-w-0 flex-[0_0_100%] px-4">
                <blockquote className="font-serif text-2xl font-light leading-[1.35] text-sand md:text-4xl">
                  “{t.quote}”
                </blockquote>
                <footer className="mt-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-gold">
                    {t.author}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-light">
                    {t.origin}
                  </p>
                </footer>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-sand transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  selected === i ? "w-8 bg-gold" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => embla?.scrollNext()}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-sand transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
