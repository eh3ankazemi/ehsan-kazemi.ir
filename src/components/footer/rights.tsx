"use client"

import { useTranslation } from "@/hooks/useTranslation"

export default function Rights() {
  const t = useTranslation()
  return (
    <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} {t.footer}
    </p>
  )
}
