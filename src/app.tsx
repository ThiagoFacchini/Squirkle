import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from './views/home'
import Sandbox from './views/sandbox'
import NotFound from './views/notfound'

import styles from './styles.modules.css'

const App = () => {

    return (
        <div className={styles.appContainer}>
            APP.TSX
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sandbox' element={<Sandbox />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
    )
}

export default App
