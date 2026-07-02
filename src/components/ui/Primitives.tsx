"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./AnimatedText";

/** Numbered gold eyebrow used above section headings. */
export function SectionLabel({
  children,
  index,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "center" ? 0 : -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className
      )}
    >
      {index && (
        <span className="font-serif text-sm text-gold/70">{index}</span>
      )}
      <span className="h-px w-8 bg-gold/50" />
      <span className="eyebrow">{children}</span>
    </motion.div>
  );
}

/** Editorial heading — eyebrow + animated serif display in one block. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  className,
  titleClassName,
  align = "left",
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        align === "center" && "flex flex-col items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <SectionLabel index={index} align={align} className="mb-6">
          {eyebrow}
        </SectionLabel>
      )}
      <AnimatedText
        as="h2"
        text={title}
        className={cn(
          "font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-sand md:text-6xl lg:text-7xl",
          titleClassName
        )}
      />
    </div>
  );
}

/** Infinite marquee of words separated by a diamond. */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (
    <div className="marquee">
      {[...items, ...items].map((it, i) => (
        <span
          key={i}
          className="flex items-center whitespace-nowrap px-8 font-serif text-4xl font-light text-sand/80 md:text-6xl"
        >
          {it}
          <span className="mx-8 text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("flex overflow-hidden", className)} aria-hidden>
      {row}
    </div>
  );
}

/** Animated gold hairline that draws itself in on scroll. */
export function GoldLine({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "h-px w-full origin-left bg-gradient-to-r from-gold/60 via-gold/30 to-transparent",
        className
      )}
    />
  );
}
