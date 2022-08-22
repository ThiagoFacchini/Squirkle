import React, { createContext, useState } from 'react'
import { Socket, io } from "socket.io-client";

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
type SocketStoreType = {
  socketComponent: Socket,
  updateSocketComponent: (string) => void,
  lastRecordedPing: number,
  updateLastRecordedPing: (number) => void,
  tickCount: number,
  updateTickCount: (number) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_SOCKET_COMPONENT = io({ autoConnect: false })
const DEFAULT_LAST_RECORDED_PING = 0
const DEFAULT_TICK_COUNT = 0
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const SocketStore = createContext<SocketStoreType>({
  socketComponent: DEFAULT_SOCKET_COMPONENT,
  updateSocketComponent: () => {},
  lastRecordedPing: DEFAULT_LAST_RECORDED_PING,
  updateLastRecordedPing: () => {},
  tickCount: DEFAULT_TICK_COUNT,
  updateTickCount: () => {}
})
// --------------------------------------------------------


export function SocketStoreProvider({ children }) {
  const [socketComponent, setSocketComponent] = useState<Socket>(DEFAULT_SOCKET_COMPONENT)
  const [lastRecordedPing, setLastRecordedPing] = useState<number>(DEFAULT_LAST_RECORDED_PING)
  const [tickCount, setTickCount] = useState<number>(DEFAULT_TICK_COUNT)
   
  const updateSocketComponent = (serverAddress) => {
    socketComponent.disconnect()
    setSocketComponent(io('localhost:3000', { autoConnect: true }))
  }

  const updateLastRecordedPing = (ping) => setLastRecordedPing(ping)

  const updateTickCount = (tick) => setTickCount(tick)

  return (
    <SocketStore.Provider
      value={
        {
          socketComponent,
          updateSocketComponent,
          lastRecordedPing,
          updateLastRecordedPing,
          tickCount,
          updateTickCount
        }
      }
    >
      { children }
    </SocketStore.Provider>
  )
} 

export default SocketStore