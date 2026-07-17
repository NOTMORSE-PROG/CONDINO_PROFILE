"use client"

import { Badge } from "@/components/ui/badge"
import { ImageSlideshow } from "@/components/image-slideshow"
import { ProjectLinks } from "@/components/project/project-links"
import { Reveal } from "@/components/reveal"
import type { Project } from "@/lib/data/types"
import { cn } from "@/lib/utils"

interface FeaturedProjectProps {
  project: Project
  index: number
  onDetails: (project: Project) => void
}

export function FeaturedProject({ project, index, onDetails }: FeaturedProjectProps) {
  const reversed = index % 2 === 1

  return (
    <Reveal>
      <article className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <div className={cn(reversed && "md:order-2")}>
          <ImageSlideshow images={project.images} alt={project.title} priority={index === 0} />
        </div>

        <div className={cn("flex flex-col gap-4", reversed && "md:order-1")}>
          <span className="font-display text-5xl text-accent md:text-6xl" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl tracking-tight md:text-4xl">{project.title}</h3>
            <Badge variant="outline" className="capitalize">
              {project.category}
            </Badge>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.type}</p>

          <p className="leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="space-y-1.5">
            {project.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex gap-2 text-sm leading-relaxed">
                <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground">{project.tech.join(" · ")}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            <ProjectLinks project={project} />
            <button
              type="button"
              onClick={() => onDetails(project)}
              className="text-sm font-medium underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
            >
              All details
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
