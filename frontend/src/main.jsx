import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import { TokenProvider } from './contexts/tokenContexts'

import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

      <TokenProvider>
    <App />
      </TokenProvider>
  </BrowserRouter>,
)
