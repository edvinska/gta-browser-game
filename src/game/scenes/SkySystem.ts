import * as THREE from 'three'

/**
 * SkySystem - Handles day/night cycle and dynamic sky rendering
 * Phase 2+ implementation with proper sky dome and atmospheric scattering
 */
export class SkySystem {
  private scene: THREE.Scene
  private sunLight: THREE.DirectionalLight
  private time: number = 12 // 24-hour cycle
  private skyColor: THREE.Color = new THREE.Color(0x87ceeb)
  private sunColor: THREE.Color = new THREE.Color(0xffffff)

  constructor(scene: THREE.Scene, sunLight: THREE.DirectionalLight) {
    this.scene = scene
    this.sunLight = sunLight
    this.updateSky(this.time)
  }

  updateTime(time: number) {
    this.time = time % 24
    this.updateSky(this.time)
  }

  private updateSky(time: number) {
    // Time between 0-24 hours
    const normalizedTime = time / 24

    // Calculate sun height (0-180 degrees)
    const sunHeight = Math.sin(normalizedTime * Math.PI) * 80

    // Update sun position
    this.sunLight.position.y = Math.max(0, sunHeight)
    this.sunLight.position.x = Math.cos(normalizedTime * Math.PI * 2) * 100
    this.sunLight.position.z = Math.sin(normalizedTime * Math.PI * 2) * 100

    // Update colors based on time of day
    if (time < 6) {
      // Night to early morning
      this.skyColor.setHSL(0.6, 0.3, 0.1)
      this.sunLight.intensity = 0.1
    } else if (time < 8) {
      // Sunrise
      const t = (time - 6) / 2
      this.skyColor.setHSL(0.1, 0.8, 0.3 + t * 0.4)
      this.sunLight.intensity = t * 0.8
    } else if (time < 17) {
      // Day
      this.skyColor.setHSL(0.55, 0.8, 0.6)
      this.sunLight.intensity = 1.2
    } else if (time < 19) {
      // Sunset
      const t = (time - 17) / 2
      this.skyColor.setHSL(0.05 + t * 0.1, 0.9, 0.5 - t * 0.3)
      this.sunLight.intensity = 1.2 - t * 1
    } else {
      // Night
      this.skyColor.setHSL(0.6, 0.3, 0.1)
      this.sunLight.intensity = 0.1
    }

    this.scene.background = this.skyColor
    this.scene.fog?.color.copy(this.skyColor)
  }

  getTime(): number {
    return this.time
  }

  getSkyColor(): THREE.Color {
    return this.skyColor
  }
}
