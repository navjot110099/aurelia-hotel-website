"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  Mic,
  Sparkles,
  BedDouble,
  UtensilsCrossed,
  Flower2,
  CloudSun,
  Compass,
  Plane,
  ArrowRight,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import {
  BRAND,
  ROOMS,
  RESTAURANTS,
  SPA_TREATMENTS,
  EXPERIENCES,
} from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Recommendation cards                                               */
/* ------------------------------------------------------------------ */

type RoomCard = { type: "room"; slug: string };
type DiningCard = { type: "dining"; id: string };
type SpaCard = { type: "spa"; name: string };
type ExperienceCard = { type: "experience"; id: string };
type Card = RoomCard | DiningCard | SpaCard | ExperienceCard;

type Message = {
  id: string;
  role: "guest" | "concierge";
  text: string;
  cards?: Card[];
};

/* ------------------------------------------------------------------ */
/*  Canned intelligence — keyword → curated reply                      */
/* ------------------------------------------------------------------ */

type Reply = { text: string; cards?: Card[] };

function respond(input: string): Reply {
  const q = input.toLowerCase();

  const has = (...words: string[]) => words.some((w) => q.includes(w));

  // Dining
  if (has("dine", "dining", "restaurant", "eat", "food", "michelin", "maré", "mare", "chef", "menu", "dinner", "cuisine")) {
    return {
      text: "Dining at Aurelia is its own reason to travel. Our flagship, Maré, holds two Michelin stars — Chef Elise Moreau composes a nine-course journey through the reef, the garden and the deep ocean, served at the water's edge as the sun falls. For something barefoot, Coralline Beach Club serves wood-fired catch and cellar rosé on the sand all day. And beneath the island, The Cellar keeps twelve thousand bottles for private sommelier dinners. Shall I reserve a table, or arrange the Chef's Table at the pass?",
      cards: [
        { type: "dining", id: "mare" },
        { type: "dining", id: "coralline" },
      ],
    };
  }

  // Spa / wellness
  if (has("spa", "wellness", "massage", "treatment", "relax", "yoga", "ritual", "facial", "unwind")) {
    return {
      text: `Our overwater spa floats above the lagoon, and I would begin with The Aurelia Ritual — a 150-minute monoï ceremony, warm basalt work and a sound bath in the float pavilion (${formatCurrency(SPA_TREATMENTS[0].price)}). If you prefer the deep and the slow, the Deep Ocean Massage is scored to the movement of the tide. Sunrise yoga on the eastern deck is a beautiful way to meet the island each morning. Would you like me to hold a treatment for you?`,
      cards: [
        { type: "spa", name: SPA_TREATMENTS[0].name },
        { type: "spa", name: SPA_TREATMENTS[2].name },
      ],
    };
  }

  // Rooms
  if (has("room", "villa", "suite", "residence", "stay", "accommodation", "book", "sleep", "bedroom", "where")) {
    return {
      text: `We keep thirty-four residences on the island, each with a dedicated butler and its own stretch of sea. If this is your first visit, the Ocean Lagoon Room — on stilts above the turquoise shallows, with a ladder into the lagoon — is a perfect introduction from ${formatCurrency(
        ROOMS[0].price
      )} a night. For celebrations, the Coralline Signature Suite gives you a glass-floor lounge above the coral garden. And for those who want the island entirely, The Celestia Residence is a private beachfront estate with its own chef and captain. Which mood are you travelling in?`,
      cards: [
        { type: "room", slug: "ocean-lagoon-room" },
        { type: "room", slug: "coralline-signature-suite" },
      ],
    };
  }

  // Weather
  if (has("weather", "climate", "temperature", "rain", "season", "when to", "best time", "hot", "warm")) {
    return {
      text: "Maré Séraphine sits in the South Pacific, where the air rarely leaves the mid-to-high twenties Celsius. Today the reserve is bright and still — 28°C, a light easterly across the lagoon, water at a swimmable 27°C, and a sunset forecast at 6:14 that should turn the sky the colour of the resort's name. Our dry, luminous season runs May through October; the greener months bring warm afternoon showers that pass quickly and leave the reef gleaming. Would you like me to note a sunset cruise while the evenings are this clear?",
      cards: [{ type: "experience", id: "cruise" }],
    };
  }

  // Activities / experiences
  if (has("activit", "experience", "do", "adventure", "reef", "dive", "snorkel", "yacht", "sail", "helicopter", "excursion", "fun", "explore")) {
    return {
      text: "The days here can be as still or as spirited as you wish. On the water, The Aurelia — our 42-metre sloop — is chartered by the day for the outer atolls and secret anchorages. Beneath the surface, our resident marine biologist guides private dives through one of the Pacific's last pristine coral gardens. And in the air, a helicopter lifts from the island's helipad for volcano ridges and a champagne landing on a sandbar that appears only at low tide. Shall I curate a full day for you?",
      cards: [
        { type: "experience", id: "yacht" },
        { type: "experience", id: "reef" },
        { type: "experience", id: "helicopter" },
      ],
    };
  }

  // Travel / arrival
  if (has("arrive", "arrival", "travel", "get there", "airport", "seaplane", "jet", "fly", "transfer", "how do i get", "directions", "reach")) {
    return {
      text: "Reaching us is the first pleasure of the journey. Guests fly into Faa'a International, where our team meets you privately away from the crowd. From there, a 35-minute seaplane traces the reef to Aurelia's own lagoon — or, if you prefer, the island's helicopter. We can also arrange private-jet handling and a yacht crossing through the concierge. May I ask which airport you'll be arriving from, so I can prepare your transfer?",
      cards: [{ type: "experience", id: "helicopter" }],
    };
  }

  // Honeymoon / romance / occasion
  if (has("honeymoon", "romance", "romantic", "anniversary", "propose", "proposal", "wedding", "celebrate", "birthday")) {
    return {
      text: "Few places were made for a celebration quite like this one. For honeymooners we compose an overwater residence, a daily spa ritual for two, a floating breakfast brought to your deck and a private dinner set on the sand beneath the stars. For a proposal, I can arrange the schooner at sunset with the ring chilled in cellar champagne — discreetly, entirely to your script. Tell me the occasion, and I'll begin quietly in the background.",
      cards: [
        { type: "room", slug: "coralline-signature-suite" },
        { type: "spa", name: SPA_TREATMENTS[0].name },
      ],
    };
  }

  // Children / family
  if (has("child", "kid", "family", "baby", "nanny", "toddler")) {
    return {
      text: "Aurelia welcomes families in our villas, with a discreet children's atelier, tailored experiences on the reef and dedicated nannies on request. The Palmwood Pool Villa — two bedrooms wrapped around a 20-metre pool — is a favourite for families who want the island at their own pace. Do note that Maré and the overwater spa are reserved for guests sixteen and over after 18:00, so the evenings stay serene. Shall I suggest a villa?",
      cards: [{ type: "room", slug: "palmwood-pool-villa" }],
    };
  }

  // Price / cost
  if (has("price", "cost", "how much", "rate", "budget", "expensive", "pricing")) {
    return {
      text: `Our residences begin at ${formatCurrency(
        ROOMS[0].price
      )} a night for the Ocean Lagoon Room, rising to The Celestia Residence — a private estate with its own team — at ${formatCurrency(
        24000
      )}. Every rate includes your butler, daily breakfast, sunset canapés, non-motorised watersports and return island transfers; dining, spa and curated experiences are enjoyed as you wish. Would you like me to open the reservation, so you can see a live total for your dates?`,
      cards: [
        { type: "room", slug: "ocean-lagoon-room" },
        { type: "room", slug: "aurora-presidential-suite" },
      ],
    };
  }

  // Greetings
  if (has("hello", "hi ", "hey", "bonjour", "good morning", "good evening") || q.trim() === "hi") {
    return {
      text: "Good day, and welcome to Aurelia. I'm your concierge — here to arrange anything from a table at Maré to a sunset on the water, day or night. What may I prepare for you?",
    };
  }

  // Thanks
  if (has("thank", "merci", "cheers", "appreciate")) {
    return {
      text: "It is entirely my pleasure. I'll remain here whenever you need me — a wish barely spoken is a wish already in motion at Aurelia. Is there anything else I might arrange?",
    };
  }

  // Fallback — graceful, on-brand
  return {
    text: "I'd be delighted to help with that. I can speak to our residences, the two-Michelin-star kitchen at Maré, the overwater spa, experiences on and beneath the water, the day's weather or how to arrive. Tell me a little more about what you have in mind, and I'll compose the perfect answer.",
    cards: [
      { type: "room", slug: "ocean-lagoon-room" },
      { type: "dining", id: "mare" },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Suggested prompt chips                                             */
/* ------------------------------------------------------------------ */

const CHIPS = [
  { label: "Residences", icon: BedDouble, prompt: "Which residence should I choose?" },
  { label: "Dining", icon: UtensilsCrossed, prompt: "Tell me about dining at Maré." },
  { label: "Spa", icon: Flower2, prompt: "What spa treatment do you recommend?" },
  { label: "Weather", icon: CloudSun, prompt: "What's the weather like today?" },
  { label: "Activities", icon: Compass, prompt: "What can we do on the water?" },
  { label: "Travel tips", icon: Plane, prompt: "How do we arrive at Aurelia?" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function ConciergeUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "concierge",
      text: "Welcome to Aurelia. I'm Célestine, your personal concierge for the reserve. Whether you're dreaming, planning or already on your way, I'm here to arrange it — a table at the water's edge, a treatment above the lagoon, a sail at sunset. How may I begin?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const listenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      if (listenTimer.current) clearTimeout(listenTimer.current);
    };
  }, []);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;

    const guestMsg: Message = {
      id: `g-${Date.now()}`,
      role: "guest",
      text,
    };
    setMessages((m) => [...m, guestMsg]);
    setInput("");
    setTyping(true);

    // Considered reply — slightly variable delay for realism.
    const reply = respond(text);
    const delay = 900 + Math.min(text.length * 22, 1400);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: `c-${Date.now()}`,
          role: "concierge",
          text: reply.text,
          cards: reply.cards,
        },
      ]);
    }, delay);
  };

  // Faux voice input — a purely visual mock that "hears" a prompt.
  const toggleListen = () => {
    if (listening) {
      setListening(false);
      if (listenTimer.current) clearTimeout(listenTimer.current);
      return;
    }
    setListening(true);
    listenTimer.current = setTimeout(() => {
      setListening(false);
      const phrase = "Tell me about dining at Maré this evening.";
      setInput(phrase);
    }, 2600);
  };

  return (
    <div className="relative min-h-screen bg-ink pb-16 pt-32 md:pt-40">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-0 h-[36rem] w-[36rem] rounded-full bg-gold/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full bg-sea/20 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col px-6 md:px-10">
        {/* header */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="eyebrow mb-4 flex items-center gap-4 text-gold"
          >
            <span className="h-px w-10 bg-gold" />
            The Concierge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-serif text-4xl font-light leading-[0.95] tracking-[-0.02em] text-sand md:text-6xl"
          >
            A wish, barely spoken.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-sand/60"
          >
            Célestine is always awake, always attentive — ask anything about your
            stay and be answered in an instant, in the language of Aurelia.
          </motion.p>
        </div>

        {/* chat surface */}
        <div className="glass flex h-[62vh] min-h-[30rem] flex-col overflow-hidden rounded-3xl border border-white/10">
          {/* status bar */}
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-ink">
              <Sparkles size={16} />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-lg text-sand">Célestine</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80">
                Online · At your service
              </p>
            </div>
          </div>

          {/* thread */}
          <div
            ref={threadRef}
            className="flex-1 space-y-5 overflow-y-auto px-5 py-6 md:px-7"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} onCardPrompt={send} />
              ))}
            </AnimatePresence>

            {typing && <TypingIndicator />}
          </div>

          {/* input */}
          <div className="border-t border-white/10 px-4 py-4 md:px-6">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border bg-white/[0.03] px-2 py-2 transition-colors duration-300",
                listening ? "border-gold/60" : "border-white/12 focus-within:border-gold/40"
              )}
            >
              <button
                type="button"
                onClick={toggleListen}
                aria-label={listening ? "Stop listening" : "Speak to the concierge"}
                className={cn(
                  "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  listening
                    ? "bg-gold-gradient text-ink"
                    : "text-gold hover:bg-white/5"
                )}
              >
                <Mic size={18} />
                {listening && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-full border border-gold"
                      animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full border border-gold"
                      animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.7,
                      }}
                    />
                  </>
                )}
              </button>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder={
                  listening ? "Listening…" : "Ask Célestine anything about Aurelia…"
                }
                className="flex-1 bg-transparent px-2 font-sans text-sand placeholder:text-sand/35 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => send()}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold transition-all duration-300 hover:shadow-[0_0_50px_-12px_rgba(201,169,97,0.7)] disabled:opacity-30 disabled:shadow-none"
              >
                <Send size={16} />
              </button>
            </div>

            <AnimatePresence>
              {listening && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold"
                >
                  <VoiceWave /> Listening…
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* suggested chips */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-sand/40">
            Suggested
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CHIPS.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.label}
                  onClick={() => send(c.prompt)}
                  disabled={typing}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-sand/70 transition-all duration-300 hover:border-gold/50 hover:text-gold disabled:opacity-40"
                >
                  <Icon size={14} className="text-gold" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-sand/35">
          Prefer a human voice? Reach our atelier on{" "}
          <a href={`tel:${BRAND.phone}`} className="text-gold hover:text-gold-light">
            {BRAND.phone}
          </a>{" "}
          or continue to{" "}
          <Link href="/booking" className="text-gold hover:text-gold-light">
            reserve your stay
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Message bubble                                                     */
/* ------------------------------------------------------------------ */

function MessageBubble({
  message,
  onCardPrompt,
}: {
  message: Message;
  onCardPrompt: (prompt: string) => void;
}) {
  const isGuest = message.role === "guest";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn("flex", isGuest ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[78%]",
          isGuest ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed",
            isGuest
              ? "rounded-br-sm bg-gold-gradient text-ink"
              : "rounded-bl-sm border border-white/10 bg-white/[0.03] text-sand/90"
          )}
        >
          {!isGuest && (
            <span className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-gold/70">
              Célestine
            </span>
          )}
          {message.text}
        </div>

        {message.cards && message.cards.length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {message.cards.map((card, i) => (
              <RecommendationCard key={i} card={card} onPrompt={onCardPrompt} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recommendation cards                                               */
/* ------------------------------------------------------------------ */

function RecommendationCard({
  card,
  onPrompt,
}: {
  card: Card;
  onPrompt: (prompt: string) => void;
}) {
  if (card.type === "room") {
    const room = ROOMS.find((r) => r.slug === card.slug);
    if (!room) return null;
    return (
      <CardShell
        image={room.image}
        alt={room.name}
        badge={room.category}
        title={room.name}
        sub={`${formatCurrency(room.price)} / night · sleeps ${room.guests}`}
        href="/booking"
        cta="Reserve"
      />
    );
  }
  if (card.type === "dining") {
    const r = RESTAURANTS.find((x) => x.id === card.id);
    if (!r) return null;
    return (
      <CardShell
        image={r.image}
        alt={r.name}
        badge={r.stars ? `${r.stars} Michelin ★` : r.cuisine.split(" · ")[0]}
        title={r.name}
        sub={r.hours}
        actionLabel="Ask about this"
        onAction={() => onPrompt(`Tell me more about ${r.name}.`)}
      />
    );
  }
  if (card.type === "spa") {
    const t = SPA_TREATMENTS.find((x) => x.name === card.name);
    if (!t) return null;
    return (
      <CardShell
        image="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80"
        alt={t.name}
        badge="Spa"
        title={t.name}
        sub={`${t.duration} · ${formatCurrency(t.price)}`}
        actionLabel="Ask about this"
        onAction={() => onPrompt(`I'd like to know more about the ${t.name}.`)}
      />
    );
  }
  // experience
  const e = EXPERIENCES.find((x) => x.id === card.id);
  if (!e) return null;
  return (
    <CardShell
      image={e.image}
      alt={e.name}
      badge={e.kind}
      title={e.name}
      sub={e.description.split(".")[0] + "."}
      actionLabel="Ask about this"
      onAction={() => onPrompt(`Tell me more about ${e.name}.`)}
    />
  );
}

function CardShell({
  image,
  alt,
  badge,
  title,
  sub,
  href,
  cta,
  actionLabel,
  onAction,
}: {
  image: string;
  alt: string;
  badge: string;
  title: string;
  sub: string;
  href?: string;
  cta?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 22rem"
          className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-gold backdrop-blur">
          {badge}
        </span>
      </div>
      <div className="p-4">
        <h4 className="font-serif text-lg font-light leading-tight text-sand">
          {title}
        </h4>
        <p className="mt-0.5 text-[11px] text-sand/55">{sub}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gold">
          {href ? cta : actionLabel}
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </>
  );

  const className =
    "group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition-all duration-500 hover:border-gold/40";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onAction} className={className}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing indicator + voice wave                                      */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.03] px-5 py-4">
        <span className="mb-2 block text-[9px] uppercase tracking-[0.22em] text-gold/70">
          Célestine is composing
        </span>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-gold"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function VoiceWave() {
  return (
    <span className="inline-flex items-end gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-gold"
          animate={{ height: [4, 12, 4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
          style={{ height: 4 }}
        />
      ))}
    </span>
  );
}
