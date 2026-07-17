import type { Social } from "./types"

export const profile = {
  name: "Mark Andrei Condino",
  firstName: "Mark Andrei",
  lastName: "Condino",
  role: "Software Developer",
  tagline: "Crafting innovative solutions with modern technologies",
  location: "Metro Manila, Philippines",
  email: "markandreicondino@gmail.com",
  resumeUrl: "/docs/condino_resume.pdf",
  photo: "/images/mark-profile.jpg",
  bio: [
    "I build websites and Android apps with React, Next.js, Kotlin, and Firebase — products that solve real problems for students and communities.",
    "Freelancing since 2023, I've shipped 10+ responsive websites and 3+ Android apps. At Ethos Bytes (Australia) I worked across design, development, and testing with Docker, Django, and React, and implemented OAuth 2.0 authentication with Microsoft Entra.",
    "Outside client work, I lead 50+ members as Open Source President and serve as Lead Cloud Security Officer, implementing AWS compliance standards.",
  ],
  stats: [
    { value: "10+", label: "Websites Delivered" },
    { value: "3+", label: "Android Apps" },
  ],
}

export const socials: Social[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mark-andrei-condino-0323a5327" },
  { name: "GitHub", url: "https://github.com/NOTMORSE-PROG" },
  { name: "Facebook", url: "https://www.facebook.com/mark.andrei.condino" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01f6500b8363b411d9?mp_source=share" },
  { name: "Fiverr", url: "https://www.fiverr.com/s/dDG9Zb6" },
]

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]
