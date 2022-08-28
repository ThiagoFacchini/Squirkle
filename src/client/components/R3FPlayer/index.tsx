import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

import useWindowsStore from '../../stores/windowsStore'
import usePlayerStore from '../../stores/playerStore'
import useCameraStore from '../../stores/cameraStore'

let positionTween, rotationTween
let playerRotation = new THREE.Vector3()

const Player = () => {
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const playerPosition = usePlayerStore((state) => state.position)
    const updatePlayerRotation = usePlayerStore((state) => state.updateRotation)

    const cameraDirection = useCameraStore((state) => state.direction)
    const cameraPosition = useCameraStore((state) => state.position)

    const [isInitialised, setIsInitialised] = useState(false)
    const meshRef = useRef<THREE.Mesh>(null)

    useHelper(isDebugOverlayVisible && meshRef, THREE.BoxHelper, "blue")


    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.x = playerPosition.x
            meshRef.current.position.y = playerPosition.y
            meshRef.current.position.z = playerPosition.z
        }
        if (!isInitialised) setIsInitialised(true)
    }, [isInitialised])


    // Updates the player rotation
    useEffect(() => {
        if (meshRef.current && isInitialised) {
            const mesh = meshRef.current

            let yRotation = Math.atan2( 
                (cameraPosition.x - meshRef.current.position.x),
                (cameraPosition.z - meshRef.current.position.z)
            )

            rotationTween = new TWEEN.Tween({
                y: mesh.rotation.y,
            })
            .to ({
                y: yRotation
            }, 200)
            .onUpdate((tweenedObj) => {
                mesh.rotation.set(
                    mesh.rotation.x,
                    tweenedObj.y,
                    mesh.rotation.z
                )
            })
            .onComplete(() => completedRotation())
            .start()
        }
    }, [playerPosition, meshRef])


    useFrame((state, delta) => {
        if (rotationTween) rotationTween.update()
        if (positionTween) positionTween.update()
    })


    const completedRotation = () => {
        rotationTween = null
        
        if (meshRef.current) {
            const mesh = meshRef.current
            mesh.getWorldDirection(playerRotation)
            updatePlayerRotation(playerRotation)

            positionTween = new TWEEN.Tween({
                x: mesh.position.x,
                y: mesh.position.y,
                z: mesh.position.z 
            })
            .to({ 
                x: playerPosition.x,
                y: playerPosition.y,
                z: playerPosition.z
            }, 800)
            .onUpdate((tweenedObj) => {
                mesh.position.x = tweenedObj.x
                mesh.position.y = tweenedObj.y
                mesh.position.z = tweenedObj.z
            })
            .onComplete(() => resetPositionTween())
            .start()
        }

    }

    const resetPositionTween = () => positionTween = null

 
    return (
        <mesh 
            ref={ meshRef }
            scale={[1 ,1 ,1]}
            castShadow={true}
        >
            <boxGeometry args={[1, 2, 1]}/>
            <meshPhongMaterial color={'white'} wireframe/>

            <mesh position={[0, .75, -0.5]}>
                <boxGeometry args={[.2,.2,.2]}/>
                <meshPhongMaterial color={'pink'} />
            </mesh>
        </mesh>
    )
}

export default Player