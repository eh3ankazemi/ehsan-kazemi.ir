"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLanguage } from "@/providers/LanguageProvider"

export function UrlCheckerProvider() {
  const searchParams = usePathname()
  const { language, loaded } = useLanguage()

  function switchLocale(locale: string) {
    window.history.replaceState(null, "", locale)
    location.reload()
  }
  useEffect(() => {
    if (!loaded) return
    const isRTL = language === "fa"
    const hasPersian = searchParams.endsWith(".Persian")
    if (hasPersian && !isRTL) switchLocale(searchParams.split(".")[0])
    if (!hasPersian && isRTL) switchLocale(searchParams.slice(0, -1) + ".Persian")
  }, [language])
  return <></>
}
