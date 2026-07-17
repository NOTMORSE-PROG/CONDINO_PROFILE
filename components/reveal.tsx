"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { EASE, STAGGER } from "@/lib/motion"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Sibling index for a small stagger; capped so long lists never lag */
  index?: number
}

export function Reveal({ children, className, index = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: EASE, delay: Math.min(index, 5) * STAGGER }}
    >
      {children}
    </motion.div>
  )
}
