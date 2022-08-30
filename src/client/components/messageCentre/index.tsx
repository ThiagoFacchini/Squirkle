import React from 'React'

import CommandLine from './../commandLine'
import LastMessages from './../lastMessages'

import styles from './styles.module.css'

const MessageCentre = () => {
    return (
        <div className={styles.container}>
            <LastMessages />
            <CommandLine />
        </div>
    )
}

export default MessageCentre