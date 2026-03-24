import React from 'react'

interface SpeedometerProps {
  speed: number
  rpm: number
  maxSpeed?: number
  maxRPM?: number
}

export const Speedometer: React.FC<SpeedometerProps> = ({
  speed,
  rpm,
  maxSpeed = 300,
  maxRPM = 8000,
}) => {
  const speedPercent = (speed / maxSpeed) * 100
  const rpmPercent = (rpm / maxRPM) * 100

  return (
    <div className="w-48 flex gap-4">
      {/* Speed gauge */}
      <div className="flex-1">
        <div className="text-xs font-semibold text-gray-300 mb-1">KMH</div>
        <div className="relative h-32 bg-gray-900/50 rounded border border-white/10">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path
              d="M 50 80 A 30 30 0 0 0 20 50"
              fill="none"
              stroke="#444"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="2"
              fill="white"
            />
            {/* Speed needle */}
            <line
              x1="50"
              y1="50"
              x2="50 + Math.sin(((speedPercent / 100) * 160 - 80) * Math.PI / 180) * 20"
              y2="50 - Math.cos(((speedPercent / 100) * 160 - 80) * Math.PI / 180) * 20"
              stroke="#00ff00"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-green-400">{Math.round(speed)}</span>
          </div>
        </div>
      </div>

      {/* RPM gauge */}
      <div className="flex-1">
        <div className="text-xs font-semibold text-gray-300 mb-1">RPM</div>
        <div className="relative h-32 bg-gray-900/50 rounded border border-white/10">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path
              d="M 50 80 A 30 30 0 0 0 20 50"
              fill="none"
              stroke="#444"
              strokeWidth="2"
            />
            <circle cx="50" cy="50" r="2" fill="white" />
            {/* RPM needle */}
            <line
              x1="50"
              y1="50"
              x2="50 + Math.sin(((rpmPercent / 100) * 160 - 80) * Math.PI / 180) * 20"
              y2="50 - Math.cos(((rpmPercent / 100) * 160 - 80) * Math.PI / 180) * 20"
              stroke={rpmPercent > 80 ? '#ff0000' : '#ffff00'}
              strokeWidth="2"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-yellow-400">{Math.round(rpm)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
