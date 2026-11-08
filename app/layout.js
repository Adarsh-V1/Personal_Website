import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import LenisWrapper from "./components/LenisWrapper";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import { ThemeProvider } from "./components/theme-provider";
import { getSiteUrl, getStructuredDataGraph, siteConfig } from "../lib/seo";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: "%s",
  },
  applicationName: siteConfig.siteName,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.linkedIn }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.siteName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": "-1",
      "max-video-preview": "-1",
    },
  },
};

export default function RootLayout({ children }) {
  const structuredData = getStructuredDataGraph();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${spaceGrotesk.variable} min-w-full w-full antialiased bg-[#050608] text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="portfolio-theme"
          themes={["dark", "light", "lotm"]}
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <LenisWrapper>
            <ScrollToTopOnRouteChange />
            <Navbar />
            {children}
          </LenisWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
