"use client"

import { FaTag } from "react-icons/fa"
import { useTranslation } from "@/hooks/useTranslation"

import { BlogPostProps } from "@/lib/types"
import BackToPageButton from "../BackToPageButton"
import BlogPost from "./BlogPost"

interface TagProps {
  Posts: BlogPostProps[]
  decodedTag: string
}
export default function Tag({ Posts, decodedTag }: TagProps) {
  const t = useTranslation()
  const tagItemsLangToShow = Posts.filter(postItem => postItem.fa === t.isRTL)
  return (
    <div className="mx-auto flex max-w-4xl flex-col px-4 py-8">
      <BackToPageButton pageUrl="/blog" />

      <div className="mb-6 flex items-center gap-3">
        <FaTag className="h-6 w-6 text-accent-500" />

        <div className="flex flex-col md:flex-row md:items-center">
          <span className="mr-2 text-2xl font-bold leading-tight">{t.post.tagged}{t.isRTL&& <>&nbsp;</>}</span>

          <span className="text-xl font-bold leading-tight text-accent-600">
            &quot;{decodedTag}&quot;
            <span className="ml-2 align-middle text-base font-semibold text-gray-500">
              ({tagItemsLangToShow.length} {t.post.post}
              {tagItemsLangToShow.length !== 1 ? "s" : ""})
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tagItemsLangToShow.map(post => (
          <BlogPost key={post.slug} {...post} />
        ))}
      </div>
    </div>
  )
}
