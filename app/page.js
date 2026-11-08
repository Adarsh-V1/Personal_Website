import HomeViewManager from "./components/living-threads/HomeViewManager";
import { buildPageMetadata } from "../lib/seo";

export const metadata = buildPageMetadata({
  title: "Adarsh Pathania | The Living Threads Interactive Portfolio",
  description:
    "An atmospheric, zero-gravity interactive developer portfolio. Explore provocative, casual questions tethered by glowing Verlet physics threads, rich signature modals, and an embedded contextual AI twin.",
  path: "/",
  keywords: [
    "hire full stack developer",
    "Adarsh Pathania freelance developer",
    "Living Threads interactive portfolio",
    "React Next.js developer for hire",
    "Verlet physics portfolio",
    "interactive developer portfolio",
  ],
});

export default function Home() {
  return <HomeViewManager />;
}
