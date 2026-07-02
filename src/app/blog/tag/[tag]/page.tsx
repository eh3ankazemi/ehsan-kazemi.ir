import { Metadata } from "next"
import Link from "next/link"
import { FaArrowLeft, FaTag } from "react-icons/fa"

import BackToPageButton from "@/components/BackToPageButton"
import BlogPost from "@/components/BlogPost"
import { homeIntroConfig } from "@/data/content"
import { getAllBlogPosts } from "@/lib/mdx"
import { getClosestTagPosts } from "@/lib/utils"

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
    tag,
  }))
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return {
    // title: `Posts tagged "${decodedTag}" | ${homeIntroConfig.name}`,
    description: `Browse blog posts tagged with ${decodedTag}.`,
    alternates: {
      canonical: `/blog/tag/${decodedTag.toLowerCase()}`,
    },
    openGraph: {
      // title: `Posts tagged "${decodedTag}" | ${homeIntroConfig.name}`,
      description: `Browse blog posts tagged with ${decodedTag}.`,
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

  const closestTagPosts = getClosestTagPosts(
    posts.filter(
      post => post.tags && !post.tags.some(t => t.toLowerCase() === decodedTag.toLowerCase())
    ),
    decodedTag,
    3
  )

  if (filteredPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FaTag className="mb-2 h-8 w-8 text-accent-500" />

        <h1 className="mb-2 text-2xl font-bold">
          No posts found for tag:
          <span className="ml-2 text-accent-600">{decodedTag}</span>
        </h1>

        <Link
          href="/blog"
          className="mb-4 inline-flex items-center gap-2 font-medium text-accent-500 hover:underline"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to all blog posts
        </Link>

        {closestTagPosts.length > 0 && (
          <div className="mt-8 w-full max-w-4xl">
            <h2 className="mb-4 flex flex-col items-center text-center text-xl font-bold">
              <span>You might be interested in these posts with similar tags:</span>
            </h2>

            <div className="grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
              {closestTagPosts.map(({ post, bestTag, bestScore }) => (
                <div key={post.slug} className="flex flex-col">
                  <BlogPost {...post} />

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-black dark:text-white">Reason:</span>

                    <FaTag className="h-3 w-3 shrink-0 text-accent-400" />

                    <span className="rounded-full bg-accent-500/15 px-2 py-1 text-xs font-semibold text-accent-600">
                      {bestTag}
                    </span>

                    <span className="text-xs text-gray-500 dark:text-gray-300">
                      {Math.round(bestScore * 100)}% match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col px-4 py-8">
      <BackToPageButton pageUrl="/blog" />

      <div className="mb-6 flex items-center gap-3">
        <FaTag className="h-6 w-6 text-accent-500" />

        <div className="flex flex-col md:flex-row md:items-center">
          <span className="mr-2 text-2xl font-bold leading-tight">Posts tagged with</span>

          <span className="text-xl font-bold leading-tight text-accent-600">
            &quot;{decodedTag}&quot;
            <span className="ml-2 align-middle text-base font-semibold text-gray-500">
              ({filteredPosts.length} post
              {filteredPosts.length !== 1 ? "s" : ""})
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map(post => (
          <BlogPost key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
