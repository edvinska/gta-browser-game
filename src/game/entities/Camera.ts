import * as THREE from 'three'
import { MathUtils } from '@/game/utils/MathUtils'
import { Vector3 } from '@/types'

export class ThirdPersonCamera {
  private camera: THREE.PerspectiveCamera
  private targetOffset: Vector3 = { x: 0, y: 2, z: 5 }
  private currentOffset: Vector3 = { x: 0, y: 2, z: 5 }
  private targetHeight: number = 2
  private currentHeight: number = 2
  private distance: number = 8
  private height: number = 2
  private smoothness: number = 0.1
  private raycaster: THREE.Raycaster

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera
    this.raycaster = new THREE.Raycaster()
  }

  update(targetPosition: Vector3, targetMesh: THREE.Object3D, scene: THREE.Scene) {
    // Calculate desired camera position
    const forwardVector = new THREE.Vector3(0, 0, 1)
    forwardVector.applyQuaternion(targetMesh.quaternion)

    const desiredPosition = new THREE.Vector3(
      targetPosition.x - forwardVector.x * this.distance,
      targetPosition.y + this.height,
      targetPosition.z - forwardVector.z * this.distance
    )

    // Smooth camera movement
    const currentCameraPos = this.camera.position
    currentCameraPos.lerp(desiredPosition, this.smoothness)

    // Look at target with slight offset
    const lookAtPoint = new THREE.Vector3(
      targetPosition.x,
      targetPosition.y + 0.5,
      targetPosition.z
    )

    // Smooth look-at
    this.camera.lookAt(lookAtPoint)

    // Check for camera collision with environment
    this.checkCameraCollision(currentCameraPos, lookAtPoint, scene)
  }

  private checkCameraCollision(cameraPos: THREE.Vector3, lookAtPoint: THREE.Vector3, scene: THREE.Scene) {
    const direction = lookAtPoint.clone().sub(cameraPos).normalize()
    const distance = cameraPos.distanceTo(lookAtPoint)

    this.raycaster.set(lookAtPoint, direction.negate())

    // Cast ray to check for obstacles
    const intersects = this.raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].distance < distance) {
      // Move camera closer if there's an obstacle
      const targetDist = Math.max(intersects[0].distance - 0.5, 2)
      const newPos = lookAtPoint.clone().add(direction.multiplyScalar(targetDist))
      this.camera.position.copy(newPos)
    }
  }

  setDistance(distance: number) {
    this.distance = MathUtils.clamp(distance, 2, 15)
  }

  setHeight(height: number) {
    this.height = MathUtils.clamp(height, 0, 5)
  }

  setSmoothness(smoothness: number) {
    this.smoothness = MathUtils.clamp(smoothness, 0, 1)
  }

  zoom(amount: number) {
    this.distance = MathUtils.clamp(this.distance + amount, 2, 15)
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }
}
