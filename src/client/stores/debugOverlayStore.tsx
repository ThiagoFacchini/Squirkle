import React, { createContext, useState } from 'react'

type DebugOverlayStoreType = {
    lastRecordedFPS: number
    updateFps: (number) => void,
    lastRecordedPing: number,
    updatePing: (number) => void
}

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_LAST_RECORDED_FPS = 0
const DEFAULT_LAST_RECORDED_PING = 0
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const DebugOverlayStore = createContext<DebugOverlayStoreType>({
    lastRecordedFPS: DEFAULT_LAST_RECORDED_FPS,
    updateFps: () => {},
    lastRecordedPing: DEFAULT_LAST_RECORDED_PING,
    updatePing: () => {}
})
// --------------------------------------------------------


export function DebugOverlayProvider({ children }) {
    const [lastRecordedFPS, setLastRecordedFPS] = useState<number>(DEFAULT_LAST_RECORDED_FPS)
    const [lastRecordedPing, setLastRecordedPing] = useState<number>(DEFAULT_LAST_RECORDED_PING)

    const updateFps = (fps) => setLastRecordedFPS(fps)
    const updatePing = (ping) => setLastRecordedPing(ping)

    return (
        <DebugOverlayStore.Provider
            value={
                {
                    lastRecordedFPS,
                    updateFps,
                    lastRecordedPing,
                    updatePing
                }
            }
        >
            { children }
        </DebugOverlayStore.Provider>
    )
}

export default DebugOverlayStore