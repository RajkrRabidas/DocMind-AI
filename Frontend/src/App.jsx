import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyOtp from "./pages/VerifyOtp"
import MyProfile from "./pages/MyProfile"
import { AppData } from './context/AppContext'
import Register from './pages/Register'
import Verify from './pages/Verify'

const App = () => {
  const { Loading, isAuth } = AppData()
  
  return (
    <>
      {Loading ? (
        <div className="loading margin-auto ml-2 text-2xl text-black">{"loading..."} </div>
      ) : (
        <Routes>
          <Route path='/' element={isAuth? <Home /> : <Login />} />
          <Route path='/register' element={isAuth? <Home /> : <Register />} />
          <Route path='/login' element={isAuth ? <Home /> : <Login />} />
          <Route path='/verify-otp' element={isAuth ? <Home /> : < VerifyOtp/>} />
          <Route path='/token/:token' element={isAuth ? <Home /> : < Verify/>} />
          <Route path='/me' element={isAuth ? <MyProfile /> : <Login />} />
        </Routes>
      )}
    </>
  )
}

export default App
