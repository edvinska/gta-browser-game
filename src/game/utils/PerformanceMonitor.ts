export class PerformanceMonitor {
  private fps: number = 0
  private frameCount: number = 0
  private lastTime: number = performance.now()
  private frameTimeHistory: number[] = []
  private maxHistoryLength: number = 60

  update(): number {
    const now = performance.now()
    const deltaTime = now - this.lastTime
    this.lastTime = now

    this.frameCount++
    this.frameTimeHistory.push(deltaTime)

    if (this.frameTimeHistory.length > this.maxHistoryLength) {
      this.frameTimeHistory.shift()
    }

    // Calculate FPS every second
    if (this.frameCount % 60 === 0) {
      this.fps = Math.round(1000 / (deltaTime || 1))
    }

    return deltaTime / 1000 // Return delta in seconds
  }

  getFPS(): number {
    return this.fps
  }

  getAverageFrameTime(): number {
    if (this.frameTimeHistory.length === 0) return 0
    const sum = this.frameTimeHistory.reduce((a, b) => a + b, 0)
    return sum / this.frameTimeHistory.length
  }

  getMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: memory.usedJSHeapSize / 1048576, // MB
        total: memory.totalJSHeapSize / 1048576, // MB
        limit: memory.jsHeapSizeLimit / 1048576, // MB
      }
    }
    return null
  }

  getStats() {
    return {
      fps: this.fps,
      averageFrameTime: this.getAverageFrameTime().toFixed(2),
      memory: this.getMemoryUsage(),
    }
  }
}
