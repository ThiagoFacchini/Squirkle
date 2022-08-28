import React, { useRef, useEffect, Fragment } from 'react'
import styles from './styles.module.css'

import useCommandLineStore from '../../stores/commandLineStore'
import useSocketStore from '../../stores/socketStore'

const CommandLine = () => {
    const socketComponent = useSocketStore((state) => state.socketComponent)
    const isActive = useCommandLineStore((state) => state.isActive)
    const updateIsActive = useCommandLineStore((state) => state.updateIsActive)

    const commandLineRef: any = useRef()

    useEffect(() => {
        document.removeEventListener('keydown', onKeyDown)
        document.addEventListener('keydown', onKeyDown)        

        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    })


    const onKeyDown = (evt: KeyboardEvent) => {
        switch (evt.key) {
            case 'Enter':
                if (isActive) {
                    sendCommand()
                    document.getElementById('commandLine')?.blur()
                    commandLineRef.current.value = null
                    updateIsActive(false)
                    return
                }
                updateIsActive(true)
                // document.getElementById('commandLine')?.focus()
                return
        }
    }


    const sendCommand = () => {
        socketComponent.emit('commandLine', commandLineRef.current?.value)
    }


    if (isActive) {
        return (
            <div className={ styles.container }>
                <input type="text" ref={ commandLineRef } id={'commandLine'} className={styles.commandLine} autoFocus/>
            </div>
        )
    }

    return <Fragment/>

}

export default CommandLine