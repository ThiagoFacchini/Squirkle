import React, { useRef, useContext, useState, Fragment, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { isNull, isEmpty } from 'lodash'


import styles from './styles.module.css'

const Loading = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate('/scene')
  }, 1000)

  return (
    <div className={styles.container}>
        Loading
    </div>
  )
}

export default Loading
