import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import { RootStoreProvider } from './stores/rootStore';

import App from './app'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Failed to find root element')
const root = createRoot(rootEl)

// root.render(
//     <React.StrictMode>
//         <RootStoreProvider>
//             <BrowserRouter>
//                 <App/>
//             </BrowserRouter>
//         </RootStoreProvider>
//     </React.StrictMode>
// )

root.render(
    <RootStoreProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </RootStoreProvider>
)