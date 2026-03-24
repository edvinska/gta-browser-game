import React from 'react'

export const MapPreview: React.FC = () => {
  return (
    <div className="w-96 h-96 bg-gray-900/70 rounded border border-white/20 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        {/* Background */}
        <rect width="400" height="400" fill="#1a1a2e" />

        {/* Roads */}
        <line x1="200" y1="0" x2="200" y2="400" stroke="#666" strokeWidth="8" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#666" strokeWidth="8" />

        {/* Districts */}
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="#0f3460" strokeWidth="2" opacity="0.5" />
        <text x="20" y="30" fontSize="12" fill="#00d4ff">Downtown</text>

        <rect x="210" y="10" width="180" height="180" fill="none" stroke="#0f3460" strokeWidth="2" opacity="0.5" />
        <text x="220" y="30" fontSize="12" fill="#00d4ff">Suburbs</text>

        <rect x="10" y="210" width="180" height="180" fill="none" stroke="#0f3460" strokeWidth="2" opacity="0.5" />
        <text x="20" y="230" fontSize="12" fill="#00d4ff">Industrial</text>

        {/* Player position */}
        <circle cx="200" cy="200" r="6" fill="#00ff00" stroke="#00d4ff" strokeWidth="2" />

        {/* Legend */}
        <text x="10" y="395" fontSize="10" fill="#888" fontFamily="monospace">Open World Map - (Procedural 2km x 2km)</text>
      </svg>
    </div>
  )
}
