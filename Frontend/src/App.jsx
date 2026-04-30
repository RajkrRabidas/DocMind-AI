import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyOtp from "./pages/VerifyOtp"
import MyProfile from "./pages/MyProfile"
import { AppData } from './context/AppContext'

const App = () => {
  const { loading, isAuth } = AppData()
  return (
    <>
      {loading ? (
        <div className="loading margin-auto ml-2 text-2xl text-black">{"loading..."} </div>
      ) : (
        <Routes>
          <Route path='/' element={isAuth? <Home /> : <Login />} />
          <Route path='/login' element={isAuth ? <Home /> : <Login />} />
          <Route path='/verify-otp' element={isAuth ? <Home /> : < VerifyOtp/>} />
          <Route path='/me' element={isAuth ? <MyProfile /> : <Login />} />
        </Routes>
      )}
    </>
  )
}

export default App
