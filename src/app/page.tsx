import HomeContent from "@/components/home/HomeContent"
import { footerConfig } from "@/data/content"
import { siteMetadata } from "@/data/metadata"
import { getAllBlogPosts, getAllProjects, getAllWorkItems } from "@/lib/mdx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

/**
 * Home component that serves as the main landing page for the portfolio.
 * This is accessed at the root URL ("/") of the application.
 * This is a server component wrapper that fetches data and passes it to the client HomeContent component.
 * It also generates JSON-LD structured data for SEO purposes, describing the person (author) and their social links.
 * The JSON-LD is included in a script tag in the head of the page, and it uses the schema.org "Person" type to describe the author.
 * The "sameAs" property includes links to social media profiles, which can help search engines understand the author's online presence.
 */
export default async function Home() {
  const [blog, work, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllWorkItems(),
    getAllProjects(),
  ])

  const sameAs = Object.values(footerConfig.socialLinks).filter(url => /^https?:\/\//.test(url))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteMetadata.siteUrl}/#website`,
        url: siteMetadata.siteUrl,
        name: siteMetadata.author.name,
        alternateName: [siteMetadata.title, "احسان کاظمی"],
        description: siteMetadata.description,
        inLanguage: "fa-IR",
        publisher: { "@id": `${siteMetadata.siteUrl}/#person` },
        hasPart: { "@id": `${siteMetadata.siteUrl}/#navigation` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteMetadata.siteUrl}/#navigation`,
        name: "Ehsan Kazemi site navigation",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "About Ehsan Kazemi",
            url: `${siteMetadata.siteUrl}/about`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work experience",
            url: `${siteMetadata.siteUrl}/work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Projects",
            url: `${siteMetadata.siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Technical blog",
            url: `${siteMetadata.siteUrl}/blog`,
          },
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteMetadata.siteUrl}/#profile`,
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        isPartOf: { "@id": `${siteMetadata.siteUrl}/#website` },
        mainEntity: { "@id": `${siteMetadata.siteUrl}/#person` },
        inLanguage: "fa-IR",
      },
      {
        "@type": "Person",
        "@id": `${siteMetadata.siteUrl}/#person`,
        name: siteMetadata.author.name,
        url: siteMetadata.siteUrl,
        description: siteMetadata.description,
        jobTitle: "AI Engineer, Full-Stack Developer",
        alternateName: "احسان کاظمی",
        knowsLanguage: ["en", "fa"],
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeContent blog={blog} work={work} projects={projects} />
    </>
  )
}
