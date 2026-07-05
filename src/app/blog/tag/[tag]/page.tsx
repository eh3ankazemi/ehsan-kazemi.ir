import { Metadata } from "next"
import Tag from "@/components/blog/Tag"
import { getAllBlogPosts } from "@/lib/mdx"

type PageProps = {
  params: Promise<{
    tag: string
  }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()

  const tags = [...new Set(posts.flatMap(post => post.tags ?? []))]
  return tags.map(tag => ({
    tag: encodeURIComponent(tag),
  }))
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `پست‌های برچسب‌گذاری شده "${decodedTag}" | احسان کاظمی`,
    description: `مرور پست‌های وبلاگ با برچسب‌های ${decodedTag}.`,
    alternates: {
      canonical: `/blog/tag/${decodedTag.toLowerCase()}`,
    },
    openGraph: {
      title: `پست‌های برچسب‌گذاری شده "${decodedTag}" | احسان کاظمی`,
      description: `مرور پست‌های وبلاگ با برچسب‌های ${decodedTag}.`,
      type: "website",
    },
  }
}

/**
 * BlogTagPage component that displays blog posts filtered by a specific tag.
 */
export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getAllBlogPosts()
  const filteredPosts = posts.filter(post =>
    post.tags?.some(t => t.toLowerCase() === decodedTag.toLowerCase())
  )
  return <Tag Posts={filteredPosts} decodedTag={decodedTag} />
}
