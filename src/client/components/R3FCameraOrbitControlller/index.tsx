import { useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import useWindowsStore from './../../stores/windowsStore'
import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'
import useConfigStore from './../../stores/configsStore'

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
    const playerWalkSpeed = usePlayerStore((state) => state.walkSpeed)

    const updateCameraDirection = useCameraStore((state => state.updateDirection))
    const updateCameraPosition = useCameraStore((state) => state.updatePosition)
    const updateCameraControlsTarget = useCameraStore((state) => state.updateControlsTarget)
    const configCameraOffsetY = useCameraStore((state) => state.cameraOffsetY)
    const configCameraOffsetZ = useCameraStore((state) => state.cameraOffsetZ)

    const { camera, gl } = useThree()

    /** 
     * Initialise the camera component, by setting isInistialised to true, and pushes the camera 
     * direction to the store.
    */ 
    useEffect(() => {
        if (!isInitialised) {
            setIsInitialised(true)

            if (camera) {
                camera.getWorldDirection(cameraDirection)
                updateCameraDirection(cameraDirection)
            }
        }
    },[isInitialised])

    
    /**
     * Create orbit controls, add a listener to monitor camera changes, position the camera and set 
     * its target to the player.
    */    
    useEffect(() => {
        controls = new OrbitControls(camera, gl.domElement)
        controls.addEventListener('change', onChange);
        
        const camPos = getCameraPosition()
                
        camera.position.x = camPos.x
        camera.position.y = camPos.y + configCameraOffsetY
        camera.position.z = camPos.z

        camera.updateProjectionMatrix()
        updateCameraPosition({ x: camPos.x, y: camPos.y, z: camPos.z })

        controls.target = new THREE.Vector3(
            playerPosition.x,
            playerPosition.y,
            playerPosition.z
        )
        controls.update()
        updateCameraControlsTarget({x: controls.target.x, y: controls.target.y, z: controls.target.z})

        return () => {
            controls.dispose()
            controls.removeEventListener('change', onChange)
        }
    }, [camera, gl])


    /**
     * Change the orbit controls properties if it is in debug mode to give debug freem to the 
     * camera.
     */
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


    /**
     * Updates the camera position & controls target once the player moves.
     */
    useEffect(() => {
        if (camera && isInitialised) {
            const camPos = getCameraPosition()
            
            tween = new TWEEN.Tween({
                posX: camera.position.x,
                posZ: camera.position.z,
                tgtX: controls.target.x,
                tgtZ: controls.target.z
            }).to({
                posX: camPos.x, 
                posZ: camPos.z,
                tgtX: playerPosition.x,
                tgtZ: playerPosition.z
            }, playerWalkSpeed)

            .onUpdate((tweenedObj) => {
                camera.position.x = tweenedObj.posX,
                camera.position.z = tweenedObj.posZ
                camera.updateProjectionMatrix()

                controlsTgt2Vec.set(tweenedObj.tgtX, playerPosition.y, tweenedObj.tgtZ)
                controls.target = controlsTgt2Vec
                controls.update()

            })
            .onComplete(() => resetTween())
            .start()

            if (isDebugOverlayVisible) {

            }

        }
    },[playerPosition, playerRotation])


    /**
     * Render the camera position & controls changes on every frame.
     */
    useFrame((state, delta) => {
        if (tween) tween.update()
    })


    /**
     * Update camera variables at the stores if the camera changes.
     * @param evt The camera object containing event details
     */
    const onChange = (evt) =>{
        camera.getWorldDirection(cameraDirection)
        updateCameraDirection({
            x: cameraDirection.x,
            y: 0,
            z: cameraDirection.z
        })
        updateCameraPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
    }


    /**
     * Resets the tween animations once they are done.
     */
    const resetTween = () => {
        updateCameraControlsTarget({ x: controls.target.x, y: controls.target.y, z: controls.target.z})
        tween = null
    }


    /** Returns the camera position based on the player and configured camera offsets */
    const getCameraPosition = (): THREE.Vector3 => {
        positionVec.set(playerPosition.x, playerPosition.y, playerPosition.z)
        directionVec.set(cameraDirection.x, cameraDirection.y, cameraDirection.z)        
        positionVec.addScaledVector(directionVec, - configCameraOffsetZ)
        
        return positionVec
    }

    return null
}

export default CameraOrbitController