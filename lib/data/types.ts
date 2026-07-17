export type ProjectCategory = "personal" | "client"

export interface ProjectImage {
  src: string
  label: string
}

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  type: string
  featured?: boolean
  description: string
  images: ProjectImage[]
  tech: string[]
  features: string[]
  githubUrls?: { label?: string; url: string }[]
  documentationUrl: string
}

export interface CoreSkill {
  name: string
  desc: string
  level: "Expert" | "Advanced"
}

export interface Specialization {
  name: string
  desc: string
}

export interface Social {
  name: string
  url: string
}
