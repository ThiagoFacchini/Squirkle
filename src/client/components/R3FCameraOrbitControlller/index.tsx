import { useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import useWindowsStore from './../../stores/windowsStore'
import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'

let controlsTgtVec = new THREE.Vector3()
let controlsTgt2Vec = new THREE.Vector3()
let positionVec = new THREE.Vector3()
let directionVec = new THREE.Vector3()
let cameraDirection = new THREE.Vector3()
let controls, tween

const CameraOrbitController = () => {
    const [isInitialised, setIsInitialised] = useState(false)
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const playerPosition = usePlayerStore((state) => state.position)
    const playerRotation = usePlayerStore((state) => state.rotation)

    const updateCameraDirection = useCameraStore((state => state.updateDirection))
    const updateCameraPosition = useCameraStore((state) => state.updatePosition)
    const updateCameraControlsTarget = useCameraStore((state) => state.updateControlsTarget)

    const { camera, gl } = useThree()

    // Initialise the camera component, by setting isInistialised to true, and pushes the camera 
    // direction to the store
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

    
    // Create orbit controls, add a listener to monitor changes to it and set the targe to the 
    //player
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


    // Change the orbit controls properties if it is in debug mode to give debug freem to the 
    // camera
    // useEffect(() => {
    //     if (isDebugOverlayVisible) {
    //         controls.enablePan = true
    //         controls.maxDistance = 30
    //         controls.minDistance = 1
    //     } else {
    //         controls.enablePan = false
    //         controls.maxDistance = 5.83
    //         controls.minDistance = 1            
    //         controls.minPolarAngle = 0
    //         controls.maxPolarAngle = 1.5
    //     }
    //     controls.update()
    // },[isDebugOverlayVisible])


    useEffect(() => {
        if (camera && isInitialised) {
            positionVec.set(playerPosition.x, playerPosition.y, playerPosition.z)
            directionVec.set(cameraDirection.x, cameraDirection.y, cameraDirection.z)
            positionVec.addScaledVector(directionVec, -5)

            controlsTgtVec.add(directionVec)

            tween = new TWEEN.Tween({
                posX: camera.position.x,
                posY: camera.position.y,
                posZ: camera.position.z,

                tgtX: controls.target.x,
                tgtY: controls.target.y,
                tgtZ: controls.target.z
            }).to({
                posX: positionVec.x, 
                posY: camera.position.y,
                posZ: positionVec.z,

                tgtX: controlsTgtVec.x,
                tgtY: controlsTgtVec.y,
                tgtZ: controlsTgtVec.z
            }, 1000)

            .onUpdate((tweenedObj) => {
                camera.position.x = tweenedObj.posX,
                camera.position.y = camera.position.y
                camera.position.z = tweenedObj.posZ
                camera.updateProjectionMatrix()

                controlsTgt2Vec.set(tweenedObj.tgtX, playerPosition.y, tweenedObj.tgtZ)
                controls.target = controlsTgt2Vec
                // controls.update()

            })
            .onComplete(() => resetTween())
            tween.start()
        }
    },[playerPosition, playerRotation])


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
        updateCameraControlsTarget({ x: controls.target.x, y: controls.target.y, z: controls.target.z})
        tween = null
    }

    return null
}

export default CameraOrbitController