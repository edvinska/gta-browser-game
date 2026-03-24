import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Logger } from '@/game/utils/Logger'

/**
 * AssetLoader - Handles loading of 3D models, textures, and other assets
 * Includes caching to avoid duplicate loads
 */
export class AssetLoader {
  private gltfLoader: GLTFLoader
  private textureLoader: THREE.TextureLoader
  private modelCache: Map<string, THREE.Group> = new Map()
  private textureCache: Map<string, THREE.Texture> = new Map()

  constructor() {
    this.gltfLoader = new GLTFLoader()
    this.textureLoader = new THREE.TextureLoader()
  }

  async loadModel(path: string): Promise<THREE.Group> {
    // Check cache first
    if (this.modelCache.has(path)) {
      Logger.log(`Loading model from cache: ${path}`)
      const cached = this.modelCache.get(path)
      return cached?.clone() as THREE.Group
    }

    try {
      Logger.log(`Loading model: ${path}`)
      const gltf = await new Promise<any>((resolve, reject) => {
        this.gltfLoader.load(path, resolve, undefined, reject)
      })

      const model = gltf.scene as THREE.Group

      // Cache the model
      this.modelCache.set(path, model)

      Logger.log(`Model loaded successfully: ${path}`)
      return model
    } catch (error) {
      Logger.error(`Failed to load model: ${path}`, error)
      throw error
    }
  }

  async loadTexture(path: string): Promise<THREE.Texture> {
    // Check cache first
    if (this.textureCache.has(path)) {
      return this.textureCache.get(path)!
    }

    try {
      Logger.log(`Loading texture: ${path}`)
      const texture = await new Promise<THREE.Texture>((resolve, reject) => {
        this.textureLoader.load(path, resolve, undefined, reject)
      })

      // Cache the texture
      this.textureCache.set(path, texture)
      Logger.log(`Texture loaded successfully: ${path}`)

      return texture
    } catch (error) {
      Logger.error(`Failed to load texture: ${path}`, error)
      throw error
    }
  }

  clearCache() {
    this.modelCache.clear()
    this.textureCache.forEach((texture) => texture.dispose())
    this.textureCache.clear()
    Logger.log('Asset cache cleared')
  }

  dispose() {
    this.clearCache()
  }
}
