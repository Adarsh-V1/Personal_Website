"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  Code2,
  Compass,
  Eye,
  Layers3,
  MapPin,
  Sparkles,
  Wand2,
  Trophy,
} from "lucide-react";
import { Button } from "../ui/button";
import SectionHeading from "./section-heading";
import GuidedTour from "./guided-tour";
import InteractivePanel from "./interactive-panel";
import TechMarquee from "./tech-marquee";
import {
  aboutCards,
  achievementItems,
  contactCards,
  experienceItems,
  heroHighlights,
  heroStats,
  heroThreads,
  profileSummary,
  projectFilters,
  projects,
  skillGroups,
  socialLinks,
  techStack,
  tourSteps,
  workflowPrinciples,
} from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-4xl bg-white/50" />,
});

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const panelOrder = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "tech-stack",
  "achievements",
  "contact",
];

export default function PortfolioShell() {
  const mainRef = useRef(null);
  const heroSceneRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroStatsRef = useRef(null);
  const isPanelNavigatingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const [activeThread, setActiveThread] = useState(heroThreads[0]);
  const [projectFilter, setProjectFilter] = useState("All");
  const [isFiltering, startFiltering] = useTransition();
  const [tourPromptOpen, setTourPromptOpen] = useState(false);
  const [activeTourStep, setActiveTourStep] = useState(-1);

  const visibleProjects =
    projectFilter === "All"
      ? projects
      : projects.filter((project) => project.category === projectFilter);

  useEffect(() => {
    const hasSeenTour = window.localStorage.getItem("portfolio-tour-seen");

    if (!hasSeenTour) {
      setTourPromptOpen(true);
    }

    const restartTour = () => {
      window.localStorage.setItem("portfolio-tour-seen", "true");
      setTourPromptOpen(false);
      setActiveTourStep(0);
    };

    window.addEventListener("portfolio-tour:start", restartTour);

    return () => {
      window.removeEventListener("portfolio-tour:start", restartTour);
    };
  }, []);

  useEffect(() => {
    const getSections = () =>
      panelOrder
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const getCurrentPanelIndex = () => {
      const sections = getSections();
      const anchor = window.scrollY + window.innerHeight * 0.42;

      let index = 0;

      sections.forEach((section, sectionIndex) => {
        if (anchor >= section.offsetTop) {
          index = sectionIndex;
        }
      });

      return index;
    };

    const scrollToPanel = (index) => {
      const sections = getSections();
      const target = sections[index];

      if (!target) {
        return;
      }

      isPanelNavigatingRef.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      window.setTimeout(() => {
        isPanelNavigatingRef.current = false;
      }, 760);
    };

    const resolveScrollableContainer = (eventTarget) => {
      const scrollable = eventTarget.closest("[data-allow-scroll]");

      if (!scrollable) {
        return null;
      }

      return scrollable;
    };

    const shouldHandlePanelStep = (deltaY, eventTarget) => {
      const scrollable = resolveScrollableContainer(eventTarget);

      if (!scrollable) {
        return true;
      }

      const atTop = scrollable.scrollTop <= 0;
      const atBottom =
        scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 2;

      if (deltaY > 0 && !atBottom) {
        return false;
      }

      if (deltaY < 0 && !atTop) {
        return false;
      }

      return true;
    };

    const stepPanels = (direction) => {
      if (isPanelNavigatingRef.current) {
        return;
      }

      const currentIndex = getCurrentPanelIndex();
      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        panelOrder.length - 1
      );

      if (nextIndex === currentIndex) {
        return;
      }

      scrollToPanel(nextIndex);
    };

    const handleWheel = (event) => {
      if (tourPromptOpen || activeTourStep >= 0) {
        return;
      }

      if (Math.abs(event.deltaY) < 26) {
        return;
      }

      if (!shouldHandlePanelStep(event.deltaY, event.target)) {
        return;
      }

      event.preventDefault();
      stepPanels(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeydown = (event) => {
      if (tourPromptOpen || activeTourStep >= 0) {
        return;
      }

      if (
        ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        stepPanels(1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        stepPanels(-1);
      }
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchEnd = (event) => {
      if (tourPromptOpen || activeTourStep >= 0) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY ?? 0;
      const deltaY = touchStartYRef.current - endY;

      if (Math.abs(deltaY) < 46) {
        return;
      }

      if (!shouldHandlePanelStep(deltaY, event.target)) {
        return;
      }

      stepPanels(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeTourStep, tourPromptOpen]);

  useLayoutEffect(() => {
    if (!mainRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      if (heroCopyRef.current) {
        gsap.fromTo(
          heroCopyRef.current.children,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.78,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }

      if (heroSceneRef.current) {
        gsap.fromTo(
          heroSceneRef.current,
          { autoAlpha: 0, y: 32, rotate: -3 },
          { autoAlpha: 1, y: 0, rotate: 0, duration: 0.95, ease: "power3.out", delay: 0.12 }
        );
      }

      if (heroStatsRef.current) {
        gsap.fromTo(
          heroStatsRef.current.children,
          { autoAlpha: 0, y: 26, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      }

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 84%",
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 42 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: true,
            }
          ),
      });

    }, mainRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const startTour = () => {
    window.localStorage.setItem("portfolio-tour-seen", "true");
    setTourPromptOpen(false);
    setActiveTourStep(0);
  };

  const skipTour = () => {
    window.localStorage.setItem("portfolio-tour-seen", "true");
    setTourPromptOpen(false);
  };

  const closeTour = () => {
    setActiveTourStep(-1);
  };

  const nextTourStep = () => {
    if (activeTourStep === tourSteps.length - 1) {
      closeTour();
      return;
    }

    setActiveTourStep((step) => step + 1);
  };

  const previousTourStep = () => {
    setActiveTourStep((step) => Math.max(step - 1, 0));
  };

  return (
    <>
      <main
        ref={mainRef}
        className="relative overflow-x-clip bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(45,212,191,0.15),transparent_26%),linear-gradient(180deg,#fcfaf5_0%,#f7f1e8_48%,#fcfbf8_100%)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-180 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(circle_at_top,black,transparent_82%)]"
        />

        <section
          id="hero"
          className="relative isolate mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-10"
        >
          <div
            data-parallax
            className="pointer-events-none absolute -left-16 top-36 h-44 w-44 rounded-full bg-orange-200/60 blur-3xl"
          />
          <div
            data-parallax
            className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-teal-200/55 blur-3xl"
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div ref={heroCopyRef} className="relative z-10">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur"
              >
                <Sparkles className="size-3.5 text-teal-700" />
                {profileSummary.availability}
              </div>

              <h1
                className="mt-7 max-w-4xl text-balance font-(family-name:--font-space-grotesk) text-5xl leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl"
              >
                {profileSummary.name}
              </h1>

              <p
                className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
              >
                {profileSummary.tagline}
              </p>

              <p
                className="mt-6 max-w-2xl text-base leading-7 text-slate-600"
              >
                {profileSummary.intro}
              </p>

              <div
                className="mt-8 flex flex-wrap gap-3"
              >
                {heroHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/75 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  asChild
                  className="h-12 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.15)] hover:bg-slate-800"
                >
                  <Link href="#projects">
                    View Projects
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-slate-300 bg-white/70 px-7 text-sm font-semibold text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <Link href="#contact">Contact</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={startTour}
                  className="h-12 rounded-full border-slate-300 bg-transparent px-7 text-sm font-semibold text-slate-700"
                >
                  <Compass className="size-4" />
                  Interactive Tour
                </Button>
              </div>

              <div
                ref={heroStatsRef}
                className="mt-12 grid gap-4 sm:grid-cols-3"
              >
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-white/70 bg-white/72 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur"
                  >
                    <p className="font-(family-name:--font-space-grotesk) text-3xl text-slate-950">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={heroSceneRef}
              className="relative mx-auto flex w-full max-w-140 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-[38px] bg-white/45 blur-3xl" />
              <div className="relative w-full overflow-hidden rounded-[38px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(252,248,241,0.88))] p-4 shadow-[0_32px_120px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="relative h-110 overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(216,180,254,0.2),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))] sm:h-130">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[8%] rounded-full border border-[rgba(124,58,237,0.12)] opacity-70 blur-[1px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(14,165,233,0.1)] opacity-50"
                  />
                  <div className="absolute inset-0 opacity-90">
                    <HeroScene />
                  </div>

                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    {heroThreads.map((thread, index) => (
                      <path
                        key={thread.name}
                        d={`M 50 48 C ${46 + index * 1.4} 42, ${thread.position.x - 4} ${thread.position.y - 6}, ${thread.position.x} ${thread.position.y}`}
                        fill="none"
                        stroke={thread.color}
                        strokeOpacity="0.34"
                        strokeWidth="0.28"
                        strokeDasharray="1.4 1.2"
                      />
                    ))}
                  </svg>

                  {heroThreads.map((thread) => (
                    <button
                      key={thread.name}
                      type="button"
                      data-ui-feedback
                      onMouseEnter={() => setActiveThread(thread)}
                      onFocus={() => setActiveThread(thread)}
                      className="absolute z-20 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/85 bg-white/88 shadow-[0_10px_40px_rgba(15,23,42,0.12)] transition hover:scale-105"
                      style={{
                        left: `${thread.position.x}%`,
                        top: `${thread.position.y}%`,
                        boxShadow:
                          activeThread.name === thread.name
                            ? `0 0 0 8px ${thread.color}20, 0 12px 36px rgba(15,23,42,0.14)`
                            : "0 10px 40px rgba(15,23,42,0.12)",
                      }}
                      aria-label={thread.name}
                    >
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: thread.color }}
                      />
                    </button>
                  ))}

                  <motion.div
                    key={activeThread.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute right-5 top-5 max-w-62.5 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.1)] backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-9 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${activeThread.color}18`, color: activeThread.color }}
                      >
                        <Eye className="size-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                          Sequence Thread
                        </p>
                        <p className="font-(family-name:--font-space-grotesk) text-lg text-slate-950">
                          {activeThread.name}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-700">
                      {activeThread.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {activeThread.detail}
                    </p>
                  </motion.div>

                  <div className="absolute bottom-5 left-5 rounded-3xl border border-white/80 bg-white/76 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-700">
                      The Fool
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Hover the sealed nodes to reveal skill threads.
                    </p>
                  </div>

                  <div className="absolute bottom-5 right-5 rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="relative size-16 overflow-hidden rounded-2xl border border-slate-200 bg-[#f6efe4]">
                        <Image
                          src={profileSummary.image}
                          alt={profileSummary.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                          priority
                        />
                      </div>
                      <div>
                        <p className="font-(family-name:--font-space-grotesk) text-lg text-slate-950">
                          {profileSummary.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          Shipping elegant interfaces with motion, structure, and speed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
          <div data-reveal className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              <Wand2 className="size-4 text-teal-700" />
              Motion-enabled stack
            </div>
            <TechMarquee items={techStack} />
          </div>
        </section>

        <section
          id="about"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div data-reveal className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              eyebrow="About Me"
              title="Design-led frontend work with a builder’s discipline."
              description="I care about how a site feels in motion, how quickly a visitor understands the hierarchy, and how maintainable the code remains after the visual polish ships."
            />

            <div className="grid gap-5">
              {aboutCards.map((card, index) => (
                <InteractivePanel
                  key={card.title}
                  data-stack-card
                  glow={index % 2 === 0 ? "rgba(45, 212, 191, 0.16)" : "rgba(249, 115, 22, 0.12)"}
                  className="rounded-[30px] border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-slate-900 p-3 text-white">
                      <Layers3 className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </InteractivePanel>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Skills"
                title="A stack tuned for modern interfaces and flexible product work."
                description="The portfolio is split between implementation depth and workflow principles, so visitors can see both the tools and the way I use them."
              />
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-5 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <InteractivePanel
                    key={group.title}
                    data-reveal
                    data-stack-card
                    className="rounded-[30px] border border-white/70 bg-white/78 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                        {group.title}
                      </h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {group.level}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={`${group.title}-${skill}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </InteractivePanel>
                ))}
              </div>

              <InteractivePanel
                data-reveal
                {...cardMotion}
                glow="rgba(249, 115, 22, 0.12)"
                className="rounded-4xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,245,249,0.9))] p-7 text-slate-900 shadow-[0_24px_90px_rgba(15,23,42,0.12)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                  Working Style
                </p>
                <div className="mt-6 space-y-5">
                  {workflowPrinciples.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-white/70 bg-white/75 p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-slate-900 p-3">
                          <Code2 className="size-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-(family-name:--font-space-grotesk) text-lg">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractivePanel>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Projects"
                title="Selected work across product interfaces, experiments, and applied builds."
                description="Project cards keep the structure compact: screenshot, problem statement, stack, and links for code or live preview."
              />
            </div>

            <div
              data-allow-scroll
              className="mt-10 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2 [scrollbar-width:thin]"
            >
              <div data-reveal className="flex flex-wrap gap-3">
                {projectFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => startFiltering(() => setProjectFilter(filter))}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      projectFilter === filter
                        ? "bg-slate-950 text-white shadow-[0_16px_45px_rgba(15,23,42,0.18)]"
                        : "border border-slate-200 bg-white/80 text-slate-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className={`mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${isFiltering ? "opacity-80" : "opacity-100"}`}>
                {visibleProjects.map((project) => (
                  <InteractivePanel
                    key={project.id}
                    data-reveal
                    data-stack-card
                    glow="rgba(56, 189, 248, 0.12)"
                    className="group overflow-hidden rounded-4xl border border-white/70 bg-white/76 shadow-[0_22px_90px_rgba(15,23,42,0.08)] backdrop-blur"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/22 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                          {project.title}
                        </h3>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {project.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.techStack.map((item) => (
                          <span
                            key={`${project.id}-${item}`}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex gap-3">
                        <Button
                          asChild
                          className="h-10 rounded-full bg-slate-950 px-4 text-white hover:bg-slate-800"
                        >
                          <Link href={project.liveLink} target="_blank">
                            Live Demo
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="h-10 rounded-full border-slate-300 bg-transparent px-4 text-slate-700"
                        >
                          <Link href={project.codeLink} target="_blank">
                            GitHub
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </InteractivePanel>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Experience"
                title="A portfolio shaped by frontend delivery, interaction work, and rapid iteration."
                description="This timeline focuses on the work modes that define the portfolio today rather than forcing a generic resume layout."
              />
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {experienceItems.map((item, index) => (
                <InteractivePanel
                  key={item.title}
                  data-reveal
                  data-stack-card
                  glow={index === 1 ? "rgba(249, 115, 22, 0.12)" : "rgba(45, 212, 191, 0.14)"}
                  className="rounded-4xl border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex items-center gap-3 text-teal-700">
                    <BriefcaseBusiness className="size-5" />
                    <p className="text-xs font-semibold uppercase tracking-[0.26em]">
                      {item.period}
                    </p>
                  </div>
                  <h3 className="mt-5 font-(family-name:--font-space-grotesk) text-2xl text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </InteractivePanel>
              ))}
            </div>
          </div>
        </section>

        <section
          id="tech-stack"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Tech Stack"
                title="Tools selected for speed, polish, and a reliable build pipeline."
                description="The stack balances modern UI work, animated presentation, and flexible implementation across frontend and product prototypes."
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {techStack.map((item) => (
                <InteractivePanel
                  key={item.name}
                  data-reveal
                  className="rounded-full border border-white/75 bg-white/76 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.07)]"
                >
                  <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                  <span className="ml-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    {item.type}
                  </span>
                </InteractivePanel>
              ))}
            </div>
          </div>
        </section>

        <section
          id="achievements"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Achievements"
                title="Signals that reflect range, consistency, and problem-solving discipline."
                description="This section keeps the proof compact: output volume, creative breadth, and a non-software pursuit that reinforces strategic thinking."
              />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {achievementItems.map((item, index) => (
                <InteractivePanel
                  key={item.label}
                  data-reveal
                  data-stack-card
                  glow={index === 2 ? "rgba(45, 212, 191, 0.15)" : "rgba(249, 115, 22, 0.12)"}
                  className="rounded-4xl border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex items-center gap-3 text-orange-500">
                    <Trophy className="size-5" />
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-orange-500">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-5 font-(family-name:--font-space-grotesk) text-4xl text-slate-950">
                    {item.value}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </InteractivePanel>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.95fr]">
            <InteractivePanel
              data-reveal
              {...cardMotion}
              glow="rgba(45, 212, 191, 0.12)"
              className="rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,245,237,0.92))] p-8 text-slate-900 shadow-[0_28px_120px_rgba(15,23,42,0.12)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
                Contact
              </p>
              <h2 className="mt-5 max-w-xl font-(family-name:--font-space-grotesk) text-4xl text-slate-950 sm:text-5xl">
                Building something sharp, fast, and memorable?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                I&apos;m most useful when the goal is to turn a solid idea into a polished interface with strong hierarchy, careful motion, and production-ready frontend code.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/70 bg-white/75 p-5">
                  <div className="flex items-center gap-3 text-teal-700">
                    <MapPin className="size-5" />
                    <span className="text-sm font-medium">{profileSummary.location}</span>
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/70 bg-white/75 p-5">
                  <div className="flex items-center gap-3 text-teal-700">
                    <Clock3 className="size-5" />
                    <span className="text-sm font-medium">{profileSummary.timezone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-full bg-slate-950 px-6 text-white hover:bg-slate-800"
                >
                  <Link href={socialLinks[1].href} target="_blank">
                    Message on LinkedIn
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-slate-300 bg-transparent px-6 text-slate-800"
                >
                  <Link href={socialLinks[0].href} target="_blank">
                    Explore GitHub
                  </Link>
                </Button>
              </div>
            </InteractivePanel>

            <div className="grid gap-5">
              {contactCards.map((card) => (
                <InteractivePanel
                  key={card.title}
                  data-reveal
                  className="rounded-4xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.detail}
                  </p>
                </InteractivePanel>
              ))}

              <InteractivePanel
                data-reveal
                {...cardMotion}
                className="rounded-4xl border border-dashed border-slate-300 bg-white/70 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Socials
                </p>
                <div className="mt-4 space-y-3">
                  {socialLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      className="flex items-center justify-between rounded-[22px] border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      <span>{item.label}</span>
                      <span className="text-slate-400">{item.shortLabel}</span>
                    </Link>
                  ))}
                </div>
              </InteractivePanel>
            </div>
          </div>
        </section>

        <footer className="mx-auto w-full max-w-7xl px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 border-t border-slate-200/80 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Adarsh Pathania portfolio</p>
            <p>Built with Next.js, Tailwind CSS, Framer Motion, GSAP, and Three.js.</p>
          </div>
        </footer>
      </main>

      <GuidedTour
        promptOpen={tourPromptOpen}
        steps={tourSteps}
        activeStep={activeTourStep}
        onStart={startTour}
        onSkip={skipTour}
        onClose={closeTour}
        onNext={nextTourStep}
        onPrevious={previousTourStep}
      />
    </>
  );
}
