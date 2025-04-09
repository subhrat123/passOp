import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navbar from "./component/Navbar"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <App />
  </React.StrictMode>,
)
