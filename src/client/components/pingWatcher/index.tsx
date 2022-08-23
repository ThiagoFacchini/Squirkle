import React, { useEffect, useContext, Fragment } from 'react'

import useWindowsStore from './../../stores/windowsStore'
import useSocketStore from './../../stores/socketStore'

const PingWatcher = () => {
    const socketComponent = useSocketStore((state) => state.socketComponent)
    const updateLastRecordedPing = useSocketStore((state) => state.updateLastRecordedPing)

    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    useEffect(() => {
        if (isDebugOverlayVisible) {
            let lastTime = Date.now()
            socketComponent.emit('ping', {})

            socketComponent.on('pong', () => {
                let currTime = Date.now()
                const latency = currTime - lastTime

                updateLastRecordedPing(latency)

                setTimeout(() => {
                    lastTime = Date.now()
                    socketComponent.emit('ping', {})
                }, 1000)
            })
        } else {
            socketComponent.off('pong')
        }
    }, [socketComponent, isDebugOverlayVisible])

  return <Fragment/>
}

export default PingWatcher