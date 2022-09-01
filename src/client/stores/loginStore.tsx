import create from 'zustand'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
interface LoginStoreType {
  username: string,
  password: string,
  serverAddress: string,
  isAuthenticated: boolean,
  updateUsername: (username: string) => void,
  updatePassword: (password: string) => void,
  updateServerAddress: (serverAddress: string) => void,
  updateIsAuthenticated: (isAuthenticated: boolean) => void
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
const DEFAULT_IS_AUTHENTICATED = false
// --------------------------------------------------------

export const useLoginStore = create<LoginStoreType>((set) => ({
  username: DEFAULT_USERNAME,
  password: DEFAULT_PASSWORD,
  serverAddress: DEFAULT_SERVER_ADDRESS,
  isAuthenticated: DEFAULT_IS_AUTHENTICATED,
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
  },
  updateIsAuthenticated: (isAuthenticated) => set((state) => ({ isAuthenticated: isAuthenticated })),
}))

export default useLoginStore
