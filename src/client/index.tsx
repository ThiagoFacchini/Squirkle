import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import composeProviders from './utils/composeProviders'

import { LoginStoreProvider } from './stores/loginStore' 
import { SocketStoreProvider } from './stores/socketStore'
import { SceneStoreProvider } from './stores/sceneStore'
import { WindowsStoreProvider } from './stores/windowsStore'

import { RootStoreProvider } from './stores/rootStore';

import App from './app'


const CombinedProviders = composeProviders([
    LoginStoreProvider,
    SocketStoreProvider,
    SceneStoreProvider,
    WindowsStoreProvider,
    RootStoreProvider
])


const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Failed to find root element')
const root = createRoot(rootEl)


// Dev mode
// root.render(
//     <React.StrictMode>
//         <RootStoreProvider>
//             <BrowserRouter>
//                 <App/>
//             </BrowserRouter>
//         </RootStoreProvider>
//     </React.StrictMode>
// )

console.log('Index re rendered...')
// Prod mode
root.render(
    <CombinedProviders>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </CombinedProviders>
)