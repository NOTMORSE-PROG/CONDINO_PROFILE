import type { Metadata } from "next"
import { ByteQuestGame } from "@/components/byte-quest-game"

export const metadata: Metadata = {
  title: "Byte Quest: Shipyard Sprint",
  description:
    "Play a tiny pixel-art adventure with Byte, Mark Andrei Condino's shipyard corgi. Collect three proof cores and open the portfolio portal.",
}

export default function ByteQuestPage() {
  return <ByteQuestGame />
}

