import { Metadata } from "next"
import { Suspense } from "react"

import Blogs from "@/components/blog/Blog"
import { Loading } from "@/components/ui/loading"
import { getAllBlogPosts } from "@/lib/mdx"

/**
 * Generate metadata for SEO.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "وبلاگ | احسان کاظمی",
    description: "آخرین پست‌های وبلاگ من در مورد توسعه نرم‌افزار، فناوری و موارد دیگر را بخوانید.",
    alternates: {
      canonical: "/blog",
    },
  }
}

/**
 * Blog page.
 */
export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  return (
    <Suspense fallback={<Loading />}>
      <Blogs posts={posts} baseUrl="/blog" />
    </Suspense>
  )
}
