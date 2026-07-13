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
]

export default function AboutPage() {
  const t = useTranslation()
  return (
    <motion.section
      className="mx-auto max-w-6xl px-4 py-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <motion.div
          variants={fadeRight}
          whileHover={{ scale: 1.03, rotate: -1 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <Image
            src="https://avatars.githubusercontent.com/u/101516269?v=4"
            alt={t.homeIntro.name}
            title={t.homeIntro.name + t.about.freelancer}
            width={420}
            height={520}
            priority
            className="relative rounded-3xl border border-gray-200 object-cover shadow-2xl dark:border-gray-800"
          />
        </motion.div>

        {/* Content */}
        <motion.div variants={fadeLeft}>
          <motion.span
            variants={fadeUp}
            className="rounded-full bg-accent-500/10 px-3 py-1 text-sm font-medium text-accent-600"
          >
            {t.about.aboutme}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-4 text-4xl font-bold md:text-5xl rtl:text-[42px]"
          >
            {t.about.hi} <span className="text-accent-500">{t.homeIntro.name}</span>
          </motion.h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">{t.about.about}</p>

          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <FaCode className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold">{t.about.frontend}</h3>
                <p className="text-sm text-gray-500">{t.about.frontend_}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <FaServer className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold">{t.about.backend}</h3>
                <p className="text-sm text-gray-500">{t.about.backend_}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <FaBrain className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold">{t.about.artificial}</h3>
                <p className="text-sm text-gray-500">{t.about.artificial_}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <FaBriefcase className="mt-1 text-xl text-accent-500" />
              <div>
                <h3 className="font-semibold">{t.about.freelancer}</h3>
                <p className="text-sm text-gray-500">{t.about.freelancer_}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Skills */}
      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">{t.about.skill}</h2>
        <div className="flex flex-wrap gap-3 skills rtl:flex-row-reverse">
          {skills.map(skill => (
            <motion.div
              key={skill}
              variants={scaleIn}
              whileHover={{
                scale: 1.08,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className={cn(
                "rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium transition hover:border-accent-500 hover:bg-accent-500/10 dark:border-gray-700 dark:bg-gray-900",
                "flex items-center bg-gray-200 dark:bg-gray-800 rounded-full",
                "gap-2 px-3 py-1 text-sm"
              )}
            >
              {techToIcon(skill)}
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
