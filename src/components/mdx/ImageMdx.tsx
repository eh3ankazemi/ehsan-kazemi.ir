import Image from "next/image"

type ProjectHeroProps = {
  image: string
  githubUrl?: string
  paperUrl?: string
  title: string
  fa: boolean | undefined
}

export default function ImageMdx({ image, githubUrl, paperUrl, title, fa }: ProjectHeroProps) {
  return (
    <div className="group relative">
      <Image
        src={image}
        alt={title}
        width={600}
        height={300}
        quality={75}
        className="rounded-xl w-auto transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
      />
      <a href={githubUrl ?? paperUrl} target="_blank">
        <div className="rounded-xl absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 group-hover:shadow-2xl">
          <span className="text-lg font-semibold text-white">
            {githubUrl && (fa ? "مشاهده در گیت‌هاب" : "View on GitHub")}
            {paperUrl && (fa ? "مشاهده زنده" : "View Live")}
          </span>
        </div>
      </a>
    </div>
  )
}
