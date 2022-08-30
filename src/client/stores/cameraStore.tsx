import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface CameraStoreType {
  position: V3Type,
  direction: V3Type,
  controlsTarget: V3Type,
  updatePosition: (position: V3Type) => void,
  updateDirection: (direction: V3Type) => void
  updateControlsTarget: (position: V3Type) => void
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
const DEFAULT_CONTROLS_TARGET = { x:0, y:0, z:0 }
// --------------------------------------------------------

export const useCameraStore = create<CameraStoreType>((set) => ({
  position: DEFAULT_CAMERA_POSITION,
  direction: DEFAULT_CAMERA_DIRECTION,
  controlsTarget: DEFAULT_CONTROLS_TARGET,
  updatePosition: (position) => set((state) => ({ position: position })),
  updateDirection: (direction) => set((state) => ({ direction: direction })),
  updateControlsTarget: (position) => set((state) => ({ controlsTarget: position }))
}))

export default useCameraStore