import React, { useContext, Fragment } from 'react'

import WindowsStore from './../../stores/windowsStore'

const AxisHelper = () => {
  const { isDebugOverlayVisible } = useContext(WindowsStore)

  if (isDebugOverlayVisible) {
    return (
        <axesHelper args={[3]}/>
    )
  } else {
    return <Fragment/>
  }
}

export default AxisHelper