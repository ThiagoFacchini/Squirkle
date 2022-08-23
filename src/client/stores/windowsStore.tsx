import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface WindowsStoreType {
  isDebugOverlayVisible: boolean,
  updateIsDebugOverlayVisible: (isVisible: boolean) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_DEBUG_OVERLAY_VISIBLE = false
// --------------------------------------------------------

export const useWindowsStore = create<WindowsStoreType>()((set) => ({
  isDebugOverlayVisible: DEFAULT_IS_DEBUG_OVERLAY_VISIBLE,
  updateIsDebugOverlayVisible: (isVisible) => set((state) => ({ isDebugOverlayVisible: isVisible }))
}))

export default useWindowsStore
