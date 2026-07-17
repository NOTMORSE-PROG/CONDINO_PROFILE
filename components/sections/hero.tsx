import { ArrowDown, ArrowUpRight } from "lucide-react"
import { profile, socials } from "@/lib/data/profile"

const heroSocials = socials.filter((s) => s.name === "GitHub" || s.name === "LinkedIn")

export function Hero() {
  return (
    <section id="top" className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-16 pt-32 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {profile.role} — {profile.location}
      </p>

      <h1 className="mt-6 font-display text-6xl leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
        {profile.firstName}
        <br />
        {profile.lastName}
      </h1>

      <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
          I build web and mobile products — from Android apps in Kotlin and Jetpack Compose to full-stack platforms in
          Next.js. Freelancing since 2023, shipping work that solves real problems for students and communities.
        </p>

        <dl className="flex gap-10 md:justify-end">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl leading-none">{stat.value}</span>
                <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          href="#work"
          className="group inline-flex items-center gap-2 text-sm font-medium underline decoration-accent underline-offset-4 transition-colors hover:text-accent"
        >
          View work
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </a>

        {heroSocials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            {social.name}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}

        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          Resume
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}
