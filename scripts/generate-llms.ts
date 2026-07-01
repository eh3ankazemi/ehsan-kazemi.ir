import { writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"

import { siteMetadata } from "@/data/metadata"
import { getAllBlogPosts, getAllProjects, getAllWorkItems } from "@/lib/mdx"

export async function generateLlms() {
  const base = siteMetadata.siteUrl

  const [posts, projects, work] = await Promise.all([
    getAllBlogPosts(),
    getAllProjects(),
    getAllWorkItems(),
  ])

  const blogSection = posts
    .map(p => `- [${p.title}](${base}/blog/${p.slug}): ${p.summary}`)
    .join("\n")

  const projectsSection = projects
    .map(p => {
      const period =
        p.endDate === "Present" ? `${p.startDate} – Present` : `${p.startDate} – ${p.endDate}`

      return `- [${p.title}](${base}/projects/${p.slug}) (${period}, ${p.techStack.join(", ")}): ${p.description}`
    })
    .join("\n")

  const workSection = work
    .map(w => {
      return `- [${w.company}](${base}/work/${w.slug}): ${w.title}, ${w.start} – ${w.end}. ${w.description}`
    })
    .join("\n")

  const content = `# ${siteMetadata.title}

> ${siteMetadata.description}

## Blog Posts

${blogSection}

## Projects

${projectsSection}

## Work Experience

${workSection}

## Site

- [Home](${base})
- [Blog](${base}/blog)
- [Projects](${base}/projects)
- [Work](${base}/work)
- [RSS Feed](${base}/rss.xml)
`

  await mkdir("public", { recursive: true })

  await writeFile(join(process.cwd(), "public", "llms.txt"), content, "utf8")

  console.log("✓ Generated public/llms.txt")
}
