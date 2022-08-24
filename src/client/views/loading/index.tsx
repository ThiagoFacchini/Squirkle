import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


import useSocketStore from './../../stores/socketStore'

import styles from './styles.module.css'

const Loading = () => {
  const navigate = useNavigate()
  const isConnected = useSocketStore((state) => state.isConnected)
  const resetSocketComponent = useSocketStore((state) => state.resetSocketComponent)

  useEffect(() => {
    const failTimeout = setTimeout(() => {
      resetSocketComponent()
      navigate('/login')
    }, 5000)

    if (isConnected) {
      navigate('/scene')
    }

    return () => clearTimeout(failTimeout)
  }, [isConnected])


  return (
    <div className={styles.container}>
        Loading
    </div>
  )
}

export default Loading
