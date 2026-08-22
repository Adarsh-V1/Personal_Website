import projectInfo from "../components/workCom/info";
import { skills as baseSkills } from "../components/homeCom/homeContent";

const normalizeTag = (value) => value.replace(/\s+/g, " ").trim();

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Reviews" },
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
  "React & Next.js",
  "Python, Go & Node.js",
  "Django, Flask & Frappe",
  "ML/DL & NLP",
  "AI & LLM Integrations",
  "Admin Dashboards & SaaS",
];

export const heroStats = [
  { value: "40+ Screens", label: "Built in production admin systems" },
  { value: "40% Faster", label: "Average page load optimization" },
  { value: "< 12 Hours", label: "Guaranteed client response time" },
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
    id: "clinic-mgmt",
    title: "Clinic & Healthcare Admin System",
    category: "SaaS Build",
    image: "/images/stack.png",
    problem: "A healthcare client needed doctors, appointments, billing, and patient records unified in one secure role-based dashboard.",
    solution: "Engineered a multi-tenant system using Next.js App Router, Hono.js backend, PostgreSQL, Prisma, and Better Auth with role-based access.",
    result: "Delivered a 40+ screen platform with automated billing reports, patient timeline views, and full mobile responsiveness.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Hono.js", "Prisma", "Better Auth"],
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
  {
    id: "viralsight",
    title: "ViralSight — Video Analytics Platform",
    category: "Next.js",
    image: projectInfo[0].winView,
    problem: "Content creators lacked real-time analytics to predict video engagement metrics before publishing content.",
    solution: "Built an analytics dashboard with Next.js, Node.js, tRPC, and MongoDB tracking view acceleration and generating detailed performance reports.",
    result: "Automated virality scoring, multi-video comparison, and instant analytical sharing with zero performance lag.",
    techStack: ["Next.js", "React", "Node.js", "tRPC", "Prisma", "MongoDB", "Tailwind CSS"],
    liveLink: projectInfo[0].liveLink,
    codeLink: projectInfo[0].codeLink,
    featured: true,
  },
  {
    id: "convolink",
    title: "ConvoLink — AI Chat & Calling",
    category: "Next.js",
    image: projectInfo[2].winView,
    problem: "Remote teams needed a secure real-time video call and chat platform with automated AI meeting notes and summaries.",
    solution: "Built a WebRTC and Convex powered platform integrated with OpenAI APIs for real-time transcription and summary generation.",
    result: "Achieved sub-100ms chat latency, instant room generation, and AI-driven action item summaries after every session.",
    techStack: ["Next.js", "React", "Convex", "WebRTC", "OpenAI API", "Tailwind CSS"],
    liveLink: projectInfo[2].liveLink,
    codeLink: projectInfo[2].codeLink,
    featured: true,
  },
  {
    id: "simulation",
    title: "3D Space Interactive Simulation",
    category: "React JS",
    image: projectInfo[3].winView,
    problem: "An interactive learning platform needed a dynamic 3D web experience to simulate planetary physics and orbital mechanics.",
    solution: "Programmed a 3D engine using Three.js, React Three Fiber, and custom WebGL shaders for realistic physics.",
    result: "Maintained smooth 60 FPS across desktop and mobile devices with interactive camera controls.",
    techStack: ["React", "Three.js", "React Three Fiber", "Tailwind CSS"],
    liveLink: projectInfo[3].liveLink,
    codeLink: projectInfo[3].codeLink,
    featured: true,
  },
  {
    id: "documind-ai",
    title: "DocuMind AI — Smart Knowledge Base & RAG SaaS",
    category: "AI & ML",
    image: projectInfo[0].winView,
    problem: "Enterprise teams needed an instant AI assistant to parse thousands of PDFs, Docs, and Notion pages with semantic vector search.",
    solution: "Engineered a Next.js 15, LangChain, Pinecone vector database, and OpenAI GPT-4o RAG pipeline with streaming UI responses.",
    result: "Reduced employee document research time by 75% across 12,000+ indexed company files with sub-2s query speed.",
    techStack: ["Next.js", "TypeScript", "Pinecone", "LangChain", "OpenAI API", "Tailwind CSS"],
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
  {
    id: "omnicommerce",
    title: "OmniCommerce — Multi-Vendor E-Commerce Engine",
    category: "SaaS Build",
    image: projectInfo[2].winView,
    problem: "A retail marketplace required a high-speed multi-vendor store with Stripe Connect split payments and real-time inventory sync.",
    solution: "Architected Next.js App Router, Prisma ORM, PostgreSQL on Neon, Stripe webhooks, and Redis caching.",
    result: "Handled $120k+ in peak transaction volume with 0 checkout failures and sub-100ms API response times.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe Connect", "Redis"],
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1",
    featured: true,
  },
  {
    id: "proppulse",
    title: "PropPulse — Real Estate & Property Asset CRM",
    category: "SaaS Build",
    image: projectInfo[1].winView,
    problem: "Property management firm needed an automated tenant portal for lease tracking, maintenance tickets, and automated invoice billing.",
    solution: "Built a full-stack Next.js + Hono.js platform with automated PDF invoice generation, email notifications, and landlord analytics dashboard.",
    result: "Automated 90% of tenant billing reminders and streamlined maintenance ticket resolution from 5 days to 12 hours.",
    techStack: ["Next.js", "React", "Hono.js", "PostgreSQL", "Tailwind CSS", "SendGrid"],
    liveLink: "https://viralsight.vercel.app/",
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
  { name: "React", title: "Component Ecosystem", detail: "Building interactive UIs with React, Next.js, and TypeScript — from landing pages to complex dashboards.", color: "#0f766e" },
  { name: "Backend", title: "API & Database Layer", detail: "Type-safe APIs with Hono.js, Prisma, PostgreSQL. Focus on performance and clean architecture.", color: "#f97316" },
  { name: "Mobile", title: "React Native", detail: "Cross-platform iOS/Android apps with shared backend logic and native device features.", color: "#14b8a6" },
  { name: "AI", title: "LLM Integrations", detail: "OpenAI, Claude, vector search, RAG pipelines — adding intelligence to web applications.", color: "#8b5cf6" },
  { name: "Systems", title: "Admin & Dashboard", detail: "Complex admin panels, CRMs, data grids, and internal tools built for production use.", color: "#6366f1" },
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
