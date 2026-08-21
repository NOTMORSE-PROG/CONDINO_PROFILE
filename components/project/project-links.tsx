import { ArrowUpRight, FileText, Github } from "lucide-react"
import type { Project } from "@/lib/data/types"

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {project.githubUrls.map((gh) => (
        <a
          key={gh.url}
          href={gh.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          <Github className="h-4 w-4" />
          {gh.label ? `GitHub (${gh.label})` : "GitHub"}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ))}
      <a
        href={project.documentationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        <FileText className="h-4 w-4" />
        Documentation
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}
