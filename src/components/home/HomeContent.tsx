"use client"

import { motion, MotionConfig } from "framer-motion"
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/components/home/animations"
import BlogPreview from "@/components/home/BlogPreview"
import ProjectsPreview from "@/components/home/ProjectsPreview"
import QuickFacts from "@/components/home/QuickFacts"
import WorkPreview from "@/components/home/WorkPreview"
import { useTranslation } from "@/hooks/useTranslation"
import { BlogPostProps, ProjectProps, WorkItemProps } from "@/lib/types"

interface HomeContentProps {
  blog: BlogPostProps[]
  work: WorkItemProps[]
  projects: ProjectProps[]
}

/**
 * This component renders the main content of the home page, including the introduction section,
 * quick facts, work experience preview, projects preview, and blog posts preview.
 * @param blog - An array of blog post data to display in the blog preview section.
 * @param work - An array of work experience data to display in the work preview section.
 * @param projects - An array of project data to display in the projects preview section.
 */
export default function HomeContent({ blog, work, projects }: HomeContentProps) {
  const t = useTranslation()
  const workItemsLangToShow = work.filter(Item => Item.fa === t.isRTL)
  const projectsItemsLangToShow = projects.filter(Item => Item.fa === t.isRTL)
  const blogItemsLangToShow = blog.filter(Item => Item.fa === t.isRTL)
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative mx-auto max-w-5xl px-4 pb-20 pt-2 sm:pt-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_35%)]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariants}
          viewport={{ once: true }}
          className="relative mt-2 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/75 px-4 py-9 shadow-[0_20px_60px_rgba(148,163,184,0.2)] backdrop-blur-sm sm:px-8 sm:py-12 dark:border-white/10 dark:bg-slate-950/65 dark:shadow-[0_30px_80px_rgba(15,23,42,0.7)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),transparent_35%,rgba(168,85,247,0.08))]" />
          <div className="absolute -right-10 top-5 h-32 w-32 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-medium text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] sm:text-xs"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Available for freelance work
            </motion.div>

            <h1 className="text-4xl font-black leading-[1.15] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              <span className="block">
                {t.home.title}
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="ml-2 inline-block align-middle"
                >
                  👋
                </motion.span>
              </span>
              <span className="mt-3 block bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                {t.about.freelancer}
              </span>
            </h1>

            <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400 sm:text-base">
              Ehsan Kazemi | AI Engineer &amp; Full-Stack Developer
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainerVariants}
              viewport={{ once: true }}
              className="mx-auto mt-8 max-w-3xl space-y-4"
            >
              {t.homeIntro.introParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={staggerItemVariants}
                  className="rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 text-base leading-relaxed text-slate-700 shadow-sm backdrop-blur-sm rtl:text-right dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 sm:px-5 sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-14">
          <QuickFacts />
        </div>
        <WorkPreview work={workItemsLangToShow} />
        <ProjectsPreview projects={projectsItemsLangToShow} />
        <BlogPreview blog={blogItemsLangToShow} />
      </section>
    </MotionConfig>
  )
}
