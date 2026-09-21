"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FaCode, FaBrain, FaServer, FaBriefcase } from "react-icons/fa"
import { useTranslation } from "@/hooks/useTranslation"
import { techToIcon } from "@/lib/devIcons"
import { cn } from "@/lib/utils"
import {
  cardVariants,
  container,
  cardsContainer,
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
} from "./animations"

const skills = [
  "NextJS",
  "React",
  "AstroJS",
  "TypeScript",
  "NodeJS",
  "TailwindCSS",
  "Html5",
  "javascript",
  "Css3",
  "Docker",
  "Linux",
  "Bash",
  "Python",
  "PyTorch",
  "Hugging Face",
  "Scikit learn",
  "Numpy",
  "Github Pages",
  "Redis",
  "Mongodb",
  "Scss",
  "i18n",
  "ViteJS",
  "Eslint",
  "Prettier",
  "Arduino",
  "Git",
  "Android",
  "Api Routes",
  "Cloudflare",
  "NPM",
  "Vercel",
  "Fast API",
  "Radixui",
  "Zod",
]

const skillHoverClasses: Record<string, string> = {
  React: "hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300",
  TypeScript:
    "hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-300",
  NextJS:
    "hover:border-slate-900 hover:bg-slate-900/5 hover:text-slate-900 dark:hover:border-white dark:hover:bg-white/10 dark:hover:text-white",
  TailwindCSS:
    "hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300",
  Python:
    "hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300",
  "Hugging Face":
    "hover:border-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600 dark:hover:text-yellow-300",
  Docker: "hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
  NodeJS:
    "hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-300",
  Git: "hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-300",
  MongoDB:
    "hover:border-emerald-600 hover:bg-emerald-600/10 hover:text-emerald-700 dark:hover:text-emerald-300",
  Redis: "hover:border-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300",
  PyTorch:
    "hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-300",
  Linux:
    "hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-300",
  Arduino:
    "hover:border-teal-500 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-300",
  default: "hover:border-accent-500 hover:bg-accent-500/10 dark:hover:text-accent-300",
}

export default function AboutPage() {
  const t = useTranslation()
  return (
    <motion.section
      className="mx-auto max-w-6xl px-4 py-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          variants={fadeRight}
          whileHover={{ scale: 1.02, rotate: -1 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="relative"
        >
          <div className="absolute inset-4 -z-10 rounded-4xl bg-linear-to-br from-accent-500/20 via-blue-400/10 to-violet-500/20 blur-2xl" />
          <Image
            src="https://avatars.githubusercontent.com/u/101516269?v=4"
            alt={t.homeIntro.name}
            title={t.homeIntro.name + t.about.freelancer}
            width={420}
            height={520}
            priority
            className="relative rounded-[30px] border border-slate-200 object-cover shadow-[0_30px_70px_rgba(59,130,246,0.15)] dark:border-white/10"
          />
        </motion.div>

        <motion.div
          variants={fadeLeft}
          className="rounded-[28px] border border-slate-200 bg-white/70 p-5 shadow-[0_24px_60px_rgba(148,163,184,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/50 sm:p-7"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700 dark:border-accent-500/20 dark:bg-accent-500/10 dark:text-accent-300"
          >
            {t.about.aboutme}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl rtl:text-[42px]"
          >
            {t.about.hi}{" "}
            <span className="bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              {t.homeIntro.name}
            </span>
          </motion.h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t.about.about}
          </p>

          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/70"
            >
              <FaCode className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{t.about.frontend}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.about.frontend_}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/70"
            >
              <FaServer className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{t.about.backend}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.about.backend_}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/70"
            >
              <FaBrain className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {t.about.artificial}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.about.artificial_}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-800/70"
            >
              <FaBriefcase className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {t.about.freelancer}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t.about.freelancer_}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-10 rounded-[28px] border border-slate-200 bg-white/70 p-5 shadow-[0_24px_60px_rgba(148,163,184,0.12)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/55 sm:p-7">
        <h2 className="mb-4 text-2xl font-black tracking-[-0.03em] text-slate-900 dark:text-white">
          {t.about.skill}
        </h2>
        <div className="flex flex-wrap gap-3 skills rtl:flex-row-reverse">
          {skills.map(skill => {
            const hoverClass = skillHoverClasses[skill] ?? skillHoverClasses.default

            return (
              <motion.div
                key={skill}
                variants={scaleIn}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200",
                  hoverClass
                )}
              >
                {techToIcon(skill)}
                <span>{skill}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
