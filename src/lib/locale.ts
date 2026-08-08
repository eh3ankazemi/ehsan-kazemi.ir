type Language = "en" | "fa"

const LOCALIZED_CONTENT_PATH = /^\/(?:blog|projects|work)\/[^/]+$/

/**
 * Returns the translated detail-page path, or null when the route has no paired MDX page.
 */
export function localizedContentPath(pathname: string, language: Language): string | null {
  if (!LOCALIZED_CONTENT_PATH.test(pathname)) return null

  const hasPersianSuffix = pathname.endsWith(".Persian")

  if (language === "fa") {
    return hasPersianSuffix ? pathname : `${pathname}.Persian`
  }

  return hasPersianSuffix ? pathname.replace(/\.Persian$/, "") : pathname
}
