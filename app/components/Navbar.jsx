"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Sparkles, X, Home, Briefcase, LayoutTemplate, MessageSquare, Send } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { navItems } from "../data/portfolio";
import { Button } from "./ui/button";
import { cn } from "../utils/cn";
import ThemeControls from "./theme-controls";

const NAV_SCROLL_OFFSET = 108;

const emojiMap = {
  hero: "🏠",
  services: "💼",
  projects: "🚀",
  testimonials: "💬",
  contact: "📬",
};

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
  const [logoSequenceCount, setLogoSequenceCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isHome = pathname === "/";
  const isLotm = resolvedTheme === "lotm";

  useEffect(() => {
    if (!isHome) {
      setActive((current) => {
        const next = getRouteActiveItem(pathname);
        return current === next ? current : next;
      });
      return;
    }

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    let rafId = null;
    let sectionOffsets = [];

    const recomputeSectionOffsets = () => {
      sectionOffsets = sections.map((section) => ({
        id: section.id,
        top: section.offsetTop,
      }));
    };

    const updateActiveSection = () => {
      const anchor = window.scrollY + window.innerHeight * 0.33;
      let current = sectionOffsets[0]?.id ?? sections[0].id;

      sectionOffsets.forEach((section) => {
        if (anchor >= section.top - 12) {
          current = section.id;
        }
      });

      setActive((previous) => (previous === current ? previous : current));
    };

    const queueActiveUpdate = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateActiveSection();
      });
    };

    const handleResize = () => {
      recomputeSectionOffsets();
      queueActiveUpdate();
    };

    recomputeSectionOffsets();
    queueActiveUpdate();

    window.addEventListener("scroll", queueActiveUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", queueActiveUpdate);
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isHome, pathname]);

  const buildHref = (id) => (isHome ? `#${id}` : `/#${encodeURIComponent(id)}`);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);

    if (!target) {
      return false;
    }

    const targetTop = target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });

    const nextHash = `#${encodeURIComponent(id)}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${nextHash}`
      );
    }

    setActive((current) => (current === id ? current : id));
    return true;
  };

  const handleNavItemClick = (event, id) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    setMobileOpen(false);

    if (isHome) {
      if (!scrollToSection(id)) {
        router.push(`/#${encodeURIComponent(id)}`);
      }
      return;
    }

    router.push(`/#${encodeURIComponent(id)}`);
  };

  const triggerTour = () => {
    setMobileOpen(false);

    if (!isHome) {
      window.location.href = "/#hero";
      return;
    }

    window.dispatchEvent(new CustomEvent("portfolio-tour:start"));
  };

  const navLabelMap = isLotm
    ? {
        about: "Sealed Records",
        projects: "Mystical Artifacts",
        contact: "Ritual Link",
      }
    : {};

  const revealLogoSecret = () => {
    setLogoSequenceCount((currentCount) => {
      const nextCount = currentCount + 1;

      if (nextCount >= 7) {
        window.dispatchEvent(
          new CustomEvent("lotm:omen", {
            detail: {
              message: "A hidden sigil answers your persistence.",
            },
          })
        );
        return 0;
      }

      return nextCount;
    });
  };

  useEffect(() => {
    if (!logoSequenceCount) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setLogoSequenceCount(0);
    }, 3200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [logoSequenceCount]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2.5 sm:px-8 lg:px-10">
        <Link
          href="/#hero"
          data-ui-feedback
          onClick={(event) => {
            revealLogoSecret();
            handleNavItemClick(event, "hero");
          }}
          className={cn(
            "relative flex size-9 items-center justify-center rounded-xl border border-white/70 bg-white/80 text-xs font-bold tracking-wider text-slate-900 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
            isLotm && "border-[#d49a3f]/50 bg-[#070b13]/86 text-[#eef6ff]"
          )}
        >
          AP
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full border border-white/70 bg-white/72 px-1.5 py-1 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_12px_36px_rgba(15,23,42,0.12)] backdrop-blur-md lg:flex transition-all duration-300 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_20px_40px_rgba(15,23,42,0.15)]",
            isLotm && "border-[#d49a3f]/40 bg-[#070b13]/80 shadow-[inset_0_1px_1px_rgba(212,154,63,0.3),0_12px_36px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_1px_1px_rgba(212,154,63,0.3),0_20px_40px_rgba(0,0,0,0.6)]"
          )}
        >
          {navItems.map((item) => {
            const emoji = emojiMap[item.id];
            return (
              <Link
                key={item.id}
                href={buildHref(item.id)}
                data-ui-feedback
                onClick={(event) => handleNavItemClick(event, item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-slate-600 transition-all duration-300 hover:text-slate-950",
                  active === item.id &&
                    (isLotm
                      ? "bg-gradient-to-b from-[#dfa03a] to-[#c8861f] text-[#f6fbff] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_20px_rgba(200,134,31,0.4)] hover:text-[#f6fbff]"
                      : "bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_rgba(79,70,229,0.3)] hover:text-white"),
                  isLotm && active !== item.id && "text-[#c8dcff] hover:text-[#e6f2ff]"
                )}
              >
                {emoji && (
                  <span className={cn(
                    "text-lg drop-shadow-sm transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-0.5",
                    active === item.id ? "scale-110 drop-shadow-md" : "grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                  )}>
                    {emoji}
                  </span>
                )}
                {active === item.id && (
                  <span className={cn(
                    "absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-current opacity-60",
                    isLotm && "bg-[#f0b85b]"
                  )} />
                )}
                <span>{navLabelMap[item.id] ?? item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <ThemeControls />
          <Button
            onClick={triggerTour}
            className={cn(
              "h-9 rounded-full px-4 text-xs font-semibold text-white",
              isLotm ? "bg-[#c8861f] hover:bg-[#de9f3a]" : "bg-slate-950 hover:bg-slate-800"
            )}
          >
            <Sparkles className="size-4" />
            Take Tour
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className={cn(
            "rounded-full border border-white/70 bg-white/78 p-2.5 text-slate-900 shadow-[0_12px_36px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden",
            isLotm && "border-[#d49a3f]/50 bg-[#070b13]/86 text-[#eef6ff]"
          )}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-4 overflow-hidden transition-all duration-300 ease-out sm:mx-8 lg:hidden",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className={cn(
            "mt-1 rounded-2xl border border-white/70 bg-white/92 p-3 shadow-[0_18px_56px_rgba(15,23,42,0.12)] backdrop-blur",
            isLotm && "border-[#d49a3f]/45 bg-[#070b13]/92"
          )}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const emoji = emojiMap[item.id];
              return (
                <Link
                  key={item.id}
                  href={buildHref(item.id)}
                  data-ui-feedback
                  onClick={(event) => handleNavItemClick(event, item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-300",
                    active === item.id &&
                      (isLotm
                        ? "bg-gradient-to-b from-[#dfa03a] to-[#c8861f] text-[#f6fbff] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_24px_rgba(200,134,31,0.3)]"
                        : "bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_24px_rgba(79,70,229,0.3)]"),
                    isLotm && active !== item.id && "text-[#bfd5f6]"
                  )}
                >
                  {emoji && (
                    <span className={cn(
                      "text-xl drop-shadow-sm",
                      active === item.id ? "drop-shadow-md" : "grayscale-[30%] opacity-80"
                    )}>
                      {emoji}
                    </span>
                  )}
                  <span>{navLabelMap[item.id] ?? item.label}</span>
                </Link>
              );
            })}
            <div className="mt-1 flex items-center justify-between border-t border-slate-200/60 pt-2">
              <ThemeControls mobile />
              <Button
                onClick={triggerTour}
                className={cn(
                  "h-8 rounded-xl px-3 text-xs text-white",
                  isLotm ? "bg-[#c8861f] hover:bg-[#de9f3a]" : "bg-slate-950 hover:bg-slate-800"
                )}
              >
                <Sparkles className="size-3.5 mr-1" />
                Tour
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
