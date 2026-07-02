"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { RESTAURANTS, CHEF } from "@/lib/site";
import { SectionHeading, SectionLabel, GoldLine } from "@/components/ui/Primitives";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MenuList, type MenuCourse } from "@/components/dining/MenuList";

/* ------------------------------------------------------------------ */
/*  Intro                                                              */
/* ------------------------------------------------------------------ */

export function DiningIntro() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10">
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionLabel index="01">The Table</SectionLabel>
          <AnimatedText
            as="h2"
            text="Three kitchens, one island, and a larder that never travels."
            className="mt-8 font-serif text-3xl font-light leading-[1.12] text-sand md:text-5xl"
          />
        </div>
        <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <Reveal className="max-w-xl text-base leading-relaxed text-stone-light">
            <p>
              At Aurelia, dinner is drawn from the reef at dawn, the garden by
              noon and the cellar carved beneath the coral. Nothing arrives by
              cargo that could be grown, gathered or caught within sight of the
              island. From a two-Michelin-star tasting at the water&apos;s edge
              to bare feet in the sand at Coralline, every table is set to the
              rhythm of the tide.
            </p>
          </Reveal>
          <div className="mt-10">
            <GoldLine />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Restaurant showcase — alternating full-bleed blocks                */
/* ------------------------------------------------------------------ */

function RestaurantBlock({
  restaurant,
  index,
}: {
  restaurant: (typeof RESTAURANTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const flip = index % 2 === 1;

  return (
    <section
      id={restaurant.id}
      className="relative scroll-mt-24 bg-ink px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-editorial items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div
          ref={ref}
          className={`relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-[5/6] ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="vignette absolute inset-0" />
        </div>

        <div className={flip ? "lg:order-1" : ""}>
          <SectionLabel index={`0${index + 2}`}>{restaurant.cuisine}</SectionLabel>

          <div className="mt-6 flex items-center gap-4">
            <AnimatedText
              as="h2"
              text={restaurant.name}
              className="font-serif text-4xl font-light leading-none text-sand md:text-6xl"
            />
            {restaurant.stars > 0 && (
              <span className="flex items-center gap-1 pt-2">
                {Array.from({ length: restaurant.stars }).map((_, s) => (
                  <Star key={s} size={16} className="fill-gold text-gold" />
                ))}
              </span>
            )}
          </div>

          <Reveal delay={0.1} className="mt-6 max-w-md text-base leading-relaxed text-stone-light">
            <p>{restaurant.description}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold/80">
              {restaurant.hours}
            </p>
          </Reveal>

          <div className="mt-10">
            <Button href="#reserve" variant="outline" cursorLabel="Reserve">
              Reserve a table
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RestaurantShowcase() {
  return (
    <div className="relative">
      {RESTAURANTS.map((r, i) => (
        <RestaurantBlock key={r.id} restaurant={r} index={i} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chef feature                                                       */
/* ------------------------------------------------------------------ */

export function ChefFeature() {
  return (
    <section
      id="chef"
      className="relative scroll-mt-24 overflow-hidden bg-ink-800 px-6 py-section md:px-10"
    >
      <div className="mx-auto grid max-w-editorial gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={CHEF.image}
              alt={`${CHEF.name}, ${CHEF.title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <SectionLabel index="05">The Kitchen&apos;s Hand</SectionLabel>
          <AnimatedText
            as="h2"
            text={CHEF.name}
            className="mt-6 font-serif text-4xl font-light leading-none text-sand md:text-6xl"
          />
          <Reveal delay={0.1} className="mt-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold/80">
              {CHEF.title}
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-8 max-w-lg text-base leading-relaxed text-stone-light">
            <p>{CHEF.bio}</p>
          </Reveal>

          <Reveal delay={0.26} className="mt-10 border-l border-gold/40 pl-6">
            <p className="font-serif text-2xl font-light italic leading-snug text-sand md:text-3xl">
              &ldquo;{CHEF.quote}&rdquo;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Tasting menu                                                       */
/* ------------------------------------------------------------------ */

const TASTING_MENU: MenuCourse[] = [
  {
    course: "I",
    name: "Reef Oyster & Green Coconut",
    note: "Lagoon oyster, cold-pressed coconut water, finger lime and a whisper of kaffir.",
    label: "Champagne",
  },
  {
    course: "II",
    name: "Line-Caught Trevally, Cured at Dawn",
    note: "This morning's catch, aged tamarind, sea grape and toasted breadfruit.",
    label: "Chablis",
  },
  {
    course: "III",
    name: "Garden Heart of Palm",
    note: "Charred over coconut husk, cultured island cream, native pepperleaf.",
    label: "Assyrtiko",
  },
  {
    course: "IV",
    name: "Langoustine & Burnt Vanilla",
    note: "Reef langoustine poached in its own bisque, Taha'a vanilla, sea urchin butter.",
    label: "White Burgundy",
  },
  {
    course: "V",
    name: "Blue Water Snapper, Salt-Baked",
    note: "Whole snapper in a crust of atoll salt, brown-butter beurre blanc, samphire.",
    label: "Meursault",
  },
  {
    course: "VI",
    name: "The Day's Catch, Over Embers",
    note: "Whatever the tide gives, grilled on driftwood coals, smoked lime, garden herbs.",
    label: "Rhône Blanc",
  },
  {
    course: "VII",
    name: "Island Venison & Wild Honey",
    note: "Slow-cooked loin, hibiscus glaze, roasted heirloom root, fermented pepper.",
    label: "Pinot Noir",
  },
  {
    course: "VIII",
    name: "Frangipani & Fresh Curd",
    note: "A palate garden of frangipani granita, coconut curd and cane sugar tuile.",
    label: "Sauternes",
  },
  {
    course: "IX",
    name: "Cacao from the Neighbouring Motu",
    note: "Single-origin Polynesian cacao, smoked salt, aged rum caramel, gold leaf.",
    label: "Rare Rum",
  },
];

export function TastingMenu() {
  return (
    <section
      id="menus"
      className="relative scroll-mt-24 bg-ink px-6 py-section md:px-10"
    >
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          eyebrow="Maré · Seasonal Tasting"
          index="06"
          title="Nine courses, one tide"
          align="center"
          className="mx-auto"
        />
        <Reveal delay={0.1} className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-stone-light">
          <p>
            The menu below is drawn from the current season. It changes without
            warning — a fisherman&apos;s luck, a first ripe fruit, a shift in the
            wind. Wine pairings are chosen from The Cellar the evening you dine.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl">
          <MenuList courses={TASTING_MENU} />
        </div>

        <RevealGroup className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-6 border-t border-white/10 pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <RevealItem>
            <p className="font-serif text-2xl font-light text-sand">
              $480 <span className="text-base text-sand/50">per guest</span>
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-sand/50">
              Wine pairing · $290
            </p>
          </RevealItem>
          <RevealItem>
            <Button href="#reserve" variant="gold" cursorLabel="Reserve">
              Reserve at Maré
            </Button>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Wine cellar stat feature                                           */
/* ------------------------------------------------------------------ */

const CELLAR_STATS = [
  { value: "12,000", label: "Bottles beneath the island" },
  { value: "1921", label: "Oldest vintage in the vault" },
  { value: "42", label: "Metres of coral-carved cellar" },
  { value: "12", label: "Seats at the sommelier's table" },
];

export function WineCellarFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section
      id="cellar-feature"
      className="relative min-h-[80vh] overflow-hidden"
      ref={ref}
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1900&q=80"
          alt="The Cellar, carved into the island's coral bedrock"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-editorial flex-col justify-center px-6 py-24 md:px-10">
        <SectionLabel index="07">Beneath the Coral</SectionLabel>
        <AnimatedText
          as="h2"
          text="A vault of twelve thousand bottles."
          className="mt-8 max-w-3xl font-serif text-4xl font-light leading-[1.05] text-sand md:text-6xl"
        />
        <Reveal delay={0.15} className="mt-8 max-w-xl text-base leading-relaxed text-sand/75">
          <p>
            Carved into the island&apos;s coral bedrock and held at a constant,
            unwavering cool, The Cellar keeps rare Pacific labels beside the
            great houses of Burgundy and Bordeaux. Descend for a private tasting,
            a sommelier dinner, or simply to choose the night&apos;s wine by
            candlelight.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4" stagger={0.12}>
          {CELLAR_STATS.map((s) => (
            <RevealItem key={s.label}>
              <p className="font-serif text-4xl font-light text-gold md:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.16em] text-sand/60">
                {s.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Food gallery strip                                                 */
/* ------------------------------------------------------------------ */

const FOOD_STRIP = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80", alt: "A plated course at Maré" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80", alt: "Coralline Beach Club on the sand" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1000&q=80", alt: "Line-caught fish over embers" },
  { src: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1000&q=80", alt: "A pour from The Cellar" },
  { src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80", alt: "Reef oysters on ice" },
];

export function FoodGalleryStrip() {
  return (
    <section className="relative bg-ink px-6 py-section md:px-10">
      <div className="mx-auto max-w-editorial">
        <SectionHeading
          eyebrow="From the Pass"
          index="08"
          title="The island, plated"
        />
        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-5" stagger={0.08}>
          {FOOD_STRIP.map((img, i) => (
            <RevealItem
              key={img.src}
              className={i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}
            >
              <div
                className={`group relative overflow-hidden rounded-sm ${
                  i === 0 ? "aspect-square md:h-full" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/0" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reservations header block (form imported by page)                  */
/* ------------------------------------------------------------------ */

export function ReservationsHeader() {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <SectionHeading
        eyebrow="Be Our Guest"
        index="09"
        title="Reserve your table"
        align="center"
        className="mx-auto"
      />
      <Reveal delay={0.1} className="mt-6 text-base leading-relaxed text-stone-light">
        <p>
          Tell us where and when, and our maître d&apos;hôtel will do the rest.
          For The Cellar and private dining, our concierge will design the
          evening with you personally.
        </p>
      </Reveal>
    </div>
  );
}
