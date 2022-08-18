import React, { createContext, useState } from 'react'

type DebugOverlayStoreType = {
    lastRecordedFPS: number
    updateFps: (number) => void
}

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_LAST_RECORDED_FPS = 0
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const DebugOverlayStore = createContext<DebugOverlayStoreType>({
    lastRecordedFPS: DEFAULT_LAST_RECORDED_FPS,
    updateFps: () => {}
})
// --------------------------------------------------------


export function DebugOverlayProvider({ children }) {
    const [lastRecordedFPS, setLastRecordedFPS] = useState<number>(DEFAULT_LAST_RECORDED_FPS)

    const updateFps = (fps) => setLastRecordedFPS(fps)

    return (
        <DebugOverlayStore.Provider
            value={
                {
                    lastRecordedFPS,
                    updateFps
                }
            }
        >
            { children }
        </DebugOverlayStore.Provider>
    )
}

export default DebugOverlayStore