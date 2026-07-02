"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <main
      id="main"
      className="vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,97,0.14),transparent_65%)] blur-2xl"
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="eyebrow relative z-10 mb-8 text-gold"
      >
        Error 404 · Lost at Sea
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.08 }}
        className="relative z-10 font-serif text-[28vw] font-light leading-[0.82] tracking-[-0.03em] text-sand md:text-[18rem]"
      >
        <span className="text-gold-gradient">404</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        className="relative z-10 mt-4 font-serif text-3xl font-light leading-tight text-sand md:text-5xl"
      >
        This shore is uncharted.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="relative z-10 mx-auto mt-6 max-w-xl font-sans text-sm font-light leading-relaxed text-sand/60 md:text-base"
      >
        The page you seek has drifted beyond our atoll. Let the concierge guide you
        back to calmer waters — the horizon is still yours.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.45 }}
        className="relative z-10 mt-12 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Button href="/" variant="gold" size="lg" cursorLabel="Home">
          Return Home
        </Button>
        <Button href="/contact" variant="outline" size="lg" cursorLabel="Contact">
          Reach the Concierge
        </Button>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
        aria-hidden
        className="relative z-10 mt-16 h-px w-40 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
    </main>
  );
}
