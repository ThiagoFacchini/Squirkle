import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, matchRoutes } from 'react-router-dom'
import { io } from 'socket.io-client'

import Home from './views/home'
import Sandbox from './views/sandbox'
import NotFound from './views/notfound'
import DebugOverlay from './components/debugOverlay';

import RootStore from './stores/rootStore'
import DebugOverlayStore from './stores/debugOverlayStore';

import styles from './styles.module.css'
import Icon from './test.svg'
import myPng from './test.png'

const socket = io('http://localhost:3000')

const App = () => {
    const { userDetails, updateUserDetails, macros, updateMacros } = useContext(RootStore)
    const [ tick, setTick ] = useState(0)
    const { isDebugVisible, updateIsDebugVisible } = useContext(RootStore)
    const { lastRecordedFPS } = useContext(DebugOverlayStore)

    useEffect(() => {
        console.log('effect run')
        socket.on('dada', (data) => {
            console.log('Message from server')
            console.log(data.message)
        })

        socket.on('tick', (data) => {
            console.log(`tick from server ${data.message}`)
        })
    }, [socket])

    console.log('rendered')


    const sendMessage = () => {
        socket.emit('client', {
            message: 'Client message'
        })
    }

    const toggleDebug = () => {
        updateIsDebugVisible(!isDebugVisible)
    }

    return (
        <div className={styles.appContainer}>
            <DebugOverlay />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sandbox' element={<Sandbox />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App