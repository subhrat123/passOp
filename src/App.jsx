import { useState } from 'react'
import './App.css'
import Navbar from "./component/Navbar"
import Manager from "./component/Manager"
function App() {
 

  return (
    <>
      <Navbar/>
      <div>
        <Manager/>
      </div>
      <footer/>
    </>
  )
}

export default App
