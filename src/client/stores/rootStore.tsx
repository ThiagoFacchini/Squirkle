import React, { createContext, useState } from "react";
import { isEqual, isUndefined } from 'lodash'

import RootStoreKeys from './rootStore.localStorage'

import UserDetailsType from './TypeUserDetails'
import MacrosType from './TypeMacros'
import { Socket, io } from "socket.io-client";


type RootStoreType = {
    isDebugVisible: boolean,
    updateIsDebugVisible: (boolean) => void,
    socketComponent: Socket,
    updateSocketComponent: (Socker) => void, 
    userDetails: UserDetailsType,
    updateUserDetails: (UserDetailsType) => void,
    macros: MacrosType,
    updateMacros: (MacrosType) => void
}


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_IS_DEBUG_VISIBLE = true

const DEFAULT_SOCKET_COMPONENT = io()

const DEFAULT_USER_DETAILS = {
    isLogged: false,
    username: null,
    authToken: null
}

const DEFAULT_MACROS: MacrosType = {
    debug: false
}
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const RootStore = createContext<RootStoreType>({
    isDebugVisible: DEFAULT_IS_DEBUG_VISIBLE,
    updateIsDebugVisible: () => {},
    socketComponent: DEFAULT_SOCKET_COMPONENT,
    updateSocketComponent: () => {},
    userDetails: DEFAULT_USER_DETAILS,
    updateUserDetails: () => {},
    macros: DEFAULT_MACROS,
    updateMacros: () => {}
})
// --------------------------------------------------------


// --------------------------------------------------------
// Rehydration
// --------------------------------------------------------
let localStorageMacros

if (!isUndefined(localStorage.getItem(RootStoreKeys.macros))) {
    let localStorageMacroStr = localStorage.getItem(RootStoreKeys.macros) 
    if (localStorageMacroStr) localStorageMacros = JSON.parse(localStorageMacroStr)
}
// --------------------------------------------------------


export function RootStoreProvider({ children })  {

    const [isDebugVisible, setIsDebugVisible] = useState<boolean>(DEFAULT_IS_DEBUG_VISIBLE)
    const [socketComponent, setSocketComponent] = useState<Socket>(DEFAULT_SOCKET_COMPONENT)

    // Mock
    const [userDetails, setUserDetails] = useState<UserDetailsType>(DEFAULT_USER_DETAILS)

    const [macros, setMacros] = useState({
        debug: !isUndefined(localStorageMacros) ? localStorageMacros.debug : DEFAULT_MACROS.debug
    })
    // End Mock

    const updateIsDebugVisible = (isVisible) => setIsDebugVisible(isVisible)
    const updateSocketComponent = (socket) => setSocketComponent(socket)

    // Mock
    const updateUserDetails = (newDetails) => {
        setUserDetails((prevState) => { 
            return { ...prevState, ...newDetails }
        })
    }

    const updateMacros = (newMacros) => {
        setMacros((prevState) => {
            if (!isEqual(prevState, newMacros)) {
                localStorage.setItem(RootStoreKeys.macros, JSON.stringify(newMacros))
                console.log('LocalStorage updated')
            }
        return { ...prevState, ...newMacros }
        })
    }
    // End Mock
 
    return (
        <RootStore.Provider
            value={
                {
                    isDebugVisible,
                    updateIsDebugVisible,
                    socketComponent,
                    updateSocketComponent,
                    userDetails,
                    updateUserDetails,
                    macros,
                    updateMacros
                }
            }
        >
            { children }
        </RootStore.Provider>
    )
}

export default RootStore