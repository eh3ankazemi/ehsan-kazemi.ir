"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaLanguage } from "react-icons/fa6"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/providers/LanguageProvider"

export default function LanguageToggleButton() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-11 h-11 rounded-lg border border-gray-300 dark:border-gray-700",
          "bg-gray-100 dark:bg-gray-800 animate-pulse"
        )}
      />
    )
  }

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextLang = language === "en" ? "fa" : "en"

    const updateLanguage = () => {
      setLanguage(nextLang)

      document.documentElement.lang = nextLang
      document.documentElement.dir = nextLang === "fa" ? "rtl" : "ltr"
    }

    if (!document.startViewTransition) {
      updateLanguage()
      return
    }

    const { clientX: x, clientY: y } = event

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      updateLanguage()
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative w-11 h-11 rounded-lg",
        "border border-gray-300 dark:border-gray-700",
        "bg-gray-100 dark:bg-gray-800",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "flex items-center justify-center",
        "transition-all active:scale-95"
      )}
      aria-label="Toggle language"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={language}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          {resolvedTheme === "dark" ? (
            <FaLanguage className="w-5 h-5 text-yellow-500" />
          ) : (
            <FaLanguage className="w-5 h-5 text-gray-600" />
          )}{" "}
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold">
            {language.toUpperCase()}
          </span>
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
