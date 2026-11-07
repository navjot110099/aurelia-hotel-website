/**
 * AURELIA — brand + content source of truth.
 *
 * AURELIA is an ultra-luxury private-island reserve set on the
 * isle of Maré Séraphine in the South Pacific. 34 residences,
 * a two-Michelin-star kitchen, an overwater spa and a private marina.
 *
 * All copy here is bespoke — no placeholder text anywhere in the project.
 */

export const BRAND = {
  name: "AURELIA",
  legalName: "Aurelia Reserve Maré Séraphine",
  tagline: "Where the horizon belongs to you.",
  descriptor: "Private Island Reserve",
  location: "Maré Séraphine · South Pacific",
  established: 2019,
  phone: "+689 40 55 27 00",
  reservations: "reservations@aurelia-reserve.com",
  email: "concierge@aurelia-reserve.com",
  address: "Motu Aurelia, Maré Séraphine Atoll, French Polynesia",
  coordinates: { lat: -17.6797, lng: -149.4068 },
  social: {
    instagram: "https://instagram.com",
    behance: "https://behance.net",
    linkedin: "https://linkedin.com",
    pinterest: "https://pinterest.com",
  },
} as const;

/** Primary navigation with grouped mega-menu columns. */
export type NavGroup = {
  label: string;
  href: string;
  columns?: { title: string; links: { label: string; href: string; note?: string }[] }[];
};

export const NAV: NavGroup[] = [
  {
    label: "Stay",
    href: "/rooms",
    columns: [
      {
        title: "Residences",
        links: [
          { label: "Ocean Rooms", href: "/rooms", note: "From $1,850 / night" },
          { label: "Signature Suites", href: "/suites", note: "From $4,200 / night" },
          { label: "Private Villas", href: "/villas", note: "From $9,600 / night" },
          { label: "The Celestia Residence", href: "/villas#celestia", note: "By invitation" },
        ],
      },
      {
        title: "The Estate",
        links: [
          { label: "Overview", href: "/about" },
          { label: "Architecture", href: "/about#architecture" },
          { label: "Sustainability", href: "/about#sustainability" },
          { label: "Awards & Press", href: "/about#awards" },
        ],
      },
    ],
  },
  {
    label: "Experience",
    href: "/experiences",
    columns: [
      {
        title: "On the Water",
        links: [
          { label: "Private Yacht", href: "/experiences#yacht" },
          { label: "Sunset Cruise", href: "/experiences#cruise" },
          { label: "Reef & Diving", href: "/experiences#reef" },
          { label: "Private Beach", href: "/beach" },
        ],
      },
      {
        title: "On the Island",
        links: [
          { label: "Helicopter Journeys", href: "/experiences#helicopter" },
          { label: "Wine Cellar Tastings", href: "/dining#cellar" },
          { label: "Wellness & Spa", href: "/spa" },
          { label: "Curated Adventures", href: "/experiences" },
        ],
      },
    ],
  },
  {
    label: "Dining",
    href: "/dining",
    columns: [
      {
        title: "The Kitchens",
        links: [
          { label: "Maré — Two Michelin Stars", href: "/dining#mare" },
          { label: "Coralline Beach Club", href: "/dining#coralline" },
          { label: "The Cellar", href: "/dining#cellar" },
          { label: "In-Villa Dining", href: "/dining#in-villa" },
        ],
      },
      {
        title: "The Table",
        links: [
          { label: "Chef Elise Moreau", href: "/dining#chef" },
          { label: "Seasonal Menus", href: "/dining#menus" },
          { label: "Reservations", href: "/dining#reserve" },
        ],
      },
    ],
  },
  {
    label: "Occasions",
    href: "/events",
    columns: [
      {
        title: "Celebrate",
        links: [
          { label: "Weddings", href: "/weddings" },
          { label: "Private Events", href: "/events" },
          { label: "Executive Retreats", href: "/meetings" },
        ],
      },
      {
        title: "More",
        links: [
          { label: "Offers & Journeys", href: "/offers" },
          { label: "The Journal", href: "/blog" },
          { label: "Careers", href: "/careers" },
        ],
      },
    ],
  },
];

export const FOOTER_NAV = [
  {
    title: "Stay",
    links: [
      { label: "Ocean Rooms", href: "/rooms" },
      { label: "Signature Suites", href: "/suites" },
      { label: "Private Villas", href: "/villas" },
      { label: "Offers", href: "/offers" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Dining", href: "/dining" },
      { label: "Spa & Wellness", href: "/spa" },
      { label: "Experiences", href: "/experiences" },
      { label: "Private Beach", href: "/beach" },
      { label: "Concierge", href: "/concierge" },
    ],
  },
  {
    title: "Occasions",
    links: [
      { label: "Weddings", href: "/weddings" },
      { label: "Events", href: "/events" },
      { label: "Meetings", href: "/meetings" },
      { label: "The Journal", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Guest",
    links: [
      { label: "Book a Stay", href: "/booking" },
      { label: "My Journey", href: "/guest" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Concierge", href: "/concierge" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Accommodations                                                     */
/* ------------------------------------------------------------------ */

export type Room = {
  slug: string;
  name: string;
  category: "Room" | "Suite" | "Villa";
  tagline: string;
  description: string;
  price: number;
  size: number; // m²
  guests: number;
  beds: string;
  view: string;
  image: string;
  gallery: string[];
  amenities: string[];
  featured?: boolean;
};

export const ROOMS: Room[] = [
  {
    slug: "ocean-lagoon-room",
    name: "Ocean Lagoon Room",
    category: "Room",
    tagline: "Water at your feet, sky at your window.",
    description:
      "Perched on stilts above the turquoise shallows, the Ocean Lagoon Room opens through full-height glass onto a private sundeck and a ladder into the lagoon. Hand-troweled lime walls, a floating oak bed and a deep soaking tub set beneath a retractable skylight.",
    price: 1850,
    size: 82,
    guests: 2,
    beds: "1 King",
    view: "Lagoon & reef",
    image:
      "/images/ocean-lagoon-room.jpg",
    gallery: [
      "/images/ocean-room-deck.jpg",
      "/images/ocean-room-interior.jpg",
      "/images/suite-interior.jpg",
    ],
    amenities: ["Private sundeck", "Lagoon ladder", "Skylit soaking tub", "Butler service", "Nespresso & tea atelier", "Rain shower"],
    featured: true,
  },
  {
    slug: "horizon-garden-room",
    name: "Horizon Garden Room",
    category: "Room",
    tagline: "A quiet grove that opens to the sea.",
    description:
      "Set within the frangipani gardens, the Horizon Garden Room is a sanctuary of stone, teak and linen. A walled outdoor shower, a private plunge pool and a daybed pavilion make the garden an extension of the room.",
    price: 2150,
    size: 96,
    guests: 2,
    beds: "1 King",
    view: "Tropical garden & ocean",
    image:
      "/images/horizon-garden-room.jpg",
    gallery: [
      "/images/garden-room-pavilion.jpg",
      "/images/garden-room-detail.jpg",
    ],
    amenities: ["Private plunge pool", "Garden pavilion", "Outdoor shower", "Butler service", "Pillow menu", "Espresso atelier"],
  },
  {
    slug: "coralline-signature-suite",
    name: "Coralline Signature Suite",
    category: "Suite",
    tagline: "Two hundred square metres of sea and light.",
    description:
      "A duplex overwater suite with a wraparound deck, an infinity edge that dissolves into the lagoon and a glass-floor lounge above the coral garden. The upper terrace holds a private spa cabana and a dining pavilion for eight.",
    price: 4200,
    size: 210,
    guests: 3,
    beds: "1 King + Daybed",
    view: "Open ocean & coral garden",
    image:
      "/images/coralline-suite.jpg",
    gallery: [
      "/images/coralline-suite-lounge.jpg",
      "/images/coralline-suite-bath.jpg",
      "/images/coralline-suite-terrace.jpg",
    ],
    amenities: ["Infinity-edge pool", "Glass-floor lounge", "Private spa cabana", "Dedicated butler", "Wine refrigeration", "Dining pavilion"],
    featured: true,
  },
  {
    slug: "aurora-presidential-suite",
    name: "Aurora Presidential Suite",
    category: "Suite",
    tagline: "The island's most exalted address.",
    description:
      "Crowning the northern point, the Aurora Presidential Suite is a single-level residence of 340 square metres with a 25-metre horizon pool, a private gymnasium, a cinema lounge and a rooftop observatory for the southern stars.",
    price: 6800,
    size: 340,
    guests: 4,
    beds: "2 King",
    view: "360° ocean & sunset",
    image:
      "/images/aurora-suite.jpg",
    gallery: [
      "/images/suite-interior.jpg",
      "/images/aurora-suite-terrace.jpg",
    ],
    amenities: ["25m horizon pool", "Private gymnasium", "Cinema lounge", "Rooftop observatory", "Two butlers", "Chef's kitchen"],
    featured: true,
  },
  {
    slug: "the-celestia-residence",
    name: "The Celestia Residence",
    category: "Villa",
    tagline: "A private estate within the reserve.",
    description:
      "By invitation only. The Celestia is a three-bedroom beachfront estate with its own stretch of white sand, a 30-metre pool, a wellness pavilion, a wine cellar and a resident team of six — including a private chef and a dedicated captain for the estate's yacht.",
    price: 24000,
    size: 1200,
    guests: 6,
    beds: "3 King",
    view: "Private beach & open sea",
    image:
      "/images/celestia-residence.jpg",
    gallery: [
      "/images/celestia-pool.jpg",
      "/images/architecture-dusk.jpg",
      "/images/celestia-detail.jpg",
    ],
    amenities: ["Private white-sand beach", "30m pool", "Resident chef & captain", "Wellness pavilion", "Wine cellar", "Estate yacht"],
    featured: true,
  },
  {
    slug: "palmwood-pool-villa",
    name: "Palmwood Pool Villa",
    category: "Villa",
    tagline: "Barefoot grandeur beneath the palms.",
    description:
      "A two-bedroom beachfront villa of teak and coral stone, wrapped around a 20-metre pool and a shaded living pavilion that opens entirely to the sea. Ideal for families and small parties who want the island at their own pace.",
    price: 9600,
    size: 620,
    guests: 4,
    beds: "2 King",
    view: "Beachfront & sunset",
    image:
      "/images/palmwood-villa.jpg",
    gallery: [
      "/images/palmwood-villa-pool.jpg",
      "/images/palmwood-villa-pavilion.jpg",
    ],
    amenities: ["20m private pool", "Beachfront pavilion", "Two-bedroom layout", "Dedicated butler", "Outdoor kitchen", "Kayaks & paddleboards"],
  },
];

export const ROOMS_BY_CATEGORY = {
  Room: ROOMS.filter((r) => r.category === "Room"),
  Suite: ROOMS.filter((r) => r.category === "Suite"),
  Villa: ROOMS.filter((r) => r.category === "Villa"),
};

/* ------------------------------------------------------------------ */
/*  Dining                                                             */
/* ------------------------------------------------------------------ */

export const RESTAURANTS = [
  {
    id: "mare",
    name: "Maré",
    stars: 2,
    cuisine: "Contemporary Polynesian · Tasting",
    description:
      "Two Michelin stars. A nine-course journey through the reef, the garden and the deep ocean, served at the water's edge as the sun falls. Chef Elise Moreau reimagines the island larder each season.",
    hours: "Dinner · 18:30 – late",
    image:
      "/images/dining-mare.jpg",
  },
  {
    id: "coralline",
    name: "Coralline Beach Club",
    stars: 0,
    cuisine: "Mediterranean · All day",
    description:
      "Sun-drenched and barefoot. Wood-fired catch of the day, crudo, and cellar rosé served on the sand from morning coffee to the last embers of the evening.",
    hours: "All day · 07:00 – 23:00",
    image:
      "/images/coralline-beach-club.jpg",
  },
  {
    id: "cellar",
    name: "The Cellar",
    stars: 0,
    cuisine: "Wine & Rare Spirits",
    description:
      "Twelve thousand bottles beneath the island. Private tastings, sommelier dinners and a vaulted table for twelve carved into the coral bedrock.",
    hours: "By reservation",
    image:
      "/images/the-cellar.jpg",
  },
];

export const CHEF = {
  name: "Elise Moreau",
  title: "Executive Chef · Maré",
  bio: "Trained in Lyon and the Basque coast, Elise Moreau earned her first two stars before thirty-five. At Aurelia she cooks with a single rule — nothing travels further than the reef, the garden or the day's catch. Her tasting menu changes with the tides.",
  image:
    "/images/chef-elise.jpg",
  quote: "Luxury is a tomato picked an hour ago and a table where time forgets you.",
};

/* ------------------------------------------------------------------ */
/*  Spa & Wellness                                                     */
/* ------------------------------------------------------------------ */

export const SPA_TREATMENTS = [
  {
    name: "The Aurelia Ritual",
    duration: "150 min",
    price: 620,
    description:
      "Our signature journey — a monoï oil ceremony, warm basalt work and a sound bath in the overwater float pavilion.",
  },
  {
    name: "Reef Mineral Renewal",
    duration: "90 min",
    price: 380,
    description:
      "A marine exfoliation and cold-pressed algae wrap that draws on the atoll's mineral waters.",
  },
  {
    name: "Deep Ocean Massage",
    duration: "80 min",
    price: 340,
    description:
      "Slow, deliberate deep-tissue work scored to the movement of the tide, in a cabana above the lagoon.",
  },
  {
    name: "Sunrise Yoga & Breath",
    duration: "60 min",
    price: 180,
    description:
      "Private vinyasa and pranayama on the eastern deck as the island wakes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Experiences                                                        */
/* ------------------------------------------------------------------ */

export const EXPERIENCES = [
  {
    id: "yacht",
    name: "The Aurelia — Private Yacht",
    kind: "On the Water",
    description:
      "A 42-metre sloop with crew of eight, chartered by the day for the outer atolls, secret anchorages and dinner beneath the mast.",
    image:
      "/images/yacht-aurelia.jpg",
  },
  {
    id: "helicopter",
    name: "Helicopter Journeys",
    kind: "In the Air",
    description:
      "Lift off from the island's private helipad for volcano ridges, hidden lagoons and a champagne landing on a sandbar that appears only at low tide.",
    image:
      "/images/helicopter-journey.jpg",
  },
  {
    id: "reef",
    name: "The Living Reef",
    kind: "Beneath the Surface",
    description:
      "Guided dives and snorkels with the reserve's resident marine biologist through one of the Pacific's last pristine coral gardens.",
    image:
      "/images/living-reef.jpg",
  },
  {
    id: "cruise",
    name: "Sunset Cruise",
    kind: "On the Water",
    description:
      "A twilight sail aboard a restored 1962 schooner, cellar wines in hand, as the sky turns the colour of the resort's name.",
    image:
      "/images/beach-first-light.jpg",
  },
  {
    id: "wine",
    name: "Cellar & Vine",
    kind: "On the Island",
    description:
      "A private descent into The Cellar for a guided tasting of rare Pacific and Old-World bottles led by our head sommelier.",
    image:
      "/images/wine-tasting.jpg",
  },
  {
    id: "island",
    name: "The Private Island",
    kind: "Exclusive",
    description:
      "Charter the neighbouring motu for a day — a chef, a butler and a stretch of sand that belongs, for those hours, to you alone.",
    image:
      "/images/island-aerial.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Proof — stats, awards, testimonials                               */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: 34, suffix: "", label: "Private residences" },
  { value: 1, prefix: "", suffix: " island", label: "Yours, entirely" },
  { value: 2, suffix: "★", label: "Michelin stars at Maré" },
  { value: 98, suffix: "%", label: "Guests who return" },
];

export const AWARDS = [
  { title: "World's Best Resort", org: "Condé Nast Traveler", year: 2025 },
  { title: "Hotel of the Year", org: "Travel + Leisure", year: 2025 },
  { title: "Best Overwater Villa", org: "Robb Report", year: 2024 },
  { title: "Two Michelin Stars", org: "Guide Michelin", year: 2024 },
  { title: "Design Award of Merit", org: "AHEAD Asia", year: 2023 },
];

export const TESTIMONIALS = [
  {
    quote:
      "We have stayed everywhere. Nowhere has made time stand still quite like Aurelia. We left different people.",
    author: "Anaïs & Julien Deveraux",
    origin: "Paris, France",
  },
  {
    quote:
      "The staff anticipate a wish before you know you have it. It is the finest hospitality on earth — and I do not say that lightly.",
    author: "Katherine Ashford",
    origin: "London, United Kingdom",
  },
  {
    quote:
      "Dinner at Maré was the single best meal of my life. And then the stars came out over the water.",
    author: "Hiroshi Tanaka",
    origin: "Tokyo, Japan",
  },
];

/* ------------------------------------------------------------------ */
/*  Offers                                                             */
/* ------------------------------------------------------------------ */

export const OFFERS = [
  {
    title: "The Fifth Night, Ours",
    subtitle: "Extended Escape",
    description:
      "Stay five nights and the fifth is our gift — with a private dinner at Maré and a sunset sail for two.",
    tag: "Suites & Villas",
    image:
      "/images/coralline-suite.jpg",
  },
  {
    title: "A Honeymoon Written in Salt",
    subtitle: "Newlywed Journey",
    description:
      "Overwater residence, daily spa ritual for two, a floating breakfast and a private beach dinner beneath the stars.",
    tag: "Romance",
    image:
      "/images/beach-dinner-sunset.jpg",
  },
  {
    title: "The Reserve, Entirely Yours",
    subtitle: "Buyout",
    description:
      "Charter all 34 residences and the island's full team for a milestone that deserves nothing less than everything.",
    tag: "Exclusive",
    image:
      "/images/yacht-aurelia.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Journal                                                            */
/* ------------------------------------------------------------------ */

export const JOURNAL = [
  {
    slug: "the-architecture-of-stillness",
    title: "The Architecture of Stillness",
    category: "Design",
    excerpt:
      "How Studio Kenzō Aramaki drew a resort that disappears into its island — and why the most luxurious material of all is restraint.",
    readingTime: "6 min",
    date: "May 2026",
    image:
      "/images/architecture-dusk.jpg",
  },
  {
    slug: "a-reef-reborn",
    title: "A Reef Reborn",
    category: "Sustainability",
    excerpt:
      "Inside the coral nursery that has restored eleven hectares of reef — and the marine team who tend it at dawn.",
    readingTime: "8 min",
    date: "April 2026",
    image:
      "/images/living-reef.jpg",
  },
  {
    slug: "nine-courses-one-tide",
    title: "Nine Courses, One Tide",
    category: "Dining",
    excerpt:
      "A season at Maré with Chef Elise Moreau, from the first line caught at sunrise to the last plate under the stars.",
    readingTime: "7 min",
    date: "March 2026",
    image:
      "/images/dining-mare.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export type GalleryCategory =
  | "All"
  | "Residences"
  | "Ocean"
  | "Dining"
  | "Spa"
  | "Island";

export const GALLERY: { src: string; category: Exclude<GalleryCategory, "All">; caption: string }[] = [
  { src: "/images/coralline-suite.jpg", category: "Residences", caption: "Coralline Signature Suite at dusk" },
  { src: "/images/island-aerial.jpg", category: "Island", caption: "The reserve from the air" },
  { src: "/images/dining-mare.jpg", category: "Dining", caption: "A course at Maré" },
  { src: "/images/yacht-aurelia.jpg", category: "Ocean", caption: "The Aurelia at anchor" },
  { src: "/images/spa-float-pavilion.jpg", category: "Spa", caption: "Overwater float pavilion" },
  { src: "/images/ocean-lagoon-room.jpg", category: "Residences", caption: "Ocean Lagoon Room" },
  { src: "/images/beach-first-light.jpg", category: "Ocean", caption: "Low tide, first light" },
  { src: "/images/palmwood-villa.jpg", category: "Residences", caption: "Palmwood Pool Villa" },
  { src: "/images/coralline-beach-club.jpg", category: "Dining", caption: "Coralline Beach Club" },
  { src: "/images/living-reef.jpg", category: "Ocean", caption: "The living reef" },
  { src: "/images/architecture-dusk.jpg", category: "Island", caption: "Architecture of stillness" },
  { src: "/images/spa-float-pavilion.jpg", category: "Spa", caption: "The Aurelia Ritual" },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: "How do guests arrive at Aurelia?",
    a: "Guests fly into Faa'a International, where our team meets you privately. From there a 35-minute seaplane or the island's helicopter brings you to Aurelia's own lagoon. Private jet arrangements can be made through the concierge.",
  },
  {
    q: "Is the reserve suitable for children?",
    a: "Aurelia welcomes families in our villas, with a discreet children's atelier, tailored experiences and dedicated nannies on request. Maré and the overwater spa are reserved for guests sixteen and over after 18:00.",
  },
  {
    q: "What is included in a stay?",
    a: "All residences include a dedicated butler, daily breakfast, sunset canapés, non-motorised watersports, the wellness pavilion and return island transfers. Dining, spa treatments and curated experiences are charged as enjoyed.",
  },
  {
    q: "Can the entire island be reserved?",
    a: "Yes. The reserve offers full buyouts of all 34 residences and the island's team for weddings, milestone celebrations and private gatherings. Please contact our reservations atelier.",
  },
  {
    q: "What is your sustainability commitment?",
    a: "Aurelia runs on solar and stored energy, desalinates and recycles its own water, grows much of its produce on the island and funds a coral-restoration programme that has revived eleven hectares of reef.",
  },
];

export const NEWSLETTER_NOTE =
  "Join a quiet correspondence — new journeys, the chef's seasonal menus and the occasional invitation reserved for our house list.";
