import React, { useEffect, useContext, Fragment } from 'react'

import useSocketStore from './../../stores/socketStore'

const Ticker = () => {

  const socketComponent = useSocketStore((state) => state.socketComponent)
  const tickCount = useSocketStore((state) => state.tickCount)
  const updateTickCount = useSocketStore((state) => state.updateTickCount)

  useEffect(() => {
    socketComponent.on('tick', (data) => {
      updateTickCount(data.message)
    })
  }, [socketComponent])

  return <Fragment/>
}

export default Ticker