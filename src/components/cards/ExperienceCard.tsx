"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Editorial experience card — a tall photograph with a slow zoom on hover, a
 * letter-spaced "kind" eyebrow, a serif name and a short description. When an
 * `href` is provided the whole card becomes a link and a gold arrow chip rises
 * into view. Reused across the Experiences, Spa and Beach pages.
 */
export function ExperienceCard({
  image,
  kind,
  name,
  description,
  href,
  index = 0,
  className,
}: {
  image: string;
  kind: string;
  name: string;
  description: string;
  href?: string;
  index?: number;
  className?: string;
}) {
  const inner = (
    <div className="group relative block h-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1300ms] ease-luxe group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

        <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.24em] text-gold/90">
          {kind}
        </span>

        {href && (
          <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gold-gradient text-ink opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-serif text-2xl font-light leading-tight text-sand md:text-3xl">
            {name}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand/70">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className={cn("h-full", className)}
    >
      {href ? (
        <Link href={href} data-cursor="Discover">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.article>
  );
}
