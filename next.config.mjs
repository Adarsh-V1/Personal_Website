import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default function nextConfig(phase) {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Keep build artifacts separate so `next build` does not corrupt the
    // active `.next` dev cache when local validation runs in parallel.
    distDir: isDevServer ? ".next" : ".next-build",
    output: "export",
    images: {
      unoptimized: true,
      domains: ["images.unsplash.com"],
    },
  };
}
