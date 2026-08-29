import type React from "react"
import type { Metadata } from "next"
import { Fraunces } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import { projects } from "@/lib/data/projects"
import { coreSkills } from "@/lib/data/skills"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
})

const description =
  "Software developer in Metro Manila, Philippines. Building web and mobile products with Next.js, React, Kotlin, and Jetpack Compose."

export const metadata: Metadata = {
  metadataBase: new URL("https://condino-profile.vercel.app"),
  title: {
    default: "Mark Andrei Condino — Software Developer",
    template: "%s — Mark Andrei Condino",
  },
  description,
  applicationName: "Mark Andrei Condino — Portfolio",
  category: "technology",
  keywords: [
    "Mark Andrei Condino",
    "Software Developer",
    "Full-Stack Developer",
    "Mobile Developer",
    "Web Developer Philippines",
    "Freelance Developer Philippines",
    "Metro Manila Developer",
    ...coreSkills.map((skill) => skill.name),
    ...projects.map((project) => project.title),
  ],
  authors: [{ name: "Mark Andrei Condino", url: "https://condino-profile.vercel.app" }],
  creator: "Mark Andrei Condino",
  publisher: "Mark Andrei Condino",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://condino-profile.vercel.app",
    siteName: "Mark Andrei Condino",
    title: "Mark Andrei Condino — Software Developer",
    description:
      "Software developer building web and mobile products with Next.js, React, Kotlin, and Jetpack Compose.",
    images: [{ url: "/images/mark-profile.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark Andrei Condino — Software Developer",
    description:
      "Software developer building web and mobile products with Next.js, React, Kotlin, and Jetpack Compose.",
    images: ["/images/mark-profile.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${GeistSans.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
