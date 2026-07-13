import { Metadata } from "next"
import AboutPage from "@/components/About/AboutPage"

/**
 * Generate metadata for SEO, including a canonical URL that reflects the current page number.
 * Sort and filter params are excluded from the canonical to avoid duplicate-content issues.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "درباره من | احسان کاظمی",
    description:
      "با احسان کاظمی، برنامه‌نویس و توسعه‌دهنده وب، بیشتر آشنا شوید. درباره مسیر یادگیری، مهارت‌ها، علایق، تجربه‌ها و اهداف حرفه‌ای من بخوانید.",
    alternates: {
      canonical: "/about",
    },
    keywords: [
      "احسان کاظمی",
      "درباره من",
      "برنامه نویس",
      "توسعه دهنده وب",
      "فول استک",
      "هوش مصنوعی",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Portfolio",
      "Web Developer",
      "Software Engineer",
      "Full Stack Developer",
      "AI Developer",
      "Biography",
      "About Ehsan Kazemi",
    ],
    openGraph: {
      title: "درباره من | احسان کاظمی",
      description:
        "با احسان کاظمی، برنامه‌نویس و توسعه‌دهنده وب، بیشتر آشنا شوید. درباره مسیر یادگیری، مهارت‌ها، علایق، تجربه‌ها و اهداف حرفه‌ای من بخوانید.",
      type: "website",
    },
  }
}

export default async function About() {
  return <AboutPage />
}
