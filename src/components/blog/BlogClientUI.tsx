import { AnimatePresence, motion } from "framer-motion"
import { FaFrown } from "react-icons/fa"

import BlogPost from "@/components/blog/BlogPost"
import { BlogPostProps } from "@/lib/types"

export default function BlogClientUI({
  filteredPosts,
  paginatedPosts,
}: {
  filteredPosts: BlogPostProps[]
  paginatedPosts: BlogPostProps[]
}) {
  return (
    <AnimatePresence mode="wait">
      {filteredPosts.length > 0 ? (
        <motion.div
          key="posts"
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {paginatedPosts.map(post => (
            <BlogPost key={post.slug} {...post} />
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

          <p className="text-lg font-semibold md:text-xl lg:text-2xl">No blog posts found</p>

          <p className="mt-2 max-w-2xl text-sm md:text-base lg:text-lg">
            The combination of selected tags didn&apos;t match any blog posts. Try changing or
            clearing your filters.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
