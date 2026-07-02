"use client";

import { createElement } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word mask reveal for editorial headings. Each word rides up from
 * behind an overflow-clipped line, producing the signature luxury "curtain"
 * of type. Renders as a heading tag of your choice.
 */
export function AnimatedText({
  text,
  className,
  wordClassName,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
      className={cn("inline-block", className)}
    >
      {/* Tag carries semantics + styling; spans carry motion. */}
      {createElement(
        Tag,
        { className: "m-0 inline" },
        words.map((w, i) => (
          <span
            key={i}
            className="mask-line inline-flex overflow-hidden align-bottom"
          >
            <motion.span
              variants={word}
              className={cn("inline-block", wordClassName)}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))
      )}
    </motion.div>
  );
}

/** Character-by-character reveal — for short hero lines. */
export function AnimatedChars({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const chars = Array.from(text);
  return (
    <span className={cn("inline-flex overflow-hidden", className)}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.8,
            ease: EASE,
          }}
          className="inline-block whitespace-pre"
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}
