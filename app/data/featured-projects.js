import chatx2Img from "../assets/projects/chatx2.jpg";
import atellaImg from "../assets/projects/atella.jpg";
import jetplusImg from "../assets/projects/jetplus.jpg";
import viralsightImg from "../assets/projects/viralsight.jpg";
import convolinkImg from "../assets/projects/convolink.jpg";
import medscanAi from "../assets/projects/medscan-ai.png";

export const featuredProjects = [
  {
    id: "chatx2-ai",
    title: "Chatx2.ai — Generative AI Video Studio",
    subtitle: "Multi-Model AI Video Editing & Credit Settlement Platform",
    hook: "Orchestrating state-of-the-art AI video models (Kling 4.0, MiniMax H3, Wan 3.0) with S3 presigned streams and sub-second credit reservations.",
    description:
      "A production-grade AI video studio engineered with Next.js App Router and Hono.js. Integrates fal.ai and WaveSpeed providers for reference-to-video, video-to-video editing, and frame-accurate prompt morphing. Features wallet reservations, automated S3 presigned streaming, and background cron recovery workers.",
    techStack: [
      "Next.js 15",
      "React 19",
      "Hono.js",
      "fal.ai",
      "Kling 4.0",
      "AWS S3",
      "TypeScript",
      "Tailwind CSS v4",
    ],
    features: [
      "Multi-model video routing (Kling 4.0, MiniMax H3, Seedance 2.5, Wan 3.0)",
      "Native 720p/1080p video-to-video editing with aspect ratio preservation",
      "Atomic credit wallet reservations & settlement with zero overdraws",
      "S3 presigned 1-hour signed streaming with server-side encryption",
      "Automated cron recovery worker for long-running GPU inference tasks",
      "Glassmorphic studio timeline with frame scrubber and parameter controls",
    ],
    image: chatx2Img,
    alt: "Chatx2.ai multimodal AI video editing studio",
    liveUrl: "https://chatx2.ai",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: true,
    detail: {
      problem:
        "Creators needed an intuitive web interface to generate and edit video using leading AI models (Kling 4.0, MiniMax H3, Wan 3.0) without dealing with raw GPU APIs, wallet race conditions, or expired media storage.",
      solution:
        "Engineered an end-to-end multi-provider video pipeline using Next.js and Hono. The backend handles wallet credit holds, queues tasks to fal.ai and WaveSpeed, persists encrypted outputs to AWS S3, and delivers 1-hour signed playback URLs with automatic cron recovery for interrupted tasks.",
      challenges: [
        "Eliminating credit race conditions during concurrent video generation requests",
        "Managing diverse provider API payloads and aspect ratio constraints across 5 distinct models",
        "Designing low-latency signed streaming that eliminates CORS and playback stutter",
      ],
      outcome:
        "Achieved seamless 60fps video-to-video transformation with 100% wallet reservation accuracy and sub-2s API queue dispatch.",
    },
  },
  {
    id: "atella-health",
    title: "Atella Health Suite — 5 Enterprise Panels",
    subtitle: "Autism Clinic EHR, BCBA Clinical Notes & Multi-Tenant Operations",
    hook: "Powering ABA therapy clinics across 40+ production screens with role-based auth, clinical trial tracking, and automated billing ledgers.",
    description:
      "A comprehensive healthcare enterprise platform comprising 5 dedicated web portals: Clinic Owner Panel, BCBA Provider Panel, Office HR Manager Panel, Reception Kiosk Terminal, and SuperAdmin Console. Features real-time ABC behavior tracking, automated CPT code billing (97151/97153), and biometric parent sign-in.",
    techStack: [
      "Next.js App Router",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Better Auth",
      "TanStack Query",
      "Tailwind CSS",
    ],
    features: [
      "5 dedicated panels tailored for specific organizational hierarchies",
      "40+ production screens covering patient intake, scheduling, and billing",
      "BCBA trial data collection with Antecedent-Behavior-Consequence (ABC) graphs",
      "Reception kiosk check-in with guardian QR code scan & late arrival tracking",
      "Automated insurance claim batching and timesheet payroll verification",
      "Granular HIPAA-compliant role-based permission boundaries",
    ],
    image: atellaImg,
    alt: "Atella Health ABA clinic enterprise management system",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: true,
    detail: {
      problem:
        "Autism therapy centers struggled with fragmented tools for parent check-in, clinical session notes, staff credential tracking, and insurance claim billing.",
      solution:
        "Architected a unified multi-tenant platform with 5 specialized web panels sharing a type-safe PostgreSQL database. Providers collect real-time trial data during therapy, clinic owners inspect financial ledgers, and parents sign check-in logs at physical clinic kiosks.",
      challenges: [
        "Architecting strict role-based access control preventing clinical staff from viewing clinic financials",
        "Optimizing data-heavy grids with 1,000+ patient therapy trial history logs",
        "Handling offline caching on the reception kiosk during local internet blips",
      ],
      outcome:
        "Reduced clinic session documentation time by 45% and eliminated 100% of unbilled therapy sessions across pilot facilities.",
    },
  },
  {
    id: "jetplus-telemetry",
    title: "JetPlus — Fleet Telemetry & Smart Cache",
    subtitle: "Real-Time Driver Tracking & Google Directions API Optimization",
    hook: "Slashing Google Maps API costs by 68% while delivering 60fps live vehicle telemetry and duty-report compliance grids.",
    description:
      "An enterprise fleet and driver live tracking system built for mission-critical logistics. Implements a multi-tier spatial Directions response cache (memory + localStorage with stable coordinate hashing) that caches successful and failed routes, preventing catastrophic quota spikes. Features virtualized TanStack Tables for high-density duty logs.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Google Maps API",
      "TanStack Table",
      "Zustand",
      "Tailwind CSS v4",
    ],
    features: [
      "Multi-tier Directions API response persistence with bounded TTL pruning",
      "Negative route caching (ZERO_RESULTS / NOT_FOUND) to stop recurring paid calls",
      "High-density virtualized driver duty reports with filtering and export",
      "Live GPS telemetry with smooth coordinate interpolation",
      "Timezone-aware driver shift and event log caching",
    ],
    image: jetplusImg,
    alt: "JetPlus fleet telemetry and driver live tracking dashboard",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: false,
    detail: {
      problem:
        "High-frequency driver GPS pings were triggering repeated, redundant Google Directions API requests, creating massive cloud billing spikes and sluggish map rendering.",
      solution:
        "Engineered a deterministic route hashing algorithm that intercepts redundant polyline queries in client memory and localStorage. Failed routes are cached as negative misses, and duty logs are lazily fetched using date/timezone-scoped query keys.",
      challenges: [
        "Developing a cache key hashing function tolerant of minor GPS jitter",
        "Maintaining 60fps map panning with 50+ concurrent vehicle trajectories",
        "Preventing localStorage quota exhaustion with automated LRU pruning",
      ],
      outcome:
        "Reduced third-party mapping API costs by 68% and dropped average route render latency from 320ms to 4ms for cached paths.",
    },
  },
  {
    id: "viralsight",
    title: "ViralSight — Video Analytics & SuperAdmin",
    subtitle: "Real-Time Content Virality Scoring & Web Push Dispatcher",
    hook: "Predicting video engagement velocity with tRPC, Stripe subscriptions, and a dedicated TanStack SuperAdmin console.",
    description:
      "A high-throughput video analytics platform for social media creators and agency managers. Tracks engagement acceleration across video feeds, generates automated virality forecast scores, and manages tier billing through Stripe Connect. Includes a dedicated TanStack Router SuperAdmin dashboard for cross-tenant operations.",
    techStack: [
      "Next.js App Router",
      "tRPC",
      "Prisma ORM",
      "MongoDB & PostgreSQL",
      "Stripe Payments",
      "TanStack Router",
      "Web Push API",
    ],
    features: [
      "Real-time virality scoring algorithm tracking view velocity",
      "TanStack Router SuperAdmin portal with zero-lag client routing",
      "Stripe subscription webhooks with tier entitlement enforcement",
      "Automated Web Push notification dispatch workers for viral spikes",
      "Multi-video side-by-side performance comparison analytics",
    ],
    image: viralsightImg,
    alt: "ViralSight video virality analytics dashboard",
    liveUrl: "https://viralsight.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: true,
    detail: {
      problem:
        "Digital marketing agencies lacked a unified dashboard to benchmark video view velocity across creators before launching paid ad campaigns.",
      solution:
        "Built a tRPC-powered analytics platform that ingests video metrics, calculates velocity derivatives, and dispatches browser push notifications when content goes viral.",
      challenges: [
        "Ensuring zero type drift between the Next.js client and the TanStack Router SuperAdmin",
        "Handling high-volume webhook events from Stripe without drops",
      ],
      outcome:
        "Scaled to thousands of tracked video events with sub-50ms tRPC queries and real-time push alerting.",
    },
  },
  {
    id: "convolink",
    title: "ConvoLink — Real-Time Reactive Workspace",
    subtitle: "Convex Real-Time Database & WebRTC Collaboration Suite",
    hook: "Sub-100ms real-time chat sync, presence tracking, and peer-to-peer WebRTC video calling.",
    description:
      "A modern collaboration workspace that brings messaging, public/private channel threads, file sharing, user presence detection, and WebRTC video calling together. Powered by Convex reactivity for instant data distribution without manual polling.",
    techStack: [
      "Next.js 16",
      "React 19",
      "Convex DB",
      "WebRTC",
      "Lucide Icons",
      "Tailwind CSS",
    ],
    features: [
      "Sub-50ms message delivery with Convex reactive subscriptions",
      "Peer-to-peer browser audio and video calling with jitter buffering",
      "Live typing indicators and heartbeat-based presence detection",
      "Multi-tenant workspace channels with unread count badges",
    ],
    image: convolinkImg,
    alt: "ConvoLink real-time chat and video workspace",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1/chatRoom/",
    featured: false,
    detail: {
      problem:
        "Distributed teams needed a unified communications hub with real-time reactive messaging and lightweight in-browser calling without installing heavy desktop clients.",
      solution:
        "Engineered Convex reactive data tables for state synchronization paired with WebRTC signaling for peer-to-peer video streams.",
      challenges: [
        "Maintaining presence accuracy during unexpected network drops",
        "Minimizing WebRTC connection handshake time across varied NAT firewalls",
      ],
      outcome:
        "Achieved instant message updates with <45ms mutation roundtrips and crystal clear browser video calls.",
    },
  },
  {
    id: "medscan-ai",
    title: "MedScan AI — Medical Diagnostic Pipeline",
    subtitle: "X-Ray & MRI Anomaly Detection with Trained RCNN",
    hook: "Accelerating clinical scan evaluations with sub-3 second computer vision inference.",
    description:
      "A full-stack diagnostic assistant that evaluates radiographic scans using a trained Region-based Convolutional Neural Network (RCNN). Automatically flags fractures, lesions, and pulmonary anomalies with explainable confidence intervals.",
    techStack: [
      "Python",
      "Flask",
      "RCNN",
      "PyTorch",
      "Next.js",
      "Tailwind CSS",
    ],
    features: [
      "Automated radiographic scan ingestion and preprocessing",
      "Bounding-box localized anomaly detection with confidence scores",
      "Structured diagnostic summaries with medical literature correlations",
      "Sub-3 second inference turnaround on standard GPU instances",
    ],
    image: medscanAi,
    alt: "MedScan AI diagnostic assistant dashboard",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: false,
    detail: {
      problem:
        "Clinicians in high-volume clinics experienced delays awaiting preliminary radiographic screening reports.",
      solution:
        "Built an automated computer vision inference pipeline with Flask and PyTorch RCNN that outputs bounding boxes and confidence metrics directly to a responsive Next.js frontend.",
      challenges: [
        "Normalizing diverse resolution DICOM/PNG scans for consistent tensor input",
        "Keeping cold-start inference time strictly under 3 seconds",
      ],
      outcome:
        "Delivered a working diagnostic prototype with high localization precision and sub-3s inference speed.",
    },
  },
];
