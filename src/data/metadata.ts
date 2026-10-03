import type { SiteMetadata } from "@/lib/types"
import type { Metadata } from "next"

/**
 * Site metadata configuration
 * Customize this file with your own information for SEO and social media sharing
 */
export const siteMetadata: SiteMetadata = {
  /**
   * Accent color theme for the portfolio.
   * Options: "blue" | "purple" | "green" | "orange" | "rose" | "teal" | "indigo" | "amber" | "cyan" | "violet"
   * The chosen theme controls the accent color used across all components.
   */
  theme: "blue",

  /**
   * Site title (shown in browser tabs and search results)
   */
  title: "Ehsan Kazemi | احسان کاظمی | AI Engineer & Full-Stack Developer",

  /**
   * Site description (shown in search results and social media)
   */
  description:
    "Ehsan Kazemi (احسان کاظمی) is an AI Engineer and Full-Stack Developer from Isfahan, Iran. Portfolio, AI projects, work experience, and technical blog of Ehsan Kazemi.",

  /**
   * Keywords for SEO
   */
  keywords: [
    "احسان کاظمی",
    "Ehsan Kazemi",
    "EhsaN Kazemi",
    "eh3ankazemi",
    "Ehsan Kazemi AI Engineer",
    "AI Engineer Iran",
    "مهندس هوش مصنوعی",
    "eh3ankazemi",
    "برنامه‌نویس فول‌استک",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Python Developer",
    "Portfolio",
    "پورتفولیو",
    "ایران",
    "احسان کاظمی فریلنسر",
    "Ehsan Kazemi portfolio",
    "احسان کاظمی وبلاگ",
    "Ehsan Kazemi blog",
    "AI Developer",
    "Software Developer",
  ],
  /**
   * Author information
   */
  author: {
    name: "Ehsan Kazemi",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ehsan-kazemi.ir",
  },

  /**
   * Base URL of your website (used for canonical URLs and Open Graph).
   * Set NEXT_PUBLIC_SITE_URL in your environment (e.g. .env.local) to override the default.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ehsan-kazemi.ir",

  /**
   * Social media handles
   */
  social: {
    twitter: "@eh3ankazemi",
  },

  /**
   * Social profile URLs used for Person/Organization schema markup.
   */
  sameAs: [
    "https://github.com/eh3ankazemi",
    "https://www.linkedin.com/in/eh3ankazemi",
    "https://x.com/eh3ankazemi",
    "https://www.instagram.com/eh3ankazemi/",
    "https://www.youtube.com/@eh3ankazemi",
    "https://links.ehsan-kazemi.ir/",
  ],

  /**
   * Optional: Custom Open Graph image for the index (home) page.
   * Set this to the path of an image in your public folder (e.g. "/og-image.png").
   * Set to null to use the auto-generated dynamic OG image instead.
   *
   * Note: /blog, /projects, and /work always use dynamically generated OG images.
   */
  ogImage: null,
}

/**
 * Generate the complete metadata object for Next.js
 * This is used in layout.tsx
 */
export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.author.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author.name, url: siteMetadata.author.url }],
  creator: siteMetadata.author.name,
  publisher: siteMetadata.author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: process.env.ICON_URL ?? "/icons/favicon.ico",
    shortcut: process.env.ICON_URL ?? "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  metadataBase: new URL(siteMetadata.siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      fa: "/",
      en: "/",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.author.name,
    alternateLocale: ["en_US"],
    countryName: "Iran",
    emails: ["hello@ehsan-kazemi.ir"],
    ...(siteMetadata.ogImage && {
      images: [
        {
          url: siteMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
        },
      ],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.social.twitter,
    ...(siteMetadata.ogImage && { images: [siteMetadata.ogImage] }),
  },
  category: "technology",
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  // },
}
