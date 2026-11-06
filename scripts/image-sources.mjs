/**
 * AURELIA — image source manifest.
 *
 * Single source of truth for the project's photography. Every image is a
 * Creative-Commons / Unsplash-licensed photograph, downloaded once by
 * `scripts/build-local-images.mjs`, optimised with sharp and committed to
 * `public/images/` so the site carries no runtime dependency on a remote CDN.
 *
 * `id`    — the Unsplash photo id (the `photo-…` token in the source URL).
 * `file`  — the local filename written to /public/images.
 * `credit`— short human description (used in CREDITS.md and as a fallback alt).
 *
 * Source URL for each asset:  https://images.unsplash.com/<id>
 * License: Unsplash License (https://unsplash.com/license) — free to use.
 */

export const UNSPLASH_PARAMS = "auto=format&fit=crop&w=2000&q=85";

/** Max width of the committed master; next/image derives responsive AVIF/WebP. */
export const MASTER_MAX_WIDTH = 1920;
export const MASTER_QUALITY = 72;

export const SOURCES = [
  { id: "photo-1602002418082-a4443e081dd1", file: "coralline-suite.jpg", credit: "Overwater suite deck at dusk" },
  { id: "photo-1600585154340-be6161a56a0c", file: "architecture-dusk.jpg", credit: "Resort architecture dissolving into the island at dusk" },
  { id: "photo-1507525428034-b723cf961d3e", file: "beach-first-light.jpg", credit: "White-sand beach and turquoise shallows at first light" },
  { id: "photo-1600334129128-685c5582fd35", file: "spa-float-pavilion.jpg", credit: "Overwater float pavilion above the lagoon" },
  { id: "photo-1439066615861-d1af74d74000", file: "island-aerial.jpg", credit: "Tropical island and reef from the air" },
  { id: "photo-1544551763-46a013bb70d5", file: "yacht-aurelia.jpg", credit: "Sailing yacht at anchor on open water" },
  { id: "photo-1414235077428-338989a2e8c0", file: "dining-mare.jpg", credit: "Fine-dining plate at the water's edge" },
  { id: "photo-1520250497591-112f2f40a3f4", file: "ocean-lagoon-room.jpg", credit: "Overwater room opening onto the lagoon" },
  { id: "photo-1510812431401-41d2bd2722f3", file: "the-cellar.jpg", credit: "Wine cellar with vaulted bottles" },
  { id: "photo-1571896349842-33c89424de2d", file: "palmwood-villa.jpg", credit: "Beachfront pool villa beneath the palms" },
  { id: "photo-1559339352-11d035aa65de", file: "coralline-beach-club.jpg", credit: "Barefoot beach club on the sand" },
  { id: "photo-1519046904884-53103b34b206", file: "beach-dinner-sunset.jpg", credit: "Private table set on the sand at sunset" },
  { id: "photo-1682687220208-22d7a2543e88", file: "living-reef.jpg", credit: "Living coral reef beneath the surface" },
  { id: "photo-1571003123894-1f0594d2b5d9", file: "ocean-room-interior.jpg", credit: "Light-filled residence interior" },
  { id: "photo-1534073737927-85f1ebff1f5d", file: "helicopter-journey.jpg", credit: "Helicopter over volcanic ridges and lagoon" },
  { id: "photo-1618773928121-c32242e63f39", file: "horizon-garden-room.jpg", credit: "Garden room with plunge pool and pavilion" },
  { id: "photo-1582719478250-c89cae4dc85b", file: "suite-interior.jpg", credit: "Suite bathroom and soaking tub" },
  { id: "photo-1560448204-e02f11c3d0e2", file: "aurora-suite.jpg", credit: "Presidential suite with horizon pool" },
  { id: "photo-1519741497674-611481863552", file: "wedding-celebration.jpg", credit: "Seaside celebration table at golden hour" },
  { id: "photo-1516594915697-87eb3b1c14ea", file: "wine-tasting.jpg", credit: "Private wine tasting" },
  { id: "photo-1631049307264-da0ec9d70304", file: "garden-room-detail.jpg", credit: "Garden room interior detail" },
  { id: "photo-1613977257363-707ba9348227", file: "celestia-detail.jpg", credit: "Beachfront estate living pavilion" },
  { id: "photo-1613490493576-7fde63acd811", file: "celestia-residence.jpg", credit: "Three-bedroom beachfront estate" },
  { id: "photo-1611892440504-42a792e24d32", file: "coralline-suite-bath.jpg", credit: "Suite bathroom open to the sea" },
  { id: "photo-1602343168117-bb8ffe3e2e9f", file: "palmwood-villa-pool.jpg", credit: "Villa pool and living pavilion" },
  { id: "photo-1596178065887-1198b6148b2b", file: "coralline-suite-lounge.jpg", credit: "Suite lounge with ocean view" },
  { id: "photo-1594744803329-e58b31de8bf5", file: "portrait-guest-relations.jpg", credit: "Portrait — guest relations" },
  { id: "photo-1591088398332-8a7791972843", file: "aurora-suite-terrace.jpg", credit: "Suite terrace at sunset" },
  { id: "photo-1590490360182-c33d57733427", file: "ocean-room-deck.jpg", credit: "Overwater room private sundeck" },
  { id: "photo-1584132967334-10e028bd69f7", file: "palmwood-villa-pavilion.jpg", credit: "Open-air villa pavilion" },
  { id: "photo-1580489944761-15a19d654956", file: "portrait-experiences.jpg", credit: "Portrait — experiences" },
  { id: "photo-1578683010236-d716f9a3f461", file: "coralline-suite-terrace.jpg", credit: "Suite terrace and infinity edge" },
  { id: "photo-1577219491135-ce391730fb2c", file: "chef-elise.jpg", credit: "Portrait — executive chef" },
  { id: "photo-1573496359142-b8d87734a5a2", file: "portrait-managing-director.jpg", credit: "Portrait — managing director" },
  { id: "photo-1566073771259-6a8506099945", file: "garden-room-pavilion.jpg", credit: "Garden room daybed pavilion" },
  { id: "photo-1560250097-0b93528c311a", file: "portrait-culinary.jpg", credit: "Portrait — culinary team" },
  { id: "photo-1544367567-0f2fcb009e0b", file: "wellness-yoga.jpg", credit: "Sunrise yoga on an open-air deck" },
  { id: "photo-1544161515-4ab6ce6db874", file: "spa-cabana.jpg", credit: "Private spa cabana open to the sea" },
  { id: "photo-1512917774080-9991f1c4c750", file: "celestia-pool.jpg", credit: "Estate pool and sand" },
  { id: "photo-1507003211169-0a1dd7228f2d", file: "guest-portrait.jpg", credit: "Portrait — returning guest" },
  { id: "photo-1506126613408-eca07ce68773", file: "wellness-practitioner.jpg", credit: "Portrait — wellness practitioner at dawn" },
  { id: "photo-1476224203421-9ac39bcb3327", file: "dining-fire.jpg", credit: "Line-caught fish over embers" },
  { id: "photo-1467003909585-2f8a72700288", file: "dining-oysters.jpg", credit: "Reef oysters on ice" },
];

/**
 * Derived assets built from a downloaded master (not separate downloads):
 *  - hero-still: a darkened seascape used as the static hero fallback for
 *    reduced-motion / low-power devices (keeps the overlaid headline legible).
 *  - og: the 1200×630 social share card.
 */
export const HERO_STILL_FROM = "photo-1507525428034-b723cf961d3e";
export const OG_FROM = "photo-1600585154340-be6161a56a0c";
