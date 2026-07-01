import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { siteMetadata } from "@/data/metadata"
import { getAllBlogPosts, getAllProjects, getAllWorkItems } from "@/lib/mdx"

const base = siteMetadata.siteUrl

function formatDate(date: Date) {
  return date.toISOString()
}

export async function generateSitemap() {
  const [posts, workItems, projects] = await Promise.all([
    getAllBlogPosts(),
    getAllWorkItems(),
    getAllProjects(),
  ])

  const tags = [...new Set(posts.flatMap(post => post.tags ?? []))]

  const urls = [
    {
      loc: base,
      lastmod: new Date(),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${base}/work`,
      lastmod: new Date(),
      changefreq: "yearly",
      priority: "0.8",
    },
    {
      loc: `${base}/projects`,
      lastmod: new Date(),
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${base}/blog`,
      lastmod: new Date(),
      changefreq: "weekly",
      priority: "0.8",
    },

    ...posts.map(post => ({
      loc: `${base}/blog/${post.slug}`,
      lastmod: new Date(post.date),
      changefreq: "monthly",
      priority: "0.6",
    })),

    ...tags.map(tag => ({
      loc: `${base}/blog/tag/${tag}`,
      lastmod: new Date(),
      changefreq: "weekly",
      priority: "0.5",
    })),

    ...workItems.map(item => ({
      loc: `${base}/work/${item.slug}`,
      lastmod: new Date(),
      changefreq: "yearly",
      priority: "0.6",
    })),

    ...projects.map(project => ({
      loc: `${base}/projects/${project.slug}`,
      lastmod: new Date(project.endDate),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${formatDate(url.lastmod)}</lastmod>
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
