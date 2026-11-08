import chatx2 from "../../assets/projects/chatx2.jpg";
import atella from "../../assets/projects/atella.jpg";
import jetplus from "../../assets/projects/jetplus.jpg";
import viralSight from "../../assets/projects/viralsight.jpg";
import convoLink from "../../assets/projects/convolink.jpg";
import medscan from "../../assets/projects/medscan-ai.png";

const projectInfo = [
  {
    name: "Chatx2.ai Video Studio",
    desc: "Production Multi-Model Generative AI Video Platform. Orchestrates Kling 4.0, MiniMax H3, Fal.ai & Wan 3.0 with S3 signed streaming, Hono edge gateway, and micro-billing credits.",
    techUsed: ["Next.js 15", "Fal.ai", "Hono Gateway", "PHP Wallet", "AWS S3", "Tailwind CSS"],
    winView: chatx2,
    mbView: "",
    liveLink: "https://chatx2.ai",
    codeLink: "https://github.com/Stack-Sage",
    main: "Next JS",
  },
  {
    name: "Atella EHR Health Suite",
    desc: "5-Portal Enterprise Healthcare Ecosystem (Clinic Owner, Provider BCBA, Office HR Manager, SuperAdmin & Check-In Kiosk) with strict role-based access control and HIPAA compliance.",
    techUsed: ["Next.js", "TypeScript", "Tailwind CSS", "RBAC", "Prisma", "PostgreSQL"],
    winView: atella,
    mbView: "",
    liveLink: "https://atella.health",
    codeLink: "https://github.com/Stack-Sage",
    main: "Next JS",
  },
  {
    name: "JetPlus Fleet Telemetry",
    desc: "Real-time dispatch telemetry and navigation engine with multi-tier Google Directions API route caching (memory + localStorage) reducing map API costs by 68%.",
    techUsed: ["Next.js", "Google Maps API", "Directions Cache", "WebSockets", "Tailwind CSS"],
    winView: jetplus,
    mbView: "",
    liveLink: "https://jetplus.app",
    codeLink: "https://github.com/Stack-Sage",
    main: "Next JS",
  },
  {
    name: "ViralSight Intelligence",
    desc: "Creator virality analytics platform with tRPC, Stripe metered billing, automated video virality scoring, and Web Push notifications.",
    techUsed: ["Next.js", "tRPC", "Prisma", "Stripe", "Tailwind CSS", "MongoDB"],
    winView: viralSight,
    mbView: "",
    liveLink: "https://viral-sight-nextjs.vercel.app/",
    codeLink: "https://github.com/Stack-Sage",
    main: "Next JS",
  },
  {
    name: "ConvoLink WebRTC",
    desc: "Ultra-low latency audio/video calling workspace with Convex real-time reactive database, room mesh signaling, and instant encrypted chat.",
    techUsed: ["Next.js", "WebRTC", "Convex DB", "Tailwind CSS", "React Hooks"],
    winView: convoLink,
    mbView: "",
    liveLink: "https://convo-link-delta.vercel.app/",
    codeLink: "https://github.com/Adarsh-V1/chatRoom/",
    main: "Next JS",
  },
  {
    name: "MedScan AI Diagnostics",
    desc: "Deep learning radiographic pulmonary classification pipeline achieving 94.6% AUC on chest X-ray scans with multi-class Grad-CAM heatmap explainability.",
    techUsed: ["Python", "PyTorch", "FastAPI", "React JS", "Grad-CAM", "Docker"],
    winView: medscan,
    mbView: "",
    liveLink: "https://github.com/Stack-Sage",
    codeLink: "https://github.com/Stack-Sage",
    main: "Python",
  },
];

export default projectInfo;
