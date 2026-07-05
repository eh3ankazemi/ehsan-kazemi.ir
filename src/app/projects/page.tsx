import { Suspense } from "react"

import Projects from "@/components/projects/Projects"
import { Loading } from "@/components/ui/loading"
import { getAllProjects } from "@/lib/mdx"

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  return (
    <Suspense fallback={<Loading />}>
      <Projects projects={projects} baseUrl="/projects" />
    </Suspense>
  )
}
