import * as CANNON from 'cannon-es'
import { Logger } from '@/game/utils/Logger'

export class CannonPhysics {
  private world: CANNON.World
  private bodies: Map<string, CANNON.Body> = new Map()
  private constraints: CANNON.Constraint[] = []

  constructor() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, -9.82, 0)
    this.world.tolerance = 0.001
    this.world.defaultContactMaterial.friction = 0.3
    this.world.defaultContactMaterial.restitution = 0.3

    Logger.log('Physics world initialized')
  }

  getWorld(): CANNON.World {
    return this.world
  }

  createSphere(
    radius: number,
    mass: number = 1,
    position: CANNON.Vec3 = new CANNON.Vec3(0, 0, 0),
    id: string = ''
  ): CANNON.Body {
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({ mass, shape })
    body.position = position
    this.world.addBody(body)

    if (id) this.bodies.set(id, body)
    return body
  }

  createBox(
    width: number,
    height: number,
    depth: number,
    mass: number = 1,
    position: CANNON.Vec3 = new CANNON.Vec3(0, 0, 0),
    id: string = ''
  ): CANNON.Body {
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    const body = new CANNON.Body({ mass, shape })
    body.position = position
    this.world.addBody(body)

    if (id) this.bodies.set(id, body)
    return body
  }

  createPlane(mass: number = 0, id: string = ''): CANNON.Body {
    const shape = new CANNON.Plane()
    const body = new CANNON.Body({ mass, shape })
    this.world.addBody(body)

    if (id) this.bodies.set(id, body)
    return body
  }

  createCylinder(radius: number, height: number, mass: number = 1, id: string = ''): CANNON.Body {
    const shape = new CANNON.Cylinder(radius, radius, height, 8)
    const body = new CANNON.Body({ mass, shape })
    this.world.addBody(body)

    if (id) this.bodies.set(id, body)
    return body
  }

  getBody(id: string): CANNON.Body | undefined {
    return this.bodies.get(id)
  }

  removeBody(id: string) {
    const body = this.bodies.get(id)
    if (body) {
      this.world.removeBody(body)
      this.bodies.delete(id)
    }
  }

  addConstraint(constraint: CANNON.Constraint) {
    this.world.addConstraint(constraint)
    this.constraints.push(constraint)
  }

  removeConstraint(constraint: CANNON.Constraint) {
    this.world.removeConstraint(constraint)
    const index = this.constraints.indexOf(constraint)
    if (index > -1) {
      this.constraints.splice(index, 1)
    }
  }

  raycast(
    from: CANNON.Vec3,
    to: CANNON.Vec3,
    options: CANNON.RaycastOptions = {}
  ): CANNON.RaycastResult {
    const result = new CANNON.RaycastResult()
    this.world.raycastClosest(from, to, options, result)
    return result
  }

  update(deltaTime: number) {
    this.world.step(1 / 60, deltaTime, 3) // Fixed timestep at 60Hz
  }

  setGravity(x: number, y: number, z: number) {
    this.world.gravity.set(x, y, z)
  }

  dispose() {
    // Clear all bodies and constraints
    this.bodies.clear()
    this.constraints = []
    // Note: Cannon.js doesn't have a built-in dispose, but we're preventing memory leaks
  }
}
