import React, { useEffect, useContext, Fragment, ReactNode, useCallback } from 'react'

import RootStore from './../../stores/rootStore'
import DebugOverlayStore from './../../stores/debugOverlayStore'

import styles from './styles.module.css'
import { Socket } from 'socket.io-client'

const DebugOverlay = () => {
    const { isDebugVisible, updateIsDebugVisible, socketComponent } = useContext(RootStore)
    const { lastRecordedFPS, lastRecordedPing, updatePing } = useContext(DebugOverlayStore)

    useEffect(() => {
        if (isDebugVisible) {
            let lastTime = Date.now()
            socketComponent.emit('ping', {})

            socketComponent.on('pong', () => {
                let currTime = Date.now()
                const latency = currTime - lastTime

                updatePing(latency)

                setTimeout(() => {
                    lastTime = Date.now()
                    socketComponent.emit('ping', {})
                }, 1000)
            })
        } else {
            socketComponent.off('pong')
        }
    }, [socketComponent, isDebugVisible])


    const displayFPSWatcher = (): ReactNode => {
        return (
            <div className={styles.fpsContainer}>
                FPS: {lastRecordedFPS}
                <div onClick={() => updateIsDebugVisible(!isDebugVisible) }> Toggle Debug </div>
            </div>
        )
    }

    const displayPing = (): ReactNode => {
        return (
            <div className={styles.pingContainer}>
                PING: {lastRecordedPing}
            </div>
        )
    }


    if (isDebugVisible) {
        return (
            <div className={ styles.container }>
                { displayFPSWatcher() }
                { displayPing() }
            </div>
        )
    }
    
    return (<Fragment />)
}

export default DebugOverlay