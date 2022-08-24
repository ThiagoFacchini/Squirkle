import React, { useEffect, Fragment } from 'react'
import { Vector3 } from 'three'

import usePlayerStore from './../../stores/playerStore'

let vector3 = new Vector3()

const PlayerController = () => {
  const position = usePlayerStore((state) => state.position)
  const updatePosition = usePlayerStore((state) => state.updatePosition)
  const lookDirection = usePlayerStore((state) => state.lookDirection)
  
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
    switch (evt.key) {
      case 'w' || 'W':
        // vector3 = lookDirection
        // vector3.z = vector3.z - 1
        // vector3.y = vector3.y
        // updatePosition(vector3)

        updatePosition({
          x: position.x,
          y: position.y,
          z: position.z -1
        })
        return
      
      case 's' || 'S':
        updatePosition({
          x: position.x,
          y: position.y,
          z: position.z +1
        })
        return

      case 'a' || 'A':
        updatePosition({
          x: position.x -1,
          y: position.y,
          z: position.z
        })
        return

      case 'd' || 'D':
        updatePosition({
          x: position.x +1,
          y: position.y,
          z: position.z
        })
        return
    }
  }

  const onKeyUp = (evt: KeyboardEvent) => {
  }

  return <Fragment/>
}

export default PlayerController