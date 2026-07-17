import { SiteHeader } from "@/components/site-header"
import { ScrollTop } from "@/components/scroll-top"
import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <ScrollTop />
    </>
  )
}
