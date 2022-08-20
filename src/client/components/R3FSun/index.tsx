import React, { useRef, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import { BoxHelper, SpotLightHelper } from 'three'

import RootStore from './../../stores/rootStore'

const Sun = () => {
    // const { isDebugVisible, tickCount } = useContext(RootStore)

    // console.log(tickCount)

    const sunRef = useRef<THREE.SpotLight>(null)
    const moonRef = useRef<THREE.SpotLight>(null)
    console.log('R3FSun re rendered')

    // useHelper(isDebugVisible && sunRef, SpotLightHelper, "yellow")
    // useHelper(isDebugVisible && moonRef, SpotLightHelper, "white")

    // const hour = tickCount / 60
    // const minute = tickCount
    // const minuteAngle = 360 / 1440
    // const angle = minute * (minuteAngle * 2) - 180


    // useFrame(() => {
    //     if (meshRef.current) {
    //         meshRef.current.rotation.x += 0.01
    //         meshRef.current.rotation.y += 0.01
    //     }
    // })

    return (
        <mesh rotation={[0, 0, (Math.PI / 360) * 0]}>
            <spotLight position={[0, 20, 0]} color={'yellow'} intensity={1} castShadow={true} ref={sunRef} />
            <spotLight position={[0, -20,0]} color={'white'} intensity={0.1} castShadow={true} ref={moonRef} />
        </mesh>
    )
}

export default Sun