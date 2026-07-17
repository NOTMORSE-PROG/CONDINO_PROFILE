"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ImageSlideshow } from "@/components/image-slideshow"
import { ProjectLinks } from "@/components/project/project-links"
import type { Project } from "@/lib/data/types"

interface ProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader className="text-left">
          <div className="flex flex-wrap items-center gap-3">
            <DialogTitle className="font-display text-2xl md:text-3xl">{project.title}</DialogTitle>
            <Badge variant="outline" className="capitalize">
              {project.category}
            </Badge>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.type}</p>
          <DialogDescription className="pt-2 text-base leading-relaxed">{project.description}</DialogDescription>
        </DialogHeader>

        {/* Wrapper keeps the aspect-ratio slideshow out of DialogContent's grid, whose
            track sizing collapses it and overlaps the content below. */}
        <div>
          <ImageSlideshow images={project.images} alt={project.title} />
        </div>

        <div className="space-y-6 pt-2">
          <div>
            <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Features</h4>
            <ul className="space-y-1.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Technology</h4>
            <p className="text-sm text-muted-foreground">{project.tech.join(" · ")}</p>
          </div>

          <ProjectLinks project={project} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
