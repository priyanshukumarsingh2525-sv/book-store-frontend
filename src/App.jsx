
import { Outlet } from 'react-router'
import './App.css'

import Navbar from './Components/Navbar'
import { AuthProvide } from './context/AuthContext'
import Footer from './Components/Footer'

function App() {
  
  return (
    <>
    <AuthProvide>
      <Navbar/>
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
        <Outlet/>
        </main> 
     <Footer/>

    </AuthProvide>
    
    </>
  )
}

export default App
