import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './app'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Failed to find root element')
const root = createRoot(rootEl)


// Dev mode
// root.render(
//     <React.StrictMode>
        // <BrowserRouter>
        //     <App/>
        // </BrowserRouter>
//     </React.StrictMode>
// )

console.log('Index re rendered...')
// Prod mode
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)