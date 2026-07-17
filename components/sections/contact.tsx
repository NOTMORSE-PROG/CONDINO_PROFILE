import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { profile, socials } from "@/lib/data/profile"

export function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">03 — Contact</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-6xl">Let&rsquo;s build something.</h2>
          <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
            Open to freelance projects and collaboration. The fastest way to reach me is email.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-12 block font-display text-2xl tracking-tight transition-colors hover:text-accent sm:text-3xl md:text-5xl"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8">
            {socials.map((social) => (
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
        </Reveal>
      </div>

      <footer className="border-t border-border">
        {/* Extra bottom padding keeps the fixed scroll-top button off the footer text */}
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 pb-24 pt-8 text-xs text-muted-foreground md:px-8 md:pb-8">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  )
}
