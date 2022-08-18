import React, { useRef, useContext } from 'react'
import { Canvas, useFrame, addTail } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import styles from './styles.module.css'
import envBackground from './../../assets/env.hdr'

import R3FFpsWatcher from '../../components/R3FFpsWatcher'

import RootStore from './../../stores/rootStore'
import DebugOverlayStore from './../../stores/debugOverlayStore'


const AnimatedBox = () => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01
            meshRef.current.rotation.y += 0.01
        }
    })

    return (
        <mesh ref={ meshRef } scale={[2 ,2 ,2]}>
            <boxGeometry attach={'geometry'}/>
            <meshStandardMaterial/>
        </mesh>
    )
}

const Home = () => {
    const { isDebugVisible, updateIsDebugVisible } = useContext(RootStore)
    const { updateFps } = useContext(DebugOverlayStore)


    return (
        <div className={styles.container}>
            <div className={styles.threeContainer }>
                <Canvas>
                    <R3FFpsWatcher shouldCalculate={ isDebugVisible } updateCallback={(fps) => updateFps(fps)} />
                    <Environment background={"only"} files={ envBackground }/>
                    <ambientLight intensity={0.1}/>
                    <directionalLight color={'red'} position={[0, 0, 5]} />
                    <AnimatedBox />
                    <OrbitControls />
                    
                </Canvas>
            </div>

        </div>
    )
}

export default Home