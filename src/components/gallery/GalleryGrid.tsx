"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "@/components/ui/SmartImage";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, type GalleryCategory } from "@/lib/site";
import { cn } from "@/lib/utils";

const CATEGORIES: GalleryCategory[] = [
  "All",
  "Residences",
  "Ocean",
  "Dining",
  "Spa",
  "Island",
];

/**
 * Filterable masonry gallery with a bespoke, keyboard-navigable lightbox.
 * Images animate in on filter change; the lightbox supports arrow keys and
 * wrap-around navigation.
 */
export function GalleryGrid({ initialFilter = "All" as GalleryCategory }) {
  const [filter, setFilter] = useState<GalleryCategory>(initialFilter);
  const [active, setActive] = useState<number | null>(null);

  const items =
    filter === "All"
      ? GALLERY
      : GALLERY.filter((g) => g.category === filter);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, next, prev]);

  return (
    <div>
      {/* filters */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-400",
              filter === c
                ? "border-gold bg-gold text-ink"
                : "border-white/15 text-sand/70 hover:border-gold/60 hover:text-sand"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* masonry */}
      <motion.div
        layout
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.button
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              data-cursor="Expand"
              className="group relative block w-full overflow-hidden rounded-sm break-inside-avoid"
            >
              <Image
                src={item.src}
                alt={item.caption}
                width={800}
                height={i % 3 === 0 ? 1000 : i % 2 === 0 ? 640 : 800}
                className="w-full object-cover transition-transform duration-[1100ms] ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-sm text-sand">{item.caption}</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
            onClick={close}
          >
            <button
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-sand hover:border-gold hover:text-gold"
              onClick={close}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-sand hover:border-gold hover:text-gold md:left-10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-sand hover:border-gold hover:text-gold md:right-10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.figure
              key={items[active].src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-6 max-h-[82vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].caption}
                width={1600}
                height={1067}
                className="max-h-[82vh] w-auto rounded-sm object-contain"
              />
              <figcaption className="mt-4 text-center text-sm uppercase tracking-[0.2em] text-sand/70">
                {items[active].caption}
                <span className="mx-3 text-gold">·</span>
                {active + 1} / {items.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
