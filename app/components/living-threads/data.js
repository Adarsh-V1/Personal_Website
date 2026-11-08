// ============================================================
// LIVING THREADS — Enhanced Content Data
// Expanded with weird, unique human questions and 6 custom themes!
// ============================================================

export const PERSONAL = {
  name: 'Adarsh Pathania',
  tagline: 'I build production-ready web applications for startups and agencies.',
  email: 'adarsh.pathania.04@gmail.com',
  github: 'https://github.com/Adarsh-V1',
  linkedin: 'https://linkedin.com/in/adarshpathania04',
  whatsapp: 'https://wa.me/917889078854',
  profileImage: '/images/me_crop.png',
  location: 'Mohali, Punjab, India',
  timezone: 'IST (UTC+05:30)',
  currentRole: 'Full-Stack Developer @ IT Company',
  roleStart: 'Jan 2026',
  responseTime: 'Within 12 Hours',
  bookCallLink: 'mailto:adarsh.pathania.04@gmail.com?subject=Book%20a%20Project%20Discovery%20Call',
  techStack: [
    'Next.js', 'React', 'TypeScript', 'Python', 'Go', 'Node.js',
    'Django', 'Flask', 'PostgreSQL', 'Prisma', 'Hono.js',
    'Tailwind CSS', 'React Native', 'MongoDB', 'tRPC', 'Zustand',
    'Stripe', 'OpenAI', 'LangChain', 'Vercel', 'Docker', 'Git',
  ],
};

// ── 11 Floating Questions (Original 7 + 4 Weird & Unique) ──
export const QUESTIONS = [
  {
    id: 'who-am-i',
    label: 'Who am I... and what do I actually do??',
    color: '#00f0ff',
    glow: 'rgba(0,240,255,0.35)',
    anchorRatio: { x: 0.08, y: -0.01 },
    nodeRatio:   { x: 0.09, y: 0.32 },
    segments: 8,
    followUps: [
      "What's your absolute favorite tech stack?",
      'How do you approach building a product from scratch?',
      'Give me the 30-second elevator pitch for recruiters',
    ],
    responses: {
      "What's your absolute favorite tech stack?":
        "Next.js 15 + Hono.js + Prisma + PostgreSQL (Neon) + Tailwind CSS. Type-safe APIs, server components, edge-ready backend, world-class database — all deployable in minutes on Vercel. For real-time I reach for Convex or raw WebSockets. For AI, LangChain + OpenAI. I'm stack-agnostic when needed, but this combo is my sweet spot for shipping fast and scaling hard.",
      'How do you approach building a product from scratch?':
        "Three questions first: Who's the user? What's the ONE thing they must do? What's the fastest path to a working prototype? Then I sketch the data model, pick the minimal stack, and build the core loop — no auth, no styling, just the heartbeat. Once that works I layer in auth (Better Auth), design (Tailwind), edge cases, and deploy. Ship early, learn fast.",
      'Give me the 30-second elevator pitch for recruiters':
        "I'm Adarsh Pathania — a full-stack developer who's shipped 6+ production apps ranging from AI video studios to enterprise health platforms. I work with Next.js, React, Python, and Go. I've built real-time WebRTC systems, AI pipelines, fleet telemetry dashboards, and SaaS billing integrations. I write clean, documented, tested code and I ship fast. Currently in Mohali, India, open to challenging roles in scalable systems and AI-native product engineering.",
    },
    freeFormFallback: "Great question! I'd love to chat about that — hit me up on LinkedIn or email and let's talk.",
  },
  {
    id: 'projects',
    label: 'Wanna see what I can cook? 🔥',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.35)',
    anchorRatio: { x: 0.23, y: -0.01 },
    nodeRatio:   { x: 0.22, y: 0.44 },
    segments: 7,
    followUps: [
      'Which project was the hardest to engineer?',
      'Walk me through the backend architecture of your top app',
      'What went wrong during deployment and how did you fix it?',
    ],
    responses: {
      'Which project was the hardest to engineer?':
        "Atella Health Suite — 5 interconnected panels (Patient, Therapist, Admin, Super Admin, Clinic Manager), 40+ screens, complex RBAC, real-time session management, HIPAA-adjacent data handling. The hardest part was role-based access control — every API route and UI element gated by role + clinic + session context. I built a middleware chain in Hono.js that resolved permissions at the edge. It took 3 full rewrites of the auth layer before it was bulletproof.",
      'Walk me through the backend architecture of your top app':
        "Chatx2.ai: Next.js 15 frontend → Hono.js API (edge runtime) → PostgreSQL via Prisma → fal.ai + Kling 4.0 for AI video generation (async webhook callbacks) → Cloudinary for media → Stripe for billing. User submits prompt → job record created → generation fires → webhook updates status → client polls via SWR. Clean, resilient, scalable.",
      'What went wrong during deployment and how did you fix it?':
        "JetPlus — Google Maps API costs exploded: 200K+ directions calls/day. I built a Smart Directions Cache: hash origin-destination, cache polyline + ETA for 15 min, re-fetch only if driver deviates by >500m. Cut API costs by 68%. Cache invalidation across edge regions? Redis pub/sub fan-out. Lesson: estimate API costs BEFORE production.",
    },
    freeFormFallback: "I love talking projects — reach out on LinkedIn and I'll walk you through any of them!",
  },
  {
    id: 'why-hate-software',
    label: 'Why do I secretly hate 90% of modern software? 🤮',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.35)',
    anchorRatio: { x: 0.38, y: -0.01 },
    nodeRatio:   { x: 0.36, y: 0.28 },
    segments: 6,
    followUps: [
      'Why are Electron apps so bloated?',
      'What makes software feel truly fast to a user?',
      'How do you keep bundle sizes under 150KB?',
    ],
    responses: {
      'Why are Electron apps so bloated?':
        "Because shipping an entire Chromium browser and NodeJS runtime just to display a chat window with 3 text inputs is architectural laziness. Modern users have 64GB of RAM and their machine still fans up opening Slack. Native WebViews, Rust/Tauri, or lean web apps with sub-50ms TTFB are the cure.",
      'What makes software feel truly fast to a user?':
        "Optimistic UI updates + zero layout shift + local caching. When a user clicks 'Like' or 'Save', update the screen in 0ms, then sync in the background. If the request fails, roll back gracefully with a toast. Never make a human wait for a server round-trip to feel confirmed.",
      'How do you keep bundle sizes under 150KB?':
        "Zero unused NPM packages. Dynamic imports for modals and heavy visualizers. Lucide tree-shaking. Native Web APIs (Canvas 2D, Web Audio) instead of dragging in 800KB physics/audio libraries when 150 lines of pure math can do it better.",
    },
    freeFormFallback: "Software should feel like an extension of thought, not an obstacle course.",
  },
  {
    id: 'journey',
    label: 'Where the hell have I been for the past few years??',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    anchorRatio: { x: 0.50, y: -0.01 },
    nodeRatio:   { x: 0.49, y: 0.42 },
    segments: 9,
    followUps: [
      'What was your biggest turning point as a developer?',
      'Tell me about your internship and work experience',
      'Download the clean 1-page PDF resume',
    ],
    responses: {
      'What was your biggest turning point as a developer?':
        "The moment I stopped building tutorials and started building products. I was stuck in tutorial hell for months — watching courses, copying code, feeling productive but never creating. The turning point: building a WhatsApp clone from scratch with no guide. Failed spectacularly the first time. But the debugging, the 3 AM breakthroughs — that's when I became a developer. Now I learn by building, always.",
      'Tell me about your internship and work experience':
        "Full-Stack Developer at an IT Company since Jan 2026. Before that — freelancing: MVPs, landing pages, internal tools for startups. In college I tutored coding and built side projects obsessively. Work spans: AI video platforms (Chatx2.ai), enterprise healthcare (Atella), fleet management (JetPlus), social analytics (ViralSight), real-time collaboration (ConvoLink). Each project taught me something different about scale, architecture, and shipping under pressure.",
      'Download the clean 1-page PDF resume':
        "📄 Resume download coming soon! In the meantime, check out my LinkedIn for the full breakdown: linkedin.com/in/adarshpathania04",
    },
    freeFormFallback: "My journey's been wild — let's connect on LinkedIn and I'll tell you the full story.",
  },
  {
    id: 'biggest-mistake',
    label: 'The 4 AM incident that almost ended my sanity 💀',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.4)',
    anchorRatio: { x: 0.63, y: -0.01 },
    nodeRatio:   { x: 0.62, y: 0.27 },
    segments: 7,
    followUps: [
      'How did you recover the lost data?',
      'What safeguards do you build now?',
    ],
    responses: {
      'How did you recover the lost data?':
        "It was during my first multi-tenant client build. I ran a migration script with a malformed WHERE clause on staging... except the DATABASE_URL environment variable pointed to production. Point-in-time recovery on Neon Postgres saved the entire company. I restored the replica snapshot from 3:58 AM, verified row integrity, and had production back online in 22 minutes.",
      'What safeguards do you build now?':
        "1) Production databases require MFA and isolated VPC tokens. 2) CLI migrations run in dry-run transaction mode first. 3) Automated snapshotting every 30 minutes. 4) Zero human access to raw write keys in local environments.",
    },
    freeFormFallback: "You haven't lived until you've debugged a production disaster under extreme pressure.",
  },
  {
    id: 'goals',
    label: 'What are my future goals & where am I headed?',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.35)',
    anchorRatio: { x: 0.76, y: -0.01 },
    nodeRatio:   { x: 0.77, y: 0.40 },
    segments: 7,
    followUps: [
      'What kind of role or team are you looking for right now?',
      'What new technologies are you currently learning?',
      'Why should a founder or tech lead bet on you?',
    ],
    responses: {
      'What kind of role or team are you looking for right now?':
        "A small, fast, ambitious engineering team where I can own significant product chunks — not just write tickets. Ideally building AI-native apps, dev tools, or SaaS infrastructure. I thrive where shipping speed matters but code quality isn't sacrificed. A role where I grow into systems architecture while still writing code daily. Remote-friendly preferred, flexible for the right opportunity.",
      'What new technologies are you currently learning?':
        "Deep-diving into: Go (high-perf backend services), distributed systems (consensus, event sourcing, CQRS), Rust (WASM & perf-critical modules), advanced LLM orchestration (agent frameworks, RAG, function calling), and Kubernetes. The next wave of software is AI-native — I want to be fluent in building it.",
      'Why should a founder or tech lead bet on you?':
        "Because I don't just write code — I solve problems. 6+ production apps across healthcare, AI, fintech, real-time collab. I can architect a system, build the API, design the DB, write the frontend, deploy it — all in the same sprint. I learn fast, ship faster, and care deeply about the craft. On your team I'm a multiplier, not just a contributor.",
    },
    freeFormFallback: "Happy to discuss my vision and goals — let's connect!",
  },
  {
    id: 'unknown-stack',
    label: "What happens if you drop me in a stack I've never touched? 🧪",
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
    anchorRatio: { x: 0.16, y: -0.01 },
    nodeRatio:   { x: 0.18, y: 0.68 },
    segments: 10,
    followUps: [
      'Walk me through your 48-hour onboarding formula',
      'What was the fastest framework you picked up from scratch?',
    ],
    responses: {
      'Walk me through your 48-hour onboarding formula':
        "Hour 1-6: Clone repo, run tests, follow one user request from network socket to DB query. Hour 7-18: Read the official spec docs, not random YouTube videos. Hour 19-30: Build a throwaway micro-clone of the hardest core mechanic. Hour 31-48: Pick an open issue or low-priority bug, solve it, and submit a cleanly tested PR.",
      'What was the fastest framework you picked up from scratch?':
        "Frappe / ERPNext (Python-based enterprise framework). Had never written a single line of Frappe. Delivered custom DocTypes, RBAC permissions, and automated webhook triggers for a client in 4 days.",
    },
    freeFormFallback: "Languages and frameworks are just syntax; fundamentals and systems thinking translate everywhere.",
  },
  {
    id: 'hobbies',
    label: "My hobbies... if you're even interested 👀",
    color: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
    anchorRatio: { x: 0.32, y: -0.01 },
    nodeRatio:   { x: 0.34, y: 0.65 },
    segments: 9,
    followUps: [
      "What's your Chess rating & favorite opening?",
      'Challenge me to a live match',
      'What do you do to recharge after a 12-hour coding sprint?',
    ],
    responses: {
      "What's your Chess rating & favorite opening?":
        "Rapid rating 2000 (Candidate Master / Expert strength on Chess.com & Lichess). White: Italian Game (Giuoco Piano) & Scotch. Black: Sicilian Defense (Najdorf when I'm aggressive). Chess and systems engineering scratch the exact same itch: prophylactic calculation, pattern recognition, and ruthless tactical execution.",
      'Challenge me to a live match':
        "♟️ Always down! Find me on Chess.com or Lichess (DM me on LinkedIn for my handle). Fair warning: I play the Sicilian and I don't resign easily 😤",
      'What do you do to recharge after a 12-hour coding sprint?':
        "Chess puzzles (relaxing with more mental strain, yes), long walks with lo-fi or progressive metal, cooking something elaborate, or diving into cybersecurity rabbit holes — exploit write-ups, CTFs, threat intelligence. Also a voracious reader — currently into systems thinking and software architecture books.",
    },
    freeFormFallback: "Want to know more about life outside code? Hit me up!",
  },
  {
    id: 'explain',
    label: 'Can I explain complex code like you\'re five?',
    color: '#eab308',
    glow: 'rgba(234,179,8,0.35)',
    anchorRatio: { x: 0.48, y: -0.01 },
    nodeRatio:   { x: 0.50, y: 0.74 },
    segments: 11,
    followUps: [
      'Explain how you optimize a slow database query',
      'Tell me about your coding mentorship experience',
    ],
    responses: {
      'Explain how you optimize a slow database query':
        "Pick a level with the toggle above! ⬆️ I can explain it for a 5-year-old, a junior dev, or a senior architect.",
      'Tell me about your coding mentorship experience':
        "Tutored 10+ juniors and college students in web dev, React, and system design. My approach: give them a real problem, let them struggle for 30 min, then guide via questions instead of answers. The 'aha moment' when a student debugs their first production issue alone? Best feeling in engineering.",
    },
    freeFormFallback: "Pick any topic and I'll break it down at any level — just ask!",
  },
  {
    id: 'turing-test',
    label: 'Am I an AI bot? Take the Turing Test 👀',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    anchorRatio: { x: 0.65, y: -0.01 },
    nodeRatio:   { x: 0.66, y: 0.64 },
    segments: 8,
    followUps: [
      'Tell me something only a real human would say',
      'What coffee do you drink at 2 AM?',
      'Calculate 87293847 * 39482938 instantly',
    ],
    responses: {
      'Tell me something only a real human would say':
        "I stubbed my pinky toe on my desk yesterday trying to catch a falling USB drive, dropped the drive anyway, and sat on the floor questioning my life choices for 4 minutes. An AI doesn't feel the betrayal of an inanimate desk leg.",
      'What coffee do you drink at 2 AM?':
        "Pour-over black coffee with zero sugar. If it's a critical production deployment, dark roast with a pinch of cinnamon. No energy drinks — crash is too severe.",
      'Calculate 87293847 * 39482938 instantly':
        "3,446,617,144,484,786... just kidding, I opened a node REPL in my second monitor to write that. A human uses tools, an AI hallucinated the last 4 digits.",
    },
    freeFormFallback: "You decide: human with terminal obsession, or an LLM that loves React 19?",
  },
  {
    id: 'easter-egg',
    label: '⚠️ DO NOT PULL THIS STRING',
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.5)',
    anchorRatio: { x: 0.84, y: -0.01 },
    nodeRatio:   { x: 0.83, y: 0.68 },
    segments: 6,
    followUps: [],
    responses: {},
    freeFormFallback: "You found the easter egg! 🎉",
  },
];

// ── 7 Lighting Themes ──────────────────────────────────────
export const THEME_MODES = [
  { id: 'cyber-void', name: 'Cyber-Void', bg: '#050608', accent: '#00f0ff' },
  { id: 'light', name: 'Clean Light', bg: '#f8fafc', accent: '#2563eb' },
  { id: 'lo-fi-lamp', name: 'Warm Lo-Fi Lamp', bg: '#16120e', accent: '#ffb347' },
  { id: 'blueprint', name: 'Blueprint Wireframe', bg: '#04111d', accent: '#00f0ff' },
  { id: 'synthwave', name: 'Synthwave 1984', bg: '#0d021f', accent: '#ec4899' },
  { id: 'matrix', name: 'Emerald Terminal', bg: '#021208', accent: '#10b981' },
  { id: 'lotm', name: 'LOTM Celestial Gold', bg: '#02050a', accent: '#f0b85b' },
];

export const THEME_COLORS = {
  'cyber-void': {
    bg: '#050608',
    threadBase: '#00f0ff',
    threadGlow: 'rgba(0,240,255,0.25)',
    particle: 'rgba(255,255,255,0.25)',
    explored: '#fbbf24',
  },
  'light': {
    bg: '#f8fafc',
    threadBase: '#2563eb',
    threadGlow: 'rgba(37, 99, 235, 0.28)',
    particle: 'rgba(15, 23, 42, 0.16)',
    explored: '#d97706',
  },
  'lo-fi-lamp': {
    bg: '#16120e',
    threadBase: '#ffb347',
    threadGlow: 'rgba(255,179,71,0.28)',
    particle: 'rgba(255,210,150,0.22)',
    explored: '#f59e0b',
  },
  'blueprint': {
    bg: '#04111d',
    threadBase: '#00f0ff',
    threadGlow: 'rgba(0,240,255,0.3)',
    particle: 'rgba(0,240,255,0.2)',
    explored: '#38bdf8',
  },
  'synthwave': {
    bg: '#0d021f',
    threadBase: '#ec4899',
    threadGlow: 'rgba(236,72,153,0.35)',
    particle: 'rgba(244,114,182,0.25)',
    explored: '#a855f7',
  },
  'matrix': {
    bg: '#021208',
    threadBase: '#10b981',
    threadGlow: 'rgba(16,185,129,0.35)',
    particle: 'rgba(52,211,153,0.25)',
    explored: '#4ade80',
  },
  'lotm': {
    bg: '#02050a',
    threadBase: '#f0b85b',
    threadGlow: 'rgba(240,184,91,0.35)',
    particle: 'rgba(240,184,91,0.25)',
    explored: '#f0b85b',
  },
  'dark': {
    bg: '#050608',
    threadBase: '#00f0ff',
    threadGlow: 'rgba(0,240,255,0.25)',
    particle: 'rgba(255,255,255,0.25)',
    explored: '#fbbf24',
  },
  'light': {
    bg: '#faf8f5',
    threadBase: '#3b82f6',
    threadGlow: 'rgba(59,130,246,0.2)',
    particle: 'rgba(0,0,0,0.06)',
    explored: '#f59e0b',
  },
};

export const SHOWCASE_PROJECTS = [
  {
    title: 'Chatx2.ai',
    desc: 'Generative AI Video Studio — text-to-video & image-to-video powered by Kling 4.0',
    tags: ['AI/LLMs', 'Full-Stack', 'SaaS'],
    tech: ['Next.js 15', 'Hono.js', 'fal.ai', 'Kling 4.0', 'Prisma', 'PostgreSQL', 'Stripe'],
    image: '/images/projects/chatx2.jpg',
  },
  {
    title: 'Atella Health Suite',
    desc: '5 enterprise panels, 40+ screens — patient, therapist, admin, clinic manager dashboards',
    tags: ['Full-Stack', 'Enterprise', 'Cloud DB'],
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Hono.js', 'RBAC'],
    image: '/images/projects/atella.jpg',
  },
  {
    title: 'JetPlus',
    desc: 'Fleet telemetry & smart directions cache — 68% API cost reduction',
    tags: ['Real-Time', 'Maps/Geo', 'Cloud DB'],
    tech: ['Google Maps API', 'Redis', 'WebSockets', 'Next.js'],
    image: '/images/projects/jetplus.jpg',
  },
  {
    title: 'ViralSight',
    desc: 'Video virality analytics — engagement predictions & trend detection',
    tags: ['Full-Stack', 'SaaS', 'Analytics'],
    tech: ['tRPC', 'Stripe', 'TanStack Router', 'React'],
    image: '/images/projects/viralsight.jpg',
  },
  {
    title: 'ConvoLink',
    desc: 'Real-time reactive workspace — live collaboration with presence',
    tags: ['Real-Time', 'WebSockets', 'Full-Stack'],
    tech: ['Convex DB', 'WebRTC', 'Next.js', 'React'],
    image: '/images/projects/convolink.jpg',
  },
  {
    title: 'MedScan AI',
    desc: 'Medical diagnostic pipeline — image classification & anomaly detection',
    tags: ['AI/LLMs', 'Python', 'ML/DL'],
    tech: ['Python', 'Flask', 'RCNN', 'PyTorch', 'OpenCV'],
    image: null,
  },
];

export const PROJECT_TAGS = [
  'Full-Stack', 'AI/LLMs', 'Real-Time', 'WebSockets',
  'SaaS', 'Enterprise', 'Cloud DB', 'Maps/Geo',
  'Analytics', 'ML/DL', 'Python',
];

export const MILESTONES = [
  { year: '2022', title: 'The Beginning',                 desc: 'Started learning web dev. HTML, CSS, JS — the holy trinity. Built my first terrible website and fell in love with the craft.', type: 'origin' },
  { year: '2023', title: 'Tutorial Hell → Real Projects',  desc: 'Escaped tutorial hell by building a WhatsApp clone from scratch. Failed, rebuilt, failed again. Learned React, Node.js, and the value of reading docs.', type: 'growth' },
  { year: '2024', title: 'Full-Stack Awakening',           desc: 'Went deep into Next.js, PostgreSQL, system design. Built ViralSight, ConvoLink, started freelancing. First paying client. First production deployment disaster.', type: 'milestone' },
  { year: '2025', title: 'AI & Enterprise',                desc: 'Built Chatx2.ai (AI video studio), Atella Health Suite (enterprise healthcare), JetPlus (fleet management). Learned to architect systems, not just write code.', type: 'milestone' },
  { year: '2026', title: 'Going Pro',                      desc: 'Full-time dev at an IT company since January. Shipping production code daily. Learning Go, distributed systems, Kubernetes. Building the future.', type: 'current' },
];

export const CHESS_PUZZLE = {
  title: 'White to play — Mate in 2',
  fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
  solution: ['Qxf7#'],
  hint: 'Target the weakest square around the king...',
};

export const EXPLAIN_TOPICS = [
  {
    id: 'database',
    label: 'Database Optimization',
    icon: '🗄️',
    levels: {
      1: "Imagine a HUGE toy box and you need one specific LEGO. Right now you dump EVERYTHING on the floor and look through it all. An 'index' is like putting labels on sections — 'red here, blue there' — so you go straight to the right section!",
      2: "Add indexes on columns in WHERE clauses. Use EXPLAIN ANALYZE to find seq scans. Avoid SELECT * — fetch only needed columns. Paginate with cursor-based pagination. Consider denormalizing hot read paths. Use connection pooling.",
      3: "Profile with pg_stat_statements for top-N slow queries. Composite indexes matching WHERE + ORDER BY. Partial indexes for filtered subsets. Read replicas for analytics. Redis cache for hot data. Materialized views for complex aggregations. Monitor index bloat, tune autovacuum, BRIN indexes for time-series.",
    },
  },
  {
    id: 'websockets',
    label: 'WebSockets & Real-Time',
    icon: '🔌',
    levels: {
      1: "Normally a website is like sending letters — question, wait, answer, wait. WebSockets are like a PHONE CALL — once you connect, both sides can talk whenever they want without hanging up!",
      2: "WebSocket opens a persistent TCP connection after an HTTP handshake upgrade. Both sides push messages anytime. Use Socket.IO or native API. Handle reconnection, heartbeats, and offline message queuing.",
      3: "Edge WebSocket via Cloudflare Durable Objects or AWS API Gateway for global low-latency. Redis Pub/Sub for horizontal scaling. Binary protocols (MessagePack/Protobuf) for bandwidth. Backpressure handling, vector clocks for ordering, CRDTs for collaborative editing conflict resolution.",
    },
  },
  {
    id: 'auth',
    label: 'Authentication & Security',
    icon: '🔐',
    levels: {
      1: "Think of a website like a clubhouse. Authentication is the secret password. A 'token' is a wristband the bouncer gives you after you say the password — now you walk around without saying it every time!",
      2: "JWT (stateless, hard to revoke) vs sessions (stateful, stored in Redis/DB, easy revocation). Bcrypt for passwords. Refresh tokens + short-lived access tokens. HTTP-only, Secure, SameSite cookies.",
      3: "OAuth 2.0 + PKCE for third-party auth. Asymmetric JWT (RS256) with key rotation. Encrypted HTTP-only cookie for refresh tokens + CSRF protection. Rate limiting auth endpoints. Argon2id for hashing. TOTP MFA. Device fingerprinting + anomaly detection.",
    },
  },
];
