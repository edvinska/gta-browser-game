import { GameInput } from '@/types'
import { Logger } from '@/game/utils/Logger'

export class InputManager {
  private keys: Map<string, boolean> = new Map()
  private input: GameInput
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.input = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
      interact: false,
      accelerate: false,
      brake: false,
      handbrake: false,
      mouseX: 0,
      mouseY: 0,
    }

    this.setupEventListeners()
    Logger.log('InputManager initialized')
  }

  private setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', (e) => this.handleKeyDown(e))
    document.addEventListener('keyup', (e) => this.handleKeyUp(e))

    // Mouse movement
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e))

    // Lock pointer
    document.addEventListener('click', () => {
      if (document.pointerLockElement === null) {
        this.canvas.requestPointerLock()
      }
    })

    // Gamepad support (future)
    window.addEventListener('gamepadconnected', (e) => {
      Logger.log('Gamepad connected:', e.gamepad.id)
    })
  }

  private handleKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase()
    this.keys.set(key, true)

    // Update input state based on key mappings
    this.updateInputState(key, true)
  }

  private handleKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase()
    this.keys.set(key, false)

    // Update input state based on key mappings
    this.updateInputState(key, false)
  }

  private updateInputState(key: string, pressed: boolean) {
    switch (key) {
      case 'w':
        this.input.forward = pressed
        break
      case 's':
        this.input.backward = pressed
        break
      case 'a':
        this.input.left = pressed
        break
      case 'd':
        this.input.right = pressed
        break
      case ' ':
        this.input.jump = pressed
        break
      case 'e':
        this.input.interact = pressed
        break
      case 'shift':
        this.input.accelerate = pressed
        break
      case 'control':
        this.input.brake = pressed
        break
      case 'x':
        this.input.handbrake = pressed
        break
      case 'escape':
        // Handle pause menu toggle (handled in Game.ts)
        break
    }
  }

  private handleMouseMove(e: MouseEvent) {
    // Normalize mouse coordinates to -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1

    this.input.mouseX = x
    this.input.mouseY = y
  }

  getInput(): GameInput {
    return this.input
  }

  isKeyPressed(key: string): boolean {
    return this.keys.get(key.toLowerCase()) || false
  }

  reset() {
    this.input = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
      interact: false,
      accelerate: false,
      brake: false,
      handbrake: false,
      mouseX: 0,
      mouseY: 0,
    }
  }
}
