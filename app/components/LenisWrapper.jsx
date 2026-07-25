"use client";

import { ReactLenis } from "lenis/react";

export default function LenisWrapper({ children }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
