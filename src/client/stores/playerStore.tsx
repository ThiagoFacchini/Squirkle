import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface PlayerStoreType {
  position: V3Type,
  updatePosition: (position: V3Type) => void,
  rotation: V3Type,
  updateRotation: (position: V3Type) => void
}


type V3Type = {
  x: number,
  y: number,
  z: number
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_PLAYER_POSITION = { x: 0, y: 1, z: 0 }
const DEFAULT_PLAYER_ROTATION = { x: 0, y: 0, z: 0 }
// --------------------------------------------------------

export const usePlayerStore = create<PlayerStoreType>((set) => ({
  position: DEFAULT_PLAYER_POSITION,
  rotation: DEFAULT_PLAYER_ROTATION,
  updatePosition: (position) => set((state) => ({ position: position })),
  updateRotation: (rotation) => set((state) => ({ rotation: rotation }))
}))

export default usePlayerStore



