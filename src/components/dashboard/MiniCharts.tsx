"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Sparkline — a single smooth trend line with a soft gold fill.      */
/* ------------------------------------------------------------------ */

export function Sparkline({
  data,
  width = 120,
  height = 36,
  strokeWidth = 1.5,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const id = useId();
  const pad = strokeWidth;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (data.length - 1);

  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (height - pad * 2) * (1 - (v - min) / range);
    return [x, y] as const;
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1][0].toFixed(2)},${height} L${points[0][0].toFixed(2)},${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      role="img"
      aria-label="Trend sparkline"
    >
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(201,169,97,0.35)" />
          <stop offset="100%" stopColor="rgba(201,169,97,0)" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${id})`} />
      <motion.path
        d={linePath}
        fill="none"
        stroke="rgb(201,169,97)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <circle
        cx={points[points.length - 1][0]}
        cy={points[points.length - 1][1]}
        r={2.4}
        fill="rgb(201,169,97)"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  BarChart — labelled vertical bars with an optional highlight.      */
/* ------------------------------------------------------------------ */

export type BarDatum = { label: string; value: number };

export function BarChart({
  data,
  height = 200,
  className,
  valueFormatter,
  highlightLast = true,
}: {
  data: BarDatum[];
  height?: number;
  className?: string;
  valueFormatter?: (v: number) => string;
  highlightLast?: boolean;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const gap = 10;
  const barW = 100 / data.length;

  return (
    <div className={cn("w-full", className)}>
      <div
        className="flex w-full items-end justify-between"
        style={{ height, gap }}
        role="img"
        aria-label="Bookings over time bar chart"
      >
        {data.map((d, i) => {
          const h = (d.value / max) * 100;
          const isHi = highlightLast && i === data.length - 1;
          return (
            <div
              key={d.label}
              className="group relative flex h-full flex-1 flex-col items-center justify-end"
            >
              <span className="mb-2 font-sans text-[10px] font-light tabular-nums text-sand/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {valueFormatter ? valueFormatter(d.value) : d.value}
              </span>
              <motion.div
                className={cn(
                  "w-full max-w-[26px] rounded-t-sm",
                  isHi
                    ? "bg-gold-gradient"
                    : "bg-gradient-to-t from-gold/15 to-gold/45 group-hover:from-gold/25 group-hover:to-gold/60"
                )}
                style={{ transformOrigin: "bottom" }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.04 }}
              />
              <span
                className="pointer-events-none absolute font-sans text-[9px] uppercase tracking-[0.14em] text-sand/35"
                style={{ bottom: -18, minWidth: `${barW}%` }}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Donut — single-value ring gauge (e.g. occupancy).                  */
/* ------------------------------------------------------------------ */

export function Donut({
  value,
  size = 140,
  strokeWidth = 12,
  label,
  className,
}: {
  /** 0–100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}) {
  const id = useId();
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = c * (1 - pct / 100);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={`${label ?? "Value"}: ${pct}%`}
      >
        <defs>
          <linearGradient id={`donut-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(224,196,133)" />
            <stop offset="100%" stopColor="rgb(180,146,74)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#donut-${id})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.3, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-3xl font-light tabular-nums text-sand">
          {pct}
          <span className="text-lg text-gold">%</span>
        </span>
        {label && (
          <span className="mt-0.5 font-sans text-[9px] uppercase tracking-[0.18em] text-sand/40">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
