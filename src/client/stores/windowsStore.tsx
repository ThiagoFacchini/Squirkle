import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface WindowsStoreType {
  isDebugOverlayVisible: boolean,
  isCommandLineActive: boolean,
  updateIsDebugOverlayVisible: (isVisible: boolean) => void
  updateIsCommandLineActive: (isActive: boolean) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Local Storage Definitions
// --------------------------------------------------------
const LS_STORE_KEY = 'windowsStore_'
const LS_IS_DEBUG_VISIBLE = 'isDebugVisible'
// --------------------------------------------------------


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_DEBUG_OVERLAY_VISIBLE = localStorage.getItem(`${LS_STORE_KEY}${LS_IS_DEBUG_VISIBLE}`) === 'true' || false
const DEFAULT_IS_COMMAND_LINE_ACTIVE = false
// --------------------------------------------------------

export const useWindowsStore = create<WindowsStoreType>((set) => ({
  isDebugOverlayVisible: DEFAULT_IS_DEBUG_OVERLAY_VISIBLE,
  isCommandLineActive: DEFAULT_IS_COMMAND_LINE_ACTIVE,
  updateIsDebugOverlayVisible: (isVisible) => {
    localStorage.setItem(`${LS_STORE_KEY}${LS_IS_DEBUG_VISIBLE}`, isVisible.toString())
    set((state) => ({ isDebugOverlayVisible: isVisible }))
  },
  updateIsCommandLineActive: (isActive) => set((state) => ({ isCommandLineActive: isActive }))
}))

export default useWindowsStore
