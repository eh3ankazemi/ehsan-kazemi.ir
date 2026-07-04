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
    title: "وبلاگ | احسان کاضمی",
    // todo
    description: "Read my latest blog posts about software development, technology, and more.",
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

  // Count tags
  const tagCounts: Record<string, number> = {}

  posts.forEach(post => {
    ;(post.tags ?? []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const uniqueTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({
      tag,
      count,
    }))
    .sort((a, b) => a.tag.localeCompare(b.tag))

  return (
    <Suspense fallback={<Loading />}>
      <Blogs posts={posts} uniqueTags={uniqueTags} baseUrl="/blog" />
    </Suspense>
  )
}
