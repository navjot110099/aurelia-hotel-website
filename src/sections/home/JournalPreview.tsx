"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { JOURNAL } from "@/lib/site";
import { SectionHeading } from "@/components/ui/Primitives";

/** Three latest dispatches from The Journal. */
export function JournalPreview() {
  return (
    <section className="bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="The Journal"
            index="10"
            title="Dispatches from the island."
          />
          <Link
            href="/blog"
            data-cursor="Read"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold link-sweep"
          >
            All stories <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {JOURNAL.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block" data-cursor="Read">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-sand backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-stone-light">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-light leading-snug text-sand transition-colors group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-light">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
