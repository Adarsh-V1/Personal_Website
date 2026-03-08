import { Cinzel, Manrope, Space_Grotesk, Spectral } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import LenisWrapper from "./components/LenisWrapper";
import UiFeedback from "./components/ui-feedback";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import { ThemeProvider } from "./components/theme-provider";
import { getSiteUrl, getStructuredDataGraph, siteConfig } from "../lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-lotm-heading",
  subsets: ["latin"],
});

const spectral = Spectral({
  variable: "--font-lotm-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${manrope.variable} ${spaceGrotesk.variable} ${cinzel.variable} ${spectral.variable} min-w-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="portfolio-theme"
          themes={["light", "lotm"]}
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <LenisWrapper>
            <ScrollToTopOnRouteChange />
            <UiFeedback />
            <Navbar />
            {children}
          </LenisWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
