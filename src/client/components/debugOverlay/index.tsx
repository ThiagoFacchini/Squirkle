import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, addTail, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { throttle } from 'lodash'

import styles from './styles.module.css'


const FPS = (): string => {
    let ref = useRef()
    let last = Date.now()

    const fn = useMemo(() => {
        return throttle(fps => {
            // console.log(`FPS: ${fps.toFixed(0)}`)
            // ref.current = "fps " + fps.toFixed(0)
        }, 200)
    }, [])

    useFrame(() => {
      let now = Date.now()
      let delta = 1 / ((now - last) / 1000)
      fn(delta)
      last = now
    })

    useEffect(() => addTail(() => fn(0)), [])

    const { viewport } = useThree()
    
    if (ref.current) return ref.current
    return '0'
}


const DebugOverlay = () => {
    return (
        <Html>
            <FPS />
        </Html>
    )
}

export default FPS