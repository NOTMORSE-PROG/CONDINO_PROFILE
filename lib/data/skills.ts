import type { CoreSkill, Specialization } from "./types"

export const coreSkills: CoreSkill[] = [
  { name: "Kotlin", desc: "Android Development", level: "Expert" },
  { name: "Jetpack Compose", desc: "Modern Android UI", level: "Expert" },
  { name: "Next.js", desc: "Full-stack React", level: "Advanced" },
  { name: "React", desc: "Frontend Library", level: "Advanced" },
  { name: "TypeScript", desc: "Type-safe JavaScript", level: "Advanced" },
]

export const additionalSkills: string[] = [
  "Firebase",
  "Bootstrap",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Prisma",
  "HTML/CSS",
  "Material Design",
  "MVVM",
  "Coroutines",
  "Hilt",
  "React Native",
  "Tailwind CSS",
  "Cloudinary",
  "Apache",
]

export const specializations: Specialization[] = [
  { name: "Mobile Development", desc: "Native Android apps with Kotlin & Jetpack Compose" },
  { name: "Web Development", desc: "Full-stack applications with React & Next.js" },
  { name: "Full-Stack", desc: "End-to-end development from UI to database" },
]
