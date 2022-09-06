import React, { useEffect, Fragment, useState } from 'react'
import * as THREE from 'three'

import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'
import useCommandLineStore from '../../stores/commandLineStore'
import { Vector3 } from 'three'
import { update } from 'lodash'

const PlayerController = () => {
  const playerPosition = usePlayerStore((state) => state.position)
  const walkSpeed = usePlayerStore((state) => state.walkSpeed)
  const isMoving = usePlayerStore((state) => state.isMoving)
  const updateIsMoving = usePlayerStore((state) => state.updateIsMoving)
  const updatePlayerPosition = usePlayerStore((state) => state.updatePosition)

  const cameraDirection = useCameraStore((state) => state.direction)

  const isCommandLineActive = useCommandLineStore((state) => state.isActive)
  
  const [isWActive, setIsWActive ] = useState(false)
  const [isAActive, setIsAActive ] = useState(false)
  const [isSActive, setIsSActive ] = useState(false)
  const [isDActive, setIsDActive ] = useState(false)
  const [isSpaceActive, setIsSpaceActive ] = useState(false)
  

  /**
   * Add | Remove event listeners for keyDown and Keyup
   */
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


  useEffect(() => {
    console.log(`isMoving ${isMoving}`)
    console.log(`isWActive ${isWActive}`)

    if (!isMoving && isWActive) {
      // console.log('moving')
      const positionVec = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
      const cameraDirectionVec = new THREE.Vector3(cameraDirection.x, cameraDirection.y, cameraDirection.z)      

      const totalTranslationVec = new THREE.Vector3()
      totalTranslationVec.add( getDotForwardVector(cameraDirectionVec) )

      totalTranslationVec.normalize()
      positionVec.add(totalTranslationVec)
      
      updatePlayerPosition({
        x: positionVec.x,
        y: positionVec.y,
        z: positionVec.z
      })      
    }
  }, [isWActive, isMoving])

  /**
   * 
   * @param cameraDirectionVec <Vector3> Containing the camera direction vector
   * @returns <Vector3> Containing the Vector pointing to the same direction camera is looking at
   */
  const getDotForwardVector = (cameraDirectionVec: Vector3): Vector3 => {
    const dotForwardVector = new THREE.Vector3(
      cameraDirectionVec.dot(new THREE.Vector3(1,0,0)),
      0,
      cameraDirectionVec.dot(new THREE.Vector3(0,0,1))
    )

    // Normalize because the length of the vector is irrelevant
    return dotForwardVector.normalize()
  }


  /**
   * 
   * @param cameraDirectionVec <Vector3> Containing the camera direction vector
   * @returns <Vector3> Contaning the cross Vector on which the camera is looking at
   */
  const getDotCrossVector = (cameraDirectionVec: Vector3): Vector3 => {
    const cameraDirectionRight = new THREE.Vector3()
    cameraDirectionRight.copy(cameraDirectionVec)

    cameraDirectionRight.cross(new THREE.Vector3(0,1,0))

    const dotCameraCrossProj = new THREE.Vector3(
      cameraDirectionRight.dot(new THREE.Vector3(1, 0, 0)),
      0,
      cameraDirectionRight.dot(new THREE.Vector3(0, 0, 1)),
    )
    
    // Normalize because the length of the vector is irrelevant
    return dotCameraCrossProj.normalize()
  }


  const onKeyDown = (evt: KeyboardEvent) => {

    // If the command line is active, then return
    if (isCommandLineActive) return

    const positionVec = new THREE.Vector3(playerPosition.x, playerPosition.y, playerPosition.z)
    const cameraDirectionVec = new THREE.Vector3(cameraDirection.x, cameraDirection.y, cameraDirection.z)

    const totalTranslationVec = new THREE.Vector3()
    
    switch (evt.key) {
      case 'w' || 'W':
        if (!isWActive) setIsWActive(true)
        // totalTranslationVec.add( getDotForwardVector(cameraDirectionVec) )
        console.log('ignoring')
        break
      
      case 's' || 'S':
        if (!isSActive) setIsSActive(true)
        totalTranslationVec.sub( getDotForwardVector(cameraDirectionVec) )
        break

      case 'a' || 'A':  
      if (!isAActive) setIsAActive(true)
        totalTranslationVec.sub( getDotCrossVector(cameraDirectionVec) )
        break

      case 'd' || 'D':
        if (!isDActive) setIsDActive(true)
        totalTranslationVec.add( getDotCrossVector(cameraDirectionVec) )
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
    // If the command line is active, then return
    if (isCommandLineActive) return

    switch (evt.key) {
      case 'w' || 'W':
        if (isWActive) setIsWActive(false)
        break
      
      case 's' || 'S':
        if (isSActive) setIsSActive(false)
        break

      case 'a' || 'A':  
      if (isWActive) setIsAActive(false)
        break

      case 'd' || 'D':
        if (isDActive) setIsDActive(false)
        break
    }
  }

  return <Fragment/>
}

export default PlayerController