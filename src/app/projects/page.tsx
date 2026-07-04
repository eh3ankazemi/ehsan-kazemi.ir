import { Suspense } from "react"
import Projects from "@/components/projects/Projects"
import { Loading } from "@/components/ui/loading"
import { getAllProjects } from "@/lib/mdx"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    sort?: string
    tech?: string
  }>
}) {
  const params = await searchParams

  const projects = await getAllProjects()

  const techCounts: Record<string, number> = {}

  projects.forEach(project => {
    project.techStack.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1
    })
  })

  const uniqueTechStack = Object.entries(techCounts)
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => a.tech.localeCompare(b.tech))

  return (
    <Suspense fallback={<Loading />}>
      <Projects
        projects={projects}
        uniqueTechStack={uniqueTechStack}
        baseUrl="/projects"
        initialSearchParams={params}
      />
    </Suspense>
  )
}