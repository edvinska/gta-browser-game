import * as CANNON from 'cannon'
import { Logger } from '@/game/utils/Logger'

/**
 * Collisions - Handles collision detection and responses
 */
export class Collisions {
  private world: CANNON.World
  private contactListeners: Map<string, (contact: CANNON.ContactEquation) => void> = new Map()

  constructor(world: CANNON.World) {
    this.world = world
    this.setupCollisionListeners()
  }

  private setupCollisionListeners() {
    // Listen for collisions
    this.world.addEventListener('beforeCollide', (event) => {
      this.handleCollisionBegin(event)
    })

    this.world.addEventListener('collide', (event) => {
      this.handleCollision(event)
    })

    this.world.addEventListener('endContact', (event) => {
      this.handleCollisionEnd(event)
    })
  }

  private handleCollisionBegin(event: any) {
    // Handle collision start
    const contactKey = `${event.body1.id}-${event.body2.id}`
    Logger.debug(`Collision begin: ${contactKey}`)
  }

  private handleCollision(event: any) {
    // Handle ongoing collision
    Logger.debug(`Collision ongoing: body1=${event.body1.id}, body2=${event.body2.id}`)
  }

  private handleCollisionEnd(event: any) {
    // Handle collision end
    const contactKey = `${event.body1.id}-${event.body2.id}`
    Logger.debug(`Collision end: ${contactKey}`)
  }

  registerCollisionListener(
    id: string,
    listener: (contact: CANNON.ContactEquation) => void
  ) {
    this.contactListeners.set(id, listener)
  }

  unregisterCollisionListener(id: string) {
    this.contactListeners.delete(id)
  }

  dispose() {
    this.contactListeners.clear()
  }
}
