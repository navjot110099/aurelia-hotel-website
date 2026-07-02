"use client";

import { motion, type Variants } from "framer-motion";
import { Maximize, Users, BedDouble, Eye } from "lucide-react";
import type { Room } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const cell: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Elegant labeled specification grid for a residence — size, guests, beds and
 * view — rendered as four hairline-divided cells that reveal on scroll.
 */
export function SpecList({
  room,
  className,
  columns = 4,
}: {
  room: Room;
  className?: string;
  columns?: 2 | 4;
}) {
  const specs = [
    { icon: Maximize, label: "Interior", value: `${room.size} m²` },
    { icon: Users, label: "Occupancy", value: `${room.guests} Guests` },
    { icon: BedDouble, label: "Bedding", value: room.beds },
    { icon: Eye, label: "Aspect", value: room.view },
  ];

  return (
    <motion.dl
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      className={cn(
        "grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10",
        columns === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4",
        className
      )}
    >
      {specs.map((s) => (
        <motion.div
          key={s.label}
          variants={cell}
          className="flex flex-col gap-3 bg-ink px-5 py-6 md:px-6 md:py-8"
        >
          <s.icon size={18} className="text-gold" strokeWidth={1.4} />
          <dt className="eyebrow text-[10px] text-sand/50">{s.label}</dt>
          <dd className="font-serif text-lg font-light leading-tight text-sand md:text-xl">
            {s.value}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
