import React, { useContext, Fragment } from 'react'

import useWindowsStore from './../../stores/windowsStore'

const AxisHelper = () => {
  const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

  if (isDebugOverlayVisible) {
    return (
        <axesHelper args={[3]}/>
    )
  } else {
    return <Fragment/>
  }
}

export default AxisHelper