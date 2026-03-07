import PortfolioShell from "./components/portfolio/portfolio-shell";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Portfolio of Adarsh Pathania, a full-stack developer focused on Next.js, React, TypeScript, Node.js, Prisma, MongoDB, scalable web apps, and polished product engineering.",
  path: "/",
  keywords: [
    "Adarsh Pathania full stack developer",
    "Adarsh Pathania portfolio website",
    "Next.js portfolio",
    "React TypeScript developer",
  ],
});

export default function Home() {
  return <PortfolioShell />;
}
