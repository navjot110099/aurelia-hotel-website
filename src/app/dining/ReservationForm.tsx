"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const RESTAURANT_OPTIONS = [
  "Maré — Tasting Menu",
  "Coralline Beach Club",
  "The Cellar — Sommelier Table",
  "In-Villa Dining",
];

const TIME_OPTIONS = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

const fieldClass =
  "h-14 w-full rounded-sm border border-white/12 bg-white/[0.03] px-5 text-sm text-sand outline-none transition-colors duration-400 placeholder:text-sand/35 focus:border-gold/70";

const labelClass =
  "mb-3 block text-[10px] uppercase tracking-[0.22em] text-sand/55";

/**
 * Styled, front-end-only reservation form. On submit it prevents default and
 * animates into a bespoke confirmation state — no backend, no persistence.
 */
export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="glass relative overflow-hidden rounded-sm p-8 md:p-12">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Check size={26} />
            </span>
            <h3 className="mt-8 font-serif text-3xl font-light text-sand md:text-4xl">
              Your table is being prepared
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-sand/65">
              Thank you{name ? `, ${name.split(" ")[0]}` : ""}. Our maître d&apos;hôtel
              will confirm the details by hand within the hour. Should the tide
              or the kitchen wish to surprise you, we shall be in touch.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              data-cursor="Again"
              className="mt-8 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:text-gold-light"
            >
              Make another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid gap-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="res-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="res-name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="res-restaurant" className={labelClass}>
                  Restaurant
                </label>
                <select
                  id="res-restaurant"
                  name="restaurant"
                  required
                  defaultValue={RESTAURANT_OPTIONS[0]}
                  className={fieldClass}
                >
                  {RESTAURANT_OPTIONS.map((r) => (
                    <option key={r} value={r} className="bg-ink text-sand">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="res-date" className={labelClass}>
                  Date
                </label>
                <input
                  id="res-date"
                  name="date"
                  type="date"
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="res-time" className={labelClass}>
                  Time
                </label>
                <select
                  id="res-time"
                  name="time"
                  required
                  defaultValue="19:30"
                  className={fieldClass}
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={t} value={t} className="bg-ink text-sand">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="res-guests" className={labelClass}>
                  Guests
                </label>
                <input
                  id="res-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={12}
                  defaultValue={2}
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
              <p className="text-xs leading-relaxed text-sand/45">
                Tables at Maré are limited to twenty guests each evening. We
                recommend reserving well ahead of your arrival.
              </p>
              <Button type="submit" variant="gold" cursorLabel="Send" className="shrink-0">
                Request the table
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
