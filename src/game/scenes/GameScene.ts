import * as THREE from 'three'
import { Logger } from '@/game/utils/Logger'

export class GameScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private canvas: HTMLCanvasElement
  private width: number = window.innerWidth
  private height: number = window.innerHeight
  private pixelRatio: number = Math.min(window.devicePixelRatio, 2)

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    Logger.log('Initializing GameScene')

    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x1a1a2e)
    this.scene.fog = new THREE.Fog(0x1a1a2e, 500, 2000)

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 5000)
    this.camera.position.set(0, 50, 100)
    this.camera.lookAt(0, 0, 0)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(this.pixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0

    // Lighting
    this.setupLighting()

    // Ground for testing
    this.createTestEnvironment()

    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize())

    Logger.log('GameScene initialized successfully')
  }

  private setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)

    // Directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2)
    sunLight.position.set(100, 100, 50)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 4096
    sunLight.shadow.mapSize.height = 4096
    sunLight.shadow.camera.left = -500
    sunLight.shadow.camera.right = 500
    sunLight.shadow.camera.top = 500
    sunLight.shadow.camera.bottom = -500
    sunLight.shadow.camera.near = 0.5
    sunLight.shadow.camera.far = 500
    this.scene.add(sunLight)

    // Helper for debugging (optional)
    // const helper = new THREE.DirectionalLightHelper(sunLight, 100)
    // this.scene.add(helper)
  }

  private createTestEnvironment() {
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      roughness: 0.8,
      metalness: 0.1,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.scene.add(ground)

    // Test cube
    const cubeGeometry = new THREE.BoxGeometry(20, 20, 20)
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b6b,
      roughness: 0.5,
      metalness: 0.3,
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(0, 10, -50)
    cube.castShadow = true
    cube.receiveShadow = true
    this.scene.add(cube)

    // Test sphere
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x4ecdc4,
      roughness: 0.3,
      metalness: 0.7,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(60, 15, 0)
    sphere.castShadow = true
    sphere.receiveShadow = true
    this.scene.add(sphere)
  }

  getScene(): THREE.Scene {
    return this.scene
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  getRenderer(): THREE.WebGLRenderer {
    return this.renderer
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  private onWindowResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.width, this.height)
  }

  dispose() {
    window.removeEventListener('resize', () => this.onWindowResize())
    this.renderer.dispose()
  }
}
