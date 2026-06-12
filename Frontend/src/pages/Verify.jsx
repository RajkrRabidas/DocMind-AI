import React, { useEffect } from 'react'
import {serverUrl} from "../main"
import { useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const params = useParams()

  async function verifyUser(){
    try {
      const {data} = await axios.post(`${serverUrl}/api/auth/verify/${params.token}`)

      setSuccessMessage(data.message)
      navigate("/login")
      toast.success("Email verified successfully. Please login.")
    }catch (error) {
      setErrorMessage(error.response.data.message)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])
  
  return (
    <>
      {loading ? (
        <div className="loading margin-auto ml-2 text-2xl text-black">{"loading..."} </div>
      ) : successMessage ? (
        <div className="success margin-auto ml-2 text-2xl text-green-500">{successMessage} </div>
      ) : errorMessage ? (
        <div className="error margin-auto ml-2 text-2xl text-red-500">{errorMessage} </div>
      ) : null}
    </>
  )
}

export default Verify