"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OFFERS } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Large editorial offer cards — alternating layout, parallax-lite hover on the
 * image, tag, description and a reservation call to action.
 */
export function OffersGrid() {
  return (
    <div className="mx-auto flex max-w-editorial flex-col gap-24 md:gap-32">
      {OFFERS.map((offer, i) => {
        const reversed = i % 2 === 1;
        return (
          <motion.article
            key={offer.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div
              className={`group relative aspect-[4/3] overflow-hidden rounded-sm ${
                reversed ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
              />
              <div className="vignette absolute inset-0" />
              <span className="absolute left-6 top-6 glass rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-sand">
                {offer.tag}
              </span>
            </div>

            <div className={reversed ? "lg:order-1" : ""}>
              <p className="eyebrow mb-5 flex items-center gap-4">
                <span className="font-serif text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-gold/50" />
                {offer.subtitle}
              </p>
              <h3 className="font-serif text-4xl font-light leading-[1.04] tracking-[-0.01em] text-sand md:text-5xl">
                {offer.title}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone-light">
                {offer.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/booking" variant="gold" cursorLabel="Reserve">
                  Reserve this journey
                </Button>
                <Link
                  href="/contact"
                  data-cursor="Enquire"
                  className="link-sweep inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] text-sand transition-colors hover:text-gold"
                >
                  Enquire
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
