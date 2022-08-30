import create from 'zustand'
import { COMMANDS_RESPONSES } from '../../server/src/definitions/enums'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface MessageStoreType {
  messages: MessageType[],
  addMessage: (message: MessageType) => void
}

export type MessageType = {
  status: COMMANDS_RESPONSES,
  message: string,
  sender: string
}
// --------------------------------------------------------


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_ACTIVE = false
// --------------------------------------------------------

export const useMessagesStore = create<MessageStoreType>((set) => ({
  messages: [],
  addMessage: (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        message
      ]
    }))
  }
}))

export default useMessagesStore
