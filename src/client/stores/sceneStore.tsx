import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface SceneStoreType {
  lastRecordedFPS: number,
  updateLastRecordedFPS: (fps: number) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_LAST_RECORDED_FPS = 0
// --------------------------------------------------------

export const useSceneStore = create<SceneStoreType>()((set) => ({
  lastRecordedFPS: DEFAULT_LAST_RECORDED_FPS,
  updateLastRecordedFPS: (fps) => set((state) => ({ lastRecordedFPS: fps }))
}))

export default useSceneStore
