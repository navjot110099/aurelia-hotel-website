import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AURELIA — Private Island Reserve",
    short_name: "AURELIA",
    description:
      "A private-island reserve on Maré Séraphine — 34 overwater and beachfront residences, two-Michelin-star dining and an overwater spa. Where the horizon belongs to you.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#0a0e12",
    background_color: "#0a0e12",
    categories: ["travel", "lifestyle", "hospitality"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
