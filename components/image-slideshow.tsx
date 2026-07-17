"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ProjectImage } from "@/lib/data/types"
import { cn } from "@/lib/utils"

interface ImageSlideshowProps {
  images: ProjectImage[]
  alt: string
  className?: string
  priority?: boolean
}

export function ImageSlideshow({ images, alt, className, priority = false }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setCurrentIndex((i) => (i + 1) % images.length)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      goPrev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      goNext()
    }
  }

  const current = images[currentIndex]

  return (
    <div
      className={cn(
        "group relative aspect-[16/10] w-full overflow-hidden border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      tabIndex={0}
      role="region"
      aria-label={`${alt} screenshots`}
      onKeyDown={handleKeyDown}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentIndex ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <Image
            src={image.src}
            alt={`${alt} — ${image.label}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority={priority && index === 0}
          />
        </div>
      ))}

      {/* Label + counter */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 bg-gradient-to-t from-foreground/70 to-transparent px-3 pb-2 pt-8">
        <span className="truncate text-xs text-background">{current.label}</span>
        <span className="shrink-0 font-mono text-xs tabular-nums text-background/80">
          {currentIndex + 1}/{images.length}
        </span>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-background/80 p-2 text-foreground opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-background/80 p-2 text-foreground opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to screenshot ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  index === currentIndex ? "bg-accent" : "bg-background/60 hover:bg-background",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
