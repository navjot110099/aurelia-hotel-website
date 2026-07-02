"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users, MapPin, ArrowRight } from "lucide-react";

/**
 * Compact glass booking bar used in the hero. Collects dates + guests and
 * forwards to the full booking flow with query params so the wizard can
 * pre-fill. Uses native date inputs (accessible, zero-dependency) styled to
 * the brand.
 */
export function HeroBookingWidget() {
  const router = useRouter();
  const today = "2026-07-10";
  const [arrive, setArrive] = useState(today);
  const [depart, setDepart] = useState("2026-07-15");
  const [guests, setGuests] = useState(2);

  const submit = () => {
    const params = new URLSearchParams({
      arrive,
      depart,
      guests: String(guests),
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="glass mx-auto flex w-full max-w-5xl flex-col items-stretch gap-px overflow-hidden rounded-2xl md:flex-row md:items-center">
      <Field icon={<MapPin size={16} />} label="Destination">
        <span className="font-serif text-lg text-sand">Maré Séraphine</span>
      </Field>
      <Divider />
      <Field icon={<CalendarDays size={16} />} label="Arrive">
        <input
          type="date"
          value={arrive}
          min={today}
          onChange={(e) => setArrive(e.target.value)}
          className="w-full bg-transparent font-serif text-lg text-sand focus:outline-none [color-scheme:dark]"
        />
      </Field>
      <Divider />
      <Field icon={<CalendarDays size={16} />} label="Depart">
        <input
          type="date"
          value={depart}
          min={arrive}
          onChange={(e) => setDepart(e.target.value)}
          className="w-full bg-transparent font-serif text-lg text-sand focus:outline-none [color-scheme:dark]"
        />
      </Field>
      <Divider />
      <Field icon={<Users size={16} />} label="Guests">
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full cursor-pointer bg-transparent font-serif text-lg text-sand focus:outline-none [&>option]:bg-ink-800"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </Field>

      <button
        onClick={submit}
        data-cursor="Check"
        className="group flex items-center justify-center gap-3 bg-gold-gradient px-8 py-5 text-[11px] uppercase tracking-[0.22em] text-ink transition-all duration-500 hover:gap-5 md:py-7"
      >
        Check availability
        <ArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-1 cursor-pointer flex-col gap-1 px-6 py-4">
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

const Divider = () => (
  <span className="hidden h-10 w-px bg-white/10 md:block" />
);
