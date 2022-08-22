import React, { useEffect, useContext, Fragment } from 'react'
import useBearStore from 'zustand'

import {tickStore} from './../../stores/zustandTick'
import SocketStore from './../../stores/socketStore'

const Ticker = () => {

  const { socketComponent, updateTickCount, tickCount } = useContext(SocketStore)
  const update = useBearStore((state) => state.updateTick)

  useEffect(() => {
    socketComponent.on('tick', (data) => {
      updateTickCount(data.message)
    })
  }, [socketComponent])

  // update(tickCount)
  console.log(update)

  return <Fragment/>
}

export default Ticker