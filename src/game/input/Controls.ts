import { GameInput } from '@/types'
import { InputManager } from '@/game/input/InputManager'

/**
 * Controls - Handles mapping of input to player and vehicle actions
 */
export class Controls {
  private inputManager: InputManager

  constructor(inputManager: InputManager) {
    this.inputManager = inputManager
  }

  getPlayerInput(): GameInput {
    return this.inputManager.getInput()
  }

  getVehicleInput(): GameInput {
    return this.inputManager.getInput()
  }

  // Player-specific control mappings
  isPlayerMoving(input: GameInput): boolean {
    return input.forward || input.backward || input.left || input.right
  }

  getPlayerDirection(input: GameInput): { forward: number; right: number } {
    return {
      forward: (input.forward ? 1 : 0) - (input.backward ? 1 : 0),
      right: (input.right ? 1 : 0) - (input.left ? 1 : 0),
    }
  }

  // Vehicle-specific control mappings
  isVehicleMoving(input: GameInput): boolean {
    return input.accelerate || input.brake
  }

  getSteeringInput(input: GameInput): number {
    return (input.right ? 1 : 0) - (input.left ? 1 : 0)
  }

  getAdditionalInput(input: GameInput): {
    accelerate: boolean
    brake: boolean
    handbrake: boolean
  } {
    return {
      accelerate: input.accelerate,
      brake: input.brake,
      handbrake: input.handbrake,
    }
  }
}
