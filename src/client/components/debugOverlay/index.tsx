import React, { useRef, useMemo, useEffect, useContext, ReactElement, Fragment, ReactNode } from 'react'

import RootStore from './../../stores/rootStore'
import DebugOverlayStore from './../../stores/debugOverlayStore'

import styles from './styles.module.css'

const DebugOverlay = () => {
    const { isDebugVisible, updateIsDebugVisible } = useContext(RootStore)
    const { lastRecordedFPS } = useContext(DebugOverlayStore)

    const shouldDisplayFPSWatcher = (): ReactNode => {
        if (isDebugVisible) {
            return (
                <div className={styles.fpsContainer}>
                    FPS: {lastRecordedFPS}
                    <div onClick={() => updateIsDebugVisible(!isDebugVisible) }> Toggle Debug </div>
                </div>
            )
        }

        return (<Fragment />)
    }

    return (
        <div className={ styles.container }>
            { shouldDisplayFPSWatcher() }
        </div>
    )
}

export default DebugOverlay