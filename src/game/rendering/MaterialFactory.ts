import * as THREE from 'three'

/**
 * MaterialFactory - Creates PBR materials with consistent quality
 * Supports various material types with optional texture loading
 */
export class MaterialFactory {
  private materialsCache: Map<string, THREE.Material> = new Map()

  createStandardMaterial(options: {
    color?: number
    roughness?: number
    metalness?: number
    name?: string
  }): THREE.MeshStandardMaterial {
    const {
      color = 0x888888,
      roughness = 0.5,
      metalness = 0,
      name = 'standard',
    } = options

    const material = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      name,
    })

    this.materialsCache.set(name, material)
    return material
  }

  createRoadMaterial(): THREE.MeshStandardMaterial {
    return this.createStandardMaterial({
      color: 0x444444,
      roughness: 0.9,
      metalness: 0,
      name: 'road',
    })
  }

  createBuildingMaterial(color: number = 0xcccccc): THREE.MeshStandardMaterial {
    return this.createStandardMaterial({
      color,
      roughness: 0.7,
      metalness: 0.1,
      name: `building-${color.toString(16)}`,
    })
  }

  createVehiclePaint(color: number = 0xff0000): THREE.MeshStandardMaterial {
    return this.createStandardMaterial({
      color,
      roughness: 0.3,
      metalness: 0.8,
      name: `vehicle-${color.toString(16)}`,
    })
  }

  createWindowMaterial(): THREE.MeshStandardMaterial {
    const material = new THREE.MeshStandardMaterial({
      color: 0x4488ff,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.5,
      name: 'window',
    })
    this.materialsCache.set('window', material)
    return material
  }

  getMaterial(name: string): THREE.Material | undefined {
    return this.materialsCache.get(name)
  }

  dispose() {
    this.materialsCache.forEach((material) => {
      if (material instanceof THREE.Material) {
        material.dispose()
      }
    })
    this.materialsCache.clear()
  }
}
