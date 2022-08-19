import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import composeProviders from './utils/composeProviders'

import { RootStoreProvider } from './stores/rootStore';
import { DebugOverlayProvider } from './stores/debugOverlayStore';

import App from './app'


const CombinedProviders = composeProviders([
    RootStoreProvider,
    DebugOverlayProvider
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

// Prod mode
root.render(
    <CombinedProviders>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </CombinedProviders>
)