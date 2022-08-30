import React, { useEffect, useContext, Fragment } from 'react'
import { COMMANDS_RESPONSES } from '../../../server/src/definitions/enums'

import useSocketStore from '../../stores/socketStore'
import useConfigsStore from '../../stores/configsStore'
import useMessagesStore from '../../stores/messageStore'

const Socket = () => {

  const socketComponent = useSocketStore((state) => state.socketComponent)
  const updateIsConnected = useSocketStore((state) => state.updateIsConnected)
  const updateTickCount = useSocketStore((state) => state.updateTickCount)
  
  const resetSocketComponent = useSocketStore((state) => state.resetSocketComponent)

  const updateTickInterval = useConfigsStore((state) => state.updateTickInterval)

  const addMessage = useMessagesStore((state) => state.addMessage)


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
    
    socketComponent.on('commandLine', (data) => {
      addMessage(data)
    })
  }, [socketComponent])
  
  return <Fragment/>
}

export default Socket