import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initialState, savedData } from './storage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App initialState={savedData() || initialState} />
  </React.StrictMode>,
)
