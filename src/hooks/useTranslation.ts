"use client"

import en from "@/messages/en.json"
import fa from "@/messages/fa.json"
import { useLanguage } from "@/providers/LanguageProvider"

export function useTranslation() {
  const translations = { en, fa }
  const { language } = useLanguage()

  return translations[language]
}
