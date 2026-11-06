import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { BRAND } from "@/lib/site";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://aurelia-reserve.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.descriptor} · ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "AURELIA is a private-island reserve on Maré Séraphine — 34 overwater and beachfront residences, two-Michelin-star dining, an overwater spa and a private marina. Where the horizon belongs to you.",
  keywords: [
    "luxury resort",
    "private island",
    "overwater villa",
    "Maré Séraphine",
    "ultra luxury hotel",
    "Michelin dining",
    "honeymoon resort",
    "AURELIA",
  ],
  authors: [{ name: BRAND.legalName }],
  creator: BRAND.legalName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.descriptor}`,
    description: BRAND.tagline,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "AURELIA — Private Island Reserve. Where the horizon belongs to you.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.descriptor}`,
    description: BRAND.tagline,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#0a0e12",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Resort",
  name: BRAND.legalName,
  description: BRAND.tagline,
  url: SITE_URL,
  telephone: BRAND.phone,
  email: BRAND.reservations,
  starRating: { "@type": "Rating", ratingValue: "5" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Motu Aurelia",
    addressLocality: "Maré Séraphine Atoll",
    addressCountry: "PF",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BRAND.coordinates.lat,
    longitude: BRAND.coordinates.lng,
  },
  amenityFeature: [
    "Private beach",
    "Infinity pool",
    "Overwater spa",
    "Two-Michelin-star restaurant",
    "Private marina",
    "Helipad",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="noise antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest focus:text-ink"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
