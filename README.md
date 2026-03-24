# Open World Game - GTA V-Style Browser Game

A highly realistic, browser-based open-world 3D game inspired by Grand Theft Auto V, built with modern web technologies.

## 🎮 Features

### Core Gameplay
- **Explorable Open-World City** with multiple districts (downtown, suburbs, industrial)
- **Third-Person Camera** with smooth dynamic tracking
- **Day/Night Cycle** with dynamic lighting transitions
- **Weather System** (rain, fog, clear skies)

### Vehicle Mechanics
- **Car Stealing System** - Approach, interact, and steal vehicles
- **Realistic Driving Physics** - Arcade-semi-realistic hybrid
- **Vehicle Camera** - Third-person and cockpit views
- **Speed & RPM Display** - Real-time vehicle metrics

### World & Environment
- **Procedural City Generation** - Dynamically generated buildings and roads
- **Chunk-Based Streaming** - Efficient world loading/unloading
- **Ambient Life** - Foundation for NPCs and traffic (Phase 2)

### UI/UX
- **Modern Glass-Morphism Design** - Premium AAA-game feel
- **Interactive Mini-Map** - Real-time position tracking
- **Responsive HUD** - Health, speed, mission status
- **Main Menu** - Start, Settings, Map, Quit

## 🛠️ Tech Stack

- **Rendering**: [Three.js](https://threejs.org/) - WebGL 3D graphics
- **Physics**: [Cannon.js](https://www.cannon-ts.org/) - Realistic body dynamics
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **Build Optimization**: Code splitting, lazy loading, asset streaming

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (install from [nodejs.org](https://nodejs.org))

### Installation

```bash
cd game
npm install
```

### Development

```bash
npm run dev
```

Open your browser to `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 📂 Project Structure

```
src/
├── App.tsx                 # Main React component
├── main.tsx               # React entry point
├── index.css              # Global styles + Tailwind
├── game/
│   ├── Game.ts            # Main game controller
│   ├── scenes/
│   │   ├── GameScene.ts   # Three.js scene management
│   │   ├── CityGenerator.ts
│   │   └── SkySystem.ts
│   ├── entities/
│   │   ├── Player.ts      # Player avatar
│   │   ├── Vehicle.ts     # Car mechanics
│   │   ├── Camera.ts      # Camera system
│   │   └── World.ts       # Entity manager
│   ├── physics/
│   │   ├── CannonPhysics.ts
│   │   ├── VehiclePhysics.ts
│   │   └── Collisions.ts
│   ├── input/
│   │   ├── InputManager.ts
│   │   └── Controls.ts
│   ├── rendering/
│   │   ├── AssetLoader.ts
│   │   ├── MaterialFactory.ts
│   │   └── LightingSystem.ts
│   ├── utils/
│   │   ├── Logger.ts
│   │   ├── MathUtils.ts
│   │   └── PerformanceMonitor.ts
│   └── stores/
│       └── gameState.ts   # Zustand state
├── ui/
│   ├── HUD/
│   │   ├── HUD.tsx
│   │   ├── Minimap.tsx
│   │   └── Speedometer.tsx
│   ├── Menu/
│   │   ├── MenuScreen.tsx
│   │   ├── SettingsMenu.tsx
│   │   └── MapPreview.tsx
│   └── Components/
│       └── ui.tsx
└── types/
    └── index.ts          # TypeScript interfaces

public/
├── index.html
└── assets/
    ├── models/           # 3D models (GLTF/GLB)
    ├── textures/         # PBR textures
    └── audio/            # Sound effects
```

## 🎮 Controls

| Action | Key |
|--------|-----|
| Move Forward | W |
| Move Backward | S |
| Strafe Left | A |
| Strafe Right | D |
| Jump | Space |
| Interact | E |
| Sprint | Shift |
| Brake (Vehicle) | Ctrl |
| Handbrake (Vehicle) | X |
| Pause Menu | ESC |
| Debug Info | Ctrl+D |

## 📊 Performance

- **Target**: 60+ FPS at 1920x1080
- **Culling**: Frustum culling for visible objects
- **LOD System**: Multiple levels of detail for distant objects
- **Streaming**: Chunk-based asset streaming
- **Optimization**: Web Workers for physics calculations

## 🗺️ Roadmap

### Phase 1: Core (✅ In Progress)
- [x] Project setup
- [x] Three.js scene rendering
- [x] Player movement with physics
- [x] Third-person camera
- [ ] Basic city generation
- [ ] Vehicle system

### Phase 2: Gameplay
- [ ] AI NPCs with pathfinding
- [ ] Traffic system
- [ ] Mission system
- [ ] Police/Wanted level system
- [ ] Inventory system

### Phase 3: Polish
- [ ] Advanced rendering (shadows, reflections, bloom)
- [ ] Particle effects
- [ ] Audio system (engine sounds, radio, ambient)
- [ ] Visual effects (motion blur, depth of field)

### Phase 4: Content
- [ ] More detailed buildings and props
- [ ] City districts with unique characteristics
- [ ] Multiple vehicles
- [ ] Weather effects

### Phase 5: Advanced (Optional)
- [ ] Multiplayer (WebSockets)
- [ ] Mobile support
- [ ] Cloud save system
- [ ] Mod support

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 📱 Browser Support

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14.1+

## 🐛 Known Issues

- Mobile touch controls not yet implemented
- Some performance issues on lower-end hardware
- Weather effects placeholder implementation

## 🤝 Contributing

This is a personal project, but improvements are welcome!

## 📝 License

MIT

## 👨‍💻 Author

Created with Claude Code - Interactive AI Assistant

---

**Note**: This project is in active development. See the [implementation plan](/../plans/atomic-singing-toucan.md) for detailed architecture and phase breakdown.
