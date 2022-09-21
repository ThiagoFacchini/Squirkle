import { useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { throttle } from 'lodash'

import useWindowsStore from './../../stores/windowsStore'
import usePlayerStore from './../../stores/playerStore'
import useCameraStore from './../../stores/cameraStore'
import useConfigStore from './../../stores/configsStore'
import { useCamera } from '@react-three/drei'

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
    const playerIsMoving = usePlayerStore((state) => state.isMoving)

    const updateCameraDirection = useCameraStore((state => state.updateDirection))
    const updateCameraPosition = useCameraStore((state) => state.updatePosition)
    const updateCameraControlsTarget = useCameraStore((state) => state.updateControlsTarget)
    const configCameraOffsetY = useCameraStore((state) => state.cameraOffsetY)
    const configCameraOffsetZ = useCameraStore((state) => state.cameraOffsetZ)
    const cameraStoreMaxUpdatesPerSecond = useCameraStore((state) => state.storeMaxUpdatesPerSecond)

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
    useEffect(() => {
        if (isDebugOverlayVisible) {
            controls.enablePan = true
            controls.maxDistance = 8
            controls.minDistance = 0
            controls.maxPolarAngle = 4
        } else {
            controls.enablePan = false
            controls.maxDistance = 5.83
            controls.minDistance = 2            
            controls.maxPolarAngle = 1.5
        }
        controls.update()
    },[isDebugOverlayVisible])


    /**
     * Updates the camera controls once the player moves.
     */
    useEffect(() => {
        if (camera && isInitialised) {
            if (!playerIsMoving) {
                tween = new TWEEN.Tween({
                    tgtX: controls.target.x,
                    tgtY: controls.target.y,
                    tgtZ: controls.target.z
                }).to({
                    tgtX: playerPosition.x,
                    tgtY: playerPosition.y,
                    tgtZ: playerPosition.z
                }, playerWalkSpeed)
                .onUpdate((tweenedObj) => {
                    controlsTgt2Vec.set(tweenedObj.tgtX, tweenedObj.tgtY, tweenedObj.tgtZ)
                    controls.target = controlsTgt2Vec
                    controls.update()
                })
                .onComplete(() => resetTween())
                .start()
            }
        }
    },[playerPosition, playerIsMoving])


    /**
     * Render the camera position & controls changes on every frame.
     */
    useFrame((state, delta) => {
        if (tween) tween.update()
    })


    /**
     * Update camera position and lookAtDirection at the store if the camera changes.
     * @param evt The camera object containing event details
     */
    const onChange = (evt) =>{
        camera.getWorldDirection(cameraDirection)
        throttledUpdateCameraDirection()
        throttledUpdateCameraPosition()
    }


    /**
     * Resets the tween animations once they are done.
     */
    const resetTween = () => {
        updateCameraControlsTarget({ x: controls.target.x, y: controls.target.y, z: controls.target.z})
        tween = null
    }


    /**
     * Throttles the amount of calls to the updateCameraPosition (CameraStore) method.
     */
    const throttledUpdateCameraPosition = throttle(
        () => {updateCameraPosition({ x: camera.position.x, y: camera.position.y, z: camera.position.z })},
        1000 / cameraStoreMaxUpdatesPerSecond
    )


    /**
     * Throttles the amount of calls to the updateCameraDirection (CameraStore) method.
     */
    const throttledUpdateCameraDirection = throttle(
        () => { updateCameraDirection({ 
            x: cameraDirection.x,
            y: cameraDirection.y,
            z: cameraDirection.z
        }) },
        1000 / cameraStoreMaxUpdatesPerSecond
    )


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