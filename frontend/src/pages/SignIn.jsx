import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';

import { ClipLoader } from "react-spinners";

const SignUp = () => {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const [showPassword, setshowPassword] = useState(false);
    const [role, setRole] = useState("user");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignIn = async ()=>{
        try {
            setLoading(true);
            const result = await axios.post(`${serverUrl}/api/auth/signin`,{
                email, password
            },{withCredentials: true})
            console.log(result)
            setErr("");
            setLoading(false);
        } catch (error) {
            setErr(error.response?.data?.message || "Something went wrong");
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{ border: `1px solid ${borderColor}` }}>
                <h1 className={`text-3xl font-extrabold mb-2 font-mono`} style={{ color: primaryColor }} >QuickBites</h1>
                <p className='text-gray-600 mb-8'>Login your account to get started with delicious food deliveries.</p>

                {/* Email */}
                <div className='mb-4'>
                    <label htmlFor="Email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Email'
                    style={{border: `1px solid ${borderColor}`}} required
                    onChange={(e)=>{setEmail(e.target.value)}} value={email}
                    />
                </div>

                {/* Password */}
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input type={`${showPassword ? "text":"password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Password'
                    style={{border: `1px solid ${borderColor}`}} required
                    onChange={(e)=>{setPassword(e.target.value)}} value={password}
                    />
                    <button onClick={() => setshowPassword(!showPassword)} className='absolute top-3 right-5 cursor-pointer'>{showPassword ? <FaRegEye /> : <FaEyeSlash />}</button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className='text-right mb-2 text-[#ff4d2d] cursor-pointer'>
                    <p className='underline' onClick={()=>{navigate("/forgot-password")}}>Forgot Password</p>
                </div>

                {/* SignIn Button */}
                <button onClick={handleSignIn} className='w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] hover:scale-95'>
                    {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
                </button>
                {err && <p className='text-red-500 text-center'>*{err}</p>}
                <button className='flex gap-2 cursor-pointer w-full mt-4 items-center justify-center border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100'>
                    <FcGoogle size={25} />
                    <span>Continue with Google</span>
                </button>
                <p className='text-center mt-5'>Want to create a new account ? <span onClick={()=>{navigate("/signup")}} className='text-[#ff4d2d] cursor-pointer '>Sign Up</span></p>
            </div>
        </div>
    )
}

export default SignUp;