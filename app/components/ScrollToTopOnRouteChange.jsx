"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const scrollToHashTarget = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const hash = window.location.hash.replace("#", "");

  if (!hash) {
    return false;
  }

  const target = document.getElementById(decodeURIComponent(hash));

  if (!target) {
    return false;
  }

  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  return true;
};

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    const handledHash = scrollToHashTarget();

    if (!handledHash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      scrollToHashTarget();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
