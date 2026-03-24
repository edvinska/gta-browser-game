import React from 'react'
import { Button, Panel } from '../Components/ui'

interface MenuScreenProps {
  onStartGame: () => void
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStartGame }) => {
  const [showSettings, setShowSettings] = React.useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" style={{ backdropFilter: 'blur(4px)' }}>
      <div className="flex flex-col items-center gap-8">
        {/* Logo/Title */}
        <div className="text-center mb-4">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            OPEN WORLD
          </h1>
          <p className="text-xl text-gray-300">A browser-based city experience</p>
        </div>

        {/* Main Menu Panel */}
        {!showSettings && (
          <Panel className="w-80">
            <div className="flex flex-col gap-4">
              <Button onClick={onStartGame} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                START GAME
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="secondary"
                className="w-full"
              >
                SETTINGS
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => {}}>
                QUIT
              </Button>
            </div>
          </Panel>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <Panel className="w-96">
            <div className="flex flex-col gap-6">
              {/* Graphics */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase mb-2">Graphics</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Shadows</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Reflections</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Motion Blur</span>
                  </label>
                </div>
              </div>

              {/* Controls */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase mb-2">Controls</h4>
                <div className="space-y-1 text-xs text-gray-400">
                  <p>WASD - Move</p>
                  <p>SPACE - Jump</p>
                  <p>E - Interact</p>
                  <p>SHIFT - Sprint</p>
                </div>
              </div>

              {/* Back Button */}
              <Button
                onClick={() => setShowSettings(false)}
                variant="secondary"
                className="w-full"
              >
                BACK
              </Button>
            </div>
          </Panel>
        )}
      </div>
    </div>
  )
}
