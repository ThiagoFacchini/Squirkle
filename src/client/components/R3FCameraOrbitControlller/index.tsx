import { useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import useWindowsStore from './../../stores/windowsStore'
import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'

let controlsTargetV3 = new THREE.Vector3()
let cameraDirection = new THREE.Vector3()
let controls, tween

const CameraOrbitController = () => {
    const [isInitialised, setIsInitialised] = useState(false)
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const playerPosition = usePlayerStore((state) => state.position)

    const updateCameraDirection = useCameraStore((state => state.updateDirection))
    const updateCameraPosition = useCameraStore((state) => state.updatePosition)

    const { camera, gl } = useThree()


    useEffect(() => {
        if (!isInitialised) {
            setIsInitialised(true)

            if (camera) {
                camera.getWorldDirection(cameraDirection)
                updateCameraDirection(cameraDirection)
                updateCameraPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
            }
        }
    },[isInitialised])


    useEffect(() => {
        controls = new OrbitControls(camera, gl.domElement)
        controls.addEventListener('change', onChange);

        camera.position.x = playerPosition.x
        camera.position.y = playerPosition.y +3
        camera.position.z = playerPosition.z +5

        controls.target = new THREE.Vector3(
            playerPosition.x,
            playerPosition.y,
            playerPosition.z
        )
        controls.update()
        camera.updateProjectionMatrix()

        return () => {
            controls.dispose()
            controls.removeEventListener('change', onChange)
        }
    }, [camera, gl])


    useEffect(() => {
        if (isDebugOverlayVisible) {
            controls.enablePan = true
            controls.maxDistance = 30
            controls.minDistance = 1
        } else {
            controls.enablePan = false
            controls.maxDistance = 5.83
            controls.minDistance = 1            
            controls.minPolarAngle = 0
            controls.maxPolarAngle = 1.5
        }
        controls.update()
    },[isDebugOverlayVisible])


    useEffect(() => {
        const incrementalVec = {
            x: camera.position.x - playerPosition.x,
            y: camera.position.y - playerPosition.y,
            z: camera.position.z - playerPosition.z
        }
        if (camera && isInitialised) {
            tween = new TWEEN.Tween({
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
            }).to({
                x: playerPosition.x, 
                y: playerPosition.y +3,
                z: playerPosition.z +5 
            }, 1000)
            .onUpdate((tweenedObj) => {
                camera.position.x = tweenedObj.x,
                camera.position.y = tweenedObj.y
                camera.position.z = tweenedObj.z
                camera.updateProjectionMatrix()

                controlsTargetV3.x = tweenedObj.x,
                controlsTargetV3.y = tweenedObj.y -3
                controlsTargetV3.z = tweenedObj.z -5
                controls.target = controlsTargetV3
                controls.update()

            })
            .onComplete(() => resetTween())
            tween.start()
        }
    },[playerPosition])


    useFrame((state, delta) => {
        if (tween) tween.update()
    })


    const onChange = (evt) =>{
        camera.getWorldDirection(cameraDirection)
        updateCameraDirection({
            x: cameraDirection.x,
            // y: cameraDirection.y,
            y: 0,
            z: cameraDirection.z
        })
        updateCameraPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
    }

    const resetTween = () => {
        tween = null
    }

    return null
}

export default CameraOrbitController