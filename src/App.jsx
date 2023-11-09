import { useEffect, useState } from 'react'
import NavBar from './components/Shared/NavBar'
import Footer from './components/Shared/Footer'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  useEffect(() => {
    const originalConsoleWarn = console.warn;

    const warnHandler = (message) => {
      if (message.includes('Unable to find draggable with id: 0')) {
        // Display the warning using react-hot-toast
        toast.error("1st Item is Not Draggable");
      }

      // Call the original console.warn
      originalConsoleWarn.apply(console, [message]);
    };

    console.warn = warnHandler;

    return () => {
      // Reset console.warn to its original state when component unmounts
      console.warn = originalConsoleWarn;
    };
  }, []);

  return (
    <div className='MyContainer mx-auto'>

      <NavBar />

      <div className='min-h-[calc(100vh-100px)] mt-20 z-10'>
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
