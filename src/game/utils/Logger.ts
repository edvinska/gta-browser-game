type LogLevel = 'log' | 'warn' | 'error' | 'debug'

export class Logger {
  private static isDev = true

  static log(...args: any[]) {
    if (this.isDev) console.log('[GAME]', ...args)
  }

  static warn(...args: any[]) {
    if (this.isDev) console.warn('[GAME]', ...args)
  }

  static error(...args: any[]) {
    if (this.isDev) console.error('[GAME]', ...args)
  }

  static debug(...args: any[]) {
    if (this.isDev) console.debug('[GAME]', ...args)
  }

  static performance(label: string, fn: () => void) {
    if (!this.isDev) {
      fn()
      return
    }
    performance.mark(`start-${label}`)
    fn()
    performance.mark(`end-${label}`)
    performance.measure(label, `start-${label}`, `end-${label}`)
    const measure = performance.getEntriesByName(label)[0]
    this.debug(`[PERF] ${label}: ${(measure as PerformanceMeasure).duration.toFixed(2)}ms`)
  }
}
