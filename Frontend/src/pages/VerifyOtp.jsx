import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";  
import { serverUrl } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handelSubmit = async (e) => {
    setBtnLoading(true)
    e.preventDefault()

    const email = localStorage.getItem("email")
    try{
      const {data} = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email, otp}, {
        withCredentials: true
      })
      localStorage.clear("email")
      toast.success(data.message)
    }catch(error){
      toast.error(error?.response?.data?.message || "Verification failed. Please try again.")
    }finally{
      setBtnLoading(false)
    }
  }
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-4xl text-white">
            Verify OTP with email sent to you
          </h1>
        </div>
        <form
          onSubmit={handelSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <h2 className="text-white text-lg font-medium title-font mb-5">
            Verify OTP
          </h2>
          <div className="relative mb-4">
            <label htmlFor="otp" className="leading-7 text-sm text-gray-400">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
            {btnLoading ? "Verifying" : "Verify"}
          </button>
          <p className="text-xs mt-3">
            alredy have an account? <Link to="/login" className="text-green-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default VerifyOtp
