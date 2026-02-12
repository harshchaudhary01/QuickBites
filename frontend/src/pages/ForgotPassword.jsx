import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";

import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { serverUrl } from '../App';

import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
      console.log(result);
      setErr("");
      setLoading(false)
      setStep(2);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message || "Something went wrong");
    }
  }

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, OTP }, { withCredentials: true })
      console.log(result)
      setLoading(false)
      setStep(3);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message || "Something went wrong");
    }
  }

  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
      console.log(result)
      setErr("");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8 '>
        <div className='mb-4 flex items-center gap-4'>
          <IoArrowBack onClick={() => { navigate("/signin") }} className='cursor-pointer' size={25} />
          <h1 className='text-xl font-medium'>Forgot Password</h1>
        </div>

        {step === 1 && (
          <>
            {/* Email */}
            <div className='mb-4'>
              <label htmlFor="Email" className='block text-gray-700 font-medium mb-1'>
                Email
              </label>
              <input
                type="email"
                className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500 border-gray-400 h-12'
                placeholder='Enter your Email'
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
              />
              {err && <p className='text-red-500'>*{err}</p>}
            </div>

            {/* Button */}
            <button className='w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] hover:scale-95'
              onClick={handleSendOtp}
              disabled= {loading}
            >
              {loading ? <ClipLoader size={20} color='white' /> : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Email */}
            <div className='mb-4'>
              <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>
                OTP
              </label>
              <input
                type="text"
                className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500 border-gray-400 h-12'
                placeholder='Enter your OTP'
                onChange={(e) => setOTP(e.target.value)}
                required
                value={OTP}
              />
              {err && <p className='text-red-500'>*{err}</p>}
            </div>

            {/* Button */}
            <button className='w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] hover:scale-95'
              onClick={handleVerifyOtp}
              disabled= {loading}
            >
              {loading ? <ClipLoader size={20} color='white' /> : "Verify OTP"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            {/* Password */}
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
              <div className='relative'>
                <input type={`${showPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Password'
                  onChange={(e) => { setNewPassword(e.target.value) }} value={newPassword}
                  required
                />
                <button onClick={() => setshowPassword(!showPassword)} className='absolute top-3 right-5 cursor-pointer'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
            {/* Password */}
            <div className='mb-4'>
              <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
              <div className='relative'>
                <input type={`${showConfirmPassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Password'
                  onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword}
                  required
                />
                <button onClick={() => setshowPassword(!showPassword)} className='absolute top-3 right-5 cursor-pointer'>{showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
              </div>
            </div>

            {err && <p className='text-red-500'>*{err}</p>}

            {/* Button */}
            <button className='w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] hover:scale-95'
              onClick={handleResetPassword}
              disabled= {loading}
            >
              {loading ? <ClipLoader size={20} color='white' /> : "Reset Password"}
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword;