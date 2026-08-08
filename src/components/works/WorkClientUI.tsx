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
    // Work Items List or No Results Message
    <AnimatePresence mode="wait">
      {filteredWorkItems.length > 0 ? (
        <motion.div
          key="work-items"
          className="space-y-6 grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {paginatedWorkItems.map(item => (
            <WorkItem key={item.slug} {...item} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="no-results"
          className="flex flex-col items-center text-center text-gray-600 dark:text-gray-300 mt-12 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <FaFrown className="text-4xl md:text-5xl mb-3 text-gray-400 dark:text-gray-500" />
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">{t.filter.noWorkTitle}</p>
          <p className="text-sm md:text-base lg:text-lg mt-2 max-w-2xl">
            {t.filter.noWorkDescription}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
