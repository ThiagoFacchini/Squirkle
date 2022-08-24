import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface PlayerStoreType {
  position: V3Type,
  updatePosition: (position: V3Type) => void,
  lookDirection: V3Type,
  updateLookDirection: (direction: V3Type) => void
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
const DEFAULT_PLAYER_POSITION = { x:0, y:0, z:0 }
const DEFAULT_PLAYER_LOOK_DIRECTION = { x:0, y:0, z:0 }
// --------------------------------------------------------

export const usePlayerStore = create<PlayerStoreType>()((set) => ({
  position: DEFAULT_PLAYER_POSITION,
  updatePosition: (position) => set((state) => ({ position: position })),
  lookDirection: DEFAULT_PLAYER_LOOK_DIRECTION,
  updateLookDirection: (direction) => set((state) => ({ lookDirection: direction }))
}))

export default usePlayerStore