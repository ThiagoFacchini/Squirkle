import React, { useEffect, useContext, Fragment } from 'react'

import useSocketStore from '../../stores/socketStore'
import useConfigsStore from '../../stores/configsStore'

const Socket = () => {

  const socketComponent = useSocketStore((state) => state.socketComponent)
  const updateIsConnected = useSocketStore((state) => state.updateIsConnected)
  const updateTickCount = useSocketStore((state) => state.updateTickCount)
  
  const resetSocketComponent = useSocketStore((state) => state.resetSocketComponent)

  const updateTickInterval = useConfigsStore((state) => state.updateTickInterval)

  useEffect(() => {
    socketComponent.on('connect', () => {
      updateIsConnected(true)
    })    

    socketComponent.on('disconnect', () => {
      updateIsConnected(false)
      resetSocketComponent()
    })

    socketComponent.on('tick', (data) => {
      updateTickCount(data.message)
    })

    socketComponent.on('serverConfigs', (data) => {
      updateTickInterval(data.socket.tickInterval)
    })
  }, [socketComponent])
  
  return <Fragment/>
}

export default Socket