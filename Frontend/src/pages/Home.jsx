import React from 'react'
import { AppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const { logoutUser } = AppData();
  return (
    <div>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={logoutUser}
    >
      Logout
    </button>
    </div>
  )
}

export default Home