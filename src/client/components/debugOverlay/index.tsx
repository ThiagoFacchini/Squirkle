import React, { useEffect, useContext, Fragment, ReactNode, useCallback } from 'react'

import useWindowsStore from './../../stores/windowsStore'
import useSceneStore from './../../stores/sceneStore'
import useSocketStore from './../../stores/socketStore'

import styles from './styles.module.css'

const DebugOverlay = () => {
    const socketComponent = useSocketStore((state) => state.socketComponent)
    const lastRecordedPing = useSocketStore((state) => state.lastRecordedPing)
    const tickCount = useSocketStore((state) => state.tickCount)

    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)
    const updateIsDebugOverlayVisible = useWindowsStore((state) => state.updateIsDebugOverlayVisible)

    const lastRecordedFPS = useSceneStore((state) => state.lastRecordedFPS)

    useEffect(() => {
        document.removeEventListener('keydown', toggleDebug)
        document.addEventListener('keydown', toggleDebug)
        
        return () => {
            document.removeEventListener('keydown', toggleDebug)
        }
    }, [isDebugOverlayVisible])


    const toggleDebug = (evt: KeyboardEvent) => {
        if (evt.key === 'F3') updateIsDebugOverlayVisible(!isDebugOverlayVisible)        
    }


    const displayFPSWatcher = (): ReactNode => {
        return (
            <div className={styles.fpsContainer}>
                FPS: {lastRecordedFPS}
            </div>
        )
    }

    const displayPing = (): ReactNode => {
        return (
            <div className={styles.pingContainer}>
                PING: {lastRecordedPing}ms
            </div>
        )
    }

    const displaySocketId = (): ReactNode => {
        return (
            <div className={styles.socketIdContainer}>
                Socket Id: {socketComponent.id}
            </div>
        )
    }

    const displayTickCount = (): ReactNode => {
        return (
            <div className={styles.tickCountContainer}>
                Tick: { tickCount }
            </div>
        )
    }


    if (isDebugOverlayVisible) {
        return (
            <div className={ styles.container }>
                { displayFPSWatcher() }
                { displayPing() }
                { displaySocketId() }
                { displayTickCount() }
            </div>
        )
    }
    
    return (<Fragment />)
}

export default DebugOverlay