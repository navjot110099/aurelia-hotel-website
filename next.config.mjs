/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All photography is served locally from /public/images — no remote CDN.
    formats: ["image/avif", "image/webp"],
  },
  // three.js / R3F ship untranspiled ESM in places — let Next handle it.
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
