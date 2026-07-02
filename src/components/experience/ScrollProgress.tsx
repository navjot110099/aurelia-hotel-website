"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A hairline gold progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[550] h-[2px] origin-left bg-gold-gradient"
      aria-hidden
    />
  );
}
