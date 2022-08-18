import React from 'react';
import { Canvas } from '@react-three/fiber'

import styles from './styles.module.css'

const Home = () => {

    return (
        <div className={styles.container}>
            <div className={styles.test}>
                test
            </div>
            <div className={styles.threeContainer }>
                <Canvas>
                    <mesh>
                        <boxGeometry/>
                        <meshStandardMaterial/>
                    </mesh>
                </Canvas>
            </div>

        </div>
    )
}

export default Home