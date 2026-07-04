import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import Works from "@/components/works/Works"
import { getAllWorkItems } from "@/lib/mdx"

/**
 * WorkPage component that serves as the main page for displaying work experience.
 * This is accessed at the "/work" URL of the application.
 */
export default async function WorkPage(props: {
  searchParams?: Promise<{
    page?: string
    sort?: string
    company?: string | string[]
  }>
}) {
  // Get all work items from MDX files
  const work = await getAllWorkItems()
  return (
    <Suspense fallback={<Loading />}>
      <Works work={work} baseUrl="/work" />
    </Suspense>
  )
}
