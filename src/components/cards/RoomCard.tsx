"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize, Users } from "lucide-react";
import type { Room } from "@/lib/site";
import { formatCurrency } from "@/lib/utils";
import { Tilt } from "@/components/ui/Tilt";

const routeFor = (r: Room) =>
  r.category === "Villa" ? "/villas" : r.category === "Suite" ? "/suites" : "/rooms";

/**
 * Editorial accommodation card with an image zoom-on-hover, a sliding gold
 * detail bar, and a 3D tilt that follows the cursor.
 */
export function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <Link href={`${routeFor(room)}#${room.slug}`} data-cursor="View">
        <Tilt className="relative aspect-[4/5] overflow-hidden rounded-sm" max={7}>
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

          {/* category chip */}
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-sand backdrop-blur-sm">
            {room.category}
          </span>

          {/* hover CTA */}
          <span className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gold-gradient text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>

          {/* bottom detail */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="font-serif text-2xl font-light text-sand">
              {room.name}
            </h3>
            <p className="mt-1 text-sm italic text-gold/90">{room.tagline}</p>

            <div className="mt-4 flex items-center gap-5 overflow-hidden text-[11px] uppercase tracking-[0.14em] text-sand/70">
              <span className="flex items-center gap-1.5">
                <Maximize size={13} className="text-gold" /> {room.size} m²
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={13} className="text-gold" /> {room.guests}
              </span>
              <span className="ml-auto text-gold">
                {formatCurrency(room.price)}
                <span className="text-sand/50"> / night</span>
              </span>
            </div>
          </div>
        </Tilt>
      </Link>
    </motion.article>
  );
}
