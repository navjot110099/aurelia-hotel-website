"use client";

import { createElement, useState } from "react";
import type { LucideProps } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  Gift,
  Heart,
  LayoutGrid,
  MapPin,
  Plane,
  Receipt,
  Sparkles,
  User,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn, formatCurrency } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

type TabId =
  | "overview"
  | "upcoming"
  | "past"
  | "invoices"
  | "rewards"
  | "wishlist"
  | "profile"
  | "notifications";

type Tab = { id: TabId; label: string; icon: React.ElementType };

type Stay = {
  id: string;
  residence: string;
  confirmation: string;
  arrival: string;
  departure: string;
  nights: number;
  guests: number;
  status: "Confirmed" | "Completed";
  image: string;
};

type ItineraryItem = { time: string; day: string; title: string; note: string };
type Invoice = {
  id: string;
  reference: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Due" | "Deposit";
};
type WishItem = { title: string; kind: string; note: string; image: string };
type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  icon: React.ElementType;
};

/* ================================================================== */
/*  Mock data — fictional guest Mr. Julien Deveraux                    */
/* ================================================================== */

const GUEST = {
  name: "Julien Deveraux",
  salutation: "Mr.",
  member: "AURELIA Circle · Founding Member",
  memberSince: 2019,
  id: "AUR-0007-JD",
  email: "j.deveraux@maisondeveraux.com",
  phone: "+33 6 12 44 90 21",
  city: "Paris, France",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
} as const;

const TABS: Tab[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "upcoming", label: "Upcoming", icon: CalendarDays },
  { id: "past", label: "Past Stays", icon: Anchor },
  { id: "invoices", label: "Invoices", icon: Receipt },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const UPCOMING: Stay = {
  id: "up-1",
  residence: "Coralline Signature Suite",
  confirmation: "AUR-2026-8841",
  arrival: "18 September 2026",
  departure: "25 September 2026",
  nights: 7,
  guests: 2,
  status: "Confirmed",
  image:
    "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=80",
};

const ITINERARY: ItineraryItem[] = [
  {
    day: "Thu · 18 Sep",
    time: "13:20",
    title: "Seaplane transfer from Faa'a",
    note: "Private lounge greeting · 35-minute flight to Aurelia lagoon.",
  },
  {
    day: "Thu · 18 Sep",
    time: "19:30",
    title: "Welcome dinner at Coralline Beach Club",
    note: "Reserved beach table · cellar rosé on arrival.",
  },
  {
    day: "Sat · 20 Sep",
    time: "18:30",
    title: "Nine-course tasting at Maré",
    note: "Two Michelin stars · Chef Elise Moreau · table for two.",
  },
  {
    day: "Mon · 22 Sep",
    time: "09:00",
    title: "The Living Reef — guided dive",
    note: "With the resident marine biologist · gear fitted the evening prior.",
  },
  {
    day: "Wed · 24 Sep",
    time: "16:30",
    title: "Sunset cruise aboard the 1962 schooner",
    note: "Cellar wines · canapés · return by starlight.",
  },
];

const PAST_STAYS: Stay[] = [
  {
    id: "past-1",
    residence: "Aurora Presidential Suite",
    confirmation: "AUR-2025-6120",
    arrival: "02 February 2025",
    departure: "09 February 2025",
    nights: 7,
    guests: 2,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "past-2",
    residence: "Palmwood Pool Villa",
    confirmation: "AUR-2024-4477",
    arrival: "14 July 2024",
    departure: "21 July 2024",
    nights: 7,
    guests: 4,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "past-3",
    residence: "Ocean Lagoon Room",
    confirmation: "AUR-2023-2093",
    arrival: "20 November 2023",
    departure: "26 November 2023",
    nights: 6,
    guests: 2,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
  },
];

const INVOICES: Invoice[] = [
  {
    id: "inv-1",
    reference: "INV-2026-8841-A",
    date: "12 Jun 2026",
    description: "Coralline Signature Suite · deposit (50%)",
    amount: 14700,
    status: "Deposit",
  },
  {
    id: "inv-2",
    reference: "INV-2026-8841-B",
    date: "20 Jul 2026",
    description: "Coralline Signature Suite · balance due 20 Jul",
    amount: 14700,
    status: "Due",
  },
  {
    id: "inv-3",
    reference: "INV-2025-6120",
    date: "10 Feb 2025",
    description: "Aurora Presidential Suite · dining, spa & experiences",
    amount: 61840,
    status: "Paid",
  },
  {
    id: "inv-4",
    reference: "INV-2024-4477",
    date: "22 Jul 2024",
    description: "Palmwood Pool Villa · full settlement",
    amount: 79320,
    status: "Paid",
  },
  {
    id: "inv-5",
    reference: "INV-2023-2093",
    date: "27 Nov 2023",
    description: "Ocean Lagoon Room · full settlement",
    amount: 18960,
    status: "Paid",
  },
];

const WISHLIST: WishItem[] = [
  {
    title: "The Aurelia — Private Yacht",
    kind: "On the Water",
    note: "A day charter to the outer atolls with dinner beneath the mast.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Helicopter Journey · Sandbar Landing",
    kind: "In the Air",
    note: "Champagne on a sandbar that appears only at low tide.",
    image:
      "https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "The Aurelia Ritual",
    kind: "Wellness",
    note: "Monoï ceremony & sound bath in the overwater float pavilion.",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "The Cellar · Sommelier Dinner",
    kind: "Dining",
    note: "A vaulted table for twelve carved into the coral bedrock.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Your itinerary is ready",
    body: "The concierge has drafted your September itinerary. Review and confirm your experiences.",
    time: "2 hours ago",
    unread: true,
    icon: CalendarDays,
  },
  {
    id: "n2",
    title: "Balance due 20 July",
    body: "The remaining balance for your Coralline Suite stay is due in 18 days.",
    time: "Yesterday",
    unread: true,
    icon: Receipt,
  },
  {
    id: "n3",
    title: "You have reached Sapphire tier",
    body: "A private beach dinner and a suite upgrade await on your next voyage.",
    time: "3 days ago",
    unread: false,
    icon: Gift,
  },
  {
    id: "n4",
    title: "Chef Moreau's autumn menu",
    body: "The new nine-course tasting at Maré draws on the first cool-season catch.",
    time: "1 week ago",
    unread: false,
    icon: Sparkles,
  },
];

const REWARDS = {
  tier: "Sapphire",
  nextTier: "Onyx",
  points: 48200,
  toNext: 6800,
  nightsThisYear: 14,
  lifetimeNights: 52,
  perks: [
    "Guaranteed suite upgrade, subject to availability",
    "Complimentary fifth night on stays of five or more",
    "Priority reservations at Maré & The Cellar",
    "Annual private beach dinner for two",
  ],
} as const;

/* ================================================================== */
/*  Small shared UI                                                    */
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
        "glass rounded-2xl border border-white/10 p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Paid" || status === "Confirmed" || status === "Completed"
      ? "border-gold/30 bg-gold/10 text-gold"
      : status === "Due"
        ? "border-rose-300/30 bg-rose-300/10 text-rose-200"
        : "border-sand/20 bg-white/5 text-sand/70";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.16em]",
        tone
      )}
    >
      {status}
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

function StayCard({ stay, primary = false }: { stay: Stay; primary?: boolean }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
          <Image
            src={stay.image}
            alt={stay.residence}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent md:bg-gradient-to-r" />
          <div className="absolute left-5 top-5">
            <StatusPill status={stay.status} />
          </div>
        </div>
        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            {primary && <Eyebrow>Your next voyage</Eyebrow>}
            <h3 className="mt-3 font-serif text-2xl font-light text-sand md:text-3xl">
              {stay.residence}
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-4 font-sans text-sm font-light text-sand/70">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-sand/40">
                  Arrival
                </p>
                <p className="mt-1 text-sand">{stay.arrival}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-sand/40">
                  Departure
                </p>
                <p className="mt-1 text-sand">{stay.departure}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-sand/40">
                  Nights · Guests
                </p>
                <p className="mt-1 text-sand">
                  {stay.nights} · {stay.guests}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-sand/40">
                  Confirmation
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-gold">
                  {stay.confirmation}
                </p>
              </div>
            </div>
          </div>
          {primary && (
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/concierge" variant="gold" size="sm" magnetic={false}>
                Message Concierge
              </Button>
              <Button href="/booking" variant="outline" size="sm" magnetic={false}>
                Modify Stay
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function OverviewPanel({ onNavigate }: { onNavigate: (t: TabId) => void }) {
  const daysToArrival = 78;
  const stats = [
    { label: "Days to arrival", value: daysToArrival, icon: Clock },
    { label: "Lifetime nights", value: REWARDS.lifetimeNights, icon: Anchor },
    { label: "Circle points", value: REWARDS.points.toLocaleString(), icon: Gift },
    { label: "Saved experiences", value: WISHLIST.length, icon: Heart },
  ];
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <Icon as={s.icon} className="h-4 w-4 text-gold" strokeWidth={1.5} />
            </div>
            <p className="mt-6 font-serif text-3xl font-light tabular-nums text-sand">
              {s.value}
            </p>
            <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
              {s.label}
            </p>
          </Card>
        ))}
      </div>

      <StayCard stay={UPCOMING} primary />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <Eyebrow>AURELIA Circle</Eyebrow>
          <h3 className="mt-3 font-serif text-2xl font-light text-sand">
            {REWARDS.tier} tier
          </h3>
          <TierProgress />
          <button
            onClick={() => onNavigate("rewards")}
            className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light"
          >
            View rewards <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </Card>

        <Card>
          <Eyebrow>Latest</Eyebrow>
          <h3 className="mt-3 font-serif text-2xl font-light text-sand">
            Notifications
          </h3>
          <ul className="mt-5 space-y-4">
            {NOTIFICATIONS.slice(0, 3).map((n) => (
              <li key={n.id} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Icon as={n.icon} className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-sans text-sm text-sand">{n.title}</p>
                  <p className="font-sans text-xs font-light text-sand/50">
                    {n.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onNavigate("notifications")}
            className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light"
          >
            All notifications <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </Card>
      </div>
    </div>
  );
}

function UpcomingPanel() {
  return (
    <div className="space-y-8">
      <StayCard stay={UPCOMING} primary />
      <Card>
        <div className="flex items-center gap-3">
          <Plane className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <Eyebrow>Your itinerary</Eyebrow>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-light text-sand">
          Seven days on Maré Séraphine
        </h3>
        <ol className="mt-8 space-y-0">
          {ITINERARY.map((it, i) => (
            <li key={i} className="relative flex gap-6 pb-8 last:pb-0">
              <div className="flex flex-none flex-col items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_0_4px_rgba(201,169,97,0.12)]" />
                {i < ITINERARY.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-gradient-to-b from-gold/40 to-white/5" />
                )}
              </div>
              <div className="-mt-1 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-gold/70">
                    {it.day}
                  </span>
                  <span className="font-mono text-xs text-sand/50">{it.time}</span>
                </div>
                <p className="mt-1.5 font-serif text-xl font-light text-sand">
                  {it.title}
                </p>
                <p className="mt-1 font-sans text-sm font-light text-sand/55">
                  {it.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function PastPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PAST_STAYS.map((s) => (
        <Card key={s.id} className="overflow-hidden p-0">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={s.image}
              alt={s.residence}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6">
              <StatusPill status={s.status} />
              <h3 className="mt-3 font-serif text-2xl font-light text-sand">
                {s.residence}
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-6 font-sans text-sm font-light text-sand/70">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-sand/40">
                Dates
              </p>
              <p className="mt-1 text-sand">
                {s.arrival} — {s.departure}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.16em] text-sand/40">
                Nights
              </p>
              <p className="mt-1 text-sand">{s.nights}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function InvoicesPanel() {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between border-b border-white/10 p-6 md:p-8">
        <div>
          <Eyebrow>Billing</Eyebrow>
          <h3 className="mt-2 font-serif text-2xl font-light text-sand">
            Invoices &amp; statements
          </h3>
        </div>
        <Receipt className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
      </div>
      <div className="divide-y divide-white/5">
        {INVOICES.map((inv) => (
          <div
            key={inv.id}
            className="group flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between md:px-8"
          >
            <div className="min-w-0">
              <p className="font-sans text-sm text-sand">{inv.description}</p>
              <p className="mt-1 font-sans text-xs font-light text-sand/45">
                <span className="font-mono text-gold/70">{inv.reference}</span>
                {"  ·  "}
                {inv.date}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <StatusPill status={inv.status} />
              <span className="w-28 text-right font-serif text-xl font-light tabular-nums text-sand">
                {formatCurrency(inv.amount)}
              </span>
              <button
                type="button"
                aria-label={`Download ${inv.reference}`}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/10 text-sand/60 transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Download className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TierProgress() {
  const total = REWARDS.points + REWARDS.toNext;
  const pct = Math.round((REWARDS.points / total) * 100);
  return (
    <div className="mt-6">
      <div className="flex items-end justify-between">
        <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-sand/50">
          {REWARDS.tier}
        </span>
        <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-sand/50">
          {REWARDS.nextTier}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gold-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>
      <p className="mt-3 font-sans text-sm font-light text-sand/60">
        <span className="text-sand">{REWARDS.toNext.toLocaleString()}</span> points
        to {REWARDS.nextTier} · {REWARDS.points.toLocaleString()} of{" "}
        {total.toLocaleString()}
      </p>
    </div>
  );
}

function RewardsPanel() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow>AURELIA Circle</Eyebrow>
            <h3 className="mt-3 font-serif text-4xl font-light text-sand md:text-5xl">
              {REWARDS.tier}
            </h3>
            <p className="mt-2 font-sans text-sm font-light text-sand/55">
              Member since {GUEST.memberSince} · {GUEST.id}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-serif text-5xl font-light tabular-nums text-gold">
              {REWARDS.points.toLocaleString()}
            </p>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-sand/45">
              Circle points
            </p>
          </div>
        </div>
        <div className="mt-8">
          <TierProgress />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <p className="font-serif text-3xl font-light text-sand">
            {REWARDS.nightsThisYear}
          </p>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
            Nights this year
          </p>
        </Card>
        <Card>
          <p className="font-serif text-3xl font-light text-sand">
            {REWARDS.lifetimeNights}
          </p>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
            Lifetime nights
          </p>
        </Card>
        <Card>
          <p className="font-serif text-3xl font-light text-sand">4</p>
          <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-sand/45">
            Residences enjoyed
          </p>
        </Card>
      </div>

      <Card>
        <Eyebrow>Your tier privileges</Eyebrow>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {REWARDS.perks.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 flex-none text-gold"
                strokeWidth={1.5}
              />
              <span className="font-sans text-sm font-light text-sand/70">{p}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function WishlistPanel() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {WISHLIST.map((w) => (
        <Card key={w.title} className="group overflow-hidden p-0">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={w.image}
              alt={w.title}
              fill
              sizes="(max-width: 640px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <button
              type="button"
              aria-label="Remove from wishlist"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink/40 backdrop-blur transition-colors hover:border-gold/60"
            >
              <Heart className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} />
            </button>
            <span className="absolute bottom-4 left-5 font-sans text-[10px] uppercase tracking-[0.18em] text-gold/80">
              {w.kind}
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 p-6">
            <div>
              <h3 className="font-serif text-xl font-light text-sand">{w.title}</h3>
              <p className="mt-1 font-sans text-sm font-light text-sand/55">
                {w.note}
              </p>
            </div>
            <Button
              href="/concierge"
              variant="outline"
              size="sm"
              magnetic={false}
              className="flex-none"
            >
              Arrange
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-sand/45">
        {label}
      </span>
      <input
        defaultValue={value}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-sans text-sm font-light text-sand outline-none transition-colors focus:border-gold/50"
      />
    </label>
  );
}

function ProfilePanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="flex flex-col items-center text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-gold/30">
          <Image
            src={GUEST.avatar}
            alt={GUEST.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
        <h3 className="mt-5 font-serif text-2xl font-light text-sand">
          {GUEST.salutation} {GUEST.name}
        </h3>
        <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-gold/80">
          {REWARDS.tier} · Founding Member
        </p>
        <div className="mt-6 flex items-center gap-2 font-sans text-sm font-light text-sand/55">
          <MapPin className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
          {GUEST.city}
        </div>
        <div className="hairline my-6 w-full" />
        <p className="font-sans text-xs font-light text-sand/45">
          Member ID
          <br />
          <span className="font-mono text-sand/70">{GUEST.id}</span>
        </p>
      </Card>

      <Card>
        <Eyebrow>Profile</Eyebrow>
        <h3 className="mt-2 font-serif text-2xl font-light text-sand">
          Your details
        </h3>
        <form className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Salutation" value={GUEST.salutation} />
          <Field label="Full name" value={GUEST.name} />
          <Field label="Email" value={GUEST.email} full />
          <Field label="Telephone" value={GUEST.phone} />
          <Field label="City" value={GUEST.city} />
          <Field
            label="Dietary notes"
            value="Pescatarian · no shellfish"
            full
          />
          <Field
            label="Preferences"
            value="High floor · firm pillows · still water · sunrise yoga"
            full
          />
        </form>
        <div className="mt-8 flex gap-3">
          <Button variant="gold" size="sm" magnetic={false}>
            Save changes
          </Button>
          <Button variant="ghost" size="sm" magnetic={false}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between border-b border-white/10 p-6 md:p-8">
        <div>
          <Eyebrow>Inbox</Eyebrow>
          <h3 className="mt-2 font-serif text-2xl font-light text-sand">
            Notifications
          </h3>
        </div>
        <Bell className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
      </div>
      <ul className="divide-y divide-white/5">
        {NOTIFICATIONS.map((n) => (
          <li
            key={n.id}
            className={cn(
              "flex gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] md:px-8",
              n.unread && "bg-gold/[0.04]"
            )}
          >
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Icon as={n.icon} className="h-4 w-4 text-gold" strokeWidth={1.5} />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-sans text-sm text-sand">{n.title}</p>
                {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
              </div>
              <p className="mt-1 font-sans text-sm font-light text-sand/55">
                {n.body}
              </p>
              <p className="mt-1.5 font-sans text-xs font-light text-sand/35">
                {n.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ================================================================== */
/*  Root                                                               */
/* ================================================================== */

export function GuestDashboard() {
  const [tab, setTab] = useState<TabId>("overview");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <main
      id="main"
      className="vignette relative min-h-[100svh] px-4 pb-24 pt-32 md:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[100rem]">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>My Journey</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl font-light leading-[1.02] tracking-[-0.01em] text-sand md:text-6xl">
              Good evening, {GUEST.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 flex items-center gap-2 font-sans text-sm font-light text-sand/55">
              <Waves className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {GUEST.member}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold/30">
              <Image
                src={GUEST.avatar}
                alt={GUEST.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <Button href="/booking" variant="gold" size="sm">
              Plan a Stay
            </Button>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {TABS.map((t) => {
                const isActive = t.id === tab;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "group relative flex flex-none items-center gap-3 rounded-xl px-4 py-3 font-sans text-[13px] tracking-wide transition-colors",
                      isActive
                        ? "text-sand"
                        : "text-sand/50 hover:text-sand/80"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="guest-tab"
                        className="glass absolute inset-0 rounded-xl border border-gold/25"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    <Icon
                      as={t.icon}
                      className={cn(
                        "relative z-10 h-4 w-4",
                        isActive ? "text-gold" : "text-sand/40"
                      )}
                      strokeWidth={1.5}
                    />
                    <span className="relative z-10 whitespace-nowrap">
                      {t.label}
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
                key={tab}
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
              >
                {tab === "overview" && <OverviewPanel onNavigate={setTab} />}
                {tab === "upcoming" && <UpcomingPanel />}
                {tab === "past" && <PastPanel />}
                {tab === "invoices" && <InvoicesPanel />}
                {tab === "rewards" && <RewardsPanel />}
                {tab === "wishlist" && <WishlistPanel />}
                {tab === "profile" && <ProfilePanel />}
                {tab === "notifications" && <NotificationsPanel />}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}
