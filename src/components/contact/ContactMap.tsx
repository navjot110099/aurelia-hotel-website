"use client";

import { motion } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";
import { BRAND } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ContactMap() {
  const { lat, lng } = BRAND.coordinates;
  const directions = `https://www.google.com/maps?q=${lat},${lng}`;
  const latLabel = `${Math.abs(lat).toFixed(4)}° ${lat < 0 ? "S" : "N"}`;
  const lngLabel = `${Math.abs(lng).toFixed(4)}° ${lng < 0 ? "W" : "E"}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60"
    >
      {/* stylized atoll map */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <svg
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={`Stylized map of ${BRAND.name} on the Maré Séraphine atoll`}
        >
          <defs>
            <radialGradient id="ocean" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#1E3A3F" />
              <stop offset="55%" stopColor="#12262A" />
              <stop offset="100%" stopColor="#0A0E12" />
            </radialGradient>
            <linearGradient id="reef" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2C4A4E" />
              <stop offset="100%" stopColor="#1E3A3F" />
            </linearGradient>
            <radialGradient id="lagoon" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#4A6B6E" />
              <stop offset="100%" stopColor="#2C4A4E" />
            </radialGradient>
            <linearGradient id="sand" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E0D2BB" />
              <stop offset="100%" stopColor="#C9A961" />
            </linearGradient>
          </defs>

          {/* ocean */}
          <rect width="1200" height="520" fill="url(#ocean)" />

          {/* depth contour rings */}
          {[420, 340, 260, 190].map((r, i) => (
            <ellipse
              key={r}
              cx="600"
              cy="260"
              rx={r}
              ry={r * 0.58}
              fill="none"
              stroke="#C9A961"
              strokeOpacity={0.06 + i * 0.015}
              strokeWidth={1}
            />
          ))}

          {/* faint lat/long grid */}
          <g stroke="#C9A961" strokeOpacity="0.05" strokeWidth="1">
            {[150, 350, 550, 750, 950, 1150].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="520" />
            ))}
            {[90, 210, 330, 450].map((y) => (
              <line key={y} x1="0" y1={y} x2="1200" y2={y} />
            ))}
          </g>

          {/* outer reef ring */}
          <ellipse
            cx="600"
            cy="262"
            rx="300"
            ry="170"
            fill="url(#reef)"
            fillOpacity="0.55"
          />
          {/* lagoon */}
          <ellipse cx="600" cy="260" rx="250" ry="138" fill="url(#lagoon)" fillOpacity="0.85" />

          {/* motus / islets around the atoll */}
          <g fill="url(#sand)" fillOpacity="0.9">
            <path d="M600 128 q40 -8 78 6 q-6 22 -44 26 q-40 2 -46 -18 z" />
            <path d="M360 250 q-26 -30 -8 -60 q30 6 40 34 q6 24 -32 26 z" />
            <path d="M840 250 q26 -26 12 -56 q-30 4 -42 30 q-8 24 30 26 z" />
            <path d="M520 380 q-34 14 -70 4 q6 -24 44 -30 q34 -4 26 26 z" />
          </g>

          {/* the private island — Aurelia */}
          <g>
            <path
              d="M700 320 q52 -18 96 10 q22 40 -14 74 q-52 30 -104 6 q-34 -34 -8 -74 q12 -14 30 -16 z"
              fill="url(#sand)"
            />
            {/* palms / greenery hint */}
            <circle cx="748" cy="352" r="10" fill="#1E3A3F" fillOpacity="0.5" />
            <circle cx="770" cy="368" r="7" fill="#1E3A3F" fillOpacity="0.45" />
          </g>

          {/* dotted flight path from mainland */}
          <path
            d="M120 90 C 340 130, 520 220, 726 356"
            fill="none"
            stroke="#C9A961"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          <circle cx="120" cy="90" r="4" fill="#C9A961" fillOpacity="0.7" />
        </svg>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        {/* pulsing gold pin at the island */}
        <div
          className="absolute"
          style={{ left: "62%", top: "68%", transform: "translate(-50%, -100%)" }}
        >
          <div className="relative flex flex-col items-center">
            {/* pulse rings */}
            <span className="absolute bottom-0 h-8 w-8 -translate-x-1/2 left-1/2">
              <motion.span
                className="absolute inset-0 rounded-full bg-gold/40"
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-gold/40"
                animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
            </span>
            <motion.span
              initial={{ y: -6, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold"
            >
              <MapPin size={17} fill="currentColor" />
            </motion.span>
            <span className="mt-2 whitespace-nowrap rounded-full bg-ink/80 px-3 py-1 font-serif text-sm text-sand backdrop-blur">
              {BRAND.name}
            </span>
          </div>
        </div>
      </div>

      {/* footer bar — coordinates + directions */}
      <div className="flex flex-col gap-4 border-t border-white/10 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70">
            Coordinates
          </p>
          <p className="mt-1 font-serif text-2xl font-light text-sand tabular-nums">
            {latLabel} · {lngLabel}
          </p>
          <p className="mt-1 text-sm text-sand/45">{BRAND.address}</p>
        </div>

        <a
          href={directions}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-gold-gradient px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-ink shadow-gold transition-all duration-500 hover:shadow-[0_0_60px_-12px_rgba(201,169,97,0.7)] md:self-auto"
        >
          <Navigation size={15} />
          Get directions
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
}
