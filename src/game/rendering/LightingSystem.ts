import * as THREE from 'three'

/**
 * LightingSystem - Manages scene lighting setup
 */
export class LightingSystem {
  private scene: THREE.Scene
  private ambientLight: THREE.AmbientLight
  private directionalLight: THREE.DirectionalLight
  private hemispherLight: THREE.HemisphereLight

  constructor(scene: THREE.Scene) {
    this.scene = scene

    // Ambient light - general scene illumination
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(this.ambientLight)

    // Directional light (sun)
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    this.directionalLight.position.set(100, 100, 50)
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.mapSize.width = 4096
    this.directionalLight.shadow.mapSize.height = 4096
    this.directionalLight.shadow.camera.left = -500
    this.directionalLight.shadow.camera.right = 500
    this.directionalLight.shadow.camera.top = 500
    this.directionalLight.shadow.camera.bottom = -500
    this.directionalLight.shadow.camera.near = 0.5
    this.directionalLight.shadow.camera.far = 500
    this.directionalLight.shadow.bias = -0.0001
    this.scene.add(this.directionalLight)

    // Hemisphere light - natural sky lighting
    this.hemispherLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.3)
    this.scene.add(this.hemispherLight)
  }

  getDirectionalLight(): THREE.DirectionalLight {
    return this.directionalLight
  }

  setIntensity(intensity: number) {
    this.directionalLight.intensity = intensity
    this.ambientLight.intensity = intensity * 0.4
  }

  dispose() {
    this.ambientLight.dispose()
    this.directionalLight.dispose()
    this.hemispherLight.dispose()
  }
}
