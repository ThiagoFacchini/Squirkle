import React, { useEffect, Fragment } from 'react'
import { SOCKET_EVENTS, AUTHENTICATOR_RERSPONSES } from './../../../server/src/definitions/enums'

import useSocketStore from '../../stores/socketStore'
import useConfigStore from '../../stores/configsStore'
import useMessagesStore from '../../stores/messageStore'
import useLoginStore from '../../stores/loginStore'
import useCameraStore from '../../stores/cameraStore'
import usePlayerStore from '../../stores/playerStore'

const Socket = () => {

  const socketComponent = useSocketStore((state) => state.socketComponent)
  const updateIsConnected = useSocketStore((state) => state.updateIsConnected)
  const updateTickCount = useSocketStore((state) => state.updateTickCount)
  const resetSocketComponent = useSocketStore((state) => state.resetSocketComponent)

  const updateTickInterval = useConfigStore((state) => state.updateTickInterval)

  const updateCameraOffsetY = useCameraStore((state) => state.updateCameraOffsetY)
  const updateCameraOffsetZ = useCameraStore((state) => state.updateCameraOffsetZ)

  const upodateWalkSpeed = usePlayerStore((state) => state.updateWalkSpeed)
  const upodateRunSpeed = usePlayerStore((state) => state.updateRunSpeed)
  const upodateRotateSpeed = usePlayerStore((state) => state.updateRotateSpeed)

  const addMessage = useMessagesStore((state) => state.addMessage)

  const updateIsAuthenticated = useLoginStore((state) => state.updateIsAuthenticated)


  useEffect(() => {
    socketComponent.on(SOCKET_EVENTS.CONNECT, () => {
      updateIsConnected(true)
    })    

    socketComponent.on(SOCKET_EVENTS.DISCONNECT, () => {
      updateIsConnected(false)
      resetSocketComponent()
    })

    socketComponent.on(SOCKET_EVENTS.TICK, (data) => {
      updateTickCount(data.message)
    })

    socketComponent.on(SOCKET_EVENTS.AUTHENTICATE, (data) => {
      if (data.status === AUTHENTICATOR_RERSPONSES.SUCCESS) {
        updateIsAuthenticated(true)
      } else {
        console.log('Authentication failed')
      }
    })
    
    socketComponent.on(SOCKET_EVENTS.COMMANDLINE, (data) => {
      addMessage(data)
    })

    socketComponent.on(SOCKET_EVENTS.SERVER_CONFIGS, (data) => {
      updateTickInterval(data.socket.tickInterval)
      updateCameraOffsetY(data.camera.cameraOffsetY)
      updateCameraOffsetZ(data.camera.cameraOffsetZ)
      upodateWalkSpeed(data.player.walkSpeed)
      upodateRunSpeed(data.player.runSpeed)
      upodateRotateSpeed(data.player.rotateSpeed)
    })


  }, [socketComponent])
  
  return <Fragment/>
}

export default Socket