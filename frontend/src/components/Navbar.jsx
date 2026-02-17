import React, { useState } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { serverUrl } from '../App';

const Navbar = () => {
    const { userData, city } = useSelector(state => state.user);
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const dispatch = useDispatch();
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,{ withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }
        return (
            <div className="fixed top-0 w-full h-20 flex items-center justify-between md:justify-center gap-7.5 px-5 py-4 backdrop-blur-lg bg-[#fff9f6] overflow-visible z-50">

                {showSearch && (
                    <div className="w-[90%] h-[70px] gap-[20px] flex fixed top-[80px] left-[5%] bg-white shadow-xl rounded-lg items-center">

                        {/* Location Section */}
                        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
                            <FaLocationDot size={25} className="text-gray-600" />
                            <div className="w-[80%] truncate">
                                {city}
                            </div>
                        </div>

                        {/* Search Section */}
                        <div className="w-[70%] flex items-center gap-[10px] px-[10px]">
                            <IoIosSearch size={25} className="text-[#ff4d2d]" />
                            <input
                                type="text"
                                placeholder="search delicious food ..."
                                className="px-[10px] text-gray-700 outline-none w-full"
                            />
                        </div>

                    </div>
                )}


                <h2 className="text-3xl mb-2 font-extrabold">
                    Quick<span className="text-[#ff4d2d]">Bites</span>
                </h2>

                <div className='md:w-[60%] lg:w-[40%] h-17.5 bg-white shadow-xl rounded-lg items-center gap-5 hidden md:flex'>
                    <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400'>
                        <FaLocationDot size={25} className='text-[#ff4d2d]' />
                        <div className='w-[80%] truncate text-gray-600'>{city}</div>
                    </div>
                    <div className='w-[80%] flex items-center gap-2.5'>
                        <IoIosSearch size={25} className='text-[#ff4d2d]' />
                        <input type="text" placeholder='Search delicious foods...' className='w-full px-2.5 text-gray-700 outline-0' />
                    </div>
                </div>

                <div className='flex items-center gap-6'>
                    {(showSearch) ? <RxCross1 size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(false)} /> : <IoIosSearch size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)} />}
                    {/* Cart */}
                    <button className="relative cursor-pointer">
                        <TiShoppingCart size={30} md:size={25} className='text-[#ff4d2d]' />
                        <span className='absolute -right-2.25 -top-3 text-[#ff4d2d] text-lg'>0</span>
                    </button>

                    {/* My Order */}
                    <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-sm font-medium text-[#ff4d2d]'>
                        My Order
                    </button>

                    {/* Profile */}
                    <button onClick={() => { setShowInfo(prev => !prev) }} className='w-10 h-10 rounded-full flex items-center justify-center text-white text-[18px] shadow-xl font-semibold cursor-pointer bg-[#ff4d2d]'>
                        {/* {console.log(userData?.fullName)} */}
                        {userData?.fullName ? userData.fullName.slice(0, 1) : 'G'}
                    </button>

                    {showInfo && <div className='fixed top-20 right-2.5 md:right-[10%] 1g:right-[25%] w-45 shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999 bg-white'>
                        <div className='text-sm text-orange-600 font-bold '>{userData?.fullName ? userData?.fullName : "Guest"}</div>
                        <div className='md:hidden hover:border-b-2 w-fit border-orange-500  text-sm font-semibold '>My Orders</div>
                        <div onClick={handleLogOut} className='text-sm cursor-pointer hover:border-b-2 w-fit border-orange-500  font-semibold '>Log Out</div>
                    </div>}
                </div>

            </div>
        )
    }

    export default Navbar
