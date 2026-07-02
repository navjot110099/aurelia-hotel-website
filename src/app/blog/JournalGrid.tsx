"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { JOURNAL } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function JournalGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(JOURNAL.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");

  const [featured, ...rest] = JOURNAL;
  const visible = rest.filter((p) => active === "All" || p.category === active);
  const featuredVisible = active === "All" || featured.category === active;

  return (
    <div className="mx-auto max-w-editorial">
      {/* Category filters (visual) */}
      <div className="mb-16 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ease-luxe",
              active === cat
                ? "border-gold bg-gold-gradient text-ink"
                : "border-white/15 text-sand hover:border-gold/60 hover:text-gold"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      <AnimatePresence mode="popLayout">
        {featuredVisible && (
          <motion.div
            key="featured"
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-20"
          >
            <Link
              href={`/blog/${featured.slug}`}
              data-cursor="Read"
              className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                />
                <div className="vignette absolute inset-0" />
                <span className="absolute left-6 top-6 glass rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                  Featured
                </span>
              </div>
              <div>
                <p className="eyebrow mb-5 flex items-center gap-4">
                  <span className="h-px w-8 bg-gold/50" />
                  {featured.category} · {featured.date}
                </p>
                <h3 className="font-serif text-4xl font-light leading-[1.04] tracking-[-0.01em] text-sand transition-colors duration-500 group-hover:text-gold-light md:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-stone-light">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-gold">
                  Read the essay
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div layout className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Link href={`/blog/${post.slug}`} data-cursor="Read" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.22em] text-gold">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-light leading-snug text-sand transition-colors duration-500 group-hover:text-gold-light">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-light">{post.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-stone">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-gold/60" strokeWidth={1.5} />
                    {post.readingTime}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {!featuredVisible && visible.length === 0 && (
        <p className="py-20 text-center text-stone">No essays in this chapter yet.</p>
      )}
    </div>
  );
}
