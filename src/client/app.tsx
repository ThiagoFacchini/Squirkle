import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'
import { isEmpty } from 'lodash'

import Home from './views/home'
import Sandbox from './views/sandbox'
import NotFound from './views/notfound'
import DebugOverlay from './components/debugOverlay';

import RootStore from './stores/rootStore'
import DebugOverlayStore from './stores/debugOverlayStore';

import useTest from './serviceHooks/useTest'

import styles from './styles.module.css'

const socket: Socket = io('http://localhost:3000')

const App = () => {
    const { isDebugVisible, updateIsDebugVisible, socketComponent, updateSocketComponent } = useContext(RootStore)

    useEffect(() => {
        if (!isEmpty(socket)) updateSocketComponent(socket)
    }, [])

    useEffect(() => {
        console.log('effect run')

        socketComponent.on('dada', (data) => {
            console.log('Message from server')
            console.log(data.message)
        })

        socketComponent.on('tick', (data) => {
            console.log(`tick from server ${data.message}`)
        })
    }, [socketComponent])


    const sendMessage = () => {
        socket.emit('client', {
            message: 'Client message'
        })
    }

    const toggleDebug = () => {
        updateIsDebugVisible(!isDebugVisible)
    }

    const updateTest = useTest()

    return (
        <div className={styles.appContainer}>
            <div onClick={ () => { updateTest() }}>
                click: { JSON.stringify(isDebugVisible) }
            </div>

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