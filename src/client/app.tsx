import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Socket from './components/socket'
import PlayerController from './components/playerController'

import Home from './views/home'
import Login from './views/login'
import Loading from './views/loading'
import Scene from './views/scene'
import Sandbox from './views/sandbox'
import NotFound from './views/notfound'

// import useTest from './serviceHooks/useTest'

import styles from './styles.module.css'


const App = () => {
    console.log('[APP] Rendered')
    // const updateTest = useTest()

    return (
        <div className={styles.appContainer}>
            {/* Controls in General */}
            <Socket />
            <PlayerController />

            <Routes>
                <Route path='/' element={<Home />} /> 
                <Route path='/login' element={<Login />} />
                <Route path='/loading' element={<Loading />} />
                <Route path='/scene' element={<Scene />} />
                <Route path='/sandbox' element={<Sandbox />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App