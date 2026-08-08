"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLanguage } from "@/providers/LanguageProvider"

export function UrlCheckerProvider() {
  const pathname = usePathname()
  const { language, loaded, setLanguage } = useLanguage()

  useEffect(() => {
    if (!loaded) return

    const routeLanguage = pathname.endsWith(".Persian") ? "fa" : "en"
    if (language !== routeLanguage) setLanguage(routeLanguage)
  }, [language, loaded, pathname, setLanguage])

  return <></>
}
