import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Entity, GameInput } from '@/types'
import { CannonPhysics } from '@/game/physics/CannonPhysics'
import { MathUtils } from '@/game/utils/MathUtils'

export class Player implements Entity {
  id: string = 'player'
  mesh: THREE.Group
  body: CANNON.Body
  velocity: CANNON.Vec3
  position = { x: 0, y: 0, z: 0 }
  rotation = { x: 0, y: 0, z: 0 }

  private moveSpeed: number = 10
  private jumpForce: number = 100
  private isGrounded: boolean = false
  private canJump: boolean = true
  private groundContact: boolean = false

  constructor(physics: CannonPhysics, position: CANNON.Vec3 = new CANNON.Vec3(0, 2, 0)) {
    // Create visual representation (capsule-like)
    const group = new THREE.Group()

    const bodyGeometry = new THREE.CapsuleGeometry(0.6, 1.5, 4, 8)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      roughness: 0.5,
      metalness: 0.2,
    })
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial)
    bodyMesh.castShadow = true
    bodyMesh.receiveShadow = true
    group.add(bodyMesh)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32)
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8b4a1,
      roughness: 0.6,
    })
    const headMesh = new THREE.Mesh(headGeometry, headMaterial)
    headMesh.position.y = 1.2
    headMesh.castShadow = true
    headMesh.receiveShadow = true
    group.add(headMesh)

    group.position.copy(MathUtils.canonToVector(position))
    this.mesh = group

    // Physics body - capsule shape approximated with sphere and box
    const shape = new CANNON.Sphere(0.5)
    this.body = new CANNON.Body({
      mass: 80, // kg
      shape,
      linearDamping: 0.3,
      angularDamping: 0.5,
    })
    this.body.position = position
    physics.getWorld().addBody(this.body)

    this.velocity = this.body.velocity

    // Disable rotation to keep player upright
    this.body.quaternion.setFromEuler(0, 0, 0)
    this.body.angularVelocity.set(0, 0, 0)
  }

  update(deltaTime: number, input: GameInput, physics: CannonPhysics) {
    // Update position from physics
    this.position = MathUtils.canonToVector(this.body.position)
    this.mesh.position.copy(this.body.position as any)

    // Calculate movement direction
    const moveDirection = new CANNON.Vec3(0, 0, 0)
    if (input.forward) moveDirection.z -= 1
    if (input.backward) moveDirection.z += 1
    if (input.left) moveDirection.x -= 1
    if (input.right) moveDirection.x += 1

    // Normalize direction
    const length = Math.sqrt(
      moveDirection.x * moveDirection.x + moveDirection.z * moveDirection.z
    )
    if (length > 0) {
      moveDirection.x /= length
      moveDirection.z /= length
    }

    // Apply movement force (horizontal only)
    const moveForce = this.moveSpeed * 1000
    this.body.velocity.x = moveDirection.x * this.moveSpeed
    this.body.velocity.z = moveDirection.z * this.moveSpeed

    // Keep vertical velocity
    const yVelocity = this.body.velocity.y

    // Check if grounded using raycasts
    this.checkGrounded(physics)

    // Jump
    if (input.jump && this.isGrounded && this.canJump) {
      this.body.velocity.y = 0
      this.body.applyForce(
        new CANNON.Vec3(0, this.jumpForce, 0),
        this.body.position
      )
      this.canJump = false
    } else if (!input.jump) {
      this.canJump = true
    }

    // Prevent rotation
    this.body.quaternion.setFromEuler(0, 0, 0)
    this.body.angularVelocity.set(0, 0, 0)

    // Respect original Y velocity
    if (this.isGrounded) {
      this.body.velocity.y = Math.max(this.body.velocity.y, 0)
    }
  }

  private checkGrounded(physics: CannonPhysics) {
    const rayOrigin = this.body.position.clone()
    rayOrigin.y -= 0.5
    const rayDirection = new CANNON.Vec3(0, -1, 0)
    const raycastResult = physics.raycast(
      rayOrigin,
      rayOrigin.vadd(rayDirection.scale(2))
    )
    this.isGrounded = raycastResult.hasHit && raycastResult.distance < 1
  }

  getIsGrounded(): boolean {
    return this.isGrounded
  }

  destroy() {
    // Physics body is handled by physics world
  }
}
