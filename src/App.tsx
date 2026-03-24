import React, { useEffect, useRef } from 'react'
import { Game } from '@/game/Game'
import { MenuScreen } from '@/ui/Menu/MenuScreen'
import { HUD } from '@/ui/HUD/HUD'
import { useGameStore } from '@/game/stores/gameState'
import { Logger } from '@/game/utils/Logger'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const { gameMode, menuOpen } = useGameStore()

  useEffect(() => {
    const initializeGame = async () => {
      if (!canvasRef.current) {
        Logger.error('Canvas element not found')
        return
      }

      try {
        gameRef.current = new Game()
        await gameRef.current.initialize(canvasRef.current)
      } catch (error) {
        Logger.error('Failed to initialize game:', error)
      }
    }

    initializeGame()

    return () => {
      if (gameRef.current) {
        gameRef.current.dispose()
      }
    }
  }, [])

  const handleStartGame = () => {
    useGameStore.setState({
      menuOpen: false,
      gameMode: 'play',
    })
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* Canvas for Three.js rendering */}
      <canvas
        ref={canvasRef}
        className="w-full h-screen block"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />

      {/* UI Layers */}
      <HUD />
      <MenuScreen onStartGame={handleStartGame} />

      {/* Debug Info */}
      {useGameStore().ui.showDebug && (
        <div className="fixed bottom-4 left-4 text-sm font-mono text-green-400 bg-black/70 p-3 rounded border border-green-400/30">
          <div>GTA V-Style Browser Game</div>
          <div>Mode: {gameMode}</div>
          <div>Menu: {menuOpen ? 'Open' : 'Closed'}</div>
        </div>
      )}
    </div>
  )
}

export default App
