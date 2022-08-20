import React, { useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import styles from './styles.module.css'
import envBackground from './../../assets/env.hdr'

import R3FFpsWatcher from '../../components/R3FFpsWatcher'
import R3FAnimatedCube from '../../components/R3FAnimatedCube'
import R3FCameraOrbitController from '../../components/R3FCameraOrbitControlller'
import R3FSun from '../../components/R3FSun'

import RootStore from './../../stores/rootStore'
import DebugOverlayStore from './../../stores/debugOverlayStore'


const Home = () => {
    const { isDebugVisible } = useContext(RootStore)
    
    console.log('Home Re rendered...')
    return (
        <div className={styles.container}>
            <div className={styles.threeContainer }>
                <Canvas shadows={true}>
                    {/* Debug Designed Components */}
                    <R3FFpsWatcher/>
                    <axesHelper visible={ isDebugVisible } args={[3]}/>
                    <gridHelper visible={ isDebugVisible } args={[10, 10]} />

                    {/* Production Components */}
                    <R3FCameraOrbitController />
                    <R3FSun />
                    <R3FAnimatedCube isDebugVisible={ true }/>
                    {/* <ambientLight intensity={0.1}/> */}
                    {/* <directionalLight color={'red'} position={[0, 0, 5]} /> */}

                    <mesh scale={[25, 25, 25]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
                        <planeGeometry/>
                        <meshPhongMaterial color={'green'}/>
                    </mesh>
                    {/* <Environment background={"only"} files={ envBackground }/> */}                    
                </Canvas>
            </div>

        </div>
    )
}

export default Home