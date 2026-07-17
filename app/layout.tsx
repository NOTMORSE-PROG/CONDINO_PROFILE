import type React from "react"
import type { Metadata } from "next"
import { Fraunces } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://condino-profile.vercel.app"),
  title: {
    default: "Mark Andrei Condino — Software Developer",
    template: "%s — Mark Andrei Condino",
  },
  description:
    "Software developer in Metro Manila, Philippines. Building web and mobile products with Next.js, React, Kotlin, and Jetpack Compose.",
  keywords: [
    "Mark Andrei Condino",
    "Software Developer",
    "Full-Stack Developer",
    "Mobile Developer",
    "Next.js",
    "React",
    "Kotlin",
    "Philippines",
  ],
  authors: [{ name: "Mark Andrei Condino" }],
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
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
