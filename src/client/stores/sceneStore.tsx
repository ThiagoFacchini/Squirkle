import React, { createContext, useState } from 'react'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
type SceneStoreType = {
  lastRecordedFPS: number,
  updateLastRecordedFPS: (number) => void,
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_LAST_RECORDED_FPS = 0
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const SceneStore = createContext<SceneStoreType>({
  lastRecordedFPS: DEFAULT_LAST_RECORDED_FPS,
  updateLastRecordedFPS: () => {}
})
// --------------------------------------------------------


export function SceneStoreProvider({ children }) {
  const [lastRecordedFPS, setLastRecordedFPS] = useState<number>(DEFAULT_LAST_RECORDED_FPS)
  
  const updateLastRecordedFPS = (fps) => setLastRecordedFPS(fps)

  return (
    <SceneStore.Provider
      value={
        {
          lastRecordedFPS,
          updateLastRecordedFPS
        }
      }
    >
      { children }
    </SceneStore.Provider>
  )
} 

export default SceneStore