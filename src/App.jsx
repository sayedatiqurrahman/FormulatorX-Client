import { useState } from 'react'
import NavBar from './components/Shared/NavBar'
import Footer from './components/Shared/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='MyContainer mx-auto'>

      <NavBar />

      <div className='min-h-[calc(100vh-100px)] mt-20 z-10'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
