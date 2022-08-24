import create from 'zustand'
import { Socket, io } from "socket.io-client";

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface SocketStoreType {
  socketComponent: Socket,
  isConnected: boolean,
  lastRecordedPing: number,
  tickCount: number,
  updateSocketComponent: (serverAddress: string) => void,
  resetSocketComponent: () => void,
  updateIsConnected: (isConnected: boolean) => void,
  updateLastRecordedPing: (ping: number) => void,
  updateTickCount: (tickCount: number) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_SOCKET_COMPONENT = io({ 
  autoConnect: false,
  reconnection: false
})
const DEFAULT_IS_CONNECTED = false
const DEFAULT_LAST_RECORDED_PING = 0
const DEFAULT_TICK_COUNT = 0
// --------------------------------------------------------

export const useSocketStore = create<SocketStoreType>()((set) => ({
  socketComponent: DEFAULT_SOCKET_COMPONENT,
  isConnected: DEFAULT_IS_CONNECTED,
  lastRecordedPing: DEFAULT_LAST_RECORDED_PING,
  tickCount: DEFAULT_TICK_COUNT,
  updateSocketComponent: (serverAddress) => {
    set((state) => { 
      state.socketComponent.disconnect()
      return { socketComponent: io(serverAddress, { autoConnect: true}) }
    })
  },
  resetSocketComponent: () => { 
    set((state) => {
      state.socketComponent.disconnect()
      return {}
    })
  },
  updateIsConnected: (isConnected) => set((state) => ({ isConnected: isConnected })),
  updateLastRecordedPing: (ping) => set((state) => ({ lastRecordedPing: ping })),
  updateTickCount: (tickCount) => set((state) => ({ tickCount: tickCount }))
}))

export default useSocketStore
