import React, { useEffect, useContext, Fragment, ReactNode, useCallback } from 'react'

import useWindowsStore from './../../stores/windowsStore'
import useSceneStore from './../../stores/sceneStore'
import useSocketStore from './../../stores/socketStore'
import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'

import styles from './styles.module.css'

const DebugOverlay = () => {
    const socketComponent = useSocketStore((state) => state.socketComponent)
    const lastRecordedPing = useSocketStore((state) => state.lastRecordedPing)
    const tickCount = useSocketStore((state) => state.tickCount)

    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)
    const updateIsDebugOverlayVisible = useWindowsStore((state) => state.updateIsDebugOverlayVisible)

    const lastRecordedFPS = useSceneStore((state) => state.lastRecordedFPS)

    const playerPosition = usePlayerStore((state) => state.position)
    const playerRotation = usePlayerStore((state) => state.rotation)

    const cameraDirection = useCameraStore((state) => state.direction)
    const cameraPosition = useCameraStore((state) => state.position)

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
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    FPS: 
                </div>
                <div className={styles.content}>
                    {lastRecordedFPS}
                </div>
            </div>
        )
    }


    const displayPing = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Ping:
                </div>
                <div className={styles.content}>
                    {lastRecordedPing}ms
                </div>
            </div>
        )
    }


    const displaySocketId = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Socket Id: 
                </div>
                <div className={styles.content}>
                    {socketComponent.id}
                </div>
            </div>
        )
    }


    const displayTickCount = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    TickCount:
                </div>
                <div className={styles.content}>
                    { tickCount }
                </div>
            </div>
        )
    }


    const displayTime = (): ReactNode => {
        const hours: number = Math.floor(tickCount / 60)
        const minutes = tickCount % 60
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Time
                </div>
                <div className={styles.content}>
                    {hours < 10 ? `0${hours}` : hours}:{ minutes < 10 ? `0${minutes}` : minutes}
                </div>
            </div>
        )
    }


    const displayPlayerPosition = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Player Position:
                </div>
                <div className={styles.content}>
                    {`
                        ${playerPosition.x.toFixed(4)},
                        ${playerPosition.y.toFixed(4)},
                        ${playerPosition.z.toFixed(4)}
                    `}
                </div>
            </div>
        )
    }


    const displayPlayerRotation = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Player Rotation:
                </div>
                <div className={styles.content}>
                    {`
                        ${playerRotation.x.toFixed(4)},
                        ${playerRotation.y.toFixed(4)},
                        ${playerRotation.z.toFixed(4)}
                    `}
                </div>
            </div>
        )
    }


    const displayCameraDirection = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Cam Direction:
                </div>
                <div className={styles.content}>
                    {`${cameraDirection.x.toFixed(2)}, ${cameraDirection.y.toFixed(2)}, ${cameraDirection.z.toFixed(2)}`}
                </div>
            </div>
        )
    }

    const displayCameraPosition = (): ReactNode => {
        return (
            <div className={styles.sectionContainer}>
                <div className={styles.label}>
                    Cam Position:
                </div>
                <div className={styles.content}>
                    {`${cameraPosition.x.toFixed(2)}, ${cameraPosition.y.toFixed(2)}, ${cameraPosition.z.toFixed(2)}`}
                </div>
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
                { displayTime() }
                { displayPlayerPosition() }
                { displayPlayerRotation() }
                { displayCameraDirection() }
                { displayCameraPosition() }
            </div>
        )
    }
    
    return (<Fragment />)
}

export default DebugOverlay