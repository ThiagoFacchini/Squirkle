import React from 'react';
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

const Sandbox = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            SANDBOX
            <div onClick={ () => navigate('/') }>
                Back to Home
            </div>
        </div>
    )
}

export default Sandbox