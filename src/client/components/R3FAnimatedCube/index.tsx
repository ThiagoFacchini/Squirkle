import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHelper } from '@react-three/drei'
import { BoxHelper } from 'three'

type AnimatedCubePropsType = {
    isDebugVisible: boolean
}

const AnimatedCube = (props: AnimatedCubePropsType) => {
    const meshRef = useRef<THREE.Mesh>(null)

    useHelper(props.isDebugVisible && meshRef, BoxHelper, "blue")

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <mesh ref={ meshRef } scale={[1 ,1 ,1]} castShadow={true} position={[0,1,0]}>
            <boxGeometry attach={'geometry'}/>
            <meshPhongMaterial />
        </mesh>
    )
}

export default AnimatedCube