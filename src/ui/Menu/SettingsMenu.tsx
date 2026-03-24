import React, { useState } from 'react'
import { Panel, Button } from '../Components/ui'

interface SettingsMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    shadows: true,
    reflections: true,
    motionBlur: true,
    masterVolume: 80,
    musicVolume: 60,
    sfxVolume: 80,
  })

  if (!isOpen) return null

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleVolumeChange = (key: string, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40" style={{ backdropFilter: 'blur(4px)' }}>
      <Panel className="w-96">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">SETTINGS</h2>

          {/* Graphics */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-300 mb-3">Graphics</h3>
            <div className="space-y-2">
              {['shadows', 'reflections', 'motionBlur'].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[option as keyof typeof settings] as boolean}
                    onChange={() => handleToggle(option as keyof typeof settings)}
                    className="rounded"
                  />
                  <span className="text-sm capitalize">{option.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Audio */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-300 mb-3">Audio</h3>
            <div className="space-y-3">
              {[
                { key: 'masterVolume', label: 'Master Volume' },
                { key: 'musicVolume', label: 'Music Volume' },
                { key: 'sfxVolume', label: 'SFX Volume' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-semibold uppercase">{label}</label>
                    <span className="text-xs">{settings[key as keyof typeof settings]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings[key as keyof typeof settings]}
                    onChange={(e) => handleVolumeChange(key, parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Controls Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-300 mb-2">Controls</h3>
            <div className="text-xs text-gray-400 space-y-1">
              <p>WASD - Move / Drive</p>
              <p>SPACE - Jump</p>
              <p>E - Interact</p>
              <p>SHIFT - Sprint</p>
              <p>ESC - Menu</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1">
              APPLY & CLOSE
            </Button>
            <Button onClick={onClose} variant="secondary" className="flex-1">
              CANCEL
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  )
}
