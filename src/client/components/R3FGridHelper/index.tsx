import React, { useContext, Fragment } from 'react'

import useWindowsStore from './../../stores/windowsStore'

const GridHelper = () => {
  const isDebugOverlayVisible = useWindowsStore((state) => state.isDebugOverlayVisible)

  if (isDebugOverlayVisible) {
    return (
      <gridHelper args={[10, 10]} />
    )
  } else {
    return <Fragment/>
  }
}

export default GridHelper