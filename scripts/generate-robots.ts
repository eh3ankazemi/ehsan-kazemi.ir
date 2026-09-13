import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { siteMetadata } from "@/data/metadata"

export async function generateRobots() {
  // Allow: /
  const robots = `User-agent: *
Disallow: /api/*
Disallow: /_next/*
Disallow: /private/*
Disallow: /projects/sarahosh
Disallow: /projects/sarahosh.Persian
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
`

  await mkdir("public", { recursive: true })

  await writeFile(join(process.cwd(), "public", "robots.txt"), robots, "utf8")

  console.log("✓ Generated public/robots.txt")
}
