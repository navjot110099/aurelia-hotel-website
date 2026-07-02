"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Route-change transition. On each navigation the incoming page fades and
 * rises into place while a gold curtain sweeps up and away — giving every
 * route change a deliberate, cinematic beat.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* sweeping curtain */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[400] origin-bottom bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "bottom" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
