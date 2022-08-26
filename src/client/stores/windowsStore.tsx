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
// Local Storage Definitions
// --------------------------------------------------------
const LS_STORE_KEY = 'windowsStore_'
const LS_IS_DEBUG_VISIBLE = 'isDebugVisible'
// --------------------------------------------------------


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_DEBUG_OVERLAY_VISIBLE = localStorage.getItem(`${LS_STORE_KEY}${LS_IS_DEBUG_VISIBLE}`) === 'true' || false
// --------------------------------------------------------

export const useWindowsStore = create<WindowsStoreType>()((set) => ({
  isDebugOverlayVisible: DEFAULT_IS_DEBUG_OVERLAY_VISIBLE,
  updateIsDebugOverlayVisible: (isVisible) => {
    localStorage.setItem(`${LS_STORE_KEY}${LS_IS_DEBUG_VISIBLE}`, isVisible)
    set((state) => ({ isDebugOverlayVisible: isVisible }))
  }
}))

export default useWindowsStore
