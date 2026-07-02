import type { MetadataRoute } from "next";

const SITE_URL = "https://aurelia-reserve.com";

/** Public routes, ordered by editorial priority. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rooms", priority: 0.9, changeFrequency: "weekly" },
  { path: "/suites", priority: 0.9, changeFrequency: "weekly" },
  { path: "/villas", priority: 0.9, changeFrequency: "weekly" },
  { path: "/dining", priority: 0.8, changeFrequency: "weekly" },
  { path: "/spa", priority: 0.7, changeFrequency: "monthly" },
  { path: "/wellness", priority: 0.7, changeFrequency: "monthly" },
  { path: "/experiences", priority: 0.8, changeFrequency: "weekly" },
  { path: "/beach", priority: 0.6, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "weekly" },
  { path: "/offers", priority: 0.9, changeFrequency: "weekly" },
  { path: "/events", priority: 0.6, changeFrequency: "monthly" },
  { path: "/weddings", priority: 0.7, changeFrequency: "monthly" },
  { path: "/meetings", priority: 0.6, changeFrequency: "monthly" },
  { path: "/concierge", priority: 0.6, changeFrequency: "monthly" },
  { path: "/booking", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
