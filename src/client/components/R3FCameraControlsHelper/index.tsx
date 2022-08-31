import React from 'react'

import useCameraStore from '../../stores/cameraStore'
import useWindowsStore from '../../stores/windowsStore'


const CameraHelper = () => {
    const controlsTargetPosition = useCameraStore((state) => state.controlsTarget)
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const shouldRenderCameraTarget = () => {
        if (isDebugOverlayVisible) {
            return (
                <meshStandardMaterial color={'white'} />
            )
        }
    }
    
    return (
        <mesh position={[ controlsTargetPosition.x, controlsTargetPosition.y, controlsTargetPosition.z - .05]}>
            <sphereGeometry args={[.1, 12, 12]} />
            { shouldRenderCameraTarget() }
        </mesh>
    )
}

export default CameraHelper