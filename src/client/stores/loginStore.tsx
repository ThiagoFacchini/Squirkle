import React, { createContext, useState } from 'react'

// --------------------------------------------------------
// Type Definitions
// --------------------------------------------------------
type LoginStoreType = {
  username: string,
  updateUsername: (string) => void,
  password: string,
  updatePassword: (string) => void,
  serverAddress: string,
  updateServerAddress: (string) => void
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
const DEFAULT_USERNAME = ''
const DEFAULT_PASSWORD = ''
const DEFAULT_SERVER_ADDRESS = 'localhost:3000'
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const LoginStore = createContext<LoginStoreType>({
  username: DEFAULT_USERNAME,
  updateUsername: () => {},
  password: DEFAULT_PASSWORD,
  updatePassword: () => {},
  serverAddress: DEFAULT_SERVER_ADDRESS,
  updateServerAddress: () => {}
})
// --------------------------------------------------------


export function LoginStoreProvider({ children }) {
    const [username, setUsername] = useState<string>(localStorage.getItem(`${LS_STORE_KEY}${LS_USERNAME}`) || DEFAULT_USERNAME)
    const [password, setPassword] = useState<string>(localStorage.getItem(`${LS_STORE_KEY}${LS_PASSWORD}`) || DEFAULT_PASSWORD)
    const [serverAddress, setServerAddress] = useState<string>(localStorage.getItem(`${LS_STORE_KEY}${LS_SERVER_ADDRESS}`) || DEFAULT_SERVER_ADDRESS)

    const updateUsername = (username) => {
      localStorage.setItem(`${LS_STORE_KEY}${LS_USERNAME}`, username)
      setUsername(username)
    }
    const updatePassword = (password) => {
      localStorage.setItem(`${LS_STORE_KEY}${LS_PASSWORD}`, password)
      setPassword(password)
    }
    const updateServerAddress = (serverAddress) => {
      localStorage.setItem(`${LS_STORE_KEY}${LS_SERVER_ADDRESS}`, serverAddress)
      setServerAddress(serverAddress)
    }

    return (
        <LoginStore.Provider
            value={
                {
                  username,
                  updateUsername,
                  password,
                  updatePassword,
                  serverAddress,
                  updateServerAddress
                }
            }
        >
            { children }
        </LoginStore.Provider>
    )
}

export default LoginStore