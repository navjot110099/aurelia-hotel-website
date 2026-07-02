"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { EXPERIENCES } from "@/lib/site";
import { SectionLabel } from "@/components/ui/Primitives";
import { ArrowUpRight } from "lucide-react";

/**
 * Horizontally-scrolling, pinned experiences gallery. GSAP ScrollTrigger pins
 * the section and translates the card track sideways as the user scrolls
 * vertically — the signature "cinema reel" of the page. Falls back to a normal
 * horizontal overflow scroll on touch / reduced motion.
 */
export function ExperiencesScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isTouch || !track.current || !section.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const el = track.current;
    const distance = el.scrollWidth - window.innerWidth;

    const tween = gsap.to(el, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: () => `+=${distance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-ink-800"
      aria-label="Curated experiences"
    >
      <div className="flex h-screen flex-col justify-center">
        <div className="mb-10 flex items-end justify-between px-6 md:px-10">
          <div>
            <SectionLabel index="05">Curated by your butler</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl font-light text-sand md:text-6xl">
              Days worth remembering.
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-stone-light lg:block">
            Scroll to drift through the reserve&apos;s signature journeys — each
            arranged privately, each entirely yours.
          </p>
        </div>

        <div
          ref={track}
          className="flex gap-6 px-6 md:px-10 [scrollbar-width:none] max-md:overflow-x-auto"
        >
          {EXPERIENCES.map((exp, i) => (
            <Link
              key={exp.id}
              href={`/experiences#${exp.id}`}
              data-cursor="Discover"
              className="group relative h-[62vh] w-[78vw] shrink-0 overflow-hidden rounded-sm sm:w-[46vw] lg:w-[34vw]"
            >
              <Image
                src={exp.image}
                alt={exp.name}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
              <span className="absolute left-5 top-5 text-6xl font-light text-sand/20 font-serif">
                0{i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="eyebrow mb-3">{exp.kind}</p>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-3xl font-light leading-tight text-sand">
                    {exp.name}
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="mt-1 shrink-0 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/70">
                  {exp.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
