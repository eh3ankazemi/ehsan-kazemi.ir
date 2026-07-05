"use client"

import { useEffect } from "react"
import { useTranslation } from "@/hooks/useTranslation"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { isRTL } = useTranslation()
  const lang = isRTL ? "fa" : "en"
  useEffect(() => {
    const langDef = document.documentElement.lang
    if (!(langDef === lang)) {
      document.documentElement.lang = lang
      document.documentElement.dir = isRTL ? "rtl" : "ltr"
    }
  }, [isRTL])

  return <>{children}</>
}
