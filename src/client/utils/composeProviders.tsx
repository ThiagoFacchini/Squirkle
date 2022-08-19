import React from 'react'

const composeProviders = (providers) => 
    providers.reduce((Prev, Curr) => ({ children }) => (
        <Prev>
            <Curr>{ children }</Curr>
        </Prev>
    ))

export default composeProviders