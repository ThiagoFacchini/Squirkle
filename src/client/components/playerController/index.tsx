import React, { useEffect, Fragment } from 'react'
import * as THREE from 'three'

import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'
import useCommandLineStore from '../../stores/commandLineStore'

const PlayerController = () => {
  const playerPosition = usePlayerStore((state) => state.position)
  const updatePlayerPosition = usePlayerStore((state) => state.updatePosition)

  const cameraDirection = useCameraStore((state) => state.direction)
  const cameraPosition = useCameraStore((state) => state.position)

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
    // Deals with Forward and Backward
    const positionVec = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
    const cameraDirectionVec = new THREE.Vector3(cameraDirection.x, cameraDirection.y, cameraDirection.z)

    const dotCameraDirProj = new THREE.Vector3(
      cameraDirectionVec.dot(new THREE.Vector3(1,0,0)),
      0,
      cameraDirectionVec.dot(new THREE.Vector3(0,0,1))
    )

    // Normalize because the length of the vector is irrelevant
    dotCameraDirProj.normalize()

    
    // Sideways
    const cameraDirectionRight = new THREE.Vector3()
    cameraDirectionRight.copy(cameraDirectionVec)

    cameraDirectionRight.cross(new THREE.Vector3(0,1,0))

    const dotCameraCrossProj = new THREE.Vector3(
      cameraDirectionRight.dot(new THREE.Vector3(1, 0, 0)),
      0,
      cameraDirectionRight.dot(new THREE.Vector3(0, 0, 1)),
    )

    dotCameraCrossProj.normalize()

    if (isCommandLineActive) return

    const totalTranslationVec = new THREE.Vector3()
    
    switch (evt.key) {
      case 'w' || 'W':
        totalTranslationVec.add(dotCameraDirProj)
        break
      
      case 's' || 'S':
        totalTranslationVec.sub(dotCameraDirProj)
        break

      case 'a' || 'A':  
      totalTranslationVec.sub(dotCameraCrossProj)
        break

      case 'd' || 'D':
        totalTranslationVec.add(dotCameraCrossProj)
        break
    }

    totalTranslationVec.normalize()
    positionVec.add(totalTranslationVec)
    
    updatePlayerPosition({
      x: positionVec.x,
      y: positionVec.y,
      z: positionVec.z
    })
  }

  const onKeyUp = (evt: KeyboardEvent) => {
  }

  return <Fragment/>
}

export default PlayerController