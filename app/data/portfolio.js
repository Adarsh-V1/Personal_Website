import projectInfo from "../components/workCom/info";
import { skills as baseSkills } from "../components/homeCom/homeContent";

const normalizeTag = (value) => value.replace(/\s+/g, " ").trim();

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Adarsh",
    shortLabel: "github.com/Adarsh",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/Adarsh",
    shortLabel: "linkedin.com/in/Adarsh",
  },
  {
    label: "Email",
    href: "mailto:adarsh.pathania.04@gmail.com",
    shortLabel: "adarsh.pathania.04@gmail.com",
  },
];

export const heroHighlights = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "tRPC",
  "Prisma",
];

export const heroStats = [
  { value: "Full-stack", label: "modern web products" },
  { value: "Type-safe", label: "APIs and data models" },
  { value: "Scalable", label: "frontend systems" },
];

export const heroThreads = [
  {
    name: "TypeScript",
    title: "Type-safe foundation",
    detail: "Shared contracts, predictable refactors, and cleaner product iteration across the stack.",
    position: { x: 16, y: 48 },
    color: "#0f172a",
  },
  {
    name: "Next.js",
    title: "Frontend system",
    detail: "App Router architecture, responsive UI composition, and production-ready page delivery.",
    position: { x: 33, y: 24 },
    color: "#0f766e",
  },
  {
    name: "Node.js",
    title: "Backend runtime",
    detail: "Service logic, integrations, and server-side workflows built for reliable application behavior.",
    position: { x: 49, y: 16 },
    color: "#2563eb",
  },
  {
    name: "tRPC",
    title: "API contracts",
    detail: "End-to-end typed procedures that reduce backend friction and improve developer velocity.",
    position: { x: 66, y: 23 },
    color: "#f97316",
  },
  {
    name: "Prisma",
    title: "Data modeling",
    detail: "Schema-driven workflows, maintainable database access, and safer application changes.",
    position: { x: 82, y: 47 },
    color: "#7c3aed",
  },
  {
    name: "MongoDB",
    title: "Flexible persistence",
    detail: "Document data models for practical product features, dashboards, and iterative builds.",
    position: { x: 50, y: 72 },
    color: "#0ea5e9",
  },
];

export const aboutCards = [
  {
    title: "Full-stack product builds",
    description:
      "I build complete web products with modern frontend architecture, clean backend services, and maintainable application structure.",
  },
  {
    title: "Type-safe APIs and auth",
    description:
      "I like strongly typed workflows using TypeScript, tRPC, Prisma, and modern auth patterns that keep teams fast and confident.",
  },
  {
    title: "Scalable frontend systems",
    description:
      "On the frontend, I focus on reusable UI systems, predictable state management, and interfaces that feel polished on real products.",
  },
];

export const profileSummary = {
  name: "Adarsh Pathania",
  tagline: "Full-Stack Developer building modern Next.js applications, type-safe APIs, and reliable backend systems.",
  intro:
    "I work across the modern JavaScript and TypeScript stack with React, Next.js, Node.js, Hono.js, tRPC, Prisma, PostgreSQL, and MongoDB to ship clean, scalable, production-ready applications.",
  availability: "Full-Stack Developer • Open to impactful product work",
  location: "Mohali, Punjab, India",
  timezone: "IST (UTC+05:30)",
  image: "/images/me_crop.png",
};

export const skillGroups = [
  {
    title: "Frontend",
    level: "Advanced",
    skills: baseSkills.frontend,
  },
  {
    title: "Backend",
    level: "Working",
    skills: baseSkills.backend,
  },
  {
    title: "Languages",
    level: "Multi-stack",
    skills: baseSkills.languages,
  },
  {
    title: "Tools",
    level: "Daily workflow",
    skills: baseSkills.tools,
  },
];

export const workflowPrinciples = [
  {
    title: "Product-ready architecture",
    description:
      "Structure features so the frontend, backend, and data layer stay easy to reason about as the product grows.",
  },
  {
    title: "Type safety by default",
    description:
      "Lean on TypeScript, typed APIs, and schema-first tooling to reduce bugs and improve development speed.",
  },
  {
    title: "Clean collaboration",
    description:
      "Write maintainable code, document intent through structure, and keep implementation easy for teams to extend.",
  },
];

export const projects = projectInfo.map((project, index) => {
  const techStack = project.techUsed.map(normalizeTag);
  const category = normalizeTag(project.main);

  return {
    id: `${normalizeTag(project.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
    title: normalizeTag(project.name),
    description: normalizeTag(project.desc),
    techStack,
    category,
    image: project.winView,
    liveLink: project.liveLink,
    codeLink: project.codeLink,
    featured: index < 6,
  };
});

export const projectFilters = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export const experienceItems = [
  {
    period: "Jan 2026 — Present",
    title: "Software Engineering Intern • Paras Technologies",
    description:
      "Building a production-grade web application with Next.js, React, and TypeScript while contributing to real product delivery.",
  },
  {
    period: "Backend systems",
    title: "Type-safe APIs, services, and data workflows",
    description:
      "Designing backend features with Node.js, Hono.js, Prisma, MongoDB, and tRPC to keep development reliable and scalable.",
  },
  {
    period: "Frontend architecture",
    title: "State, fetching, and UI systems built to scale",
    description:
      "Implementing modern frontend patterns with Zustand, TanStack Query, and shadcn/ui for faster iteration and maintainable interfaces.",
  },
];

export const techStack = [
  { name: "Next.js", type: "Framework" },
  { name: "React", type: "UI" },
  { name: "TypeScript", type: "Language" },
  { name: "Tailwind CSS", type: "Styling" },
  { name: "shadcn/ui", type: "System" },
  { name: "TanStack Query", type: "Data" },
  { name: "Zustand", type: "State" },
  { name: "JavaScript", type: "Language" },
  { name: "Node.js", type: "Backend" },
  { name: "Hono.js", type: "Backend" },
  { name: "tRPC", type: "API" },
  { name: "Prisma", type: "ORM" },
  { name: "Better Auth", type: "Auth" },
  { name: "NextAuth.js", type: "Auth" },
  { name: "PostgreSQL", type: "Database" },
  { name: "MongoDB", type: "Data" },
  { name: "Drizzle", type: "ORM" },
  { name: "Mongoose", type: "ODM" },
  { name: "Git", type: "Tooling" },
  { name: "GitHub Copilot", type: "Workflow" },
  { name: "Cursor", type: "Workflow" },
  { name: "Vercel", type: "Deploy" },
];

export const achievementItems = [
  {
    value: "Next.js",
    label: "production work",
    description:
      "Currently contributing to a production-grade application instead of limiting the work to portfolio-only experiments.",
  },
  {
    value: "Type-safe",
    label: "delivery approach",
    description:
      "I prefer APIs, schemas, and frontend flows that stay strongly typed from development through shipping.",
  },
  {
    value: "Full-stack",
    label: "core skill set",
    description:
      "Strong across frontend architecture, backend services, database tooling, and modern product-focused implementation.",
  },
];

export const contactCards = [
  {
    title: "Best fit",
    detail: "Full-stack products, SaaS dashboards, modern landing pages, and polished interfaces backed by reliable APIs.",
  },
  {
    title: "Current stack",
    detail: "Next.js, React, TypeScript, Node.js, Hono.js, tRPC, Prisma, PostgreSQL, MongoDB, Zustand, TanStack Query, and shadcn/ui.",
  },
  {
    title: "Direct contact",
    detail: "adarsh.pathania.04@gmail.com • +91 78890 78854",
  },
];

export const tourSteps = [
  {
    id: "hero",
    title: "Hero section",
    description:
      "This is the first impression layer with a concise intro, highlighted stack, and the main calls to action.",
  },
  {
    id: "about",
    title: "About section",
    description:
      "A snapshot of how I approach frontend craft, interaction design, and product presentation.",
  },
  {
    id: "skills",
    title: "Skills section",
    description:
      "Grouped capabilities show the stack I use most and the principles behind how I ship interfaces.",
  },
  {
    id: "projects",
    title: "Projects showcase",
    description:
      "Selected work is filterable by technology so visitors can quickly scan the areas they care about.",
  },
  {
    id: "experience",
    title: "Experience section",
    description:
      "This timeline outlines my current focus across frontend systems, 3D interaction work, and applied builds.",
  },
  {
    id: "contact",
    title: "Contact section",
    description:
      "The final section points visitors toward the best channels for collaboration and direct conversation.",
  },
];
