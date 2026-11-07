"use client";

import { createElement, useState } from "react";
import type { LucideProps } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  BookOpen,
  CalendarRange,
  CreditCard,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquareQuote,
  Search,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { BarChart, Donut, Sparkline, type BarDatum } from "./MiniCharts";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ================================================================== */
/*  Types & mock data                                                 */
/* ================================================================== */

type SectionId =
  | "overview"
  | "reservations"
  | "guests"
  | "payments"
  | "availability"
  | "rooms"
  | "gallery"
  | "testimonials"
  | "offers"
  | "blog";

type NavItem = { id: SectionId; label: string; icon: React.ElementType };

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "reservations", label: "Reservations", icon: CalendarRange },
  { id: "guests", label: "Guests", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "availability", label: "Availability", icon: BedDouble },
  { id: "rooms", label: "Rooms", icon: BedDouble },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "offers", label: "Offers", icon: Tag },
  { id: "blog", label: "Blog", icon: BookOpen },
];

type Kpi = {
  label: string;
  value: string;
  delta: number;
  spark: number[];
};

const KPIS: Kpi[] = [
  {
    label: "Revenue · MTD",
    value: formatCurrency(3_842_000),
    delta: 12.4,
    spark: [180, 210, 190, 240, 260, 250, 300, 320, 340],
  },
  {
    label: "Occupancy",
    value: "88%",
    delta: 4.1,
    spark: [72, 75, 79, 81, 78, 84, 86, 85, 88],
  },
  {
    label: "ADR",
    value: formatCurrency(6_420),
    delta: 6.8,
    spark: [5900, 6010, 5950, 6100, 6220, 6180, 6300, 6380, 6420],
  },
  {
    label: "RevPAR",
    value: formatCurrency(5_650),
    delta: 8.2,
    spark: [4700, 4820, 4900, 5010, 5180, 5220, 5410, 5520, 5650],
  },
  {
    label: "Arrivals today",
    value: "6",
    delta: -1,
    spark: [4, 5, 7, 6, 8, 5, 6, 7, 6],
  },
];

const BOOKINGS_12M: BarDatum[] = [
  { label: "Jul", value: 210 },
  { label: "Aug", value: 248 },
  { label: "Sep", value: 262 },
  { label: "Oct", value: 231 },
  { label: "Nov", value: 289 },
  { label: "Dec", value: 342 },
  { label: "Jan", value: 318 },
  { label: "Feb", value: 356 },
  { label: "Mar", value: 301 },
  { label: "Apr", value: 288 },
  { label: "May", value: 334 },
  { label: "Jun", value: 372 },
];

type Reservation = {
  code: string;
  guest: string;
  residence: string;
  arrival: string;
  nights: number;
  value: number;
  status: "Confirmed" | "In-house" | "Arriving" | "Departing";
};

const RESERVATIONS: Reservation[] = [
  {
    code: "AUR-2026-8841",
    guest: "Julien Deveraux",
    residence: "Coralline Signature Suite",
    arrival: "18 Sep 2026",
    nights: 7,
    value: 29400,
    status: "Confirmed",
  },
  {
    code: "AUR-2026-8809",
    guest: "Katherine Ashford",
    residence: "Aurora Presidential Suite",
    arrival: "02 Jul 2026",
    nights: 5,
    value: 34000,
    status: "In-house",
  },
  {
    code: "AUR-2026-8792",
    guest: "Hiroshi Tanaka",
    residence: "Ocean Lagoon Room",
    arrival: "02 Jul 2026",
    nights: 4,
    value: 7400,
    status: "Arriving",
  },
  {
    code: "AUR-2026-8770",
    guest: "Sofia & Marco Ricci",
    residence: "Palmwood Pool Villa",
    arrival: "28 Jun 2026",
    nights: 6,
    value: 57600,
    status: "Departing",
  },
  {
    code: "AUR-2026-8751",
    guest: "The Al-Rashid Family",
    residence: "The Celestia Residence",
    arrival: "05 Jul 2026",
    nights: 10,
    value: 240000,
    status: "Confirmed",
  },
  {
    code: "AUR-2026-8744",
    guest: "Eleanor Whitmore",
    residence: "Horizon Garden Room",
    arrival: "01 Jul 2026",
    nights: 3,
    value: 6450,
    status: "In-house",
  },
];

type Guest = {
  name: string;
  origin: string;
  tier: "Onyx" | "Sapphire" | "Gold" | "Guest";
  stays: number;
  lifetime: number;
};

const GUESTS: Guest[] = [
  { name: "Julien Deveraux", origin: "Paris, France", tier: "Sapphire", stays: 4, lifetime: 178320 },
  { name: "Katherine Ashford", origin: "London, UK", tier: "Onyx", stays: 9, lifetime: 512400 },
  { name: "Hiroshi Tanaka", origin: "Tokyo, Japan", tier: "Gold", stays: 3, lifetime: 61200 },
  { name: "The Al-Rashid Family", origin: "Dubai, UAE", tier: "Onyx", stays: 6, lifetime: 1240000 },
  { name: "Sofia & Marco Ricci", origin: "Milan, Italy", tier: "Sapphire", stays: 5, lifetime: 221600 },
  { name: "Eleanor Whitmore", origin: "New York, USA", tier: "Gold", stays: 2, lifetime: 38900 },
];

type Payment = {
  ref: string;
  guest: string;
  method: string;
  date: string;
  amount: number;
  status: "Settled" | "Pending" | "Refunded";
};

const PAYMENTS: Payment[] = [
  { ref: "PAY-99231", guest: "The Al-Rashid Family", method: "Wire transfer", date: "28 Jun 2026", amount: 120000, status: "Settled" },
  { ref: "PAY-99228", guest: "Julien Deveraux", method: "Visa ···· 4021", date: "12 Jun 2026", amount: 14700, status: "Settled" },
  { ref: "PAY-99225", guest: "Katherine Ashford", method: "Amex ···· 1007", date: "30 Jun 2026", amount: 34000, status: "Pending" },
  { ref: "PAY-99219", guest: "Sofia & Marco Ricci", method: "Visa ···· 8890", date: "27 Jun 2026", amount: 57600, status: "Settled" },
  { ref: "PAY-99210", guest: "Eleanor Whitmore", method: "Mastercard ···· 3345", date: "20 Jun 2026", amount: 3225, status: "Refunded" },
];

const ROOM_TYPES = [
  { name: "Ocean Lagoon Room", category: "Room", units: 8, rate: 1850, status: "Live" },
  { name: "Horizon Garden Room", category: "Room", units: 6, rate: 2150, status: "Live" },
  { name: "Coralline Signature Suite", category: "Suite", units: 6, rate: 4200, status: "Live" },
  { name: "Aurora Presidential Suite", category: "Suite", units: 4, rate: 6800, status: "Live" },
  { name: "Palmwood Pool Villa", category: "Villa", units: 8, rate: 9600, status: "Live" },
  { name: "The Celestia Residence", category: "Villa", units: 2, rate: 24000, status: "By invitation" },
] as const;

const GALLERY_ASSETS = [
  { title: "Coralline Suite at dusk", category: "Residences", status: "Published" },
  { title: "The reserve from the air", category: "Island", status: "Published" },
  { title: "A course at Maré", category: "Dining", status: "Published" },
  { title: "The Aurelia at anchor", category: "Ocean", status: "Draft" },
  { title: "Overwater float pavilion", category: "Spa", status: "Published" },
  { title: "Low tide, first light", category: "Ocean", status: "Review" },
] as const;

const TESTIMONIAL_ROWS = [
  { author: "Anaïs & Julien Deveraux", origin: "Paris, France", rating: 5, status: "Published" },
  { author: "Katherine Ashford", origin: "London, UK", rating: 5, status: "Published" },
  { author: "Hiroshi Tanaka", origin: "Tokyo, Japan", rating: 5, status: "Published" },
  { author: "Sofia Ricci", origin: "Milan, Italy", rating: 4, status: "Pending" },
] as const;

const OFFER_ROWS = [
  { title: "The Fifth Night, Ours", tag: "Suites & Villas", redemptions: 42, status: "Active" },
  { title: "A Honeymoon Written in Salt", tag: "Romance", redemptions: 28, status: "Active" },
  { title: "The Reserve, Entirely Yours", tag: "Exclusive", redemptions: 3, status: "Active" },
  { title: "Solstice at Maré", tag: "Dining", redemptions: 0, status: "Scheduled" },
] as const;

const BLOG_ROWS = [
  { title: "The Architecture of Stillness", category: "Design", date: "May 2026", status: "Published" },
  { title: "A Reef Reborn", category: "Sustainability", date: "Apr 2026", status: "Published" },
  { title: "Nine Courses, One Tide", category: "Dining", date: "Mar 2026", status: "Published" },
  { title: "The Cellar Beneath the Coral", category: "Dining", date: "Jul 2026", status: "Draft" },
] as const;

/* Availability heat-grid: 6 residence rows × 14 days, occupancy 0–3 */
const HEAT_ROWS = ROOM_TYPES.map((r) => r.name);
// Deterministic sample occupancy levels (0 free → 3 full).
const HEAT_DATA: number[][] = [
  [3, 3, 2, 2, 1, 0, 0, 1, 2, 3, 3, 2, 1, 1],
  [2, 2, 3, 3, 3, 2, 1, 1, 0, 1, 2, 2, 3, 3],
  [3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 1, 1, 2, 3],
  [1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 0, 0, 1, 2],
  [2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 1],
  [0, 0, 1, 1, 2, 3, 3, 3, 2, 1, 1, 0, 0, 1],
];

/* ================================================================== */
/*  Shared UI                                                          */
/* ================================================================== */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-gold/80">{children}</p>;
}

/** Render a Lucide icon component from a typed field. */
function Icon({
  as,
  ...props
}: { as: React.ElementType } & LucideProps) {
  return createElement(as, props);
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border border-white/10 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Confirmed: "border-gold/30 bg-gold/10 text-gold",
    "In-house": "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    Arriving: "border-sky-300/30 bg-sky-300/10 text-sky-200",
    Departing: "border-amber-300/30 bg-amber-300/10 text-amber-200",
    Settled: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    Pending: "border-amber-300/30 bg-amber-300/10 text-amber-200",
    Refunded: "border-rose-300/30 bg-rose-300/10 text-rose-200",
    Published: "border-gold/30 bg-gold/10 text-gold",
    Active: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    Live: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
    Draft: "border-sand/20 bg-white/5 text-sand/60",
    Review: "border-sky-300/30 bg-sky-300/10 text-sky-200",
    Scheduled: "border-sky-300/30 bg-sky-300/10 text-sky-200",
    "By invitation": "border-gold/30 bg-gold/10 text-gold",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em]",
        map[status] ?? "border-sand/20 bg-white/5 text-sand/60"
      )}
    >
      {status}
    </span>
  );
}

function TableShell({
  head,
  children,
}: {
  head: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-4 font-sans text-[10px] font-normal uppercase tracking-[0.16em] text-sand/40"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-sans text-sm font-light text-sand/75">
          {children}
        </tbody>
      </table>
    </div>
  );
}

function DeltaBadge({ delta }: { delta: number }) {
  const up = delta >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-sans text-xs tabular-nums",
        up ? "text-emerald-300" : "text-rose-300"
      )}
    >
      {up ? (
        <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
      ) : (
        <ArrowDownRight className="h-3 w-3" strokeWidth={2} />
      )}
      {up ? "+" : ""}
      {delta}%
    </span>
  );
}

const panelVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

/* ================================================================== */
/*  Panels                                                             */
/* ================================================================== */

function OverviewPanel() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((k) => (
          <Card key={k.label} className="flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
                {k.label}
              </p>
              <DeltaBadge delta={k.delta} />
            </div>
            <p className="mt-4 font-serif text-3xl font-light tabular-nums text-sand">
              {k.value}
            </p>
            <div className="mt-4">
              <Sparkline data={k.spark} width={140} height={34} />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <Eyebrow>Bookings</Eyebrow>
              <h3 className="mt-2 font-serif text-2xl font-light text-sand">
                Confirmed bookings · 12 months
              </h3>
            </div>
            <span className="hidden items-center gap-1.5 font-sans text-xs text-sand/50 sm:inline-flex">
              <TrendingUp className="h-4 w-4 text-gold" strokeWidth={1.5} />
              +18% YoY
            </span>
          </div>
          <div className="mt-10 px-1">
            <BarChart
              data={BOOKINGS_12M}
              height={220}
              valueFormatter={(v) => `${v}`}
            />
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center text-center">
          <Eyebrow>Occupancy</Eyebrow>
          <h3 className="mt-2 font-serif text-2xl font-light text-sand">
            This week
          </h3>
          <div className="my-6">
            <Donut value={88} label="Occupied" size={160} />
          </div>
          <div className="grid w-full grid-cols-2 gap-4 font-sans text-sm font-light text-sand/60">
            <div>
              <p className="font-serif text-xl text-sand">30</p>
              <p className="text-[10px] uppercase tracking-[0.14em]">Occupied</p>
            </div>
            <div>
              <p className="font-serif text-xl text-sand">4</p>
              <p className="text-[10px] uppercase tracking-[0.14em]">Available</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent reservations */}
      <Card className="p-0">
        <div className="flex items-center justify-between p-6">
          <div>
            <Eyebrow>Live</Eyebrow>
            <h3 className="mt-2 font-serif text-2xl font-light text-sand">
              Recent reservations
            </h3>
          </div>
          <CalendarRange className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
        </div>
        <div className="px-2 pb-2">
          <TableShell
            head={["Code", "Guest", "Residence", "Arrival", "Nights", "Value", "Status"]}
          >
            {RESERVATIONS.map((r) => (
              <tr key={r.code} className="transition-colors hover:bg-white/[0.03]">
                <td className="px-4 py-4 font-mono text-xs text-gold/80">
                  {r.code}
                </td>
                <td className="px-4 py-4 text-sand">{r.guest}</td>
                <td className="px-4 py-4">{r.residence}</td>
                <td className="px-4 py-4">{r.arrival}</td>
                <td className="px-4 py-4 tabular-nums">{r.nights}</td>
                <td className="px-4 py-4 tabular-nums text-sand">
                  {formatCurrency(r.value)}
                </td>
                <td className="px-4 py-4">
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </TableShell>
        </div>
      </Card>

      {/* Availability heat grid */}
      <AvailabilityGrid />
    </div>
  );
}

function AvailabilityGrid() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const heatClass = (v: number) =>
    v === 0
      ? "bg-emerald-400/15 border-emerald-400/20"
      : v === 1
        ? "bg-gold/15 border-gold/20"
        : v === 2
          ? "bg-gold/35 border-gold/30"
          : "bg-gold/60 border-gold/50";
  const labels = ["Available", "Light", "Busy", "Full"];
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>Availability</Eyebrow>
          <h3 className="mt-2 font-serif text-2xl font-light text-sand">
            Next 14 days · by residence
          </h3>
        </div>
        <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.14em] text-sand/50">
          {labels.map((l, i) => (
            <span key={l} className="flex items-center gap-1.5">
              <span
                className={cn("h-3 w-3 rounded-sm border", heatClass(i))}
              />
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <div className="min-w-[720px]">
          {/* Day header */}
          <div className="grid grid-cols-[180px_repeat(14,1fr)] gap-1.5">
            <span />
            {days.map((d) => (
              <span
                key={d}
                className="text-center font-sans text-[10px] tabular-nums text-sand/35"
              >
                {d}
              </span>
            ))}
          </div>
          {/* Rows */}
          <div className="mt-2 space-y-1.5">
            {HEAT_ROWS.map((row, ri) => (
              <div
                key={row}
                className="grid grid-cols-[180px_repeat(14,1fr)] items-center gap-1.5"
              >
                <span className="truncate pr-3 font-sans text-xs font-light text-sand/70">
                  {row}
                </span>
                {HEAT_DATA[ri].map((v, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: EASE,
                      delay: (ri * 14 + ci) * 0.005,
                    }}
                    title={`${row} · day ${ci + 1} · ${labels[v]}`}
                    className={cn(
                      "h-7 rounded-sm border",
                      heatClass(v)
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function SectionScaffold({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between p-6">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="mt-2 font-serif text-2xl font-light text-sand">
            {title}
          </h3>
        </div>
      </div>
      <div className="px-2 pb-2">{children}</div>
    </Card>
  );
}

function ReservationsPanel() {
  return (
    <SectionScaffold eyebrow="Bookings" title="All reservations">
      <TableShell
        head={["Code", "Guest", "Residence", "Arrival", "Nights", "Value", "Status"]}
      >
        {[...RESERVATIONS, ...RESERVATIONS.slice(0, 2)].map((r, i) => (
          <tr key={`${r.code}-${i}`} className="transition-colors hover:bg-white/[0.03]">
            <td className="px-4 py-4 font-mono text-xs text-gold/80">{r.code}</td>
            <td className="px-4 py-4 text-sand">{r.guest}</td>
            <td className="px-4 py-4">{r.residence}</td>
            <td className="px-4 py-4">{r.arrival}</td>
            <td className="px-4 py-4 tabular-nums">{r.nights}</td>
            <td className="px-4 py-4 tabular-nums text-sand">
              {formatCurrency(r.value)}
            </td>
            <td className="px-4 py-4">
              <StatusPill status={r.status} />
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

function GuestsPanel() {
  return (
    <SectionScaffold eyebrow="CRM" title="Guest directory">
      <TableShell head={["Guest", "Origin", "Tier", "Stays", "Lifetime value"]}>
        {GUESTS.map((g) => (
          <tr key={g.name} className="transition-colors hover:bg-white/[0.03]">
            <td className="px-4 py-4 text-sand">{g.name}</td>
            <td className="px-4 py-4">{g.origin}</td>
            <td className="px-4 py-4">
              <span className="font-sans text-xs uppercase tracking-[0.14em] text-gold">
                {g.tier}
              </span>
            </td>
            <td className="px-4 py-4 tabular-nums">{g.stays}</td>
            <td className="px-4 py-4 tabular-nums text-sand">
              {formatCurrency(g.lifetime)}
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

function PaymentsPanel() {
  const settled = PAYMENTS.filter((p) => p.status === "Settled").reduce(
    (s, p) => s + p.amount,
    0
  );
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
            Settled · this week
          </p>
          <p className="mt-3 font-serif text-3xl font-light tabular-nums text-sand">
            {formatCurrency(settled)}
          </p>
        </Card>
        <Card>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
            Pending
          </p>
          <p className="mt-3 font-serif text-3xl font-light tabular-nums text-sand">
            {formatCurrency(34000)}
          </p>
        </Card>
        <Card>
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
            Refunded
          </p>
          <p className="mt-3 font-serif text-3xl font-light tabular-nums text-sand">
            {formatCurrency(3225)}
          </p>
        </Card>
      </div>
      <SectionScaffold eyebrow="Ledger" title="Recent payments">
        <TableShell head={["Reference", "Guest", "Method", "Date", "Amount", "Status"]}>
          {PAYMENTS.map((p) => (
            <tr key={p.ref} className="transition-colors hover:bg-white/[0.03]">
              <td className="px-4 py-4 font-mono text-xs text-gold/80">{p.ref}</td>
              <td className="px-4 py-4 text-sand">{p.guest}</td>
              <td className="px-4 py-4">{p.method}</td>
              <td className="px-4 py-4">{p.date}</td>
              <td className="px-4 py-4 tabular-nums text-sand">
                {formatCurrency(p.amount)}
              </td>
              <td className="px-4 py-4">
                <StatusPill status={p.status} />
              </td>
            </tr>
          ))}
        </TableShell>
      </SectionScaffold>
    </div>
  );
}

function AvailabilityPanel() {
  return (
    <div className="space-y-6">
      <AvailabilityGrid />
      <SectionScaffold eyebrow="Inventory" title="Rate & availability by type">
        <TableShell head={["Residence", "Category", "Units", "Nightly rate", "Status"]}>
          {ROOM_TYPES.map((r) => (
            <tr key={r.name} className="transition-colors hover:bg-white/[0.03]">
              <td className="px-4 py-4 text-sand">{r.name}</td>
              <td className="px-4 py-4">{r.category}</td>
              <td className="px-4 py-4 tabular-nums">{r.units}</td>
              <td className="px-4 py-4 tabular-nums text-sand">
                {formatCurrency(r.rate)}
              </td>
              <td className="px-4 py-4">
                <StatusPill status={r.status} />
              </td>
            </tr>
          ))}
        </TableShell>
      </SectionScaffold>
    </div>
  );
}

function RoomsPanel() {
  return (
    <SectionScaffold eyebrow="CMS" title="Residences">
      <TableShell head={["Residence", "Category", "Units", "Nightly rate", "Status"]}>
        {ROOM_TYPES.map((r) => (
          <tr key={r.name} className="transition-colors hover:bg-white/[0.03]">
            <td className="px-4 py-4 text-sand">{r.name}</td>
            <td className="px-4 py-4">{r.category}</td>
            <td className="px-4 py-4 tabular-nums">{r.units}</td>
            <td className="px-4 py-4 tabular-nums text-sand">
              {formatCurrency(r.rate)}
            </td>
            <td className="px-4 py-4">
              <StatusPill status={r.status} />
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

function GalleryPanel() {
  return (
    <SectionScaffold eyebrow="Media" title="Gallery assets">
      <TableShell head={["Asset", "Category", "Status"]}>
        {GALLERY_ASSETS.map((a) => (
          <tr key={a.title} className="transition-colors hover:bg-white/[0.03]">
            <td className="flex items-center gap-3 px-4 py-4 text-sand">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-white/10 bg-white/5">
                <ImageIcon className="h-4 w-4 text-gold/70" strokeWidth={1.5} />
              </span>
              {a.title}
            </td>
            <td className="px-4 py-4">{a.category}</td>
            <td className="px-4 py-4">
              <StatusPill status={a.status} />
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

function TestimonialsPanel() {
  return (
    <SectionScaffold eyebrow="Reputation" title="Guest testimonials">
      <TableShell head={["Author", "Origin", "Rating", "Status"]}>
        {TESTIMONIAL_ROWS.map((t) => (
          <tr key={t.author} className="transition-colors hover:bg-white/[0.03]">
            <td className="px-4 py-4 text-sand">{t.author}</td>
            <td className="px-4 py-4">{t.origin}</td>
            <td className="px-4 py-4 text-gold">{"★".repeat(t.rating)}</td>
            <td className="px-4 py-4">
              <StatusPill status={t.status} />
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

function OffersPanel() {
  return (
    <SectionScaffold eyebrow="Marketing" title="Offers & journeys">
      <TableShell head={["Offer", "Segment", "Redemptions", "Status"]}>
        {OFFER_ROWS.map((o) => (
          <tr key={o.title} className="transition-colors hover:bg-white/[0.03]">
            <td className="px-4 py-4 text-sand">{o.title}</td>
            <td className="px-4 py-4">{o.tag}</td>
            <td className="px-4 py-4 tabular-nums">{o.redemptions}</td>
            <td className="px-4 py-4">
              <StatusPill status={o.status} />
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

function BlogPanel() {
  return (
    <SectionScaffold eyebrow="Editorial" title="The Journal">
      <TableShell head={["Title", "Category", "Date", "Status"]}>
        {BLOG_ROWS.map((b) => (
          <tr key={b.title} className="transition-colors hover:bg-white/[0.03]">
            <td className="flex items-center gap-3 px-4 py-4 text-sand">
              <Sparkles className="h-3.5 w-3.5 text-gold/70" strokeWidth={1.5} />
              {b.title}
            </td>
            <td className="px-4 py-4">{b.category}</td>
            <td className="px-4 py-4">{b.date}</td>
            <td className="px-4 py-4">
              <StatusPill status={b.status} />
            </td>
          </tr>
        ))}
      </TableShell>
    </SectionScaffold>
  );
}

/* ================================================================== */
/*  Root                                                               */
/* ================================================================== */

export function AdminDashboard() {
  const [section, setSection] = useState<SectionId>("overview");
  const active = NAV.find((n) => n.id === section)!;

  return (
    <div className="vignette relative min-h-[100svh] px-4 pb-24 pt-32 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[100rem]">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Estate Console</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl font-light leading-[1.02] tracking-[-0.01em] text-sand md:text-6xl">
              AURELIA Operations
            </h1>
            <p className="mt-3 font-sans text-sm font-light text-sand/55">
              Maré Séraphine · Tuesday, 2 July 2026 · 34 residences
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="glass flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5">
              <Search className="h-4 w-4 text-sand/40" strokeWidth={1.5} />
              <input
                placeholder="Search reservations, guests…"
                className="w-40 bg-transparent font-sans text-sm font-light text-sand outline-none placeholder:text-sand/35 md:w-56"
              />
            </label>
            <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-gold-gradient font-serif text-sm text-ink sm:flex">
              LM
            </span>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {NAV.map((n) => {
                const isActive = n.id === section;
                return (
                  <button
                    key={n.id}
                    onClick={() => setSection(n.id)}
                    className={cn(
                      "group relative flex flex-none items-center gap-3 rounded-xl px-4 py-3 font-sans text-[13px] tracking-wide transition-colors",
                      isActive ? "text-sand" : "text-sand/50 hover:text-sand/80"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="admin-nav"
                        className="glass absolute inset-0 rounded-xl border border-gold/25"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    <Icon
                      as={n.icon}
                      className={cn(
                        "relative z-10 h-4 w-4",
                        isActive ? "text-gold" : "text-sand/40"
                      )}
                      strokeWidth={1.5}
                    />
                    <span className="relative z-10 whitespace-nowrap">
                      {n.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <section className="min-w-0">
            <div className="mb-6 flex items-center gap-3">
              <Icon as={active.icon} className="h-4 w-4 text-gold" strokeWidth={1.5} />
              <h2 className="font-sans text-xs uppercase tracking-[0.28em] text-sand/60">
                {active.label}
              </h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                {section === "overview" && <OverviewPanel />}
                {section === "reservations" && <ReservationsPanel />}
                {section === "guests" && <GuestsPanel />}
                {section === "payments" && <PaymentsPanel />}
                {section === "availability" && <AvailabilityPanel />}
                {section === "rooms" && <RoomsPanel />}
                {section === "gallery" && <GalleryPanel />}
                {section === "testimonials" && <TestimonialsPanel />}
                {section === "offers" && <OffersPanel />}
                {section === "blog" && <BlogPanel />}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
