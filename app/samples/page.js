import { buildPageMetadata } from "../../lib/seo";
import SamplesClient from "./samples-client";

export const metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Browse featured projects and coding samples by Adarsh Pathania, including React apps, Next.js builds, Python tools, interactive UI work, and full-stack experiments.",
  path: "/samples",
  keywords: [
    "Adarsh Pathania projects",
    "Adarsh portfolio projects",
    "Next.js samples",
    "React project showcase",
  ],
});

export default function Samples() {
  return <SamplesClient />;
}