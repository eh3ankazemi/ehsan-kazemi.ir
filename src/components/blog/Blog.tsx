"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"

import ActiveFilterChips from "@/components/ActiveFilterChips"
import FilterDropdown from "@/components/FilterDropdown"
import PaginationControls from "@/components/PaginationControls"
import SortDropdown from "@/components/SortDropdown"
import { paginationConfig } from "@/data/content"
import { useTranslation } from "@/hooks/useTranslation"
import { filterBlogPosts, getFilterOptions, paginateItems, sortBlogPosts } from "@/lib/utils"

import BlogClientUI from "./BlogClientUI"
import BlogNotFound from "./BlogNotFound"
import type { BlogPostProps } from "@/lib/types"

const POSTS_PAGE_SIZE = paginationConfig.blogPostsPerPage

export default function Blogs({ posts, baseUrl }: { posts: BlogPostProps[]; baseUrl: string }) {
  const router = useRouter()
  const t = useTranslation()
  const searchParams = useSearchParams()

  // Query params
  const tagsParam = searchParams.get("tags")
  const sortParam = searchParams.get("sort")
  const pageParam = searchParams.get("page")

  const currentPage = Number(pageParam) || 1

  const sortOrder: "asc" | "desc" = sortParam === "asc" ? "asc" : "desc"

  // Selected tags
  const selectedTags = useMemo(() => {
    if (!tagsParam) return []

    return tagsParam
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)
  }, [tagsParam])

  // Draft tags
  const [tagDrafts, setTagDrafts] = useState(selectedTags)

  useEffect(() => {
    setTagDrafts(selectedTags)
  }, [selectedTags])

  // Filter + sort
  const filteredPosts = useMemo(() => {
    return sortBlogPosts(filterBlogPosts(posts, selectedTags), sortOrder)
  }, [posts, selectedTags, sortOrder])

  // Pagination
  const postsForLanguage = useMemo(
    () => filteredPosts.filter(post => post.fa === t.isRTL),
    [filteredPosts, t.isRTL]
  )
  const { items: paginatedPosts, totalPages } = useMemo(
    () => paginateItems(postsForLanguage, currentPage, POSTS_PAGE_SIZE),
    [currentPage, postsForLanguage]
  )
  const tagOptions = useMemo(
    () =>
      getFilterOptions(
        posts.filter(post => post.fa === t.isRTL),
        post => post.tags
      ),
    [posts, t.isRTL]
  )

  // Invalid page
  if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
    return <BlogNotFound />
  }

  const handleToggleTag = (tag: string) => {
    setTagDrafts(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]))
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (tagDrafts.length) {
      params.set("tags", tagDrafts.join(","))
    } else {
      params.delete("tags")
    }

    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  const handleClearFilters = () => {
    setTagDrafts([])

    const params = new URLSearchParams(searchParams.toString())

    params.delete("tags")
    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  const handleSortChange = (order: "asc" | "desc" | "newest" | "oldest") => {
    const value = order === "asc" ? "asc" : "desc"

    const params = new URLSearchParams(searchParams.toString())

    params.set("sort", value)
    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  const handleRemoveTag = (tag: string) => {
    const updated = selectedTags.filter(selectedTag => selectedTag !== tag)

    setTagDrafts(updated)

    const params = new URLSearchParams(searchParams.toString())

    if (updated.length) {
      params.set("tags", updated.join(","))
    } else {
      params.delete("tags")
    }

    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  return (
    <section className="mx-auto max-w-4xl px-4">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Suspense fallback={null}>
          <FilterDropdown
            items={tagOptions}
            selectedItems={tagDrafts}
            onToggle={handleToggleTag}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            placeholder={t.filter.tags}
            resultCount={postsForLanguage.length}
          />
        </Suspense>

        <Suspense fallback={null}>
          <SortDropdown
            sortOrder={sortOrder}
            onChange={handleSortChange}
            options={[
              {
                label: t.filter.newest,
                value: "desc",
              },
              {
                label: t.filter.oldest,
                value: "asc",
              },
            ]}
          />
        </Suspense>
      </div>

      <ActiveFilterChips
        filters={selectedTags}
        onRemove={handleRemoveTag}
        onClearAll={selectedTags.length > 1 ? handleClearFilters : undefined}
        clearAllLabel={t.filter.clearAll}
      />

      <BlogClientUI filteredPosts={postsForLanguage} paginatedPosts={paginatedPosts} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
        searchParams={Object.fromEntries(searchParams.entries())}
      />
    </section>
  )
}
