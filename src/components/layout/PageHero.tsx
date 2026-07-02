"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedChars } from "@/components/ui/AnimatedText";

/**
 * Standard interior-page banner: a parallax photograph, cinematic gradient,
 * numbered eyebrow, an oversized serif title revealed character by character,
 * and an optional intro line. Reused across every secondary route.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  align = "left",
  height = "tall",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  align?: "left" | "center";
  height?: "tall" | "short";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex overflow-hidden",
        height === "tall"
          ? "h-[78vh] min-h-[560px]"
          : "h-[62vh] min-h-[440px]",
        align === "center" ? "items-center justify-center" : "items-end"
      )}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 to-transparent" />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[100rem] px-6 pb-16 md:px-10 md:pb-24",
          align === "center" && "flex flex-col items-center text-center"
        )}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="eyebrow mb-6 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold" />
          {eyebrow}
        </motion.p>

        <h1
          className={cn(
            "max-w-5xl font-serif text-5xl font-light leading-[0.9] tracking-[-0.02em] text-sand md:text-8xl",
            align === "center" && "mx-auto"
          )}
        >
          <AnimatedChars text={title} delay={0.4} />
        </h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className={cn(
              "mt-8 max-w-xl text-base leading-relaxed text-sand/75",
              align === "center" && "mx-auto"
            )}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
