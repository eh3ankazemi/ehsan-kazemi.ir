import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

import { siteMetadata } from "@/data/metadata"

export async function generateRobots() {
  const robots = `User-agent: *
Disallow: /

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
`

  await mkdir("public", { recursive: true })

  await writeFile(join(process.cwd(), "public", "robots.txt"), robots, "utf8")

  console.log("✓ Generated public/robots.txt")
}
