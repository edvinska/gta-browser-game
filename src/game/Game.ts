import * as THREE from 'three'
import { GameScene } from '@/game/scenes/GameScene'
import { CannonPhysics } from '@/game/physics/CannonPhysics'
import { InputManager } from '@/game/input/InputManager'
import { Player } from '@/game/entities/Player'
import { ThirdPersonCamera } from '@/game/entities/Camera'
import { PerformanceMonitor } from '@/game/utils/PerformanceMonitor'
import { Logger } from '@/game/utils/Logger'
import { useGameStore } from '@/game/stores/gameState'
import * as CANNON from 'cannon'

export class Game {
  private scene: GameScene | null = null
  private physics: CannonPhysics | null = null
  private inputManager: InputManager | null = null
  private player: Player | null = null
  private camera: ThirdPersonCamera | null = null
  private performanceMonitor: PerformanceMonitor = new PerformanceMonitor()
  private animationFrameId: number | null = null
  private isRunning: boolean = false
  private isPaused: boolean = false

  async initialize(canvas: HTMLCanvasElement) {
    try {
      Logger.log('Initializing game...')

      // Initialize core systems
      this.scene = new GameScene(canvas)
      this.physics = new CannonPhysics()
      this.inputManager = new InputManager(canvas)

      // Create player
      const playerPosition = new CANNON.Vec3(0, 5, 0)
      this.player = new Player(this.physics, playerPosition)
      this.scene.getScene().add(this.player.mesh)

      // Setup camera
      this.camera = new ThirdPersonCamera(this.scene.getCamera())

      // Handle keyboard shortcuts
      this.setupKeyboardShortcuts()

      this.isRunning = true
      Logger.log('Game initialized successfully')

      // Update game state
      useGameStore.getState().setGameMode('play')
      useGameStore.getState().setMenuOpen(false)

      // Start game loop
      this.gameLoop()
    } catch (error) {
      Logger.error('Failed to initialize game:', error)
      throw error
    }
  }

  private setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.togglePauseMenu()
      }
      if (e.key === 'd' && e.ctrlKey) {
        const state = useGameStore.getState()
        useGameStore.setState({ ui: { ...state.ui, showDebug: !state.ui.showDebug } })
      }
    })
  }

  private togglePauseMenu() {
    this.isPaused = !this.isPaused
    const state = useGameStore.getState()
    useGameStore.setState({
      ui: { ...state.ui, pauseMenuOpen: this.isPaused },
      gameMode: this.isPaused ? 'paused' : 'play',
    })
  }

  private gameLoop = () => {
    if (!this.isRunning) return

    // Calculate delta time
    const deltaTime = this.performanceMonitor.update()

    if (!this.isPaused) {
      // Update game systems
      this.updatePhysics(deltaTime)
      this.updatePlayer(deltaTime)
      this.updateCamera()
    }

    // Update UI state
    this.updateGameState()

    // Render scene
    if (this.scene) {
      this.scene.render()
    }

    this.animationFrameId = requestAnimationFrame(this.gameLoop)
  }

  private updatePhysics(deltaTime: number) {
    if (!this.physics) return
    this.physics.update(deltaTime)
  }

  private updatePlayer(deltaTime: number) {
    if (!this.player || !this.physics || !this.inputManager) return

    const input = this.inputManager.getInput()
    this.player.update(deltaTime, input, this.physics)
  }

  private updateCamera() {
    if (!this.camera || !this.player || !this.scene) return

    this.camera.update(
      this.player.position,
      this.player.mesh,
      this.scene.getScene()
    )
  }

  private updateGameState() {
    if (!this.player) return

    const state = useGameStore.getState()
    useGameStore.setState({
      player: {
        ...state.player,
        position: this.player.position,
        grounded: this.player.getIsGrounded(),
        health: state.player.health,
        inVehicle: false,
      },
      ui: {
        ...state.ui,
        fpsVisible: true,
      },
    })
  }

  dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }

    if (this.scene) {
      this.scene.dispose()
    }

    if (this.physics) {
      this.physics.dispose()
    }

    this.isRunning = false
  }
}
