import React, { createContext, useState } from "react";
import { isEqual, isUndefined } from 'lodash'

import RootStoreKeys from './rootStore.localStorage'

import MacrosType from './TypeMacros'
import { Socket, io } from "socket.io-client";


type RootStoreType = {
    macros: MacrosType,
    updateMacros: (MacrosType) => void
}


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const DEFAULT_MACROS: MacrosType = {
    debug: false
}
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const RootStore = createContext<RootStoreType>({
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
    // Mock
    const [macros, setMacros] = useState({
        debug: !isUndefined(localStorageMacros) ? localStorageMacros.debug : DEFAULT_MACROS.debug
    })

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