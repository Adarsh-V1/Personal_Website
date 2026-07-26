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
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  Copy,
  Eye,
  HelpCircle,
  MapPin,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import SectionHeading from "./section-heading";
import GuidedTour from "./guided-tour";
import InteractivePanel from "./interactive-panel";
import CommandPalette from "./command-palette";
import {
  Dev21ServiceCard,
  Dev21AboutCard,
  Dev21WhyMeCard,
  Dev21ProcessCard,
} from "./dev21-cards";
import CaseStudyModal from "./case-study-modal";
import { PexelsSection, PexelsCardImage, PexelsAvatar, PexelsCardBg, PexelsVideo } from "./pexels-media";
import {
  aboutCards,
  experienceItems,
  faqs,
  heroStats,
  heroThreads,
  processSteps,
  profileSummary,
  projects,
  servicesData,
  socialLinks,
  techStack,
  testimonials,
  tourSteps,
  whyWorkWithMe,
} from "../../data/portfolio";
import { cn } from "../../utils/cn";
import FeaturedProjectsSection from "./featured-projects-section";

gsap.registerPlugin(ScrollTrigger);

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
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

function AnimatedCount({ value, className }) {
  const [display, setDisplay] = useState("");
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const match = String(value).match(/^([^\d]*)(\d+)(.*)$/);
          if (!match) { setDisplay(value); return; }
          const prefix = match[1];
          const num = parseInt(match[2]);
          const suffix = match[3];
          let current = 0;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 1500, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(eased * num);
            setDisplay(prefix + current + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref} className={className}>{display || value}</span>;
}

function FAQItem({ question, answer, isOpen, onToggle, isLotm }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md",
        isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82 hover:border-[#f0b85b]/30",
        isOpen && "border-teal-500/40 shadow-md",
        isLotm && isOpen && "border-[#f0b85b]/40"
      )}
    >
      <div className="relative z-10">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        >
          <span className="flex items-start gap-3">
            <HelpCircle className={cn(
              "mt-0.5 size-4 shrink-0 text-teal-600",
              isLotm && "text-[#f0b85b]"
            )} />
            <span className={cn(
              "font-(family-name:--font-space-grotesk) text-sm font-semibold text-slate-900",
              isLotm && "font-(family-name:--font-lotm-heading) text-[#e8f2ff]"
            )}>
              {question}
            </span>
          </span>
          <ChevronDown className={cn(
            "size-4 shrink-0 text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180 text-teal-600",
            isLotm && isOpen && "text-[#f0b85b]"
          )} />
        </button>
        <div className={cn(
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}>
          <div className="overflow-hidden">
            <p className={cn(
              "px-5 pb-4 text-sm leading-6 text-slate-600",
              isLotm && "text-[#b9cff2]"
            )}>
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyEmailButton({ isLotm }) {
  const [copied, setCopied] = useState(false);
  const email = "adarsh.pathania.04@gmail.com";
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-white/60 px-4 py-2 text-xs font-medium text-slate-500 transition-all hover:border-teal-500/40 hover:text-teal-700 hover:shadow-sm",
        isLotm && "border-[#d49a3f]/35 bg-[#070b13]/70 text-[#8899bb] hover:border-[#f0b85b]/40 hover:text-[#f0b85b]"
      )}
    >
      {copied ? (
        <><Check className="size-3 text-teal-600" /> Copied!</>
      ) : (
        <><Copy className="size-3" /> {email}</>
      )}
    </button>
  );
}

export default function PortfolioShell() {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroStatsRef = useRef(null);
  const heroBgRef = useRef(null);
  const konamiRef = useRef([]);
  const runeHoverTimerRef = useRef(null);
  const omenTimerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeThread, setActiveThread] = useState(heroThreads[0]);

  const handleHeroMouse = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tourPromptOpen, setTourPromptOpen] = useState(false);
  const [activeTourStep, setActiveTourStep] = useState(-1);
  const [omenMessage, setOmenMessage] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

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

    const handleScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("lotm:omen", handleOmenEvent);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(omenTimerRef.current);
      window.clearTimeout(runeHoverTimerRef.current);
    };
  }, [revealOmen]);

  useEffect(() => {
    if (testimonialPaused || testimonials.length < 2) return;
    const id = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonialPaused, testimonials.length]);

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

      if (heroBgRef.current) {
        const floats = heroBgRef.current.querySelectorAll(".gsap-float");
        floats.forEach((el) => {
          const delay = parseFloat(el.getAttribute("data-delay")) || 0;
          gsap.to(el, {
            y: "+=18",
            rotation: "+=4",
            duration: 3.5 + delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay,
          });
        });
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

        {/* Persistent background video — single source across all sections */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <PexelsVideo
            query={isLotm ? "dark technology abstract" : "technology coding workspace"}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Section overlay gradients — each section gets its own vibe */}
        {[
          { id: "hero", gradient: isLotm ? "from-[#02050a]/96 via-[#02050a]/90 to-[#02050a]/98" : "from-white/95 via-white/88 to-white/96" },
          { id: "services", gradient: isLotm ? "from-[#02050a]/94 via-[#030914]/88 to-[#02050a]/96" : "from-teal-50/90 via-white/85 to-teal-50/88" },
          { id: "projects", gradient: isLotm ? "from-[#02050a]/94 via-[#030914]/88 to-[#02050a]/96" : "from-blue-50/88 via-white/85 to-blue-50/85" },
          { id: "about", gradient: isLotm ? "from-[#02050a]/94 via-[#030914]/88 to-[#02050a]/96" : "from-amber-50/88 via-white/85 to-amber-50/85" },
          { id: "testimonials", gradient: isLotm ? "from-[#02050a]/94 via-[#030914]/88 to-[#02050a]/96" : "from-purple-50/88 via-white/85 to-purple-50/85" },
          { id: "faq", gradient: isLotm ? "from-[#02050a]/94 via-[#030914]/88 to-[#02050a]/96" : "from-slate-50/90 via-white/88 to-slate-50/88" },
          { id: "contact", gradient: isLotm ? "from-[#02050a]/94 via-[#030914]/88 to-[#02050a]/96" : "from-emerald-50/90 via-white/88 to-emerald-50/90" },
        ].map(({ id, gradient }) => (
          <div key={id} aria-hidden="true" className={cn(
            "pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700",
            "bg-gradient-to-b",
            gradient
          )} data-section-bg={id} />
        ))}

        {/* HERO */}
        <section
          ref={heroRef}
          id="hero"
          onMouseMove={handleHeroMouse}
          className={cn(
            "relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden",
            isLotm && "lotm-hero"
          )}
        >
          <div
            ref={heroBgRef}
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="gsap-float absolute left-[6%] top-[18%] size-36 rotate-12 opacity-[0.07] blur-sm">
              <PexelsCardImage query="code screen" size="large" className="!size-36" />
            </div>
            <div className="gsap-float absolute right-[10%] top-[12%] size-28 -rotate-6 opacity-[0.06] blur-sm" data-delay="0.3">
              <PexelsCardImage query="dashboard analytics" size="large" className="!size-28" />
            </div>
            <div className="gsap-float absolute left-[4%] bottom-[28%] size-24 rotate-45 opacity-[0.07] blur-sm" data-delay="0.6">
              <PexelsCardImage query="team meeting" size="large" className="!size-24" />
            </div>
            <div className="gsap-float absolute right-[6%] bottom-[22%] size-32 -rotate-12 opacity-[0.05] blur-sm" data-delay="0.9">
              <PexelsCardImage query="mobile technology" size="large" className="!size-32" />
            </div>
          </div>

          <div className={cn(
            "pointer-events-none absolute -left-20 top-36 h-52 w-52 rounded-full bg-orange-300/25 blur-3xl",
            isLotm && "bg-[#0d3b66]/40"
          )} />
          <div className={cn(
            "pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl",
            isLotm && "bg-[#f0b85b]/20"
          )} />
          <div className="pointer-events-none absolute bottom-16 left-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-300/15 blur-3xl" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-24">
            {isLotm ? <div aria-hidden="true" className="lotm-occult-mark" /> : null}

            <motion.div
              ref={heroCopyRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex w-full flex-col items-center text-center"
              style={{
                transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-xl",
                  isLotm && "border-[#d49a3f]/55 bg-[#070b13]/78 font-(family-name:--font-lotm-body) text-[#c8dcff]"
                )}
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Full-Stack Developer &middot; Available for Freelance
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={cn(
                  "mt-8 max-w-4xl text-balance font-(family-name:--font-space-grotesk) text-5xl font-extrabold leading-[1.02] text-slate-950 sm:text-6xl lg:text-7xl tracking-tight",
                  isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                )}
              >
                I Build{" "}
                <span className="animated-gradient-text bg-gradient-to-r from-teal-600 via-emerald-600 via-cyan-500 to-teal-600 bg-clip-text text-transparent dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-400">
                  Production-Ready
                </span>{" "}
                Web Applications.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className={cn(
                  "mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700 dark:text-slate-300 sm:text-xl",
                  isLotm && "font-(family-name:--font-lotm-body) text-[#bdd3f5]"
                )}
              >
                {profileSummary.intro}
              </motion.p>

              {/* Thread selector — interactive specialization pills */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-6"
              >
                <div className="flex flex-wrap justify-center gap-1.5">
                  {heroThreads.map((thread) => (
                    <button
                      key={thread.name}
                      onClick={() => handleActiveThreadChange(thread)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-md",
                        activeThread?.name === thread.name
                          ? "border-teal-500/50 bg-teal-500/15 text-teal-700"
                          : "border-white/70 bg-white/60 text-slate-700 hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-600",
                        isLotm && (
                          activeThread?.name === thread.name
                            ? "border-[#f0b85b]/60 bg-[#f0b85b]/15 text-[#f0b85b]"
                            : "border-[#d49a3f]/55 bg-[#0c1522]/80 text-[#c8dcff] hover:border-[#f0b85b]/40 hover:bg-[#1a2538] hover:text-[#f6fbff]"
                        )
                      )}
                    >
                      {thread.name}
                    </button>
                  ))}
                </div>
                {activeThread && (
                  <motion.p
                    key={activeThread.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400"
                  >
                    {activeThread.detail}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-8 flex flex-wrap justify-center gap-3.5"
              >
                <Button
                  asChild
                  data-ui-feedback
                  className={cn(
                    "group/btn h-12 rounded-full bg-slate-950 px-7 text-sm font-bold text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-[0_24px_60px_rgba(15,23,42,0.28)] active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
                    isLotm && "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a] hover:shadow-[0_24px_60px_rgba(240,184,91,0.24)]"
                  )}
                >
                  <Link href="#contact">
                    Book a Call
                    <ArrowRight className="size-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  data-ui-feedback
                  variant="outline"
                  className={cn(
                    "group/btn h-12 rounded-full border-white/70 bg-white/70 px-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/82 text-[#e6f2ff] hover:bg-[#101a2b]"
                  )}
                >
                  <Link href={socialLinks[3].href} target="_blank">
                    <MessageSquare className="size-4 mr-1.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                    WhatsApp
                  </Link>
                </Button>
                <Button
                  asChild
                  data-ui-feedback
                  variant="outline"
                  className={cn(
                    "group/btn h-12 rounded-full border-white/70 bg-white/70 px-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/82 text-[#e6f2ff] hover:bg-[#101a2b]"
                  )}
                >
                  <Link href="#projects">
                    View Case Studies
                    <Eye className="size-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                ref={heroStatsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 grid w-full max-w-lg gap-3.5 sm:grid-cols-3"
              >
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "group/stat relative overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80",
                      isLotm && "border-[#d49a3f]/35 bg-[#0a101b]/82"
                    )}
                  >
                    <p
                      className={cn(
                        "font-(family-name:--font-space-grotesk) text-2xl font-extrabold text-slate-950 dark:text-white",
                        isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                      )}
                    >
                      <AnimatedCount value={item.value} />
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
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Scroll
            </span>
            <div className="flex flex-col items-center gap-0.5">
              <div className="size-1 rounded-full bg-slate-400 dark:bg-slate-600 animate-[bounce_1.5s_infinite_0ms]" />
              <div className="size-1 rounded-full bg-slate-400 dark:bg-slate-600 animate-[bounce_1.5s_infinite_200ms]" />
              <div className="size-1 rounded-full bg-slate-400 dark:bg-slate-600 animate-[bounce_1.5s_infinite_400ms]" />
            </div>
          </div>
        </section>

        {/* SERVICES */}
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

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {servicesData.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                  className="relative group/service"
                >
                  <span className={cn(
                    "pointer-events-none absolute -left-2 -top-2 z-10 select-none text-[56px] font-black leading-none text-teal-600/8 transition-all duration-300 group-hover/service:text-teal-600/15 group-hover/service:scale-110",
                    isLotm && "text-[#f0b85b]/8 group-hover/service:text-[#f0b85b]/15"
                  )}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Dev21ServiceCard service={service} isLotm={isLotm} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS — premium case-study cards */}
        <FeaturedProjectsSection />

        {/* PROJECTS — compact grid with hover reveal */}
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

            {/* Category filters */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-md",
                    activeCategory === cat
                      ? "border-teal-500/50 bg-teal-500/15 text-teal-700"
                      : "border-white/70 bg-white/60 text-slate-600 hover:border-teal-500/30 hover:text-teal-600",
                    isLotm && (
                      activeCategory === cat
                        ? "border-[#f0b85b]/60 bg-[#f0b85b]/15 text-[#f0b85b]"
                        : "border-[#d49a3f]/45 bg-[#0c1522]/80 text-[#b9cff2] hover:border-[#f0b85b]/40 hover:text-[#f6fbff]"
                    )
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.length === 0 ? (
                <p className="col-span-full py-12 text-center text-sm text-slate-400">No projects match this category.</p>
              ) : (
                filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedCaseStudy(project)}
                  className={cn(
                    "group/project relative cursor-pointer overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                    isLotm && "border-[#d49a3f]/30 bg-[#0a101b]/80"
                  )}
                >
                  <div className="relative h-36 overflow-hidden sm:h-44">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover/project:scale-105">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className={cn(
                        "rounded-full border border-white/60 bg-white/85 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur",
                        isLotm && "border-[#d49a3f]/40 bg-[#0c1522]/90 text-[#d5e4ff]"
                      )}>
                        {project.category}
                      </span>
                      <span className="flex size-6 items-center justify-center rounded-full bg-white/85 text-[10px] font-bold text-slate-500">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className={cn(
                      "font-(family-name:--font-space-grotesk) font-bold text-slate-950 leading-tight text-sm sm:text-base",
                      isLotm && "text-[#eef6ff]"
                    )}>
                      {project.title}
                    </h3>

                    <div className="mt-2 space-y-1">
                      <p className={cn(
                        "text-xs leading-5 text-slate-500 line-clamp-2",
                        isLotm && "text-[#b9cff2]"
                      )}>
                        {project.problem}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((t) => (
                        <span
                          key={`${project.id}-${t}`}
                          className={cn(
                            "rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500",
                            isLotm && "border-[#6f6148] bg-[#201928] text-[#c9bead]"
                          )}
                        >
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{project.techStack.length - 3}</span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-600 opacity-0 transition-all duration-200 group-hover/project:opacity-100 group-hover/project:translate-x-0 -translate-x-1">
                      <span>View case study</span>
                      <ArrowRight className="size-3" />
                    </div>
                  </div>
                </motion.div>
              )))}
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="relative mx-auto w-32 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
        </div>

        {/* ABOUT — multi-layout: cards grid + condensed timeline + process grid */}
        <section
          id="about"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
          >
            <div className="w-full">
              <div data-reveal>
                <SectionHeading
                  eyebrow={sectionCopy.aboutEyebrow}
                  title={sectionCopy.aboutTitle}
                  description="Who I am, what I believe, and how I ship production software."
                />
              </div>

              {/* Current Role — compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "relative mt-10 overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-white/90 to-teal-50/40 p-5 shadow-sm backdrop-blur",
                  isLotm && "border-[#d49a3f]/36 bg-gradient-to-br from-[#0a101b]/95 to-[#0f1a2e]/80"
                )}
              >
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-teal-700">
                      <BriefcaseBusiness className="size-3.5" />
                      <span className={cn("text-[10px] font-semibold uppercase tracking-[0.28em]", isLotm && "text-[#f0b85b]")}>Current Role</span>
                    </div>
                    <h3 className={cn("mt-2 font-(family-name:--font-space-grotesk) text-base font-bold text-slate-950", isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]")}>
                      {profileSummary.currentRole}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="size-3 text-teal-600" /> {profileSummary.location}</span>
                      <span className="flex items-center gap-1"><Clock3 className="size-3 text-teal-600" /> {profileSummary.responseTime}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 self-start rounded-full bg-teal-500/10 px-3 py-1.5 text-[10px] font-semibold text-teal-700">
                    <span className="size-1.5 rounded-full bg-teal-500 animate-ping" />
                    Available
                  </div>
                </div>
              </motion.div>

              {/* How I Work — merged philosophy + why-work-with-me */}
              <div className="mt-10">
                <p className={cn("mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400", isLotm && "text-[#b4c8e3]")}>How I Work</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {aboutCards.map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      <Dev21AboutCard card={card} isLotm={isLotm} />
                    </motion.div>
                  ))}
                  {whyWorkWithMe.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: (i + aboutCards.length) * 0.06 }}
                    >
                      <Dev21WhyMeCard title={item.title} description={item.description} isLotm={isLotm} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Experience — compact timeline */}
              <div className="mt-10">
                <p className={cn("mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400", isLotm && "text-[#b4c8e3]")}>Experience</p>
                <div className="relative">
                  <div className="absolute left-[13px] top-0 h-full w-0.5 bg-gradient-to-b from-amber-500/30 via-teal-500/20 to-transparent" />
                  <div className="space-y-5">
                    {experienceItems.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="relative pl-9"
                      >
                        <div className="absolute left-[7px] top-1.5 size-2.5 rounded-full border-2 border-amber-400 bg-white shadow-sm" />
                        <div className={cn("rounded-xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur", isLotm && "border-[#d49a3f]/30 bg-[#0a101b]/75")}>
                          <span className={cn("text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-600", isLotm && "text-[#f0b85b]")}>{item.period}</span>
                          <h3 className={cn("mt-1 font-(family-name:--font-space-grotesk) text-base font-bold text-slate-950", isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]")}>{item.title}</h3>
                          <p className={cn("mt-1 text-sm leading-5 text-slate-600", isLotm && "text-[#b9cff2]")}>{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Process — compact 2-col grid */}
              <div className="mt-10">
                <p className={cn("mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400", isLotm && "text-[#b4c8e3]")}>Process</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                    >
                      <Dev21ProcessCard step={step} isLotm={isLotm} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies — compact badge wall */}
              <div className="mt-10">
                <p className={cn("mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400", isLotm && "text-[#b4c8e3]")}>Technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((t) => (
                    <span
                      key={t.name}
                      className={cn(
                        "rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[10px] font-medium text-slate-600 shadow-sm backdrop-blur transition-all hover:scale-105 hover:border-teal-500/60 hover:bg-teal-500/8 hover:text-teal-700 hover:shadow-md",
                        isLotm && "border-[#4a5a7a]/50 bg-[#0c1522]/80 text-[#a8c0e8] hover:border-[#f0b85b]/40 hover:bg-[#1a2538] hover:text-[#f0b85b]"
                      )}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

        {/* TESTIMONIALS — carousel */}
        <section
          id="testimonials"
          className="mx-auto flex min-h-screen w-full max-w-5xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full">
            <div data-reveal>
              <SectionHeading
                eyebrow={sectionCopy.testimonialsEyebrow}
                title={sectionCopy.testimonialsTitle}
                description="Feedback from engineering leads, founders, and agency partners."
                align="center"
              />
            </div>

            <div
              className="relative mt-12"
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => setTestimonialPaused(false)}
            >
              {testimonials.map((t, i) => {
                const avatarQuery = {
                  "Engineering Lead": "professional man portrait",
                  "SaaS Founder": "business woman portrait",
                  "Agency Client": "creative director portrait",
                }[t.name] || "professional portrait";
                return (
                  <motion.div
                    key={t.name}
                    initial={false}
                    animate={{
                      opacity: i === activeTestimonial ? 1 : 0,
                      scale: i === activeTestimonial ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={cn(
                      "relative overflow-hidden rounded-[32px] border border-white/70 bg-white/78 shadow-[0_20px_80px_rgba(15,23,42,0.08)]",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82",
                      i !== activeTestimonial && "pointer-events-none absolute inset-0"
                    )}
                  >
                    <PexelsCardBg query={avatarQuery} className="absolute inset-0 opacity-[0.04]" />
                    <div className="relative z-10 p-8 sm:p-10">
                      <span className={cn(
                        "select-none text-[120px] font-heading leading-none text-teal-600/10 sm:text-[160px]",
                        isLotm && "text-[#f0b85b]/10"
                      )}>&ldquo;</span>
                      <blockquote className={cn(
                        "-mt-12 text-xl leading-relaxed text-slate-700 sm:text-2xl sm:leading-relaxed",
                        isLotm && "font-(family-name:--font-lotm-body) text-[#cfe2ff]"
                      )}>
                        {t.content}
                      </blockquote>
                      <div className="mt-6 flex items-center gap-4">
                        <PexelsAvatar query={avatarQuery} size="lg" />
                        <div>
                          <p className={cn(
                            "font-(family-name:--font-space-grotesk) text-lg font-semibold text-slate-950",
                            isLotm && "font-(family-name:--font-lotm-heading) text-[#eef6ff]"
                          )}>{t.name}</p>
                          <p className={cn("text-sm text-slate-500", isLotm && "text-[#aec5e7]")}>
                            {t.role} &middot; {t.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => setActiveTestimonial((p) => (p === 0 ? testimonials.length - 1 : p - 1))}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition-all hover:border-teal-500/40 hover:text-teal-700 active:scale-90",
                  isLotm && "border-[#d49a3f]/40 bg-[#070b13]/70 text-[#b9cff2] hover:border-[#f0b85b]/50 hover:text-[#f0b85b]"
                )}
                aria-label="Previous testimonial"
              >
                <ChevronDown className="size-4 rotate-90" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      "size-2 rounded-full transition-all duration-300",
                      i === activeTestimonial
                        ? "w-6 bg-teal-600"
                        : "bg-slate-300 hover:bg-slate-400",
                      isLotm && (i === activeTestimonial ? "bg-[#f0b85b]" : "bg-[#2a3a5a] hover:bg-[#4a6a9a]")
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((p) => (p === testimonials.length - 1 ? 0 : p + 1))}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition-all hover:border-teal-500/40 hover:text-teal-700 active:scale-90",
                  isLotm && "border-[#d49a3f]/40 bg-[#070b13]/70 text-[#b9cff2] hover:border-[#f0b85b]/50 hover:text-[#f0b85b]"
                )}
                aria-label="Next testimonial"
              >
                <ChevronDown className="size-4 -rotate-90" />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ — 2-column grid expandable cards */}
        <section
          id="faq"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full max-w-5xl mx-auto">
            <div data-reveal className="text-center">
              <SectionHeading
                eyebrow={sectionCopy.faqEyebrow}
                title={sectionCopy.faqTitle}
                description="Quick answers to the most common questions about working together."
                align="center"
              />
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIndex === index}
                    onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    isLotm={isLotm}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT — single centered column */}
        <section
          id="contact"
          className="mx-auto flex min-h-screen w-full max-w-3xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <InteractivePanel
            data-reveal
            {...cardMotion}
            glow="rgba(45, 212, 191, 0.12)"
            data-lore="Ritual: reach across the fog"
            className={cn(
              "mystery-card w-full rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,245,237,0.92))] p-8 text-center text-slate-900 shadow-[0_28px_120px_rgba(15,23,42,0.12)]",
              isLotm &&
                "border-[#d49a3f]/40 bg-[linear-gradient(180deg,#0b1320_0%,#070a12_100%)] text-[#e4efff]"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
              {sectionCopy.contactEyebrow}
            </p>
            <h2
              className={cn(
                "mx-auto mt-5 max-w-xl font-(family-name:--font-space-grotesk) text-4xl text-slate-950 sm:text-5xl",
                isLotm && "font-(family-name:--font-lotm-heading) text-[#f2f8ff]"
              )}
            >
              {sectionCopy.contactTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-600">
              Looking for a React/Next.js developer? Free discovery call to discuss scope, timeline, and budget.
            </p>

            <div className="mx-auto mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                className={cn(
                  "group/btn h-12 rounded-full bg-slate-950 px-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-[0_24px_60px_rgba(15,23,42,0.28)] active:scale-95",
                  isLotm && "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a] hover:shadow-[0_24px_60px_rgba(240,184,91,0.24)]"
                )}
              >
                <Link href={profileSummary.bookCallLink}>
                  Book a Discovery Call
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "group/btn h-12 rounded-full border-slate-300 bg-transparent px-6 text-slate-800 transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-md active:scale-95",
                  isLotm && "border-[#d49a3f]/50 bg-[#070b13]/72 text-[#deebff] hover:bg-[#101a2a]"
                )}
              >
                <Link href={socialLinks[3].href} target="_blank">
                  Message on WhatsApp
                </Link>
              </Button>
            </div>

            <div className="mx-auto mt-8 flex items-center justify-center gap-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-teal-600" /> {profileSummary.location}</span>
              <span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-teal-600" /> {profileSummary.responseTime}</span>
            </div>

            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  className={cn(
                    "rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/40 hover:bg-teal-500/5 hover:text-teal-700 hover:shadow-sm",
                    isLotm && "border-[#d49a3f]/30 bg-[#070b13]/70 text-[#deebff] hover:border-[#f0b85b]/50 hover:text-[#f0b85b]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mx-auto mt-5">
              <CopyEmailButton isLotm={isLotm} />
            </div>
          </InteractivePanel>
        </section>

        <footer className="mx-auto w-full max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:px-10">
          <div className={cn(
            "rounded-[32px] border border-white/70 bg-white/78 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur sm:p-10",
            isLotm && "border-[#d49a3f]/30 bg-[#0a101b]/85"
          )}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={cn(
                  "font-(family-name:--font-space-grotesk) text-lg font-bold text-slate-950",
                  isLotm && "text-[#eef6ff]"
                )}>
                  Adarsh Pathania
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for freelance projects.
                </p>
              </div>
              <div className="flex gap-2">
                {socialLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className={cn(
                      "rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/40 hover:bg-teal-500/5 hover:text-teal-700 hover:shadow-sm",
                      isLotm && "border-[#d49a3f]/30 bg-[#070b13]/70 text-[#deebff] hover:border-[#f0b85b]/50 hover:text-[#f0b85b]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-2 border-t border-slate-200/60 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; {new Date().getFullYear()} Adarsh Pathania. All rights reserved.</p>
              <p>Built with Next.js, Tailwind CSS, Three.js &amp; PostgreSQL.</p>
            </div>
          </div>
        </footer>

        {/* Back to top */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "fixed bottom-6 left-6 z-40 flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/80 shadow-lg backdrop-blur transition-shadow hover:shadow-xl",
            isLotm && "border-[#d49a3f]/40 bg-[#070b13]/85 text-[#deebff]"
          )}
        >
          <ArrowUp className="size-4" />
        </motion.button>

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
