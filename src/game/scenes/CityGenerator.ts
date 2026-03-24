import * as THREE from 'three'
import { Logger } from '@/game/utils/Logger'

export class CityGenerator {
  private scene: THREE.Scene
  private buildings: THREE.Group[] = []
  private roads: THREE.Mesh[] = []
  private chunkSize: number = 256

  constructor(scene: THREE.Scene) {
    this.scene = scene
    Logger.log('CityGenerator initialized')
  }

  generateChunk(chunkX: number, chunkZ: number): THREE.Group {
    const chunkGroup = new THREE.Group()
    chunkGroup.name = `chunk-${chunkX}-${chunkZ}`

    // Generate buildings for this chunk
    const buildingsInChunk = this.generateBuildings(chunkX, chunkZ)
    buildingsInChunk.forEach((building) => chunkGroup.add(building))

    // Generate roads
    const roadsInChunk = this.generateRoads(chunkX, chunkZ)
    roadsInChunk.forEach((road) => chunkGroup.add(road))

    this.scene.add(chunkGroup)
    return chunkGroup
  }

  private generateBuildings(chunkX: number, chunkZ: number): THREE.Mesh[] {
    const buildings: THREE.Mesh[] = []
    const gridSize = 4
    const spacing = this.chunkSize / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Pseudo-random building generation
        const seed = (chunkX * 73856093) ^ (chunkZ * 19349663) ^ (i * 83492791) ^ (j * 97239931)
        const random = Math.abs(Math.sin(seed) * 100) % 100

        if (random > 30) {
          // 70% chance of building
          const x = chunkX * this.chunkSize + i * spacing + spacing / 2
          const z = chunkZ * this.chunkSize + j * spacing + spacing / 2
          const height = 20 + (random % 60)
          const width = spacing * 0.8
          const depth = spacing * 0.8

          const building= this.createBuilding(x, height / 2, z, width, height, depth)
          buildings.push(building)
        }
      }
    }

    return buildings
  }

  private generateRoads(chunkX: number, chunkZ: number): THREE.Mesh[] {
    const roads: THREE.Mesh[] = []

    // Road material
    const roadMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.8,
      metalness: 0,
    })

    // Horizontal road
    const hRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(this.chunkSize, 20),
      roadMaterial
    )
    hRoad.rotation.x = -Math.PI / 2
    hRoad.position.set(chunkX * this.chunkSize, 0.01, chunkZ * this.chunkSize)
    hRoad.receiveShadow = true
    roads.push(hRoad)

    // Vertical road
    const vRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(20, this.chunkSize),
      roadMaterial
    )
    vRoad.rotation.x = -Math.PI / 2
    vRoad.position.set(chunkX * this.chunkSize, 0.01, chunkZ * this.chunkSize)
    vRoad.receiveShadow = true
    roads.push(vRoad)

    return roads
  }

  private createBuilding(x: number, y: number, z: number, width: number, height: number, depth: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(width, height, depth)

    // Create a simple material with variation
    const hue = Math.random() * 360
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(hue / 360, 0.6, 0.5),
      roughness: 0.7,
      metalness: 0.1,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true

    return mesh
  }

  unloadChunk(chunkX: number, chunkZ: number) {
    const chunkName = `chunk-${chunkX}-${chunkZ}`
    const chunk = this.scene.getObjectByName(chunkName)
    if (chunk) {
      this.scene.remove(chunk)
    }
  }

  dispose() {
    this.buildings = []
    this.roads = []
  }
}
