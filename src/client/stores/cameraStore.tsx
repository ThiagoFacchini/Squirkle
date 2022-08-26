import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface CameraStoreType {
  position: V3Type,
  updatePosition: (position: V3Type) => void,
  direction: V3Type,
  updateDirection: (direction: V3Type) => void
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
const DEFAULT_CAMERA_POSITION = { x:0, y:0, z:0 }
const DEFAULT_CAMERA_DIRECTION = { x:0, y:1, z:0 }
// --------------------------------------------------------

export const useCameraStore = create<CameraStoreType>()((set) => ({
  position: DEFAULT_CAMERA_POSITION,
  updatePosition: (position) => set((state) => ({ position: position })),
  direction: DEFAULT_CAMERA_DIRECTION,
  updateDirection: (direction) => set((state) => ({ direction: direction }))
}))

export default useCameraStore