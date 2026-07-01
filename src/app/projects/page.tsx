import Projects from "@/components/projects/Projects"
import { getAllProjects } from "@/lib/mdx"

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  const techStackCounts: Record<string, number> = {}

  projects.forEach(project => {
    ;(project.techStack ?? []).forEach(tech => {
      techStackCounts[tech] = (techStackCounts[tech] || 0) + 1
    })
  })

  const uniqueTechStack = Object.entries(techStackCounts)
    .map(([tech, count]) => ({
      tech,
      count,
    }))
    .sort((a, b) => a.tech.localeCompare(b.tech))

  return <Projects projects={projects} uniqueTechStack={uniqueTechStack} baseUrl="/projects" />

}
