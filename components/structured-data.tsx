import { profile, socials } from "@/lib/data/profile"
import { projects } from "@/lib/data/projects"
import { coreSkills, additionalSkills } from "@/lib/data/skills"

const baseUrl = "https://condino-profile.vercel.app"

/**
 * JSON-LD structured data for search engines and AI answer engines
 * (Google Search/SGE, Bing Copilot, ChatGPT/Perplexity browsing, etc.).
 * Describes Mark as a Person and this site as a WebSite/ProfilePage, plus
 * each project as a CreativeWork so crawlers can attribute and cite work
 * directly instead of guessing from rendered markup.
 */
export function StructuredData() {
  const person = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: profile.name,
    givenName: profile.firstName,
    familyName: profile.lastName,
    jobTitle: profile.role,
    description: profile.bio[0],
    url: baseUrl,
    image: `${baseUrl}${profile.photo}`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Metro Manila",
      addressCountry: "PH",
    },
    knowsAbout: [...coreSkills.map((skill) => skill.name), ...additionalSkills],
    sameAs: socials.map((social) => social.url),
  }

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    inLanguage: "en",
    author: { "@id": `${baseUrl}/#person` },
    publisher: { "@id": `${baseUrl}/#person` },
  }

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#profilepage`,
    url: baseUrl,
    name: `${profile.name} — Portfolio`,
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#person` },
    mainEntity: { "@id": `${baseUrl}/#person` },
  }

  const projectWorks = projects.map((project) => ({
    "@type": "CreativeWork",
    "@id": `${baseUrl}/#project-${project.slug}`,
    name: project.title,
    description: project.description,
    creator: { "@id": `${baseUrl}/#person` },
    keywords: project.tech.join(", "),
    genre: project.type,
    url: project.githubUrls[0]?.url,
    image: `${baseUrl}${project.images[0]?.src}`,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, ...projectWorks],
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
