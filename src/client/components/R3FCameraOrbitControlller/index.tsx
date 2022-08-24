import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import useWindowsStore from './../../stores/windowsStore'
import usePlayerStore from './../../stores/playerStore'

let worldDirectionVec3 = new THREE.Vector3()
let camPosVect3 = new THREE.Vector3()

let controls

const CameraOrbitController = () => {
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const playerPosition = usePlayerStore((state) => state.position)
    const updateLookDirection = usePlayerStore((state) => state.updateLookDirection)

    const { camera, gl } = useThree()

    useEffect(() => {
        controls = new OrbitControls(camera, gl.domElement)
        controls.addEventListener('change', onChange);

        return () => {
            controls.dispose()
            controls.removeEventListener('change', onChange)
        }
    }, [camera, gl])


    useEffect(() => {
        if (isDebugOverlayVisible) {
            controls.enablePan = true
            controls.maxDistance = 30
            controls.minDistance = 0
        } else {
            controls.enablePan = false
            // controls.maxDistance = 5.0
            // controls.minDistance = 1            
            // controls.minPolarAngle = 0
            // controls.maxPolarAngle = 1.5
        }
        controls.update()
    },[isDebugOverlayVisible, playerPosition])


    useFrame((state) => {
        state.camera.position.lerp(
            camPosVect3.set(
                playerPosition.x,
                playerPosition.y + 3,
                playerPosition.z + 5
            ),
            0.1
        )

        camera.lookAt(
            state.camera.position.x,
            state.camera.position.y - 3,
            state.camera.position.z - 5
        )
        camera.updateProjectionMatrix()
    })



    const onChange = (evt) =>{
        camera.getWorldDirection(worldDirectionVec3)
        updateLookDirection({ 
            x: worldDirectionVec3.x,
            y: worldDirectionVec3.y,
            z: worldDirectionVec3.z 
        })
    }

    return null
}

export default CameraOrbitController