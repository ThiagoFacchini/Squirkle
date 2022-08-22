import React, { useContext, Fragment } from 'react'

import WindowsStore from './../../stores/windowsStore'

const GridHelper = () => {
  const { isDebugOverlayVisible } = useContext(WindowsStore)

  if (isDebugOverlayVisible) {
    return (
      <gridHelper args={[10, 10]} />
    )
  } else {
    return <Fragment/>
  }
}

export default GridHelper