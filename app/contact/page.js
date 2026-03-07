import ContactPageContent from "./contact-page";
import { buildPageMetadata } from "../../lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Adarsh Pathania for full-stack development, Next.js websites, React applications, backend engineering, freelance work, and product collaborations.",
  path: "/contact",
  keywords: [
    "contact Adarsh Pathania",
    "hire Adarsh Pathania",
    "freelance Next.js developer",
    "React developer contact",
  ],
});

export default function ContactPage() {
  return <ContactPageContent />;
}
