import React, { useContext, useEffect } from 'react';
import { Routes, Route, matchRoutes } from 'react-router-dom'
import { io } from 'socket.io-client'

import Home from './views/home'
import Sandbox from './views/sandbox'
import NotFound from './views/notfound'

import RootStore from './stores/rootStore'

import styles from './styles.modules.css'

const socket = io('http://localhost:3000')

const App = () => {
    const { userDetails, updateUserDetails, macros, updateMacros } = useContext(RootStore)

    useEffect(() => {
        console.log('effect run')
        socket.on('dada', (data) => {
            console.log('Message from server')
            console.log(data.message)
        })
    }, [socket])


    const sendMessage = () => {
        socket.emit('client', {
            message: 'Client message'
        })
    }

    return (
        <div className={styles.appContainer}>
            APP.TSX
            username: { userDetails.username }
            authToken: { userDetails.authToken }
            Is logged: { userDetails.isLogged }
            <div onClick={ () => updateUserDetails({ username: 'xdontboot', authToken: '123098', isLogged: 'true' })}>
                Update
            </div>
            Macro Debug: { macros.debug }
            <div onClick={ () => updateMacros({ debug: 'blah' })}> Macro Update </div>
            <div onClick={ sendMessage }> sendMessage </div>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sandbox' element={<Sandbox />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App