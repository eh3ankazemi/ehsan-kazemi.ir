import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { siteMetadata } from "@/data/metadata"
import { getAllBlogPosts, getAllProjects, getAllWorkItems } from "@/lib/mdx"
import { escapeXml } from "@/lib/utils"

const base = siteMetadata.siteUrl.replace(/\/$/, "")

type SitemapEntry = {
  loc: string
  lastmod?: Date
  changefreq: string
  priority: string
}

function formatDate(date: Date) {
  return date.toISOString()
}

function route(...segments: string[]) {
  return `${base}/${segments.map(segment => encodeURIComponent(segment)).join("/")}`
}

function validDate(value: string): Date | undefined {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export async function generateSitemap() {
  const [posts, workItems, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllWorkItems(),
    getAllProjects(),
  ])

  const tags = [...new Set(posts.flatMap(post => post.tags ?? []))]

  const urls: SitemapEntry[] = [
    {
      loc: base,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: route("work"),
      changefreq: "yearly",
      priority: "0.8",
    },
    {
      loc: route("projects"),
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: route("blog"),
      changefreq: "weekly",
      priority: "0.8",
    },

    ...posts.map(post => ({
      loc: route("blog", post.slug),
      lastmod: new Date(post.date),
      changefreq: "monthly",
      priority: "0.6",
    })),

    ...tags.map(tag => ({
      loc: route("blog", "tag", tag),
      changefreq: "weekly",
      priority: "0.5",
    })),

    ...workItems.map(item => ({
      loc: route("work", item.slug),
      lastmod: item.end === "Present" ? undefined : validDate(item.end),
      changefreq: "yearly",
      priority: "0.6",
    })),

    ...projects.map(project => ({
      loc: route("projects", project.slug),
      lastmod: validDate(project.endDate),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `\n    <lastmod>${formatDate(url.lastmod)}</lastmod>` : ""}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`

  await mkdir("public", { recursive: true })

  await writeFile(join(process.cwd(), "public", "sitemap.xml"), xml, "utf8")

  console.log("✓ Generated public/sitemap.xml")
}
