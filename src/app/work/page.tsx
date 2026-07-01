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

  // Unique companies for filter dropdown
  const companyCounts: Record<string, number> = {}
  work.forEach(workItem => {
    companyCounts[workItem.company] = (companyCounts[workItem.company] || 0) + 1
  })
  const uniqueCompanies = Object.entries(companyCounts)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => a.company.localeCompare(b.company))

  return       <Works work={work} uniqueCompanies={uniqueCompanies} baseUrl="/work" />
}
