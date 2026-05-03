import React from 'react'
import { AppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const { logout } = AppData();
  const navigate = useNavigate();
  return (
    <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={() => logout(navigate)}
    >
      Logout
    </button>
    </div>
  )
}

export default Home