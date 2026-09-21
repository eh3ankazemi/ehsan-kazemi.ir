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
    "Ehsan Kazemi (احسان کاظمی) is an AI Engineer and Full-Stack Developer from Isfahan, Iran. نمونه‌کارها، پروژه‌های هوش مصنوعی، سوابق کاری و وبلاگ فنی احسان کاظمی را ببینید.",

  /**
   * Keywords for SEO
   */
  keywords: [
    "احسان کاظمی",
    "Ehsan Kazemi",
    "Ehsan Kazemi AI Engineer",
    "Ehsan Kazemi Developer",
    "احسان فریلنسر",
    "eh3ankazemi",
    "توسعه‌دهنده نرم‌افزار",
    "هوش مصنوعی",
    "توسعه‌دهنده فول استک",
    "احسان کاظمی فریلنسر",
    "AI Developer",
    "Software Developer",
    "Full Stack Developer",
    "React",
    "Next js",
    "TypeScript",
    "Python",
    "Portfolio",
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
}
