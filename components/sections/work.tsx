"use client"

import { useMemo, useState } from "react"
import { FeaturedProject } from "@/components/project/featured-project"
import { ProjectCard } from "@/components/project/project-card"
import { ProjectDialog } from "@/components/project/project-dialog"
import { Reveal } from "@/components/reveal"
import { archiveProjects, featuredProjects } from "@/lib/data/projects"
import type { Project, ProjectCategory } from "@/lib/data/types"
import { cn } from "@/lib/utils"

type Filter = "all" | ProjectCategory

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal" },
  { value: "client", label: "Client" },
]

export function Work() {
  const [filter, setFilter] = useState<Filter>("all")
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const visibleArchive = useMemo(
    () => (filter === "all" ? archiveProjects : archiveProjects.filter((p) => p.category === filter)),
    [filter],
  )

  const openDetails = (project: Project) => {
    setActiveProject(project)
    setDialogOpen(true)
  }

  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">01 — Selected Work</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-6xl">
            Products shipped end to end.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 md:space-y-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} onDetails={openDetails} />
          ))}
        </div>

        <div className="mt-28 border-t border-border pt-16 md:mt-36">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">More projects</p>
                <h3 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">The rest of the work</h3>
              </div>

              <div role="tablist" aria-label="Filter projects" className="flex gap-6">
                {filters.map((f) => {
                  const selected = filter === f.value
                  return (
                    <button
                      key={f.value}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setFilter(f.value)}
                      className={cn(
                        "border-b-2 pb-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected
                          ? "border-accent text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleArchive.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} onDetails={openDetails} />
            ))}
          </div>
        </div>
      </div>

      <ProjectDialog project={activeProject} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  )
}
