import React, { useRef, Fragment, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import { BoxHelper, SpotLightHelper } from 'three'

import useWindowsStore from './../../stores/windowsStore'
import useSocketStore from './../../stores/socketStore'
import useConfigsStore from '../../stores/configsStore'

const Sun = () => {
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const tickCount = useSocketStore((state) => state.tickCount)

    const tickInterval = useConfigsStore((state) => state.tickInterval)

    const sunRef = useRef<THREE.SpotLight>(null)
    const moonRef = useRef<THREE.SpotLight>(null)
    const auxRef = useRef<THREE.SpotLight>(null)
    const meshRef = useRef<THREE.Mesh>(null)
    // console.log('R3FSun re rendered')

    useHelper(isDebugOverlayVisible && sunRef, SpotLightHelper, "yellow")
    useHelper(isDebugOverlayVisible && moonRef, SpotLightHelper, "white")
    useHelper(isDebugOverlayVisible && auxRef, SpotLightHelper, "purple")

    const velocity = 360 / 1440
    let interpolatedAngle
    let lastTickTime

    useEffect(() => {
        lastTickTime = Date.now()
    },[tickCount])


    useFrame((state, delta) => {
        let timeOfDay = tickCount + (Date.now() - lastTickTime) / 1000
        interpolatedAngle = timeOfDay * velocity
        // console.log(`time of day ${timeOfDay}`)
        
        if (meshRef.current) {
            meshRef.current.rotation.z = (interpolatedAngle + 180) * (Math.PI / 180)
            // console.log(`${meshRef.current.rotation.z}`)
        } 
    })

    // console.log('tick happened')

    return (
        <Fragment>
            <spotLight position={[0, 50, 0]} color={"rgb(176, 163, 255)"} intensity={0.2} castShadow={false} ref={auxRef} />
            <mesh rotation={[0, 0, 0]} ref={ meshRef }>
                <spotLight position={[0, 50, 0]} color={'yellow'} intensity={1} castShadow={true} ref={sunRef} />
                <spotLight position={[0, -50,0]} color={'white'} intensity={0.1} castShadow={true} ref={moonRef} />
            </mesh>
        </Fragment>
    )
}

export default Sun