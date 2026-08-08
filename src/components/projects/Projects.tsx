"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"

import FilterDropdown from "@/components/FilterDropdown"
import SortDropdown from "@/components/SortDropdown"
import { paginationConfig } from "@/data/content"
import { useTranslation } from "@/hooks/useTranslation"
import { filterProjects, getFilterOptions, paginateItems, sortProjects } from "@/lib/utils"

import ActiveFilterChips from "../ActiveFilterChips"
import PaginationControls from "../PaginationControls"
import ProjectsClientUI from "./ProjectsClientUI"
import ProjectsNotFound from "./ProjectsNotFound"
import type { ProjectProps } from "@/lib/types"

const PROJECTS_PAGE_SIZE = paginationConfig.projectsPerPage

export default function Projects({
  projects,
  baseUrl,
}: {
  projects: ProjectProps[]
  baseUrl: string
}) {
  const t = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const techParam = searchParams.get("tech")
  const sortParam = searchParams.get("sort")
  const pageParam = searchParams.get("page")

  const currentPage = Number(pageParam) || 1

  const sortOrder: "newest" | "oldest" = sortParam === "oldest" ? "oldest" : "newest"

  const selectedTechStack = useMemo(() => {
    if (!techParam) return []

    return techParam
      .split(",")
      .map(t => t.trim())
      .filter(Boolean)
  }, [techParam])

  const [techDrafts, setTechDrafts] = useState(selectedTechStack)

  useEffect(() => {
    setTechDrafts(selectedTechStack)
  }, [selectedTechStack])

  const filteredProjects = useMemo(() => {
    return sortProjects(filterProjects(projects, selectedTechStack), sortOrder)
  }, [projects, selectedTechStack, sortOrder])

  const projectsForLanguage = useMemo(
    () => filteredProjects.filter(project => project.fa === t.isRTL),
    [filteredProjects, t.isRTL]
  )
  const { items: paginatedProjects, totalPages } = useMemo(
    () => paginateItems(projectsForLanguage, currentPage, PROJECTS_PAGE_SIZE),
    [currentPage, projectsForLanguage]
  )
  const techOptions = useMemo(
    () =>
      getFilterOptions(
        projects.filter(project => project.fa === t.isRTL),
        project => project.techStack
      ),
    [projects, t.isRTL]
  )

  if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) {
    return <ProjectsNotFound />
  }

  const handleToggleTech = (tech: string) => {
    setTechDrafts(prev => (prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]))
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (techDrafts.length) {
      params.set("tech", techDrafts.join(","))
    } else {
      params.delete("tech")
    }

    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  const handleClearFilters = () => {
    setTechDrafts([])

    const params = new URLSearchParams(searchParams.toString())

    params.delete("tech")
    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  const handleSortChange = (order: "newest" | "oldest" | "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("sort", order)
    params.delete("page")

    router.replace(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    })
  }

  const handleRemoveTech = (tech: string) => {
    const updated = selectedTechStack.filter(selectedTech => selectedTech !== tech)

    setTechDrafts(updated)

    const params = new URLSearchParams(searchParams.toString())

    if (updated.length) {
      params.set("tech", updated.join(","))
    } else {
      params.delete("tech")
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
            items={techOptions}
            selectedItems={techDrafts}
            onToggle={handleToggleTech}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            placeholder={t.filter.technologies}
            resultCount={projectsForLanguage.length}
          />
        </Suspense>

        <Suspense fallback={null}>
          <SortDropdown
            sortOrder={sortOrder}
            onChange={handleSortChange}
            options={[
              {
                label: t.filter.newest,
                value: "newest",
              },
              {
                label: t.filter.oldest,
                value: "oldest",
              },
            ]}
          />
        </Suspense>
      </div>

      <ActiveFilterChips
        filters={selectedTechStack}
        onRemove={handleRemoveTech}
        onClearAll={selectedTechStack.length > 1 ? handleClearFilters : undefined}
        clearAllLabel={t.filter.clearAll}
      />

      <ProjectsClientUI
        filteredProjects={projectsForLanguage}
        paginatedProjects={paginatedProjects}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
        searchParams={Object.fromEntries(searchParams.entries())}
      />
    </section>
  )
}
