"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useMemo, useState } from "react"

import FilterDropdown from "@/components/FilterDropdown"
import SortDropdown from "@/components/SortDropdown"
import { paginationConfig } from "@/data/content"
import { useTranslation } from "@/hooks/useTranslation"
import { filterWorkItems, paginateItems, sortWorkItems } from "@/lib/utils"
import ActiveFilterChips from "../ActiveFilterChips"
import PaginationControls from "../PaginationControls"
import WorkClientUI from "./WorkClientUI"
import WorkNotFound from "./WorkNotFound"

const WORK_PAGE_SIZE = paginationConfig.projectsPerPage

export default function Works({
  work,
  baseUrl,
}: {
  work: any
  baseUrl: string
}) {
  const router = useRouter()
  const t = useTranslation()
  const searchParams = useSearchParams()

  // Read query params correctly
  const companyParam = searchParams.get("company")
  const sortParam = searchParams.get("sort")
  const pageParam = searchParams.get("page")

  const currentPage = Number(pageParam) || 1

  const sortOrder: "newest" | "oldest" = sortParam === "oldest" ? "oldest" : "newest"

  // Memoize so it doesn't create a new array every render
  const selectedCompanies = useMemo(() => {
    if (!companyParam) return []
    return companyParam
      .split(",")
      .map(c => c.trim())
      .filter(Boolean)
  }, [companyParam])

  // Draft state
  const [companyDrafts, setCompanyDrafts] = useState(selectedCompanies)

  // Sync when URL changes
  useEffect(() => {
    setCompanyDrafts(selectedCompanies)
  }, [selectedCompanies])

  const filteredWorkItems = useMemo(() => {
    return sortWorkItems(filterWorkItems(work, selectedCompanies), sortOrder)
  }, [work, selectedCompanies, sortOrder])

  const { items: paginatedWorkItems, totalPages } = paginateItems(
    filteredWorkItems,
    currentPage,
    WORK_PAGE_SIZE
  )

  if (currentPage < 1 || (totalPages > 0 && currentPage > totalPages)) return <WorkNotFound />

  const handleToggleCompany = (company: string) => {
    setCompanyDrafts(prev =>
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    )
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (companyDrafts.length) {
      params.set("company", companyDrafts.join(","))
    } else {
      params.delete("company")
    }

    params.delete("page")

    router.push(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleClearFilters = () => {
    setCompanyDrafts([])

    const params = new URLSearchParams(searchParams.toString())

    params.delete("company")
    params.delete("page")

    router.push(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleSortChange = (order: "newest" | "oldest" | "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("sort", order)
    params.delete("page")

    router.push(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`)
  }

  const handleRemoveCompany = (company: string) => {
    const updated = companyDrafts.filter(c => c !== company)

    setCompanyDrafts(updated)

    const params = new URLSearchParams(searchParams.toString())

    if (updated.length) {
      params.set("company", updated.join(","))
    } else {
      params.delete("company")
    }

    params.delete("page")

    router.push(`${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`)
  }


  const WorkItemsLangToShow = paginatedWorkItems.filter(workItem => workItem.fa === t.isRTL)
  // Unique companies for filter dropdown
  const companyCounts: Record<string, number> = {}
  WorkItemsLangToShow.forEach((workItem: { company: string | number }) => {
    companyCounts[workItem.company] = (companyCounts[workItem.company] || 0) + 1
  })
  const uniqueCompanies: { company: string; count: number }[] = Object.entries(companyCounts)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => a.company.localeCompare(b.company))
  return (
    <section className="mx-auto max-w-4xl px-4">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Suspense fallback={null}>
          <FilterDropdown
            items={uniqueCompanies.map(({ company, count }) => ({
              name: company,
              count,
            }))}
            selectedItems={companyDrafts}
            onToggle={handleToggleCompany}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            placeholder={t.filter.company}
            resultCount={WorkItemsLangToShow.length}
          />
        </Suspense>

        <Suspense fallback={null}>
          <SortDropdown
            sortOrder={sortOrder}
            onChange={handleSortChange}
            options={[
              { label: t.filter.newest, value: "newest" },
              { label: t.filter.oldest, value: "oldest" },
            ]}
          />
        </Suspense>
      </div>

      <ActiveFilterChips
        filters={selectedCompanies}
        onRemove={handleRemoveCompany}
        onClearAll={selectedCompanies.length > 1 ? handleClearFilters : undefined}
      />

      <WorkClientUI filteredWorkItems={filteredWorkItems} paginatedWorkItems={WorkItemsLangToShow} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
        searchParams={Object.fromEntries(searchParams.entries())}
      />
    </section>
  )
}
