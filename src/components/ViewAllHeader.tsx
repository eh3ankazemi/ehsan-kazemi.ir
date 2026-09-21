"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"

interface ViewAllButtonProps {
  title: string
  pageUrl: string
  itemCount: number
}

/**
 * A functional component that renders a "View All" button with a link to a specified page.
 * @param title - The title to be displayed in the header (e.g., "Recent Work").
 * @param pageUrl - The URL to which the button should link (e.g., "/projects").
 * @param itemCount - The total count of items to display on the "View All" button.
 */
export default function ViewAllHeader({ title, pageUrl, itemCount }: ViewAllButtonProps) {
  const t = useTranslation()
  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white/70 px-4 py-3 shadow-[0_10px_28px_rgba(148,163,184,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_16px_40px_rgba(2,6,23,0.35)]">
      <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-900 dark:text-white md:text-3xl">
        {title}
      </h2>

      <Link
        href={pageUrl}
        className={cn(
          "group flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1.5 text-sm font-semibold text-accent-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-400 hover:bg-accent-100 dark:border-accent-500/20 dark:bg-accent-500/10 dark:text-accent-300 dark:hover:border-accent-400 dark:hover:bg-accent-500/15",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
        )}
      >
        <span>{t.home.view}</span>
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {itemCount}
        </span>
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="text-base"
        >
          {t.isRTL ? "←" : "→"}
        </motion.span>
      </Link>
    </div>
  )
}
