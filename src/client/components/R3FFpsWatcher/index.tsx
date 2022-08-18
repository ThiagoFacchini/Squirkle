import React, { useRef, useMemo, Fragment } from 'react'
import { useFrame } from '@react-three/fiber'
import { throttle } from 'lodash'

type PropsType = {
    shouldCalculate: boolean,
    updateCallback: (fps: number) => void
}

const DEFAULT_UPDATE_INTERVAL = 1000

const FPSWatcher = (props: PropsType) => {
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


    const updateFPS = () => {
        let FPSSum: number = 0

        for (let i = 1; i < FPSarr.length; i++) {
            FPSSum += FPSarr[i]
        }

        const FPSAvg = FPSSum / FPSarr.length
        props.updateCallback(parseInt(FPSAvg.toFixed(0))) 
        FPSarr = []
        lastUpdate = Date.now()
    }


    useFrame(() => {
        if (props.shouldCalculate) {
            let currTime = Date.now()

            // Calculates the FPS
            let delta = 1 / ((currTime - lastTime) / 1000)
            lastTime = currTime
            calculateFPS(delta)

            // Check if its time to execute the update callback
            if ((currTime - lastUpdate) > DEFAULT_UPDATE_INTERVAL) {
                updateFPS()
            }
        } 
    })

    return <Fragment/>
}

export default FPSWatcher