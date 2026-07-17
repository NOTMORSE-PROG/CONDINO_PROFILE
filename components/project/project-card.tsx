"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/reveal"
import type { Project } from "@/lib/data/types"

interface ProjectCardProps {
  project: Project
  index: number
  onDetails: (project: Project) => void
}

export function ProjectCard({ project, index, onDetails }: ProjectCardProps) {
  const cover = project.images[0]
  const extraTech = project.tech.length - 3

  return (
    <Reveal index={index} className="h-full">
      <button
        type="button"
        onClick={() => onDetails(project)}
        className="group flex h-full w-full flex-col border border-border text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={cover.src}
            alt={`${project.title} — ${cover.label}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-lg leading-snug transition-colors group-hover:text-accent">
              {project.title}
            </h4>
            <Badge variant="outline" className="shrink-0 capitalize">
              {project.category}
            </Badge>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.type}</p>
          <p className="mt-auto pt-2 text-sm text-muted-foreground">
            {project.tech.slice(0, 3).join(" · ")}
            {extraTech > 0 && ` · +${extraTech}`}
          </p>
        </div>
      </button>
    </Reveal>
  )
}
