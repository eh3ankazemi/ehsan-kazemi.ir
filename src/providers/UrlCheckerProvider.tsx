"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLanguage } from "@/providers/LanguageProvider"

export function UrlCheckerProvider() {
  const params = usePathname()
  const { language, loaded } = useLanguage()

  function switchLocale(locale: string) {
    window.history.replaceState(null, "", locale)
    location.reload()
  }
  useEffect(() => {
    if (!loaded) return
    const isRTL = language === "fa"
    const hasPersian = params.endsWith(".Persian")

    if (hasPersian && !isRTL) switchLocale(params.replace(/\.Persian$/, ""))
    if (!hasPersian && isRTL) {
      const next = params.endsWith("/") ? params.slice(0, -1) + ".Persian/" : params + ".Persian"
      switchLocale(next)
    }
  }, [language])
  return <></>
}
