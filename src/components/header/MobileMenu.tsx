"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useEffect } from "react"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"

/**
 * MobileMenu component that displays a collapsible menu for mobile devices.
 */
export default function MobileMenu({
  isOpen,
  setIsOpenAction,
}: {
  isOpen: boolean
  setIsOpenAction: (v: boolean) => void
}) {
  const t = useTranslation()
  const pathname = usePathname()

  // Only show breadcrumbs for /blog, /projects, /work and their subpaths
  const navItems = [
    { name: t.navigation.home, path: "/" },
    { name: t.navigation.about, path: "/about" },
    { name: t.navigation.work, path: "/work" },
    { name: t.navigation.projects, path: "/projects" },
    { name: t.navigation.blog, path: "/blog" },
  ]
  const menuRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenAction(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpenAction(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, setIsOpenAction])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          ref={menuRef}
          id="mobile-navigation"
          aria-label="Primary navigation"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800
                     bg-zinc-50/95 dark:bg-black/95 backdrop-blur-md"
        >
          <motion.ul
            className="flex flex-col gap-2 px-4 py-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
              closed: {
                transition: {
                  staggerChildren: 0.03,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {navItems.map(({ name, path }, idx) => {
              const isActive =
                path === "/"
                  ? pathname === "/"
                  : pathname === path || pathname.startsWith(`${path}/`)

              return (
                <motion.li
                  key={path}
                  variants={{
                    open: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      },
                    },
                    closed: {
                      opacity: 0,
                      x: -20,
                    },
                  }}
                >
                  <Link
                    href={path}
                    aria-current={isActive ? "page" : undefined}
                    className={`block w-full px-4 py-3.5 rounded-lg text-base font-medium
                             transition-all duration-200
                             border active:scale-98
                             ${
                               isActive
                                 ? "bg-accent-500 dark:bg-accent-600 text-white border-accent-600 dark:border-accent-500 shadow-md"
                                 : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                             }`}
                    onClick={() => setIsOpenAction(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-mono text-xs text-gray-500 dark:text-gray-400 select-none",
                          isActive ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        0{idx + 1}
                      </span>
                      {name}
                    </span>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
