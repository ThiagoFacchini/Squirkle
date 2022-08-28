import React from 'react'

import useCameraStore from '../../stores/cameraStore'


const CameraHelper = () => {
    const controlsTargetPosition = useCameraStore((state) => state.controlsTarget)
    
    return (
        <mesh position={[ controlsTargetPosition.x, controlsTargetPosition.y, controlsTargetPosition.z - .05]}>
            <sphereGeometry args={[.1, 12, 12]} />
            <meshStandardMaterial color={'white'} />
        </mesh>
    )
}

export default CameraHelper