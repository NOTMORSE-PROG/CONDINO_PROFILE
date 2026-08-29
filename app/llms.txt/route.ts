import { profile, socials } from "@/lib/data/profile"
import { projects } from "@/lib/data/projects"
import { coreSkills, additionalSkills, specializations } from "@/lib/data/skills"

// Serves /llms.txt — a plain-text, LLM-friendly summary of this site following
// the llms.txt convention (https://llmstxt.org). AI assistants and answer
// engines (ChatGPT, Claude, Perplexity, etc.) fetch this to understand who
// Mark is and what he's built without having to parse the rendered page.
export const dynamic = "force-static"

function buildLlmsTxt(): string {
  const baseUrl = "https://condino-profile.vercel.app"

  const lines: string[] = []

  lines.push(`# ${profile.name}`)
  lines.push("")
  lines.push(`> ${profile.role} based in ${profile.location}. ${profile.tagline}.`)
  lines.push("")
  profile.bio.forEach((paragraph) => lines.push(paragraph))
  lines.push("")

  lines.push("## Contact")
  lines.push(`- Email: ${profile.email}`)
  lines.push(`- Resume: ${baseUrl}${profile.resumeUrl}`)
  socials.forEach((social) => lines.push(`- ${social.name}: ${social.url}`))
  lines.push("")

  lines.push("## Core Skills")
  coreSkills.forEach((skill) => lines.push(`- ${skill.name} (${skill.level}) — ${skill.desc}`))
  lines.push("")

  lines.push("## Specializations")
  specializations.forEach((spec) => lines.push(`- ${spec.name} — ${spec.desc}`))
  lines.push("")

  lines.push("## Additional Technologies")
  lines.push(additionalSkills.join(", "))
  lines.push("")

  lines.push("## Projects")
  lines.push("")
  for (const project of projects) {
    lines.push(`### ${project.title}${project.featured ? " (Featured)" : ""}`)
    lines.push(`- Type: ${project.type} (${project.category === "client" ? "Client work" : "Personal project"})`)
    lines.push(`- Tech: ${project.tech.join(", ")}`)
    project.githubUrls.forEach((repo) => lines.push(`- ${repo.label ? `GitHub (${repo.label})` : "GitHub"}: ${repo.url}`))
    lines.push(`- Documentation: ${baseUrl}${project.documentationUrl}`)
    lines.push(`- ${project.description}`)
    lines.push("")
  }

  lines.push("## Pages")
  lines.push(`- Portfolio home: ${baseUrl}/`)
  lines.push(`- Byte Quest (mini-game easter egg): ${baseUrl}/byte-quest`)
  lines.push("")
  lines.push(`Sitemap: ${baseUrl}/sitemap.xml`)

  return lines.join("\n")
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
