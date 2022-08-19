import { useContext } from 'react'

import RootStore from './../stores/rootStore'

function outsideLogic(updateCb, currState) {
  updateCb(!currState)
}


const useTest = () => {
  const store = useContext(RootStore)
  return () => outsideLogic(store.updateIsDebugVisible, store.isDebugVisible)
}

export default useTest