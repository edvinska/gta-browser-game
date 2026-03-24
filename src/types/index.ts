import * as THREE from 'three'
import * as CANNON from 'cannon'

export interface Vector3 {
  x: number
  y: number
  z: number
}

export interface GameInput {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
  interact: boolean
  accelerate: boolean
  brake: boolean
  handbrake: boolean
  mouseX: number
  mouseY: number
}

export interface PlayerState {
  position: Vector3
  velocity: Vector3
  rotation: number
  grounded: boolean
  inVehicle: boolean
  health: number
}

export interface VehicleState {
  position: Vector3
  rotation: THREE.Euler
  velocity: Vector3
  speed: number
  rpm: number
  gear: number
  fuel: number
  active: boolean
  driver: string | null
}

export interface GameState {
  gameMode: 'menu' | 'play' | 'paused' | 'loading'
  player: PlayerState
  vehicle: VehicleState | null
  input: GameInput
  world: WorldState
  ui: UIState
}

export interface WorldState {
  time: number // 0-24 (24-hour cycle)
  weather: 'clear' | 'rain' | 'fog' | 'storm'
  wind: number
  selectedChunk: { x: number; z: number } | null
  loadedChunks: Set<string>
}

export interface UIState {
  menuOpen: boolean
  pauseMenuOpen: boolean
  mapOpen: boolean
  showDebug: boolean
  settingsOpen: boolean
  fpsVisible: boolean
  interactionText: string
}

export interface ChunkData {
  x: number
  z: number
  buildings: BuildingData[]
  roads: THREE.Mesh[]
}

export interface BuildingData {
  position: Vector3
  scale: Vector3
  rotation: number
  height: number
  type: string
}

export interface EntityManager {
  addEntity(entity: Entity): void
  removeEntity(id: string): void
  getEntity(id: string): Entity | undefined
  getAllEntities(): Entity[]
  update(deltaTime: number): void
}

export interface Entity {
  id: string
  mesh: THREE.Object3D
  body: CANNON.Body | null
  velocity: CANNON.Vec3
  position: Vector3
  rotation: Vector3
  update(deltaTime: number): void
  destroy(): void
}

export interface RaycastVehicleOptions {
  mass: number
  wheelRadius: number
  wheelSuspensionStiffness: number
  wheelDamping: number
  wheelFriction: number
  suspensionRestLength: number
}
