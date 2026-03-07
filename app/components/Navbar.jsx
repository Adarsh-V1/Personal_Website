"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navItems } from "../data/portfolio";
import { Button } from "./ui/button";
import { cn } from "../utils/cn";

const getRouteActiveItem = (pathname) => {
  if (!pathname || pathname === "/") {
    return "hero";
  }

  const currentSegment = pathname.replace(/^\//, "").split("/")[0];
  const matchingItem = navItems.find((item) => item.id === currentSegment);

  return matchingItem?.id ?? "";
};

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setActive(getRouteActiveItem(pathname));
      return;
    }

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome, pathname]);

  const buildHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  const triggerTour = () => {
    setMobileOpen(false);

    if (!isHome) {
      window.location.href = "/#hero";
      return;
    }

    window.dispatchEvent(new CustomEvent("portfolio-tour:start"));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/#hero"
          data-ui-feedback
          className="rounded-full border border-white/70 bg-white/78 px-4 py-2 text-sm font-semibold tracking-[0.28em] text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          AP
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/72 px-2 py-2 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={buildHref(item.id)}
              data-ui-feedback
              aria-current={active === item.id ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950",
                active === item.id &&
                  "bg-slate-950 text-white shadow-[0_10px_30px_rgba(15,23,42,0.22)] hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button
            onClick={triggerTour}
            className="h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Sparkles className="size-4" />
            Take Tour
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-full border border-white/70 bg-white/78 p-3 text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="mx-5 rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:mx-8 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={buildHref(item.id)}
                data-ui-feedback
                onClick={() => setMobileOpen(false)}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition",
                  active === item.id &&
                    "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.2)]"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button
              onClick={triggerTour}
              className="mt-2 h-11 rounded-2xl bg-slate-950 text-white hover:bg-slate-800"
            >
              <Sparkles className="size-4" />
              Take Tour
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
