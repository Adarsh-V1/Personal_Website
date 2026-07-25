import PortfolioShell from "./components/portfolio/portfolio-shell";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Adarsh Pathania — hire a freelance full-stack developer for React, Next.js, Node.js, PostgreSQL projects. SaaS, dashboards, admin panels, AI integration, and mobile apps. Available for contract and agency collaborations.",
  path: "/",
  keywords: [
    "hire full stack developer",
    "Adarsh Pathania freelance developer",
    "React Next.js developer for hire",
    "freelance SaaS developer",
    "admin dashboard developer",
  ],
});

export default function Home() {
  return <PortfolioShell />;
}
