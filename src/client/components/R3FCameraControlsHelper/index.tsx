import React from 'react'

import useCameraStore from '../../stores/cameraStore'
import useWindowsStore from '../../stores/windowsStore'


const CameraHelper = () => {
    const controlsTargetPosition = useCameraStore((state) => state.controlsTarget)
    const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

    const shouldRenderCameraTarget = () => {
        if (isDebugOverlayVisible) {
            return (
                <mesh position={[ controlsTargetPosition.x, controlsTargetPosition.y, controlsTargetPosition.z]}>
                    <sphereGeometry args={[.1, 12, 12]} />
                    <meshStandardMaterial color={'white'} />
                </mesh>                
            )
        }

        return null
    }
    
    return shouldRenderCameraTarget()
}

export default CameraHelper