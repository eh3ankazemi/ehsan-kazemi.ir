"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaLanguage } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { useTranslation } from "@/hooks/useTranslation"
import { useLanguage } from "@/providers/LanguageProvider"

export default function LanguagePopup() {
  const { isRTL } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [show, setShow] = useState(false)
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
  useEffect(() => {
    const visited = localStorage.getItem("visited")

    if (!visited) {
      setShow(true)
      localStorage.setItem("visited", "true")
    }
    // if (isRTL) setShow(true)
    else setShow(false)
  }, [isRTL])
  return (
    show && (
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
        }}
        className="fixed bottom-6 left-6 z-50 w-90 rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 ltr"
      >
        <button
          onClick={() => setShow(false)}
          className="absolute mo right-3 top-3 rounded-md p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <FaX className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-500/15">
            <FaLanguage className="h-6 w-6 text-accent-600" />
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              English Available
              {/* فارسی Available */}
            </h3>

            <p className="text-sm text-zinc-500">
              You can browse this website in English.
              {/* {isRTL
                ? "You can browse this website in Persian."
                : "You can browse this website in English."} */}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleToggle}
            className="flex-1 rounded-xl bg-accent-600 px-4 py-2.5 text-center font-medium text-white transition hover:bg-accent-700"
            aria-label="Toggle language"
          >
            Switch to English
          </button>

          <button
            onClick={() => setShow(false)}
            className="rounded-xl border border-zinc-300 px-4 py-2.5 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Stay Here
          </button>
        </div>
      </motion.div>
    )
  )
}
