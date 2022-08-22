import React, { useEffect, useContext, Fragment } from 'react'

import WindowsStore from './../../stores/windowsStore'
import SocketStore from './../../stores/socketStore'

const PingWatcher = () => {

const { isDebugOverlayVisible } = useContext(WindowsStore)
const { socketComponent, updateLastRecordedPing } = useContext(SocketStore)

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