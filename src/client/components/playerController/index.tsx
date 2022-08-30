import React, { useEffect, Fragment } from 'react'
import * as THREE from 'three'

import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'
import useCommandLineStore from '../../stores/commandLineStore'

const PlayerController = () => {
  const playerPosition = usePlayerStore((state) => state.position)
  const updatePlayerPosition = usePlayerStore((state) => state.updatePosition)

  const cameraDirection = useCameraStore((state) => state.direction)

  const isCommandLineActive = useCommandLineStore((state) => state.isActive)
  
  
  useEffect(() => {
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('keyup', onKeyUp)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    
    return () => {
        document.removeEventListener('keydown', onKeyDown)
        document.removeEventListener('keyup', onKeyUp)
    }
  })


  const onKeyDown = (evt: KeyboardEvent) => {
    const positionVec = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
    const directionVec = new THREE.Vector3(cameraDirection.x, cameraDirection.y, cameraDirection.z)

    if (isCommandLineActive) return

    switch (evt.key) {
      case 'w' || 'W':
        positionVec.add(directionVec).multiplyScalar(1)

        updatePlayerPosition({
          x: positionVec.x,
          y: positionVec.y,
          z: positionVec.z
        })
        return
      
      case 's' || 'S':
        positionVec.sub(directionVec).multiplyScalar(1)

        updatePlayerPosition({
          x: positionVec.x,
          y: positionVec.y,
          z: positionVec.z
        })
        return

      case 'a' || 'A':
        updatePlayerPosition({
          x: playerPosition.x -1,
          y: playerPosition.y,
          z: playerPosition.z
        })
        return

      case 'd' || 'D':
        updatePlayerPosition({
          x: playerPosition.x +1,
          y: playerPosition.y,
          z: playerPosition.z
        })
        return
    }
  }

  const onKeyUp = (evt: KeyboardEvent) => {
  }

  return <Fragment/>
}

export default PlayerController