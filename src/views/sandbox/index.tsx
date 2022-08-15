import React from 'react';
import styles from './styles.modules.css'

const Sandbox = () => {
    console.log(styles)

    return (
        <div className={styles.container}>
            SANDBOX
        </div>
    )
}

export default Sandbox