import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Entity } from '@/types'
import { CannonPhysics } from '@/game/physics/CannonPhysics'
import { MathUtils } from '@/game/utils/MathUtils'

export class Vehicle implements Entity {
  id: string
  mesh: THREE.Group
  body: CANNON.Body
  velocity: CANNON.Vec3
  position = { x: 0, y: 0, z: 0 }
  rotation = { x: 0, y: 0, z: 0 }

  private speed: number = 0
  private rpm: number = 0
  private gear: number = 0 // 0: park, 1: reverse, 2: forward
  private fuel: number = 100
  private steeringValue: number = 0
  private engineForce: number = 0

  constructor(physics: CannonPhysics, position: CANNON.Vec3 = new CANNON.Vec3(10, 1, 0), id: string = 'vehicle') {
    this.id = id

    // Create visual representation
    const group = new THREE.Group()

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(1.8, 1.2, 4)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.5,
      metalness: 0.6,
    })
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    bodyMesh.position.y = 0.6
    bodyMesh.castShadow = true
    bodyMesh.receiveShadow = true
    group.add(bodyMesh)

    // Cabin/windows
    const cabinGeometry = new THREE.BoxGeometry(1.6, 0.8, 1.8)
    const cabinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6,
    })
    const cabinMesh = new THREE.Mesh(cabinGeometry, cabinMaterial)
    cabinMesh.position.y = 1.3
    cabinMesh.position.z = -0.2
    cabinMesh.castShadow = true
    group.add(cabinMesh)

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16)
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.7,
    })

    const wheelPositions = [
      [-0.8, 0.4, 0.8],
      [0.8, 0.4, 0.8],
      [-0.8, 0.4, -0.8],
      [0.8, 0.4, -0.8],
    ]

    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(x, y, z)
      wheel.castShadow = true
      group.add(wheel)
    })

    group.position.copy(MathUtils.canonToVector(position))
    this.mesh = group

    // Physics body
    const shape = new CANNON.Box(new CANNON.Vec3(0.9, 0.6, 2))
    this.body = new CANNON.Body({
      mass: 1500, // kg
      shape,
      linearDamping: 0.3,
      angularDamping: 0.5,
    })
    this.body.position = position
    physics.getWorld().addBody(this.body)

    this.velocity = this.body.velocity
    this.gear = 0 // Start in park
  }

  update(deltaTime: number, input: any = {}) {
    // Update position from physics
    this.position = MathUtils.canonToVector(this.body.position)
    this.mesh.position.copy(this.body.position as any)
    this.mesh.quaternion.copy(this.body.quaternion as any)

    // Handle input
    if (input.accelerate) {
      this.gear = 2 // Drive forward
      this.rpm = Math.min(7000, this.rpm + 1000)
      this.engineForce = 30000 * Math.sin(this.rpm / 7000)
    } else if (input.brake) {
      this.engineForce *= 0.9
      this.rpm = Math.max(0, this.rpm - 500)
    } else {
      this.engineForce *= 0.95
      this.rpm = Math.max(0, this.rpm - 200)
    }

    // Apply engine force
    if (this.gear === 2) {
      this.body.velocity.x += Math.sin(this.body.quaternion.z * 2) * this.engineForce * deltaTime * 0.001
      this.body.velocity.z += Math.cos(this.body.quaternion.z * 2) * this.engineForce * deltaTime * 0.001
    }

    // Steering
    if (input.left) this.steeringValue = -0.3
    else if (input.right) this.steeringValue = 0.3
    else this.steeringValue *= 0.9

    // Apply steering
    const yawForce = this.steeringValue * 0.1
    this.body.angularVelocity.y = yawForce

    // Fuel consumption
    if (this.gear === 2) {
      this.fuel = Math.max(0, this.fuel - deltaTime * 0.02)
    }

    // Speed calculation
    this.speed = Math.sqrt(
      this.body.velocity.x ** 2 + this.body.velocity.z ** 2
    ) * 3.6 // Convert to km/h
  }

  getSpeed(): number {
    return this.speed
  }

  getRPM(): number {
    return Math.round(this.rpm)
  }

  getFuel(): number {
    return this.fuel
  }

  destroy() {
    // Physics body handled by physics world
  }
}
