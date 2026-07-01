import { siteMetadata } from "@/data/metadata"
import type { MetadataRoute } from "next"

/**
 * Generates a robots.txt file for the website.
 * Allows all search engines to crawl and index the portfolio for maximum discoverability.
 */

export const dynamic = "force-static"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        disallow: "/",

        // allow: "/",
        // disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  }
}
