import { create } from 'zustand'
import { GameState, PlayerState, VehicleState, GameInput, WorldState, UIState } from '@/types'

const initialPlayerState: PlayerState = {
  position: { x: 0, y: 2, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
  rotation: 0,
  grounded: false,
  inVehicle: false,
  health: 100,
}

const initialWorldState: WorldState = {
  time: 12, // Start at noon
  weather: 'clear',
  wind: 0,
  selectedChunk: null,
  loadedChunks: new Set(),
}

const initialUIState: UIState = {
  menuOpen: true,
  pauseMenuOpen: false,
  mapOpen: false,
  showDebug: false,
  settingsOpen: false,
  fpsVisible: true,
  interactionText: '',
}

const initialInputState: GameInput = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  interact: false,
  accelerate: false,
  brake: false,
  handbrake: false,
  mouseX: 0,
  mouseY: 0,
}

export const useGameStore = create<GameState & {
  setGameMode: (mode: GameState['gameMode']) => void
  setPlayerPosition: (pos: PlayerState['position']) => void
  setPlayerVelocity: (vel: PlayerState['velocity']) => void
  setPlayerHealth: (health: number) => void
  setVehicle: (vehicle: VehicleState | null) => void
  setInput: (input: Partial<GameInput>) => void
  setTime: (time: number) => void
  setWeather: (weather: WorldState['weather']) => void
  setMenuOpen: (open: boolean) => void
  setPauseMenuOpen: (open: boolean) => void
  setMapOpen: (open: boolean) => void
  reset: () => void
}>((set) => ({
  gameMode: 'menu',
  player: initialPlayerState,
  vehicle: null,
  input: initialInputState,
  world: initialWorldState,
  ui: initialUIState,

  setGameMode: (mode) =>
    set((state) => ({
      gameMode: mode,
    })),

  setPlayerPosition: (pos) =>
    set((state) => ({
      player: { ...state.player, position: pos },
    })),

  setPlayerVelocity: (vel) =>
    set((state) => ({
      player: { ...state.player, velocity: vel },
    })),

  setPlayerHealth: (health) =>
    set((state) => ({
      player: { ...state.player, health: Math.max(0, Math.min(100, health)) },
    })),

  setVehicle: (vehicle) =>
    set(() => ({
      vehicle,
    })),

  setInput: (input) =>
    set((state) => ({
      input: { ...state.input, ...input },
    })),

  setTime: (time) =>
    set((state) => ({
      world: { ...state.world, time: time % 24 },
    })),

  setWeather: (weather) =>
    set((state) => ({
      world: { ...state.world, weather },
    })),

  setMenuOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, menuOpen: open },
    })),

  setPauseMenuOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, pauseMenuOpen: open },
    })),

  setMapOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, mapOpen: open },
    })),

  reset: () =>
    set(() => ({
      gameMode: 'menu',
      player: initialPlayerState,
      vehicle: null,
      input: initialInputState,
      world: initialWorldState,
      ui: initialUIState,
    })),
}))
