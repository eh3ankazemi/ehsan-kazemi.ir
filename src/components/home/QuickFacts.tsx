"use client"

import { motion } from "framer-motion"
import { factIconMap } from "@/data/content"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"
import { fadeUpVariants } from "./animations"

export default function QuickFacts() {
  const t = useTranslation()
  const allFacts = Object.entries(t.homeIntro.facts)
    .filter(([, value]) => value && value.trim() !== "")
    .map(([category, value]) => {
      const categoryKey = category as keyof typeof factIconMap
      return { icon: factIconMap[categoryKey], label: value }
    })

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeUpVariants}
      viewport={{ once: true, margin: "-50px" }}
      className="text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6 text-2xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-3xl"
      >
        {t.homeIntro.fanFact}
      </motion.h2>

      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5 px-2 sm:gap-3">
        {allFacts.map((fact, i) => {
          const Icon = fact.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2, ease: "easeOut" } }}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2",
                "border-slate-200 bg-white/80 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm",
                "dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200",
                "hover:border-accent-400 dark:hover:border-accent-500",
                "transition-all duration-200 cursor-default"
              )}
            >
              <Icon className="shrink-0 text-xs text-accent-600 dark:text-accent-400 sm:text-base" />
              <span>{fact.label}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
