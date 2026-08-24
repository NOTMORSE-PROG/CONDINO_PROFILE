"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, VolumeX } from "lucide-react"

const WORLD_WIDTH = 960
const WORLD_HEIGHT = 540
const GROUND_Y = 468
const START_TIME = 45

type GameMode = "intro" | "playing" | "won" | "lost"
type InputName = "left" | "right"

type Player = {
  x: number
  y: number
  width: number
  height: number
  vx: number
  vy: number
  facing: 1 | -1
  grounded: boolean
  petUntil: number
  boostUntil: number
}

type Core = {
  id: "build" | "win" | "lead"
  label: string
  sublabel: string
  color: string
  x: number
  y: number
  collected: boolean
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

type Game = {
  player: Player
  cores: Core[]
  particles: Particle[]
  timeLeft: number
  lastFrame: number
}

const platforms = [
  { x: 0, y: GROUND_Y, width: WORLD_WIDTH, height: 72 },
  { x: 150, y: 386, width: 205, height: 18 },
  { x: 420, y: 300, width: 188, height: 18 },
  { x: 665, y: 386, width: 182, height: 18 },
]

const initialCores = (): Core[] => [
  {
    id: "build",
    label: "BUILD",
    sublabel: "10+ products shipped",
    color: "#41e9ff",
    x: 250,
    y: 343,
    collected: false,
  },
  {
    id: "win",
    label: "WIN",
    sublabel: "Hackathon champion",
    color: "#ffcc4d",
    x: 512,
    y: 257,
    collected: false,
  },
  {
    id: "lead",
    label: "LEAD",
    sublabel: "50+ developers",
    color: "#ff6b9d",
    x: 754,
    y: 343,
    collected: false,
  },
]

const createGame = (): Game => ({
  player: {
    x: 62,
    y: GROUND_Y - 46,
    width: 54,
    height: 46,
    vx: 0,
    vy: 0,
    facing: 1,
    grounded: true,
    petUntil: 0,
    boostUntil: 0,
  },
  cores: initialCores(),
  particles: [],
  timeLeft: START_TIME,
  lastFrame: 0,
})

const overlap = (
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) =>
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y

function addBurst(game: Game, x: number, y: number, color: string, amount = 22) {
  for (let i = 0; i < amount; i += 1) {
    const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.35
    const speed = 55 + Math.random() * 175
    game.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 45,
      life: 0.7 + Math.random() * 0.7,
      maxLife: 1.4,
      color,
      size: 2 + Math.random() * 5,
    })
  }
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
}

function drawPixelText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string,
  align: CanvasTextAlign = "left",
) {
  context.save()
  context.font = `700 ${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
  context.textAlign = align
  context.textBaseline = "middle"
  context.fillStyle = color
  context.fillText(text, x, y)
  context.restore()
}

function drawBackground(context: CanvasRenderingContext2D, time: number) {
  const sky = context.createLinearGradient(0, 0, 0, WORLD_HEIGHT)
  sky.addColorStop(0, "#071126")
  sky.addColorStop(0.55, "#101d3a")
  sky.addColorStop(1, "#17233a")
  context.fillStyle = sky
  context.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

  for (let i = 0; i < 52; i += 1) {
    const x = (i * 193 + 31) % WORLD_WIDTH
    const y = (i * 83 + 19) % 260
    const pulse = 0.25 + ((Math.sin(time * 0.0018 + i) + 1) / 2) * 0.65
    context.fillStyle = `rgba(189, 226, 255, ${pulse})`
    context.fillRect(x, y, i % 7 === 0 ? 3 : 2, i % 7 === 0 ? 3 : 2)
  }

  context.save()
  context.shadowColor = "#66e7ff"
  context.shadowBlur = 35
  context.fillStyle = "rgba(138, 237, 255, 0.16)"
  context.beginPath()
  context.arc(830, 92, 51, 0, Math.PI * 2)
  context.fill()
  context.restore()

  const farOffset = (time * 0.006) % 240
  context.fillStyle = "#0a1429"
  for (let i = -1; i < 6; i += 1) {
    const x = i * 240 - farOffset
    context.fillRect(x, 252, 142, 216)
    context.fillRect(x + 24, 218, 54, 250)
    context.fillRect(x + 92, 278, 112, 190)
    for (let row = 0; row < 5; row += 1) {
      context.fillStyle = row % 2 === 0 ? "rgba(255, 191, 91, 0.17)" : "rgba(65, 233, 255, 0.12)"
      context.fillRect(x + 36, 240 + row * 35, 7, 11)
      context.fillRect(x + 57, 240 + row * 35, 7, 11)
    }
    context.fillStyle = "#0a1429"
  }

  context.strokeStyle = "rgba(65, 233, 255, 0.16)"
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(63, 468)
  context.lineTo(63, 168)
  context.lineTo(318, 168)
  context.moveTo(63, 205)
  context.lineTo(238, 300)
  context.moveTo(318, 168)
  context.lineTo(318, 298)
  context.stroke()

  context.strokeStyle = "rgba(255, 147, 71, 0.2)"
  context.beginPath()
  context.moveTo(0, 432)
  context.lineTo(WORLD_WIDTH, 432)
  context.stroke()
}

function drawPlatform(context: CanvasRenderingContext2D, platform: (typeof platforms)[number]) {
  context.save()
  context.shadowColor = "rgba(65, 233, 255, 0.22)"
  context.shadowBlur = 12
  const fill = context.createLinearGradient(0, platform.y, 0, platform.y + platform.height)
  fill.addColorStop(0, "#29435b")
  fill.addColorStop(0.14, "#172a43")
  fill.addColorStop(1, "#0a1325")
  context.fillStyle = fill
  context.fillRect(platform.x, platform.y, platform.width, platform.height)
  context.fillStyle = "#41e9ff"
  context.fillRect(platform.x, platform.y, platform.width, 3)
  context.fillStyle = "rgba(255, 151, 74, 0.45)"
  for (let x = platform.x + 14; x < platform.x + platform.width - 8; x += 38) {
    context.fillRect(x, platform.y + 9, 18, 3)
  }
  context.restore()
}

function drawCore(context: CanvasRenderingContext2D, core: Core, time: number) {
  if (core.collected) return
  const bob = Math.sin(time * 0.004 + core.x) * 7
  const y = core.y + bob
  const pulse = 0.8 + Math.sin(time * 0.007) * 0.2

  context.save()
  context.translate(core.x, y)
  context.rotate(time * 0.001)
  context.globalAlpha = 0.16
  context.fillStyle = core.color
  context.beginPath()
  context.arc(0, 0, 34 * pulse, 0, Math.PI * 2)
  context.fill()
  context.globalAlpha = 1
  context.shadowColor = core.color
  context.shadowBlur = 20
  context.fillStyle = core.color
  context.beginPath()
  context.moveTo(0, -18)
  context.lineTo(14, 0)
  context.lineTo(0, 18)
  context.lineTo(-14, 0)
  context.closePath()
  context.fill()
  context.fillStyle = "#ffffff"
  context.globalAlpha = 0.8
  context.fillRect(-3, -9, 4, 9)
  context.restore()

  drawPixelText(context, core.label, core.x, y - 36, 12, core.color, "center")
}

function drawPortal(context: CanvasRenderingContext2D, active: boolean, time: number) {
  const x = 895
  const y = 411
  context.save()
  context.translate(x, y)

  if (active) {
    const ring = context.createRadialGradient(0, 0, 5, 0, 0, 56)
    ring.addColorStop(0, "rgba(255,255,255,0.88)")
    ring.addColorStop(0.25, "rgba(65,233,255,0.72)")
    ring.addColorStop(0.68, "rgba(130,85,255,0.34)")
    ring.addColorStop(1, "rgba(65,233,255,0)")
    context.fillStyle = ring
    context.beginPath()
    context.ellipse(0, 0, 52 + Math.sin(time * 0.006) * 4, 78, 0, 0, Math.PI * 2)
    context.fill()
    context.strokeStyle = "#71efff"
    context.lineWidth = 6
    context.shadowColor = "#41e9ff"
    context.shadowBlur = 24
    context.beginPath()
    context.ellipse(0, 0, 33, 59, 0, 0, Math.PI * 2)
    context.stroke()
  } else {
    context.strokeStyle = "#33445b"
    context.lineWidth = 6
    context.beginPath()
    context.ellipse(0, 0, 33, 59, 0, 0, Math.PI * 2)
    context.stroke()
    for (let i = 0; i < 3; i += 1) {
      context.fillStyle = "#26364d"
      context.beginPath()
      context.arc(-18 + i * 18, 0, 5, 0, Math.PI * 2)
      context.fill()
    }
  }
  context.restore()
  drawPixelText(context, active ? "PORTAL OPEN" : "3 CORES REQUIRED", x, 326, 11, active ? "#71efff" : "#718096", "center")
}

function drawByte(context: CanvasRenderingContext2D, player: Player, time: number) {
  const running = Math.abs(player.vx) > 25 && player.grounded
  const step = running ? Math.sin(time * 0.02) * 4 : 0
  const petting = player.petUntil > time
  const boosted = player.boostUntil > time
  const tailAngle = Math.sin(time * (petting || boosted ? 0.035 : 0.012)) * (petting || boosted ? 0.75 : 0.35)

  context.save()
  context.translate(player.x + player.width / 2, player.y + player.height / 2)
  context.scale(player.facing, 1)
  context.imageSmoothingEnabled = false

  if (boosted) {
    context.save()
    context.globalAlpha = 0.35 + Math.sin(time * 0.02) * 0.1
    context.strokeStyle = "#ff6bdb"
    context.lineWidth = 4
    context.shadowColor = "#ff6bdb"
    context.shadowBlur = 20
    context.beginPath()
    context.ellipse(0, 0, 38, 34, 0, 0, Math.PI * 2)
    context.stroke()
    context.restore()
  }

  context.fillStyle = "rgba(0, 0, 0, 0.28)"
  context.beginPath()
  context.ellipse(0, 25, 29, 7, 0, 0, Math.PI * 2)
  context.fill()

  context.save()
  context.translate(-22, 4)
  context.rotate(tailAngle)
  context.fillStyle = "#d96b2b"
  context.fillRect(-21, -5, 24, 10)
  context.fillStyle = "#fff0cf"
  context.fillRect(-23, -5, 7, 10)
  context.restore()

  context.fillStyle = "#e77a32"
  context.fillRect(-19, -11, 36, 26)
  context.fillRect(7, -18, 23, 27)
  context.fillStyle = "#fff0cf"
  context.fillRect(-3, 4, 22, 12)
  context.fillRect(17, -5, 17, 13)

  context.fillStyle = "#b95025"
  context.beginPath()
  context.moveTo(10, -17)
  context.lineTo(13, -32)
  context.lineTo(22, -18)
  context.fill()
  context.beginPath()
  context.moveTo(24, -18)
  context.lineTo(31, -30)
  context.lineTo(34, -13)
  context.fill()

  context.fillStyle = "#101827"
  context.fillRect(24, -11, 4, 5)
  context.fillRect(32, 0, 5, 5)
  context.fillStyle = "#ffffff"
  context.fillRect(25, -11, 1, 1)

  context.fillStyle = "#cf6228"
  context.fillRect(-14, 12 + step, 9, 15 - step)
  context.fillRect(7, 12 - step, 9, 15 + step)
  context.fillStyle = "#fff0cf"
  context.fillRect(-14, 23, 9, 5)
  context.fillRect(7, 23, 9, 5)

  context.fillStyle = "#41e9ff"
  context.fillRect(7, 7, 14, 4)
  context.fillStyle = "#ffcc4d"
  context.fillRect(13, 9, 5, 6)

  if (petting) {
    const heartY = -43 - Math.sin(time * 0.008) * 5
    context.fillStyle = "#ff6b9d"
    context.fillRect(-4, heartY, 6, 6)
    context.fillRect(4, heartY, 6, 6)
    context.fillRect(-7, heartY + 5, 20, 7)
    context.fillRect(-3, heartY + 12, 12, 6)
  }
  context.restore()
}

function drawParticles(context: CanvasRenderingContext2D, particles: Particle[]) {
  for (const particle of particles) {
    context.globalAlpha = Math.max(0, particle.life / particle.maxLife)
    context.fillStyle = particle.color
    context.fillRect(particle.x, particle.y, particle.size, particle.size)
  }
  context.globalAlpha = 1
}

function drawScene(context: CanvasRenderingContext2D, game: Game, mode: GameMode, time: number) {
  context.clearRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT)
  drawBackground(context, time)
  platforms.forEach((platform) => drawPlatform(context, platform))
  game.cores.forEach((core) => drawCore(context, core, time))
  drawPortal(context, game.cores.every((core) => core.collected), time)
  drawByte(context, game.player, time)
  drawParticles(context, game.particles)

  if (mode === "playing") {
    const remaining = game.cores.filter((core) => !core.collected).length
    if (remaining > 0) {
      drawPixelText(context, `${remaining} PROOF CORE${remaining === 1 ? "" : "S"} LEFT`, 28, 34, 13, "rgba(225,240,255,0.72)")
    } else {
      drawPixelText(context, "PORTAL OPEN — RUN TO THE RIGHT!", 28, 34, 13, "#71efff")
    }
  }
}

export function ByteQuestGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game>(createGame())
  const modeRef = useRef<GameMode>("intro")
  const inputRef = useRef({ left: false, right: false, jumpQueued: false })
  const animationRef = useRef<number | null>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const soundRef = useRef(true)
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const petCountRef = useRef(0)

  const [mode, setMode] = useState<GameMode>("intro")
  const [collected, setCollected] = useState<Core["id"][]>([])
  const [timeLeft, setTimeLeft] = useState(START_TIME)
  const [message, setMessage] = useState("Collect BUILD, WIN, and LEAD to open the portal.")
  const [soundOn, setSoundOn] = useState(true)
  const [pets, setPets] = useState(0)

  const showMessage = useCallback((nextMessage: string) => {
    setMessage(nextMessage)
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current)
    messageTimerRef.current = setTimeout(() => {
      if (modeRef.current === "playing") setMessage("Collect every proof core, then enter the glowing portal.")
    }, 2600)
  }, [])

  const playTone = useCallback((frequency: number, duration = 0.1, secondFrequency?: number) => {
    if (!soundRef.current) return
    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextConstructor) return
    if (!audioRef.current) audioRef.current = new AudioContextConstructor()
    const audio = audioRef.current
    const oscillator = audio.createOscillator()
    const gain = audio.createGain()
    oscillator.type = "square"
    oscillator.frequency.setValueAtTime(frequency, audio.currentTime)
    if (secondFrequency) oscillator.frequency.exponentialRampToValueAtTime(secondFrequency, audio.currentTime + duration)
    gain.gain.setValueAtTime(0.045, audio.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration)
    oscillator.connect(gain)
    gain.connect(audio.destination)
    oscillator.start()
    oscillator.stop(audio.currentTime + duration)
  }, [])

  const setGameMode = useCallback((nextMode: GameMode) => {
    modeRef.current = nextMode
    setMode(nextMode)
  }, [])

  const resetGame = useCallback(() => {
    const nextGame = createGame()
    if (petCountRef.current >= 3) nextGame.player.boostUntil = performance.now() + 5000
    gameRef.current = nextGame
    inputRef.current = { left: false, right: false, jumpQueued: false }
    setCollected([])
    setTimeLeft(START_TIME)
    setMessage(
      petCountRef.current >= 3
        ? "ZOOMIES active — Byte has five seconds of boosted running speed!"
        : "Collect BUILD, WIN, and LEAD to open the portal.",
    )
    setGameMode("playing")
    playTone(220, 0.08, 440)
  }, [playTone, setGameMode])

  const petByte = useCallback(() => {
    const game = gameRef.current
    const now = performance.now()
    const nextPetCount = petCountRef.current + 1
    const unlockedZoomies = nextPetCount % 3 === 0
    petCountRef.current = nextPetCount
    game.player.petUntil = now + 1100
    if (modeRef.current === "playing") game.timeLeft = Math.min(START_TIME + 5, game.timeLeft + 1)
    setPets(nextPetCount)

    if (unlockedZoomies) {
      game.player.boostUntil = now + 5000
      addBurst(game, game.player.x + game.player.width / 2, game.player.y + 8, "#ff6bdb", 38)
      showMessage("ZOOMIES UNLOCKED — five seconds of pink-powered speed!")
      playTone(520, 0.24, 1040)
    } else {
      const petsNeeded = 3 - (nextPetCount % 3)
      showMessage(
        modeRef.current === "playing"
          ? `+1 second and a tail wag. ${petsNeeded} more pet${petsNeeded === 1 ? "" : "s"} to unlock Zoomies.`
          : `${petsNeeded} more pet${petsNeeded === 1 ? "" : "s"} to unlock Byte's Zoomies.`,
      )
      playTone(520, 0.08, 760)
    }
  }, [playTone, showMessage])

  useEffect(() => {
    soundRef.current = soundOn
  }, [soundOn])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = WORLD_WIDTH * ratio
      canvas.height = WORLD_HEIGHT * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.imageSmoothingEnabled = false
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let lastUiSecond = START_TIME

    const update = (game: Game, delta: number, now: number) => {
      if (modeRef.current !== "playing") return
      const player = game.player
      const previousBottom = player.y + player.height
      const boosted = player.boostUntil > now
      const acceleration = boosted ? 1800 : 1250
      const maxSpeed = boosted ? 430 : 285

      if (inputRef.current.left) {
        player.vx -= acceleration * delta
        player.facing = -1
      }
      if (inputRef.current.right) {
        player.vx += acceleration * delta
        player.facing = 1
      }
      if (!inputRef.current.left && !inputRef.current.right) {
        player.vx *= Math.pow(0.002, delta)
      }
      player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx))

      if (inputRef.current.jumpQueued && player.grounded) {
        player.vy = -650
        player.grounded = false
        playTone(270, 0.07, 410)
      }
      inputRef.current.jumpQueued = false

      player.x += player.vx * delta
      player.x = Math.max(0, Math.min(WORLD_WIDTH - player.width, player.x))
      player.vy += 1720 * delta
      player.y += player.vy * delta
      player.grounded = false

      if (player.vy >= 0) {
        for (const platform of platforms) {
          const nextBottom = player.y + player.height
          const crossesTop = previousBottom <= platform.y + 7 && nextBottom >= platform.y
          const withinWidth = player.x + player.width > platform.x + 4 && player.x < platform.x + platform.width - 4
          if (crossesTop && withinWidth) {
            player.y = platform.y - player.height
            player.vy = 0
            player.grounded = true
            break
          }
        }
      }

      if (player.y > WORLD_HEIGHT + 80) {
        player.x = 58
        player.y = GROUND_Y - player.height
        player.vx = 0
        player.vy = 0
      }

      for (const core of game.cores) {
        if (core.collected) continue
        const coreBox = { x: core.x - 20, y: core.y - 25, width: 40, height: 50 }
        if (overlap(player, coreBox)) {
          core.collected = true
          const owned = game.cores.filter((item) => item.collected).map((item) => item.id)
          setCollected(owned)
          showMessage(`${core.label} unlocked — ${core.sublabel}.`)
          addBurst(game, core.x, core.y, core.color)
          playTone(440 + owned.length * 120, 0.14, 780 + owned.length * 90)
        }
      }

      const allCollected = game.cores.every((core) => core.collected)
      const portal = { x: 861, y: 342, width: 68, height: 126 }
      if (allCollected && overlap(player, portal)) {
        setGameMode("won")
        showMessage("Launch complete. Byte opened Mark's portfolio portal!")
        addBurst(game, 895, 400, "#41e9ff", 75)
        addBurst(game, 895, 400, "#ffcc4d", 55)
        playTone(420, 0.5, 980)
      }

      game.timeLeft = Math.max(0, game.timeLeft - delta)
      const nextSecond = Math.ceil(game.timeLeft)
      if (nextSecond !== lastUiSecond) {
        lastUiSecond = nextSecond
        setTimeLeft(nextSecond)
      }
      if (game.timeLeft <= 0 && modeRef.current === "playing") {
        setGameMode("lost")
        showMessage("The portal powered down—but Byte is ready to try again.")
        playTone(210, 0.45, 95)
      }

      for (const particle of game.particles) {
        particle.life -= delta
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        particle.vy += 320 * delta
      }
      game.particles = game.particles.filter((particle) => particle.life > 0)

      if (player.petUntil > now && Math.random() > 0.86) {
        game.particles.push({
          x: player.x + 24,
          y: player.y - 4,
          vx: -12 + Math.random() * 24,
          vy: -42 - Math.random() * 35,
          life: 0.8,
          maxLife: 0.8,
          color: "#ff6b9d",
          size: 4,
        })
      }

      if (boosted && Math.abs(player.vx) > 40 && Math.random() > 0.58) {
        game.particles.push({
          x: player.x + (player.facing === 1 ? 3 : player.width - 3),
          y: player.y + 18 + Math.random() * 20,
          vx: -player.facing * (40 + Math.random() * 65),
          vy: -15 + Math.random() * 30,
          life: 0.45,
          maxLife: 0.45,
          color: Math.random() > 0.5 ? "#ff6bdb" : "#ffb3ed",
          size: 3 + Math.random() * 4,
        })
      }
    }

    const frame = (now: number) => {
      const game = gameRef.current
      if (!game.lastFrame) game.lastFrame = now
      const delta = Math.min((now - game.lastFrame) / 1000, 0.034)
      game.lastFrame = now
      update(game, delta, now)

      if (modeRef.current !== "playing") {
        for (const particle of game.particles) {
          particle.life -= delta
          particle.x += particle.vx * delta
          particle.y += particle.vy * delta
          particle.vy += 250 * delta
        }
        game.particles = game.particles.filter((particle) => particle.life > 0)
      }

      drawScene(context, game, modeRef.current, now)
      animationRef.current = requestAnimationFrame(frame)
    }
    animationRef.current = requestAnimationFrame(frame)

    const keyDown = (event: KeyboardEvent) => {
      if (modeRef.current !== "playing") return
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "a", "A", "d", "D", "w", "W"].includes(event.key)) {
        event.preventDefault()
      }
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") inputRef.current.left = true
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") inputRef.current.right = true
      if (event.key === "ArrowUp" || event.key === " " || event.key.toLowerCase() === "w") {
        inputRef.current.jumpQueued = true
      }
    }
    const keyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") inputRef.current.left = false
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") inputRef.current.right = false
    }
    const clearInputs = () => {
      inputRef.current.left = false
      inputRef.current.right = false
    }
    window.addEventListener("keydown", keyDown, { passive: false })
    window.addEventListener("keyup", keyUp)
    window.addEventListener("pointerup", clearInputs)
    window.addEventListener("blur", clearInputs)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("keydown", keyDown)
      window.removeEventListener("keyup", keyUp)
      window.removeEventListener("pointerup", clearInputs)
      window.removeEventListener("blur", clearInputs)
    }
  }, [playTone, setGameMode, showMessage])

  useEffect(
    () => () => {
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current)
      audioRef.current?.close()
    },
    [],
  )

  const holdInput = (input: InputName, pressed: boolean) => {
    inputRef.current[input] = pressed
  }

  const jump = () => {
    inputRef.current.jumpQueued = true
  }

  const handleCanvasPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (modeRef.current !== "playing") return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * WORLD_WIDTH
    const y = ((event.clientY - bounds.top) / bounds.height) * WORLD_HEIGHT
    const player = gameRef.current.player
    if (x >= player.x - 12 && x <= player.x + player.width + 12 && y >= player.y - 14 && y <= player.y + player.height + 14) {
      petByte()
    }
  }

  const toggleSound = () => {
    const nextValue = !soundOn
    setSoundOn(nextValue)
    soundRef.current = nextValue
    if (nextValue) playTone(520, 0.08, 660)
  }

  const coreDetails = initialCores()

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] text-[#eaf7ff] selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(65,233,255,0.15),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,107,157,0.12),transparent_25%),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:auto,auto,32px_32px,32px_32px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-cyan-300"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
            Mark's portfolio
          </a>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:inline">
              Byte Quest / Build 01
            </span>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundOn ? "Mute game sounds" : "Turn on game sounds"}
              className="grid h-10 w-10 place-items-center rounded border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-300"
            >
              {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <section className="flex flex-1 flex-col justify-start pt-8 sm:justify-center sm:pt-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300">A tiny game by NOTMORSE</p>
              <h1 className="mt-1 font-display text-3xl tracking-tight sm:text-5xl">
                Byte Quest: <span className="text-[#ff9a4d]">Shipyard Sprint</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Help Mark's pixel corgi recover three proof cores and unlock the portfolio portal before launch time runs out.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-cyan-200/20 bg-[#071126] shadow-[0_0_80px_rgba(65,233,255,0.08)]">
            <canvas
              ref={canvasRef}
              onPointerDown={handleCanvasPointer}
              className="block aspect-[16/9] w-full touch-none [image-rendering:pixelated]"
              role="img"
              aria-label="A pixel-art shipyard platform game starring Byte the corgi"
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3 sm:p-5">
              <div className="flex gap-1.5 sm:gap-2">
                {coreDetails.map((core) => {
                  const unlocked = collected.includes(core.id)
                  return (
                    <div
                      key={core.id}
                      className={`rounded border px-2 py-1 font-mono text-[9px] font-bold tracking-[0.12em] transition sm:px-3 sm:text-[10px] ${
                        unlocked
                          ? "border-current bg-white/10"
                          : "border-white/10 bg-[#050914]/70 text-slate-600"
                      }`}
                      style={unlocked ? { color: core.color, boxShadow: `0 0 18px ${core.color}22` } : undefined}
                    >
                      {unlocked ? "◆" : "◇"} {core.label}
                    </div>
                  )
                })}
              </div>
              <div
                className={`rounded border bg-[#050914]/75 px-3 py-1 font-mono text-sm font-bold tabular-nums backdrop-blur ${
                  timeLeft <= 10 && mode === "playing" ? "border-rose-400/70 text-rose-300" : "border-white/10 text-white"
                }`}
              >
                00:{String(timeLeft).padStart(2, "0")}
              </div>
            </div>

            {mode === "intro" && (
              <div className="absolute inset-0 grid place-items-center bg-[#050914]/58 p-2 backdrop-blur-[2px] sm:p-5">
                <div className="w-full max-w-xl border border-cyan-200/25 bg-[#071126]/95 p-2.5 text-center shadow-[5px_5px_0_rgba(65,233,255,0.12)] sm:p-8 sm:shadow-[8px_8px_0_rgba(65,233,255,0.12)]">
                  <p className="font-mono text-[7px] uppercase tracking-[0.3em] text-cyan-300 sm:text-[10px] sm:tracking-[0.35em]">Launch mission 01</p>
                  <h2 className="mt-1 font-display text-2xl leading-none sm:mt-3 sm:text-6xl sm:leading-normal">Wake Byte. Save the launch.</h2>
                  <p className="mx-auto mt-1.5 max-w-md text-[9px] leading-snug text-slate-300 sm:mt-4 sm:text-base sm:leading-relaxed">
                    Grab the three glowing cores. When the portal wakes up, run into it.
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2 sm:mt-5 sm:gap-3">
                    <svg
                      key={`landing-byte-${pets}`}
                      viewBox="0 0 112 68"
                      className="h-11 w-[72px] shrink-0 overflow-visible [image-rendering:pixelated] sm:h-16 sm:w-24"
                      role="img"
                      aria-label={pets > 0 ? "Byte bounces, wags his tail, and releases hearts" : "Byte waits for a pet"}
                    >
                      {pets > 0 && pets % 3 === 0 && (
                        <ellipse cx="55" cy="34" rx="43" ry="26" fill="none" stroke="#ff6bdb" strokeWidth="3" opacity="0">
                          <animate attributeName="opacity" values="0;0.9;0" dur="0.8s" repeatCount="2" />
                          <animate attributeName="rx" values="30;48;54" dur="0.8s" repeatCount="2" />
                          <animate attributeName="ry" values="18;29;33" dur="0.8s" repeatCount="2" />
                        </ellipse>
                      )}
                      <g>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0 1;0 -8;0 1;0 -4;0 1"
                          keyTimes="0;.22;.48;.7;1"
                          dur="0.7s"
                          repeatCount="1"
                        />
                        <ellipse cx="54" cy="55" rx="31" ry="5" fill="#000" opacity=".25" />
                        <g>
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="-22 32 38;32 32 38;-22 32 38;32 32 38;-22 32 38"
                            dur="0.18s"
                            repeatCount="4"
                          />
                          <rect x="12" y="34" width="27" height="10" fill="#d96b2b" />
                          <rect x="10" y="34" width="8" height="10" fill="#fff0cf" />
                        </g>
                        <rect x="34" y="29" width="39" height="26" fill="#e77a32" />
                        <rect x="65" y="21" width="27" height="29" fill="#e77a32" />
                        <rect x="51" y="42" width="24" height="13" fill="#fff0cf" />
                        <rect x="76" y="34" width="20" height="13" fill="#fff0cf" />
                        <path d="M69 23l4-17 11 16zm17-1L94 8l3 18z" fill="#b95025" />
                        <rect x="84" y="28" width="4" height="5" fill="#101827" />
                        <rect x="94" y="39" width="5" height="5" fill="#101827" />
                        <rect x="41" y="51" width="9" height="12" fill="#cf6228" />
                        <rect x="64" y="51" width="9" height="12" fill="#cf6228" />
                        <rect x="41" y="59" width="9" height="5" fill="#fff0cf" />
                        <rect x="64" y="59" width="9" height="5" fill="#fff0cf" />
                        <rect x="63" y="43" width="15" height="4" fill="#41e9ff" />
                        <rect x="69" y="45" width="5" height="6" fill="#ffcc4d" />
                      </g>
                      {pets > 0 && (
                        <g fill="#ff75c8" fontFamily="ui-monospace, monospace" fontWeight="900">
                          <text x="30" y="22" fontSize="13" opacity="0">♥
                            <animate attributeName="opacity" values="0;1;0" dur="0.9s" repeatCount="1" />
                            <animate attributeName="y" values="28;8" dur="0.9s" repeatCount="1" />
                          </text>
                          <text x="55" y="18" fontSize="10" opacity="0">♥
                            <animate attributeName="opacity" values="0;1;0" dur="0.8s" begin=".12s" repeatCount="1" />
                            <animate attributeName="y" values="25;3" dur="0.8s" begin=".12s" repeatCount="1" />
                          </text>
                        </g>
                      )}
                    </svg>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="group inline-flex min-h-8 items-center gap-2 bg-[#ff9147] px-3 font-mono text-[8px] font-black uppercase tracking-[0.14em] text-[#160b05] transition hover:-translate-y-0.5 hover:bg-[#ffad70] hover:shadow-[0_5px_0_#8f3f17] active:translate-y-1 active:shadow-none sm:min-h-12 sm:gap-3 sm:px-6 sm:text-xs sm:tracking-[0.18em] sm:hover:shadow-[0_8px_0_#8f3f17]"
                    >
                      Play now <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={petByte}
                      className="min-h-8 border border-white/15 bg-white/5 px-3 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-pink-300/60 hover:bg-pink-300/10 hover:text-pink-200 sm:min-h-12 sm:px-5 sm:text-xs sm:tracking-[0.15em]"
                    >
                      Pet Byte {pets > 0 ? `× ${pets}` : "♡"}
                    </button>
                  </div>
                  <p className="mt-5 hidden font-mono text-[10px] uppercase tracking-[0.13em] text-slate-500 sm:block">
                    Move: A D or ← → · Jump: W, ↑ or Space · 3 pets unlock Zoomies
                  </p>
                </div>
              </div>
            )}

            {mode === "won" && (
              <div className="absolute inset-0 grid place-items-center bg-[#04111a]/72 p-2 backdrop-blur-sm sm:p-5">
                <div className="w-full max-w-xl border border-cyan-300/45 bg-[#071126]/95 p-2.5 text-center shadow-[0_0_70px_rgba(65,233,255,0.2)] sm:p-9">
                  <p className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-cyan-300 sm:text-xs sm:tracking-[0.28em]">◆ Portal online ◆</p>
                  <h2 className="mt-1 font-display text-2xl sm:mt-3 sm:text-7xl">You shipped it.</h2>
                  <p className="mx-auto mt-1 max-w-md text-[9px] leading-snug text-slate-300 sm:mt-4 sm:text-base sm:leading-relaxed">
                    Byte recovered Mark's BUILD, WIN, and LEAD cores. The portfolio gateway is yours.
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3">
                    <a
                      href="/"
                      className="inline-flex min-h-8 items-center bg-cyan-300 px-3 font-mono text-[8px] font-black uppercase tracking-[0.12em] text-[#06111c] transition hover:-translate-y-0.5 hover:bg-white sm:min-h-12 sm:px-6 sm:text-xs sm:tracking-[0.16em]"
                    >
                      Enter the portfolio →
                    </a>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="inline-flex min-h-8 items-center gap-1 border border-white/15 px-3 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-slate-200 transition hover:border-white/40 hover:bg-white/5 sm:min-h-12 sm:gap-2 sm:px-5 sm:text-xs sm:tracking-[0.15em]"
                    >
                      <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" /> Play again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {mode === "lost" && (
              <div className="absolute inset-0 grid place-items-center bg-[#14070d]/70 p-2 backdrop-blur-sm sm:p-5">
                <div className="w-full max-w-lg border border-rose-300/35 bg-[#100b18]/95 p-2.5 text-center sm:p-9">
                  <p className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-rose-300 sm:text-xs sm:tracking-[0.25em]">Launch window closed</p>
                  <h2 className="mt-1 font-display text-2xl sm:mt-3 sm:text-5xl">Byte wants a rematch.</h2>
                  <p className="mt-1 text-[9px] leading-snug text-slate-300 sm:mt-4 sm:text-sm sm:leading-relaxed">
                    The cores reset safely. Pet Byte for courage, then sprint again.
                  </p>
                  <button
                    type="button"
                    onClick={resetGame}
                    className="mt-2 inline-flex min-h-8 items-center gap-1 bg-rose-300 px-3 font-mono text-[8px] font-black uppercase tracking-[0.12em] text-[#1b0710] transition hover:-translate-y-0.5 hover:bg-white sm:mt-6 sm:min-h-12 sm:gap-2 sm:px-6 sm:text-xs sm:tracking-[0.16em]"
                  >
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" /> Try again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div aria-live="polite" className="min-h-11 border-l-2 border-cyan-300/60 bg-white/[0.025] px-4 py-3 font-mono text-xs text-slate-300">
              <span className="mr-2 text-cyan-300">BYTE //</span> {message}
            </div>

            <div className={`flex justify-center gap-2 ${mode !== "playing" ? "opacity-40" : ""}`} aria-label="Game controls">
              <button
                type="button"
                disabled={mode !== "playing"}
                onPointerDown={() => holdInput("left", true)}
                onPointerUp={() => holdInput("left", false)}
                onPointerLeave={() => holdInput("left", false)}
                className="grid h-12 w-14 touch-none place-items-center border border-white/15 bg-white/5 text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10 active:translate-y-0.5 disabled:cursor-not-allowed"
                aria-label="Move Byte left"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={mode !== "playing"}
                onPointerDown={() => holdInput("right", true)}
                onPointerUp={() => holdInput("right", false)}
                onPointerLeave={() => holdInput("right", false)}
                className="grid h-12 w-14 touch-none place-items-center border border-white/15 bg-white/5 text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10 active:translate-y-0.5 disabled:cursor-not-allowed"
                aria-label="Move Byte right"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                disabled={mode !== "playing"}
                onPointerDown={jump}
                className="h-12 touch-none border border-[#ff9147]/45 bg-[#ff9147]/10 px-5 font-mono text-[10px] font-black uppercase tracking-[0.15em] text-[#ffad70] transition hover:border-[#ff9147] hover:bg-[#ff9147]/20 active:translate-y-0.5 disabled:cursor-not-allowed"
                aria-label="Make Byte jump"
              >
                Jump ↑
              </button>
              <button
                type="button"
                disabled={mode !== "playing"}
                onClick={petByte}
                className="h-12 border border-pink-300/30 bg-pink-300/5 px-4 font-mono text-[10px] font-black uppercase tracking-[0.15em] text-pink-200 transition hover:border-pink-300/70 hover:bg-pink-300/10 active:translate-y-0.5 disabled:cursor-not-allowed"
                aria-label="Pet Byte"
              >
                Pet ♡
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">
          <span>Designed and built for Mark Andrei Condino</span>
          <span>Tip: click Byte during the mission</span>
        </footer>
      </div>
    </main>
  )
}

