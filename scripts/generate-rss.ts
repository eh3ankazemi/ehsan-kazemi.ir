import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { siteMetadata } from "@/data/metadata"
import { getAllBlogPosts } from "@/lib/mdx"
import { escapeXml } from "@/lib/utils"

export async function generateRss() {
  const posts = await getAllBlogPosts()

  const items = posts
    .map(post => {
      const link = `${siteMetadata.siteUrl}/blog/${post.slug}`

      const categories = post.tags
        ?.map(tag => `      <category>${escapeXml(tag)}</category>`)
        .join("\n")

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${link}</guid>
${categories ?? ""}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteMetadata.title)}</title>
    <link>${siteMetadata.siteUrl}</link>
    <description>${escapeXml(siteMetadata.description)}</description>
    <language>en</language>
    <atom:link href="${siteMetadata.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  await mkdir("public", { recursive: true })

  await writeFile(join(process.cwd(), "public", "rss.xml"), xml, "utf8")

  console.log("✓ Generated public/rss.xml")
}
