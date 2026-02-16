import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';

import { setUserData } from '../redux/userSlice';

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
    const dispatch = useDispatch();

    const handleSignUp = async ()=>{
        try {
            setLoading(true);
            const result = await axios.post(`${serverUrl}/api/auth/signup`,{
                fullName, email, password, role, mobile
            },{withCredentials: true})
            setErr("");
            // console.log(result)
            dispatch(setUserData(result.data));
            setLoading(false);
        } catch (error) {
            setErr(error.response?.data?.message || "Something went wrong");
            console.log(error)
            setLoading(false);
        }
    }

    const handleGoogleAuth = async () =>{
        setLoading(true);
        try {
            if(!mobile){
                setLoading(false);
                return setErr("Mobile Field Required!");
            }
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // console.log(result);
            const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            },{withCredentials: true})
            setErr("");
            // console.log(data)
            dispatch(setUserData(data));
            setLoading(false);
        } catch (error) {
            setErr(error.response?.data?.message || "Something went wrong");
            console.log(`Handle Google Auth Function error ${error}`);
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `} style={{ border: `1px solid ${borderColor}` }}>
                <h1 className={`text-3xl font-extrabold mb-2 font-mono`} style={{ color: primaryColor }} >QuickBites</h1>
                <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries.</p>

                {/* Full Name */}
                <div className='mb-4'>
                    <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1' >Full Name</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Full Name'
                    style={{border: `1px solid ${borderColor}`}} required
                    onChange={(e)=>{setFullName(e.target.value)}} value={fullName}
                    />
                </div>

                {/* Email */}
                <div className='mb-4'>
                    <label htmlFor="Email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Email'
                    style={{border: `1px solid ${borderColor}`}} required
                    onChange={(e)=>{setEmail(e.target.value)}} value={email}
                    />
                </div>

                {/* Mobile */}
                <div className='mb-4'>
                    <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile Number</label>
                    <input type="tel" className='w-full border rounded-lg px-3 py-2 focus:outline-orange-500' placeholder='Enter your Mobile Number'
                    style={{border: `1px solid ${borderColor}`}} required
                    onChange={(e)=>{setMobile(e.target.value)}} value={mobile}
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

                {/* Role */}
                <div className='mb-4'>
                    <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
                    <div className='flex gap-2'>
                        {["user","owner","deliveryBoy"].map((r)=>(
                            <button
                            key={r}
                            className='flex-1 border rounded-lg cursor-pointer px-3 py-2 text-center font-medium transition-colors'
                            onClick={()=>{setRole(r)}}
                            style={
                                role === r?
                                {backgroundColor: primaryColor, color: "white"}
                                : {border: `1px solid ${primaryColor}`, color:primaryColor}
                            }
                            >{r}</button>
                        ))}
                    </div>
                </div>

                {/* SignUp Button */}
                <button disabled= {loading} onClick={handleSignUp} className='w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] hover:scale-95'>
                    {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
                </button>
                {err && <p className='text-red-500 text-center'>*{err}</p>}
                <button disabled= {loading}  onClick={handleGoogleAuth} className='flex gap-2 cursor-pointer w-full mt-4 items-center justify-center border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100'>
                    {loading ? <ClipLoader size={20} color='white' /> : <>
                    <FcGoogle size={25} />
                    <span>Continue with Google</span>
                    </>}
                </button>
                <p className='text-center mt-5'>Already have an account ? <span onClick={()=>{navigate("/signin")}} className='text-[#ff4d2d] cursor-pointer '>Sign In</span></p>
            </div>
        </div>
    )
}

export default SignUp;