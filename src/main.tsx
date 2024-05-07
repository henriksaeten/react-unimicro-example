import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OIDC_CONFIG } from './environment.ts'
import { AuthProvider } from 'react-oidc-context'
import { BrowserRouter } from 'react-router-dom'

function clearQueryParams() {
    location.href = '/';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...OIDC_CONFIG } onSigninCallback={clearQueryParams}>
            <BrowserRouter>
            <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
)
