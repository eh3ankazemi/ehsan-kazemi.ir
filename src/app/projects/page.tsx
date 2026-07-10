import { Metadata } from "next"
import { Suspense } from "react"
import Projects from "@/components/projects/Projects"
import { Loading } from "@/components/ui/loading"
import { getAllProjects } from "@/lib/mdx"

/**
 * Generate metadata for SEO, including a canonical URL that reflects the current page number.
 * Sort and filter params are excluded from the canonical to avoid duplicate-content issues.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "پروژه‌ها | احسان کاظمی",
    description:
      "مجموعه‌ای از پروژه‌های برنامه‌نویسی، توسعه وب، هوش مصنوعی و نرم‌افزار که توسط احسان کاظمی طراحی و پیاده‌سازی شده‌اند.",
    alternates: {
      canonical: "/projects",
    },
    keywords: [
      "پروژه‌ها",
      "نمونه کار",
      "پورتفولیو",
      "احسان کاظمی",
      "توسعه وب",
      "برنامه نویسی",
      "Next.js",
      "React",
      "TypeScript",
      "هوش مصنوعی",
      "Full Stack Developer",
      "Software Engineer",
    ],
    openGraph: {
      title: "پروژه‌ها | احسان کاظمی",
      description:
        "مجموعه‌ای از پروژه‌های برنامه‌نویسی، توسعه وب، هوش مصنوعی و نرم‌افزار که توسط احسان کاظمی طراحی و پیاده‌سازی شده‌اند.",
      type: "website",
    },
  }
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  return (
    <Suspense fallback={<Loading />}>
      <Projects projects={projects} baseUrl="/projects" />
    </Suspense>
  )
}
