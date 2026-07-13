import fs from "fs"
import path from "path"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { BsCardImage, BsStack } from "react-icons/bs"
import { FaUsers, FaUserTie, FaClock, FaGithub, FaBook } from "react-icons/fa"
import rehypeHighlight from "rehype-highlight"
import remark_gfm from "remark-gfm"
import AnimatedArticle from "@/components/AnimatedArticle"
import BackToPageButton from "@/components/BackToPageButton"
import PageHeaderSync from "@/components/header/PageHeaderSync"
import ImageMdx from "@/components/mdx/ImageMdx"
import { MetadataLink } from "@/components/projects/MetadataLink"
import ProjectImageCarousel from "@/components/projects/ProjectImageCarousel"
import TechBadge from "@/components/TechBadge"
import { siteMetadata } from "@/data/metadata"
import { getAllProjects } from "@/lib/mdx"
import { pageParams, ProjectFrontmatter } from "@/lib/types"
import { formatDuration } from "@/lib/utils"
import { UrlCheckerProvider } from "@/providers/UrlCheckerProvider"
import type { CreativeWork, WithContext } from "schema-dts"
/**
 * Generate static parameters for the project pages to be pre-rendered.
 */
export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map(project => ({
    slug: encodeURIComponent(project.slug),
  }))
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata(props: { params: pageParams }): Promise<Metadata> {
  const { slug } = await props.params
  const projects = await getAllProjects()
  const project = projects.find(p => p.slug === decodeURIComponent(slug))

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `پروژه ${project.title} | احسان کاظمی`,
    description: project.description,
    openGraph: {
      title: `پروژه ${project.title} | احسان کاظمی`,
      description: project.description,
      type: "article",
    },
  }
}

/**
 * ProjectPage component that renders a single project based on the slug.
 * It also generates JSON-LD structured data for SEO purposes, describing the software application (project) and its attributes.
 * The JSON-LD uses the schema.org "SoftwareApplication" type to describe the project, including properties like name, description, URL, dates, tech stack, and author information.
 * The JSON-LD is included in a script tag in the head of the page, and it is properly escaped to prevent XSS vulnerabilities.
 */
export default async function ProjectPage(props: { params: pageParams }) {
  const { slug } = await props.params
  const decoderSlug = decodeURIComponent(slug)
  const projects = await getAllProjects()
  const post = projects.find(p => p.slug === decoderSlug)
  if (!post) return notFound()

  const filePath = path.join(process.cwd(), "src", "data", "projects", `${decoderSlug}.mdx`)
  const projectPhotoDir = path.join(process.cwd(), "public", "projects", decoderSlug)

  if (!fs.existsSync(filePath)) {
    return notFound()
  }

  const mdxSource = fs.readFileSync(filePath, "utf-8")

  const { content, frontmatter } = await compileMDX<ProjectFrontmatter>({
    source: mdxSource,
    components: { ImageMdx },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remark_gfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  })

  // Format duration from startDate and endDate
  const duration = formatDuration(frontmatter.startDate, frontmatter.endDate)

  // Get project images
  const projectImages: { src: string; alt: string }[] = []
  if (fs.existsSync(projectPhotoDir)) {
    const allowedExtensions = [".jpg", ".jpeg", ".webp", ".png", ".gif", ".svg", ".bmp"]
    const imageFiles = fs
      .readdirSync(projectPhotoDir)
      .filter(f => allowedExtensions.includes(path.extname(f).toLowerCase()))

    imageFiles.forEach((filename, index) => {
      projectImages.push({
        src: `/projects/${decoderSlug}/${filename}`,
        alt: `${frontmatter.title} ${index + 1}`,
      })
    })
  }

  const jsonLd: WithContext<CreativeWork> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: frontmatter.title,
    description: frontmatter.description,
    url: `${siteMetadata.siteUrl}/projects/${post.slug}`,
    dateCreated: frontmatter.startDate,
    dateModified: frontmatter.endDate,
    ...(frontmatter.techStack &&
      frontmatter.techStack.length > 0 && { keywords: frontmatter.techStack.join(", ") }),
    ...(frontmatter.githubUrl && { codeRepository: frontmatter.githubUrl }),
    author: {
      "@type": "Person",
      name: "احسان کاظمی",
      url: siteMetadata.siteUrl,
    },
  }

  return (
    <>
      <UrlCheckerProvider />
      <PageHeaderSync title={frontmatter.title} subtitle={`پروژه‌ احسان کاظمی · ${duration.fa}`} />
      <AnimatedArticle>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <BackToPageButton pageUrl="/projects" />

        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 text-center">
          {frontmatter.description}
        </p>

        {/* Metadata Pills & Links */}
        <MetadataLink frontmatter={frontmatter} duration={duration} />

        {/* Tech Stack Section */}
        <div className="flex items-center gap-2 mb-4">
          <BsStack />
          <h2 className="text-xl font-semibold">Tech Stack</h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {frontmatter.techStack?.map(techName => (
            <TechBadge key={techName} techName={techName} />
          ))}
        </div>

        {/* Image Carousel - Display project photos if available */}
        {projectImages.length > 0 && (
          <div className="w-full">
            <div
              className="flex items-center justify-center gap-2 mb-4"
              style={{ fontSize: "1.25rem" }}
            >
              <BsCardImage />
              <h2 className="text-xl font-semibold">Project Gallery</h2>
            </div>
            <ProjectImageCarousel images={projectImages} />
          </div>
        )}

        {/* Display the actual content of the .mdx file */}
        <div className="max-w-4xl prose dark:prose-invert rtl:text-right">{content}</div>
      </AnimatedArticle>
    </>
  )
}
