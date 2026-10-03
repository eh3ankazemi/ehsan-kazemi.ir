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
      <section className="relative mx-auto max-w-4xl px-4 pb-24 pt-6 sm:px-5 sm:pt-8">
        <div className="home pointer-events-none absolute inset-x-0 top-0 -z-10 h-140" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariants}
          viewport={{ once: true }}
          className="relative mt-2 overflow-hidden rounded-[36px] border border-slate-200/70 bg-[#081b2e]/90 px-4 py-8 shadow-[0_35px_100px_rgba(15,23,42,0.45)] ring-1 ring-white/5 backdrop-blur-xl sm:px-8 sm:py-12 dark:border-white/10 dark:bg-slate-950/70"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.12),transparent_30%,rgba(168,85,247,0.12))]" />
          <div className="absolute -right-10 top-5 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute inset-x-6 top-5 h-px bg-linear-to-r from-transparent via-sky-300/50 to-transparent" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-500/10 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.15)] uppercase sm:text-xs"
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)]" />
              Available for freelance work
            </motion.div>

            <h1 className="text-balance text-4xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.25rem]">
              <span className="block text-slate-50">
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
              <span className="mt-3 block bg-linear-to-r from-sky-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_20px_30px_rgba(56,189,248,0.22)]">
                {t.about.freelancer}
              </span>
            </h1>

            <p className="mt-5 text-sm font-medium text-slate-300 sm:text-base">
              Ehsan Kazemi | AI Engineer &amp; Full-Stack Developer
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-200 sm:text-sm">
              {["Backend", "Frontend", "Android", "Deep Learning", "ML"].map(item => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainerVariants}
              viewport={{ once: true }}
              className="mx-auto mt-9 max-w-3xl space-y-4"
            >
              {t.homeIntro.introParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={staggerItemVariants}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-base leading-relaxed text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm rtl:text-right dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 sm:px-5 sm:text-lg"
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
