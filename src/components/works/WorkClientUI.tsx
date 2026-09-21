import { AnimatePresence, motion } from "framer-motion"
import { FaFrown } from "react-icons/fa"
import WorkItem from "@/components/works/WorkItem"
import { useTranslation } from "@/hooks/useTranslation"
import type { WorkItemProps } from "@/lib/types"

export default function WorkClientUI({
  filteredWorkItems,
  paginatedWorkItems,
}: {
  filteredWorkItems: WorkItemProps[]
  paginatedWorkItems: WorkItemProps[]
}) {
  const t = useTranslation()

  return (
    <AnimatePresence mode="wait">
      {filteredWorkItems.length > 0 ? (
        <motion.div
          key="work-items"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-[28px] border border-slate-200 bg-white/60 p-3 shadow-[0_24px_60px_rgba(148,163,184,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/50 sm:p-5"
        >
          <div className="grid gap-5">
            {paginatedWorkItems.map(item => (
              <WorkItem key={item.slug} {...item} />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="no-results"
          className="mt-12 flex flex-col items-center px-4 text-center text-slate-600 dark:text-slate-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <FaFrown className="mb-3 text-4xl text-slate-400 dark:text-slate-500 md:text-5xl" />
          <p className="text-lg font-semibold md:text-xl lg:text-2xl">{t.filter.noWorkTitle}</p>
          <p className="mt-2 max-w-2xl text-sm md:text-base lg:text-lg">
            {t.filter.noWorkDescription}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
