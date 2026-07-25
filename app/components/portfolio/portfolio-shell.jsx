"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  Eye,
  Layers3,
  MapPin,
  MessageSquare,
  Settings2,
  Sparkles,
  Trophy,
  Wand2,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import SectionHeading from "./section-heading";
import GuidedTour from "./guided-tour";
import InteractivePanel from "./interactive-panel";
import TechMarquee from "./tech-marquee";
import HeroTarotCards from "./hero-tarot-cards";
import ProjectEstimator from "./project-estimator";
import AvailabilityBanner from "./availability-banner";
import CommandPalette from "./command-palette";
import CaseStudyModal from "./case-study-modal";
import { PexelsSection, PexelsHeroImage, PexelsCardImage, PexelsAvatar, PexelsCardBg, PexelsVideo } from "./pexels-media";
import {
  aboutCards,
  achievementItems,
  caseStudies,
  contactCards,
  deliveryCapabilities,
  experienceItems,
  faqs,
  heroHighlights,
  heroStats,
  heroThreads,
  processSteps,
  profileSummary,
  projects,
  projectFilters,
  servicesData,
  skillGroups,
  socialLinks,
  techStack,
  testimonials,
  tourSteps,
  whyWorkWithMe,
  workflowPrinciples,
} from "../../data/portfolio";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const flipCardVariants = {
  rest: { rotateY: 0 },
  hover: { rotateY: 180, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const descriptionWordVariants = {
  rest: { opacity: 0, y: 8, filter: "blur(4px)" },
  hover: (index) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.26, delay: 0.02 * index, ease: "easeOut" },
  }),
};

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function FAQItem({ question, answer, isOpen, onToggle, isLotm }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/70 bg-white/75 overflow-hidden transition-all duration-300",
        isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={cn(
          "font-(family-name:--font-space-grotesk) text-lg text-slate-900",
          isLotm && "text-[#e8f2ff]"
        )}>
          {question}
        </span>
        <ChevronDown className={cn(
          "size-5 shrink-0 text-slate-400 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>
      <div className={cn(
        "grid transition-all duration-300",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <p className={cn(
            "px-6 pb-5 text-sm leading-7 text-slate-600",
            isLotm && "text-[#b9cff2]"
          )}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioShell() {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";
  const mainRef = useRef(null);
  const heroSceneRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroStatsRef = useRef(null);
  const konamiRef = useRef([]);
  const runeHoverTimerRef = useRef(null);
  const omenTimerRef = useRef(null);
  const [activeThread, setActiveThread] = useState(heroThreads[0]);
  const [tourPromptOpen, setTourPromptOpen] = useState(false);
  const [activeTourStep, setActiveTourStep] = useState(-1);
  const [omenMessage, setOmenMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const revealOmen = useCallback((message) => {
    setOmenMessage(message);
    window.clearTimeout(omenTimerRef.current);
    omenTimerRef.current = window.setTimeout(() => {
      setOmenMessage("");
    }, 4200);
  }, []);

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
    const handleOmenEvent = (event) => {
      const message = event?.detail?.message;
      if (message) {
        revealOmen(message);
      }
    };

    const handleKeydown = (event) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const nextSequence = [...konamiRef.current, key].slice(-KONAMI_CODE.length);
      konamiRef.current = nextSequence;

      const unlocked = KONAMI_CODE.every((entry, index) => nextSequence[index] === entry);
      if (unlocked) {
        revealOmen("Sequence pathway opened. The Fool has noticed your visit.");
        konamiRef.current = [];
      }
    };

    window.addEventListener("lotm:omen", handleOmenEvent);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("lotm:omen", handleOmenEvent);
      window.removeEventListener("keydown", handleKeydown);
      window.clearTimeout(omenTimerRef.current);
      window.clearTimeout(runeHoverTimerRef.current);
    };
  }, [revealOmen]);

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

      const revealElements = gsap.utils.toArray("[data-reveal]");

      gsap.set(revealElements, { autoAlpha: 0, y: 42 });

      ScrollTrigger.batch(revealElements, {
        start: "top 84%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          }),
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

  const handleActiveThreadChange = useCallback((thread) => {
    setActiveThread((currentThread) =>
      currentThread?.name === thread?.name ? currentThread : thread
    );
  }, []);

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

  const sectionCopy = isLotm
    ? {
        aboutEyebrow: "Sealed Records",
        aboutTitle: "Fragments from the gray-fog era and disciplined craft.",
        projectsEyebrow: "Mystical Artifacts",
        projectsTitle: "Artifacts forged through product work, experiments, and applied systems.",
        contactEyebrow: "Ritual Link",
        contactTitle: "Summon collaboration across product, systems, and interface craft.",
        servicesEyebrow: "Arcane Services",
        servicesTitle: "Magics I weave for those who seek.",
        whyMeEyebrow: "Why Choose",
        whyMeTitle: "The fool's proven edges.",
        processEyebrow: "The Ritual",
        processTitle: "From void to form — my craft sequence.",
        testimonialsEyebrow: "Witnesses",
        testimonialsTitle: "What peers and patrons say.",
        faqEyebrow: "Grimoire",
        faqTitle: "Answers for the curious seeker.",
      }
    : {
        aboutEyebrow: "About Me",
        aboutTitle: "I build products that solve real problems.",
        projectsEyebrow: "Featured Work",
        projectsTitle: "Case studies with measurable outcomes.",
        contactEyebrow: "Contact",
        contactTitle: "Let's build your product.",
        servicesEyebrow: "What I Build",
        servicesTitle: "Full-stack development services for startups and agencies.",
        whyMeEyebrow: "Why Work With Me",
        whyMeTitle: "Reliability, performance, and clear communication.",
        processEyebrow: "How I Work",
        processTitle: "A process designed to reduce risk and deliver results.",
        testimonialsEyebrow: "Testimonials",
        testimonialsTitle: "What clients and colleagues say.",
        faqEyebrow: "FAQs",
        faqTitle: "Common questions about working together.",
      };

  return (
    <>
      <main
        ref={mainRef}
        className={cn(
          "portfolio-main relative overflow-x-clip",
          isLotm
            ? "lotm-main bg-[#02050a]"
            : "bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(45,212,191,0.15),transparent_26%),linear-gradient(180deg,#fcfaf5_0%,#f7f1e8_48%,#fcfbf8_100%)]"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-180 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(circle_at_top,black,transparent_82%)]",
            isLotm && "opacity-50"
          )}
        />
        <AvailabilityBanner onOpenEstimator={() => { document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth" }); }} />

        {/* HERO */}
        <section
          id="hero"
          className={cn(
            "relative isolate mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-10",
            isLotm && "lotm-hero"
          )}
        >
          {isLotm ? <div aria-hidden="true" className="lotm-occult-mark" /> : null}
          <div
            data-parallax
            className={cn(
              "pointer-events-none absolute -left-16 top-36 h-44 w-44 rounded-full bg-orange-200/60 blur-3xl",
              isLotm && "bg-[#0d3b66]/50"
            )}
          />
          <div
            data-parallax
            className={cn(
              "pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-teal-200/55 blur-3xl",
              isLotm && "bg-[#f0b85b]/30"
            )}
          />
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div ref={heroCopyRef} className="relative z-10">
              <div
                onMouseEnter={() => {
                  if (!isLotm) {
                    return;
                  }
                  runeHoverTimerRef.current = window.setTimeout(() => {
                    revealOmen("The sigil stirs: pathways unfold for those who linger.");
                  }, 1900);
                }}
                onMouseLeave={() => {
                  window.clearTimeout(runeHoverTimerRef.current);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur",
                  isLotm &&
                    "border-[#d49a3f]/55 bg-[#070b13]/78 font-(family-name:--font-lotm-body) text-[#c8dcff]"
                )}
              >
                <Sparkles className={cn("size-3.5 text-teal-700", isLotm && "text-[#f0b85b]")} />
                {profileSummary.availability}
              </div>

              <h1
                className={cn(
                  "mt-7 max-w-4xl text-balance font-(family-name:--font-space-grotesk) text-5xl leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl",
                  isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                )}
              >
                <span className={cn(isLotm && "lotm-flicker")}>{profileSummary.tagline}</span>
              </h1>

              <p
                className={cn(
                  "mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl",
                  isLotm && "font-(family-name:--font-lotm-body) text-[#bdd3f5]"
                )}
              >
                {profileSummary.name} &mdash; {profileSummary.currentRole}
              </p>

              <p
                className={cn(
                  "mt-4 max-w-2xl text-base leading-7 text-slate-600",
                  isLotm && "font-(family-name:--font-lotm-body) text-[#aac2e5]"
                )}
              >
                {profileSummary.intro}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-500">
                {["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"].map((tech) => (
                  <span key={tech} className="font-medium text-slate-700">
                    {tech}
                    {tech !== "TypeScript" ? <span className="ml-2 text-slate-300">•</span> : null}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {heroHighlights.map((item) => (
                  <span
                    key={item}
                    data-lore={`Pathway clue: ${item}`}
                    className={cn(
                      "mystery-chip rounded-full border border-white/75 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/55 bg-[#0c1522]/80 text-[#d5e4ff]"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  data-ui-feedback
                  className={cn(
                    "h-13 rounded-full bg-slate-950 px-8 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(15,23,42,0.15)] hover:bg-slate-800",
                    isLotm && "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a]"
                  )}
                >
                  <Link href="#contact">
                    Book a Call
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  data-ui-feedback
                  variant="outline"
                  className={cn(
                    "h-13 rounded-full border-slate-300 bg-white/70 px-8 text-sm font-semibold text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/82 text-[#e6f2ff] hover:bg-[#101a2b]"
                  )}
                >
                  <Link href={socialLinks[3].href} target="_blank">
                    <MessageSquare className="size-4" />
                    WhatsApp
                  </Link>
                </Button>
                <Button
                  asChild
                  data-ui-feedback
                  variant="outline"
                  className={cn(
                    "h-13 rounded-full border-slate-300 bg-white/70 px-8 text-sm font-semibold text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/82 text-[#e6f2ff] hover:bg-[#101a2b]"
                  )}
                >
                  <Link href="#projects">
                    View Projects
                    <Eye className="size-4" />
                  </Link>
                </Button>
              </div>

              <div
                ref={heroStatsRef}
                className="mt-12 grid gap-4 sm:grid-cols-3"
              >
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    data-lore={`Omen: ${item.label}`}
                    className={cn(
                      "mystery-card rounded-[28px] border border-white/70 bg-white/72 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/35 bg-[#0a101b]/82"
                    )}
                  >
                    <p
                      className={cn(
                        "font-(family-name:--font-space-grotesk) text-3xl text-slate-950",
                        isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                      )}
                    >
                      {item.value}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-sm text-slate-600",
                        isLotm && "font-(family-name:--font-lotm-body) text-[#b8cdee]"
                      )}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={heroSceneRef}
              className="relative mx-auto flex w-full max-w-140 items-center justify-center"
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-[38px] bg-white/45 blur-3xl",
                  isLotm && "bg-[#0d3b66]/30"
                )}
              />
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-[38px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(252,248,241,0.88))] p-4 shadow-[0_32px_120px_rgba(15,23,42,0.12)] backdrop-blur",
                  isLotm && "border-[#d49a3f]/35 bg-[linear-gradient(180deg,rgba(17,13,24,0.96),rgba(12,10,17,0.95))]"
                )}
              >
                <div
                  className={cn(
                    "relative h-110 overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(216,180,254,0.2),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(103,232,249,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,237,0.9))] sm:h-130",
                    isLotm &&
                      "bg-[radial-gradient(circle_at_top,rgba(176,141,87,0.16),transparent_40%),radial-gradient(circle_at_80%_18%,rgba(122,31,43,0.2),transparent_38%),linear-gradient(180deg,#08101a_0%,#0b1220_58%,#070d16_100%)]"
                  )}
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-[8%] rounded-full border border-[rgba(124,58,237,0.12)] opacity-70 blur-[1px]",
                      isLotm && "border-[#f0b85b]/26"
                    )}
                  />
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(14,165,233,0.1)] opacity-50",
                      isLotm && "border-[#0d3b66]/35"
                    )}
                  />
                  <div className="absolute inset-0 opacity-95">
                    <HeroTarotCards lotmMode={isLotm} />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className={cn(
                      "absolute right-5 top-5 max-w-62.5 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.1)] backdrop-blur",
                      isLotm && "mystery-card border-[#d49a3f]/45 bg-[#090f18]/82 text-[#d8e8ff]"
                    )}
                    data-lore={`Thread marker: ${activeThread.name}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-9 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${activeThread.color}18`, color: activeThread.color }}
                      >
                        <Eye className="size-4" />
                      </span>
                      <div>
                        <p
                          className={cn(
                            "text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500",
                            isLotm && "font-(family-name:--font-lotm-body) text-[#f0b85b]"
                          )}
                        >
                          Skill Thread
                        </p>
                        <p
                          className={cn(
                            "font-(family-name:--font-space-grotesk) text-lg text-slate-950",
                            isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                          )}
                        >
                          {activeThread.name}
                        </p>
                      </div>
                    </div>
                    <p
                      className={cn(
                        "mt-4 text-sm font-semibold text-slate-700",
                        isLotm && "font-(family-name:--font-lotm-body) text-[#cfe1ff]"
                      )}
                    >
                      {activeThread.title}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-6 text-slate-600",
                        isLotm && "font-(family-name:--font-lotm-body) text-[#aec5e7]"
                      )}
                    >
                      {activeThread.detail}
                    </p>
                  </motion.div>

                  <div
                    className={cn(
                      "absolute bottom-5 left-5 rounded-3xl border border-white/80 bg-white/76 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur",
                      isLotm && "mystery-card border-[#d49a3f]/40 bg-[#080d16]/82"
                    )}
                    data-lore="Omen: follow the orbiting chips to inspect pathways"
                  >
                    <p
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-700",
                        isLotm && "font-(family-name:--font-lotm-body) text-[#f0b85b]"
                      )}
                    >
                      Skill Orbit
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-sm text-slate-600",
                        isLotm && "font-(family-name:--font-lotm-body) text-[#aec5e7]"
                      )}
                    >
                      Hover or tap the animated skill chips to inspect each skill thread.
                    </p>
                  </div>

                  <div
                    className={cn(
                      "absolute bottom-5 right-5 rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur",
                      isLotm && "mystery-card border-[#d49a3f]/38 bg-[#090f18]/84"
                    )}
                    data-lore="Bearer profile identified"
                  >
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
                        <p
                          className={cn(
                            "font-(family-name:--font-space-grotesk) text-lg text-slate-950",
                            isLotm && "font-(family-name:--font-lotm-heading) text-[#f2f8ff]"
                          )}
                        >
                          {profileSummary.name}
                        </p>
                        <p
                          className={cn(
                            "text-sm text-slate-600",
                            isLotm && "font-(family-name:--font-lotm-body) text-[#aec5e7]"
                          )}
                        >
                          {profileSummary.currentRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH MARQUEE */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
          <div data-reveal className="space-y-4">
            <div
              className={cn(
                "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500",
                isLotm && "font-(family-name:--font-lotm-body) text-[#aec5e7]"
              )}
            >
              <Wand2 className={cn("size-4 text-teal-700", isLotm && "text-[#f0b85b]")} />
              {isLotm ? "Arcane Motion Stack" : "Production stack"}
            </div>
            <TechMarquee items={techStack} />
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-6 sm:px-8 lg:px-10">
          <div data-reveal className={cn(
            "rounded-[32px] border border-white/70 bg-white/72 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur sm:p-8",
            isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
          )}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-teal-700/10 p-3">
                  <BriefcaseBusiness className={cn("size-6 text-teal-700", isLotm && "text-[#f0b85b]")} />
                </div>
                <div>
                  <p className={cn("font-(family-name:--font-space-grotesk) text-lg text-slate-900", isLotm && "text-[#eef6ff]")}>
                    {profileSummary.currentRole}
                  </p>
                  <p className={cn("text-sm text-slate-500", isLotm && "text-[#aec5e7]")}>
                    {profileSummary.timezone} &middot; Responds {profileSummary.responseTime}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {achievementItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3">
                    <span className={cn("font-(family-name:--font-space-grotesk) text-2xl text-slate-950", isLotm && "text-[#f6fbff]")}>
                      {item.value}
                    </span>
                    <div>
                      <p className={cn("text-xs font-medium text-slate-700", isLotm && "text-[#cfe1ff]")}>
                        {item.label}
                      </p>
                      <p className={cn("text-[10px] text-slate-400", isLotm && "text-[#9db7d9]")}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
<PexelsSection query="abstract tech" gradient="linear-gradient(180deg, rgba(252,250,245,0.88), rgba(252,250,245,0.94))">
          <section
            id="services"
            className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
          >
            <div className="w-full">
              <div data-reveal>
                <SectionHeading
                  eyebrow={sectionCopy.servicesEyebrow}
                  title={sectionCopy.servicesTitle}
                  description="Every service is built with React, Next.js, Node.js, PostgreSQL, TypeScript. You're hiring a delivered outcome, not a technology."
                />
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {servicesData.map((service) => {
                  const imgQuery = {
                    "saas-dev": "dashboard analytics",
                    "mobile-dev": "mobile app",
                    "dashboards": "data dashboard",
                    "ml-ai": "neural network",
                    "backend": "server code",
                    "mvp": "landing page design",
                  }[service.id] || "technology";
                  return (
                  <InteractivePanel
                    key={service.id}
                    data-reveal
                    data-stack-card
                    data-lore={`Service: ${service.title}`}
                    glow="rgba(45, 212, 191, 0.14)"
                    className={cn(
                      "mystery-card rounded-4xl border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <PexelsCardImage query={imgQuery} size="small" className="ring-2 ring-white/60" />
                      <div>
                        <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {service.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {service.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600",
                                isLotm && "border-[#6f6148] bg-[#201928] text-[#c9bead]"
                              )}
                            >
                              <CheckCircle2 className="size-2.5 text-teal-600" />
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </InteractivePanel>
                  );
                })}
              </div>
            </div>
          </section>
        </PexelsSection>

        <PexelsSection query="code screen" gradient="linear-gradient(180deg, rgba(252,250,245,0.9), rgba(252,250,245,0.95))">
        {/* ABOUT */}
        <section
          id="about"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div data-reveal className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              eyebrow={sectionCopy.aboutEyebrow}
              title={sectionCopy.aboutTitle}
              description="I build products people use — fast, maintainable web apps with React, Next.js, Node.js, PostgreSQL. I own features from planning to deployment."
            />

            <div className="grid gap-5">
              {aboutCards.map((card, index) => {
                const imgQuery = {
                  "Outcome-Focused": "analytics dashboard",
                  "Full Ownership": "architect blueprint",
                  "Production Stack": "code screen",
                }[card.title] || "technology";
                return (
                <InteractivePanel
                  key={card.title}
                  data-stack-card
                  data-lore={`Record: ${card.title}`}
                  glow={index % 2 === 0 ? "rgba(45, 212, 191, 0.16)" : "rgba(249, 115, 22, 0.12)"}
                  className={cn(
                    "mystery-card rounded-[30px] border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <PexelsCardImage query={imgQuery} size="small" className="ring-2 ring-white/60" />
                    <div>
                      <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </InteractivePanel>
                );
              })}

              <InteractivePanel
                data-stack-card
                glow="rgba(249, 115, 22, 0.12)"
                className={cn(
                  "mystery-card rounded-[30px] border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                  isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                )}
              >
                <div className="flex items-center gap-2">
                  <Clock3 className="size-4 text-teal-600" />
                  <span className="text-sm text-slate-700">
                    {profileSummary.currentRole} &middot; {profileSummary.timezone} &middot; Responds {profileSummary.responseTime}
                  </span>
                </div>
              </InteractivePanel>
            </div>
          </div>
        </section>
        </PexelsSection>

        {/* PROJECTS */}
        <section
          id="projects"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow={sectionCopy.projectsEyebrow}
                title={sectionCopy.projectsTitle}
                description="Each project includes the problem we solved, the technical approach, and the measurable results delivered."
              />
            </div>

            <div
              data-reveal
              className="mt-8 flex flex-wrap justify-center gap-2.5"
            >
              {projectFilters.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    data-ui-feedback
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] rounded-full border transition duration-300 cursor-pointer shadow-sm active:scale-95",
                      isActive
                        ? isLotm
                          ? "bg-[#c8861f] border-[#f0b85b] text-[#f6fbff] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                          : "bg-slate-950 border-slate-950 text-white shadow-[0_8px_20px_rgba(15,23,42,0.18)]"
                        : isLotm
                        ? "border-[#d49a3f]/30 bg-[#070b13]/80 text-[#bfd5f6] hover:border-[#d49a3f]/65 hover:text-[#f6fbff]"
                        : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-400 hover:text-slate-900"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div data-reveal className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="relative h-[430px] [perspective:1400px]"
                >
                  <motion.div
                    variants={flipCardVariants}
                    className="relative h-full w-full [transform-style:preserve-3d]"
                  >
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <InteractivePanel
                        data-stack-card
                        data-lore={`Artifact: ${project.title}`}
                        className={cn(
                          "mystery-card group h-full overflow-hidden rounded-4xl border border-white/70 bg-white/78 shadow-[0_22px_90px_rgba(15,23,42,0.08)] backdrop-blur",
                          isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                        )}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top transition duration-500 group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-slate-950/35 via-transparent to-transparent" />
                          <span className="absolute right-4 top-4 rounded-full border border-white/65 bg-white/84 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700">
                            {project.category}
                          </span>
                        </div>
                        <div className="flex h-[calc(100%-14rem)] flex-col justify-between p-6">
                          <div>
                            <h3 className="text-hover-float font-(family-name:--font-space-grotesk) text-2xl text-slate-950">
                              {project.title}
                            </h3>
                            <p className="mt-3 text-xs leading-6 text-slate-500">
                              <span className="font-semibold text-slate-700">Problem:</span> {project.problem}
                            </p>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.techStack.slice(0, 3).map((item) => (
                              <span
                                key={`${project.id}-${item}`}
                                className={cn(
                                  "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600",
                                  isLotm && "border-[#6f6148] bg-[#201928] text-[#c9bead]"
                                )}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </InteractivePanel>
                    </div>

                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="flex h-full flex-col rounded-4xl border border-slate-200 bg-[linear-gradient(170deg,#0f172a_0%,#1e293b_52%,#134e4a_100%)] p-6 text-white shadow-[0_22px_90px_rgba(15,23,42,0.24)]">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/90">
                            {project.title}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.techStack.map((item) => (
                              <span
                                key={`${project.id}-back-${item}`}
                                className="rounded-full border border-white/24 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-slate-200"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 space-y-3 text-sm leading-6 text-slate-100/95">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Solution</p>
                            <p className="mt-1">{project.solution}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Result</p>
                            <p className="mt-1">{project.result}</p>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap gap-2 pt-4">
                          <Button
                            type="button"
                            onClick={() => setSelectedCaseStudy(project)}
                            className="h-9 rounded-full bg-teal-400 text-xs px-3.5 font-bold text-slate-950 hover:bg-teal-300 shadow"
                          >
                            <Eye className="size-3.5 mr-1" />
                            Case Study
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="h-9 rounded-full border-white/35 bg-transparent px-3 text-xs text-white hover:bg-white/12"
                          >
                            <Link href={project.liveLink} target="_blank">
                              Demo
                              <ArrowUpRight className="size-3 ml-0.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* WHY WORK WITH ME */}
        <section
          id="why-me"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow={sectionCopy.whyMeEyebrow}
                title={sectionCopy.whyMeTitle}
                description="Freelance clients and agencies care about one thing: can you deliver without headaches? Here's why the answer is yes."
              />
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-5 sm:grid-cols-2">
                {whyWorkWithMe.map((item) => {
                  const imgQuery = {
                    "Production Experience": "office desk",
                    "Faster Performance": "speed chart",
                    "Clear Communication": "team chat",
                    "Web + Mobile": "responsive design",
                  }[item.title] || "technology";
                  return (
                  <InteractivePanel
                    key={item.title}
                    data-reveal
                    data-stack-card
                    data-lore={`Edge: ${item.title}`}
                    className={cn(
                      "mystery-card rounded-4xl border border-white/70 bg-white/78 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <PexelsCardImage query={imgQuery} size="small" className="ring-2 ring-white/60" />
                      <div>
                        <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </InteractivePanel>
                  );
                })}
              </div>

              <InteractivePanel
                data-reveal
                {...cardMotion}
                glow="rgba(249, 115, 22, 0.12)"
                data-lore="Delivery capabilities"
                className={cn(
                  "mystery-card rounded-4xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,245,249,0.9))] p-7 text-slate-900 shadow-[0_24px_90px_rgba(15,23,42,0.12)]",
                  isLotm && "border-[#d49a3f]/36 bg-[linear-gradient(180deg,#0b1220_0%,#070c15_100%)] text-[#e4efff]"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                  What I Can Deliver
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {deliveryCapabilities.map((cap) => (
                    <div
                      key={cap}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3",
                        isLotm && "border-[#6f6148] bg-[#101a2a]"
                      )}
                    >
                      <CheckCircle2 className="size-4 shrink-0 text-teal-600" />
                      <span className="text-sm">{cap}</span>
                    </div>
                  ))}
                </div>
              </InteractivePanel>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow={sectionCopy.processEyebrow}
                title={sectionCopy.processTitle}
                description="A structured process ensures predictable timelines, clear expectations, and a smooth working relationship from start to finish."
              />
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step) => {
                const imgQuery = {
                  "01": "brainstorming meeting",
                  "02": "blueprint architecture",
                  "03": "coding workspace",
                  "04": "quality check",
                  "05": "server deployment",
                  "06": "customer support",
                }[step.number] || "technology";
                return (
                <InteractivePanel
                  key={step.number}
                  data-reveal
                  data-stack-card
                  data-lore={`Phase: ${step.title}`}
                  glow="rgba(45, 212, 191, 0.14)"
                  className={cn(
                    "mystery-card rounded-4xl border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                  )}
                >
                  <div className="flex items-center gap-4">
                      <PexelsCardImage query={imgQuery} size="small" className="ring-2 ring-white/60" />
                      <div>
                        <h3 className="font-(family-name:--font-space-grotesk) text-xl text-slate-950">
                          <span className={cn("text-teal-700/50", isLotm && "text-[#f0b85b]/50")}>{step.number}</span> {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </InteractivePanel>
                  );
                })}
              </div>
            </div>
          </section>

        {/* VIDEO SHOWCASE */}
        <section className="mx-auto w-full max-w-7xl px-5 pb-6 sm:px-8 lg:px-10">
          <section className="mx-auto w-full max-w-7xl px-5 pb-6 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[36px] shadow-[0_28px_120px_rgba(15,23,42,0.18)]">
            <PexelsVideo
              query="office workspace coding"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/20" />
            <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-20 text-center sm:px-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200 backdrop-blur">
                <Sparkles className="size-3.5" />
                Work In Action
              </div>
              <h2 className="max-w-2xl font-(family-name:--font-space-grotesk) text-3xl text-white sm:text-4xl">
                From concept to deployment — I ship production software
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {deliveryCapabilities.slice(0, 6).map((cap) => (
                  <span
                    key={cap}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur"
                  >
                    <CheckCircle2 className="size-3.5 text-cyan-400" />
                    {cap}
                  </span>
                ))}
              </div>
              <Button
                asChild
                className="mt-2 h-12 rounded-full bg-cyan-400 px-8 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                <Link href="#contact">
                  Start Your Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        </section>

        <PexelsSection query="team collaboration" gradient="linear-gradient(180deg, rgba(252,250,245,0.88), rgba(252,250,245,0.94))">
        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow={sectionCopy.testimonialsEyebrow}
                title={sectionCopy.testimonialsTitle}
                description="Feedback from engineering leads, founders, and agency partners."
              />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => {
                const avatarQuery = {
                  "Engineering Lead": "professional man portrait",
                  "SaaS Founder": "business woman portrait",
                  "Agency Client": "creative director portrait",
                }[testimonial.name] || "professional portrait";
                return (
                <InteractivePanel
                  key={testimonial.name}
                  data-reveal
                  data-stack-card
                  data-lore={`Testimony: ${testimonial.name}`}
                  glow={index === 1 ? "rgba(249, 115, 22, 0.12)" : "rgba(45, 212, 191, 0.14)"}
                  className={cn(
                    "mystery-card rounded-4xl border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <PexelsAvatar query={avatarQuery} size="sm" />
                    <div>
                      <p className="font-(family-name:--font-space-grotesk) text-base text-slate-950">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {testimonial.role} &middot; {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-4 text-sm leading-6 text-slate-600">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                </InteractivePanel>
                );
              })}
            </div>
          </div>
        </section>
        </PexelsSection>

        {/* EXPERIENCE */}
        <section
          id="experience"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Experience"
                title="Current role and technical focus areas."
                description="Building production software daily while expanding across the full stack."
              />
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {experienceItems.map((item, index) => {
                const imgQuery = {
                  "Jan 2026 — Present": "office workspace",
                  "Backend & Systems": "server room",
                  "Mobile Development": "mobile phone",
                }[item.period] || "technology";
                return (
                <InteractivePanel
                  key={item.title}
                  data-reveal
                  data-stack-card
                  data-lore={`Chronicle: ${item.period}`}
                  glow={index === 1 ? "rgba(249, 115, 22, 0.12)" : "rgba(45, 212, 191, 0.14)"}
                  className={cn(
                    "mystery-card rounded-4xl border border-white/70 bg-white/76 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                  )}
                >
                  <PexelsCardImage query={imgQuery} size="small" className="mb-4 ring-2 ring-white/60" />
                  <div className="flex items-center gap-2 text-teal-700">
                    <BriefcaseBusiness className="size-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.26em]">
                      {item.period}
                    </p>
                  </div>
                  <h3 className="mt-4 font-(family-name:--font-space-grotesk) text-2xl text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </InteractivePanel>
                );
              })}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Skills & Tools"
                title="Technologies I use daily to ship production software."
                description="From frontend to backend to deployment — every tool here has been used in real client projects."
              />
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-5 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <InteractivePanel
                    key={group.title}
                    data-reveal
                    data-stack-card
                    data-lore={`Pathway: ${group.title}`}
                    className={cn(
                      "mystery-card rounded-[30px] border border-white/70 bg-white/78 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                    )}
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
                data-lore="Scripture: engineering principles"
                className={cn(
                  "mystery-card rounded-4xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,245,249,0.9))] p-7 text-slate-900 shadow-[0_24px_90px_rgba(15,23,42,0.12)]",
                  isLotm && "border-[#d49a3f]/36 bg-[linear-gradient(180deg,#0b1220_0%,#070c15_100%)] text-[#e4efff]"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                  Working Style
                </p>
                <div className="mt-6 space-y-5">
                  {workflowPrinciples.map((item) => (
                    <div
                      key={item.title}
                      className={cn(
                        "rounded-3xl border border-white/70 bg-white/75 p-5",
                        isLotm && "border-[#6f6148] bg-[#101a2a]"
                      )}
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

        {/* TECH STACK */}
        <section
          id="tech-stack"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow="Tech Stack"
                title="Tools selected for speed, polish, and production reliability."
                description="Every tool here is chosen for real-world performance, not trends."
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {techStack.map((item) => (
                <InteractivePanel
                  key={item.name}
                  data-reveal
                  data-lore={`Tool sigil: ${item.name}`}
                  className={cn(
                    "mystery-card rounded-full border border-white/75 bg-white/76 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.07)]",
                    isLotm && "border-[#d49a3f]/35 bg-[#0b1320]/80"
                  )}
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

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full max-w-4xl mx-auto">
            <div data-reveal>
              <SectionHeading
                eyebrow={sectionCopy.faqEyebrow}
                title={sectionCopy.faqTitle}
                description="Quick answers to the most common questions about working together."
                align="center"
              />
            </div>

            <div data-reveal className="mt-12 space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  isLotm={isLotm}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ESTIMATOR */}
        <section id="estimator" className="mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10">
          <ProjectEstimator
            onRequestQuote={(quoteSummary) => {
              const msgArea = document.querySelector("textarea[name='message']");
              if (msgArea) {
                msgArea.value = quoteSummary;
              }
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </section>

        <PexelsSection query="modern office" gradient="linear-gradient(180deg, rgba(252,250,245,0.9), rgba(252,250,245,0.95))">
        {/* CONTACT */}
        <section
          id="contact"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.95fr]">
            <InteractivePanel
              data-reveal
              {...cardMotion}
              glow="rgba(45, 212, 191, 0.12)"
              data-lore="Ritual: reach across the fog"
              className={cn(
                "mystery-card rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,245,237,0.92))] p-8 text-slate-900 shadow-[0_28px_120px_rgba(15,23,42,0.12)]",
                isLotm &&
                  "border-[#d49a3f]/40 bg-[linear-gradient(180deg,#0b1320_0%,#070a12_100%)] text-[#e4efff]"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
                {sectionCopy.contactEyebrow}
              </p>
              <h2
                className={cn(
                  "mt-5 max-w-xl font-(family-name:--font-space-grotesk) text-4xl text-slate-950 sm:text-5xl",
                  isLotm && "font-(family-name:--font-lotm-heading) text-[#f2f8ff]"
                )}
              >
                {sectionCopy.contactTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                Looking for a React/Next.js developer? Free discovery call to discuss scope, timeline, and budget.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/70 bg-white/75 p-5">
                  <div className="flex items-center gap-3 text-teal-700">
                    <MapPin className="size-5" />
                    <div>
                      <span className="text-sm font-medium block">{profileSummary.location}</span>
                      <span className="text-xs text-slate-500">{profileSummary.timezone}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/70 bg-white/75 p-5">
                  <div className="flex items-center gap-3 text-teal-700">
                    <Clock3 className="size-5" />
                    <div>
                      <span className="text-sm font-medium block">{profileSummary.responseTime}</span>
                      <span className="text-xs text-slate-500">Typical response time</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className={cn(
                    "h-12 rounded-full bg-slate-950 px-6 text-white hover:bg-slate-800",
                    isLotm && "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a]"
                  )}
                >
                  <Link href={profileSummary.bookCallLink}>
                    Book a Discovery Call
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "h-12 rounded-full border-slate-300 bg-transparent px-6 text-slate-800",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/72 text-[#deebff] hover:bg-[#101a2a]"
                  )}
                >
                  <Link href={socialLinks[3].href} target="_blank">
                    Message on WhatsApp
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "h-12 rounded-full border-slate-300 bg-transparent px-6 text-slate-800",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/72 text-[#deebff] hover:bg-[#101a2a]"
                  )}
                >
                  <Link href={socialLinks[1].href} target="_blank">
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </InteractivePanel>

            <div className="grid gap-5">
              {contactCards.map((card) => (
                <InteractivePanel
                  key={card.title}
                  data-reveal
                  data-lore={`Ritual note: ${card.title}`}
                  className={cn(
                    "mystery-card rounded-4xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/35 bg-[#0a101b]/82"
                  )}
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
                className={cn(
                  "mystery-card rounded-4xl border border-dashed border-slate-300 bg-white/70 p-6",
                  isLotm && "border-[#d49a3f]/45 bg-[#090f18]/82"
                )}
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
        </PexelsSection>

        <footer className="mx-auto w-full max-w-7xl px-5 pb-10 pt-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 border-t border-slate-200/80 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Adarsh Pathania — Available for freelance projects. <Link href="#contact" className="text-teal-700 underline-offset-2 hover:underline">Let's talk.</Link></p>
            <p>Built with Next.js, Tailwind CSS, Three.js, and PostgreSQL.</p>
          </div>
        </footer>

        {omenMessage ? (
          <div className="pointer-events-none fixed bottom-5 right-5 z-40 max-w-sm rounded-2xl border border-[#d49a3f]/45 bg-[#070b13]/90 px-4 py-3 text-sm text-[#dde9ff] shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f0b85b]">
              Hidden Omen
            </p>
            <p className="mt-2 font-(family-name:--font-lotm-body)">{omenMessage}</p>
          </div>
        ) : null}
      </main>

      <CommandPalette />
      <CaseStudyModal project={selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} />

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
