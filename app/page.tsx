"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {
  Moon,
  Sun,
  Menu,
  X,
  Mail,
  Facebook,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  ChevronDown,
  Download,
  Github,
  Vote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Scroll to top button logic
    const handleScroll = () => {
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop
        const scrollTop = window.pageYOffset

        // Show button when user reaches the About section
        setShowScrollTop(scrollTop >= aboutTop - 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [darkMode])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const skills = [
    { name: "Kotlin", icon: "🎯", color: "bg-blue-500" },
    { name: "Jetpack Compose", icon: "📱", color: "bg-green-500" },
    { name: "Next.js", icon: "⚡", color: "bg-black dark:bg-white" },
    { name: "React", icon: "⚛️", color: "bg-blue-500" },
    { name: "JavaScript", icon: "🟨", color: "bg-yellow-500" },
    { name: "TypeScript", icon: "🔷", color: "bg-blue-600" },
    { name: "Tailwind CSS", icon: "🎨", color: "bg-cyan-500" },
    { name: "Firebase", icon: "🔥", color: "bg-orange-500" },
    { name: "HTML/CSS", icon: "🌐", color: "bg-red-500" },
    { name: "Bootstrap", icon: "💜", color: "bg-teal-600" },
    { name: "Cloudinary", icon: "☁️", color: "bg-blue-400" },
    { name: "PHP", icon: "🐘", color: "bg-indigo-500" },
    { name: "Laravel", icon: "🔴", color: "bg-red-600" },
    { name: "MySQL", icon: "🐬", color: "bg-blue-700" },
    { name: "PostgreSQL", icon: "🐘", color: "bg-blue-800" },
    { name: "Prisma", icon: "△", color: "bg-slate-800" },
  ]

  const ImageSlideshow = ({ images, alt, labels }: { images: string[]; alt: string; labels?: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }

    return (
      <div className="relative w-full h-full group bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${alt} - Screenshot ${currentIndex + 1}`}
          fill
          className="object-contain"
          priority
        />

        {/* Page Label */}
        {labels && labels[currentIndex] && (
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium z-10">
            {labels[currentIndex]}
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <ChevronDown className="w-4 h-4 rotate-90" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm z-10">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    )
  }

  const projects = [
    {
      title: "T.I.P MART",
      description:
        "A modern Android marketplace application designed specifically for students of the Technological Institute of the Philippines (T.I.P). Built with Kotlin and Jetpack Compose, featuring secure authentication, smart pickup system, and comprehensive e-commerce functionality.",
      images: [
        "https://utfs.io/f/D8rLLdYxj7dgdeVxh6W5NnIGvPMQTCt6UOpyVu1iJ7ZhqKeY",
        "https://utfs.io/f/D8rLLdYxj7dgZMbPPGhT1zGeqEpUh9usSwcPWtbXVJyLdIF6",
        "https://utfs.io/f/D8rLLdYxj7dgbawhfFWe1Ti2nsXVJUw7jxyWNqozIP9g8QfA",
        "https://utfs.io/f/D8rLLdYxj7dgrUk6OaRJ7voajpfNuiZyhb2Ew6Xsl9GQdDKS",
        "https://utfs.io/f/D8rLLdYxj7dgPHRnJCP8w04VkGSBJ658ZnqW3aFgMixKUDhu",
        "https://utfs.io/f/D8rLLdYxj7dgDhX9uHYxj7dgmQqZGuaL3VBUc9zO8TRJ0fMi",
        "https://utfs.io/f/D8rLLdYxj7dg1DRq3CoSixMG0jUznhsECRJXaYwF6kApLqgW",
        "https://utfs.io/f/D8rLLdYxj7dgZLAy4shT1zGeqEpUh9usSwcPWtbXVJyLdIF6",
      ],
      imageLabels: [
        "Create Listing and Product Details",
        "Home & My Listing",
        "Checkout & Notifications",
        "Product Details & Shopping Cart ",
        "Login and Sign up",
        "Wishlist & Payment Methods",
        "Seller & My Orders",
        "Settings and Profile",
      ],
      tech: ["Kotlin", "Jetpack Compose", "Firebase", "Material Design 3", "MVVM", "Coroutines"],
      features: [
        "Secure Authentication with Firebase",
        "Shopping Cart & Wishlist functionality",
        "Smart Campus-based Pickup System",
        "In-app Messaging between users",
        "Multiple Payment Methods (GCash, Maya, Bank Transfer)",
        "Real-time Order Tracking & Notifications",
        "Seller Dashboard with Analytics",
        "Rating & Review System",
      ],
      type: "Mobile App",
      icon: <Smartphone className="w-6 h-6" />,
      githubUrl: "https://github.com/NOTMORSE-PROG/T.I.P-MART",
      documentationUrl: "https://utfs.io/f/D8rLLdYxj7dg3Yf9lOdH5gh02zf6qENUyrjFYAIvue3JlXTx",
    },
    {
      title: "VocaNova 2025",
      description:
        "A comprehensive vocabulary learning Android application with interactive lessons, engaging mini-games, and gamification system. Features structured learning paths, achievement tracking, and immersive educational games with Material Design 3 interface.",
      images: [
        "https://utfs.io/f/D8rLLdYxj7dgKejMvCOnlPFOuhgIcRqxZbDLJUwekVHr3N7Y",
        "https://utfs.io/f/D8rLLdYxj7dgqBtek9QWb6t3cKueArC2p1ldzhmfLo7En9aO",
        "https://utfs.io/f/D8rLLdYxj7dg8LApBE2AwrVUKSkNIhPZu9OEp7x12eafWizF",
        "https://utfs.io/f/D8rLLdYxj7dg1ijuV5oSixMG0jUznhsECRJXaYwF6kApLqgW",
        "https://utfs.io/f/D8rLLdYxj7dgHL9kFnbvEgOlV0x5InZe6ySkjKND7CcqsPQR",
        "https://utfs.io/f/D8rLLdYxj7dg1N2AfwoSixMG0jUznhsECRJXaYwF6kApLqgW",
        "https://utfs.io/f/D8rLLdYxj7dg1nrr0aoSixMG0jUznhsECRJXaYwF6kApLqgW",
      ],
      imageLabels: [
        "Shop & Achievements",
        "Lesson Screen",
        "About & User Info",
        "Quiz & Mini Game Screen",
        "Splash Screen & Home",
        "Word of the Day & Saved Words",
        "Mini-Game Example",
      ],
      tech: ["Kotlin", "Jetpack Compose", "Firebase", "Material Design 3", "Media3", "Hilt"],
      features: [
        "4-Week Structured Learning Program with Video Lessons",
        "Interactive Mini-Games (Flying Words, Synonym Matching)",
        "Gamification System with Coins & Power-ups",
        "Achievement Tracking & Progress Analytics",
        "Word of the Day with Audio Pronunciation",
        "Personal Vocabulary Library & Search",
        "Text-to-Speech Integration",
        "Offline Learning Capabilities",
      ],
      type: "Educational App",
      icon: <Code className="w-6 h-6" />,
      githubUrl: "https://github.com/NOTMORSE-PROG/VOCANOVA",
      documentationUrl: "https://utfs.io/f/D8rLLdYxj7dgwTyZaUK7JnCpIoENMwDqHuGxvh3YFL4BlRry",
    },
    {
      title: "FilipinoBlog",
      description:
        "A comprehensive blogging platform specifically designed for Filipino bloggers and writers. Features complete user management, analytics dashboard, community engagement tools, and a beautiful Filipino-themed design with cultural sensitivity.",
      images: [
        "https://utfs.io/f/D8rLLdYxj7dgwTIImbg7JnCpIoENMwDqHuGxvh3YFL4BlRry",
        "https://utfs.io/f/D8rLLdYxj7dgF8HbhAXLiweFRd9QOjYKJ2snbghqoyHk6T8G",
        "https://utfs.io/f/D8rLLdYxj7dgCV2Dj2nrIouyYGlFatkHAbVe1inQ54WPjOMd",
        "https://utfs.io/f/D8rLLdYxj7dgk2d6DG3joeBiyL1g0aNlpZwS9Y2McW3vEfFX",
        "https://utfs.io/f/D8rLLdYxj7dgHa1JZdbvEgOlV0x5InZe6ySkjKND7CcqsPQR",
        "https://utfs.io/f/D8rLLdYxj7dgbRmcAAWe1Ti2nsXVJUw7jxyWNqozIP9g8QfA",
        "https://utfs.io/f/D8rLLdYxj7dgxsanGP4YR7XEpuJeTaktG8ZFLDbzyBqH3w1s",
        "https://utfs.io/f/D8rLLdYxj7dgw4wW4h7JnCpIoENMwDqHuGxvh3YFL4BlRryS",
        "https://utfs.io/f/D8rLLdYxj7dgLInNreEsMvnWPV5GuziBEOcSC8KQUAZJbI0l",
        "https://utfs.io/f/D8rLLdYxj7dggxhH5Nafaqsn5vAlwTPbeJcdRor29Gzjm18Z",
      ],
      imageLabels: [
        "My Post Page",
        "Login Page",
        "Profile View Page",
        "Settings Page",
        "See Other Post Page",
        "Landing Page",
        "Discover Page",
        "About Page",
        "See Other Post Page",
        "Dasboard",
      ],
      tech: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "HTML/CSS", "Apache"],
      features: [
        "Complete User Authentication & Profile Management",
        "Rich Text Editor with Media Upload",
        "Analytics Dashboard with Views & Engagement Metrics",
        "Community Features & User Discovery",
        "Category & Tag Management System",
        "Responsive Design with Dark/Light Themes",
        "SEO-Optimized Blog Structure",
        "Filipino-Inspired Design & Cultural Themes",
      ],
      type: "Web Platform",
      icon: <Globe className="w-6 h-6" />,
      githubUrl: "https://github.com/NOTMORSE-PROG/Filipino-Blog",
      documentationUrl: "https://utfs.io/f/D8rLLdYxj7dgH9HAN7bvEgOlV0x5InZe6ySkjKND7CcqsPQR",
    },
    {
      title: "VoteHubPH",
      description:
        "A comprehensive voting platform designed to empower Filipino citizens with transparent candidate information, community insights, and real-time engagement across all levels of Philippine government. Features location-based filtering, community engagement, and admin moderation.",
      images: [
        "https://utfs.io/f/D8rLLdYxj7dgQ2WeVICi9est7YCJ2z1RkFoSLdfQhIcZHgun",
        "https://utfs.io/f/D8rLLdYxj7dgJI2myfAsnCibyTIY9ueGqWFpj14VNLc08akz",
        "https://utfs.io/f/D8rLLdYxj7dgG8ms4Oez7FEZ0RmdYQ1PB8ClKLxVajuHXNq6",
        "https://utfs.io/f/D8rLLdYxj7dgMcu2lpK10OC65fBRyquLFe9YvEGnziI48Atg",
        "https://utfs.io/f/D8rLLdYxj7dg4oAJuuwm2oJitbd5aKzOBux3kRCAQF1LcVmy",
        "https://utfs.io/f/D8rLLdYxj7dg2DPdK9Hf3guHyGNcpiRO1UtKzA0LQPhmsZ6J",
        "https://utfs.io/f/D8rLLdYxj7dgk52wrLI3joeBiyL1g0aNlpZwS9Y2McW3vEfF",
        "https://utfs.io/f/D8rLLdYxj7dgMqqtcgaK10OC65fBRyquLFe9YvEGnziI48At",
      ],
      imageLabels: [
        "Homepage",
        "Candidates Page",
        "Elections Page",
        "Party List Directory",
        "Party List Content",
        "Candidate Profile",
        "User Profile",
        "Candidate Creation",
      ],
      tech: ["Next.js 14", "TypeScript", "Laravel 11", "PostgreSQL", "Tailwind CSS", "Prisma"],
      features: [
        "Candidate Profiles across all government levels",
        "Location-Based Filtering (Region, Province, City, Barangay)",
        "Community Engagement with voting and comments",
        "Secure Authentication (Google OAuth, Email OTP)",
        "User Post Submission for community review",
        "Admin Moderation for content approval",
        "Party List Directory with member listings",
        "Real-time Updates and notifications",
      ],
      type: "Full-Stack Web App",
      icon: <Vote className="w-6 h-6" />,
      githubUrl: "https://github.com/NOTMORSE-PROG/VoteHubPH",
      documentationUrl: "https://utfs.io/f/D8rLLdYxj7dg4Axco3m2oJitbd5aKzOBux3kRCAQF1LcVmyg",
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
            >
              Mark Andrei Condino
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="ml-4">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
            >
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Mark Andrei
              </span>
              <br />
              <span className="text-gray-800 dark:text-white">Condino</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Software Developer
              <br />
              Crafting innovative solutions with modern technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                View My Work
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                Get In Touch
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://thkp19wmdj.ufs.sh/f/D8rLLdYxj7dgNj7vrds9K72RADpPCscIoqU6FHayWekdMig3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16"
          >
            <ChevronDown className="w-8 h-8 mx-auto text-gray-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800 dark:text-white">About Me</h2>

            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <Image
                    src="https://utfs.io/f/D8rLLdYxj7dgWezinVxpzPSwLqOM1oDT3nl2t9C0fYXkRsrN"
                    alt="Mark Andrei Condino - Professional Photo"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                </div>
              </motion.div>

              {/* About Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex-1 text-left"
              >
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Resourceful Software Developer with practical experience delivering dynamic websites and robust
                  Android applications. I specialize in project development using React.js, Next.js, PHP, Kotlin, and
                  Firebase, with a proven track record of launching apps and platforms that solve real-world problems
                  and support student and community engagement.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  As a freelancer since 2023, I've delivered 10+ responsive websites and 3+ Android applications with
                  Firebase integration. I've also worked as a Software Developer at Ethos Bytes (Australia), collaborating
                  on design, development, and testing using Docker, Django, React, and implementing OAuth2.0 authentication
                  with Microsoft Entra.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Beyond coding, I serve as Open Source President leading 50+ active members in programming excellence,
                  and as Lead Cloud Security Officer implementing AWS compliance standards. Known for creative solutions,
                  adaptability, and technical leadership with strong communication and project management skills.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Websites Delivered</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">3+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Android Apps</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">Skills & Technologies</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Senior-level expertise in modern development technologies
            </p>
          </motion.div>

          {/* Core Technologies */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-center mb-8 text-gray-800 dark:text-white"
            >
              Core Technologies
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Kotlin", desc: "Android Development", level: "Expert" },
                { name: "Jetpack Compose", desc: "Modern Android UI", level: "Expert" },
                { name: "Next.js", desc: "Full-stack React", level: "Advanced" },
                { name: "React", desc: "Frontend Library", level: "Advanced" },
                { name: "TypeScript", desc: "Type-safe JavaScript", level: "Advanced" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{skill.desc}</p>
                  <div className="flex items-center justify-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        skill.level === "Expert"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Technologies */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl font-semibold text-center mb-8 text-gray-800 dark:text-white"
            >
              Additional Technologies
            </motion.h3>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
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
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile Development</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Native Android apps with Kotlin & Jetpack Compose
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Web Development</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full-stack applications with React & Next.js</p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Full-Stack</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">End-to-end development from UI to database</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of innovative applications built with modern technologies
            </p>
          </motion.div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}>
                    <div className={`relative ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                      {project.images ? (
                        <div className="h-96 md:h-[500px]">
                          <ImageSlideshow images={project.images} alt={project.title} labels={project.imageLabels} />
                        </div>
                      ) : (
                        <div className="relative h-64 md:h-auto">
                          <Image
                            src={project.image || "/placeholder.svg "}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-8 bg-white dark:bg-gray-800">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-blue-600 dark:text-blue-400">{project.icon}</div>
                          <Badge
                            variant="secondary"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {project.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl md:text-3xl mb-3 text-gray-900 dark:text-white">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-0">
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Key Features:</h4>
                          <ul className="space-y-2">
                            {project.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Project Links */}
                        <div className="flex flex-wrap gap-3">
                          {project.githubUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                            >
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                              >
                                <Github className="w-4 h-4" />
                                View Code
                              </a>
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                          >
                            <a
                              href={project.documentationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                            >
                              <Download className="w-4 h-4" />
                              Documentation
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Let's Work Together</h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-12 max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to work on new projects and collaborate with fellow
              developers and businesses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center max-w-4xl mx-auto">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600 text-white"
              >
                <a href="mailto:markandreicondino@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://www.linkedin.com/in/mark-andrei-condino-0323a5327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com/NOTMORSE-PROG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://www.facebook.com/mark.andrei.condino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://www.upwork.com/freelancers/~01f6500b8363b411d9?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Upwork
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://www.fiverr.com/s/dDG9Zb6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Fiverr
                </a>
              </Button>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300">
                © 2025 Mark Andrei Condino. Built with Next.js and Tailwind CSS.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 dark:from-blue-500 dark:to-teal-500 dark:hover:from-blue-600 dark:hover:to-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </motion.button>
      )}
    </div>
  )
}
