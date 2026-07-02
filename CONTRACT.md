# AURELIA — Build Contract (READ FIRST)

You are building pages for **AURELIA**, a fictional ultra-luxury private-island
resort. Next.js 15 App Router + TypeScript + Tailwind + Framer Motion. The core
foundation (layout, nav, footer, cursor, preloader, smooth scroll) already
exists and wraps every route automatically via `src/app/layout.tsx` →
`SiteShell`. **Do NOT re-add nav/footer** — just build the page body.

## Absolute rules
- **No placeholder text. No Lorem Ipsum.** Write bespoke luxury copy.
- Everything animates on scroll. Use the primitives below — do not reinvent them.
- Match the visual language: deep ink backgrounds, gold accents, large light
  serif headings, letter-spaced uppercase sans eyebrows, generous spacing.
- Use Tailwind classes only (design tokens already configured).
- All page components that use motion/hooks/state need `"use client";` at top.
- Images: use `next/image` with Unsplash URLs already used in `src/lib/site.ts`,
  or pick other `images.unsplash.com` photos (already allowlisted in next.config).
  Always set `fill` + `sizes` + descriptive `alt`, wrap in a relatively
  positioned `overflow-hidden` parent with an explicit aspect ratio.

## Design tokens (Tailwind)
- Colors: `ink` (#0A0E12, bg), `ink-800`, `sea`, `gold` (+ `gold-light`,
  `gold-400/500/600`), `sand` (+ `sand-50/100/200`), `stone` (+ `stone-light`).
- Fonts: `font-serif` (Cormorant Garamond — headings), `font-sans` (Jost — body).
- Utility classes in globals.css: `eyebrow`, `glass`, `glass-light`,
  `text-gold-gradient`, `hairline`, `vignette` (on relative parent),
  `link-sweep`, `lift`, `bg-gold-gradient`, `shimmer-gold`, `marquee`.
- Spacing helper: `py-section` (responsive vertical section padding).
- Max content width: `max-w-editorial` (78rem) or `max-w-[100rem]`.
- Section horizontal padding pattern: `px-6 md:px-10`.

## Import surface (USE THESE)
```ts
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";           // href OR onClick; variants: gold|outline|ghost|light|dark; size sm|md|lg; props: cursorLabel, magnetic
import { Magnetic } from "@/components/ui/MagneticButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { AnimatedText, AnimatedChars } from "@/components/ui/AnimatedText"; // AnimatedText props: text, as, className
import { SectionLabel, SectionHeading, Marquee, GoldLine } from "@/components/ui/Primitives";
// SectionHeading props: eyebrow?, index?, title, align?('left'|'center'), className?, titleClassName?
// data:
import { BRAND, ROOMS, ROOMS_BY_CATEGORY, RESTAURANTS, CHEF, SPA_TREATMENTS, EXPERIENCES, STATS, AWARDS, TESTIMONIALS, OFFERS, JOURNAL, GALLERY, FAQ } from "@/lib/site";
```
Lucide icons: `import { IconName } from "lucide-react";`
Framer Motion: `import { motion, useScroll, useTransform } from "framer-motion";`

## Page pattern
Every route is `src/app/<route>/page.tsx`. Export `metadata` (title + description)
from server pages when possible; if the page must be a client component
(`"use client"`), instead create a `layout.tsx` OR keep the page server and put
interactive parts in child client components. Simplest reliable approach for
these pages: make `page.tsx` a **server component** that exports `metadata` and
renders client section components. Put `"use client"` only on the section files.

Prefer this structure per route:
- `src/app/<route>/page.tsx` — server component, exports `metadata`, composes sections.
- Section components can live inline in the same folder or under `src/sections/<route>/`.

## Standard page hero (reuse this shape)
A full-width tall banner: background `next/image` with dark gradient overlay,
eyebrow + huge serif `<h1>`, short intro line. ~70vh. Example spacing:
`relative flex h-[70vh] min-h-[520px] items-end overflow-hidden`.

## Reduced motion & a11y
- Use semantic headings (one h1 per page), `alt` text, foc:visible is styled.
- Buttons/links get real hrefs.

Keep it production-clean, typed, and beautiful. Every section should feel
handcrafted and expensive.
