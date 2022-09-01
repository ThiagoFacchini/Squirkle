import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames';

import useSocketStore from './../../stores/socketStore'
import useLoginStore from '../../stores/loginStore';
import useConfigStore from '../../stores/configsStore'
import useCameraStore from '../../stores/cameraStore'
import usePlayerStore from '../../stores/playerStore'

import styles from './styles.module.css'
import { isUint8Array } from 'util/types';
import { SOCKET_EVENTS } from '../../../server/src/definitions/enums';
import { connect } from 'http2';
import { useCamera } from '@react-three/drei';

const CONNECTION_TIMEOUT = 5000


const Loading = () => {
  const navigate = useNavigate()

  const isConnected = useSocketStore((state) => state.isConnected)
  const socketComponent = useSocketStore((state) => state.socketComponent)
  const resetSocketComponent = useSocketStore((state) => state.resetSocketComponent)
  
  const isAuthenticated = useLoginStore((state) => state.isAuthenticated)
  const username = useLoginStore((state) => state.username)
  const password = useLoginStore((state) => state.password)
  const serverAddress = useLoginStore((state) => state.serverAddress)

  const walkSpeed = usePlayerStore((state) => state.walkSpeed)
  const runSpeed = usePlayerStore((state) => state.runSpeed)
  const rotateSpeed = usePlayerStore((state) => state.rotateSpeed)

  const tickInterval = useConfigStore((state) => state.tickInterval)

  const cameraOffsetY = useCameraStore((state) => state.cameraOffsetY)
  const cameraOffsetZ = useCameraStore((state) => state.cameraOffsetZ)

  /**
   * Effect used to detect a stablished connection. Once it happens, it tries to authenticate.
   */
  useEffect(() => {
    const failTimeout = setTimeout(() => {
      resetSocketComponent()
      navigate('/login')
    }, CONNECTION_TIMEOUT)

    if (isConnected) {
      socketComponent.emit(SOCKET_EVENTS.AUTHENTICATE, {
        username: username,
        password: password
      })
    }

    return () => clearTimeout(failTimeout)
  }, [isConnected])


  /**
   * Effect used to detect if the user authenticated. Once it happens, it requests server configuration.
   */
  useEffect(() => {
    if (isAuthenticated) {
      socketComponent.emit(SOCKET_EVENTS.SERVER_CONFIGS)
    }
  }, [isAuthenticated])


  useEffect(() => {
    if (areConfigurationsLoaded()) {
      navigate('/scene')
    }
  }, [tickInterval, cameraOffsetY, cameraOffsetZ])


  /** Check if the required configurations are loaded */
  const areConfigurationsLoaded = (): boolean => {
    if (
      tickInterval !== -1 && 
      cameraOffsetY !== -1 && 
      cameraOffsetZ !== -1 &&
      walkSpeed !== -1 &&
      runSpeed !== -1 &&
      rotateSpeed !== -1
    ) {
      return true
    }

    return false
  }


  const renderConnectionStatus = () => {
    let connectedStyle

    if (isConnected) connectedStyle = styles.green

    return (
      <div className={styles.item}>
        <div className={classNames(styles.status, connectedStyle)}/>
        <div className={styles.label}>
          Connecting to the server at {serverAddress}
        </div>
      </div>
    )
  }


  const renderAuthenticationStatus = () => {
    let authenticatedStyle

    if (isAuthenticated) authenticatedStyle = styles.green

    return (
      <div className={styles.item}>
        <div className={classNames(styles.status, authenticatedStyle)}/>
        <div className={styles.label}>
          Authenticating account {username}
        </div>
      </div>
    )    
  }


  const renderConfigurationStatus = () => {
    let authenticatedStyle

    if (areConfigurationsLoaded()) authenticatedStyle = styles.green

    return (
      <div className={styles.item}>
        <div className={classNames(styles.status, authenticatedStyle)}/>
        <div className={styles.label}>
          Retrieving server configurations
        </div>
      </div>
    )        
  }


  return (
    <div className={styles.container}>
        Loading
        <div className={styles.itemsContainer}>
          { renderConnectionStatus() }
          { renderAuthenticationStatus() }
          { renderConfigurationStatus() }
        </div>
    </div>
  )
}

export default Loading
