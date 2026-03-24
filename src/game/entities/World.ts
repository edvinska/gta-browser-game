import { Entity } from '@/types'
import { Logger } from '@/game/utils/Logger'

/**
 * World - Entity manager for all game objects
 * Handles entity creation, removal, and updates
 */
export class World {
  private entities: Map<string, Entity> = new Map()
  private entityCount: number = 0

  addEntity(entity: Entity): void {
    if (this.entities.has(entity.id)) {
      Logger.warn(`Entity with ID ${entity.id} already exists. Replacing.`)
      this.entities.get(entity.id)?.destroy()
    }
    this.entities.set(entity.id, entity)
    this.entityCount++
    Logger.debug(`Entity added: ${entity.id} (total: ${this.entityCount})`)
  }

  removeEntity(id: string): void {
    const entity = this.entities.get(id)
    if (entity) {
      entity.destroy()
      this.entities.delete(id)
      this.entityCount--
      Logger.debug(`Entity removed: ${id} (total: ${this.entityCount})`)
    }
  }

  getEntity(id: string): Entity | undefined {
    return this.entities.get(id)
  }

  getAllEntities(): Entity[] {
    return Array.from(this.entities.values())
  }

  update(deltaTime: number): void {
    this.entities.forEach((entity) => {
      entity.update(deltaTime)
    })
  }

  clear(): void {
    this.entities.forEach((entity) => entity.destroy())
    this.entities.clear()
    this.entityCount = 0
  }

  getEntityCount(): number {
    return this.entityCount
  }
}
