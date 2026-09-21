"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FaCalendarAlt } from "react-icons/fa"
import TechBadge from "@/components/TechBadge"
import { useTranslation } from "@/hooks/useTranslation"
import { calculateDuration, cn } from "@/lib/utils"

interface ProjectTileProps {
  slug: string
  title: string
  image: string
  description?: string
  techStack?: string[]
  startDate?: string
  endDate?: string
  priority?: boolean
}

/**
 * A functional component that renders a project tile with a link, image, title, dates, duration, and tech stack.
 *
 * @param {Object} props - The prop object for the component.
 */
export default function ProjectTile({
  slug,
  title,
  image,
  description,
  techStack,
  startDate,
  endDate,
  priority = false,
}: ProjectTileProps) {
  const t = useTranslation()
  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "group block h-full rounded-[24px]",
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
          "relative flex h-full flex-col overflow-hidden rounded-[24px] border",
          "border-slate-200 bg-white/80 shadow-[0_18px_40px_rgba(148,163,184,0.18)] backdrop-blur-sm",
          "dark:border-white/10 dark:bg-slate-900/75 dark:shadow-[0_20px_50px_rgba(2,6,23,0.45)]",
          "hover:border-accent-400 dark:hover:border-accent-500",
          "transition-all duration-300"
        )}
      >
        <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-110",
              "brightness-95 group-hover:brightness-110"
            )}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
          >
            <span className="text-lg font-bold tracking-tight text-white">{t.exploreProject}</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="text-2xl font-bold text-white"
            >
              {t.isRTL ? "←" : "→"}
            </motion.span>
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <h3
              className={cn(
                "text-xl font-black tracking-[-0.02em] text-slate-900 dark:text-white",
                "group-hover:text-accent-600 dark:group-hover:text-accent-400",
                "transition-colors duration-200"
              )}
            >
              {title}
            </h3>
            {description && (
              <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
            )}
          </div>

          {startDate && endDate && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <FaCalendarAlt className="h-3.5 w-3.5" />
              <span>
                {startDate} – {endDate}
              </span>
              <span>·</span>
              <span>{calculateDuration(startDate, endDate, t.isRTL ? "fa" : "en")}</span>
            </div>
          )}

          {techStack &&
            techStack.length > 0 &&
            (() => {
              const maxBadges = 5
              const visibleTechStack = techStack.slice(0, maxBadges)
              const remainingCount = techStack.length - maxBadges

              return (
                <div className="mt-auto flex flex-wrap justify-center gap-2">
                  {visibleTechStack.map(techName => (
                    <TechBadge key={techName} techName={techName} variant="small" />
                  ))}
                  {remainingCount > 0 && (
                    <div className="flex items-center gap-1.5 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                      + {remainingCount}
                    </div>
                  )}
                </div>
              )
            })()}
        </div>
      </motion.article>
    </Link>
  )
}
