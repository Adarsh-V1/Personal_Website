import medscanAi from "../assets/projects/medscan-ai.png";
import codehive from "../assets/projects/codehive.png";
import convolink from "../assets/projects/convolink.png";

export const featuredProjects = [
  {
    id: "medscan-ai",
    title: "MedScan AI",
    subtitle: "AI-Powered Medical Image Analysis",
    hook: "Turning complex medical scans into AI-powered insights within seconds.",
    description:
      "A full-stack medical imaging platform that analyzes X-rays and MRI scans using a trained RCNN model. It helps detect fractures, tumors, and other medical abnormalities while showing confidence scores and supporting diagnostic information.",
    techStack: [
      "Next.js",
      "React",
      "Python",
      "Flask",
      "RCNN",
      "Machine Learning",
      "Image Processing",
    ],
    features: [
      "Medical scan upload and analysis",
      "Fracture and tumor detection",
      "AI-generated confidence scores",
      "Symptoms, causes, diagnosis, and treatment information",
      "Modern responsive result dashboard",
    ],
    image: medscanAi,
    alt: "MedScan AI medical imaging analysis dashboard",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: true,
    detail: {
      problem:
        "Medical professionals needed a fast, AI-assisted way to analyze X-ray and MRI scans for fractures, tumors, and abnormalities — reducing diagnostic turnaround time.",
      solution:
        "Built a full-stack Next.js + Flask pipeline with a trained RCNN model for automated anomaly detection. The frontend provides an intuitive upload interface, while the Python backend runs inference and returns confidence scores alongside structured diagnostic data.",
      challenges: [
        "Achieving high model accuracy across varied medical scan formats",
        "Optimizing inference time to stay under 3 seconds per scan",
        "Building a clean, accessible results dashboard for non-technical users",
      ],
      outcome:
        "Delivered a working diagnostic assistant that processes scans in under 3 seconds with explainable confidence scores and structured medical insights.",
    },
  },
  {
    id: "codehive",
    title: "CodeHive",
    subtitle: "Tutor Marketplace & Learning Platform",
    hook: "Connecting students with the right educators through one seamless learning platform.",
    description:
      "A full-stack EdTech marketplace inspired by Superprof where students can discover educators, view profiles, message tutors, save favorites, and explore subjects. Educators receive a dedicated dashboard with engagement, messaging, and session analytics.",
    techStack: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "Tailwind CSS",
    ],
    features: [
      "Student and educator profiles",
      "Tutor discovery and search",
      "Real-time messaging",
      "Favorites and profile browsing",
      "Educator dashboard and analytics",
      "Responsive marketplace interface",
    ],
    image: codehive,
    alt: "CodeHive tutor marketplace platform",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1",
    featured: false,
    detail: {
      problem:
        "Students struggled to find qualified tutors in a centralized marketplace, while educators lacked tools to manage sessions and track engagement.",
      solution:
        "Built a dual-interface platform: students browse, search, and message tutors; educators get a dashboard with session analytics and messaging. Real-time Socket.IO powers instant communication.",
      challenges: [
        "Designing a scalable real-time messaging system with Socket.IO",
        "Building a dual-role auth and profile system",
        "Creating an analytics dashboard with meaningful educator metrics",
      ],
      outcome:
        "A production-ready marketplace connecting students and educators with real-time messaging, profile management, and actionable analytics.",
    },
  },
  {
    id: "convolink",
    title: "ConvoLink",
    subtitle: "Real-Time Chat & Video Collaboration App",
    hook: "A modern workspace that brings messaging, groups, calls, and collaboration together.",
    description:
      "A real-time team communication platform with one-to-one messaging, public and private groups, presence tracking, file sharing, user analytics, and video calling. Convex powers live synchronization across the application.",
    techStack: [
      "Next.js",
      "React",
      "Convex",
      "Tailwind CSS",
      "Video Calling SDK",
      "Real-Time Database",
    ],
    features: [
      "Real-time direct messaging",
      "Public and private groups",
      "Video and voice calling",
      "Live presence and activity tracking",
      "File sharing",
      "User account analytics",
      "Responsive dark workspace UI",
    ],
    image: convolink,
    alt: "ConvoLink real-time chat and video collaboration app",
    liveUrl: "https://convo-link-delta.vercel.app/",
    caseStudyUrl: "#projects",
    githubUrl: "https://github.com/Adarsh-V1/chatRoom/",
    featured: false,
    detail: {
      problem:
        "Remote teams needed a secure, real-time collaboration platform combining messaging, video calls, presence tracking, and file sharing in one workspace.",
      solution:
        "Leveraged Convex for live data synchronization across messages, presence, and file metadata. Integrated WebRTC-based video and voice calling with automatic room management.",
      challenges: [
        "Achieving sub-100ms message latency with Convex real-time sync",
        "Building presence tracking across multiple device sessions",
        "Integrating reliable video calling with automatic room cleanup",
      ],
      outcome:
        "A full-featured team communication platform with real-time messaging, video calls, presence tracking, and file sharing — all synced live via Convex.",
    },
  },
];
