import { useEffect } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import  {Toaster} from 'react-hot-toast'
import { LuLoaderCircle } from "react-icons/lu"

import { useAuthStore } from './stores/useAuthStore'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'


export default function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  return isCheckingAuth && !authUser 
    ? (
        <div className='flex justify-center items-center h-screen'>
          <LuLoaderCircle className="size-10 animate-spin" />
        </div>
      )
    : (<div>
          <Navbar />
          <Routes >
            <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
            <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
            <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
          </Routes>
          <Toaster />
        </div>
      )
}
