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
    "Resourceful Software Developer with practical experience delivering dynamic websites and robust Android applications. I specialize in project development using React.js, Next.js, PHP, Kotlin, and Firebase, with a proven track record of launching apps and platforms that solve real-world problems and support student and community engagement.",
    "As a freelancer since 2023, I've delivered 10+ responsive websites and 3+ Android applications with Firebase integration. I've also worked as a Software Developer at Ethos Bytes (Australia), collaborating on design, development, and testing using Docker, Django, React, and implementing OAuth2.0 authentication with Microsoft Entra.",
    "Beyond coding, I serve as Open Source President leading 50+ active members in programming excellence, and as Lead Cloud Security Officer implementing AWS compliance standards. Known for creative solutions, adaptability, and technical leadership with strong communication and project management skills.",
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
