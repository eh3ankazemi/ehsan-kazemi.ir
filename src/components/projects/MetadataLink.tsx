"use client"

import Link from "next/link"
import { FaUsers, FaUserTie, FaClock, FaGithub, FaBook } from "react-icons/fa"
import { useTranslation } from "@/hooks/useTranslation"
import { ProjectFrontmatter } from "@/lib/schemas"

export function MetadataLink({
  frontmatter,
  duration,
}: {
  frontmatter: ProjectFrontmatter
  duration: any
}) {
  const t = useTranslation()
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {frontmatter.teamSize && (
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            <FaUsers className="w-4 h-4" />
            <span>
              <strong>{t.project.team}</strong> {frontmatter.teamSize}
            </span>
          </div>
        )}
        {frontmatter.role && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
            <FaUserTie className="w-4 h-4" />
            <span>
              <strong>{t.project.role}</strong> {frontmatter.role}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
          <FaClock className="w-4 h-4" />
          <span>
            <strong>{t.project.duration}</strong> {t.isRTL ? duration.fa : duration.en}
          </span>
        </div>
        {frontmatter.githubUrl && (
          <Link
            href={frontmatter.githubUrl}
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm transition"
          >
            <FaGithub className="w-4 h-4" />
            <span>{t.project.viewgit}</span>
          </Link>
        )}
        {frontmatter.paperUrl && (
          <Link
            href={frontmatter.paperUrl}
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm transition"
          >
            <FaBook className="w-4 h-4" />
            <span>{t.project.view}</span>
          </Link>
        )}
      </div>{" "}
    </>
  )
}
