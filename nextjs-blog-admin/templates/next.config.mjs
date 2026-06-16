/** @type {import('next').NextConfig} */
// Merge `images` into your existing next.config — UploadThing serves from utfs.io,
// and next/image rejects external domains unless they're allow-listed.
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["utfs.io"], // Next 13/14
    // On Next 15+, prefer remotePatterns instead:
    // remotePatterns: [{ protocol: "https", hostname: "utfs.io" }],
  },
}

export default nextConfig
