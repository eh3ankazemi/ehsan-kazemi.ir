import { Metadata } from "next"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import Works from "@/components/works/Works"
import { getAllWorkItems } from "@/lib/mdx"

/**
 * Generate metadata for SEO, including a canonical URL that reflects the current page number.
 * Sort and filter params are excluded from the canonical to avoid duplicate-content issues.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "سوابق کاری | احسان کاظمی",
    description:
      "سوابق کاری، تجربه‌های حرفه‌ای، همکاری‌ها، نقش‌های شغلی و فناوری‌هایی که در پروژه‌های مختلف استفاده کرده‌ام را مشاهده کنید.",
    alternates: {
      canonical: "/work",
    },
    keywords: [
      "احسان کاظمی",
      "سوابق کاری",
      "تجربه کاری",
      "رزومه",
      "سابقه شغلی",
      "برنامه نویس",
      "توسعه دهنده وب",
      "برنامه نویس فول استک",
      "Next.js",
      "React",
      "TypeScript",
      "AI Developer",
      "Web Developer",
      "Portfolio",
      "Work Experience",
    ],
    openGraph: {
      title: "سوابق کاری | احسان کاظمی",
      description:
        "سوابق کاری، تجربه‌های حرفه‌ای، همکاری‌ها، نقش‌های شغلی و فناوری‌هایی که در پروژه‌های مختلف استفاده کرده‌ام را مشاهده کنید.",
      type: "website",
    },
  }
}

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
