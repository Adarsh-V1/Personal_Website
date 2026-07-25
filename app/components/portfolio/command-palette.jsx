"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Command,
  FileText,
  Sparkles,
  Briefcase,
  Code2,
  HelpCircle,
  Mail,
  Sun,
  Moon,
  ArrowRight,
  X,
  Calculator,
  Compass
} from "lucide-react";
import { useTheme } from "next-themes";
import { projects, skillGroups } from "../../data/portfolio";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = useMemo(() => {
    const list = [
      {
        id: "est",
        title: "Estimate Scope & Budget",
        category: "Actions",
        icon: Calculator,
        action: () => {
          document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
      },
      {
        id: "nav-projects",
        title: "Explore Featured Projects",
        category: "Navigation",
        icon: Briefcase,
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
      },
      {
        id: "nav-skills",
        title: "View Technical Skills & Stack",
        category: "Navigation",
        icon: Code2,
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
      },
      {
        id: "nav-contact",
        title: "Get in Touch / Hire Me",
        category: "Navigation",
        icon: Mail,
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
      },
      {
        id: "theme-toggle",
        title: `Switch Theme (Current: ${theme})`,
        category: "Preferences",
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setIsOpen(false);
        },
      },
    ];

    // Add projects
    projects.forEach((proj) => {
      list.push({
        id: `proj-${proj.id}`,
        title: `Project: ${proj.title}`,
        category: "Projects",
        subtitle: proj.description,
        icon: Compass,
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        },
      });
    });

    return list;
  }, [theme, setTheme]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  return (
    <>
      {/* Floating trigger hint button on desktop */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xl backdrop-blur transition hover:scale-105"
      >
        <Command className="size-3.5 text-teal-500" />
        <span>Search site</span>
        <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden font-body"
            >
              {/* Search Header */}
              <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
                <Search className="size-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search projects..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Command Results */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredCommands.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-teal-500/10 dark:hover:bg-teal-950/40 transition group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-teal-500 group-hover:text-white transition">
                            <Icon className="size-4" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {cmd.title}
                            </div>
                            {cmd.subtitle && (
                              <div className="text-[11px] text-slate-400 truncate">
                                {cmd.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {cmd.category}
                          </span>
                          <ArrowRight className="size-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span>Navigation: <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1 font-mono">↑↓</kbd></span>
                  <span>Select: <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1 font-mono">↵</kbd></span>
                </div>
                <span>Close: <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1 font-mono">ESC</kbd></span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
