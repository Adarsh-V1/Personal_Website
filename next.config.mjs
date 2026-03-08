import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function nextConfig(phase) {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Keep build artifacts separate so `next build` does not corrupt the
    // active `.next` dev cache when local validation runs in parallel.
    distDir: isDevServer ? ".next" : ".next-build",
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    experimental: {
      optimizePackageImports: ["lucide-react"],
    },
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "www.jbg.org.uk",
        },
        {
          protocol: "https",
          hostname: "www.legitsecurity.com",
        },
      ],
    },
    async headers() {
      if (isDevServer) {
        return [];
      }

      return [
        {
          source: "/images/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
      ];
    },
  };
}
