import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

import R3FFpsWatcher from '../../components/R3FFpsWatcher'
import R3FAxisHelper from '../../components/R3FAxisHelper'
import R3FGridHelper from '../../components/R3FGridHelper'
import R3FAnimatedCube from '../../components/R3FAnimatedCube'
import R3FCameraOrbitController from '../../components/R3FCameraOrbitControlller'
import R3FSun from '../../components/R3FSun'

import DebugOverlay from './../../components/debugOverlay'
import PingWatcher from './../../components/pingWatcher'

import useSocket from './../../stores/socketStore'

const Scene = () => {
    const navigate = useNavigate()
    const isConnected = useSocket((state) => state.isConnected)

    useEffect(() => {
        if (!isConnected) {
            navigate('/login')
        }
    },[isConnected])

    return (
        <div className={styles.container}>

            {/* Temporarily placed here */}
            <DebugOverlay />
            <PingWatcher />
            {/* <Socket /> */}
            {/* Temporarily placed here */}

            <div className={styles.threeContainer }>
                <Canvas shadows={true}>
                    {/* Debug Designed Components */}
                    <R3FFpsWatcher />
                    <R3FAxisHelper />
                    <R3FGridHelper />

                    {/* Production Components */}
                    <R3FCameraOrbitController />
                    <R3FSun />
                    <R3FAnimatedCube/>

                    <mesh scale={[1, 1, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                        <planeGeometry args={[10,10]} />
                        <meshPhongMaterial color={'green'}/>
                    </mesh>
                </Canvas>
            </div>

        </div>
    )
}

export default Scene