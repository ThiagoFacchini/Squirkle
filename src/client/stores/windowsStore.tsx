import React, { createContext, useState } from 'react'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
type WindowsStoreType = {
  isDebugOverlayVisible: boolean,
  updateIsDebugOverlayVisible: (boolean) => void,
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_DEBUG_OVERLAY_VISIBLE = false
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const WindowsStore = createContext<WindowsStoreType>({
  isDebugOverlayVisible: DEFAULT_IS_DEBUG_OVERLAY_VISIBLE,
  updateIsDebugOverlayVisible: () => {}
})
// --------------------------------------------------------


export function WindowsStoreProvider({ children }) {
  const [isDebugOverlayVisible, setIsDebugOverlayVisible] = useState<boolean>(DEFAULT_IS_DEBUG_OVERLAY_VISIBLE)
  
  const updateIsDebugOverlayVisible = (val) => setIsDebugOverlayVisible(val)

  
  return (
    <WindowsStore.Provider
      value={
        {
          isDebugOverlayVisible,
          updateIsDebugOverlayVisible
        }
      }
    >
      { children }
    </WindowsStore.Provider>
  )
} 

export default WindowsStore