import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface LoginStoreType {
  username: string,
  updateUsername: (username: string) => void,
  password: string,
  updatePassword: (password: string) => void,
  serverAddress: string,
  updateServerAddress: (serverAddress: string) => void
}
// --------------------------------------------------------


// --------------------------------------------------------
// Local Storage Definitions
// --------------------------------------------------------
const LS_STORE_KEY = 'loginStore_'
const LS_USERNAME = 'username'
const LS_PASSWORD = 'password'
const LS_SERVER_ADDRESS = 'serverAddress'
// --------------------------------------------------------


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_USERNAME = localStorage.getItem(`${LS_STORE_KEY}${LS_USERNAME}`) || ''
const DEFAULT_PASSWORD = localStorage.getItem(`${LS_STORE_KEY}${LS_PASSWORD}`) || ''
const DEFAULT_SERVER_ADDRESS = localStorage.getItem(`${LS_STORE_KEY}${LS_SERVER_ADDRESS}`) || 'localhost:3000'
// --------------------------------------------------------

export const useLoginStore = create<LoginStoreType>((set) => ({
  username: DEFAULT_USERNAME,
  password: DEFAULT_PASSWORD,
  serverAddress: DEFAULT_SERVER_ADDRESS,
  updateUsername: (username) => {
    localStorage.setItem(`${LS_STORE_KEY}${LS_USERNAME}`, username)
    set((state) => ({ username: DEFAULT_USERNAME }))
  },
  updatePassword: (password) => {
    localStorage.setItem(`${LS_STORE_KEY}${LS_PASSWORD}`, password)
    set((state) => ({ password: DEFAULT_PASSWORD }))
  },
  updateServerAddress: (serverAddress) => {
    localStorage.setItem(`${LS_STORE_KEY}${LS_SERVER_ADDRESS}`, serverAddress)
    set((state) => ({ serverAddress: DEFAULT_SERVER_ADDRESS }))
  }
}))

export default useLoginStore
