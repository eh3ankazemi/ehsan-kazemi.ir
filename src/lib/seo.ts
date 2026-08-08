import { siteMetadata } from "@/data/metadata"
import type { Metadata } from "next"

type ContentSection = "blog" | "projects" | "work"

type ArticleMetadataInput = {
  section: ContentSection
  slug: string
  isPersian: boolean
  title: string
  description: string
  publishedTime?: string
  tags?: string[]
}

/**
 * Returns canonical and alternate-language URLs for paired MDX content.
 * Persian translations use the `.Persian` filename suffix; URLs stay aligned with it.
 */
export function contentAlternates(section: ContentSection, slug: string, isPersian: boolean) {
  const baseSlug = slug.endsWith(".Persian") ? slug.slice(0, -".Persian".length) : slug
  const englishPath = `/${section}/${encodeURIComponent(baseSlug)}`
  const persianPath = `/${section}/${encodeURIComponent(`${baseSlug}.Persian`)}`

  return {
    canonical: isPersian ? persianPath : englishPath,
    languages: {
      en: englishPath,
      fa: persianPath,
      "x-default": persianPath,
    },
  }
}

/** Builds consistent, crawlable metadata for individual MDX content pages. */
export function createArticleMetadata({
  section,
  slug,
  isPersian,
  title,
  description,
  publishedTime,
  tags,
}: ArticleMetadataInput): Metadata {
  const alternates = contentAlternates(section, slug, isPersian)
  const pageTitle = `${title} | ${siteMetadata.author.name}`

  return {
    title: pageTitle,
    description,
    alternates,
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      url: alternates.canonical,
      locale: isPersian ? "fa_IR" : "en_US",
      alternateLocale: isPersian ? ["en_US"] : ["fa_IR"],
      authors: [siteMetadata.author.name],
      ...(publishedTime && { publishedTime }),
      ...(tags && tags.length > 0 && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      creator: siteMetadata.social.twitter,
    },
  }
}
