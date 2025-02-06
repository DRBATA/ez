// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app.css'

// Import and register the service worker from the PWA plugin
import { registerSW } from 'virtual:pwa-register'
registerSW()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
