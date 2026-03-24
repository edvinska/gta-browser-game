import React from 'react'
import { useGameStore } from '@/game/stores/gameState'

export const Minimap: React.FC = () => {
  const { player, vehicle } = useGameStore()

  return (
    <div className="w-32 h-32 bg-gray-900/70 rounded border border-white/20">
      <svg width="128" height="128" className="w-full h-full">
        {/* Background */}
        <rect width="128" height="128" fill="#1a1a2e" opacity="0.8" />

        {/* Grid */}
        <line x1="64" y1="0" x2="64" y2="128" stroke="#666" strokeWidth="0.5" opacity="0.3" />
        <line x1="0" y1="64" x2="128" y2="64" stroke="#666" strokeWidth="0.5" opacity="0.3" />

        {/* Player position (center) */}
        <circle cx="64" cy="64" r="4" fill="#0f3460" stroke="#00d4ff" strokeWidth="1" />

        {/* Direction indicator */}
        <line x1="64" y1="64" x2="64" y2="48" stroke="#00d4ff" strokeWidth="1" />
      </svg>
    </div>
  )
}
