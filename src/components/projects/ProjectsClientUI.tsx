import { AnimatePresence, motion } from "framer-motion"
import { FaFrown } from "react-icons/fa"

import ProjectTile from "@/components/projects/ProjectTile"
import { ProjectProps } from "@/lib/types"

export default function ProjectsClientUI({
  filteredProjects,
  paginatedProjects,
}: {
  filteredProjects: ProjectProps[]
  paginatedProjects: ProjectProps[]
}) {
  return (
    <AnimatePresence mode="wait">
      {filteredProjects.length > 0 ? (
        <motion.div
          key="projects"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {paginatedProjects.map((project, index) => (
            <ProjectTile key={project.slug} {...project} priority={index === 0} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="no-results"
          className="mt-12 flex flex-col items-center px-4 text-center text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <FaFrown className="mb-3 text-4xl text-gray-400 dark:text-gray-500 md:text-5xl" />

          <p className="text-lg font-semibold md:text-xl lg:text-2xl">No projects found</p>

          <p className="mt-2 max-w-2xl text-sm md:text-base lg:text-lg">
            The combination of selected tech stack filters didn&apos;t match any projects. Try
            changing or clearing your filters.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
