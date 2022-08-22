import React, { useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { useContextBridge } from '@react-three/drei'

import styles from './styles.module.css'

import WindowsStore from './../../stores/windowsStore'
import SceneStore from './../../stores/sceneStore'

import R3FFpsWatcher from '../../components/R3FFpsWatcher'
import R3FAxisHelper from '../../components/R3FAxisHelper'
import R3FGridHelper from '../../components/R3FGridHelper'
import R3FAnimatedCube from '../../components/R3FAnimatedCube'
import R3FCameraOrbitController from '../../components/R3FCameraOrbitControlller'
import R3FSun from '../../components/R3FSun'

import DebugOverlay from './../../components/debugOverlay'
import PingWatcher from './../../components/pingWatcher'
import Ticker from './../../components/ticker'

const Scene = () => {
    console.log('[SCENE] Rendered.')

    const ContextBridge = useContextBridge(WindowsStore, SceneStore)

    return (
        <div className={styles.container}>

            {/* Temporarily placed here */}
            <DebugOverlay />
            <PingWatcher />
            <Ticker/>
            {/* Temporarily placed here */}

            <div className={styles.threeContainer }>
                <Canvas shadows={true}>
                    <ContextBridge>
                        {/* Debug Designed Components */}
                        <R3FFpsWatcher />
                        <R3FAxisHelper />
                        <R3FGridHelper />

                        {/* Production Components */}
                        <R3FCameraOrbitController />
                        <R3FSun />
                        <R3FAnimatedCube/>

                        <mesh scale={[25, 25, 25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                            <planeGeometry/>
                            <meshPhongMaterial color={'green'}/>
                        </mesh>
                    </ContextBridge>              
                </Canvas>
            </div>

        </div>
    )
}

export default Scene