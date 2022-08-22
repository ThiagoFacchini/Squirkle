import React, { useRef, useMemo, useContext, Fragment } from 'react'
import { useFrame } from '@react-three/fiber'
import { throttle } from 'lodash'

import WindowsStore from './../../stores/windowsStore'
import SceneStore from './../../stores/sceneStore'


const DEFAULT_UPDATE_INTERVAL = 1000

const FPSWatcher = () => {

    const { isDebugOverlayVisible } = useContext(WindowsStore)
    const { lastRecordedFPS, updateLastRecordedFPS } = useContext(SceneStore)

    const FPSRef = useRef()
    let lastTime = Date.now()
    let lastUpdate = Date.now()
    let FPSarr: Array<number> = []

    const calculateFPS = useMemo(() => {
        return throttle((deltaTime) => {
            const roundedFPS = parseInt(deltaTime.toFixed(0))
            FPSarr.push(roundedFPS)
        }, 60)
    }, [FPSarr])


    const publishFps = () => {
        let FPSSum: number = 0

        for (let i = 1; i < FPSarr.length; i++) {
            FPSSum += FPSarr[i]
        }

        const FPSAvg = FPSSum / FPSarr.length
        updateLastRecordedFPS(parseInt(FPSAvg.toFixed(0))) 
        FPSarr = []
        lastUpdate = Date.now()
    }

    // console.log(`re rendered ${Date.now() - lastUpdate}`)


    useFrame(() => {
        if (isDebugOverlayVisible) {
            let currTime = Date.now()

            // Calculates the FPS
            let delta = 1 / ((currTime - lastTime) / 1000)
            lastTime = currTime
            calculateFPS(delta)

            // Check if its time to execute the update callback
            // console.log(currTime - lastUpdate)
            if ((currTime - lastUpdate) > DEFAULT_UPDATE_INTERVAL) {
                publishFps()
            }
        } 
    })

    return <Fragment/>
}

export default FPSWatcher