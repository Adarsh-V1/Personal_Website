import projectInfo from "../components/workCom/info";
import { skills as baseSkills } from "../components/homeCom/homeContent";

const normalizeTag = (value) => value.replace(/\s+/g, " ").trim();

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "architecture-playground", label: "Architecture" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const pexelsQueries = [
  { section: "hero", query: "technology workspace", orientation: "landscape" },
  { section: "code", query: "code screen", orientation: "landscape" },
  { section: "dashboard", query: "dashboard analytics", orientation: "landscape" },
  { section: "team", query: "team meeting", orientation: "landscape" },
  { section: "abstract", query: "abstract tech", orientation: "landscape" },
  { section: "office", query: "modern office", orientation: "landscape" },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Adarsh-V1",
    shortLabel: "github.com/Adarsh-V1",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adarshpathania04/",
    shortLabel: "linkedin.com/in/adarshpathania04",
  },
  {
    label: "Email",
    href: "mailto:adarsh.pathania.04@gmail.com",
    shortLabel: "adarsh.pathania.04@gmail.com",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917889078854",
    shortLabel: "Direct WhatsApp (+91 7889078854)",
  },
];

export const heroHighlights = [
  "Next.js 15 & React 19",
  "Generative AI Video Pipelines",
  "Hono.js, Node.js & Go",
  "Convex DB & WebRTC Mesh",
  "PostgreSQL, Prisma & Drizzle",
  "Multi-Tenant Enterprise RBAC",
];

export const heroStats = [
  { value: "5 Panels", label: "Enterprise healthcare suite (40+ screens)" },
  { value: "68% Saved", label: "Third-party mapping API cost optimization" },
  { value: "< 45ms", label: "Real-time Convex mutation latency" },
];

export const profileSummary = {
  name: "Adarsh Pathania",
  tagline: "I build production-ready web applications for startups and agencies.",
  intro:
    "Full-Stack Developer — React, Next.js, Node.js, PostgreSQL, TypeScript. Available for freelance projects, custom SaaS builds, and agency collaborations. I take features from planning to deployment so you don't have to manage another developer.",
  availability: "Full-Stack Developer @ IT Company • Available for Freelance",
  location: "Mohali, Punjab, India",
  timezone: "IST (UTC+05:30)",
  responseTime: "Within 12 Hours",
  currentRole: "Full-Stack Developer @ IT Company (Full-time since Jan 2026)",
  whatsAppLink: "https://wa.me/917889078854",
  bookCallLink: "mailto:adarsh.pathania.04@gmail.com?subject=Book%20a%20Project%20Discovery%20Call",
  image: "/images/me_crop.png",
};

export const servicesData = [
  {
    id: "saas-dev",
    title: "SaaS Application Development",
    serviceName: "SaaS Build",
    description: "End-to-end full-stack products with auth, dashboards, payments, and subscription billing.",
    capabilities: ["Multi-Tenant Architecture", "Stripe & Subscription Billing", "Role-Based Access Control", "Admin Dashboards"],
  },
  {
    id: "mobile-dev",
    title: "React Native Mobile Apps",
    serviceName: "Mobile Apps",
    description: "Cross-platform iOS and Android apps with shared backend logic and native device features.",
    capabilities: ["iOS & Android Apps", "Push Notifications", "Biometric Auth", "Offline Caching"],
  },
  {
    id: "dashboards",
    title: "Admin Dashboards & Internal Tools",
    serviceName: "Admin Tools",
    description: "High-performance admin panels, CRMs, and internal tools with real-time analytics and granular permissions.",
    capabilities: ["Complex Data Grids", "Real-Time Analytics", "Exportable Reports", "Granular Permissions"],
  },
  {
    id: "ml-ai",
    title: "ML/DL & AI Integration",
    serviceName: "ML & AI",
    description: "Train and deploy ML/DL models, NLP pipelines, LLM integrations, and RAG-based AI features.",
    capabilities: ["ML/DL Model Deployment", "NLP & Text Analytics", "OpenAI & LangChain", "RAG & Vector Search"],
  },
  {
    id: "backend",
    title: "Backend APIs & Auth Systems",
    serviceName: "Backend & APIs",
    description: "Type-safe backends with Node.js, Python, Django, Flask, Frappe, Hono, and PostgreSQL.",
    capabilities: ["Django & Flask APIs", "Frappe ERP Customization", "PostgreSQL & Prisma", "Better Auth Setup"],
  },
  {
    id: "mvp",
    title: "Landing Pages & MVPs",
    serviceName: "MVPs & Prototypes",
    description: "Polished landing pages and MVPs to validate ideas quickly and attract early users.",
    capabilities: ["Responsive Landing Pages", "MVP Features", "Performance Optimized", "SEO & Analytics"],
  },
];

export const caseStudies = [
  {
    id: "chatx2",
    title: "Chatx2.ai — Generative AI Video Studio",
    category: "AI & Next.js",
    image: "/images/projects/chatx2.jpg",
    problem: "Creators and editors needed a unified web studio to run reference-to-video and video-to-video models (Kling 4.0, MiniMax H3, Wan 3.0) without API rate failures or wallet overdraws.",
    solution: "Engineered a Next.js 15 + Hono.js architecture with fal.ai & WaveSpeed adapters, atomic credit reservations, S3 presigned video streams, and automated cron recovery workers.",
    result: "Delivered native 720p/1080p video editing with 100% credit settlement accuracy and sub-2s API queue dispatch.",
    techStack: ["Next.js 15", "Hono.js", "fal.ai", "Kling 4.0", "AWS S3", "TypeScript"],
    liveLink: "https://chatx2.ai",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
  {
    id: "atella",
    title: "Atella Health Suite — 5 Enterprise Panels",
    category: "Healthcare SaaS",
    image: "/images/projects/atella.jpg",
    problem: "Autism therapy clinics required separate dedicated interfaces for clinic owners, BCBA providers, HR managers, and reception kiosks with strict HIPAA compliance.",
    solution: "Architected a multi-tenant platform with 5 specialized web panels sharing a type-safe PostgreSQL database, BCBA ABC behavior tracking, and automated CPT billing code generation.",
    result: "Delivered 40+ production screens with role-based auth, live check-in kiosks, and 45% faster clinical documentation.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Better Auth", "TanStack Query"],
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
  {
    id: "jetplus",
    title: "JetPlus — Fleet Telemetry & Smart Directions Cache",
    category: "Logistics & Maps",
    image: "/images/projects/jetplus.jpg",
    problem: "High-frequency GPS pings from hundreds of fleet drivers were triggering redundant Google Directions API requests, causing immense cloud cost spikes.",
    solution: "Implemented an origin-waypoint-destination coordinate hashing cache in memory + localStorage with LRU pruning and negative miss caching for invalid routes.",
    result: "Slashing Google Directions API costs by 68% and dropped average route render latency from 320ms to 4ms.",
    techStack: ["Next.js 16", "Google Maps API", "TanStack Table", "Zustand", "TypeScript"],
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
  {
    id: "viralsight",
    title: "ViralSight — Video Virality Analytics & SuperAdmin",
    category: "Next.js & tRPC",
    image: "/images/projects/viralsight.jpg",
    problem: "Social media marketing agencies lacked real-time analytics to benchmark view velocity and engagement acceleration before launching ad campaigns.",
    solution: "Built a tRPC-powered analytics platform that tracks view acceleration, generates virality forecast scores, and includes a TanStack Router SuperAdmin console.",
    result: "Scaled to thousands of tracked video events with sub-50ms tRPC queries, Stripe tier subscriptions, and Web Push alerts.",
    techStack: ["Next.js", "tRPC", "Prisma", "MongoDB", "Stripe", "TanStack Router"],
    liveLink: projectInfo[0].liveLink,
    codeLink: projectInfo[0].codeLink,
    featured: true,
  },
  {
    id: "convolink",
    title: "ConvoLink — Real-Time Reactive Workspace",
    category: "Convex & WebRTC",
    image: "/images/projects/convolink.jpg",
    problem: "Remote teams needed a secure real-time collaboration workspace with sub-100ms messaging latency, live presence, and peer-to-peer browser video calls.",
    solution: "Built a reactive communications hub using Convex DB for instant state sync and WebRTC for browser audio/video calling without intermediate servers.",
    result: "Achieved sub-45ms mutation roundtrips, instant typing and presence indicators, and reliable crystal-clear browser calls.",
    techStack: ["Next.js", "Convex DB", "WebRTC", "TypeScript", "Tailwind CSS"],
    liveLink: projectInfo[2].liveLink,
    codeLink: projectInfo[2].codeLink,
    featured: true,
  },
  {
    id: "eorte-turbo",
    title: "Eorte-Turbo — Full-Stack T3 Turborepo",
    category: "Monorepo Architecture",
    image: "/images/projects/chatx2.jpg",
    problem: "Scaling multi-app products with shared data schemas, auth validation, and component libraries without package version fragmentation.",
    solution: "Engineered a production Turborepo monorepo with apps/admin, apps/web, and shared packages for db, api (tRPC), auth, and ui design tokens.",
    result: "Unified build pipeline with instant local caching, 100% end-to-end type safety, and zero duplicated boilerplate.",
    techStack: ["Turborepo", "tRPC", "Prisma", "Next.js", "TypeScript", "Tailwind CSS"],
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Discuss goals, requirements, and milestones. Define deliverables before writing code.",
  },
  {
    number: "02",
    title: "Architecture",
    description: "Design schemas, API endpoints, component hierarchy, and technology choices.",
  },
  {
    number: "03",
    title: "Development",
    description: "Write clean, type-safe code with weekly demos so you see tangible progress.",
  },
  {
    number: "04",
    title: "Testing",
    description: "Rigorously test auth, permissions, edge cases, and optimize page load speed.",
  },
  {
    number: "05",
    title: "Deployment",
    description: "Deploy to Vercel, Neon DB, or AWS with CI/CD, SSL, and domain setup.",
  },
  {
    number: "06",
    title: "Support",
    description: "Post-launch bug fixes, performance monitoring, and ongoing enhancements.",
  },
];

export const whyWorkWithMe = [
  {
    title: "Production Experience",
    description: "Built 40+ admin screens, real-time WebRTC platforms, and type-safe backends for real clients — not tutorials.",
  },
  {
    title: "Faster Performance",
    description: "SSR, query optimization, and image optimization achieve up to 40% faster page loads.",
  },
  {
    title: "Clear Communication",
    description: "Direct daily updates, clear documentation, and guaranteed responses within 12 hours.",
  },
  {
    title: "Web + Mobile",
    description: "Build web apps and React Native mobile apps with shared backend — reducing time and cost.",
  },
];

export const testimonials = [
  {
    name: "Engineering Lead",
    role: "Senior Engineering Manager",
    company: "IT Company",
    content: "Adarsh delivers production code quickly, understands component architecture thoroughly, and takes full ownership of complex Next.js features.",
  },
  {
    name: "SaaS Founder",
    role: "Product Founder",
    company: "Healthcare Solutions",
    content: "He transformed our raw requirements into a clean 40+ page admin dashboard with role-based auth and automated invoice reporting ahead of schedule.",
  },
  {
    name: "Agency Client",
    role: "Creative Director",
    company: "Digital Product Studio",
    content: "Working with Adarsh is seamless. He writes clean TypeScript, responds promptly, and delivers software without constant hand-holding.",
  },
];

export const faqs = [
  {
    question: "What types of projects do you take on?",
    answer: "SaaS apps, admin dashboards, mobile apps, ML/DL systems, NLP pipelines, ERP customization (Frappe), and AI integrations using React, Next.js, Python, Django, Flask, Go, and Node.js.",
  },
  {
    question: "How do you handle pricing?",
    answer: "Fixed-price per milestone or hourly/weekly rates depending on scope. Every project includes clear deliverables and post-launch support.",
  },
  {
    question: "Can you build both web and mobile apps?",
    answer: "Yes. I use React/Next.js for web and React Native for mobile, sharing backend APIs to save cost and time.",
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Landing pages and MVPs take 3-7 days. SaaS platforms and admin dashboards take 2-4 weeks depending on scope.",
  },
  {
    question: "How do you communicate during a project?",
    answer: "Direct updates via WhatsApp or email, weekly progress demos, and guaranteed responses within 12 hours.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes. Every project includes post-launch support with bug fixes, performance monitoring, and quick turnaround on issues.",
  },
];

export const projects = caseStudies;
export const projectFilters = ["All", "SaaS Build", "Next.js", "React JS", "AI & ML"];

export const experienceItems = [
  {
    period: "Jan 2026 — Present",
    title: "Full-Stack Developer • IT Company (Full-time)",
    description: "Building production-grade web apps with Next.js, React, TypeScript, and Node.js for active clients.",
  },
  {
    period: "Backend & Systems",
    title: "Type-Safe Backend Services & Databases",
    description: "Designing backends with Node.js, Hono.js, Prisma, PostgreSQL, MongoDB, and tRPC.",
  },
  {
    period: "Mobile Development",
    title: "React Native Mobile Applications",
    description: "Cross-platform iOS/Android apps with offline caching and REST/GraphQL API integration.",
  },
];

export const skillGroups = [
  {
    title: "Frontend & Web",
    level: "Advanced",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "TanStack Query"],
  },
  {
    title: "Backend & Languages",
    level: "Production",
    skills: ["Node.js", "Python", "Go", "Hono.js", "tRPC", "PostgreSQL", "Prisma", "MongoDB", "Better Auth"],
  },
  {
    title: "Web Frameworks",
    level: "Full-Stack",
    skills: ["Django", "Flask", "Frappe", "FastAPI", "REST APIs", "GraphQL"],
  },
  {
    title: "AI / ML & Integrations",
    level: "Daily Workflow",
    skills: ["ML/DL Models", "NLP", "OpenAI API", "LangChain", "Vector DBs", "RAG Pipelines", "WebRTC", "Stripe", "Docker"],
  },
];

export const workflowPrinciples = [
  {
    title: "Client-Centric Architecture",
    description: "Build modular systems that expand easily without complete rewrites.",
  },
  {
    title: "Strict Type Safety",
    description: "Leverage TypeScript, schema validation, and typed APIs to eliminate runtime errors.",
  },
  {
    title: "Rapid Execution",
    description: "Daily updates, fast iteration cycles, and guaranteed response within 12 hours.",
  },
];

export const aboutCards = [
  {
    title: "Outcome-Focused",
    description: "I build products people use. Fast load times, intuitive flows, maintainable code that ships on schedule. Every feature delivers measurable value.",
  },
  {
    title: "Full Ownership",
    description: "From database schema to deployment, I own features end-to-end. Weekly updates, clear documentation, no hand-holding required.",
  },
  {
    title: "Production Stack",
    description: "React, Next.js, Node.js, PostgreSQL, TypeScript — tools chosen for production reliability. Type-safe, performant, and extensible.",
  },
];

export const achievementItems = [
  { label: "Production Systems", value: "40+", description: "Screens built across admin dashboards and SaaS platforms." },
  { label: "Performance Gain", value: "40%", description: "Average page load improvement through optimization." },
  { label: "Client Response", value: "<12hr", description: "Average time to respond and resolve client queries." },
];

export const contactCards = [
  { title: "Let's Build Something", detail: "Looking for a reliable developer to deliver your next project? Let's discuss scope, timeline, and budget. Free discovery call — no commitment required." },
  { title: "Current Availability", detail: "Taking on new freelance projects. Typical response time under 12 hours. Start with a free call to see if we're a fit." },
];

export const heroThreads = [
  { name: "AI Video & Models", title: "Generative AI Systems", detail: "Orchestrating fal.ai, Kling 4.0, MiniMax H3, S3 presigned streaming, and token wallet credit reservations.", color: "#06b6d4" },
  { name: "Full-Stack & RBAC", title: "Enterprise Platforms", detail: "40+ screen platforms across 5 enterprise portals (Atella Health), PostgreSQL, Prisma, Drizzle, and Better Auth.", color: "#10b981" },
  { name: "Real-Time & WebRTC", title: "Reactive Mesh", detail: "Sub-50ms Convex reactive databases, presence tracking, and peer-to-peer browser video/audio calling.", color: "#8b5cf6" },
  { name: "Performance & Caching", title: "API Cost Optimization", detail: "Multi-tier memory + localStorage route caching that slashes mapping and third-party API costs by 68%.", color: "#f59e0b" },
  { name: "Turborepos & Monorepos", title: "T3 Turbo Architecture", detail: "Unified monorepo orchestration with shared DB schemas, tRPC routers, and shared UI design systems.", color: "#3b82f6" },
];

export const techStack = [
  { name: "Next.js", type: "Framework" },
  { name: "React", type: "Library" },
  { name: "TypeScript", type: "Language" },
  { name: "Python", type: "Language" },
  { name: "Go", type: "Language" },
  { name: "Node.js", type: "Runtime" },
  { name: "Django", type: "Framework" },
  { name: "Flask", type: "Framework" },
  { name: "Frappe", type: "Framework" },
  { name: "PostgreSQL", type: "Database" },
  { name: "Prisma", type: "ORM" },
  { name: "Hono.js", type: "Framework" },
  { name: "Tailwind CSS", type: "Styling" },
  { name: "React Native", type: "Mobile" },
  { name: "MongoDB", type: "Database" },
  { name: "tRPC", type: "API" },
  { name: "Zustand", type: "State" },
  { name: "Better Auth", type: "Auth" },
  { name: "Stripe", type: "Payments" },
  { name: "OpenAI", type: "AI" },
  { name: "LangChain", type: "AI" },
  { name: "NLP", type: "ML" },
  { name: "Vercel", type: "Deploy" },
  { name: "Docker", type: "Container" },
  { name: "Git", type: "Version Control" },
];

export const deliveryCapabilities = [
  "Authentication & Authorization",
  "Admin Dashboards & Panels",
  "AI & LLM Integration",
  "ML/DL Model Deployment",
  "NLP & Text Analytics",
  "Payment Gateways",
  "CRUD Systems & APIs",
  "Database Design & Schemas",
  "Deployment & CI/CD",
  "Responsive Landing Pages",
  "Real-Time Features (WebRTC)",
  "Role-Based Access Control",
];

export const tourSteps = [
  { id: "hero", title: "Home", description: "Overview of who I am and what I build. Stats show real delivery metrics." },
  { id: "services", title: "Services", description: "What I can build for you — from SaaS to mobile apps to AI integration." },
  { id: "projects", title: "Projects", description: "Case studies with problem, solution, and measurable results." },
  { id: "why-me", title: "Why Work With Me", description: "The key reasons clients choose to work with me." },
  { id: "process", title: "Process", description: "How I take a project from discovery to deployment and beyond." },
  { id: "testimonials", title: "Testimonials", description: "What clients and colleagues say about working with me." },
  { id: "faq", title: "FAQ", description: "Common questions about pricing, timelines, and collaboration." },
  { id: "contact", title: "Contact", description: "Ready to start? Let's discuss your project." },
];
