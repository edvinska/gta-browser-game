import React from 'react'

interface HealthBarProps {
  health: number
  maxHealth?: number
}

export const HealthBar: React.FC<HealthBarProps> = ({ health, maxHealth = 100 }) => {
  const healthPercent = (health / maxHealth) * 100
  const healthColor =
    health > 60
      ? 'from-green-400 to-green-500'
      : health > 30
        ? 'from-yellow-400 to-yellow-500'
        : 'from-red-400 to-red-500'

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold uppercase text-gray-300">Health</span>
        <span className={`text-sm font-bold`}>
          {Math.round(health)}/{maxHealth}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
        <div
          className={`h-full bg-gradient-to-r ${healthColor} transition-all duration-200`}
          style={{ width: `${Math.max(0, healthPercent)}%` }}
        />
      </div>
    </div>
  )
}
