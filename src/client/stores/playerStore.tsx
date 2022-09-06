import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface PlayerStoreType {
  position: V3Type,
  rotation: V3Type,
  walkSpeed: number,
  runSpeed: number,
  rotateSpeed: number,
  isMoving: boolean,
  updatePosition: (position: V3Type) => void,
  updateRotation: (position: V3Type) => void,
  updateWalkSpeed: (walkSpeed: number) => void,
  updateRunSpeed: (runSpeed: number) => void,
  updateRotateSpeed: (rotationSpeed: number) => void,
  updateIsMoving: (isMoving: boolean) => void
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
const DEFAULT_WALK_SPEED = -1
const DEFAULT_RUN_SPEED = -1
const DEFAULT_ROTATE_SPEED = -1
const DEFAULT_IS_MOVING = false
// --------------------------------------------------------

export const usePlayerStore = create<PlayerStoreType>((set) => ({
  position: DEFAULT_PLAYER_POSITION,
  rotation: DEFAULT_PLAYER_ROTATION,
  walkSpeed: DEFAULT_WALK_SPEED,
  runSpeed: DEFAULT_RUN_SPEED,
  rotateSpeed: DEFAULT_ROTATE_SPEED,
  isMoving: DEFAULT_IS_MOVING,
  updatePosition: (position) => set((state) => ({ position: position })),
  updateRotation: (rotation) => set((state) => ({ rotation: rotation })),
  updateWalkSpeed: (walkSpeed) => set((state) => ({ walkSpeed: walkSpeed })),
  updateRunSpeed: (runSpeed) => set((state) => ({ runSpeed: runSpeed })),
  updateRotateSpeed: (rotateSpeed) => set((state) => ({ rotateSpeed: rotateSpeed })),
  updateIsMoving: (isMoving) => set((state) => ({ isMoving: isMoving }))
}))

export default usePlayerStore



