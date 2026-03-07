import ServicesPageClient from "./services-page-client";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Explore Adarsh Pathania's services for Next.js development, React websites, MERN applications, product collaboration, and full-stack engineering work.",
  path: "/services",
  keywords: [
    "Adarsh Pathania services",
    "Next.js development services",
    "React website developer",
    "full stack freelance developer",
  ],
});

export default function ServicesPage() {
  return <ServicesPageClient />;
}
