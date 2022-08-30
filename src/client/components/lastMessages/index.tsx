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


    /**
     * This effect triggers the fadeout over the messages after a new message arrives if the command
     * line is NOT active.
     */
    useEffect(() => {
        if (isInitialised) {
            if (isVisible && !isCommandLineActive) {
                fadeOut()
            }
        }
    }, [isInitialised, isVisible, isCommandLineActive])


    /**
     * This effect displays the messages if a new message arrives
     */
    useEffect(() => {
        if (isInitialised) {
            if (!isVisible) {
                setIsVisible(true)
            }
        }

    }, [messages])


    /**
     * This effect displays the messages if the command line becomes active and triggers fadeout if
     * the command line isn't active.
     */
    useEffect(() => {
        if (isInitialised) {
            isCommandLineActive ? setIsVisible(true) : fadeOut()
        }
    }, [isInitialised, isCommandLineActive])


    /**
     * Fades the message container out.
     */
    const fadeOut = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            setIsVisible(false)
        }, DISPLAY_TIME)
    }


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
 

    return (
        <div className={containerStyle}>
            <div className={styles.messageContainer}>
                { renderMessages() }
            </div>
        </div>
    )
}
export default LastMessages