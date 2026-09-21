"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"
import { useTranslation } from "@/hooks/useTranslation"
import { calculateDuration, cn } from "@/lib/utils"

interface WorkItemProps {
  slug: string
  company: string
  title: string
  start: string
  end: string
  description: string
  locations?: string[]
  logoUrl?: string
}

/**
 * A functional component that renders a work item with a link, title, company, start and end dates, description, and locations.
 */
export default function WorkItem({
  slug,
  company,
  title,
  start,
  end,
  description,
  locations,
  logoUrl,
}: WorkItemProps) {
  const t = useTranslation()

  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group block rounded-[26px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
        "focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
      )}
    >
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ opacity: { duration: 0.8 }, ease: "easeOut" }}
        whileHover={{
          y: -8,
          scale: 1.01,
          transition: {
            type: "spring",
            stiffness: 220,
            damping: 22,
            duration: 0.35,
          },
        }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "rounded-[26px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_40px_rgba(148,163,184,0.18)] backdrop-blur-sm",
          "transition-all duration-300 hover:border-accent-400 hover:shadow-[0_22px_48px_rgba(59,130,246,0.12)]",
          "dark:border-white/10 dark:bg-slate-900/75 dark:shadow-[0_20px_50px_rgba(2,6,23,0.45)] dark:hover:border-accent-500"
        )}
      >
        <div className="flex items-center gap-3">
          {logoUrl && (
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 shadow-sm dark:border-white/10 dark:bg-slate-800">
              <Image
                src={logoUrl}
                alt={`${company} logo`}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-black tracking-[-0.02em] text-slate-900 transition-colors duration-200 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400 sm:text-xl">
              {title} <span className="text-slate-500 dark:text-slate-400">@ {company}</span>
            </h3>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-2 rtl:text-right">
            <FaCalendarAlt className="h-4 w-4" />
            <span>
              {start} – {end}
            </span>
            <span>·</span>
            <span>{calculateDuration(start, end, t.isRTL ? "fa" : "en")}</span>
          </div>

          {locations && locations.length > 0 && (
            <div className="flex items-center sm:ms-2">
              <span className="hidden sm:inline mx-2 text-slate-300 dark:text-slate-600">|</span>
              <FaMapMarkerAlt className="me-1 h-4 w-4" />
              <span>{locations.join(", ")}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-[0.96rem] leading-7 text-slate-700 dark:text-slate-300">
          {description}
        </p>
      </motion.article>
    </Link>
  )
}
