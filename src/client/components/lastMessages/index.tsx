import React, { ReactElement, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { COMMANDS_RESPONSES } from '../../../server/src/definitions/enums'
import useMessagesStore from '../../stores/messageStore'
import useCommandLineStore from '../../stores/commandLineStore'

import styles from './styles.module.css'
import { CompressedPixelFormat } from 'three'


const DISPLAY_TIME = 5000


const LastMessages = () => {
    const messages = useMessagesStore((state) => state.messages)
    const isCommandLineActive = useCommandLineStore((state) => state.isActive)
    
    const [isInitialised, setIsInitialised] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    let timeout
    
    useEffect(() => {
        if (!isInitialised) setIsInitialised(true)
    },[isInitialised])


    useEffect(() => {
        if (isInitialised) {
            if (isVisible) {
                console.log('setting timeout')
                setTimeout(() => {
                    console.log('running timeout')
                    setIsVisible(false)
                }, DISPLAY_TIME)
            }
        }
    }, [isInitialised, isVisible])


    useEffect(() => {
        if (isInitialised) {
            if (!isVisible) {
                setIsVisible(true)
            }
        }

    }, [messages])



    // useEffect(() => {
    //     if (isVisible) {
    //         clearTimeout(timeout)
    //         containerStyle = classNames(styles.container)
    //     }
    // }, [isVisible])


    const renderMessages = () => {
        const messagesArr: Array<ReactElement | undefined> = []

        for (let i = (messages.length -1); i >= 0; i--) {
            let messageStyle = classNames(styles.message)

            if (messages[i].status == COMMANDS_RESPONSES.ERROR) {
                messageStyle = classNames(styles.message, styles.error)
            }

            messagesArr.push(
                <div className={messageStyle} key={i}>
                    [{messages[i].sender}]: {messages[i].message}
                </div>
            )
        }

        return messagesArr        
    }


    let containerStyle = classNames(styles.container)
    if (!isVisible) containerStyle = classNames(styles.container, styles.invisible)
    console.log(containerStyle)
 

    return (
        <div className={containerStyle}>
            <div className={styles.messageContainer}>
                { renderMessages() }
            </div>
        </div>
    )
}
export default LastMessages