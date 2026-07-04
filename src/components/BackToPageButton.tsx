"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"

interface BackToPageButtonProps {
  pageUrl: string
}

/**
 * A functional component that renders a "Back to Page" button with a link to a specified page.
 * @param pageUrl - The URL to which the button should link (e.g., "/projects").
 */
export default function BackToPageButton({ pageUrl }: BackToPageButtonProps) {
  const pageName = pageUrl.split("/").filter(Boolean).pop() || "page"
  const t = useTranslation()
  return (
    <Link
      href={pageUrl}
      className={cn(
        "group inline-flex items-center gap-2 mb-8",
        "text-sm font-semibold text-accent-600 dark:text-accent-400",
        "hover:gap-3 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent-500 focus-visible:ring-offset-2",
        "dark:focus-visible:ring-offset-black rounded-sm"
      )}
    >
      <motion.span
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        whileHover={{ x: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="text-base"
      >
        ←
      </motion.span>
      <span>{t.navigation.back + " " + t.navigation[pageName as keyof typeof t.navigation]}</span>
    </Link>
  )
}
