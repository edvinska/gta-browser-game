import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Vector3 } from '@/types'

export class MathUtils {
  static vectorToThree(v: Vector3): THREE.Vector3 {
    return new THREE.Vector3(v.x, v.y, v.z)
  }

  static vectorToCanon(v: Vector3): CANNON.Vec3 {
    return new CANNON.Vec3(v.x, v.y, v.z)
  }

  static canonToVector(v: CANNON.Vec3): Vector3 {
    return { x: v.x, y: v.y, z: v.z }
  }

  static threeToVector(v: THREE.Vector3): Vector3 {
    return { x: v.x, y: v.y, z: v.z }
  }

  static distance(a: Vector3, b: Vector3): number {
    const dx = a.x - b.x
    const dy = a.y - b.y
    const dz = a.z - b.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  static distanceXZ(a: Vector3, b: Vector3): number {
    const dx = a.x - b.x
    const dz = a.z - b.z
    return Math.sqrt(dx * dx + dz * dz)
  }

  static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * Math.max(0, Math.min(1, t))
  }

  static lerpVector(a: Vector3, b: Vector3, t: number): Vector3 {
    t = Math.max(0, Math.min(1, t))
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      z: a.z + (b.z - a.z) * t,
    }
  }

  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
  }

  static degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  static radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI)
  }

  static randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static smoothstep(x: number): number {
    return x * x * (3 - 2 * x)
  }
}
