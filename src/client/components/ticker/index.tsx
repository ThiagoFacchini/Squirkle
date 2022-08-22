import React, { useEffect, useContext, Fragment } from 'react'

import SocketStore from './../../stores/socketStore'

const Ticker = () => {

const { socketComponent, updateTickCount } = useContext(SocketStore)

useEffect(() => {
    socketComponent.on('tick', (data) => {
        updateTickCount(data.message)
    })
  }, [socketComponent])

  return <Fragment/>
}

export default Ticker