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
  Eye,
  MapPin,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import SectionHeading from "./section-heading";
import GuidedTour from "./guided-tour";
import InteractivePanel from "./interactive-panel";
import CommandPalette from "./command-palette";
import { Dev21ServiceCard } from "./dev21-cards";
import CaseStudyModal from "./case-study-modal";
import { PexelsSection, PexelsCardImage, PexelsAvatar, PexelsCardBg, PexelsVideo } from "./pexels-media";
import {
  aboutCards,
  contactCards,
  experienceItems,
  faqs,
  heroStats,
  heroThreads,
  processSteps,
  profileSummary,
  projects,
  servicesData,
  socialLinks,
  testimonials,
  tourSteps,
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
        "relative overflow-hidden rounded-3xl border border-white/70 bg-white/75 transition-all duration-300",
        isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
      )}
    >
      <PexelsCardBg query="abstract tech" className="absolute inset-0 opacity-[0.04]" />
      <div className="relative z-10">
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
    </div>
  );
}

export default function PortfolioShell() {
  const { resolvedTheme } = useTheme();
  const isLotm = resolvedTheme === "lotm";
  const mainRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroStatsRef = useRef(null);
  const heroBgRef = useRef(null);
  const konamiRef = useRef([]);
  const runeHoverTimerRef = useRef(null);
  const omenTimerRef = useRef(null);
  const [activeThread, setActiveThread] = useState(heroThreads[0]);

  const [tourPromptOpen, setTourPromptOpen] = useState(false);
  const [activeTourStep, setActiveTourStep] = useState(-1);
  const [omenMessage, setOmenMessage] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

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

        {/* HERO */}
        <section
          id="hero"
          className={cn(
            "relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden",
            isLotm && "lotm-hero"
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            <PexelsVideo
              query={isLotm ? "dark technology abstract" : "technology coding workspace"}
              className="absolute inset-0 h-full w-full scale-125"
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/98",
              isLotm && "from-[#02050a]/96 via-[#02050a]/88 to-[#02050a]/98"
            )} />
          </div>

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
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">
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

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 flex flex-wrap justify-center gap-2"
              >
                {["Admin Dashboards", "SaaS Development", "AI & LLM Integration", "Type-Safe Backends"].map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-full border border-white/70 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-xl",
                      isLotm && "border-[#d49a3f]/55 bg-[#0c1522]/80 text-[#d5e4ff]"
                    )}
                  >
                    {item}
                  </span>
                ))}
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
                    "h-12 rounded-full bg-slate-950 px-7 text-sm font-bold text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
                    isLotm && "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a]"
                  )}
                >
                  <Link href="#contact">
                    Book a Call
                    <ArrowRight className="size-4 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  data-ui-feedback
                  variant="outline"
                  className={cn(
                    "h-12 rounded-full border-white/70 bg-white/70 px-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl hover:bg-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/82 text-[#e6f2ff] hover:bg-[#101a2b]"
                  )}
                >
                  <Link href={socialLinks[3].href} target="_blank">
                    <MessageSquare className="size-4 mr-1.5" />
                    WhatsApp
                  </Link>
                </Button>
                <Button
                  asChild
                  data-ui-feedback
                  variant="outline"
                  className={cn(
                    "h-12 rounded-full border-white/70 bg-white/70 px-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-xl hover:bg-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
                    isLotm && "border-[#d49a3f]/50 bg-[#070b13]/82 text-[#e6f2ff] hover:bg-[#101a2b]"
                  )}
                >
                  <Link href="#projects">
                    View Case Studies
                    <Eye className="size-4 ml-1.5" />
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
                      "group relative overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition duration-300 hover:border-teal-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80",
                      isLotm && "border-[#d49a3f]/35 bg-[#0a101b]/82"
                    )}
                  >
                    <p
                      className={cn(
                        "font-(family-name:--font-space-grotesk) text-2xl font-extrabold text-slate-950 dark:text-white",
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
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
              Scroll
            </span>
            <div className="size-5 animate-bounce rounded-full border-2 border-slate-400 dark:border-slate-600 flex items-center justify-center">
              <ChevronDown className="size-3 text-slate-400 dark:text-slate-600" />
            </div>
          </div>
        </section>

        {/* SERVICES — horizontal scroll carousel with PexelsCardBg */}
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

              <div
                data-reveal
                className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {servicesData.map((service) => (
                  <div key={service.id} className="min-w-[340px] max-w-[400px] snap-start shrink-0">
                    <Dev21ServiceCard service={service} isLotm={isLotm} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </PexelsSection>

        {/* PROJECTS — large horizontal cards alternating */}
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

            <div data-reveal className="mt-12 space-y-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/78 shadow-[0_22px_90px_rgba(15,23,42,0.08)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82",
                    "lg:flex-row",
                    index % 2 === 1 && "lg:flex-row-reverse"
                  )}
                >
                  <div className="relative h-64 shrink-0 lg:h-auto lg:w-1/2">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent lg:bg-gradient-to-r" />
                    <span className={cn(
                      "absolute left-5 top-5 rounded-full border border-white/65 bg-white/84 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700 backdrop-blur",
                      isLotm && "border-[#d49a3f]/45 bg-[#0c1522]/90 text-[#d5e4ff]"
                    )}>
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center px-7 py-8 lg:w-1/2 lg:px-10">
                    <h3 className={cn(
                      "font-(family-name:--font-space-grotesk) text-2xl font-bold text-slate-950 sm:text-3xl",
                      isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                    )}>
                      {project.title}
                    </h3>

                    <p className={cn(
                      "mt-4 text-sm leading-6 text-slate-600",
                      isLotm && "text-[#b9cff2]"
                    )}>
                      <span className="font-semibold text-slate-800">Problem:</span> {project.problem}
                    </p>

                    <p className={cn(
                      "mt-3 text-sm leading-6 text-slate-600",
                      isLotm && "text-[#b9cff2]"
                    )}>
                      <span className="font-semibold text-slate-800">Solution:</span> {project.solution}
                    </p>

                    <p className={cn(
                      "mt-3 text-sm leading-6 text-slate-600",
                      isLotm && "text-[#b9cff2]"
                    )}>
                      <span className="font-semibold text-slate-800">Result:</span> {project.result}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((item) => (
                        <span
                          key={`${project.id}-${item}`}
                          className={cn(
                            "rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600",
                            isLotm && "border-[#6f6148] bg-[#201928] text-[#c9bead]"
                          )}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={() => setSelectedCaseStudy(project)}
                        className={cn(
                          "h-10 rounded-full bg-slate-950 px-5 text-xs font-bold text-white shadow hover:bg-slate-800",
                          isLotm && "border border-[#f0b85b]/45 bg-[#c8861f] text-[#f6fbff] hover:bg-[#de9f3a]"
                        )}
                      >
                        <Eye className="size-3.5 mr-1.5" />
                        Case Study
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className={cn(
                          "h-10 rounded-full border-slate-300 bg-transparent px-5 text-xs text-slate-700 hover:bg-slate-100",
                          isLotm && "border-[#d49a3f]/40 bg-[#070b13]/72 text-[#deebff] hover:bg-[#101a2a]"
                        )}
                      >
                        <Link href={project.liveLink} target="_blank">
                          Live Demo
                          <ArrowUpRight className="size-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT — timeline with glass cards */}
        <PexelsSection query="team collaboration" gradient="linear-gradient(180deg, rgba(252,250,245,0.88), rgba(252,250,245,0.94))">
          <section
            id="about"
            className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
          >
            <div className="w-full max-w-4xl mx-auto">
              <div data-reveal>
                <SectionHeading
                  eyebrow={sectionCopy.aboutEyebrow}
                  title={sectionCopy.aboutTitle}
                  description="Current role, core philosophy, experience, and the process I follow to deliver production software."
                />
              </div>

              <div className="relative mt-16">
                <div className="absolute left-[19px] top-0 h-full w-0.5 bg-gradient-to-b from-teal-500/40 via-amber-500/30 to-cyan-500/20" />

                {/* Current Role */}
                <div className="relative pb-14 pl-14">
                  <div className="absolute left-[13px] top-2 size-[14px] rounded-full border-[3px] border-teal-500 bg-white shadow" />
                  <div className={cn(
                    "rounded-3xl border border-white/70 bg-white/78 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur",
                    isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                  )}>
                    <div className="flex items-center gap-2 text-teal-700">
                      <BriefcaseBusiness className="size-4" />
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.28em]",
                        isLotm && "text-[#f0b85b]"
                      )}>
                        Current Role
                      </span>
                    </div>
                    <h3 className={cn(
                      "mt-3 font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950",
                      isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                    )}>
                      {profileSummary.currentRole}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-teal-600" />
                        {profileSummary.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="size-3.5 text-teal-600" />
                        {profileSummary.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* About Cards */}
                {aboutCards.map((card, index) => {
                  const dotColors = [
                    "border-teal-400",
                    "border-amber-400",
                    "border-cyan-400",
                  ];
                  return (
                    <div key={card.title} className="relative pb-14 pl-14">
                      <div className={cn(
                        "absolute left-[13px] top-2 size-[14px] rounded-full border-[3px] bg-white shadow",
                        dotColors[index % 3]
                      )} />
                      <div className={cn(
                        "rounded-3xl border border-white/70 bg-white/78 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur",
                        isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                      )}>
                        <h3 className={cn(
                          "font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950",
                          isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                        )}>
                          {card.title}
                        </h3>
                        <p className={cn(
                          "mt-2 text-sm leading-6 text-slate-600",
                          isLotm && "text-[#b9cff2]"
                        )}>
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Experience Items */}
                {experienceItems.map((item) => (
                  <div key={item.title} className="relative pb-14 pl-14">
                    <div className="absolute left-[13px] top-2 size-[14px] rounded-full border-[3px] border-amber-400 bg-white shadow" />
                    <div className={cn(
                      "rounded-3xl border border-white/70 bg-white/78 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                    )}>
                      <span className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-600",
                        isLotm && "text-[#f0b85b]"
                      )}>
                        {item.period}
                      </span>
                      <h3 className={cn(
                        "mt-2 font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950",
                        isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                      )}>
                        {item.title}
                      </h3>
                      <p className={cn(
                        "mt-2 text-sm leading-6 text-slate-600",
                        isLotm && "text-[#b9cff2]"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Process Steps */}
                {processSteps.map((step) => (
                  <div key={step.number} className="relative pb-14 pl-14">
                    <div className="absolute left-[13px] top-2 size-[14px] rounded-full border-[3px] border-cyan-400 bg-white shadow" />
                    <div className={cn(
                      "rounded-3xl border border-white/70 bg-white/78 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                    )}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={cn(
                          "size-4 text-cyan-600",
                          isLotm && "text-[#f0b85b]"
                        )} />
                        <span className={cn(
                          "text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-600",
                          isLotm && "text-[#f0b85b]"
                        )}>
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className={cn(
                        "mt-2 font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950",
                        isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                      )}>
                        {step.title}
                      </h3>
                      <p className={cn(
                        "mt-2 text-sm leading-6 text-slate-600",
                        isLotm && "text-[#b9cff2]"
                      )}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Workflow Principles */}
                {workflowPrinciples.map((item) => (
                  <div key={item.title} className="relative pb-1 pl-14">
                    <div className="absolute left-[13px] top-2 size-[14px] rounded-full border-[3px] border-indigo-400 bg-white shadow" />
                    <div className={cn(
                      "rounded-3xl border border-white/70 bg-white/78 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur",
                      isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82"
                    )}>
                      <h3 className={cn(
                        "font-(family-name:--font-space-grotesk) text-xl font-bold text-slate-950",
                        isLotm && "font-(family-name:--font-lotm-heading) text-[#f6fbff]"
                      )}>
                        {item.title}
                      </h3>
                      <p className={cn(
                        "mt-2 text-sm leading-6 text-slate-600",
                        isLotm && "text-[#b9cff2]"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </PexelsSection>

        {/* TESTIMONIALS — single featured card with PexelsCardBg */}
        <PexelsSection query="team collaboration" gradient="linear-gradient(180deg, rgba(252,250,245,0.88), rgba(252,250,245,0.94))">
          <section
            id="testimonials"
            className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
          >
            <div className="w-full max-w-5xl mx-auto">
              <div data-reveal>
                <SectionHeading
                  eyebrow={sectionCopy.testimonialsEyebrow}
                  title={sectionCopy.testimonialsTitle}
                  description="Feedback from engineering leads, founders, and agency partners."
                  align="center"
                />
              </div>

              <div data-reveal className="mt-12 space-y-6">
                {testimonials.map((testimonial, index) => {
                  const avatarQuery = {
                    "Engineering Lead": "professional man portrait",
                    "SaaS Founder": "business woman portrait",
                    "Agency Client": "creative director portrait",
                  }[testimonial.name] || "professional portrait";

                  return (
                    <div
                      key={testimonial.name}
                      className={cn(
                        "relative overflow-hidden rounded-[32px] border border-white/70 bg-white/78 shadow-[0_20px_80px_rgba(15,23,42,0.08)]",
                        isLotm && "border-[#d49a3f]/36 bg-[#0a101b]/82",
                        index === 0 ? "p-8 sm:p-10" : "p-6"
                      )}
                    >
                      <PexelsCardBg
                        query={avatarQuery}
                        className="absolute inset-0 opacity-[0.05]"
                      />
                      <div className="relative z-10">
                        <div className={cn(
                          "flex items-center gap-4",
                          index === 0 && "flex-col text-center sm:flex-row sm:text-left"
                        )}>
                          <PexelsAvatar
                            query={avatarQuery}
                            size={index === 0 ? "lg" : "sm"}
                          />
                          <div>
                            <p className={cn(
                              "font-(family-name:--font-space-grotesk) text-slate-950",
                              index === 0 ? "text-xl" : "text-base",
                              isLotm && "text-[#eef6ff]"
                            )}>
                              {testimonial.name}
                            </p>
                            <p className={cn(
                              "text-slate-500",
                              index === 0 ? "text-sm" : "text-xs",
                              isLotm && "text-[#aec5e7]"
                            )}>
                              {testimonial.role} &middot; {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <blockquote className={cn(
                          "mt-5 leading-relaxed text-slate-600",
                          index === 0 ? "text-lg sm:text-xl" : "text-sm",
                          isLotm && "text-[#b9cff2]"
                        )}>
                          &ldquo;{testimonial.content}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </PexelsSection>

        {/* FAQ — with PexelsCardBg */}
        <section
          id="faq"
          className="mx-auto flex min-h-screen w-full max-w-7xl scroll-mt-24 items-center px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-[36px]">
              <PexelsCardBg query="abstract tech" className="absolute inset-0 opacity-[0.03]" />
              <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
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
            </div>
          </div>
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
