import React, { useRef, useContext, useState, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import { isNull, isEmpty } from 'lodash'

import LoginStore from './../../stores/loginStore'
import SocketStore from './../../stores/socketStore'

import styles from './styles.module.css'


const Login = () => {
  const { username, updateUsername, password, updatePassword, serverAddress, updateServerAddress } = useContext(LoginStore)
  const { socketComponent, updateSocketComponent } = useContext(SocketStore)
  const [reason, setReason] = useState<string>()

  const navigate = useNavigate()

  const usernameRef: any = useRef()
  const passwordRef: any = useRef()
  const serverAddressRef: any = useRef()


  const tryLogin = () => {
    let shouldSubmit = true
  

    if (!usernameRef.current || isEmpty(usernameRef.current.value) || isNull(usernameRef.current.value)) {
      shouldSubmit = false
      setReason('username must not be null')
      return
    }

    if (!passwordRef.current || isEmpty(passwordRef.current.value) || isNull(passwordRef.current.value)) {
      shouldSubmit = false
      setReason('password must not be null')
      return
    }

    if (!serverAddressRef.current || isEmpty(serverAddressRef.current.value) || isNull(serverAddressRef.current.value)) {
      shouldSubmit = false
      setReason('Server Address must not be null')
      return
    }

    if (shouldSubmit) {
      setReason('')
      updateUsername(usernameRef.current.value)
      updatePassword(passwordRef.current.value)
      updateServerAddress(serverAddressRef.current.value)
      updateSocketComponent(serverAddressRef.current.value)
      navigate('/loading')
    }

  }

  const shouldRenderReason = useCallback(() => {
    if (isEmpty(reason)) {
      return <Fragment />
    } else {
      return (
        <div className={styles.messageContainer}>
          { reason }
        </div>
      )
    }
  }, [reason])

  return (
      <div className={styles.container}>
        { shouldRenderReason() }
        <div className={styles.formSection}>
          <div className={styles.label}>
            Username:
          </div>
          <div className={styles.inputContainer}>
            <input type='text' ref={usernameRef} defaultValue={username}/>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.label}>
            Password:
          </div>
          <div className={styles.inputContainer}>
            <input type='text' ref={passwordRef} defaultValue={password} />
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.label}>
            Server Address:
          </div>
          <div className={styles.inputContainer}>
          <input type='text' ref={serverAddressRef} defaultValue={serverAddress} />
          </div>
        </div>

        <div className={styles.button} onClick={ () => tryLogin() }>
          Login
        </div>

      </div>
  )
}

export default Login