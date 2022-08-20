import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Socket, io } from 'socket.io-client'
import { isEmpty } from 'lodash'

import Home from './views/home'
import Sandbox from './views/sandbox'
import NotFound from './views/notfound'
import DebugOverlay from './components/debugOverlay';

import RootStore from './stores/rootStore'

import useTest from './serviceHooks/useTest'

import styles from './styles.module.css'

const socket: Socket = io('http://10.0.1.11:3000')

const App = () => {
    // console.log('App Re rendered...')
    const {  updateSocketComponent } = useContext(RootStore)

    useEffect(() => {
        if (!isEmpty(socket)) updateSocketComponent(socket)
    }, [])

    // const sendMessage = () => {
    //     socket.emit('client', {
    //         message: 'Client message'
    //     })
    // }

    // const toggleDebug = () => {
    //     updateIsDebugVisible(!isDebugVisible)
    // }

    const updateTest = useTest()

    return (
        <div className={styles.appContainer}>
            <div onClick={ () => { updateTest() }}>
                click to toggle
            </div>

            <DebugOverlay />
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/login' element={<Login />} />
                <Route path='/loading' element={<Loading />} /> */}
                <Route path='/sandbox' element={<Sandbox />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App