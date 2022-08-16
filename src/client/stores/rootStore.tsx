import React, { createContext, useState } from "react";
import { isEqual, isUndefined } from 'lodash'

import RootStoreKeys from './rootStore.localStorage'

import UserDetailsType from './TypeUserDetails'
import MacrosType from './TypeMacros'


type RootStoreType = {
    userDetails: UserDetailsType,
    updateUserDetails: (UserDetailsType) => void,
    macros: MacrosType,
    updateMacros: (MacrosType) => void
}


// --------------------------------------------------------
// Default Values
// --------------------------------------------------------
const defaultUserDetails = {
    isLogged: false,
    username: null,
    authToken: null
}

const defaultMacros: MacrosType = {
    debug: false
}
// --------------------------------------------------------


// --------------------------------------------------------
// Store Initialization
// --------------------------------------------------------
const RootStore = createContext<RootStoreType>({
    userDetails: defaultUserDetails,
    updateUserDetails: () => {},
    macros: defaultMacros,
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

    const [userDetails, setUserDetails] = useState<UserDetailsType>(defaultUserDetails)

    const [macros, setMacros] = useState({
        debug: !isUndefined(localStorageMacros) ? localStorageMacros.debug : defaultMacros.debug
    })


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
 
    return (
        <RootStore.Provider
            value={
                {
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