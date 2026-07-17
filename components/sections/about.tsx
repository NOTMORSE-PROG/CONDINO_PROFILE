import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { profile } from "@/lib/data/profile"
import { additionalSkills, coreSkills, specializations } from "@/lib/data/skills"

export function About() {
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">02 — About</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl tracking-tight md:text-6xl">
            Developer, and a bit of a builder.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-20">
          <Reveal className="space-y-6">
            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-border">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
            </div>

            {profile.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="max-w-prose leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Core</h3>
              <dl className="mt-5 divide-y divide-border border-y border-border">
                {coreSkills.map((skill) => (
                  <div key={skill.name} className="flex items-baseline justify-between gap-6 py-3">
                    <div>
                      <dt className="font-display text-xl">{skill.name}</dt>
                      <dd className="mt-0.5 text-sm text-muted-foreground">{skill.desc}</dd>
                    </div>
                    <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Also</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{additionalSkills.join(" · ")}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Focus</h3>
              <dl className="mt-4 space-y-3">
                {specializations.map((spec) => (
                  <div key={spec.name}>
                    <dt className="font-medium">{spec.name}</dt>
                    <dd className="text-sm text-muted-foreground">{spec.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <dl className="flex gap-12 border-t border-border pt-8">
              {profile.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-5xl leading-none text-accent">{stat.value}</span>
                    <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
