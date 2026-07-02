"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { BRAND } from "@/lib/site";

/**
 * The AURELIA overture. A gold-dust particle field, an animated wordmark that
 * reveals letter by letter, an elegant percentage counter, and a two-panel
 * curtain that parts to unveil the homepage. Shown once per browser session.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { stop, start } = useSmoothScroll();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Show only once per session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("aurelia-intro-seen")) {
      setVisible(false);
      return;
    }
    stop();
    document.documentElement.classList.add("preloader-lock");

    const started = performance.now();
    const DURATION = 2600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // easeOutExpo for a graceful deceleration toward 100.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        setTimeout(() => {
          sessionStorage.setItem("aurelia-intro-seen", "1");
          document.documentElement.classList.remove("preloader-lock");
          start();
          setVisible(false);
        }, 1200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gold-dust particle canvas.
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const N = 120;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.5 - 0.1,
      a: Math.random() * 0.6 + 0.15,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,97,${p.a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(201,169,97,0.6)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [visible]);

  const letters = BRAND.name.split("");

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[10000]">
          {/* Two-panel curtain */}
          <motion.div
            className="absolute inset-0 origin-top bg-ink"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: leaving ? 0 : 1 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "top" }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{ opacity: leaving ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            <div className="relative flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="eyebrow mb-8"
              >
                {BRAND.descriptor}
              </motion.p>

              <h1 className="flex overflow-hidden font-serif text-6xl font-light tracking-[0.12em] text-sand md:text-8xl">
                {letters.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.35 + i * 0.08,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {l}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 h-px w-40 origin-left bg-gradient-to-r from-transparent via-gold to-transparent md:w-56"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="mt-6 text-center font-sans text-xs uppercase tracking-[0.3em] text-stone-light"
              >
                {BRAND.location}
              </motion.p>
            </div>

            {/* Counter */}
            <div className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-8 md:px-14">
              <span className="font-serif text-5xl font-light text-sand/90 tabular-nums md:text-7xl">
                {String(progress).padStart(3, "0")}
                <span className="ml-1 align-top text-lg text-gold">%</span>
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.28em] text-stone-light md:block">
                Composing your arrival
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
