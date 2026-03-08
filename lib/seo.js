const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Adarsh Pathania",
  siteName: "Adarsh Pathania Portfolio",
  title: "Adarsh Pathania | Full-Stack Developer",
  description:
    "Adarsh Pathania is a full-stack developer building modern Next.js, React, TypeScript, Node.js, Prisma, and MongoDB applications for startups, products, and fast-moving teams.",
  ogImage: "/images/me_crop.png",
  email: "adarsh.pathania.04@gmail.com",
  phone: "+91 78890 78854",
  location: "Mohali, Punjab, India",
  jobTitle: "Full-Stack Developer",
  linkedIn: "https://www.linkedin.com/in/adarshpathania04/",
  github: "https://github.com/Adarsh-V1",
  keywords: [
    "Adarsh Pathania",
    "Adarsh",
    "Adarsh Pathania portfolio",
    "Adarsh Pathania developer",
    "Adarsh full stack developer",
    "full-stack developer portfolio",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "Node.js developer",
    "software engineer in Mohali",
    "Punjab full stack developer",
  ],
};

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;

  if (!envUrl) {
    return fallbackUrl;
  }

  return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function buildPageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [],
}) {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const mergedKeywords = Array.from(new Set([...siteConfig.keywords, ...keywords]));
  const canonicalUrl = absoluteUrl(path);

  return {
    title: resolvedTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.siteName,
      type: "website",
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  };
}

export function getStructuredDataGraph() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.siteName,
        alternateName: `${siteConfig.name} Portfolio`,
        description: siteConfig.description,
        inLanguage: "en-IN",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        url: siteUrl,
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        image: absoluteUrl(siteConfig.ogImage),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mohali",
          addressRegion: "Punjab",
          addressCountry: "IN",
        },
        sameAs: [siteConfig.linkedIn, siteConfig.github],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Prisma",
          "MongoDB",
          "PostgreSQL",
          "Full-stack development",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Paras Technologies",
        },
      },
    ],
  };
}
