import React, { useRef, useContext, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'

import useWindowsStore from './../../stores/windowsStore'
import usePlayerStore from './../../stores/playerStore'


const AnimatedCube = () => {
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)
    const playerPosition = usePlayerStore((state) => state.position)

    const meshRef = useRef<THREE.Mesh>(null)

    useHelper(isDebugOverlayVisible && meshRef, THREE.BoxHelper, "blue")

    useEffect(() => {

        if (meshRef.current) {
            new TWEEN.Tween(meshRef.current.position)
            .to({ 
                x: playerPosition.x,
                y: playerPosition.y,
                z: playerPosition.z
            })
            .easing(TWEEN.linear)
            .start()
            .onComplete(() => {
                console.log('animation doneish')
            })
        }
    }, [playerPosition])

    return (
        <mesh 
            ref={ meshRef }
            scale={[1 ,1 ,1]}
            castShadow={true}
        >
            <boxGeometry attach={'geometry'}/>
            <meshPhongMaterial />
        </mesh>
    )
}

export default AnimatedCube