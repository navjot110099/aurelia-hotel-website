"use client";

import Image from "@/components/ui/SmartImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GoldLine } from "@/components/ui/Primitives";
import type { ArticleBlock } from "./articles";

type RelatedPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  date: string;
  image: string;
};

export function ArticleBody({
  blocks,
  related,
}: {
  blocks: ArticleBlock[];
  related: RelatedPost[];
}) {
  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-section md:px-10">
        <div className="space-y-8">
          {blocks.map((block, i) => {
            if (block.type === "subheading") {
              return (
                <Reveal key={i} className="pt-6">
                  <h2 className="font-serif text-3xl font-light leading-tight tracking-[-0.01em] text-sand md:text-4xl">
                    {block.text}
                  </h2>
                </Reveal>
              );
            }
            if (block.type === "quote") {
              return (
                <Reveal key={i} className="py-6">
                  <blockquote className="border-l-2 border-gold pl-8">
                    <p className="font-serif text-2xl font-light italic leading-[1.3] text-gold-light md:text-3xl">
                      “{block.text}”
                    </p>
                    {block.cite && (
                      <cite className="mt-4 block text-xs uppercase not-italic tracking-[0.22em] text-stone">
                        {block.cite}
                      </cite>
                    )}
                  </blockquote>
                </Reveal>
              );
            }
            return (
              <Reveal key={i}>
                <p className="text-lg leading-[1.8] text-stone-light">{block.text}</p>
              </Reveal>
            );
          })}
        </div>

        <GoldLine className="mt-16" />
        <Reveal className="mt-8 flex items-center justify-between">
          <Link
            href="/blog"
            data-cursor="Back"
            className="link-sweep text-[11px] uppercase tracking-[0.24em] text-sand transition-colors hover:text-gold"
          >
            ← All essays
          </Link>
          <Link
            href="/contact"
            data-cursor="Enquire"
            className="link-sweep inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] text-sand transition-colors hover:text-gold"
          >
            Plan a stay
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </article>

      {/* More from the journal */}
      {related.length > 0 && (
        <section className="relative bg-ink-800 px-6 py-section md:px-10">
          <div className="mx-auto max-w-editorial">
            <Reveal className="mb-14">
              <p className="eyebrow flex items-center gap-4">
                <span className="h-px w-8 bg-gold/50" />
                Continue reading
              </p>
              <h2 className="mt-6 font-serif text-4xl font-light text-sand md:text-5xl">
                More from the Journal
              </h2>
            </Reveal>
            <div className="grid gap-10 md:grid-cols-2">
              {related.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} data-cursor="Read" className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                      />
                      <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.22em] text-gold">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-light text-sand transition-colors duration-500 group-hover:text-gold-light md:text-3xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-light">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-stone">
                      {post.date} · {post.readingTime}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
