"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  CalendarDays,
  Users,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Check,
  Bed,
  Maximize2,
  Eye,
  Plane,
  Anchor,
  Sparkles,
  UtensilsCrossed,
  Compass,
  Mail,
  Phone,
  User as UserIcon,
  MessageSquare,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { ROOMS, SPA_TREATMENTS, EXPERIENCES, BRAND, type Room } from "@/lib/site";

/* ------------------------------------------------------------------ */
/*  Constants & types                                                  */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const TAX_RATE = 0.12;

type EnhancementCategory = "Transfer" | "Wellness" | "Dining" | "Experience";

type Enhancement = {
  id: string;
  name: string;
  category: EnhancementCategory;
  description: string;
  price: number;
  /** "stay" = one-off; "night" = multiplied by nights; "guest" = per adult. */
  unit: "stay" | "night" | "guest";
  icon: typeof Plane;
};

const ENHANCEMENTS: Enhancement[] = [
  {
    id: "seaplane",
    name: "Private Seaplane Transfer",
    category: "Transfer",
    description:
      "A 35-minute flight from Faa'a over the reef, met with chilled champagne on the pontoon. Return.",
    price: 2400,
    unit: "stay",
    icon: Plane,
  },
  {
    id: "yacht-transfer",
    name: "Arrival by Yacht",
    category: "Transfer",
    description:
      "Cross the lagoon aboard a private launch — a slow, salt-air introduction to the island. Return.",
    price: 1600,
    unit: "stay",
    icon: Anchor,
  },
  {
    id: "aurelia-ritual",
    name: "The Aurelia Ritual — Daily",
    category: "Wellness",
    description:
      "Our signature 150-minute monoï ceremony in the overwater float pavilion, taken each morning of your stay.",
    price: SPA_TREATMENTS[0].price,
    unit: "night",
    icon: Sparkles,
  },
  {
    id: "chefs-table",
    name: "Chef's Table at Maré",
    category: "Dining",
    description:
      "A nine-course tasting from Chef Elise Moreau at the pass of the two-Michelin-star kitchen, wines paired.",
    price: 780,
    unit: "guest",
    icon: UtensilsCrossed,
  },
  {
    id: "sunset-cruise",
    name: "Private Sunset Cruise",
    category: "Experience",
    description:
      "The 1962 schooner, cellar wines and canapés, as the sky turns the colour of the resort's name.",
    price: 1900,
    unit: "stay",
    icon: Compass,
  },
  {
    id: "reef-dive",
    name: "The Living Reef — Guided Dive",
    category: "Experience",
    description:
      "A private descent with the reserve's resident marine biologist through pristine coral gardens.",
    price: 640,
    unit: "guest",
    icon: Compass,
  },
];

const guestSchema = z.object({
  firstName: z.string().min(2, "Please enter your first name."),
  lastName: z.string().min(2, "Please enter your last name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a contact number.")
    .regex(/^[+()\-\s\d]+$/, "Please enter a valid phone number."),
  country: z.string().min(2, "Please enter your country of residence."),
  requests: z
    .string()
    .max(600, "Please keep requests under 600 characters.")
    .optional(),
});

type GuestForm = z.infer<typeof guestSchema>;

type EnhancementQty = Record<string, boolean>;

const STEPS = [
  { id: 1, label: "Dates & Guests" },
  { id: 2, label: "Residence" },
  { id: 3, label: "Enhancements" },
  { id: 4, label: "Guest Details" },
  { id: 5, label: "Review" },
  { id: 6, label: "Confirmed" },
] as const;

/* ------------------------------------------------------------------ */
/*  Date helpers                                                       */
/* ------------------------------------------------------------------ */

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function nightsBetween(arrive: string, depart: string) {
  const a = new Date(arrive + "T00:00:00");
  const d = new Date(depart + "T00:00:00");
  const ms = d.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

function prettyDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function BookingWizard() {
  const params = useSearchParams();
  const reducedMotion = useReducedMotion();

  // Initial values from URL (set by the hero widget).
  const defaultArrive = params.get("arrive") || "2026-08-14";
  const defaultDepart = params.get("depart") || "2026-08-19";
  const urlGuests = Number(params.get("guests"));
  const urlRoomSlug = params.get("room");

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [arrive, setArrive] = useState(defaultArrive);
  const [depart, setDepart] = useState(defaultDepart);
  const [adults, setAdults] = useState(
    Number.isFinite(urlGuests) && urlGuests > 0 ? Math.min(urlGuests, 6) : 2
  );
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [roomSlug, setRoomSlug] = useState<string>(
    urlRoomSlug && ROOMS.some((r) => r.slug === urlRoomSlug)
      ? urlRoomSlug
      : ROOMS[0].slug
  );
  const [enhancements, setEnhancements] = useState<EnhancementQty>({});

  const [guest, setGuest] = useState<GuestForm | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const selectedRoom = useMemo(
    () => ROOMS.find((r) => r.slug === roomSlug) ?? ROOMS[0],
    [roomSlug]
  );

  const nights = nightsBetween(arrive, depart);

  /* ---- pricing ---- */
  const pricing = useMemo(() => {
    const roomTotal = selectedRoom.price * Math.max(nights, 0) * rooms;

    const enhancementLines = ENHANCEMENTS.filter((e) => enhancements[e.id]).map(
      (e) => {
        let qty = 1;
        let total = e.price;
        if (e.unit === "night") {
          qty = Math.max(nights, 1);
          total = e.price * qty;
        } else if (e.unit === "guest") {
          qty = Math.max(adults, 1);
          total = e.price * qty;
        }
        return { ...e, qty, total };
      }
    );

    const enhancementsTotal = enhancementLines.reduce(
      (sum, e) => sum + e.total,
      0
    );
    const subtotal = roomTotal + enhancementsTotal;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax;

    return { roomTotal, enhancementLines, enhancementsTotal, subtotal, tax, total };
  }, [selectedRoom, nights, rooms, enhancements, adults]);

  /* ---- navigation ---- */
  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  const validStep1 = nights >= 1 && adults >= 1 && rooms >= 1;

  const handleGuestSubmit = (data: GuestForm) => {
    setGuest(data);
    go(5);
  };

  const confirmBooking = async () => {
    setSubmitting(true);
    // Simulate a considered, unhurried confirmation.
    await new Promise((r) => setTimeout(r, 1900));
    const code =
      "AUR-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);
    setConfirmation(code);
    setSubmitting(false);
    go(6);
  };

  const stepVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reducedMotion ? 0 : dir * 48,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reducedMotion ? 0 : dir * -48,
    }),
  };

  const showSidebar = step >= 1 && step <= 5;

  return (
    <div className="relative min-h-screen bg-ink pb-24 pt-32 md:pt-40">
      {/* atmospheric backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-sea/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-6 md:px-10">
        {/* header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="eyebrow mb-5 flex items-center gap-4 text-gold"
          >
            <span className="h-px w-10 bg-gold" />
            Reservation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="max-w-3xl font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-sand md:text-7xl"
          >
            {step === 6 ? "The island awaits." : "Compose your escape."}
          </motion.h1>
        </div>

        {/* progress */}
        {step <= 6 && <ProgressBar step={step} />}

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-10",
            showSidebar && "lg:grid-cols-[1fr_22rem]"
          )}
        >
          {/* step canvas */}
          <div className="min-h-[24rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
              >
                {step === 1 && (
                  <StepDates
                    arrive={arrive}
                    depart={depart}
                    adults={adults}
                    childrenCount={children}
                    rooms={rooms}
                    nights={nights}
                    setArrive={setArrive}
                    setDepart={setDepart}
                    setAdults={setAdults}
                    setChildren={setChildren}
                    setRooms={setRooms}
                  />
                )}
                {step === 2 && (
                  <StepResidence
                    roomSlug={roomSlug}
                    setRoomSlug={setRoomSlug}
                    nights={nights}
                    rooms={rooms}
                    guests={adults + children}
                  />
                )}
                {step === 3 && (
                  <StepEnhancements
                    enhancements={enhancements}
                    setEnhancements={setEnhancements}
                    nights={nights}
                    adults={adults}
                  />
                )}
                {step === 4 && (
                  <StepGuest
                    defaults={guest}
                    onSubmit={handleGuestSubmit}
                    onBack={() => go(3)}
                  />
                )}
                {step === 5 && (
                  <StepReview
                    room={selectedRoom}
                    arrive={arrive}
                    depart={depart}
                    nights={nights}
                    rooms={rooms}
                    adults={adults}
                    childrenCount={children}
                    guest={guest}
                    pricing={pricing}
                    submitting={submitting}
                    onConfirm={confirmBooking}
                    onEditGuest={() => go(4)}
                  />
                )}
                {step === 6 && confirmation && (
                  <StepSuccess
                    code={confirmation}
                    room={selectedRoom}
                    arrive={arrive}
                    depart={depart}
                    nights={nights}
                    guest={guest}
                    total={pricing.total}
                    reducedMotion={!!reducedMotion}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* footer nav (hidden on the form step where the form owns submit, and on success) */}
            {step !== 4 && step !== 6 && (
              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                {step > 1 ? (
                  <button
                    onClick={() => go(step - 1)}
                    className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-sand/70 transition-colors hover:text-gold"
                  >
                    <ArrowLeft
                      size={16}
                      className="transition-transform duration-500 group-hover:-translate-x-1"
                    />
                    Back
                  </button>
                ) : (
                  <span />
                )}

                {step < 5 && (
                  <NextButton
                    disabled={step === 1 && !validStep1}
                    onClick={() => go(step + 1)}
                    label={step === 3 ? "Guest details" : "Continue"}
                  />
                )}
              </div>
            )}
          </div>

          {/* sidebar summary */}
          {showSidebar && (
            <SummarySidebar
              room={selectedRoom}
              arrive={arrive}
              depart={depart}
              nights={nights}
              rooms={rooms}
              adults={adults}
              childrenCount={children}
              pricing={pricing}
              enhancementCount={pricing.enhancementLines.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Progress bar                                                       */
/* ================================================================== */

function ProgressBar({ step }: { step: number }) {
  const total = STEPS.length;
  const pct = ((step - 1) / (total - 1)) * 100;

  return (
    <div>
      {/* labels — desktop */}
      <div className="mb-4 hidden items-center justify-between md:flex">
        {STEPS.map((s) => {
          const done = s.id < step;
          const active = s.id === step;
          return (
            <div key={s.id} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-[11px] transition-all duration-500",
                  done && "border-gold bg-gold-gradient text-ink",
                  active && "border-gold text-gold shadow-gold",
                  !done && !active && "border-white/15 text-sand/40"
                )}
              >
                {done ? <Check size={13} /> : s.id}
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] transition-colors duration-500",
                  active ? "text-gold" : done ? "text-sand/70" : "text-sand/35"
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* track */}
      <div className="relative h-px w-full bg-white/10">
        <motion.div
          className="absolute left-0 top-0 h-px bg-gradient-to-r from-gold-light via-gold to-gold-600"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.span
          className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold shadow-gold"
          initial={false}
          animate={{ left: `calc(${pct}% - 4px)` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      </div>

      {/* mobile step label */}
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gold md:hidden">
        Step {Math.min(step, total)} / {total} — {STEPS[Math.min(step, total) - 1].label}
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Shared bits                                                        */
/* ================================================================== */

function NextButton({
  onClick,
  disabled,
  label = "Continue",
}: {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-gradient px-9 py-4 text-[11px] uppercase tracking-[0.22em] text-ink shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(201,169,97,0.7)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-luxe group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-3">
        {label}
        <ArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

function StepTitle({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-4 flex items-center gap-3 text-gold">
        <span className="font-serif text-sm text-gold/70">{index}</span>
        <span className="h-px w-8 bg-gold/50" />
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl font-light leading-tight tracking-[-0.01em] text-sand md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/60">
          {intro}
        </p>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Step 1 — Dates & guests                                            */
/* ================================================================== */

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div className="glass flex items-center justify-between rounded-xl px-6 py-5">
      <div>
        <p className="font-serif text-lg text-sand">{label}</p>
        {hint && <p className="text-xs text-sand/45">{hint}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sand transition-all duration-300 hover:border-gold hover:text-gold disabled:opacity-30"
        >
          <Minus size={15} />
        </button>
        <span className="w-6 text-center font-serif text-xl text-gold tabular-nums">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sand transition-all duration-300 hover:border-gold hover:text-gold disabled:opacity-30"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}

function StepDates({
  arrive,
  depart,
  adults,
  childrenCount,
  rooms,
  nights,
  setArrive,
  setDepart,
  setAdults,
  setChildren,
  setRooms,
}: {
  arrive: string;
  depart: string;
  adults: number;
  childrenCount: number;
  rooms: number;
  nights: number;
  setArrive: (v: string) => void;
  setDepart: (v: string) => void;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;
  setRooms: (n: number) => void;
}) {
  const today = toISODate(new Date());
  return (
    <div>
      <StepTitle
        index="01"
        eyebrow="When & who"
        title="Choose your dates."
        intro="Tell us when the horizon should belong to you, and how many will share it. Arrivals are met privately at Faa'a and brought to the island by seaplane or launch."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="glass flex flex-col gap-2 rounded-xl px-6 py-5">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
            <CalendarDays size={15} /> Arrive
          </span>
          <input
            type="date"
            value={arrive}
            min={today}
            onChange={(e) => {
              setArrive(e.target.value);
              if (e.target.value >= depart) {
                const next = new Date(e.target.value + "T00:00:00");
                next.setDate(next.getDate() + 1);
                setDepart(toISODate(next));
              }
            }}
            className="w-full bg-transparent font-serif text-xl text-sand focus:outline-none [color-scheme:dark]"
          />
        </label>

        <label className="glass flex flex-col gap-2 rounded-xl px-6 py-5">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
            <CalendarDays size={15} /> Depart
          </span>
          <input
            type="date"
            value={depart}
            min={arrive}
            onChange={(e) => setDepart(e.target.value)}
            className="w-full bg-transparent font-serif text-xl text-sand focus:outline-none [color-scheme:dark]"
          />
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/5 px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-ink">
          <Users size={15} />
        </span>
        <p className="text-sm text-sand/80">
          {nights >= 1 ? (
            <>
              <span className="font-serif text-lg text-gold">{nights}</span>{" "}
              {nights === 1 ? "night" : "nights"} on Maré Séraphine —{" "}
              {prettyDate(arrive)} to {prettyDate(depart)}.
            </>
          ) : (
            <span className="text-gold">
              Please choose a departure after your arrival.
            </span>
          )}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stepper
          label="Adults"
          value={adults}
          min={1}
          max={8}
          onChange={setAdults}
          hint="Aged 16 and over"
        />
        <Stepper
          label="Children"
          value={childrenCount}
          min={0}
          max={6}
          onChange={setChildren}
          hint="Nannies on request"
        />
        <Stepper
          label="Residences"
          value={rooms}
          min={1}
          max={6}
          onChange={setRooms}
          hint="Rooms to reserve"
        />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Step 2 — Residence                                                 */
/* ================================================================== */

function StepResidence({
  roomSlug,
  setRoomSlug,
  nights,
  rooms,
  guests,
}: {
  roomSlug: string;
  setRoomSlug: (s: string) => void;
  nights: number;
  rooms: number;
  guests: number;
}) {
  return (
    <div>
      <StepTitle
        index="02"
        eyebrow="Your residence"
        title="Where you'll wake."
        intro="Thirty-four residences, each with a dedicated butler, daily breakfast and return island transfers. Prices shown are per residence, per night."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {ROOMS.map((room) => {
          const selected = room.slug === roomSlug;
          const fits = room.guests * rooms >= guests;
          return (
            <button
              key={room.slug}
              type="button"
              onClick={() => setRoomSlug(room.slug)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border text-left transition-all duration-500",
                selected
                  ? "border-gold shadow-gold"
                  : "border-white/10 hover:border-gold/40"
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className={cn(
                    "object-cover transition-transform duration-[1.2s] ease-luxe",
                    selected ? "scale-105" : "group-hover:scale-105"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-gold backdrop-blur">
                  {room.category}
                </span>
                <AnimatePresence>
                  {selected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold"
                    >
                      <Check size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-2xl font-light text-sand">
                  {room.name}
                </h3>
                <p className="mt-1 text-xs italic text-sand/55">
                  {room.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-sand/60">
                  <span className="flex items-center gap-1.5">
                    <Maximize2 size={13} className="text-gold" /> {room.size} m²
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} className="text-gold" /> {room.guests}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bed size={13} className="text-gold" /> {room.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye size={13} className="text-gold" /> {room.view}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="font-serif text-2xl text-gold">
                      {formatCurrency(room.price)}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-sand/40">
                      per night
                    </p>
                  </div>
                  {nights >= 1 && (
                    <p className="text-right text-[11px] text-sand/60">
                      {formatCurrency(room.price * nights * rooms)}
                      <span className="block text-[10px] text-sand/40">
                        {nights} {nights === 1 ? "night" : "nights"}
                        {rooms > 1 ? ` × ${rooms}` : ""}
                      </span>
                    </p>
                  )}
                </div>

                {!fits && (
                  <p className="mt-3 text-[11px] text-gold/80">
                    Tip: this residence sleeps {room.guests}. Add residences to
                    host your party.
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Step 3 — Enhancements                                              */
/* ================================================================== */

function StepEnhancements({
  enhancements,
  setEnhancements,
  nights,
  adults,
}: {
  enhancements: EnhancementQty;
  setEnhancements: (v: EnhancementQty) => void;
  nights: number;
  adults: number;
}) {
  const toggle = (id: string) =>
    setEnhancements({ ...enhancements, [id]: !enhancements[id] });

  const unitLabel = (e: Enhancement) => {
    if (e.unit === "night")
      return `${formatCurrency(e.price)} / night · ${Math.max(nights, 1)} ${
        Math.max(nights, 1) === 1 ? "night" : "nights"
      }`;
    if (e.unit === "guest")
      return `${formatCurrency(e.price)} / guest · ${Math.max(adults, 1)} ${
        Math.max(adults, 1) === 1 ? "adult" : "adults"
      }`;
    return `${formatCurrency(e.price)} · per stay`;
  };

  const lineTotal = (e: Enhancement) => {
    if (e.unit === "night") return e.price * Math.max(nights, 1);
    if (e.unit === "guest") return e.price * Math.max(adults, 1);
    return e.price;
  };

  return (
    <div>
      <StepTitle
        index="03"
        eyebrow="The finer details"
        title="Shape your days."
        intro="Optional touches, added to your itinerary and your bill only if you wish. Everything else — the butler, breakfast, sunset canapés and non-motorised watersports — is already yours."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ENHANCEMENTS.map((e) => {
          const on = !!enhancements[e.id];
          const Icon = e.icon;
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => toggle(e.id)}
              className={cn(
                "group relative flex flex-col rounded-2xl border p-6 text-left transition-all duration-500",
                on
                  ? "border-gold bg-gold/5 shadow-gold"
                  : "border-white/10 hover:border-gold/40"
              )}
            >
              <div className="mb-4 flex items-start justify-between">
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500",
                    on
                      ? "border-transparent bg-gold-gradient text-ink"
                      : "border-white/15 text-gold group-hover:border-gold/50"
                  )}
                >
                  <Icon size={18} />
                </span>
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300",
                    on
                      ? "border-gold bg-gold-gradient text-ink"
                      : "border-white/20 text-transparent"
                  )}
                >
                  <Check size={13} />
                </span>
              </div>

              <span className="text-[9px] uppercase tracking-[0.22em] text-gold/70">
                {e.category}
              </span>
              <h3 className="mt-1 font-serif text-xl font-light text-sand">
                {e.name}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-sand/55">
                {e.description}
              </p>

              <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                <p className="text-[11px] text-sand/50">{unitLabel(e)}</p>
                <p className="font-serif text-lg text-gold">
                  {formatCurrency(lineTotal(e))}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Step 4 — Guest details (react-hook-form + zod)                     */
/* ================================================================== */

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: typeof Mail;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <Icon size={14} /> {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-[11px] text-gold-light"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 font-sans text-sand placeholder:text-sand/30 transition-colors duration-300 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/30";

function StepGuest({
  defaults,
  onSubmit,
  onBack,
}: {
  defaults: GuestForm | null;
  onSubmit: (d: GuestForm) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestForm>({
    resolver: zodResolver(guestSchema),
    defaultValues: defaults ?? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      requests: "",
    },
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepTitle
        index="04"
        eyebrow="Guest details"
        title="Who shall we prepare for?"
        intro="Your details are held in confidence and used only to prepare your arrival. Our reservations atelier will confirm every detail personally."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="First name" icon={UserIcon} error={errors.firstName?.message}>
          <input
            {...register("firstName")}
            placeholder="Anaïs"
            className={inputClass}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last name" icon={UserIcon} error={errors.lastName?.message}>
          <input
            {...register("lastName")}
            placeholder="Deveraux"
            className={inputClass}
            autoComplete="family-name"
          />
        </Field>
        <Field label="Email" icon={Mail} error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            autoComplete="email"
          />
        </Field>
        <Field label="Telephone" icon={Phone} error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+33 1 42 00 00 00"
            className={inputClass}
            autoComplete="tel"
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="Country of residence" icon={Compass} error={errors.country?.message}>
            <input
              {...register("country")}
              placeholder="France"
              className={inputClass}
              autoComplete="country-name"
            />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field
            label="Special requests"
            icon={MessageSquare}
            error={errors.requests?.message}
          >
            <textarea
              {...register("requests")}
              rows={4}
              placeholder="Dietary preferences, a celebration to mark, arrival timings, a favourite champagne on ice…"
              className={cn(inputClass, "resize-none")}
            />
          </Field>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-sand/70 transition-colors hover:text-gold"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-500 group-hover:-translate-x-1"
          />
          Back
        </button>
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-gradient px-9 py-4 text-[11px] uppercase tracking-[0.22em] text-ink shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(201,169,97,0.7)]"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-luxe group-hover:translate-x-full" />
          <span className="relative z-10 flex items-center gap-3">
            Review reservation
            <ArrowRight
              size={16}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          </span>
        </button>
      </div>
    </form>
  );
}

/* ================================================================== */
/*  Step 5 — Review                                                    */
/* ================================================================== */

type Pricing = {
  roomTotal: number;
  enhancementLines: (Enhancement & { qty: number; total: number })[];
  enhancementsTotal: number;
  subtotal: number;
  tax: number;
  total: number;
};

function StepReview({
  room,
  arrive,
  depart,
  nights,
  rooms,
  adults,
  childrenCount,
  guest,
  pricing,
  submitting,
  onConfirm,
  onEditGuest,
}: {
  room: Room;
  arrive: string;
  depart: string;
  nights: number;
  rooms: number;
  adults: number;
  childrenCount: number;
  guest: GuestForm | null;
  pricing: Pricing;
  submitting: boolean;
  onConfirm: () => void;
  onEditGuest: () => void;
}) {
  return (
    <div>
      <StepTitle
        index="05"
        eyebrow="Review & confirm"
        title="Everything in its place."
        intro="A final glance before we prepare the island. No payment is taken here — our atelier will complete your reservation in a personal call."
      />

      <div className="overflow-hidden rounded-2xl border border-white/10">
        {/* residence banner */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <span className="text-[9px] uppercase tracking-[0.22em] text-gold">
              {room.category}
            </span>
            <h3 className="font-serif text-3xl font-light text-sand">
              {room.name}
            </h3>
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          {/* stay facts */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Fact label="Arrive" value={prettyDate(arrive)} />
            <Fact label="Depart" value={prettyDate(depart)} />
            <Fact
              label="Duration"
              value={`${nights} ${nights === 1 ? "night" : "nights"}`}
            />
            <Fact
              label="Party"
              value={`${adults} adult${adults === 1 ? "" : "s"}${
                childrenCount ? `, ${childrenCount} child${childrenCount === 1 ? "" : "ren"}` : ""
              } · ${rooms} res.`}
            />
          </div>

          {/* guest */}
          {guest && (
            <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                  Lead guest
                </p>
                <p className="mt-1 font-serif text-xl text-sand">
                  {guest.firstName} {guest.lastName}
                </p>
                <p className="text-sm text-sand/55">
                  {guest.email} · {guest.phone}
                </p>
                <p className="text-sm text-sand/45">{guest.country}</p>
                {guest.requests && (
                  <p className="mt-3 max-w-md text-sm italic text-sand/55">
                    “{guest.requests}”
                  </p>
                )}
              </div>
              <button
                onClick={onEditGuest}
                className="text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
              >
                Edit
              </button>
            </div>
          )}

          {/* price breakdown */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <PriceRow
              label={`${room.name} · ${formatCurrency(room.price)} × ${nights} ${
                nights === 1 ? "night" : "nights"
              }${rooms > 1 ? ` × ${rooms}` : ""}`}
              value={pricing.roomTotal}
            />
            {pricing.enhancementLines.map((e) => (
              <PriceRow
                key={e.id}
                label={`${e.name}${e.qty > 1 ? ` · ×${e.qty}` : ""}`}
                value={e.total}
                muted
              />
            ))}
            <PriceRow label="Subtotal" value={pricing.subtotal} />
            <PriceRow label="Resort levy & tax (12%)" value={pricing.tax} muted />
            <div className="flex items-end justify-between border-t border-gold/20 pt-4">
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
                Total
              </span>
              <span className="font-serif text-4xl font-light text-gold">
                {formatCurrency(pricing.total)}
              </span>
            </div>
          </div>

          <button
            onClick={onConfirm}
            disabled={submitting}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-gradient px-9 py-5 text-[11px] uppercase tracking-[0.22em] text-ink shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(201,169,97,0.7)] disabled:opacity-70"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-luxe group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-3">
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Confirming your reservation…
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Confirm reservation
                </>
              )}
            </span>
          </button>
          <p className="text-center text-[11px] text-sand/40">
            A hold, not a charge. Cancellation is complimentary up to 30 days
            before arrival.
          </p>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold/70">
        {label}
      </p>
      <p className="mt-1 font-serif text-lg text-sand">{value}</p>
    </div>
  );
}

function PriceRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span
        className={cn(
          "text-sm",
          muted ? "text-sand/50" : "text-sand/80"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "shrink-0 font-serif text-lg tabular-nums",
          muted ? "text-sand/60" : "text-sand"
        )}
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}

/* ================================================================== */
/*  Step 6 — Success                                                   */
/* ================================================================== */

function StepSuccess({
  code,
  room,
  arrive,
  depart,
  nights,
  guest,
  total,
  reducedMotion,
}: {
  code: string;
  room: Room;
  arrive: string;
  depart: string;
  nights: number;
  guest: GuestForm | null;
  total: number;
  reducedMotion: boolean;
}) {
  // A gentle, framer-only gold shimmer — no confetti.
  const motes = Array.from({ length: 18 });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-ink-800/60 px-6 py-16 text-center md:px-16 md:py-24">
      {/* gold motes */}
      {!reducedMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {motes.map((_, i) => {
            const left = (i * 53) % 100;
            const delay = (i % 6) * 0.4;
            const dur = 4 + (i % 5);
            return (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-gold"
                style={{ left: `${left}%`, bottom: "-5%" }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [-20, -420],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: dur,
                  delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.1 }}
        className="relative z-10 mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold"
      >
        <Check size={34} strokeWidth={2.5} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
        className="eyebrow mb-5 text-gold"
      >
        Reservation received
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
        className="relative z-10 mx-auto max-w-2xl font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-sand md:text-6xl"
      >
        {guest ? `Thank you, ${guest.firstName}.` : "Thank you."}
        <span className="mt-3 block text-gold">The island is being prepared.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="relative z-10 mx-auto mt-6 max-w-xl text-sm leading-relaxed text-sand/60"
      >
        A member of our reservations atelier will call within a few hours to
        confirm every detail and arrange your transfer. A confirmation has been
        sent {guest ? `to ${guest.email}` : "to your inbox"}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
        className="relative z-10 mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70">
          Confirmation code
        </p>
        <p className="mt-2 font-serif text-3xl tracking-[0.1em] text-gold">
          {code}
        </p>
        <div className="mt-5 space-y-1 border-t border-white/10 pt-5 text-sm text-sand/70">
          <p>
            <span className="text-sand/45">Residence · </span>
            {room.name}
          </p>
          <p>
            <span className="text-sand/45">Stay · </span>
            {prettyDate(arrive)} — {prettyDate(depart)} ({nights}{" "}
            {nights === 1 ? "night" : "nights"})
          </p>
          <p>
            <span className="text-sand/45">Estimated total · </span>
            <span className="text-gold">{formatCurrency(total)}</span>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.9 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/concierge"
          className="group inline-flex items-center gap-3 rounded-full bg-gold-gradient px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-ink shadow-gold transition-all duration-500 hover:gap-4"
        >
          Plan your days with the concierge
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-sand transition-colors hover:border-gold hover:text-gold"
        >
          Return home
        </Link>
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  Sidebar                                                            */
/* ================================================================== */

function SummarySidebar({
  room,
  arrive,
  depart,
  nights,
  rooms,
  adults,
  childrenCount,
  pricing,
  enhancementCount,
}: {
  room: Room;
  arrive: string;
  depart: string;
  nights: number;
  rooms: number;
  adults: number;
  childrenCount: number;
  pricing: Pricing;
  enhancementCount: number;
}) {
  return (
    <aside className="lg:sticky lg:top-32 lg:h-fit">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 backdrop-blur">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="22rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
          <div className="absolute bottom-4 left-5">
            <p className="text-[9px] uppercase tracking-[0.22em] text-gold">
              Your residence
            </p>
            <p className="font-serif text-xl font-light text-sand">
              {room.name}
            </p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-sand/50">Dates</span>
            <span className="text-right text-sand/85">
              {prettyDate(arrive)}
              <span className="mx-1 text-sand/30">→</span>
              {prettyDate(depart)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-sand/50">Guests</span>
            <span className="text-sand/85">
              {adults + childrenCount} · {rooms} res.
            </span>
          </div>

          <div className="my-4 h-px w-full bg-white/10" />

          <PriceRow
            label={`${nights} ${nights === 1 ? "night" : "nights"} × ${formatCurrency(
              room.price
            )}${rooms > 1 ? ` × ${rooms}` : ""}`}
            value={pricing.roomTotal}
          />
          {enhancementCount > 0 && (
            <PriceRow
              label={`${enhancementCount} enhancement${
                enhancementCount === 1 ? "" : "s"
              }`}
              value={pricing.enhancementsTotal}
              muted
            />
          )}
          <PriceRow label="Resort levy & tax" value={pricing.tax} muted />

          <div className="flex items-end justify-between border-t border-gold/20 pt-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
              Estimated total
            </span>
            <motion.span
              key={pricing.total}
              initial={{ opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-serif text-3xl font-light text-gold"
            >
              {formatCurrency(pricing.total)}
            </motion.span>
          </div>

          <p className="text-[11px] leading-relaxed text-sand/40">
            Inclusive of butler service, daily breakfast, sunset canapés and
            island transfers.
          </p>
        </div>
      </div>

      <p className="mt-5 text-center text-[11px] text-sand/40">
        Need guidance?{" "}
        <a href={`tel:${BRAND.phone}`} className="text-gold hover:text-gold-light">
          {BRAND.phone}
        </a>
      </p>
    </aside>
  );
}
