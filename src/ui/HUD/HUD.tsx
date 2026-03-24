import React from 'react'
import { useGameStore } from '@/game/stores/gameState'
import { Panel } from '../Components/ui'

export const HUD: React.FC = () => {
  const { gameMode, player, ui } = useGameStore()
  const [fps, setFps] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.round(1000 / 16.67)) // Approximate
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (gameMode !== 'play') return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top Left - Health & Status */}
      <div className="absolute top-8 left-8">
        <Panel className="w-48">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold uppercase text-gray-300">Health</span>
                <span className="text-sm font-bold text-green-400">{player.health}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-200"
                  style={{ width: `${player.health}%` }}
                />
              </div>
            </div>
            <div className="text-xs text-gray-400">
              <p>Position: {Math.round(player.position.x)}, {Math.round(player.position.z)}</p>
            </div>
          </div>
        </Panel>
      </div>

      {/* Top Right - Mini Map & Info */}
      <div className="absolute top-8 right-8">
        <Panel className="w-56 pointer-events-auto">
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-300 mb-2">Location</h4>
              <p className="text-sm font-semibold">Downtown District</p>
              <p className="text-xs text-gray-400">No Active Mission</p>
            </div>
            <div className="w-full h-32 bg-gray-900 rounded border border-white/10">
              {/* Mini map placeholder */}
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Bottom Right - Speedometer (if in vehicle) */}
      {player.inVehicle && (
        <div className="absolute bottom-8 right-8">
          <Panel className="w-48">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs font-semibold uppercase">Speed</span>
                <span className="text-sm font-bold">0 km/h</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-gradient-to-r from-yellow-400 to-red-500" />
              </div>
            </div>
          </Panel>
        </div>
      )}

      {/* Bottom Left - Interaction Prompt */}
      {ui.interactionText && (
        <div className="absolute bottom-8 left-8">
          <Panel className="pointer-events-auto">
            <p className="text-sm font-semibold text-blue-300">{ui.interactionText}</p>
          </Panel>
        </div>
      )}

      {/* FPS Counter */}
      {ui.fpsVisible && (
        <div className="absolute top-8 right-8 bottom-auto left-auto">
          <Panel className="w-20 pointer-events-auto">
            <p className="text-xs font-mono text-green-400">{fps} FPS</p>
          </Panel>
        </div>
      )}
    </div>
  )
}
