import create from 'zustand'
import { Socket, io } from "socket.io-client";

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface SocketStoreType {
  socketComponent: Socket,
  updateSocketComponent: (serverAddress: string) => void,
  lastRecordedPing: number,
  updateLastRecordedPing: (ping: number) => void,
  tickCount: number,
  updateTickCount: (tickCount: number) => void
}
// --------------------------------------------------------

// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_SOCKET_COMPONENT = io({ autoConnect: false })
const DEFAULT_LAST_RECORDED_PING = 0
const DEFAULT_TICK_COUNT = 0
// --------------------------------------------------------

export const useSocketStore = create<SocketStoreType>()((set) => ({
  socketComponent: DEFAULT_SOCKET_COMPONENT,
  lastRecordedPing: DEFAULT_LAST_RECORDED_PING,
  tickCount: DEFAULT_TICK_COUNT,
  updateSocketComponent: (serverAddress) => {
    (state) => state.socketComponent.disconnect()
    set((state) => ({ socketComponent: io(serverAddress, { autoConnect: true}) }))
  },
  updateLastRecordedPing: (ping) => set((state) => ({ lastRecordedPing: ping })),
  updateTickCount: (tickCount) => set((state) => ({ tickCount: tickCount }))
}))

export default useSocketStore
