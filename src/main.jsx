import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initialState, loadData } from './storage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App initialState={loadData() || initialState} />
  </React.StrictMode>,
)
